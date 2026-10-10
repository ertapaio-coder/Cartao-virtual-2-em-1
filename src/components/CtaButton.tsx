import { motion } from 'motion/react';
import { trackDualMetaEvent } from '../lib/metaTracking';

const WHATSAPP_BUSINESS_NUMBER = "258862676534";
const WHATSAPP_PREFILLED_MESSAGE =
  "Olá Ernesto! Quero garantir minha vaga no Minicurso Cartão Virtual por 350 MT. Por favor, envie os dados de pagamento (M-Pesa / e-Mola) para eu fazer a transferência agora.";

const WHATSAPP_CTA_URL = `https://wa.me/${WHATSAPP_BUSINESS_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_PREFILLED_MESSAGE
)}`;

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

    e.preventDefault();

    // 1. Rastreia InitiateCheckout e Contact no Meta Pixel & Conversions API
    trackDualMetaEvent('InitiateCheckout', {}, {
      value: 350,
      currency: 'MZN',
      content_name: 'Minicurso Cartão Virtual 2 em 1',
    });

    // 2. Abre imediatamente o WhatsApp Business com a mensagem pronta
    const targetUrl = href || WHATSAPP_CTA_URL;
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
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
