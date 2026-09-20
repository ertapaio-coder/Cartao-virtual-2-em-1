import { motion } from 'motion/react';

interface ProofItem {
  id: number;
  alt: string;
  imageSrc: string;
}

const proofs: ProofItem[] = [
  {
    id: 1,
    alt: "Comprovativo real 1 - Ativação e conversão automática",
    imageSrc: "https://yhdsbgrgihxvzkwjwaqk.supabase.co/storage/v1/object/public/product-images/Screenshot%202026-09-19%20075855.png",
  },
  {
    id: 2,
    alt: "Comprovativo real 2 - Pagamento internacional aprovado",
    imageSrc: "https://yhdsbgrgihxvzkwjwaqk.supabase.co/storage/v1/object/public/product-images/Screenshot%202026-09-19%20075939.png",
  },
  {
    id: 3,
    alt: "Comprovativo real 3 - Recomendação de cliente satisfeito",
    imageSrc: "https://yhdsbgrgihxvzkwjwaqk.supabase.co/storage/v1/object/public/product-images/Screenshot%202026-09-19%20080105.png",
  },
];

export const ProofsSection = () => {
  return (
    <section id="proofs-section" className="py-14 sm:py-20 px-3 sm:px-4 bg-background">
      <div className="container max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-3 uppercase">
            Resultados <span className="text-gradient-red">reais</span>
          </h2>
          <p className="text-foreground text-base sm:text-xl font-semibold mb-3">
            Veja algumas das pessoas que já conseguiram configurar o cartão
          </p>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Aqui estão <strong className="text-foreground">provas reais dos nossos clientes</strong>, mostrando o processo de configuração e utilização do cartão.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-6 mb-10 max-w-4xl mx-auto">
          {proofs.map((proof, idx) => (
            <motion.div
              key={proof.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex justify-center"
            >
              <img
                src={proof.imageSrc}
                alt={proof.alt}
                referrerPolicy="no-referrer"
                className="w-full max-w-xs sm:max-w-none rounded-xl shadow-lg border border-border object-contain"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-foreground font-display font-bold text-base sm:text-lg"
        >
          E muitos outros clientes já estão a utilizar o método.
        </motion.p>
      </div>
    </section>
  );
};
