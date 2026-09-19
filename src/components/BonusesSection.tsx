import { motion } from 'motion/react';
import { Users, RefreshCw, Gift } from 'lucide-react';
import { Bonus } from '../types';

const bonuses: Bonus[] = [
  {
    icon: Users,
    title: "GRUPO DE SUPORTE 24H/24H",
    desc: "Acesso a um grupo privado para receber suporte e esclarecer dúvidas durante o processo.",
  },
  {
    icon: RefreshCw,
    title: "ATUALIZAÇÕES",
    desc: "Sempre que forem necessárias alterações importantes no método, o conteúdo poderá ser atualizado.",
  },
  {
    icon: Gift,
    title: "BÓNUS EXTRA",
    desc: "Materiais complementares para ajudar-te a aproveitar melhor o teu cartão.",
  },
];

export const BonusesSection = () => {
  return (
    <section id="bonuses-section" className="py-14 sm:py-20 px-3 sm:px-4 bg-card/50">
      <div className="container max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-3 uppercase">
            E ainda recebes estes <span className="text-gradient-red">bónus</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Tudo incluído no teu acesso.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-5 sm:gap-6 text-left">
          {bonuses.map((bonus, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-background border border-border rounded-xl p-5 sm:p-6 hover:border-primary/40 transition-colors shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-lg bg-gradient-red flex items-center justify-center mb-4 shadow-sm">
                  <bonus.icon className="text-primary-foreground" size={24} />
                </div>
                <h3 className="font-display font-bold text-base sm:text-lg mb-2 text-foreground uppercase tracking-wide">
                  {bonus.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {bonus.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
