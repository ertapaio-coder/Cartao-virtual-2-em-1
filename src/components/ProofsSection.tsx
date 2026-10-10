import { motion } from 'motion/react';

interface ProofItem {
  id: number;
  alt: string;
  imageSrc: string;
}

const proofs: ProofItem[] = [
  {
    id: 1,
    alt: "Comprovativo real 1 - Pagamento no Facebook Ads e limite diário de $1.000.000 no POS",
    imageSrc: "https://yhdsbgrgihxvzkwjwaqk.supabase.co/storage/v1/object/public/Criativos/Provas%20sociais%20cartao%20virtual/Screenshot_20261009-142818.png",
  },
  {
    id: 2,
    alt: "Comprovativo real 2 - Carregamento do cartão com sucesso fora de Moçambique",
    imageSrc: "https://yhdsbgrgihxvzkwjwaqk.supabase.co/storage/v1/object/public/Criativos/Provas%20sociais%20cartao%20virtual/Screenshot_20261009-142837.png",
  },
  {
    id: 3,
    alt: "Comprovativo real 3 - Carregamento e pagamentos online aprovados",
    imageSrc: "https://yhdsbgrgihxvzkwjwaqk.supabase.co/storage/v1/object/public/Criativos/Provas%20sociais%20cartao%20virtual/Screenshot_20261009-142959%20%281%29.png",
  },
  {
    id: 4,
    alt: "Comprovativo real 4 - Saldo refletido e pagamentos concluídos com facilidade",
    imageSrc: "https://yhdsbgrgihxvzkwjwaqk.supabase.co/storage/v1/object/public/Criativos/Provas%20sociais%20cartao%20virtual/Screenshot_20261009-143020.png",
  },
  {
    id: 5,
    alt: "Comprovativo real 5 - Validação de identidade e cartão aprovado em terminal POS",
    imageSrc: "https://yhdsbgrgihxvzkwjwaqk.supabase.co/storage/v1/object/public/Criativos/Provas%20sociais%20cartao%20virtual/Screenshot_20261009-143039.png",
  },
  {
    id: 6,
    alt: "Comprovativo real 6 - Pagamento contactless por aproximação aceitou na South",
    imageSrc: "https://yhdsbgrgihxvzkwjwaqk.supabase.co/storage/v1/object/public/Criativos/Provas%20sociais%20cartao%20virtual/Screenshot_20261009-143100.png",
  },
  {
    id: 7,
    alt: "Comprovativo real 7 - Cartão adicionado ao Samsung A25 para pagamentos por aproximação no POS",
    imageSrc: "https://yhdsbgrgihxvzkwjwaqk.supabase.co/storage/v1/object/public/Criativos/Provas%20sociais%20cartao%20virtual/Screenshot_20261009-143238.png",
  },
  {
    id: 8,
    alt: "Comprovativo real 8 - Conversão automática em pagamentos no POS e fácil ativação",
    imageSrc: "https://yhdsbgrgihxvzkwjwaqk.supabase.co/storage/v1/object/public/Criativos/Provas%20sociais%20cartao%20virtual/Screenshot_20261009-143319.png",
  },
  {
    id: 9,
    alt: "Comprovativo real 9 - Pagamento internacional aprovado em site",
    imageSrc: "https://yhdsbgrgihxvzkwjwaqk.supabase.co/storage/v1/object/public/product-images/Screenshot%202026-09-19%20075939.png",
  },
  {
    id: 10,
    alt: "Comprovativo real 10 - Pagamento online realizado e recomendação para amigo",
    imageSrc: "https://yhdsbgrgihxvzkwjwaqk.supabase.co/storage/v1/object/public/product-images/Screenshot%202026-09-19%20080105.png",
  },
];

export const ProofsSection = () => {
  return (
    <section id="proofs-section" className="py-14 sm:py-20 px-3 sm:px-4 bg-background">
      <div className="container max-w-6xl mx-auto text-center">
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

        {/* Galeria de Comprovativos Reais do Supabase (Sem Duplicação) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-10 max-w-5xl mx-auto">
          {proofs.map((proof, idx) => (
            <motion.div
              key={proof.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (idx % 6) * 0.08 }}
              className="flex justify-center bg-card/60 border border-border hover:border-red/40 rounded-2xl p-2.5 sm:p-3 transition-all hover:-translate-y-1 group shadow-sm hover:shadow-red-strong/20"
            >
              <img
                src={proof.imageSrc}
                alt={proof.alt}
                referrerPolicy="no-referrer"
                className="w-full h-auto object-contain rounded-xl border border-border/60 transition-transform duration-300 group-hover:scale-[1.01]"
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
