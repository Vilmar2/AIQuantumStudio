import React, { useState } from 'react';
import { ArrowUpRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { SHOWCASE_PROJECTS } from '../../data/mockData';
import { ShowcaseProject } from '../../types';

interface ShowcaseSectionProps {
  onRequestCustom?: () => void;
}

export const ShowcaseSection: React.FC<ShowcaseSectionProps> = ({ onRequestCustom }) => {
  return (
    <section id="showcase" className="relative py-32 bg-[#05070b] overflow-hidden border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 md:px-10 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-cyan-400 font-semibold block mb-3">
            Exposición Digital
          </span>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-black text-white uppercase tracking-tight">
            AI QUANTUM SHOWCASE
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 font-light leading-relaxed">
            Una selección viva de herramientas, tableros y experiencias digitales creadas por el estudio.
          </p>
        </div>

        {/* Asymmetric Digital Exhibition Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {SHOWCASE_PROJECTS.map((project, idx) => (
            <div
              key={project.id}
              className={`rounded-2xl p-8 sm:p-10 glass-panel border border-white/10 hover:border-cyan-400/50 transition-all duration-300 flex flex-col justify-between overflow-hidden min-h-[380px] ${
                idx === 0
                  ? 'md:col-span-7'
                  : idx === 1
                  ? 'md:col-span-5'
                  : 'md:col-span-12'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 pb-4 border-b border-white/5 font-mono">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: project.accentColor }} />
                    <span className="text-cyan-400 font-semibold">{project.category}</span>
                  </div>
                  <span>{project.clientType}</span>
                </div>

                <h3 className="mt-6 font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed font-light">
                  {project.description}
                </p>

                <div className="mt-6 p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20 flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="text-xs sm:text-sm font-mono text-cyan-300 font-semibold">
                    {project.result}
                  </span>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Desarrollo AI Quantum</span>
                <button
                  onClick={onRequestCustom}
                  className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-white font-bold transition-colors cursor-pointer"
                >
                  <span>CREAR ALGO SIMILAR</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
