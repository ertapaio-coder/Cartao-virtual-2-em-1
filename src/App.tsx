import { useState, useEffect } from 'react';
import { MainSalesPage } from './components/MainSalesPage';
import { ThankYouPage } from './pages/ThankYouPage';

/**
 * Função ultra-robusta de deteção da Página de Obrigado.
 * Suporta:
 * - Pathnames: /obrigado, /obrigado/, /thank-you, /sucesso
 * - Query strings: ?pagina=obrigado, ?page=obrigado, ?obrigado, ?status=obrigado, etc.
 * - Hash routes: #obrigado, #/obrigado, #sucesso
 */
function checkIsThankYouRoute(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const pathname = (window.location.pathname || '').toLowerCase();
    const search = (window.location.search || '').toLowerCase();
    const hash = (window.location.hash || '').toLowerCase();

    // 1. Deteção por pathname
    if (
      pathname.includes('obrigado') ||
      pathname.includes('thank') ||
      pathname.includes('sucesso')
    ) {
      return true;
    }

    // 2. Deteção por Query Parameters
    const params = new URLSearchParams(window.location.search);
    if (
      params.has('obrigado') ||
      params.get('pagina')?.toLowerCase() === 'obrigado' ||
      params.get('page')?.toLowerCase() === 'obrigado' ||
      params.get('status')?.toLowerCase() === 'obrigado' ||
      params.get('status')?.toLowerCase() === 'success' ||
      search.includes('obrigado') ||
      search.includes('sucesso')
    ) {
      return true;
    }

    // 3. Deteção por Hash
    if (
      hash.includes('obrigado') ||
      hash.includes('thank') ||
      hash.includes('sucesso')
    ) {
      return true;
    }
  } catch {
    return false;
  }
  return false;
}

export default function App() {
  const [isThankYouPage, setIsThankYouPage] = useState<boolean>(() => checkIsThankYouRoute());

  useEffect(() => {
    const handleUrlChange = () => {
      setIsThankYouPage(checkIsThankYouRoute());
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);

    // Garantia de checagem imediata
    handleUrlChange();

    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  if (isThankYouPage) {
    return <ThankYouPage />;
  }

  return <MainSalesPage />;
}
