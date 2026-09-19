import { TopBanner } from './components/TopBanner';
import { HeroSection } from './components/HeroSection';
import { PainPointsSection } from './components/PainPointsSection';
import { SolutionSection } from './components/SolutionSection';
import { StepsSection } from './components/StepsSection';
import { WhatYouCanPaySection } from './components/WhatYouCanPaySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ProofsSection } from './components/ProofsSection';
import { BonusesSection } from './components/BonusesSection';
import { PricingSection } from './components/PricingSection';
import { FaqSection } from './components/FaqSection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { PurchaseToast } from './components/PurchaseToast';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground pt-11 sm:pt-10 antialiased font-sans relative selection:bg-primary/20 selection:text-primary overflow-x-hidden">
      {/* Barra de urgência superior com temporizador regressivo */}
      <TopBanner />

      {/* Estrutura oficial da página de vendas baseada na nova copy */}
      <main>
        {/* 1. Hero: Uma Nova Forma de Pagar Online e Presencialmente + Vídeo */}
        <HeroSection />

        {/* 2. Reconheces-te em alguma destas situações? (Dores) */}
        <PainPointsSection />

        {/* 3. Apresentamos o Cartão Virtual 2 em 1 (Solução e Benefícios) */}
        <SolutionSection />

        {/* 4. O que vais aprender (Aulas 01 a 07) */}
        <StepsSection />

        {/* 5. O que podes fazer com o cartão? (6 Categorias) */}
        <WhatYouCanPaySection />

        {/* 6. O que dizem os nossos clientes (Testemunhos Reais Editáveis) */}
        <TestimonialsSection />

        {/* 7. Resultados reais (Provas e comprovativos preparados) */}
        <ProofsSection />

        {/* 8. E ainda recebes estes bónus */}
        <BonusesSection />

        {/* 9. Quanto vale ter mais liberdade nos teus pagamentos? (Preço Promocional: 199 MT) */}
        <PricingSection />

        {/* 10. Perguntas Frequentes (10 FAQs oficiais) */}
        <FaqSection />

        {/* 11. Chega de ficar bloqueado (CTA Final) */}
        <FinalCtaSection />
      </main>

      {/* Notificações pop-up de compras recentes */}
      <PurchaseToast />

      {/* Rodapé Oficial */}
      <Footer />
    </div>
  );
}
