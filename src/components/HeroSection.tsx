import { useState } from 'react';
import { motion } from 'motion/react';
import { CtaButton } from './CtaButton';
import vslImage from '../assets/images/vsl_card_hero_1789816017403.jpg';

export const HeroSection = () => {
  const [videoUrl] = useState<string>("");

  return (
    <section id="hero-section" className="relative min-h-[90vh] flex flex-col items-center justify-center px-3 sm:px-4 pt-8 sm:pt-12 pb-12 sm:pb-16 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container max-w-4xl mx-auto text-center relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block bg-secondary border border-red px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-primary font-medium text-[11px] sm:text-sm mb-4 sm:mb-6 tracking-wide shadow-sm">
            🇲🇿 UMA NOVA FORMA DE PAGAR ONLINE E PRESENCIALMENTE
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-4 sm:mb-8 break-words"
        >
          Enquanto outros continuam bloqueados, tu podes voltar a fazer pagamentos online e presenciais com um{" "}
          <span className="text-gradient-red">cartão virtual 2 em 1.</span>
        </motion.h1>

        {/* Lead Paragraphs */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-foreground text-xs sm:text-base md:text-xl max-w-3xl mx-auto mb-3 sm:mb-4 px-1 font-medium leading-relaxed"
        >
          Em Moçambique, muitos utilizadores enfrentam dificuldades ou recusas quando tentam utilizar cartões locais para determinados pagamentos internacionais.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-muted-foreground text-xs sm:text-sm md:text-lg max-w-2xl mx-auto mb-6 sm:mb-10 px-1 leading-relaxed"
        >
          Mas existe uma solução prática:{" "}
          <strong className="text-foreground font-semibold">
            um cartão virtual 2 em 1 que podes carregar através de M-Pesa ou e-Mola e utilizar para pagamentos online e presenciais via POS.
          </strong>
        </motion.p>

        {/* [ESPAÇO PARA VÍDEO DE VENDAS] */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="relative w-full max-w-3xl mx-auto rounded-xl sm:rounded-2xl overflow-hidden border-2 border-red shadow-red-strong bg-card/90"
        >
          {videoUrl ? (
            <div className="aspect-video w-full bg-black">
              <iframe
                src={videoUrl.includes('watch?v=') ? videoUrl.replace('watch?v=', 'embed/') : videoUrl}
                title="Vídeo de Vendas"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          ) : (
            <div className="aspect-video w-full relative overflow-hidden bg-black flex items-center justify-center">
              <img
                src={vslImage}
                alt="Apresentação do Cartão Virtual 2 em 1"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </motion.div>

        {/* First CTA - Posicionado por baixo do espaço para vídeo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-8 sm:mt-10"
        >
          <CtaButton
            text="QUERO O MEU CARTÃO VIRTUAL AGORA →"
            subtext="👆 Clica no botão acima para fazer o pagamento e receber o acesso à mentoria."
          />
        </motion.div>
      </div>
    </section>
  );
};
