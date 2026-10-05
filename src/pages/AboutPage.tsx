import React from 'react';
import { ArrowLeft, ArrowRight, ShieldCheck, Sparkles, Zap, Award } from 'lucide-react';
import founderPhoto from '../assets/images/vilmar_olivera.png';

interface AboutPageProps {
  onBack: () => void;
  onOpenSolutionModal: (topic?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onBack,
  onOpenSolutionModal,
}) => {
  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#05070b]">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 hover:text-cyan-400 transition-colors mb-8 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Inicio</span>
        </button>

        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-cyan-400 font-semibold block mb-2">
            DETRÁS DE AI QUANTUM STUDIO
          </span>
          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-tight">
            CONVERTIMOS IDEAS Y PROBLEMAS REALES EN SOLUCIONES DIGITALES.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 font-light leading-relaxed">
            Un estudio de ingeniería y diseño digital fundado por <strong className="text-white font-semibold">Vilmar Olivera</strong> para crear herramientas prácticas, directas y memorables.
          </p>
        </div>

        {/* Founder presentation */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center mb-16">
          <div className="md:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-slate-900 shadow-2xl shadow-cyan-950/40 group">
              <img
                src={founderPhoto}
                alt="Vilmar Olivera — Fundadora de AI Quantum Studio"
                className="w-full aspect-[4/5] object-cover object-top filter contrast-105 group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block font-bold">Fundadora & Directora</span>
                <h3 className="font-display text-2xl font-bold text-white">Vilmar Olivera</h3>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 space-y-4 text-slate-300 leading-relaxed text-base">
            <p>
              "En un mundo saturado de promesas abstractas sobre Inteligencia Artificial, decidí fundar AI Quantum Studio con un principio no negociable: <strong className="text-white">la tecnología solo tiene valor si resuelve un problema concreto en el mundo real.</strong>"
            </p>
            <p className="text-sm text-slate-400">
              Como creadora, tecnóloga y estratega, Vilmar lidera la visión de cada producto: ya sea optimizar el reparto de propinas y horas de un restaurante, ordenar el flujo de caja de una distribuidora con dashboards en tiempo real, o automatizar el onboarding de nuevos clientes, cada solución que sale de este estudio está diseñada para ser ultra intuitiva, rápida de implementar y memorable en lo visual.
            </p>
            <p className="text-sm text-slate-400">
              AI Quantum Studio reúne cuatro grandes áreas de impacto: Mini Apps, Dashboards ejecutivos, Automatizaciones de procesos y la AI Quantum Academy, junto a desarrollos a medida para desafíos únicos.
            </p>
          </div>
        </div>

        {/* Manifesto / Core Values */}
        <div className="p-8 sm:p-12 rounded-2xl glass-panel border border-white/10 space-y-8 mb-16">
          <h3 className="font-display text-2xl font-black text-white uppercase tracking-tight">
            NUESTRO MANIFIESTO DE INGENIERÍA Y DISEÑO
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
            <div className="p-5 rounded-xl bg-white/5 border border-white/5 space-y-2">
              <span className="font-mono text-xs text-cyan-400 font-bold">01. CERO FRICCIÓN</span>
              <p className="text-slate-300">
                Las mejores herramientas se usan en 3 clicks. Si tu equipo necesita un manual de 40 páginas, la herramienta está mal diseñada.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-white/5 border border-white/5 space-y-2">
              <span className="font-mono text-xs text-blue-400 font-bold">02. ESTÉTICA INTERNACIONAL</span>
              <p className="text-slate-300">
                El software corporativo aburrido es cosa del pasado. Cada interfaz debe sentirse moderna, cinematográfica y placentera de usar.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-white/5 border border-white/5 space-y-2">
              <span className="font-mono text-xs text-sky-400 font-bold">03. IMPACTO EN TIEMPO Y CAJA</span>
              <p className="text-slate-300">
                Toda mini app o automatización debe justificar su existencia ahorrando horas hombre de trabajo o evitando fugas de ingresos.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-white/5 border border-white/5 space-y-2">
              <span className="font-mono text-xs text-emerald-400 font-bold">04. FORMACIÓN EN ACCIÓN</span>
              <p className="text-slate-300">
                En nuestra Academy no enseñamos a recitar conceptos: enseñamos a construir y monetizar productos digitales con IA.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center pt-8 border-t border-white/10">
          <h3 className="font-display text-3xl font-black text-white uppercase">
            HABLEMOS DE TU PROYECTO
          </h3>
          <p className="mt-2 text-slate-400 text-sm max-w-md mx-auto">
            ¿Tenés una idea o un proceso que te quita el sueño? Analicemos juntos cómo resolverlo con Vilmar y el equipo.
          </p>
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => onOpenSolutionModal('Consulta con Vilmar Olivera')}
              className="px-8 py-4 bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold text-xs uppercase tracking-widest rounded transition-all cursor-pointer shadow-lg shadow-cyan-400/20 active:scale-[0.98]"
            >
              INICIAR CONVERSACIÓN CON VILMAR →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
