import React, { useState } from 'react';
import { X, Play, RotateCcw, Check, Sparkles, ArrowRight } from 'lucide-react';
import { MiniAppItem } from '../../types';

interface MiniAppSimulatorModalProps {
  app: MiniAppItem | null;
  onClose: () => void;
  onRequestCustomization: (appName: string) => void;
}

export const MiniAppSimulatorModal: React.FC<MiniAppSimulatorModalProps> = ({
  app,
  onClose,
  onRequestCustomization,
}) => {
  if (!app) return null;

  // Simulator states for TipQuantum
  const [totalTip, setTotalTip] = useState(45000);
  const [waitersHours, setWaitersHours] = useState(24);
  const [kitchenHours, setKitchenHours] = useState(16);
  const [barHours, setBarHours] = useState(8);

  // Simulator state for TurnoPulse
  const [queueName, setQueueName] = useState('');
  const [queuePartySize, setQueuePartySize] = useState('2');
  const [queueSubmitted, setQueueSubmitted] = useState(false);
  const [queuePosition, setQueuePosition] = useState(4);

  // Simulator state for B2B MarginQuote
  const [costPrice, setCostPrice] = useState(12000);
  const [targetMargin, setTargetMargin] = useState(40);
  const [volumeDiscount, setVolumeDiscount] = useState(5);

  const calculateTipPerHour = () => {
    const totalHours = waitersHours + kitchenHours + barHours;
    if (totalHours === 0) return 0;
    return Math.round(totalTip / totalHours);
  };

  const tipPerHour = calculateTipPerHour();

  // Margin calculation
  const calculatedSalePrice = Math.round(costPrice / (1 - targetMargin / 100));
  const finalDiscountedPrice = Math.round(calculatedSalePrice * (1 - volumeDiscount / 100));
  const finalProfit = finalDiscountedPrice - costPrice;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#090e17] border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-cyan-950/60 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle accent light */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <span>{app.category}</span>
              <span>·</span>
              <span>SIMULADOR EN VIVO</span>
            </div>
            <h3 className="font-display text-2xl font-bold text-white mt-1">
              {app.name}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
              {app.tagline}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Interactive Sandbox Body */}
        <div className="py-6 overflow-y-auto pr-1">
          {app.interactiveType === 'tip-calculator' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2">
                  Total de propinas acumuladas ($ ARS)
                </label>
                <div className="flex items-center gap-3">
                  <span className="text-xl font-bold text-cyan-400">$</span>
                  <input
                    type="number"
                    value={totalTip}
                    onChange={(e) => setTotalTip(Number(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-white/10 rounded px-3 py-2 text-lg font-mono text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                  <span className="text-[11px] font-mono text-slate-400 block mb-1">Horas Salón</span>
                  <input
                    type="number"
                    value={waitersHours}
                    onChange={(e) => setWaitersHours(Number(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-white/10 rounded px-2 py-1 text-sm font-mono text-white"
                  />
                  <span className="text-[10px] text-cyan-400 block mt-1 font-mono">
                    ${(waitersHours * tipPerHour).toLocaleString()}
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                  <span className="text-[11px] font-mono text-slate-400 block mb-1">Horas Cocina</span>
                  <input
                    type="number"
                    value={kitchenHours}
                    onChange={(e) => setKitchenHours(Number(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-white/10 rounded px-2 py-1 text-sm font-mono text-white"
                  />
                  <span className="text-[10px] text-cyan-400 block mt-1 font-mono">
                    ${(kitchenHours * tipPerHour).toLocaleString()}
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                  <span className="text-[11px] font-mono text-slate-400 block mb-1">Horas Barra</span>
                  <input
                    type="number"
                    value={barHours}
                    onChange={(e) => setBarHours(Number(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-white/10 rounded px-2 py-1 text-sm font-mono text-white"
                  />
                  <span className="text-[10px] text-cyan-400 block mt-1 font-mono">
                    ${(barHours * tipPerHour).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Real-time Calculation Result */}
              <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">Valor por hora liquidada</span>
                  <span className="text-2xl font-mono font-bold text-cyan-400">
                    ${tipPerHour.toLocaleString()} / hora
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-300">
                  Total distribuido: ${totalTip.toLocaleString()}
                </span>
              </div>
            </div>
          )}

          {app.interactiveType === 'queue-turn' && (
            <div className="space-y-4">
              {!queueSubmitted ? (
                <div className="p-5 rounded-xl bg-slate-900/80 border border-white/10 space-y-4">
                  <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                    Simulá la reserva de turno de un cliente
                  </div>
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Nombre del cliente</label>
                    <input
                      type="text"
                      placeholder="Ej: Sofía Gómez"
                      value={queueName}
                      onChange={(e) => setQueueName(e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Cantidad de comensales / personas</label>
                    <select
                      value={queuePartySize}
                      onChange={(e) => setQueuePartySize(e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                    >
                      <option value="1">1 persona</option>
                      <option value="2">2 personas</option>
                      <option value="4">4 personas</option>
                      <option value="6">Mesa grande (6+)</option>
                    </select>
                  </div>
                  <button
                    onClick={() => {
                      if (!queueName) setQueueName('Cliente Demo');
                      setQueueSubmitted(true);
                    }}
                    className="w-full py-2.5 bg-cyan-400 text-black font-bold uppercase tracking-wider text-xs rounded hover:bg-cyan-300 transition-colors cursor-pointer"
                  >
                    TOMAR TURNO AHORA
                  </button>
                </div>
              ) : (
                <div className="p-6 rounded-xl bg-cyan-950/20 border border-cyan-400/40 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center mx-auto text-cyan-400">
                    <Check className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs uppercase font-mono text-cyan-400 tracking-wider">
                      Turno confirmada vía Web
                    </span>
                    <h4 className="font-display text-2xl font-bold text-white mt-1">
                      {queueName || 'Cliente Demo'} — {queuePartySize} personas
                    </h4>
                  </div>
                  <div className="p-4 rounded-lg bg-black/40 border border-white/10 max-w-xs mx-auto">
                    <span className="text-xs text-slate-400 block">Posición en la fila en vivo</span>
                    <span className="font-mono text-4xl font-extrabold text-cyan-400 mt-1 block">
                      #{queuePosition}
                    </span>
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      Tiempo estimado: ~14 minutos
                    </span>
                  </div>
                  <button
                    onClick={() => setQueueSubmitted(false)}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reiniciar simulación</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {app.interactiveType === 'b2b-margin' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <label className="text-[11px] font-mono text-slate-400 block mb-1">Costo Unitario ($)</label>
                  <input
                    type="number"
                    value={costPrice}
                    onChange={(e) => setCostPrice(Number(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-white/10 rounded px-2 py-1.5 text-sm font-mono text-white"
                  />
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <label className="text-[11px] font-mono text-slate-400 block mb-1">Margen Deseado (%)</label>
                  <input
                    type="number"
                    value={targetMargin}
                    onChange={(e) => setTargetMargin(Number(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-white/10 rounded px-2 py-1.5 text-sm font-mono text-white"
                  />
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <label className="text-[11px] font-mono text-slate-400 block mb-1">Desc. Volumen (%)</label>
                  <input
                    type="number"
                    value={volumeDiscount}
                    onChange={(e) => setVolumeDiscount(Number(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-white/10 rounded px-2 py-1.5 text-sm font-mono text-white"
                  />
                </div>
              </div>

              <div className="p-5 rounded-xl bg-slate-900 border border-white/10 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Precio Sugerido Lista:</span>
                  <span className="font-mono text-white">${calculatedSalePrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Precio Final con Descuento:</span>
                  <span className="font-mono font-bold text-cyan-400">${finalDiscountedPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-white/10">
                  <span className="text-slate-300 font-semibold">Ganancia Neta por Unidad:</span>
                  <span className="font-mono font-bold text-emerald-400">+${finalProfit.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}

          {app.interactiveType === 'kitchen-flow' && (
            <div className="space-y-4">
              <div className="text-xs font-mono text-slate-400">
                Monitor interactivo de comandas en preparación:
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
                  <div className="flex justify-between text-xs text-amber-400 font-mono mb-2">
                    <span>MESA 12</span>
                    <span>14 min</span>
                  </div>
                  <div className="text-sm font-bold text-white">2x Burger Quantum + Papas</div>
                  <div className="mt-3 text-[11px] text-slate-400">En cocción (Estación Plancha)</div>
                </div>
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                  <div className="flex justify-between text-xs text-emerald-400 font-mono mb-2">
                    <span>MESA 04</span>
                    <span>Listo para despacho</span>
                  </div>
                  <div className="text-sm font-bold text-white">1x Ensalada Salmón + 2 Cervezas</div>
                  <div className="mt-3 text-[11px] text-emerald-400 font-semibold">Campana sonando</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer CTAs */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs font-mono text-slate-400 text-left">
            <span>Implementación: </span>
            <span className="text-cyan-400">{app.timeToImplement}</span>
          </div>
          <button
            onClick={() => {
              onClose();
              onRequestCustomization(app.name);
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer"
          >
            <span>QUIERO ESTA MINI APP PARA MI NEGOCIO</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
