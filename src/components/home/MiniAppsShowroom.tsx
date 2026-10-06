import React, { useState } from 'react';
import { ArrowRight, Play, Sparkles, Smartphone, ShieldCheck } from 'lucide-react';
import { MINI_APPS_DATA } from '../../data/mockData';
import { MiniAppItem } from '../../types';
import { MiniAppSimulatorModal } from '../shared/MiniAppSimulatorModal';
import { LiveDemoWindow } from '../showroom/LiveDemoWindow';
import { DividiMesaVisualPreview } from './DividiMesaVisualPreview';
import { DividiMesaPurchaseModal } from '../checkout/DividiMesaPurchaseModal';

interface MiniAppsShowroomProps {
  onViewAllClick: () => void;
  onRequestCustomization: (appName: string) => void;
  onTestMiniApp?: (app: MiniAppItem) => void;
}

export const MiniAppsShowroom: React.FC<MiniAppsShowroomProps> = ({
  onViewAllClick,
  onRequestCustomization,
  onTestMiniApp,
}) => {
  const [activeLiveDemoApp, setActiveLiveDemoApp] = useState<MiniAppItem | null>(null);
  const [activeSimulatorApp, setActiveSimulatorApp] = useState<MiniAppItem | null>(null);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);

  // Marquee products:
  // 1. Dividí Mesa (Flagship Embedded Mini App)
  // 2. Divisor de Propinas & Turnos
  // 3. Turnos para Negocios
  const marqueeApps = MINI_APPS_DATA.slice(0, 3);

  const handleOpenApp = (app: MiniAppItem) => {
    if (onTestMiniApp) {
      onTestMiniApp(app);
    } else if (app.embedUrl) {
      setActiveLiveDemoApp(app);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setActiveSimulatorApp(app);
    }
  };

  if (activeLiveDemoApp) {
    return (
      <LiveDemoWindow
        app={activeLiveDemoApp}
        onBack={() => setActiveLiveDemoApp(null)}
        onRequestCustomization={onRequestCustomization}
      />
    );
  }

  return (
    <section id="mini-apps" className="relative py-20 sm:py-28 md:py-32 bg-[#05070b] overflow-hidden border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-cyan-400 font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>01. LIVE MINI APP SHOWROOM</span>
          </div>
          <h2 className="font-display text-3xl min-[380px]:text-4xl sm:text-6xl md:text-7xl font-black text-white uppercase tracking-tight leading-[1.02]">
            PEQUEÑAS HERRAMIENTAS.
            <span className="block text-slate-400 font-extrabold text-2xl min-[380px]:text-3xl sm:text-5xl md:text-6xl mt-1">
              GRANDES POSIBILIDADES.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-xl text-slate-300 font-light leading-relaxed">
            Mini aplicaciones interactivas creadas para resolver necesidades concretas. Probá la herramienta directamente dentro de AI Quantum Studio.
          </p>
        </div>

        {/* 3 Floating Digital Product Interfaces */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {marqueeApps.map((app, idx) => {
            if (app.id === 'dividi-mesa') {
              return (
                <div
                  key={app.id}
                  className="group relative rounded-3xl p-4 sm:p-6 lg:p-7 glass-panel border border-cyan-500/40 bg-gradient-to-b from-cyan-950/20 via-[#070b12] to-[#05070b] shadow-2xl shadow-cyan-950/50 flex flex-col justify-between transition-all duration-300 hover:border-cyan-400/70 cursor-pointer"
                  onClick={() => handleOpenApp(app)}
                >
                  {/* Top: Strictly Minimal Text */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-[10px] font-mono font-bold tracking-widest text-cyan-400 uppercase flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        FLAGSHIP MINI APP
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">01</span>
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight">
                      DIVIDÍ MESA
                    </h3>
                    <p className="text-sm font-mono text-cyan-300 mt-1 font-semibold">
                      Dividí la cuenta. Sin vueltas.
                    </p>
                  </div>

                  {/* 70%-75% Visual Space: Real Interactive Micro-Demo */}
                  <div className="my-2 flex-1 flex flex-col justify-center">
                    <DividiMesaVisualPreview />
                  </div>

                  {/* Action Buttons: Primary ▶ PROBAR DIVIDÍ MESA and secondary CONOCER MÁS */}
                  <div className="mt-5 pt-4 border-t border-white/10 space-y-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenApp(app);
                      }}
                      className="w-full py-4 bg-cyan-400 hover:bg-cyan-300 text-black font-mono font-extrabold text-xs sm:text-sm uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-400/25 active:scale-[0.98] cursor-pointer"
                    >
                      <Play className="w-4 h-4 fill-black" />
                      <span>▶ PROBAR DIVIDÍ MESA</span>
                    </button>
                    <div className="flex items-center justify-between text-[11px] font-mono px-1 pt-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsPurchaseModalOpen(true);
                        }}
                        className="text-cyan-400 hover:text-cyan-300 font-bold uppercase tracking-wider py-1 cursor-pointer flex items-center gap-1"
                      >
                        <span>🛒 COMPRAR ACCESO</span>
                        <span className="text-slate-400 font-normal">($3.300)</span>
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRequestCustomization(app.name);
                        }}
                        className="text-[11px] font-mono uppercase tracking-wider text-slate-400 hover:text-white transition-colors py-1 cursor-pointer"
                      >
                        CONOCER MÁS
                      </button>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={app.id}
                className="group relative rounded-2xl p-5 sm:p-8 glass-panel border border-white/10 hover:border-cyan-400/50 transition-all duration-500 flex flex-col justify-between min-h-[440px] sm:min-h-[480px] cursor-pointer hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-950/40"
                onClick={() => handleOpenApp(app)}
              >
                <div>
                  {/* 3D Floating Window Preview */}
                  <div className="w-full h-36 rounded-xl bg-slate-950/90 border border-white/10 p-3.5 mb-6 flex flex-col justify-between group-hover:border-cyan-400/40 transition-colors overflow-hidden">
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        INTERFACE EN VIVO
                      </span>
                      <span>0{idx + 1}</span>
                    </div>

                    {idx === 1 ? (
                      <div className="space-y-1 font-mono">
                        <div className="text-[11px] text-slate-400">Cuenta de 5 personas · Propina 10%</div>
                        <div className="text-xs font-bold text-cyan-400">$8.400 / persona exacto</div>
                        <div className="h-1.5 w-full bg-cyan-400/20 rounded-full overflow-hidden mt-1">
                          <div className="h-full bg-cyan-400 w-3/4" />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-1 font-mono">
                        <div className="text-[11px] text-slate-400">Turno #14 · Mesa de 4</div>
                        <div className="text-xs font-bold text-cyan-400">Espera estimada: 6 min</div>
                        <div className="text-[10px] text-emerald-400">Aviso WhatsApp programado</div>
                      </div>
                    )}

                    <div className="text-[10px] font-mono text-cyan-400 text-right font-bold">
                      Probar aquí →
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                      {app.category}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {app.name}
                  </h3>
                  <p className="mt-2 text-sm text-slate-300 leading-relaxed font-light">
                    {app.description}
                  </p>
                </div>

                {/* Action Link with Mandatory CTA: PROBAR AQUÍ */}
                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>PROBAR AQUÍ</span>
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {app.timeToImplement}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section bottom CTA */}
        <div className="mt-12 sm:mt-14 flex justify-center">
          <button
            onClick={onViewAllClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 bg-white/5 hover:bg-cyan-400 text-white hover:text-black font-mono font-bold text-xs uppercase tracking-widest rounded border border-white/15 hover:border-cyan-400 transition-all duration-300 cursor-pointer"
          >
            <span>EXPLORAR TODAS LAS MINI APPS</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {activeSimulatorApp && (
        <MiniAppSimulatorModal
          app={activeSimulatorApp}
          onClose={() => setActiveSimulatorApp(null)}
          onRequestCustomization={onRequestCustomization}
        />
      )}

      {/* Modal de Compra para Dividí Mesa */}
      <DividiMesaPurchaseModal
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
      />
    </section>
  );
};
