import React from 'react';
import { ArrowRight, GraduationCap } from 'lucide-react';
import founderPhoto from '../../assets/images/vilmar_olivera.png';
import { ACADEMY_LEARNING_AXES } from '../../data/mockData';

interface AcademySectionProps {
  onLearnMoreClick: () => void;
}

export const AcademySection: React.FC<AcademySectionProps> = ({ onLearnMoreClick }) => {
  return (
    <section id="academy" className="relative py-28 bg-[#05070b] overflow-hidden border-t border-white/5">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <div className="rounded-2xl glass-panel border border-cyan-500/20 p-8 sm:p-12 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-10">
          {/* Subtle inside glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Left Content */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-cyan-400 font-semibold mb-2">
              <GraduationCap className="w-4 h-4" />
              <span>Campus Digital</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
              AI QUANTUM ACADEMY
            </h2>

            <div className="mt-2 text-lg sm:text-xl font-light text-slate-300">
              Formación práctica en Inteligencia Artificial.
            </div>

            <p className="mt-3 text-sm text-slate-400 leading-relaxed font-light">
              Cursos y programas orientados a la aplicación práctica de herramientas de Inteligencia Artificial para resolver problemas y crear productos reales.
            </p>

            {/* 21. Visual Learning Axes (Automations included here, not as a standalone home service) */}
            <div className="mt-6 flex flex-wrap gap-2">
              {ACADEMY_LEARNING_AXES.map((axis) => (
                <span
                  key={axis.title}
                  className="px-3 py-1 rounded bg-white/5 border border-white/10 text-[11px] font-mono tracking-wider text-slate-300"
                >
                  {axis.title}
                </span>
              ))}
            </div>

            <div className="mt-8">
              <button
                onClick={onLearnMoreClick}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-cyan-400 hover:bg-cyan-300 text-black font-mono font-bold text-xs uppercase tracking-widest rounded transition-all cursor-pointer shadow-lg shadow-cyan-400/20 active:scale-[0.98]"
              >
                <span>CONOCER ACADEMY</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right: Founder presence */}
          <div className="shrink-0 flex flex-col items-center md:items-end">
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border border-white/15 bg-slate-900 shadow-xl group">
              <img
                src={founderPhoto}
                alt="Vilmar Olivera — AI Quantum Academy"
                className="w-full h-full object-cover object-top filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2 left-2 right-2 text-center">
                <span className="text-[10px] font-mono text-cyan-400 block font-bold">Vilmar Olivera</span>
                <span className="text-[9px] font-mono text-slate-300 block">Fundadora & Mentora</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
