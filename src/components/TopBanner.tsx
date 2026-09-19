import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Users } from 'lucide-react';

export const TopBanner = () => {
  const FIFTEEN_MINUTES = 15 * 60; // 15 minutos = 900 segundos

  const getInitialState = () => {
    try {
      const storedEnd = localStorage.getItem("urgency_15m_end");
      const isExpired = localStorage.getItem("urgency_15m_expired") === "true";

      if (isExpired) {
        return {
          timeLeft: 0,
          spots: 1,
          message: "⚠️ Resta apenas 1 vaga! Acesse agora ou alguém vai ocupar!",
        };
      }

      if (storedEnd) {
        const remaining = Math.max(0, Math.floor((parseInt(storedEnd, 10) - Date.now()) / 1000));
        if (remaining <= 0) {
          localStorage.setItem("urgency_15m_expired", "true");
          return {
            timeLeft: 0,
            spots: 1,
            message: "⚠️ Resta apenas 1 vaga! Acesse agora ou alguém vai ocupar!",
          };
        }
        return {
          timeLeft: remaining,
          spots: Math.max(2, Math.min(7, Math.ceil((remaining / FIFTEEN_MINUTES) * 7))),
          message: "Oferta expira em breve!",
        };
      }

      const newEnd = Date.now() + FIFTEEN_MINUTES * 1000;
      localStorage.setItem("urgency_15m_end", newEnd.toString());
      return {
        timeLeft: FIFTEEN_MINUTES,
        spots: 7,
        message: "Oferta expira em breve!",
      };
    } catch {
      return {
        timeLeft: FIFTEEN_MINUTES,
        spots: 7,
        message: "Oferta expira em breve!",
      };
    }
  };

  const initial = getInitialState();
  const [timeLeft, setTimeLeft] = useState(initial.timeLeft);
  const [spots, setSpots] = useState(initial.spots);
  const [message, setMessage] = useState(initial.message);
  const [isExpired, setIsExpired] = useState(initial.timeLeft === 0);

  // Timer countdown
  useEffect(() => {
    if (isExpired) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          try {
            localStorage.setItem("urgency_15m_expired", "true");
          } catch {
            // ignore
          }
          setIsExpired(true);
          setSpots(1);
          setMessage("⚠️ Resta apenas 1 vaga! Acesse agora ou alguém vai ocupar!");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isExpired]);

  // Spots decrease simulation
  useEffect(() => {
    if (isExpired) return;

    const decreaseSpots = () => {
      setSpots((prev) => (prev <= 2 ? 2 : prev - 1));
    };

    const initialTimeout = setTimeout(() => {
      decreaseSpots();
      const interval = setInterval(() => {
        decreaseSpots();
      }, Math.floor(Math.random() * 15000) + 25000);

      return () => clearInterval(interval);
    }, 15000);

    return () => clearTimeout(initialTimeout);
  }, [isExpired]);

  // Message update on low spots
  useEffect(() => {
    if (!isExpired && spots <= 2) {
      setMessage("Aproveite antes que alguém ocupe a vaga!");
    }
  }, [spots, isExpired]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div id="top-urgency-banner" className="fixed top-0 left-0 right-0 z-50 bg-gradient-red py-2 px-3 shadow-md">
      <div className="container max-w-4xl mx-auto flex items-center justify-center gap-3 sm:gap-6 flex-wrap">
        <div className="flex items-center gap-1.5">
          <Clock size={14} className="text-primary-foreground" />
          <span className="text-primary-foreground font-display font-bold text-sm sm:text-base tabular-nums">
            {formatTime(timeLeft)}
          </span>
        </div>

        <span className="text-primary-foreground/40 hidden sm:inline">|</span>

        <AnimatePresence mode="wait">
          <motion.span
            key={message}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="text-primary-foreground font-semibold text-xs sm:text-sm text-center"
          >
            {message}
          </motion.span>
        </AnimatePresence>

        <span className="text-primary-foreground/40 hidden sm:inline">|</span>

        <div className="flex items-center gap-1.5">
          <Users size={14} className="text-primary-foreground" />
          <AnimatePresence mode="wait">
            <motion.span
              key={spots}
              initial={{ opacity: 0, scale: 1.3 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              className="text-primary-foreground font-display font-bold text-sm sm:text-base"
            >
              {spots}
            </motion.span>
          </AnimatePresence>
          <span className="text-primary-foreground/80 text-xs sm:text-sm font-medium">
            vagas restantes
          </span>
        </div>
      </div>
    </div>
  );
};
