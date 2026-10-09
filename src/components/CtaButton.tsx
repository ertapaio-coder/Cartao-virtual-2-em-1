import { motion } from 'motion/react';
import { useCheckoutModal } from '../context/CheckoutModalContext';
import { trackDualMetaEvent } from '../lib/metaTracking';

interface CtaButtonProps {
  text?: string;
  subtext?: string;
  href?: string;
  className?: string;
}

export const CtaButton = ({
  text = "QUERO O MEU CARTÃO VIRTUAL AGORA →",
  subtext,
  href,
  className = "",
}: CtaButtonProps) => {
  const { openCheckout } = useCheckoutModal();
  const isAnchor = href?.startsWith("#");

  const handleClick = (e: React.MouseEvent) => {
    if (isAnchor && href) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    // Se tiver openCheckout configurado, abre o checkout próprio e rastreia InitiateCheckout
    e.preventDefault();
    trackDualMetaEvent('InitiateCheckout', {}, {
      value: 299,
      currency: 'MZN',
      content_name: 'Minicurso Cartão Virtual 2 em 1',
    });
    openCheckout();
  };

  return (
    <div className="flex flex-col items-center gap-2 w-full max-w-md mx-auto">
      <motion.button
        type="button"
        onClick={handleClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full sm:w-auto inline-flex items-center justify-center bg-gradient-red text-primary-foreground font-display font-bold text-xs sm:text-sm md:text-base px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg shadow-red-strong glow-pulse tracking-wide uppercase transition-all hover:bg-gradient-red-hover text-center leading-snug cursor-pointer ${className}`}
      >
        {text}
      </motion.button>

      {subtext && (
        <p className="text-muted-foreground text-[11px] sm:text-xs text-center max-w-sm font-medium leading-tight">
          {subtext}
        </p>
      )}
    </div>
  );
};
