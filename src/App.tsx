import { useState, useEffect } from 'react';
import { MainSalesPage } from './components/MainSalesPage';
import { ThankYouPage } from './pages/ThankYouPage';

export default function App() {
  const [isThankYouPage, setIsThankYouPage] = useState(() => {
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname.toLowerCase();
      const params = new URLSearchParams(window.location.search);
      if (
        pathname.includes('obrigado') ||
        params.get('pagina') === 'obrigado' ||
        params.get('status') === 'obrigado' ||
        params.get('obrigado') === 'true'
      ) {
        return true;
      }
    }
    return false;
  });

  useEffect(() => {
    const handlePopState = () => {
      const pathname = window.location.pathname.toLowerCase();
      const params = new URLSearchParams(window.location.search);
      setIsThankYouPage(
        pathname.includes('obrigado') ||
        params.get('pagina') === 'obrigado' ||
        params.get('status') === 'obrigado' ||
        params.get('obrigado') === 'true'
      );
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  if (isThankYouPage) {
    return <ThankYouPage />;
  }

  return <MainSalesPage />;
}
