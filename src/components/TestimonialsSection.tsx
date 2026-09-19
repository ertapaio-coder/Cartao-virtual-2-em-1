import { useState } from 'react';
import { motion } from 'motion/react';
import { Quote, User, MapPin, Edit3, Check } from 'lucide-react';

interface ClientReview {
  id: number;
  name: string;
  quote: string;
  city: string;
}

const initialTestimonials: ClientReview[] = [
  {
    id: 1,
    name: "[NOME DO CLIENTE]",
    quote: "[Inserir testemunho real sobre a experiência com o cartão.]",
    city: "[Cidade]",
  },
  {
    id: 2,
    name: "[NOME DO CLIENTE]",
    quote: "[Inserir testemunho real sobre pagamento online ou utilização do cartão.]",
    city: "[Cidade]",
  },
  {
    id: 3,
    name: "[NOME DO CLIENTE]",
    quote: "[Inserir testemunho real sobre carregamento através de M-Pesa/e-Mola ou pagamento presencial.]",
    city: "[Cidade]",
  },
  {
    id: 4,
    name: "[NOME DO CLIENTE]",
    quote: "[Inserir testemunho real sobre a facilidade de configuração.]",
    city: "[Cidade]",
  },
];

export const TestimonialsSection = () => {
  const [items, setItems] = useState<ClientReview[]>(initialTestimonials);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const updateItem = (id: number, field: keyof ClientReview, value: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  return (
    <section id="testimonials-section" className="py-14 sm:py-20 px-3 sm:px-4 bg-card/40 border-t border-border">
      <div className="container max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-3">
            <span className="text-primary text-xs sm:text-sm font-semibold uppercase tracking-wider">
              [INSERIR TESTEMUNHOS REAIS]
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-4 uppercase">
            O que dizem os nossos <span className="text-gradient-red">clientes</span>
          </h2>

          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground bg-secondary/80 border border-border px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              {isEditing ? (
                <>
                  <Check size={14} className="text-primary" />
                  <span>Concluir edição</span>
                </>
              ) : (
                <>
                  <Edit3 size={14} />
                  <span>Editar testemunhos reais</span>
                </>
              )}
            </button>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
          {items.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="bg-card border border-border rounded-xl p-5 sm:p-6 flex flex-col justify-between hover:border-primary/40 transition-colors shadow-sm relative"
            >
              <div className="mb-4">
                <Quote className="text-primary/40 mb-3" size={28} />

                {isEditing ? (
                  <textarea
                    rows={3}
                    value={item.quote}
                    onChange={(e) => updateItem(item.id, "quote", e.target.value)}
                    className="w-full bg-background border border-border rounded-lg p-2.5 text-sm text-foreground focus:outline-none focus:border-primary"
                    placeholder="Escreve aqui o depoimento..."
                  />
                ) : (
                  <p className="text-foreground text-sm sm:text-base italic leading-relaxed">
                    “{item.quote.replace(/^[“"]|[”"]$/g, "")}”
                  </p>
                )}
              </div>

              <div className="border-t border-border/50 pt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                    <User className="text-muted-foreground" size={16} />
                  </div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => updateItem(item.id, "name", e.target.value)}
                      className="bg-background border border-border rounded px-2 py-1 text-xs text-foreground focus:outline-none focus:border-primary"
                      placeholder="Nome do cliente"
                    />
                  ) : (
                    <h3 className="font-display font-bold text-sm text-foreground">
                      {item.name}
                    </h3>
                  )}
                </div>

                <div className="flex items-center gap-1 text-muted-foreground text-xs font-semibold">
                  <MapPin size={13} />
                  {isEditing ? (
                    <input
                      type="text"
                      value={item.city}
                      onChange={(e) => updateItem(item.id, "city", e.target.value)}
                      className="w-20 bg-background border border-border rounded px-2 py-1 text-xs text-foreground focus:outline-none focus:border-primary"
                      placeholder="Cidade"
                    />
                  ) : (
                    <span>{item.city}</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
