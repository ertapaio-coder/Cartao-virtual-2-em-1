import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { FaqItem } from '../types';

const faqItems: FaqItem[] = [
  {
    q: "O cartão funciona em Moçambique?",
    a: "Sim. O cartão pode ser utilizado para pagamentos online e pagamentos presenciais através de POS.",
  },
  {
    q: "Posso carregar o cartão através do M-Pesa?",
    a: "Sim. O método ensina como realizar o carregamento através do M-Pesa.",
  },
  {
    q: "Posso carregar utilizando e-Mola?",
    a: "Sim. Também podes utilizar e-Mola para realizar o carregamento do cartão.",
  },
  {
    q: "Posso fazer pagamentos presenciais?",
    a: "Sim. O mesmo cartão pode ser utilizado para realizar pagamentos presenciais através de terminais POS.",
  },
  {
    q: "Preciso de uma conta bancária local?",
    a: "Não é necessário depender exclusivamente de um cartão bancário local para utilizar o método apresentado.",
  },
  {
    q: "Posso utilizar o cartão para compras internacionais?",
    a: "Sim. O cartão foi desenvolvido para pagamentos internacionais em plataformas que aceitem a sua bandeira.",
  },
  {
    q: "Posso pagar Facebook Ads e Google Ads?",
    a: "Sim. O cartão pode ser utilizado para pagamentos nessas plataformas.",
  },
  {
    q: "Quanto tempo demora para configurar?",
    a: "O processo é simples e apresentado passo a passo na mentoria para que consigas configurar o cartão de forma simples e organizada.",
  },
  {
    q: "É seguro?",
    a: "O método apresentado foi testado e aprovado, e todo o processo é explicado passo a passo na mentoria.",
  },
  {
    q: "E se eu tiver dificuldades?",
    a: "Terás acesso ao grupo de suporte para receber orientação durante o processo.",
  },
];

export const FaqSection = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq-section" className="py-14 sm:py-20 px-3 sm:px-4 bg-card/40 border-t border-border">
      <div className="container max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-3 uppercase">
            Perguntas <span className="text-gradient-red">frequentes</span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqItems.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="border border-border rounded-xl bg-card overflow-hidden shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-display font-semibold text-sm sm:text-base text-foreground hover:text-primary transition-colors cursor-pointer"
                >
                  <span className="pr-4">{item.q}</span>
                  <ChevronDown
                    className={`shrink-0 transition-transform duration-200 text-muted-foreground ${
                      isOpen ? "rotate-180 text-primary" : ""
                    }`}
                    size={20}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-1 text-muted-foreground text-sm sm:text-base leading-relaxed border-t border-border/40">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
