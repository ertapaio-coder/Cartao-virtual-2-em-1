import { motion } from 'motion/react';

// Link oficial de checkout do Minicurso Cartão Virtual
const DEFAULT_CHECKOUT_URL = "https://www.ratixpay.co.mz/checkout.html?produto=M6SH2N5UN";

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
    } else {
      // Dispara o evento de InitiateCheckout no Meta Pixel
      if (typeof window !== 'undefined' && (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq) {
        try {
          (window as unknown as { fbq: (...args: unknown[]) => void }).fbq('track', 'InitiateCheckout', {
            content_name: 'Minicurso Cartão Virtual',
            value: 299,
            currency: 'MZN',
          });
        } catch {
          // Ignora silenciosamente se houver bloqueador de anúncios
        }
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
