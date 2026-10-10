import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  CheckCircle2,
  Copy,
  Check,
  ShieldCheck,
  Lock,
  ArrowRight,
  Clock,
  Sparkles,
  Smartphone,
  MessageCircle,
  AlertCircle,
  Mail,
  User,
  Phone,
} from 'lucide-react';
import { useCheckoutModal } from '../context/CheckoutModalContext';
import { trackDualMetaEvent } from '../lib/metaTracking';

const MPESA_NUMBER = "844810213";
const EMOLA_NUMBER = "862676534";
const ACCOUNT_HOLDER = "Ernesto Frencio Jossias Tapaio";
const SUPPORT_WHATSAPP = "822974370";
const SUPPORT_WHATSAPP_LINK = "https://wa.me/258822974370";
const PRODUCT_PRICE = "350 MT";
const PRODUCT_NAME = "Minicurso Cartão Virtual 2 em 1";

export const ManualCheckoutModal = () => {
  const { isOpen, closeCheckout } = useCheckoutModal();

  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'emola'>('mpesa');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [isSuccessStep, setIsSuccessStep] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  // Temporizador de reserva de 15 minutos
  const [timeLeft, setTimeLeft] = useState<number>(14 * 60 + 59);

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const currentNumber = paymentMethod === 'mpesa' ? MPESA_NUMBER : EMOLA_NUMBER;

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(currentNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const generateWhatsAppMessage = () => {
    const methodLabel = paymentMethod === 'mpesa' ? 'M-Pesa' : 'e-Mola';
    const lines = [
      `👋 *Olá Ernesto! Acabei de fazer a transferência para o ${PRODUCT_NAME}.*`,
      '',
      `📋 *DADOS PARA LIBERAÇÃO DO ACESSO:*`,
      `• *Nome:* ${customerName.trim() || 'Cliente'}`,
      `• *E-mail para Acesso (Área de Membros):* ${customerEmail.trim() || 'Não informado'}`,
      `• *WhatsApp:* ${customerPhone.trim() || 'Não informado'}`,
      `• *Forma de Pagamento:* ${methodLabel}`,
      `• *Valor Transferido:* ${PRODUCT_PRICE}`,
      `• *Titular Pago:* ${ACCOUNT_HOLDER}`,
      '',
      `📎 *Segue o comprovativo da transferência (print / mensagem do ${methodLabel}) em anexo para confirmar e ativar o meu acesso no e-mail informado.*`,
    ];
    return encodeURIComponent(lines.join('\n'));
  };

  const handleSubmitProof = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName.trim()) {
      setErrorMessage('Por favor, indica o teu nome completo.');
      return;
    }
    if (!customerEmail.trim() || !customerEmail.includes('@')) {
      setErrorMessage('Por favor, indica um e-mail válido para receberes o acesso às aulas.');
      return;
    }
    if (!customerPhone.trim()) {
      setErrorMessage('Por favor, indica o teu número de WhatsApp.');
      return;
    }

    setErrorMessage('');
    setSubmitting(true);

    // Dispara o evento de Purchase tanto no Pixel como na API de Conversões da Meta com nome, telefone e e-mail
    await trackDualMetaEvent(
      'Purchase',
      {
        name: customerName,
        phone: customerPhone,
        email: customerEmail,
      },
      {
        value: 350,
        currency: 'MZN',
        content_name: PRODUCT_NAME,
      }
    );

    const waUrl = `${SUPPORT_WHATSAPP_LINK}?text=${generateWhatsAppMessage()}`;

    // Abre o WhatsApp para envio imediato do comprovativo
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    // Transiciona para o ecrã de sucesso do checkout
    setIsSuccessStep(true);
    setSubmitting(false);
  };

  const handleReset = () => {
    setIsSuccessStep(false);
    setCustomerName('');
    setCustomerEmail('');
    setCustomerPhone('');
    setErrorMessage('');
    closeCheckout();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-black/80 backdrop-blur-md">
        {/* Backdrop click to close */}
        <div className="fixed inset-0" onClick={closeCheckout} />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-lg bg-card border border-border/80 rounded-2xl shadow-2xl overflow-hidden z-10 text-foreground my-auto"
        >
          {/* Header Bar */}
          <div className="bg-gradient-to-r from-red-950/70 via-card to-background p-4 sm:p-5 border-b border-border/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center text-primary">
                <Lock size={16} />
              </div>
              <div>
                <h3 className="font-display font-bold text-sm sm:text-base text-foreground flex items-center gap-2">
                  <span>Checkout Seguro</span>
                  <span className="text-[10px] bg-primary/20 text-primary border border-primary/30 px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold">
                    OFICIAL
                  </span>
                </h3>
                <p className="text-[11px] text-muted-foreground">
                  Acesso Completo ao Minicurso Cartão Virtual 2 em 1
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={closeCheckout}
              className="text-muted-foreground hover:text-foreground p-1.5 rounded-lg hover:bg-secondary transition-colors cursor-pointer"
              title="Fechar"
            >
              <X size={18} />
            </button>
          </div>

          {/* Banner de Reserva de Tempo */}
          <div className="bg-primary/10 border-b border-primary/20 px-4 py-2 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-foreground font-medium">
              <Clock size={13} className="text-primary animate-pulse" />
              <span>Vaga reservada com valor promocional por:</span>
            </div>
            <span className="font-mono font-bold text-primary tracking-wider bg-background/80 px-2 py-0.5 rounded border border-primary/30">
              {formattedTime}
            </span>
          </div>

          {!isSuccessStep ? (
            /* Formulário de Pagamento */
            <form onSubmit={handleSubmitProof} className="p-4 sm:p-6 space-y-4">
              {/* Resumo do Pedido */}
              <div className="bg-secondary/40 border border-border rounded-xl p-3 sm:p-4 flex items-center justify-between">
                <div>
                  <div className="text-xs text-muted-foreground font-medium">Produto</div>
                  <div className="font-display font-bold text-xs sm:text-sm text-foreground">
                    Mentoria Cartão Virtual 2 em 1
                  </div>
                  <div className="text-[11px] text-emerald-400 font-semibold mt-0.5">
                    ✓ Acesso na Área de Membros + Suporte incluído
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] line-through text-muted-foreground">750 MT</div>
                  <div className="font-display font-black text-xl sm:text-2xl text-gradient-red leading-none">
                    350 MT
                  </div>
                </div>
              </div>

              {/* Passo 1: Dados do Aluno para a Hotmart / Área de Membros */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-bold text-foreground uppercase tracking-wide">
                  <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-black">
                    1
                  </span>
                  <span>Os teus dados para ativação do acesso</span>
                </div>

                <div className="space-y-2.5">
                  <div>
                    <label className="block text-[11px] font-semibold text-foreground/80 mb-1 flex items-center gap-1">
                      <User size={11} className="text-primary" />
                      <span>Nome Completo *</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: João Macuácua"
                      value={customerName}
                      onChange={(e) => {
                        setCustomerName(e.target.value);
                        if (errorMessage) setErrorMessage('');
                      }}
                      className="w-full bg-background border border-border rounded-lg px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-semibold text-foreground/80 mb-1 flex items-center gap-1">
                        <Mail size={11} className="text-primary" />
                        <span>Teu E-mail de Acesso *</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="Ex: joao@gmail.com"
                        value={customerEmail}
                        onChange={(e) => {
                          setCustomerEmail(e.target.value);
                          if (errorMessage) setErrorMessage('');
                        }}
                        className="w-full bg-background border border-border rounded-lg px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                      />
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        O login e acesso às aulas serão liberados para este e-mail.
                      </p>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-foreground/80 mb-1 flex items-center gap-1">
                        <Phone size={11} className="text-primary" />
                        <span>Teu WhatsApp *</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="Ex: 84 / 82 / 86..."
                        value={customerPhone}
                        onChange={(e) => {
                          setCustomerPhone(e.target.value);
                          if (errorMessage) setErrorMessage('');
                        }}
                        className="w-full bg-background border border-border rounded-lg px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                      />
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        Para suporte direto com o instrutor.
                      </p>
                    </div>
                  </div>
                </div>

                {errorMessage && (
                  <p className="text-[11px] text-red font-medium flex items-center gap-1 pt-0.5">
                    <AlertCircle size={12} />
                    {errorMessage}
                  </p>
                )}
              </div>

              {/* Passo 2: Seleção de Carteira Móvel */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-bold text-foreground uppercase tracking-wide">
                  <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-black">
                    2
                  </span>
                  <span>Escolhe a Carteira Móvel para Pagar</span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('mpesa')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      paymentMethod === 'mpesa'
                        ? 'bg-red/10 border-red ring-1 ring-red/40'
                        : 'bg-background hover:bg-secondary border-border'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5 font-bold text-xs">
                        <span className="w-2.5 h-2.5 rounded-full bg-red" />
                        <span className="text-foreground">M-Pesa</span>
                      </div>
                      {paymentMethod === 'mpesa' && (
                        <CheckCircle2 size={14} className="text-primary" />
                      )}
                    </div>
                    <span className="text-[10px] text-muted-foreground font-mono">
                      {MPESA_NUMBER}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('emola')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      paymentMethod === 'emola'
                        ? 'bg-amber-500/10 border-amber-500 ring-1 ring-amber-500/40'
                        : 'bg-background hover:bg-secondary border-border'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5 font-bold text-xs">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                        <span className="text-foreground">e-Mola</span>
                      </div>
                      {paymentMethod === 'emola' && (
                        <CheckCircle2 size={14} className="text-amber-500" />
                      )}
                    </div>
                    <span className="text-[10px] text-muted-foreground font-mono">
                      {EMOLA_NUMBER}
                    </span>
                  </button>
                </div>

                {/* Caixa com os Dados Oficiais de Transferência */}
                <div className="bg-secondary/60 border border-primary/30 rounded-xl p-3.5 sm:p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">
                        Número {paymentMethod === 'mpesa' ? 'M-Pesa' : 'e-Mola'}:
                      </div>
                      <div className="font-mono font-black text-lg sm:text-xl text-foreground tracking-wider">
                        {currentNumber}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyNumber}
                      className="inline-flex items-center gap-1.5 bg-primary/20 hover:bg-primary/30 border border-primary/40 text-primary text-xs font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer active:scale-95"
                    >
                      {copied ? (
                        <>
                          <Check size={13} className="text-emerald-400" />
                          <span className="text-emerald-400">Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={13} />
                          <span>Copiar</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="pt-2 border-t border-border/80 flex flex-col gap-1 text-xs">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-muted-foreground text-[11px]">Titular da Conta:</span>
                      <strong className="text-foreground font-semibold text-right text-[11px] sm:text-xs">
                        {ACCOUNT_HOLDER}
                      </strong>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-muted-foreground">Valor a transferir:</span>
                      <strong className="text-primary font-bold">{PRODUCT_PRICE}</strong>
                    </div>
                  </div>

                  {/* Instruções Rápidas */}
                  <div className="bg-background/80 rounded-lg p-2.5 text-[11px] text-muted-foreground space-y-1 border border-border/60">
                    <p className="font-semibold text-foreground flex items-center gap-1.5">
                      <Smartphone size={12} className="text-primary" />
                      Como fazer agora no teu telefone:
                    </p>
                    {paymentMethod === 'mpesa' ? (
                      <ol className="list-decimal list-inside space-y-0.5 text-[10px] pl-1">
                        <li>Abre o menu <code className="text-primary font-mono">*150#</code> ou a App M-Pesa.</li>
                        <li>Escolhe <strong>Transferir Dinheiro</strong> para <strong>{MPESA_NUMBER}</strong>.</li>
                        <li>Confirma o nome do titular (<strong>{ACCOUNT_HOLDER}</strong>) e digita o teu PIN.</li>
                      </ol>
                    ) : (
                      <ol className="list-decimal list-inside space-y-0.5 text-[10px] pl-1">
                        <li>Abre o menu <code className="text-amber-500 font-mono">*898#</code> ou a App e-Mola.</li>
                        <li>Escolhe <strong>Transferir Dinheiro</strong> para <strong>{EMOLA_NUMBER}</strong>.</li>
                        <li>Confirma o nome do titular (<strong>{ACCOUNT_HOLDER}</strong>) e digita o teu PIN.</li>
                      </ol>
                    )}
                  </div>
                </div>
              </div>

              {/* Passo 3: Botão de Envio de Comprovativo */}
              <div className="pt-1">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gradient-red hover:bg-gradient-red-hover text-primary-foreground font-display font-bold text-xs sm:text-sm py-3.5 px-4 rounded-xl shadow-red-strong flex items-center justify-center gap-2 tracking-wide uppercase transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:opacity-60"
                >
                  <MessageCircle size={17} className="animate-bounce" />
                  <span>JÁ TRANSFERI • ENVIAR COMPROVATIVO NO WHATSAPP</span>
                  <ArrowRight size={15} />
                </button>

                <p className="text-center text-[10px] text-muted-foreground mt-2 leading-tight">
                  Ao clicar, abre o WhatsApp oficial com teus dados e e-mail prontos para anexar o comprovativo.
                </p>
              </div>

              {/* Rodapé de Confiança */}
              <div className="pt-2 border-t border-border/60 flex items-center justify-center gap-4 text-[11px] text-muted-foreground">
                <div className="flex items-center gap-1">
                  <ShieldCheck size={13} className="text-emerald-400" />
                  <span>Pagamento 100% Protegido</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Sparkles size={13} className="text-primary" />
                  <span>Área de Membros Protegida</span>
                </div>
              </div>
            </form>
          ) : (
            /* Ecrã de Sucesso / Confirmação */
            <div className="p-6 sm:p-8 text-center space-y-5">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 12 }}
                className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center mx-auto text-emerald-400"
              >
                <CheckCircle2 size={32} />
              </motion.div>

              <div>
                <span className="text-[11px] font-bold text-emerald-400 tracking-wider uppercase bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  PEDIDO REGISTADO COM SUCESSO
                </span>
                <h3 className="font-display font-bold text-lg sm:text-2xl text-foreground mt-3 mb-2">
                  Muito obrigado, {customerName || 'Alun(a)'}! 🎉
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
                  O teu acesso exclusivo às aulas na Área de Membros será ativado para o e-mail:
                </p>
                <div className="mt-2 inline-flex items-center gap-2 bg-primary/10 border border-primary/30 px-3.5 py-1.5 rounded-lg text-xs font-bold text-primary font-mono">
                  <Mail size={13} />
                  <span>{customerEmail}</span>
                </div>
              </div>

              {/* Caixa de Resumo no Sucesso */}
              <div className="bg-secondary/60 border border-border rounded-xl p-4 text-left max-w-sm mx-auto text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Produto:</span>
                  <span className="font-semibold text-foreground">{PRODUCT_NAME}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Valor:</span>
                  <span className="font-bold text-primary">{PRODUCT_PRICE}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">E-mail de Acesso:</span>
                  <span className="font-medium text-foreground">{customerEmail}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Suporte Oficial:</span>
                  <span className="font-mono font-bold text-foreground">+258 {SUPPORT_WHATSAPP}</span>
                </div>
              </div>

              {/* Botão de reabrir o WhatsApp caso não tenha aberto */}
              <div className="space-y-2 pt-2">
                <a
                  href={`${SUPPORT_WHATSAPP_LINK}?text=${generateWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-red hover:bg-gradient-red-hover text-primary-foreground font-display font-bold text-xs sm:text-sm py-3.5 px-4 rounded-xl shadow-red-strong uppercase tracking-wide transition-all hover:scale-[1.01]"
                >
                  <MessageCircle size={16} />
                  <span>Abrir WhatsApp do Suporte Agora</span>
                </a>

                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full text-xs text-muted-foreground hover:text-foreground py-2 transition-colors cursor-pointer"
                >
                  Voltar à página
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
