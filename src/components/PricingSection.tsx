import { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Zap, Shield, Link2 } from 'lucide-react';
import { CtaButton } from './CtaButton';

const includes = [
  "Aulas práticas em vídeo passo a passo",
  "Criação e configuração do cartão virtual",
  "Carregamento através de M-Pesa",
  "Carregamento através de e-Mola",
  "Pagamentos online",
  "Pagamentos presenciais via POS",
  "Acesso à mentoria",
  "Grupo de suporte 24h/24h",
  "Atualizações do conteúdo",
  "Bónus exclusivos",
];

export const PricingSection = () => {
  // Permite configurar o link real de pagamento/checkout
  const [checkoutUrl, setCheckoutUrl] = useState<string>("https://checkout.escalepay.com/8771304");
  const [showConfig, setShowConfig] = useState<boolean>(false);

  return (
    <section id="preco" className="py-16 sm:py-24 px-3 sm:px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold mb-6 uppercase leading-tight">
            Quanto vale ter mais liberdade nos teus{" "}
            <span className="text-gradient-red">pagamentos?</span>
          </h2>

          <div className="space-y-4 text-foreground/90 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            <p>
              Pensa em quantas vezes já encontraste um produto, curso, ferramenta ou serviço que querias comprar — mas não conseguiste concluir o pagamento.
            </p>
            <p>
              Pensa também nas oportunidades de negócio que podem surgir quando tens uma forma prática de realizar pagamentos internacionais.
            </p>
            <p className="text-foreground font-semibold">
              E agora tens uma alternativa que pode ser utilizada tanto para{" "}
              <strong className="text-primary font-bold">
                pagamentos online como para pagamentos presenciais via POS.
              </strong>
            </p>
          </div>
        </motion.div>

        {/* Pricing Card - Conteiner significativamente mais compacto */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-lg mx-auto bg-card border-2 border-primary/50 rounded-2xl p-5 sm:p-7 shadow-red-strong relative overflow-hidden"
        >
          {/* Badge */}
          <div className="text-center mb-4">
            <span className="inline-flex items-center gap-1.5 bg-gradient-red text-primary-foreground font-display font-bold text-xs px-3.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
              <Zap size={13} />
              OFERTA ESPECIAL
            </span>
          </div>

          {/* Pricing */}
          <div className="text-center mb-6 pb-6 border-b border-border">
            <div className="text-muted-foreground text-xs sm:text-sm font-medium mb-0.5">
              Valor real da mentoria
            </div>
            <div className="text-lg sm:text-xl line-through text-muted-foreground/80 font-bold mb-3">
              750 MT
            </div>

            <div className="text-primary font-display font-bold text-xs uppercase tracking-widest mb-1">
              PREÇO PROMOCIONAL:
            </div>
            <div className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-gradient-red tracking-tight leading-none mb-2">
              199 MT
            </div>
            <p className="text-muted-foreground text-xs font-medium">
              Pagamento único • Acesso completo
            </p>
          </div>

          {/* Features */}
          <div className="mb-6">
            <div className="text-foreground font-display font-bold text-xs sm:text-sm mb-3 uppercase tracking-wide">
              O TEU ACESSO INCLUI:
            </div>
            <div className="space-y-2.5">
              {includes.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={11} className="text-primary" />
                  </div>
                  <span className="text-foreground text-xs sm:text-sm leading-snug font-medium">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <CtaButton
              text="QUERO O MEU CARTÃO VIRTUAL AGORA →"
              subtext="👆 Clica no botão acima para fazer o pagamento e receber o acesso à mentoria."
              href={checkoutUrl || undefined}
              className="w-full"
            />
            <div className="flex items-center justify-center gap-1.5 text-primary text-xs font-semibold mt-3">
              <Zap size={13} />
              <span>⚡ Oferta promocional por tempo limitado.</span>
            </div>
          </div>

          {/* Link configuration toggle for the site owner */}
          <div className="mt-8 pt-4 border-t border-border/50 flex flex-col items-center">
            <button
              type="button"
              onClick={() => setShowConfig(!showConfig)}
              className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <Link2 size={12} />
              <span>{showConfig ? "Ocultar link de pagamento" : "Configurar link de pagamento (checkout)"}</span>
            </button>
            {showConfig && (
              <div className="mt-2.5 w-full max-w-md flex gap-2">
                <input
                  type="text"
                  placeholder="https://o-teu-checkout-oficial..."
                  value={checkoutUrl}
                  onChange={(e) => setCheckoutUrl(e.target.value)}
                  className="flex-1 bg-background border border-border rounded-lg px-3 py-1.5 text-xs text-foreground focus:outline-none focus:border-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowConfig(false)}
                  className="bg-primary text-primary-foreground px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Guardar
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
