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
  Copy,
  Check,
  Sparkles,
} from 'lucide-react';
import { trackDualMetaEvent } from '../lib/metaTracking';

const SUPPORT_WHATSAPP_NUMBER = "862676534";
const SUPPORT_WHATSAPP_LINK = "https://wa.me/258862676534";
const HOTMART_LOGIN_URL = "https://consumer.hotmart.com/";

export const ThankYouPage = () => {
  const [customerName, setCustomerName] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [activationCode, setActivationCode] = useState<string>('CV-199-VIP');

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

      // Gera código de ativação amigável
      if (email) {
        const clean = email.replace(/[^a-zA-Z0-9]/g, '').slice(0, 4).toUpperCase();
        setActivationCode(`CV-199-${clean || 'ATIVAR'}`);
      } else {
        setActivationCode('CV-199-ATIVAR');
      }
    }

    // TRAVA DE DEDUPLICAÇÃO:
    // Garante que o evento de compra de 199 MT só dispara UMA VEZ por comprador no dispositivo.
    // Recarregar a página ou reabrir não gera eventos duplicados falsos.
    const lockKey = email ? `meta_purchase_fired_${email.toLowerCase().trim()}` : 'meta_purchase_fired_device';
    const isAlreadyFired = typeof window !== 'undefined' && (
      sessionStorage.getItem(lockKey) || localStorage.getItem(lockKey)
    );

    if (!isAlreadyFired) {
      // Dispara o evento oficial de Purchase (199 MT) para o Meta Pixel e Conversions API
      trackDualMetaEvent(
        'Purchase',
        {
          name: name || undefined,
          phone: phone || undefined,
          email: email || undefined,
        },
        {
          value: 199,
          currency: 'MZN',
          content_name: 'Minicurso Cartão Virtual 2 em 1',
        }
      );

      try {
        sessionStorage.setItem(lockKey, 'true');
        localStorage.setItem(lockKey, Date.now().toString());
      } catch (_) {}
    }
  }, []);

  const handleCopyCode = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(activationCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const getWhatsAppValidationUrl = () => {
    const textLines = [
      `👋 *Olá Ernesto! Já acabei de abrir a minha página oficial de confirmação.*`,
      '',
      `🔑 *MEU CÓDIGO DE ATIVAÇÃO:* ${activationCode}`,
      `📧 *MEU E-MAIL PARA HOTMART:* ${customerEmail || 'Já informado'}`,
      customerName ? `👤 *MEU NOME:* ${customerName}` : '',
      '',
      `✅ *Por favor, libere agora o meu acesso oficial às aulas do Minicurso Cartão Virtual!*`,
    ].filter(Boolean);

    return `${SUPPORT_WHATSAPP_LINK}?text=${encodeURIComponent(textLines.join('\n'))}`;
  };

  return (
    <div className="min-h-screen bg-background text-foreground antialiased font-sans relative selection:bg-primary/20 selection:text-primary py-10 px-4 sm:px-6 flex flex-col justify-between overflow-x-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

      <main className="container max-w-3xl mx-auto my-auto relative z-10 text-center">
        {/* Animated Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 14 }}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center mx-auto text-emerald-400 mb-5 shadow-lg shadow-emerald-500/10"
        >
          <CheckCircle2 size={38} className="sm:size-48" />
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="inline-block bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold text-xs uppercase tracking-widest px-3.5 py-1 rounded-full mb-3">
            ✓ PAGAMENTO CONFIRMADO • ATIVAÇÃO PENDENTE
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl sm:text-3xl md:text-4xl font-display font-bold leading-tight mb-3"
        >
          Parabéns{customerName ? `, ${customerName}` : ''}! O teu acesso ao <br className="hidden sm:inline" />
          <span className="text-gradient-red">Minicurso Cartão Virtual</span> está pronto! 🎉
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-muted-foreground text-xs sm:text-sm max-w-xl mx-auto mb-6 leading-relaxed"
        >
          O teu pagamento de <strong className="text-foreground">199 MT</strong> foi confirmado. Para finalizar a liberação do teu acesso na plataforma da <strong className="text-foreground">Hotmart</strong>, segue o passo abaixo:
        </motion.p>

        {/* 🌟 BLOCO ESTRATÉGICO: TAREFA DO CÓDIGO DE ATIVAÇÃO 🌟 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="bg-gradient-to-b from-card to-secondary/50 border-2 border-emerald-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl text-center max-w-xl mx-auto mb-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 bg-emerald-500 text-black font-bold text-[10px] uppercase tracking-wider px-3 py-0.5 rounded-bl-lg font-mono">
            PASSO OBRIGATÓRIO
          </div>

          <div className="inline-flex items-center gap-1.5 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles size={14} />
            <span>O teu Código de Ativação Oficial</span>
          </div>

          <p className="text-xs text-foreground/90 mb-4 max-w-md mx-auto">
            Copia o código abaixo ou clica no botão verde para enviá-lo diretamente no WhatsApp do instrutor e liberar a tua conta na Hotmart agora:
          </p>

          {/* Código em destaque com botão de copiar */}
          <div className="flex items-center justify-center gap-2 bg-background/80 border border-emerald-500/40 rounded-xl p-3 max-w-sm mx-auto mb-4">
            <span className="font-mono font-black text-lg sm:text-xl text-emerald-400 tracking-wider">
              {activationCode}
            </span>
            <button
              type="button"
              onClick={handleCopyCode}
              className="inline-flex items-center gap-1 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-400 text-xs font-bold px-2.5 py-1 rounded-lg transition-all cursor-pointer active:scale-95"
            >
              {copied ? (
                <>
                  <Check size={13} />
                  <span>Copiado!</span>
                </>
              ) : (
                <>
                  <Copy size={13} />
                  <span>Copiar</span>
                </>
              )}
            </button>
          </div>

          {/* Botão de Envio Direto para o WhatsApp */}
          <a
            href={getWhatsAppValidationUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-display font-bold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99] uppercase tracking-wide cursor-pointer"
          >
            <MessageCircle size={17} />
            <span>Enviar Código no WhatsApp e Liberar Acesso ➔</span>
          </a>

          <p className="text-[11px] text-muted-foreground mt-2.5">
            Ao clicar, abre o WhatsApp oficial com o teu código preenchido para validação imediata.
          </p>
        </motion.div>

        {customerEmail && (
          <div className="mb-6 inline-flex items-center gap-2 bg-primary/10 border border-primary/30 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-primary font-mono">
            <Mail size={13} />
            <span>Acesso será liberado para: <strong>{customerEmail}</strong></span>
          </div>
        )}

        {/* 3 Passos para Aceder às Aulas */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-card border border-border rounded-2xl p-4 sm:p-7 shadow-2xl text-left max-w-2xl mx-auto mb-8 space-y-4 sm:space-y-5"
        >
          <h2 className="font-display font-bold text-sm sm:text-base text-foreground uppercase tracking-wide border-b border-border pb-3 flex flex-wrap items-center justify-between gap-2">
            <span>Como Aceder às Aulas na Hotmart (3 Passos):</span>
            <span className="text-[11px] sm:text-xs text-primary font-mono font-semibold">Área de Membros</span>
          </h2>

          <div className="space-y-4">
            {/* Passo 1 */}
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center shrink-0 text-primary mt-0.5">
                <Mail size={16} className="sm:size-18" />
              </div>
              <div>
                <h3 className="font-semibold text-xs sm:text-sm text-foreground mb-0.5">
                  1. Verifica o teu E-mail
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Abre a caixa de entrada do e-mail que informaste e procura pela mensagem oficial enviada pela <strong>Hotmart</strong>. <em>(Dica: confere também a pasta de Spam ou Promoções).</em>
                </p>
              </div>
            </div>

            {/* Passo 2 */}
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center shrink-0 text-primary mt-0.5">
                <KeyRound size={16} className="sm:size-18" />
              </div>
              <div>
                <h3 className="font-semibold text-xs sm:text-sm text-foreground mb-0.5">
                  2. Define a tua Senha Pessoal
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Clica no link dentro do e-mail da Hotmart para criar a tua senha de segurança e ativar a tua conta pessoal.
                </p>
              </div>
            </div>

            {/* Passo 3 */}
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0 text-emerald-400 mt-0.5">
                <PlayCircle size={16} className="sm:size-18" />
              </div>
              <div>
                <h3 className="font-semibold text-xs sm:text-sm text-foreground mb-0.5">
                  3. Começa a Assistir Imediatamente
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Acede ao Hotmart Club e segue as aulas passo a passo para criar, carregar com M-Pesa/e-Mola e ativar o teu cartão virtual 2 em 1!
                </p>
              </div>
            </div>
          </div>

          {/* Botão de Atalho para Hotmart */}
          <div className="pt-3 border-t border-border flex flex-col sm:flex-row gap-2.5">
            <a
              href={HOTMART_LOGIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-red hover:bg-gradient-red-hover text-primary-foreground font-display font-bold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-red-strong uppercase tracking-wide transition-all hover:scale-[1.01] text-center"
            >
              <span>Ir para a Área de Membros Hotmart</span>
              <ExternalLink size={15} />
            </a>

            <a
              href={SUPPORT_WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/80 border border-border text-foreground font-display font-semibold text-xs sm:text-sm py-3 px-4 rounded-xl transition-all text-center"
            >
              <MessageCircle size={16} className="text-emerald-400" />
              <span>Chamar Suporte no WhatsApp</span>
            </a>
          </div>
        </motion.div>

        {/* Security badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs text-muted-foreground px-2">
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span>Acesso Vitalício Garantido</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={14} className="text-primary" />
            <span>Área de Membros Hotmart</span>
          </div>
        </div>
      </main>

      <footer className="text-center py-6 text-xs text-muted-foreground">
        <p>© 2026 — Minicurso Cartão Virtual. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};
