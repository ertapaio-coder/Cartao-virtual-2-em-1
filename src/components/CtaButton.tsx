import { motion } from 'motion/react';

// Link direto para o WhatsApp com mensagem pré-definida
const WHATSAPP_NUMBER = "258844810213";
const PRE_SELECTED_MESSAGE = encodeURIComponent(
  "Olá! Quero adquirir o Minicurso Cartão Virtual por 199 MT e ter acesso imediato à mentoria."
);
const DEFAULT_CHECKOUT_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${PRE_SELECTED_MESSAGE}`;

interface CtaButtonProps {
  text?: string;
  subtext?: string;
  href?: string;
  className?: string;
}

export const CtaButton = ({
  text = "QUERO O MEU CARTÃO VIRTUAL AGORA →",
  subtext,
  href = DEFAULT_CHECKOUT_URL,
  className = "",
}: CtaButtonProps) => {
  const isAnchor = href.startsWith("#");

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isAnchor) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 w-full max-w-md mx-auto">
      <motion.a
        href={href}
        onClick={handleClick}
        target={isAnchor ? undefined : "_blank"}
        rel={isAnchor ? undefined : "noopener noreferrer"}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full sm:w-auto inline-flex items-center justify-center bg-gradient-red text-primary-foreground font-display font-bold text-xs sm:text-sm md:text-base px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg shadow-red-strong glow-pulse tracking-wide uppercase transition-all hover:bg-gradient-red-hover text-center leading-snug cursor-pointer ${className}`}
      >
        {text}
      </motion.a>

      {subtext && (
        <p className="text-muted-foreground text-[11px] sm:text-xs text-center max-w-sm font-medium leading-tight">
          {subtext}
        </p>
      )}
    </div>
  );
};
