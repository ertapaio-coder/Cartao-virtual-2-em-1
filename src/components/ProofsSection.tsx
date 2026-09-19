import { useState } from 'react';
import { motion } from 'motion/react';
import { ImagePlus, CheckCircle2, UploadCloud } from 'lucide-react';

interface ProofItem {
  id: number;
  label: string;
  name: string;
  imageSrc?: string;
}

const defaultProofs: ProofItem[] = [
  {
    id: 1,
    label: "[INSERIR PROVA REAL 1]",
    name: "[Nome do cliente]",
  },
  {
    id: 2,
    label: "[INSERIR PROVA REAL 2]",
    name: "[Nome do cliente]",
  },
  {
    id: 3,
    label: "[INSERIR PROVA REAL 3]",
    name: "[Nome do cliente]",
  },
];

export const ProofsSection = () => {
  const [proofs, setProofs] = useState<ProofItem[]>(defaultProofs);

  const handleImageUpload = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProofs((prev) =>
        prev.map((item) => (item.id === id ? { ...item, imageSrc: url } : item))
      );
    }
  };

  const handleNameChange = (id: number, newName: string) => {
    setProofs((prev) =>
      prev.map((item) => (item.id === id ? { ...item, name: newName } : item))
    );
  };

  return (
    <section id="proofs-section" className="py-14 sm:py-20 px-3 sm:px-4 bg-background">
      <div className="container max-w-4xl mx-auto text-center">
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
            Aqui serão apresentadas <strong className="text-foreground">provas reais dos nossos clientes</strong>, mostrando o processo de configuração e utilização do cartão.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-6 mb-10">
          {proofs.map((proof, idx) => (
            <motion.div
              key={proof.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-card border-2 border-dashed border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all flex flex-col justify-between p-4"
            >
              <div className="relative aspect-[4/5] w-full rounded-lg bg-secondary/50 flex flex-col items-center justify-center p-4 overflow-hidden mb-3 border border-border/50">
                {proof.imageSrc ? (
                  <img
                    src={proof.imageSrc}
                    alt={proof.name}
                    className="w-full h-full object-cover rounded-md"
                  />
                ) : (
                  <div className="text-center flex flex-col items-center justify-center h-full p-2">
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-primary mb-2">
                      <ImagePlus size={24} />
                    </div>
                    <span className="text-primary font-display font-bold text-xs sm:text-sm uppercase tracking-wide">
                      {proof.label}
                    </span>
                    <p className="text-muted-foreground text-[11px] mt-1">
                      Captura de ecrã ou comprovativo real
                    </p>
                  </div>
                )}

                {/* Upload button */}
                <label className="absolute bottom-2 right-2 bg-card/90 hover:bg-card text-foreground border border-border text-[11px] font-semibold px-2.5 py-1.5 rounded-md cursor-pointer flex items-center gap-1 shadow-sm transition-colors">
                  <UploadCloud size={13} />
                  <span>{proof.imageSrc ? "Alterar" : "Carregar"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(proof.id, e)}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="flex items-center justify-center gap-1.5 pt-1">
                <CheckCircle2 size={16} className="text-primary shrink-0" />
                <input
                  type="text"
                  value={proof.name}
                  onChange={(e) => handleNameChange(proof.id, e.target.value)}
                  className="text-center font-display font-bold text-sm text-foreground bg-transparent border-b border-transparent hover:border-border focus:border-primary focus:outline-none px-1"
                  placeholder="[Nome do cliente]"
                />
              </div>
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
