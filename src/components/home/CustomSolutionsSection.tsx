import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Lightbulb, Sparkles, Layers, Wrench, ShieldAlert } from 'lucide-react';

interface CustomSolutionsSectionProps {
  onSubmitIdea?: (ideaText: string) => void;
}

export const CustomSolutionsSection: React.FC<CustomSolutionsSectionProps> = ({ onSubmitIdea }) => {
  const [ideaText, setIdeaText] = useState('');
  const [selectedType, setSelectedType] = useState<'MINI APP' | 'DASHBOARD' | 'OTRA'>('MINI APP');
  const [activeStep, setActiveStep] = useState<number>(0);
  const [submitted, setSubmitted] = useState(false);

  const steps = [
    { title: 'PROBLEMA', desc: 'Un proceso que hoy te hace perder tiempo o dinero', icon: ShieldAlert, color: '#f87171' },
    { title: 'IDEA', desc: 'El planteo conceptual de la solución digital', icon: Lightbulb, color: '#38bdf8' },
    { title: 'DISEÑO', desc: 'Arquitectura de datos e interfaz intuitiva', icon: Layers, color: '#00e5ff' },
    { title: 'HERRAMIENTA', desc: 'Producto digital terminado y en producción', icon: Wrench, color: '#34d399' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ideaText.trim()) return;

    if (onSubmitIdea) {
      onSubmitIdea(ideaText);
    }

    const message = encodeURIComponent(
      `Hola AI Quantum Studio! Tengo una idea para mi negocio:\n\n*Tipo:* ${selectedType}\n*Descripción:* ${ideaText}`
    );
    window.open(`https://wa.me/5493412852228?text=${message}`, '_blank');
    setSubmitted(true);
  };

  return (
    <section id="soluciones" className="relative py-32 bg-[#05070b] overflow-hidden border-t border-white/5">
      <div className="max-w-5xl mx-auto px-6 md:px-10 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-cyan-400 font-semibold block mb-3">
            03. Soluciones Digitales
          </span>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-black text-white uppercase tracking-tight leading-[1.02]">
            TU PROBLEMA.
            <span className="block text-slate-400 font-extrabold text-3xl sm:text-5xl md:text-6xl mt-1">
              UNA EXPERIENCIA DISEÑADA A MEDIDA.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 font-light leading-relaxed max-w-xl mx-auto">
            Si tenés una necesidad específica o una lógica de negocio propia, diseñamos una herramienta digital alrededor de tu problema.
          </p>
        </div>

        {/* 19. IDEA → PRODUCTO: "UNA IDEA PUEDE CONVERTIRSE EN UNA HERRAMIENTA" */}
        <div className="mb-20">
          <div className="text-center mb-8">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-slate-400 block mb-2">
              Transformación
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-black text-white uppercase">
              UNA IDEA PUEDE CONVERTIRSE EN UNA HERRAMIENTA.
            </h3>
          </div>

          {/* 4-Phase Progression */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {steps.map((st, i) => {
              const Icon = st.icon;
              return (
                <div
                  key={st.title}
                  onClick={() => setActiveStep(i)}
                  className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between min-h-[190px] ${
                    activeStep === i
                      ? 'bg-slate-900 border-cyan-400 shadow-xl shadow-cyan-950/40 -translate-y-1'
                      : 'bg-slate-950/60 border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${st.color}15`, color: st.color }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs text-slate-400">0{i + 1}</span>
                  </div>

                  <div>
                    <h4 className="font-display text-base font-bold text-white tracking-wider">{st.title}</h4>
                    <p className="mt-1 text-xs text-slate-400 font-mono leading-relaxed">{st.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 11. FORMULARIO COMO EXPERIENCIA: ¿QUÉ NECESITÁS RESOLVER? */}
        <div className="rounded-2xl glass-panel border border-white/15 p-8 sm:p-12 shadow-2xl shadow-cyan-950/40">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold block mb-1">
                  Inicio del Proyecto
                </span>
                <h3 className="font-display text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
                  ¿QUÉ NECESITÁS RESOLVER?
                </h3>
              </div>

              {/* Big Text Input */}
              <div>
                <textarea
                  rows={4}
                  required
                  value={ideaText}
                  onChange={(e) => setIdeaText(e.target.value)}
                  placeholder="Contame tu idea o qué proceso te gustaría digitalizar..."
                  className="w-full bg-slate-950/90 border border-white/15 rounded-xl p-5 text-base sm:text-lg text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>

              {/* Type selector */}
              <div>
                <label className="text-xs font-mono uppercase tracking-widest text-slate-400 block mb-3">
                  ¿Qué tipo de solución imaginás?
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['MINI APP', 'DASHBOARD', 'OTRA'] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setSelectedType(t)}
                      className={`py-3 px-4 rounded text-xs font-mono tracking-widest uppercase transition-all cursor-pointer border ${
                        selectedType === t
                          ? 'bg-cyan-400 text-black font-bold border-cyan-400 shadow-lg shadow-cyan-400/20'
                          : 'bg-white/5 text-slate-300 border-white/10 hover:border-white/20'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Button: EMPEZAR → */}
              <button
                type="submit"
                className="w-full py-4 bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold text-xs uppercase tracking-widest rounded transition-all cursor-pointer shadow-xl shadow-cyan-400/20 active:scale-[0.99] flex items-center justify-center gap-2"
              >
                <span>EMPEZAR</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="py-12 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center mx-auto text-cyan-400">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="font-display text-2xl font-bold text-white">¡Idea enviada!</h4>
              <p className="text-slate-300 text-sm max-w-sm mx-auto">
                Se abrió WhatsApp para conversar directamente con el equipo de AI Quantum Studio.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setIdeaText('');
                }}
                className="mt-4 text-xs font-mono text-cyan-400 hover:text-white uppercase tracking-wider underline cursor-pointer"
              >
                Enviar otra idea
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
