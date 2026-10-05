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
  AlertCircle
} from 'lucide-react';
import { DIVIDI_MESA_PRICE } from '../../config/pricing';
import qrPersonalPay from '../../assets/images/qr-personal-pay.png';
import qrBinancePay from '../../assets/images/qr-binance-pay.jpg';

interface DividiMesaPurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DividiMesaPurchaseModal: React.FC<DividiMesaPurchaseModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<'Personal Pay' | 'Binance Pay'>('Personal Pay');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [copiedAlias, setCopiedAlias] = useState(false);
  const [activeQrViewer, setActiveQrViewer] = useState<'personal' | 'binance' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleCopyAlias = () => {
    navigator.clipboard.writeText(DIVIDI_MESA_PRICE.personalPayAlias);
    setCopiedAlias(true);
    setTimeout(() => setCopiedAlias(false), 2500);
  };

  const handleSubmitPayment = async (e: React.FormEvent) => {
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

    try {
      setIsSubmitting(true);
      const res = await fetch('/api/purchase-orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          payment_method: selectedMethod,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Error al procesar la solicitud.');
      }

      // Backup local persistente para máxima sincronización en entornos serverless/Netlify
      if (data.order) {
        try {
          const stored = JSON.parse(localStorage.getItem('ai_quantum_purchase_orders') || '[]');
          const filtered = stored.filter((item: any) => item.id !== data.order.id);
          filtered.unshift(data.order);
          localStorage.setItem('ai_quantum_purchase_orders', JSON.stringify(filtered));
        } catch {
          // ignore
        }
      }

      setIsSuccess(true);
    } catch (err: any) {
      console.error('Error enviando orden:', err);
      setErrorMessage(err.message || 'Error de conexión. Intentá nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
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

        {/* PANTALLA 1: ÉXITO / SOLICITUD RECIBIDA */}
        {isSuccess ? (
          <div className="py-6 sm:py-8 text-center space-y-5 animate-in zoom-in-95 duration-200 relative z-10">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
                ✓ PENDIENTE DE VERIFICACIÓN
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
                ✅ SOLICITUD RECIBIDA
              </h2>
            </div>

            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 space-y-3 font-mono text-xs text-left max-w-sm mx-auto">
              <p className="text-slate-200">
                Registramos tu solicitud de acceso a <strong className="text-cyan-400">Dividí Mesa</strong>.
              </p>
              <p className="text-slate-300">
                Estamos verificando el pago ingresado por <strong>{selectedMethod}</strong>.
              </p>
              <p className="text-emerald-400 font-semibold">
                Una vez confirmado, recibirás tu acceso directo.
              </p>
            </div>

            <p className="text-xs text-slate-400 font-mono">
              No necesitás realizar ningún otro paso.
            </p>

            <button
              onClick={handleModalClose}
              className="w-full py-4 bg-cyan-400 hover:bg-cyan-300 text-black font-mono font-black text-sm uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-cyan-400/20 cursor-pointer active:scale-98"
            >
              CERRAR
            </button>
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
                    Precio final:
                  </span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="font-display text-2xl sm:text-3xl font-black text-cyan-400">
                      USD 2
                    </span>
                    <span className="text-xs font-mono text-slate-400 font-medium">
                      · Argentina: <strong className="text-white">$3.300 ARS</strong>
                    </span>
                  </div>
                </div>

                <div className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                  Activación Manual 100%
                </div>
              </div>

              <p className="mt-3 text-xs sm:text-sm text-slate-300 font-mono">
                Elegí cómo querés realizar el pago.
              </p>
            </div>

            {/* Selector de Método de Pago */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSelectedMethod('Personal Pay')}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  selectedMethod === 'Personal Pay'
                    ? 'bg-cyan-500/15 border-cyan-400 shadow-md shadow-cyan-400/20'
                    : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold font-mono text-white flex items-center gap-1.5">
                      <span>🇦🇷</span> PERSONAL PAY
                    </span>
                    {selectedMethod === 'Personal Pay' && (
                      <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    )}
                  </div>
                  <div className="text-[11px] font-mono text-slate-400">
                    Transferencia / QR
                  </div>
                </div>
                <div className="mt-3 font-mono font-black text-sm text-cyan-300">
                  $3.300 ARS
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMethod('Binance Pay')}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  selectedMethod === 'Binance Pay'
                    ? 'bg-amber-500/15 border-amber-400 shadow-md shadow-amber-400/20'
                    : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold font-mono text-white flex items-center gap-1.5">
                      <span>₿</span> BINANCE PAY
                    </span>
                    {selectedMethod === 'Binance Pay' && (
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                    )}
                  </div>
                  <div className="text-[11px] font-mono text-slate-400">
                    Pagá con Binance Pay
                  </div>
                </div>
                <div className="mt-3 font-mono font-black text-sm text-amber-300">
                  USD 2
                </div>
              </button>
            </div>

            {/* Detalle Operativo del Método Seleccionado */}
            {selectedMethod === 'Personal Pay' ? (
              <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-3 font-mono text-xs">
                <div className="text-slate-300">
                  Pagá mediante transferencia o QR desde tu billetera compatible:
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest block">
                      ALIAS:
                    </span>
                    <span className="font-mono text-base font-extrabold text-white tracking-wider">
                      {DIVIDI_MESA_PRICE.personalPayAlias}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyAlias}
                    className="px-3 py-2 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-black font-mono font-bold text-xs uppercase flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
                  >
                    {copiedAlias ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-black" />
                        <span>¡COPIADO!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>COPIAR ALIAS</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setActiveQrViewer('personal')}
                    className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 hover:text-white font-mono text-xs uppercase font-bold flex items-center justify-center gap-2 transition-all cursor-pointer border border-white/10"
                  >
                    <QrCode className="w-4 h-4 text-cyan-400" />
                    <span>▣ MOSTRAR QR</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-3 font-mono text-xs">
                <div className="text-slate-300">
                  Pagá con Binance Pay escaneando el código QR oficial de la cuenta:
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest block">
                      IMPORTE CRIPTO:
                    </span>
                    <span className="font-mono text-base font-extrabold text-amber-300">
                      USD 2 (USDT / BUSD)
                    </span>
                  </div>
                  <span className="px-2 py-1 rounded bg-amber-400/10 border border-amber-400/30 text-amber-300 text-[10px] font-bold">
                    BINANCE
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveQrViewer('binance')}
                  className="w-full py-2.5 rounded-xl bg-amber-400/15 hover:bg-amber-400/25 text-amber-300 border border-amber-400/30 font-mono text-xs uppercase font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <QrCode className="w-4 h-4 text-amber-400" />
                  <span>▣ MOSTRAR QR DE BINANCE PAY</span>
                </button>
              </div>
            )}

            {/* Formulario de Datos del Cliente (SOLO Nombre y Email) */}
            <form onSubmit={handleSubmitPayment} className="space-y-4 pt-2 border-t border-white/10">
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
                    Nombre completo <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. Juan Pérez"
                    className="w-full px-4 py-3 bg-white/5 border border-white/15 focus:border-cyan-400 rounded-xl text-white font-mono text-sm placeholder:text-slate-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
                    Email donde recibirás tu acceso <span className="text-cyan-400">*</span>
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

              {/* Botón Principal: YA REALICÉ EL PAGO */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-cyan-400 hover:bg-cyan-300 disabled:bg-slate-800 disabled:text-slate-500 text-black font-mono font-black text-sm uppercase tracking-widest rounded-xl transition-all shadow-xl shadow-cyan-400/25 active:scale-98 cursor-pointer flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>REGISTRANDO SOLICITUD...</span>
                ) : (
                  <>
                    <span>✅ YA REALICÉ EL PAGO</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-[11px] font-mono text-slate-400 text-center">
                Verificación manual por el equipo de AI Quantum Studio.
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
                  Una vez realizado el pago, completá tus datos en el formulario y pulsá <strong>"YA REALICÉ EL PAGO"</strong>.
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
