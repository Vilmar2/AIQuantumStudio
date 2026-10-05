import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, BookOpen, Layers, Award, Users, Sparkles } from 'lucide-react';
import { ACADEMY_MODULES } from '../data/mockData';

interface AcademyPageProps {
  onBack: () => void;
  onOpenSolutionModal: (topic?: string) => void;
}

export const AcademyPage: React.FC<AcademyPageProps> = ({
  onBack,
  onOpenSolutionModal,
}) => {
  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#05070b]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 hover:text-cyan-400 transition-colors mb-8 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Inicio</span>
        </button>

        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-cyan-400 font-semibold">
            Academia & Formación de Vanguardia
          </span>
          <h1 className="mt-2 font-display text-4xl sm:text-6xl font-black text-white uppercase tracking-tight">
            AI QUANTUM ACADEMY
          </h1>
          <div className="mt-3 text-xl font-bold uppercase tracking-wider text-slate-300">
            APRENDER IA TAMBIÉN ES CREAR.
          </div>
          <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
            Formación práctica para aprender Inteligencia Artificial y llevarla a situaciones reales. No te enseñamos teoría obsoleta: construís productos digitales reales desde la primera semana.
          </p>
        </div>

        {/* Flagship Program Card */}
        <div className="rounded-2xl glass-panel border border-cyan-500/30 p-8 sm:p-12 mb-16 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-8 border-b border-white/10 gap-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 block mb-1">
                Convocatoria Oficial
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-black text-white uppercase">
                IA APLICADA 2026
              </h2>
              <p className="mt-2 text-slate-300 text-sm md:text-base max-w-xl leading-relaxed">
                El programa intensivo para dueños de empresas, profesionales independientes y entusiastas de la tecnología que quieren dominar la creación de software ligero, dashboards y automatizaciones.
              </p>
            </div>

            <button
              onClick={() => onOpenSolutionModal('Inscripción: IA Aplicada 2026')}
              className="px-8 py-4 bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold text-xs uppercase tracking-widest rounded transition-all cursor-pointer shadow-xl shadow-cyan-400/20 active:scale-[0.98] self-start lg:self-auto"
            >
              POSTULARME AL PROGRAMA →
            </button>
          </div>

          {/* Syllabus Modules */}
          <div className="mt-10 space-y-6">
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400">
              Plan de Estudios Modular
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ACADEMY_MODULES.map((m) => (
                <div key={m.id} className="p-6 rounded-xl bg-slate-900/90 border border-white/10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono mb-2">
                      <span className="text-cyan-400 font-bold">Módulo {m.number}</span>
                      <span className="text-slate-400">{m.duration}</span>
                    </div>
                    <h4 className="font-display text-xl font-bold text-white mb-2">{m.title}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed mb-4">{m.focus}</p>
                  </div>
                  <div className="pt-3 border-t border-white/10 text-xs font-mono text-cyan-300">
                    <span className="text-slate-400">Entregable real: </span>
                    {m.deliverable}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Why choose AI Quantum Academy */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-8 rounded-xl glass-panel border border-white/10">
            <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="font-display text-xl font-bold text-white">Mentoría de Vilmar</h4>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              Sesiones semanales directas de feedback de código, diseño de interfaces y estrategia comercial con la fundadora de AI Quantum Studio.
            </p>
          </div>

          <div className="p-8 rounded-xl glass-panel border border-white/10">
            <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 mb-4">
              <Layers className="w-6 h-6" />
            </div>
            <h4 className="font-display text-xl font-bold text-white">Toolkit Profesional</h4>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              Accedés a librerías de componentes premium, plantillas de arquitecturas probadas y conectores de datos listos para desplegar.
            </p>
          </div>

          <div className="p-8 rounded-xl glass-panel border border-white/10">
            <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h4 className="font-display text-xl font-bold text-white">Bolsa de Proyectos</h4>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              Los mejores egresados participan en desarrollos comerciales reales encargados a AI Quantum Studio.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
