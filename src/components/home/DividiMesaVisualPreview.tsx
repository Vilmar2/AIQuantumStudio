import React, { useState, useEffect } from 'react';
import { Receipt, Users, Calculator, ArrowRight, CheckCircle2, Copy, Sparkles, Smartphone } from 'lucide-react';

export const DividiMesaVisualPreview: React.FC = () => {
  // 6 Scenes as specified:
  // 0: Ticket de restaurante
  // 1: Comensales
  // 2: Asignación de platos
  // 3: División automática
  // 4: Resultado individual (Lucas $17.600, Sofía $14.300, Martín $10.100)
  // 5: Alias de transferencia
  const [scene, setScene] = useState<number>(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // 8-second total loop: advances smoothly every ~1.4 seconds
    const interval = setInterval(() => {
      setScene((prev) => (prev + 1) % 6);
    }, 1400);

    return () => clearInterval(interval);
  }, []);

  const steps = [
    { label: 'Ticket', icon: Receipt },
    { label: 'Comensales', icon: Users },
    { label: 'Asignación', icon: Sparkles },
    { label: 'Propina', icon: Calculator },
    { label: 'División', icon: CheckCircle2 },
    { label: 'Alias', icon: Copy },
  ];

  return (
    <div className="w-full bg-[#070b12] border border-cyan-500/25 rounded-2xl p-3.5 sm:p-5 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[350px] sm:min-h-[400px]">
      {/* Background ambient glow */}
      <div className="absolute -top-10 -right-10 w-44 h-44 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top micro-bar: Live status & Progress Pills */}
      <div className="relative z-10 flex items-center justify-between pb-3 border-b border-white/10 text-[10px] sm:text-[11px] font-mono">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shrink-0" />
          <span className="text-cyan-400 font-bold uppercase tracking-wider truncate">MICRO-DEMO EN VIVO</span>
        </div>

        {/* 6 Step indicators */}
        <div className="flex items-center gap-1 shrink-0">
          {steps.map((s, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setScene(idx);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                scene === idx 
                  ? 'w-5 sm:w-6 bg-cyan-400' 
                  : scene > idx 
                  ? 'w-1.5 sm:w-2 bg-cyan-400/40' 
                  : 'w-1.5 sm:w-2 bg-white/10'
              }`}
              title={s.label}
            />
          ))}
        </div>
      </div>

      {/* Main Visual Stage (Scenes 0-5) */}
      <div className="relative z-10 my-auto py-2">
        {/* ESCENA 1: Ticket de restaurante */}
        {scene === 0 && (
          <div className="animate-in fade-in duration-300 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="uppercase tracking-widest text-cyan-400 font-bold flex items-center gap-1.5">
                <Receipt className="w-3.5 h-3.5" />
                Ticket Mesa 04
              </span>
              <span>3 ítems</span>
            </div>

            <div className="bg-black/50 border border-white/10 rounded-xl p-3.5 space-y-2 font-mono">
              <div className="flex items-center justify-between text-sm text-slate-200">
                <span>2x Hamburguesas Gourmet</span>
                <span className="font-bold text-white">$18.000</span>
              </div>
              <div className="flex items-center justify-between text-sm text-slate-200">
                <span>1x Pizza Cuatro Quesos</span>
                <span className="font-bold text-white">$15.000</span>
              </div>
              <div className="flex items-center justify-between text-sm text-slate-200">
                <span>3x Bebidas Artesanales</span>
                <span className="font-bold text-white">$9.000</span>
              </div>
              <div className="pt-2 border-t border-dashed border-white/20 flex items-center justify-between text-sm font-bold text-cyan-400">
                <span>TOTAL CUENTA</span>
                <span className="text-base text-cyan-300 font-extrabold">$42.000</span>
              </div>
            </div>
            <p className="text-[11px] font-mono text-slate-400 text-center">
              1. Cuenta cargada al instante
            </p>
          </div>
        )}

        {/* ESCENA 2: Aparecen los comensales */}
        {scene === 1 && (
          <div className="animate-in fade-in duration-300 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="uppercase tracking-widest text-cyan-400 font-bold flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                Comensales en la mesa
              </span>
              <span>3 personas</span>
            </div>

            <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5">
              <div className="bg-cyan-500/10 border border-cyan-400/40 rounded-xl p-2 sm:p-3 text-center min-w-0">
                <div className="w-7 h-7 sm:w-8 sm:h-8 mx-auto rounded-full bg-cyan-400 text-black font-mono font-black flex items-center justify-center text-xs mb-1 sm:mb-1.5 shadow">
                  L
                </div>
                <div className="text-xs sm:text-sm font-bold text-white truncate">Lucas</div>
                <div className="text-[9px] sm:text-[10px] text-cyan-400 font-mono truncate">Burger + Bebida</div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-400/40 rounded-xl p-2 sm:p-3 text-center min-w-0">
                <div className="w-7 h-7 sm:w-8 sm:h-8 mx-auto rounded-full bg-emerald-400 text-black font-mono font-black flex items-center justify-center text-xs mb-1 sm:mb-1.5 shadow">
                  S
                </div>
                <div className="text-xs sm:text-sm font-bold text-white truncate">Sofía</div>
                <div className="text-[9px] sm:text-[10px] text-emerald-400 font-mono truncate">Pizza + Bebida</div>
              </div>

              <div className="bg-indigo-500/10 border border-indigo-400/40 rounded-xl p-2 sm:p-3 text-center min-w-0">
                <div className="w-7 h-7 sm:w-8 sm:h-8 mx-auto rounded-full bg-indigo-400 text-black font-mono font-black flex items-center justify-center text-xs mb-1 sm:mb-1.5 shadow">
                  M
                </div>
                <div className="text-xs sm:text-sm font-bold text-white truncate">Martín</div>
                <div className="text-[9px] sm:text-[10px] text-indigo-400 font-mono truncate">Burger + Bebida</div>
              </div>
            </div>
            <p className="text-[11px] font-mono text-slate-400 text-center">
              2. Comensales identificados
            </p>
          </div>
        )}

        {/* ESCENA 3: Asignación de platos */}
        {scene === 2 && (
          <div className="animate-in fade-in duration-300 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="uppercase tracking-widest text-cyan-400 font-bold flex items-center gap-1.5 truncate">
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                Asignación plato por plato
              </span>
              <span className="text-emerald-400 font-bold shrink-0">100% Asignado</span>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="bg-white/5 border border-white/10 rounded-xl p-2 sm:p-2.5 flex items-center justify-between gap-2 min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                  <span className="px-1.5 py-0.5 rounded bg-cyan-400 text-black font-bold text-[9px] sm:text-[10px] shrink-0">Lucas</span>
                  <span className="text-slate-200 text-[11px] sm:text-xs truncate">1x Hamburguesa + 1x Bebida</span>
                </div>
                <span className="font-bold text-white text-xs sm:text-sm shrink-0">$16.000</span>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-2 sm:p-2.5 flex items-center justify-between gap-2 min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                  <span className="px-1.5 py-0.5 rounded bg-emerald-400 text-black font-bold text-[9px] sm:text-[10px] shrink-0">Sofía</span>
                  <span className="text-slate-200 text-[11px] sm:text-xs truncate">1x Pizza + 1x Bebida</span>
                </div>
                <span className="font-bold text-white text-xs sm:text-sm shrink-0">$13.000</span>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-2 sm:p-2.5 flex items-center justify-between gap-2 min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                  <span className="px-1.5 py-0.5 rounded bg-indigo-400 text-black font-bold text-[9px] sm:text-[10px] shrink-0">Martín</span>
                  <span className="text-slate-200 text-[11px] sm:text-xs truncate">Consumo compartido</span>
                </div>
                <span className="font-bold text-white text-xs sm:text-sm shrink-0">$9.200</span>
              </div>
            </div>
            <p className="text-[11px] font-mono text-slate-400 text-center">
              3. Cada uno paga lo suyo con exactitud
            </p>
          </div>
        )}

        {/* ESCENA 4: Propina y división automática */}
        {scene === 3 && (
          <div className="animate-in fade-in duration-300 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="uppercase tracking-widest text-cyan-400 font-bold flex items-center gap-1.5">
                <Calculator className="w-3.5 h-3.5" />
                Cálculo de Propina Sugerida
              </span>
              <span className="text-cyan-400 font-bold">+10%</span>
            </div>

            <div className="bg-black/60 border border-cyan-500/30 rounded-xl p-4 space-y-2.5 text-center font-mono">
              <div className="text-xs text-slate-400">
                División proporcional de propina aplicada
              </div>
              <div className="text-3xl font-black text-white tracking-tight">
                $42.000 <span className="text-xs text-emerald-400 font-normal">(con propina)</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Cálculo matemático exacto</span>
              </div>
            </div>
            <p className="text-[11px] font-mono text-slate-400 text-center">
              4. Propina distribuida equitativamente
            </p>
          </div>
        )}

        {/* ESCENA 5: Resultado individual exacto solicitado */}
        {scene === 4 && (
          <div className="animate-in fade-in duration-300 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="uppercase tracking-widest text-cyan-400 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Total por persona
              </span>
              <span className="text-emerald-400 font-bold">Listo para pagar</span>
            </div>

            <div className="space-y-2 font-mono">
              <div className="bg-cyan-500/10 border border-cyan-400/40 rounded-xl p-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-cyan-400 text-black font-bold flex items-center justify-center text-xs">
                    L
                  </div>
                  <span className="text-sm font-bold text-white">Lucas</span>
                </div>
                <span className="font-display text-lg font-black text-cyan-400">$17.600</span>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-400/40 rounded-xl p-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-emerald-400 text-black font-bold flex items-center justify-center text-xs">
                    S
                  </div>
                  <span className="text-sm font-bold text-white">Sofía</span>
                </div>
                <span className="font-display text-lg font-black text-emerald-400">$14.300</span>
              </div>

              <div className="bg-indigo-500/10 border border-indigo-400/40 rounded-xl p-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-indigo-400 text-black font-bold flex items-center justify-center text-xs">
                    M
                  </div>
                  <span className="text-sm font-bold text-white">Martín</span>
                </div>
                <span className="font-display text-lg font-black text-indigo-400">$10.100</span>
              </div>
            </div>
            <p className="text-[11px] font-mono text-slate-400 text-center">
              5. Cada comensal sabe exactamente qué abonar
            </p>
          </div>
        )}

        {/* ESCENA 6: Resultado final y alias de transferencia */}
        {scene === 5 && (
          <div className="animate-in fade-in duration-300 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Cuenta Dividida con Éxito
              </span>
              <span className="text-cyan-400">Paso Final</span>
            </div>

            <div className="bg-gradient-to-b from-slate-900 to-black border border-cyan-500/30 rounded-xl p-4 text-center font-mono space-y-2">
              <span className="text-[11px] text-slate-400 uppercase tracking-widest block">
                Transferí al alias del restaurante:
              </span>
              <div className="p-2.5 rounded-lg bg-cyan-400/10 border border-cyan-400/40 flex items-center justify-between">
                <span className="font-mono text-base font-extrabold text-cyan-300">
                  dividi.mesa.app
                </span>
                <span className="text-[10px] uppercase font-bold text-cyan-400 flex items-center gap-1">
                  <Copy className="w-3 h-3" />
                  Listo
                </span>
              </div>
              <p className="text-[10px] text-slate-400">
                Compatible con Mercado Pago, Ualá, CVU y bancos
              </p>
            </div>

            <p className="text-[11px] font-mono text-emerald-400 text-center font-bold">
              ✓ Cobro inmediato en la mesa sin discusiones
            </p>
          </div>
        )}
      </div>

      {/* Bottom ticker / micro-footer */}
      <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-400">
        <span className="flex items-center gap-1 text-slate-300">
          <Smartphone className="w-3 h-3 text-cyan-400" />
          Sin descargas ni registros
        </span>
        <span className="text-cyan-400 font-bold">
          {scene + 1} de 6
        </span>
      </div>
    </div>
  );
};
