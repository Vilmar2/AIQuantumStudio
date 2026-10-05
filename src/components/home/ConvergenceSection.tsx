import React from 'react';
import { Smartphone, LayoutDashboard, Lightbulb, GraduationCap } from 'lucide-react';

export const ConvergenceSection: React.FC = () => {
  const points = [
    { label: 'MINI APPS', icon: Smartphone, color: '#00e5ff' },
    { label: 'DASHBOARDS', icon: LayoutDashboard, color: '#0066ff' },
    { label: 'SOLUCIONES', icon: Lightbulb, color: '#38bdf8' },
    { label: 'ACADEMY', icon: GraduationCap, color: '#34d399' },
  ];

  return (
    <section className="relative py-28 bg-[#05070b] overflow-hidden border-t border-white/5 text-center">
      {/* Background radial energy burst */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-cyan-900/15 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true" 
      />

      <div className="max-w-4xl mx-auto px-6 md:px-10 relative z-10">
        {/* Convergent Nodes */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10">
          {points.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.label}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#080d17] border border-white/10 text-xs font-mono tracking-widest text-slate-300"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-ping"
                  style={{ backgroundColor: p.color }}
                />
                <span>{p.label}</span>
              </div>
            );
          })}
        </div>

        {/* Section 24: Core Convergence Text */}
        <div className="text-xs font-mono uppercase tracking-[0.3em] text-cyan-400 font-semibold mb-3">
          AI QUANTUM STUDIO
        </div>

        <h3 className="font-display text-4xl sm:text-6xl md:text-7xl font-black text-white uppercase tracking-tight">
          TODO COMIENZA CON UNA IDEA.
        </h3>

        <p className="mt-4 text-slate-400 text-sm sm:text-base max-w-md mx-auto font-mono">
          Un único ecosistema digital donde cada solución resuelve un dolor real y te devuelve control.
        </p>
      </div>
    </section>
  );
};
