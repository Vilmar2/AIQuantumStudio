import React from 'react';
import { Lightbulb, Database, Wrench, Sparkles, ArrowRight } from 'lucide-react';

export const TheSystemSection: React.FC = () => {
  const systemFlow = [
    { label: 'IDEA', desc: 'El problema o necesidad latente', icon: Lightbulb, color: '#00e5ff' },
    { label: 'INFORMACIÓN', desc: 'Datos estructurados y flujos lógicos', icon: Database, color: '#0066ff' },
    { label: 'HERRAMIENTA', desc: 'Interfaces ágiles sin fricción', icon: Wrench, color: '#38bdf8' },
    { label: 'EXPERIENCIA', desc: 'Producto digital vivo y en uso', icon: Sparkles, color: '#34d399' },
  ];

  return (
    <section className="relative py-20 sm:py-28 bg-[#05070b] overflow-hidden border-t border-white/5">
      {/* Background ambient subtle grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20 quantum-bg-grid" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 relative z-10 text-center">
        <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] sm:tracking-[0.3em] text-cyan-400 font-semibold block mb-3">
          The System · Conexión Integral
        </span>

        {/* Big Editorial Headline */}
        <h2 className="font-display text-3xl min-[380px]:text-4xl sm:text-6xl md:text-7xl font-black text-white uppercase tracking-tight">
          TODO PUEDE CONECTARSE.
        </h2>

        <p className="mt-4 text-slate-400 text-xs sm:text-base max-w-xl mx-auto font-mono leading-relaxed px-2">
          La red transforma datos dispersos en herramientas y las herramientas en experiencias tangibles.
        </p>

        {/* Visual Flow: IDEA → INFORMACIÓN → HERRAMIENTA → EXPERIENCIA */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {systemFlow.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.label}
                className="group relative p-5 sm:p-6 lg:p-8 rounded-2xl glass-panel border border-white/10 hover:border-cyan-400/50 transition-all duration-300 flex flex-col items-center text-center hover:-translate-y-1"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${step.color}15`, border: `1px solid ${step.color}40`, color: step.color }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="font-mono text-[10px] text-slate-500 mb-1">0{idx + 1}</span>
                <h3 className="font-display text-lg font-bold text-white tracking-wider">{step.label}</h3>
                <p className="mt-1.5 text-xs text-slate-400 font-mono leading-relaxed">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
