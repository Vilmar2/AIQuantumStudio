import React, { useState, useEffect } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { QuantumCoreCanvas } from '../canvas/QuantumCoreCanvas';

interface HeroProps {
  onExploreClick: () => void;
  onCreateClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onCreateClick }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const progress = Math.min(scrollY / vh, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-24 sm:pt-32 pb-8 sm:pb-12 overflow-hidden bg-[#05070b]">
      {/* 3D Quantum Core breathing in center with subtle neural filaments */}
      <div className="absolute inset-0 z-0">
        <QuantumCoreCanvas scrollProgress={scrollProgress} />
      </div>

      {/* Main Spatial Composition (Editorial + Minimalist) */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center my-auto flex flex-col items-center pointer-events-none select-none w-full">
        {/* Brand Kicker */}
        <div className="inline-flex items-center gap-2 mb-3.5 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-400/40 shadow-[0_0_16px_rgba(0,229,255,0.25)] pointer-events-auto backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
          <span className="text-[11px] sm:text-xs uppercase font-mono tracking-[0.25em] sm:tracking-[0.3em] text-cyan-300 font-bold drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
            ESTUDIO DIGITAL
          </span>
        </div>

        {/* Brand Display Title */}
        <h1 
          className="font-display text-3xl min-[380px]:text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase leading-[0.95] max-w-full"
          style={{ textWrap: 'balance' }}
        >
          AI QUANTUM
          <span className="block font-black text-3xl min-[380px]:text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] mt-1.5 tracking-tight reflective-text-studio">
            STUDIO
          </span>
        </h1>

        {/* Headline per Section 07 */}
        <p className="mt-4 sm:mt-6 text-sm sm:text-lg md:text-xl text-slate-200 font-light max-w-2xl leading-relaxed tracking-tight px-2">
          Convertimos ideas en experiencias digitales.
        </p>

        {/* Subheadline */}
        <div className="mt-3 sm:mt-4 text-[10px] min-[360px]:text-[11px] sm:text-sm font-mono tracking-widest text-cyan-400 uppercase px-2">
          Mini Apps · Dashboards · Soluciones Digitales
        </div>

        {/* Primary & Secondary Action CTAs */}
        <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 pointer-events-auto w-full max-w-xs sm:max-w-none px-2 sm:px-4">
          <button
            onClick={onExploreClick}
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 bg-white/5 hover:bg-cyan-400 text-white hover:text-black font-mono font-bold text-xs uppercase tracking-widest rounded-sm border border-white/20 hover:border-cyan-400 transition-all duration-300 shadow-xl hover:shadow-cyan-400/20 active:scale-[0.98] cursor-pointer"
          >
            <span>EXPLORAR</span>
            <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
          </button>

          <button
            onClick={onCreateClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-transparent hover:bg-white/5 text-slate-300 hover:text-white font-mono font-semibold text-xs uppercase tracking-widest rounded-sm border border-white/10 sm:border-transparent hover:border-white/20 transition-all duration-300 active:scale-[0.98] cursor-pointer"
          >
            <span>QUIERO CREAR ALGO</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
          </button>
        </div>
      </div>

      {/* Bottom indicator */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full flex items-center justify-between text-[11px] text-slate-500 font-mono">
        <div>THE QUANTUM CORE</div>
        <div className="hidden sm:block">DESLIZÁ PARA NAVEGAR ↓</div>
      </div>
    </section>
  );
};
