import React from 'react';
import { Play, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { MiniAppItem } from '../../types';
import { DividiMesaVisualPreview } from '../home/DividiMesaVisualPreview';

interface MiniAppCardProps {
  app: MiniAppItem;
  onTestClick: (app: MiniAppItem) => void;
  onLearnMoreClick?: (app: MiniAppItem) => void;
  featured?: boolean;
}

export const MiniAppCard: React.FC<MiniAppCardProps> = ({
  app,
  onTestClick,
  onLearnMoreClick,
  featured = false,
}) => {
  // Flagship Visual Experience for Dividí Mesa
  if (app.id === 'dividi-mesa') {
    return (
      <div 
        className="group relative rounded-3xl p-6 sm:p-7 glass-panel border border-cyan-500/40 bg-gradient-to-b from-cyan-950/20 via-[#070b12] to-[#05070b] shadow-2xl shadow-cyan-950/50 flex flex-col justify-between transition-all duration-300 hover:border-cyan-400/70 overflow-hidden cursor-pointer"
        onClick={() => onTestClick(app)}
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-400/10 rounded-full blur-2xl pointer-events-none" />

        {/* Minimal Header */}
        <div className="mb-4 relative z-10">
          <div className="flex items-center justify-between mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-400/15 border border-cyan-400/30 text-[10px] font-mono font-bold tracking-widest text-cyan-400 flex items-center gap-1 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              FLAGSHIP MINI APP
            </span>
            <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 font-mono text-[10px] font-bold">
              DEMO EN VIVO
            </span>
          </div>

          <h3 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight">
            DIVIDÍ MESA
          </h3>
          <p className="mt-1 text-sm font-mono text-cyan-300 font-semibold">
            Dividí la cuenta. Sin vueltas.
          </p>
        </div>

        {/* 70%-75% Visual Space: Micro-Demo Automática */}
        <div className="my-2 relative z-10 flex-1 flex flex-col justify-center">
          <DividiMesaVisualPreview />
        </div>

        {/* Primary CTA: ▶ PROBAR DIVIDÍ MESA + Secondary CONOCER MÁS */}
        <div className="mt-5 pt-4 border-t border-white/10 relative z-10 space-y-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onTestClick(app);
            }}
            className="w-full py-4 bg-cyan-400 hover:bg-cyan-300 text-black font-mono font-extrabold text-xs sm:text-sm uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-400/25 active:scale-[0.98] cursor-pointer"
          >
            <Play className="w-4 h-4 fill-black" />
            <span>▶ PROBAR DIVIDÍ MESA</span>
          </button>

          {onLearnMoreClick && (
            <div className="flex justify-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onLearnMoreClick(app);
                }}
                className="text-[11px] font-mono uppercase tracking-wider text-slate-400 hover:text-cyan-400 transition-colors py-1 cursor-pointer"
              >
                CONOCER MÁS
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Standard representation for other catalog apps
  return (
    <div 
      className={`group relative rounded-2xl glass-panel border transition-all duration-300 flex flex-col justify-between overflow-hidden ${
        featured
          ? 'border-cyan-500/40 bg-gradient-to-b from-cyan-950/20 via-[#070b12] to-[#05070b] shadow-2xl shadow-cyan-950/40'
          : 'border-white/10 hover:border-cyan-500/30 bg-[#070a10] hover:shadow-xl'
      }`}
    >
      {featured && (
        <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-400/10 rounded-full blur-2xl pointer-events-none" />
      )}

      <div className="p-6 sm:p-7 relative z-10">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono tracking-widest text-slate-300 uppercase">
              {app.category}
            </span>
          </div>

          <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 font-mono text-[10px] font-bold">
            DEMO EN VIVO
          </span>
        </div>

        <h3 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors tracking-tight">
          {app.name}
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-cyan-200/80 font-mono">
          {app.tagline}
        </p>

        <p className="mt-3 text-xs sm:text-sm text-slate-400 line-clamp-3 leading-relaxed font-light">
          {app.description}
        </p>

        <div className="mt-4 pt-4 border-t border-white/5 space-y-1.5">
          {app.features.slice(0, 3).map((feature, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="truncate">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 pt-0 relative z-10">
        <div className="mb-4 flex items-center justify-between text-xs font-mono border-t border-white/5 pt-3">
          <span className="text-slate-400">Impacto operativo:</span>
          <span className="text-cyan-400 font-bold">{app.impactMetric}</span>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onTestClick(app)}
            className="flex-1 py-3 bg-cyan-400 hover:bg-cyan-300 text-black font-mono font-extrabold text-xs uppercase tracking-widest rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-400/20 active:scale-[0.98] cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-black" />
            <span>PROBAR AQUÍ</span>
          </button>

          {onLearnMoreClick && (
            <button
              onClick={() => onLearnMoreClick(app)}
              className="px-4 py-3 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-mono text-xs uppercase tracking-wider rounded-lg border border-white/10 transition-colors cursor-pointer"
            >
              CONOCER MÁS
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
