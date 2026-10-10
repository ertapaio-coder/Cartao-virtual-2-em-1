import { TopBanner } from './TopBanner';
import { HeroSection } from './HeroSection';
import { PainPointsSection } from './PainPointsSection';
import { SolutionSection } from './SolutionSection';
import { StepsSection } from './StepsSection';
import { WhatYouCanPaySection } from './WhatYouCanPaySection';
import { TestimonialsSection } from './TestimonialsSection';
import { ProofsSection } from './ProofsSection';
import { BonusesSection } from './BonusesSection';
import { PricingSection } from './PricingSection';
import { FaqSection } from './FaqSection';
import { FinalCtaSection } from './FinalCtaSection';
import { PurchaseToast } from './PurchaseToast';
import { Footer } from './Footer';

export const MainSalesPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground pt-14 sm:pt-11 antialiased font-sans relative selection:bg-primary/20 selection:text-primary overflow-x-hidden">
      {/* Barra de urgência superior com temporizador regressivo */}
      <TopBanner />

      {/* Estrutura oficial da página de vendas com conversão direta para WhatsApp */}
      <main>
        {/* 1. Hero: Uma Nova Forma de Pagar Online e Presencialmente + Vídeo */}
        <HeroSection />

        {/* 2. Reconheces-te em alguma destas situações? (Dores) */}
        <PainPointsSection />

        {/* 3. Apresentamos o Cartão Virtual 2 em 1 (Solução e Benefícios) */}
        <SolutionSection />

        {/* 4. Resultados reais (Provas e comprovativos preparados) */}
        <ProofsSection />

        {/* 5. O que vais aprender (Aulas 01 a 07) */}
        <StepsSection />

        {/* 6. O que podes fazer com o cartão? (6 Categorias) */}
        <WhatYouCanPaySection />

        {/* 7. O que dizem os nossos clientes (Testemunhos Reais Editáveis) */}
        <TestimonialsSection />

        {/* 8. E ainda recebes estes bónus */}
        <BonusesSection />

        {/* 9. Quanto vale ter mais liberdade nos teus pagamentos? (Preço Promocional: 350 MT) */}
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
};
