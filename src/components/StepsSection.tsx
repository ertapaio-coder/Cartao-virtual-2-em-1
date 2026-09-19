import { motion } from 'motion/react';
import { Step } from '../types';

const steps: Step[] = [
  {
    num: "01",
    title: "CRIAR A TUA CONTA",
    desc: "Aprende como criar a tua conta numa instituição financeira digital internacional e iniciar o processo.",
  },
  {
    num: "02",
    title: "FAZER A VERIFICAÇÃO",
    desc: "Aprende como concluir corretamente o processo de verificação da tua identidade.",
  },
  {
    num: "03",
    title: "ADICIONAR FUNDOS",
    desc: "Aprende como adicionar dinheiro à tua conta para poderes utilizar o cartão.",
  },
  {
    num: "04",
    title: "CARREGAR COM M-PESA OU E-MOLA",
    desc: "Aprende como utilizar M-Pesa ou e-Mola para carregar o teu cartão.",
  },
  {
    num: "05",
    title: "CONVERTER E PREPARAR OS FUNDOS",
    desc: "Aprende como preparar os fundos na moeda necessária para realizar os teus pagamentos.",
  },
  {
    num: "06",
    title: "ATIVAR E UTILIZAR O CARTÃO",
    desc: "Configura o teu cartão virtual e aprende como utilizá-lo nos teus pagamentos.",
  },
  {
    num: "07",
    title: "PAGAMENTOS ONLINE E PRESENCIAIS",
    desc: "Aprende como utilizar o mesmo cartão para pagamentos online e para compras presenciais através de POS.",
  },
];

export const StepsSection = () => {
  return (
    <section id="steps-section" className="py-14 sm:py-20 px-3 sm:px-4 bg-card/50">
      <div className="container max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-14"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-3 uppercase">
            O que vais <span className="text-gradient-red">aprender</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Aulas práticas para saíres do zero até à utilização do teu cartão.
          </p>
        </motion.div>

        <div className="space-y-4">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.07 }}
              className="flex items-center gap-4 sm:gap-5 bg-background border border-border rounded-xl p-4 sm:p-5 hover:border-primary/40 transition-colors shadow-sm"
            >
              <span className="text-2xl sm:text-3xl font-display font-bold text-gradient-red shrink-0 w-12 text-center">
                {step.num}
              </span>
              <div>
                <h3 className="font-display font-bold text-base sm:text-lg text-foreground tracking-wide uppercase">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm mt-0.5 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
