import { motion } from 'motion/react';
import { Quote, User, MapPin, Star } from 'lucide-react';

interface ClientReview {
  id: number;
  name: string;
  quote: string;
  city: string;
}

const testimonials: ClientReview[] = [
  {
    id: 1,
    name: "Nelson Macamo",
    quote: "Sempre tive problemas ao pagar anúncios no Facebook e ferramentas para o meu negócio online. Com o cartão virtual configurei em menos de 10 minutos e fiz o carregamento pelo M-Pesa. Aprovou logo na primeira tentativa!",
    city: "Maputo",
  },
  {
    id: 2,
    name: "Vanessa Cossa",
    quote: "Precisava comprar cursos internacionais e pagar assinaturas digitais que recusavam os cartões dos bancos daqui. O passo a passo é muito direto e prático. Agora compro na Shein, AliExpress e pago sem bloqueios.",
    city: "Matola",
  },
  {
    id: 3,
    name: "Inácio Tembe",
    quote: "O melhor de tudo é carregar na hora com e-Mola e M-Pesa sem burocracia de ir a agências bancárias. Além das compras online, já usei para pagamento por aproximação no POS e funcionou perfeitamente. Recomendo 100%.",
    city: "Beira",
  },
  {
    id: 4,
    name: "Edna Manhique",
    quote: "Tinha receio de ser complicado, mas o minicurso explica cada detalhe com muita clareza. Em 15 minutos já tinha os dados do meu cartão ativos no telemóvel e fiz a minha primeira compra internacional!",
    city: "Nampula",
  },
];

export const TestimonialsSection = () => {
  return (
    <section id="testimonials-section" className="py-14 sm:py-20 px-3 sm:px-4 bg-card/40 border-t border-border">
      <div className="container max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12"
        >
          <div className="inline-flex items-center gap-1 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-3">
            <div className="flex text-amber-400 gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={13} fill="currentColor" />
              ))}
            </div>
            <span className="text-primary text-xs sm:text-sm font-semibold uppercase tracking-wider ml-1">
              Avaliação 4.9/5 de quem já usa
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-4 uppercase">
            O que dizem os nossos <span className="text-gradient-red">clientes</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Resultados reais de quem já eliminou bloqueios em compras internacionais e pagamentos presenciais.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
          {testimonials.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="bg-card border border-border rounded-xl p-5 sm:p-6 flex flex-col justify-between hover:border-primary/40 transition-colors shadow-sm relative"
            >
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <Quote className="text-primary/40" size={28} />
                  <div className="flex text-amber-400 gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} fill="currentColor" />
                    ))}
                  </div>
                </div>

                <p className="text-foreground text-sm sm:text-base italic leading-relaxed">
                  “{item.quote}”
                </p>
              </div>

              <div className="border-t border-border/50 pt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                    <User className="text-muted-foreground" size={16} />
                  </div>
                  <h3 className="font-display font-bold text-sm text-foreground">
                    {item.name}
                  </h3>
                </div>

                <div className="flex items-center gap-1 text-muted-foreground text-xs font-semibold">
                  <MapPin size={13} />
                  <span>{item.city}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
