import React, { useState } from 'react';
import { 
  X, 
  Check, 
  Copy, 
  QrCode, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  CreditCard,
  CheckCircle2,
  AlertCircle,
  MessageCircle
} from 'lucide-react';
import { DIVIDI_MESA_PRICE } from '../../config/pricing';
import qrPersonalPay from '../../assets/images/qr-personal-pay.png';
import qrBinancePay from '../../assets/images/qr-binance-pay.jpg';

interface DividiMesaPurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WHATSAPP_NUMBER = '5493412852228';

export const DividiMesaPurchaseModal: React.FC<DividiMesaPurchaseModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<'Personal Pay' | 'Binance Pay'>('Personal Pay');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [copiedAlias, setCopiedAlias] = useState(false);
  const [activeQrViewer, setActiveQrViewer] = useState<'personal' | 'binance' | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');

  if (!isOpen) return null;

  const handleCopyAlias = () => {
    navigator.clipboard.writeText(DIVIDI_MESA_PRICE.personalPayAlias);
    setCopiedAlias(true);
    setTimeout(() => setCopiedAlias(false), 2500);
  };

  const generateWhatsAppMessage = (clientName: string, clientEmail: string, method: string) => {
    const message = `🛒 SOLICITUD DE ACCESO — DIVIDÍ MESA

👤 Nombre: ${clientName.trim()}
📧 Email: ${clientEmail.trim().toLowerCase()}
💳 Método de pago: ${method}
💰 Precio: $3.300 ARS
📦 Producto: Dividí Mesa

Solicito la activación de mi acceso a Dividí Mesa.`;

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage('Por favor ingresá tu nombre completo.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Por favor ingresá un email válido para recibir tu acceso.');
      return;
    }

    const waLink = generateWhatsAppMessage(name, email, selectedMethod);
    setWhatsappUrl(waLink);

    // Registro de respaldo local sin dependencias externas
    try {
      const order = {
        id: `purchase_${Date.now()}`,
        product: 'dividi-mesa',
        product_name: 'Dividí Mesa',
        name: name.trim(),
        email: email.trim().toLowerCase(),
        payment_method: selectedMethod,
        price_ars: 3300,
        status: 'pending',
        created_at: new Date().toISOString(),
      };
      const stored = JSON.parse(localStorage.getItem('ai_quantum_purchase_orders') || '[]');
      stored.unshift(order);
      localStorage.setItem('ai_quantum_purchase_orders', JSON.stringify(stored));
    } catch {
      // ignore
    }

    // Abrir WhatsApp directamente compatible con escritorio y móvil
    window.open(waLink, '_blank', 'noopener,noreferrer');

    // Mostrar pantalla de confirmación visual
    setIsSuccess(true);
  };

  const handleModalClose = () => {
    setActiveQrViewer(null);
    setIsSuccess(false);
    setErrorMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#070b12] border border-cyan-500/30 rounded-3xl p-5 sm:p-8 shadow-2xl shadow-cyan-950/60 my-auto text-white overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={handleModalClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer z-20"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* PANTALLA 1: CONFIRMACIÓN VISUAL WHATSAPP */}
        {isSuccess ? (
          <div className="py-6 sm:py-8 text-center space-y-5 animate-in zoom-in-95 duration-200 relative z-10">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
                ✓ WhatsApp Preparado
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
                ✅ Solicitud preparada
              </h2>
            </div>

            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 space-y-3 font-mono text-xs text-left max-w-sm mx-auto">
              <p className="text-slate-200">
                Se abrió WhatsApp con tus datos de compra. Solo tenés que presionar <strong>ENVIAR</strong> para completar la solicitud.
              </p>
              <p className="text-emerald-400 font-semibold">
                Una vez que verifiquemos el pago, te vamos a enviar tu acceso a Dividí Mesa por WhatsApp.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-mono font-black text-sm uppercase tracking-widest rounded-xl transition-all shadow-xl shadow-emerald-500/25 active:scale-98 cursor-pointer flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>💬 ABRIR WHATSAPP</span>
              </a>

              <button
                type="button"
                onClick={handleModalClose}
                className="w-full py-3 bg-white/10 hover:bg-white/15 text-slate-300 hover:text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
              >
                CERRAR
              </button>
            </div>
          </div>
        ) : (
          /* PANTALLA 2: FORMULARIO Y SELECCIÓN DE PAGO */
          <div className="space-y-6 relative z-10">
            {/* Header del Producto */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-400/15 border border-cyan-400/30 text-[10px] font-mono font-bold tracking-widest text-cyan-400 uppercase">
                  AI QUANTUM STUDIO
                </span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold">
                  LICENCIA PERMANENTE
                </span>
              </div>

              <h2 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
                COMPRAR DIVIDÍ MESA
              </h2>

              {/* Bloque de Precio Centralizado */}
              <div className="mt-3 p-3.5 rounded-2xl bg-white/[0.04] border border-cyan-500/20 flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <span className="text-[11px] font-mono text-slate-400 block uppercase">
                    Precio Final Oficial
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-2xl sm:text-3xl font-black text-white">
                      $3.300 <span className="text-base text-cyan-400 font-mono">ARS</span>
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      o <strong className="text-slate-200">USD 2</strong> cripto
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    <Sparkles className="w-3 h-3" /> Pago único
                  </span>
                </div>
              </div>
            </div>

            {/* Selector de Método de Pago */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                Seleccioná tu método de pago
              </label>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedMethod('Personal Pay')}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                    selectedMethod === 'Personal Pay'
                      ? 'bg-cyan-500/10 border-cyan-400 shadow-lg shadow-cyan-500/10'
                      : 'bg-white/5 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xl">🇦🇷</span>
                    {selectedMethod === 'Personal Pay' && (
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    )}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-white">Personal Pay</div>
                    <div className="text-[11px] font-mono text-cyan-400 font-semibold">$3.300 ARS</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedMethod('Binance Pay')}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                    selectedMethod === 'Binance Pay'
                      ? 'bg-amber-500/10 border-amber-400 shadow-lg shadow-amber-500/10'
                      : 'bg-white/5 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xl">₿</span>
                    {selectedMethod === 'Binance Pay' && (
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    )}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-white">Binance Pay</div>
                    <div className="text-[11px] font-mono text-amber-400 font-semibold">USD 2 (USDT)</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Detalles del Pago Seleccionado */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
              {selectedMethod === 'Personal Pay' ? (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-400">Total a transferir:</span>
                    <span className="font-mono text-lg font-black text-cyan-400">$3.300 ARS</span>
                  </div>

                  {/* Alias Copiable */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-mono text-slate-400 block">
                      Alias de Personal Pay:
                    </span>
                    <div className="flex items-center gap-2 bg-black/40 p-2.5 rounded-xl border border-white/10">
                      <code className="text-cyan-300 font-mono font-bold text-sm flex-1 tracking-wider">
                        {DIVIDI_MESA_PRICE.personalPayAlias}
                      </code>
                      <button
                        type="button"
                        onClick={handleCopyAlias}
                        className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-mono font-bold transition-colors flex items-center gap-1.5 cursor-pointer active:scale-95"
                      >
                        {copiedAlias ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">¡Copiado!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copiar</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Botón para Abrir Visor de QR */}
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() => setActiveQrViewer('personal')}
                      className="w-full py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 hover:border-cyan-400/40 text-xs font-mono text-slate-200 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <QrCode className="w-4 h-4 text-cyan-400" />
                      <span>Ver código QR de Personal Pay en pantalla completa</span>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-400">Total a transferir:</span>
                    <span className="font-mono text-lg font-black text-amber-400">USD 2 (USDT/BUSD)</span>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[11px] font-mono text-slate-400 block">
                      Pago directo vía Binance:
                    </span>
                    <p className="text-xs font-mono text-slate-300 leading-relaxed">
                      Escaneá el código QR oficial de Binance Pay desde tu app de Binance para transferir exactamente USD 2.
                    </p>
                  </div>

                  {/* Botón para Abrir Visor de QR Binance */}
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() => setActiveQrViewer('binance')}
                      className="w-full py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 hover:border-amber-400/40 text-xs font-mono text-slate-200 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <QrCode className="w-4 h-4 text-amber-400" />
                      <span>Ver código QR de Binance Pay en pantalla completa</span>
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Formulario de Datos del Comprador */}
            <form onSubmit={handleSubmitPayment} className="space-y-4">
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1.5 font-bold">
                    Nombre completo <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej: Sofía Valenzuela"
                    className="w-full px-4 py-3 bg-white/5 border border-white/15 focus:border-cyan-400 rounded-xl text-white font-mono text-sm placeholder:text-slate-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1.5 font-bold">
                    Email de acceso <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nombre@ejemplo.com"
                    className="w-full px-4 py-3 bg-white/5 border border-white/15 focus:border-cyan-400 rounded-xl text-white font-mono text-sm placeholder:text-slate-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Botón Principal: ENVIAR SOLICITUD DE ACCESO */}
              <button
                type="submit"
                className="w-full py-4 bg-cyan-400 hover:bg-cyan-300 text-black font-mono font-black text-sm uppercase tracking-widest rounded-xl transition-all shadow-xl shadow-cyan-400/25 active:scale-98 cursor-pointer flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5 text-black" />
                <span>ENVIAR SOLICITUD DE ACCESO</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] font-mono text-slate-400 text-center">
                Atención directa por WhatsApp · Verificación manual por AI Quantum Studio
              </p>
            </form>
          </div>
        )}

        {/* SUB-MODAL VISOR DE QR (Centrado, Grande, Alto Contraste, Mobile First) */}
        {activeQrViewer && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4 bg-black/95 backdrop-blur-2xl animate-in fade-in duration-150 overflow-y-auto">
            <div className="relative w-full max-w-md bg-[#090e17] border border-cyan-500/30 rounded-3xl p-5 sm:p-7 shadow-2xl text-center space-y-4 my-auto">
              <button
                onClick={() => setActiveQrViewer(null)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer z-10"
                aria-label="Cerrar visor QR"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold block">
                  {activeQrViewer === 'personal' ? '🇦🇷 PERSONAL PAY' : '₿ BINANCE PAY'}
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-black text-white tracking-tight">
                  Escaneá el QR desde tu billetera
                </h3>
                <p className="text-xs font-mono text-slate-400">
                  {activeQrViewer === 'personal' 
                    ? 'Transferencia directa a volivera2.ppay' 
                    : 'Pago cripto directo en USDT / BUSD'}
                </p>
              </div>

              {/* Contenedor del QR en Alto Contraste, Sin Recortes y con Amplio Margen */}
              <div className="p-4 sm:p-6 bg-white rounded-3xl mx-auto w-full max-w-[300px] sm:max-w-[340px] shadow-2xl flex items-center justify-center">
                <img
                  src={activeQrViewer === 'personal' ? qrPersonalPay : qrBinancePay}
                  alt={activeQrViewer === 'personal' ? 'QR Oficial Personal Pay' : 'QR Oficial Binance Pay'}
                  className="w-full h-auto object-contain rounded-xl select-none"
                  loading="eager"
                />
              </div>

              <div className="space-y-3 pt-2 font-mono text-xs text-slate-300">
                <p className="text-[11px] text-slate-400 leading-relaxed px-2">
                  Una vez realizado el pago, completá tus datos en el formulario y pulsá <strong>"ENVIAR SOLICITUD DE ACCESO"</strong>.
                </p>

                <button
                  type="button"
                  onClick={() => setActiveQrViewer(null)}
                  className="w-full py-4 bg-white/10 hover:bg-white/20 text-white font-mono text-sm font-extrabold uppercase tracking-widest rounded-xl transition-all border border-white/15 cursor-pointer active:scale-98"
                >
                  CERRAR
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
