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
    <section className="relative min-h-screen flex flex-col justify-between pt-32 pb-12 overflow-hidden bg-[#05070b]">
      {/* 3D Quantum Core breathing in center with subtle neural filaments */}
      <div className="absolute inset-0 z-0">
        <QuantumCoreCanvas scrollProgress={scrollProgress} />
      </div>

      {/* Main Spatial Composition (Editorial + Minimalist) */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center my-auto flex flex-col items-center pointer-events-none select-none">
        {/* Brand Kicker */}
        <div className="inline-flex items-center gap-2 mb-3 pointer-events-auto">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-[11px] uppercase font-mono tracking-[0.3em] text-cyan-400 font-semibold">
            ESTUDIO DIGITAL
          </span>
        </div>

        {/* Brand Display Title */}
        <h1 
          className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-white uppercase leading-[0.92]"
          style={{ textWrap: 'balance' }}
        >
          AI QUANTUM
          <span className="block text-slate-400 font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl mt-1">
            STUDIO
          </span>
        </h1>

        {/* Headline per Section 07 */}
        <p className="mt-8 text-xl sm:text-3xl md:text-4xl text-slate-100 font-light max-w-3xl leading-snug tracking-tight">
          Convertimos ideas en experiencias digitales.
        </p>

        {/* Subheadline */}
        <div className="mt-4 text-xs sm:text-sm font-mono tracking-widest text-cyan-400 uppercase">
          Mini Apps · Dashboards · Soluciones Digitales
        </div>

        {/* Primary & Secondary Action CTAs */}
        <div className="mt-12 flex flex-col sm:flex-row items-center gap-4 pointer-events-auto">
          <button
            onClick={onExploreClick}
            className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white/5 hover:bg-cyan-400 text-white hover:text-black font-mono font-bold text-xs uppercase tracking-widest rounded-sm border border-white/20 hover:border-cyan-400 transition-all duration-300 shadow-xl hover:shadow-cyan-400/20 active:scale-[0.98] cursor-pointer"
          >
            <span>EXPLORAR</span>
            <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
          </button>

          <button
            onClick={onCreateClick}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent hover:bg-white/5 text-slate-300 hover:text-white font-mono font-semibold text-xs uppercase tracking-widest rounded-sm border border-transparent hover:border-white/20 transition-all duration-300 active:scale-[0.98] cursor-pointer"
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
