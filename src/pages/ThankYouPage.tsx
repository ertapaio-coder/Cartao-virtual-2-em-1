import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  CheckCircle2,
  Mail,
  KeyRound,
  PlayCircle,
  MessageCircle,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import { trackDualMetaEvent } from '../lib/metaTracking';

const SUPPORT_WHATSAPP_NUMBER = "862676534";
const SUPPORT_WHATSAPP_LINK = "https://wa.me/258862676534?text=Ol%C3%A1%20Ernesto!%20J%C3%A1%20estou%20na%20p%C3%A1gina%20de%20obrigado%20e%20preciso%20de%20ajuda%20com%20o%20meu%20acesso.";
const HOTMART_LOGIN_URL = "https://consumer.hotmart.com/";

export const ThankYouPage = () => {
  const [customerName, setCustomerName] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');

  useEffect(() => {
    // Altera o título da aba do navegador
    document.title = "Acesso Confirmado | Minicurso Cartão Virtual 2 em 1";

    let name = '';
    let email = '';
    let phone = '';

    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      name = params.get('nome') || params.get('name') || '';
      email = params.get('email') || '';
      phone = params.get('tel') || params.get('phone') || '';
      setCustomerName(name);
      setCustomerEmail(email);
    }

    // Dispara o evento oficial de Purchase (350 MT) para o Meta Pixel e Conversions API
    trackDualMetaEvent(
      'Purchase',
      {
        name: name || undefined,
        phone: phone || undefined,
        email: email || undefined,
      },
      {
        value: 350,
        currency: 'MZN',
        content_name: 'Minicurso Cartão Virtual 2 em 1',
      }
    );
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground antialiased font-sans relative selection:bg-primary/20 selection:text-primary py-12 px-4 sm:px-6 flex flex-col justify-between overflow-x-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

      <main className="container max-w-3xl mx-auto my-auto relative z-10 text-center">
        {/* Animated Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 14 }}
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center mx-auto text-emerald-400 mb-6 shadow-lg shadow-emerald-500/10"
        >
          <CheckCircle2 size={44} className="sm:size-52" />
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="inline-block bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold text-xs uppercase tracking-widest px-3.5 py-1 rounded-full mb-4">
            ✓ PAGAMENTO CONFIRMADO • ACESSO LIBERADO
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-2xl sm:text-4xl md:text-5xl font-display font-bold leading-tight mb-4"
        >
          Parabéns{customerName ? `, ${customerName}` : ''}! O teu acesso ao <br className="hidden sm:inline" />
          <span className="text-gradient-red">Minicurso Cartão Virtual</span> está pronto! 🎉
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed"
        >
          O teu pagamento de <strong className="text-foreground">350 MT</strong> foi confirmado e o teu acesso oficial já foi atribuído na plataforma da <strong className="text-foreground">Hotmart</strong>.
        </motion.p>

        {customerEmail && (
          <div className="mb-8 inline-flex items-center gap-2 bg-primary/10 border border-primary/30 px-4 py-2 rounded-xl text-xs font-semibold text-primary font-mono">
            <Mail size={14} />
            <span>Acesso enviado para: <strong>{customerEmail}</strong></span>
          </div>
        )}

        {/* 3 Passos para Aceder às Aulas */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-2xl text-left max-w-2xl mx-auto mb-8 space-y-6"
        >
          <h2 className="font-display font-bold text-base sm:text-lg text-foreground uppercase tracking-wide border-b border-border pb-3 flex items-center justify-between">
            <span>Como Aceder às Aulas Agora (3 Passos):</span>
            <span className="text-xs text-primary font-mono font-semibold">Área Hotmart</span>
          </h2>

          <div className="space-y-5">
            {/* Passo 1 */}
            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center shrink-0 text-primary mt-0.5">
                <Mail size={18} />
              </div>
              <div>
                <h3 className="font-semibold text-sm sm:text-base text-foreground mb-1">
                  1. Verifica o teu E-mail
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Abre a caixa de entrada do e-mail que informaste e procura pela mensagem de boas-vindas enviada pela <strong>Hotmart</strong>. <em>(Dica: confere também a pasta de Spam ou Promoções se não vires na caixa principal).</em>
                </p>
              </div>
            </div>

            {/* Passo 2 */}
            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center shrink-0 text-primary mt-0.5">
                <KeyRound size={18} />
              </div>
              <div>
                <h3 className="font-semibold text-sm sm:text-base text-foreground mb-1">
                  2. Define a tua Senha Pessoal
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Clica no link dentro do e-mail da Hotmart para criar a tua senha de segurança e ativar a tua conta pessoal.
                </p>
              </div>
            </div>

            {/* Passo 3 */}
            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0 text-emerald-400 mt-0.5">
                <PlayCircle size={18} />
              </div>
              <div>
                <h3 className="font-semibold text-sm sm:text-base text-foreground mb-1">
                  3. Começa a Assistir Imediatamente
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Acede ao Hotmart Club e segue as aulas passo a passo para criar, carregar com M-Pesa/e-Mola e ativar o teu cartão virtual 2 em 1!
                </p>
              </div>
            </div>
          </div>

          {/* Botão de Atalho para Hotmart */}
          <div className="pt-4 border-t border-border flex flex-col sm:flex-row gap-3">
            <a
              href={HOTMART_LOGIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-red hover:bg-gradient-red-hover text-primary-foreground font-display font-bold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-red-strong uppercase tracking-wide transition-all hover:scale-[1.01]"
            >
              <span>Ir para a Área de Membros Hotmart</span>
              <ExternalLink size={15} />
            </a>

            <a
              href={SUPPORT_WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/80 border border-border text-foreground font-display font-semibold text-xs sm:text-sm py-3 px-4 rounded-xl transition-all"
            >
              <MessageCircle size={16} className="text-emerald-400" />
              <span>Chamar Suporte no WhatsApp</span>
            </a>
          </div>
        </motion.div>

        {/* Security badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span>Acesso Vitalício Garantido</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            <MessageCircle size={14} className="text-primary" />
            <span>Suporte WhatsApp: +258 {SUPPORT_WHATSAPP_NUMBER}</span>
          </div>
        </div>
      </main>

      <footer className="text-center py-6 text-xs text-muted-foreground">
        <p>© 2026 — Minicurso Cartão Virtual. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};
