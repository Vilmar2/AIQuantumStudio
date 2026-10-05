import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { QuantumCoreCanvas } from '../canvas/QuantumCoreCanvas';
import { NavigationTab } from '../../types';

interface FinalCtaSectionProps {
  onSelectOption: (tab: NavigationTab) => void;
  onOpenModal: (topic?: string) => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({
  onSelectOption,
  onOpenModal,
}) => {
  return (
    <section className="relative py-36 bg-[#05070b] overflow-hidden border-t border-white/5 text-center">
      {/* 3D Quantum Core Re-converged */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none flex items-center justify-center">
        <QuantumCoreCanvas scrollProgress={0.05} />
      </div>

      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-950/20 rounded-full blur-[160px] pointer-events-none"
        aria-hidden="true" 
      />

      <div className="max-w-4xl mx-auto px-6 md:px-10 relative z-10">
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-cyan-400 font-semibold block mb-4">
          The Quantum Core · Decisión
        </span>

        {/* 25. Headline */}
        <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-black text-white uppercase tracking-tight leading-[1.05]">
          ¿QUÉ QUERÉS CREAR?
        </h2>

        {/* 3 Clear Options */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => onSelectOption('mini-apps')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 bg-white/5 hover:bg-cyan-400 text-white hover:text-black font-mono font-bold text-xs uppercase tracking-widest rounded border border-white/15 hover:border-cyan-400 transition-all duration-300 cursor-pointer shadow-lg active:scale-[0.98]"
          >
            <span>UNA MINI APP</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => onSelectOption('dashboards')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 bg-white/5 hover:bg-cyan-400 text-white hover:text-black font-mono font-bold text-xs uppercase tracking-widest rounded border border-white/15 hover:border-cyan-400 transition-all duration-300 cursor-pointer shadow-lg active:scale-[0.98]"
          >
            <span>UN DASHBOARD</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => onSelectOption('soluciones')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 bg-cyan-400 hover:bg-cyan-300 text-black font-mono font-extrabold text-xs uppercase tracking-widest rounded transition-all duration-300 cursor-pointer shadow-xl shadow-cyan-400/20 active:scale-[0.98]"
          >
            <span>UNA SOLUCIÓN DIGITAL</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Academy Link Below (Small, quiet) */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-slate-400 font-mono">
          <span>¿Querés aprender Inteligencia Artificial?</span>
          <button
            onClick={() => onSelectOption('academy')}
            className="inline-flex items-center gap-1 text-cyan-400 hover:text-white font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            <span>CONOCER AI QUANTUM ACADEMY</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>

        {/* Discrete Contact Mention */}
        <div className="mt-10 text-[11px] font-mono text-slate-500 tracking-wider">
          WhatsApp: +54 9 341 285-2228 · Instagram: @vilmar.ai · AI Quantum Studio
        </div>
      </div>
    </section>
  );
};
