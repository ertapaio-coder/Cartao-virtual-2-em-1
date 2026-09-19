import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, X, ShoppingBag } from 'lucide-react';

interface PurchaseNotification {
  id: number;
  name: string;
  location: string;
  action: string;
  timeAgo: string;
}

const notifications: PurchaseNotification[] = [
  {
    id: 1,
    name: "Edilson M.",
    location: "Maputo",
    action: "adquiriu a Mentoria do Cartão Virtual",
    timeAgo: "há 2 minutos",
  },
  {
    id: 2,
    name: "Dércio S.",
    location: "Matola",
    action: "garantiu a sua vaga com sucesso",
    timeAgo: "há 4 minutos",
  },
  {
    id: 3,
    name: "Armando T.",
    location: "Beira",
    action: "ativou o seu cartão virtual",
    timeAgo: "há 7 minutos",
  },
  {
    id: 4,
    name: "Sheila C.",
    location: "Nampula",
    action: "adquiriu a Mentoria do Cartão Virtual",
    timeAgo: "há 9 minutos",
  },
  {
    id: 5,
    name: "Carlos M.",
    location: "Tete",
    action: "garantiu a sua vaga com desconto",
    timeAgo: "há 13 minutos",
  },
  {
    id: 6,
    name: "Fátima B.",
    location: "Quelimane",
    action: "adquiriu a Mentoria do Cartão Virtual",
    timeAgo: "há 16 minutos",
  },
  {
    id: 7,
    name: "Helton J.",
    location: "Maputo",
    action: "carregou o cartão via M-Pesa",
    timeAgo: "há 19 minutos",
  },
  {
    id: 8,
    name: "Neusa P.",
    location: "Chimoio",
    action: "garantiu a sua vaga com sucesso",
    timeAgo: "há 24 minutos",
  },
];

export const PurchaseToast = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isDismissed, setIsDismissed] = useState<boolean>(false);

  useEffect(() => {
    if (isDismissed) return;

    // Primeiro popup aparece após 4 segundos
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 4000);

    return () => clearTimeout(initialTimer);
  }, [isDismissed]);

  useEffect(() => {
    if (isDismissed) return;

    let hideTimer: NodeJS.Timeout;
    let nextTimer: NodeJS.Timeout;

    if (isVisible) {
      // Fica visível por 5.5 segundos
      hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 5500);
    } else {
      // Intervalo entre 8 e 14 segundos para o próximo aparecer
      const delay = Math.floor(Math.random() * 6000) + 8000;
      nextTimer = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % notifications.length);
        setIsVisible(true);
      }, delay);
    }

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(nextTimer);
    };
  }, [isVisible, isDismissed]);

  if (isDismissed) return null;

  const current = notifications[currentIndex];

  return (
    <div className="fixed bottom-3 left-3 right-3 sm:right-auto sm:left-4 z-40 max-w-[320px] sm:max-w-sm pointer-events-none">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="pointer-events-auto bg-card/95 backdrop-blur-md border border-border/80 rounded-xl p-3 sm:p-3.5 shadow-red-strong flex items-start gap-3"
          >
            {/* Ícone de confirmação */}
            <div className="w-10 h-10 rounded-lg bg-gradient-red flex items-center justify-center shrink-0 shadow-sm mt-0.5">
              <ShoppingBag className="text-primary-foreground" size={18} />
            </div>

            {/* Informações da compra */}
            <div className="flex-1 min-w-0 pr-1">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="font-display font-bold text-xs sm:text-sm text-foreground truncate">
                  {current.name}
                </span>
                <span className="text-muted-foreground text-xs">•</span>
                <span className="text-muted-foreground text-xs font-medium truncate">
                  {current.location}
                </span>
              </div>

              <p className="text-foreground/90 text-xs leading-snug font-medium line-clamp-2 mb-1">
                {current.action}
              </p>

              <div className="flex items-center gap-2 text-[11px] text-muted-foreground font-medium">
                <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                  <CheckCircle size={11} className="shrink-0" />
                  Verificado
                </span>
                <span>•</span>
                <span>{current.timeAgo}</span>
              </div>
            </div>

            {/* Botão de fechar */}
            <button
              type="button"
              onClick={() => setIsDismissed(true)}
              className="text-muted-foreground hover:text-foreground p-1 rounded transition-colors shrink-0 -mr-1 -mt-1 cursor-pointer"
              aria-label="Fechar notificação"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
