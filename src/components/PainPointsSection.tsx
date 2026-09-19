import { motion } from 'motion/react';
import { CircleX } from 'lucide-react';

const painPoints = [
  "Não consegues pagar algumas subscrições como Netflix, Spotify ou YouTube Premium",
  "Perdes oportunidades porque não consegues pagar Google Ads ou Facebook Ads",
  "Tentaste comprar um curso online e o pagamento foi recusado",
  "Precisas de ferramentas como Canva, ChatGPT ou Zoom Pro, mas não consegues efetuar o pagamento",
  "Tens dinheiro no M-Pesa ou e-Mola, mas não consegues utilizá-lo diretamente para determinados pagamentos internacionais",
  "Queres comprar na SHEIN, Temu, AliExpress ou outras lojas internacionais",
  "Precisas de um cartão para pagar serviços e ferramentas utilizados no teu negócio",
  "Também queres realizar pagamentos presenciais através de POS",
  "Já experimentaste diferentes cartões locais e continuas a enfrentar recusas",
];

export const PainPointsSection = () => {
  return (
    <section id="pain-points-section" className="py-14 sm:py-20 px-3 sm:px-4">
      <div className="container max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-4 uppercase">
            Reconheces-te em alguma destas{" "}
            <span className="text-gradient-red">situações?</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Todos os dias, muitas pessoas encontram dificuldades quando precisam utilizar os seus cartões para determinados pagamentos.
          </p>
        </motion.div>

        <div className="space-y-3.5">
          {painPoints.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="flex items-start gap-4 bg-card border border-border rounded-xl p-4 sm:p-5 transition-colors hover:border-border/80 shadow-sm"
            >
              <CircleX className="text-destructive shrink-0 mt-0.5" size={22} />
              <p className="text-foreground text-sm sm:text-base leading-snug font-medium">
                {item}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 sm:mt-12 space-y-3 text-center max-w-2xl mx-auto"
        >
          <p className="text-foreground text-base sm:text-lg leading-relaxed font-semibold">
            Se já passaste por alguma destas situações, sabes como é frustrante ter dinheiro disponível e, mesmo assim, não conseguir efetuar o pagamento que precisas.
          </p>
          <p className="text-primary font-display font-bold text-base sm:text-lg leading-relaxed">
            A solução está em ter acesso a uma alternativa de pagamento internacional.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
