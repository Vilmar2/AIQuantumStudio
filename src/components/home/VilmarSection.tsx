import React from 'react';
import { ArrowRight, Sparkles, MessageSquare } from 'lucide-react';
import founderPhoto from '../../assets/images/vilmar_olivera.png';

interface VilmarSectionProps {
  onLearnMoreClick: () => void;
  onContactClick?: () => void;
}

export const VilmarSection: React.FC<VilmarSectionProps> = ({ 
  onLearnMoreClick,
  onContactClick,
}) => {
  return (
    <section id="nosotros" className="relative py-20 sm:py-28 bg-[#05070b] overflow-hidden border-t border-white/5">
      {/* Subtle background ambient glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-10 relative z-10">
        <div className="rounded-3xl glass-panel border border-white/10 p-5 sm:p-8 md:p-12 lg:p-14 relative overflow-hidden shadow-2xl shadow-cyan-950/20">
          {/* Subtle quantum line accent */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-center">
            {/* Left: Founder Portrait (Vilmar) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group w-full max-w-xs sm:max-w-sm">
                {/* Glow ring */}
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-cyan-500/20 via-blue-500/10 to-transparent blur-md group-hover:blur-lg opacity-80 transition duration-500" />
                
                <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-slate-950 shadow-2xl">
                  <img
                    src={founderPhoto}
                    alt="Vilmar Olivera — Fundadora de AI Quantum Studio"
                    className="w-full h-auto aspect-[4/5] object-cover object-top filter contrast-105 group-hover:scale-102 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
                  
                  {/* Photo bottom overlay */}
                  <div className="absolute bottom-4 sm:bottom-5 left-4 sm:left-5 right-4 sm:right-5 flex items-end justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-semibold block">
                        Fundadora & Directora
                      </span>
                      <h4 className="font-display text-lg sm:text-xl font-bold text-white tracking-tight">
                        Vilmar Olivera
                      </h4>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                      <Sparkles className="w-4 h-4 text-cyan-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Narrative & Impact Copy */}
            <div className="lg:col-span-7 flex flex-col justify-center text-left">
              {/* Header eyebrow as requested */}
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-cyan-400 font-bold">
                  DETRÁS DE AI QUANTUM STUDIO
                </span>
              </div>

              {/* Mandatory requested main headline */}
              <h3 className="font-display text-xl min-[380px]:text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight uppercase tracking-tight mb-5">
                CONVERTIMOS IDEAS Y PROBLEMAS REALES EN SOLUCIONES DIGITALES.
              </h3>

              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                <p>
                  Como fundadora y líder tecnológica de AI Quantum Studio, <strong className="text-white font-semibold">Vilmar Olivera</strong> concibe el desarrollo de software no como una promesa abstracta de Inteligencia Artificial, sino como una herramienta quirúrgica para resolver problemas concretos de personas y negocios.
                </p>
                <p className="text-slate-400 text-xs sm:text-sm">
                  Ella y su equipo diseñan mini apps sin fricción, paneles de control en tiempo real y automatizaciones que transforman operaciones desordenadas en sistemas eficientes, devolviéndole a cada cliente lo más valioso que tiene: su tiempo.
                </p>
              </div>

              {/* Quote pill */}
              <div className="mt-6 p-4 rounded-xl bg-white/[0.03] border-l-2 border-cyan-400 border-white/5">
                <p className="text-xs sm:text-sm text-cyan-200/90 italic font-sans">
                  "Detrás de cada línea de código y cada interfaz hay una persona que entiende tu negocio y diseña herramientas para devolverte tiempo."
                </p>
                <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 block mt-1.5">
                  — Vilmar Olivera, Fundadora
                </span>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <button
                  onClick={onLearnMoreClick}
                  className="w-full sm:w-auto px-6 py-3.5 bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold text-xs font-mono uppercase tracking-widest rounded-lg transition-all shadow-lg shadow-cyan-400/20 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>CONOCER MÁS SOBRE VILMAR</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                {onContactClick && (
                  <button
                    onClick={onContactClick}
                    className="w-full sm:w-auto px-6 py-3.5 glass-panel hover:bg-white/10 text-white font-mono text-xs uppercase tracking-widest rounded-lg border border-white/15 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
                    <span>HABLAR DIRECTO CON VILMAR</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
