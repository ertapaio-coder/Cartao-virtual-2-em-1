import { motion } from 'motion/react';
import { ShoppingBag, Megaphone, Laptop, Film, GraduationCap, Store } from 'lucide-react';

const categories = [
  {
    icon: ShoppingBag,
    title: "COMPRAS INTERNACIONAIS",
    desc: "Compra em lojas como SHEIN, Temu, AliExpress e outras plataformas internacionais.",
  },
  {
    icon: Megaphone,
    title: "PUBLICIDADE",
    desc: "Paga campanhas e publicidade em plataformas como Facebook Ads, Instagram Ads e Google Ads.",
  },
  {
    icon: Laptop,
    title: "FERRAMENTAS DE TRABALHO",
    desc: "Paga ferramentas e serviços digitais como Canva, Zoom, ChatGPT e outras plataformas.",
  },
  {
    icon: Film,
    title: "SUBSCRIÇÕES",
    desc: "Utiliza o cartão para serviços de streaming e outras subscrições digitais.",
  },
  {
    icon: GraduationCap,
    title: "CURSOS ONLINE",
    desc: "Compra cursos, formações e outros produtos digitais.",
  },
  {
    icon: Store,
    title: "PAGAMENTOS PRESENCIAIS",
    desc: "Utiliza o mesmo cartão para realizar pagamentos presenciais através de terminais POS.",
  },
];

export const WhatYouCanPaySection = () => {
  return (
    <section id="what-you-can-pay" className="py-14 sm:py-20 px-3 sm:px-4">
      <div className="container max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-12 sm:mb-14 uppercase">
            O que podes fazer com o <span className="text-gradient-red">cartão?</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 text-left">
          {categories.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.07 }}
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
      </div>
    </section>
  );
};
