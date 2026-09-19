import { motion } from 'motion/react';
import { CreditCard, Store, Wallet, Smartphone, Globe2, ShieldCheck } from 'lucide-react';
import { CtaButton } from './CtaButton';

const benefits = [
  {
    icon: CreditCard,
    title: "CARTÃO VIRTUAL 2 EM 1",
    desc: "Tenha um cartão virtual 2 em 1 para realizar pagamentos em sites, plataformas e serviços que aceitem a bandeira do cartão.",
  },
  {
    icon: Store,
    title: "PAGAMENTOS PRESENCIAIS VIA POS",
    desc: "Utiliza o mesmo cartão para realizar compras e pagamentos presenciais através de terminais POS.",
  },
  {
    icon: Wallet,
    title: "CARREGA COM M-PESA",
    desc: "Aprende como adicionar fundos ao teu cartão utilizando M-Pesa.",
  },
  {
    icon: Smartphone,
    title: "CARREGA COM E-MOLA",
    desc: "Também podes utilizar e-Mola para realizar o carregamento do teu cartão.",
  },
  {
    icon: Globe2,
    title: "UTILIZAÇÃO INTERNACIONAL",
    desc: "Compra produtos, paga serviços, ferramentas, subscrições e outras soluções internacionais utilizando o teu cartão.",
  },
  {
    icon: ShieldCheck,
    title: "MÉTODO TESTADO E APROVADO",
    desc: "Segue um processo prático que já foi testado e aprovado, apresentado passo a passo para facilitar a tua configuração e utilização.",
  },
];

export const SolutionSection = () => {
  return (
    <section id="solution-section" className="py-14 sm:py-20 px-3 sm:px-4">
      <div className="container max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold mb-3 uppercase">
            Apresentamos o{" "}
            <span className="text-gradient-red">Cartão Virtual 2 em 1</span>
          </h2>

          <p className="text-foreground text-lg sm:text-xl md:text-2xl font-display font-semibold mb-4">
            Um cartão criado para te dar mais liberdade nos teus pagamentos.
          </p>

          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto mb-12 sm:mb-14 leading-relaxed">
            Aprende passo a passo como criar, configurar, carregar e utilizar o teu cartão virtual 2 em 1 para pagamentos online e presenciais.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-12 sm:mb-14 text-left">
          {benefits.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="bg-card border border-border rounded-xl p-5 sm:p-6 hover:border-primary/40 transition-colors shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-lg bg-gradient-red flex items-center justify-center mb-4 shadow-sm">
                  <item.icon className="text-primary-foreground" size={24} />
                </div>
                <h3 className="font-display font-bold text-base sm:text-lg mb-2 text-foreground uppercase tracking-wide">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <CtaButton
          text="QUERO O MEU CARTÃO VIRTUAL AGORA →"
          subtext="👆 Clica no botão acima para fazer o pagamento e receber o acesso à mentoria."
        />
      </div>
    </section>
  );
};
