import { motion } from 'motion/react';
import { ShieldCheck, Lock, Headphones } from 'lucide-react';
import { CtaButton } from './CtaButton';

export const FinalCtaSection = () => {
  return (
    <section id="final-cta" className="py-16 sm:py-24 px-3 sm:px-4 bg-gradient-to-b from-card/80 to-background border-t border-border text-center relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-primary/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="container max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-lg sm:text-xl md:text-2xl font-display font-bold mb-2 uppercase">
            Chega de ficar <span className="text-gradient-red">bloqueado</span>
          </h2>

          <p className="text-foreground text-xs sm:text-sm font-medium mb-6 max-w-md mx-auto leading-snug">
            Tenha uma alternativa para realizar os teus pagamentos online e presenciais.
          </p>
        </motion.div>

        {/* Action text - frases agrupadas nas mesmas linhas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto mb-6 text-foreground text-xs sm:text-sm font-normal leading-relaxed text-center px-2"
        >
          <p className="mb-2">
            Cria o teu cartão virtual 2 em 1. Carrega através de M-Pesa ou e-Mola. Compra online. Paga serviços. Investe no teu negócio. E realiza pagamentos presenciais através de POS.
          </p>
          <p className="text-primary font-display font-bold text-xs sm:text-sm uppercase tracking-wider">
            Tudo através do mesmo cartão.
          </p>
        </motion.div>

        {/* CTA */}
        <div className="mb-8 flex justify-center">
          <CtaButton
            text="QUERO O MEU CARTÃO VIRTUAL AGORA →"
            subtext="👆 Clica no botão acima para fazer o pagamento e receber o acesso à mentoria."
          />
        </div>

        {/* Security / Guarantee badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-muted-foreground text-xs sm:text-sm font-semibold">
          <div className="flex items-center gap-1.5">
            <Lock size={15} className="text-primary" />
            <span>Pagamento seguro</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={15} className="text-primary" />
            <span>Acesso imediato</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            <Headphones size={15} className="text-primary" />
            <span>Suporte 24h/24h</span>
          </div>
        </div>
      </div>
    </section>
  );
};
