import React, { useState } from 'react';
import { ArrowRight, Smartphone, LayoutDashboard, Cpu, GraduationCap, CheckCircle2 } from 'lucide-react';
import { NavigationTab } from '../../types';

interface PathSelectorSectionProps {
  onSelectPath: (tab: NavigationTab) => void;
}

export const PathSelectorSection: React.FC<PathSelectorSectionProps> = ({ onSelectPath }) => {
  const [activeHover, setActiveHover] = useState<number | null>(0);

  const paths = [
    {
      id: 'mini-apps' as NavigationTab,
      label: 'MINI APP',
      subtitle: 'Una herramienta específica para resolver una necesidad puntual.',
      icon: Smartphone,
      accent: 'from-cyan-500/20 to-cyan-500/5',
      borderColor: 'hover:border-cyan-400',
      activeColor: 'text-cyan-400',
      highlights: ['Uso inmediato sin instalar nada', 'Pensada para celular o tablet', 'Resuelve un dolor concreto hoy'],
    },
    {
      id: 'dashboards' as NavigationTab,
      label: 'DASHBOARD',
      subtitle: 'Una nueva forma de visualizar tu información y tomar decisiones.',
      icon: LayoutDashboard,
      accent: 'from-blue-500/20 to-blue-500/5',
      borderColor: 'hover:border-blue-400',
      activeColor: 'text-blue-400',
      highlights: ['Ventas, caja, inventario y clientes', 'Métricas limpias sin planillas eternas', 'Acceso seguro para vos y tu equipo'],
    },
    {
      id: 'automatizaciones' as NavigationTab,
      label: 'AUTOMATIZACIÓN',
      subtitle: 'Procesos más simples y menos tareas repetitivas en tu día.',
      icon: Cpu,
      accent: 'from-sky-500/20 to-sky-500/5',
      borderColor: 'hover:border-sky-400',
      activeColor: 'text-sky-400',
      highlights: ['Entrada → Proceso → Resultado', 'Facturación, cobros, citas y WhatsApp', 'Cero errores humanos y más horas libres'],
    },
    {
      id: 'academy' as NavigationTab,
      label: 'ACADEMY',
      subtitle: 'Aprender Inteligencia Artificial aplicándola en proyectos reales.',
      icon: GraduationCap,
      accent: 'from-indigo-500/20 to-indigo-500/5',
      borderColor: 'hover:border-indigo-400',
      activeColor: 'text-indigo-400',
      highlights: ['Metodología práctica 2026', 'Casos reales para negocios', 'Acompañamiento cercano de Vilmar'],
    },
  ];

  return (
    <section className="relative py-28 bg-[#070b13] border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-cyan-400 font-semibold">
            02. Selector de Navegación
          </span>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase">
            ¿QUÉ QUERÉS CREAR?
          </h2>
          <p className="mt-4 text-slate-400 text-base md:text-lg">
            Elegí el camino que mejor se adapta al momento de tu proyecto o negocio.
          </p>
        </div>

        {/* 4 Interactive Paths */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {paths.map((p, idx) => {
            const Icon = p.icon;
            const isHovered = activeHover === idx;

            return (
              <div
                key={p.id}
                onMouseEnter={() => setActiveHover(idx)}
                onClick={() => onSelectPath(p.id)}
                className={`relative rounded-xl p-6 md:p-8 cursor-pointer transition-all duration-300 border flex flex-col justify-between min-h-[380px] bg-gradient-to-b ${p.accent} ${
                  isHovered
                    ? 'border-white/30 -translate-y-2 shadow-2xl shadow-cyan-950/40 bg-slate-900/90'
                    : 'border-white/10 bg-[#090e17]/80'
                } ${p.borderColor}`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-lg bg-white/5 border border-white/10 ${p.activeColor}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-xs text-slate-400">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="mt-6 font-display text-2xl font-bold text-white tracking-tight">
                    {p.label}
                  </h3>
                  <p className="mt-2 text-sm text-slate-300 leading-relaxed min-h-[48px]">
                    {p.subtitle}
                  </p>

                  <div className="mt-6 space-y-2.5">
                    {p.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-400">
                        <CheckCircle2 className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${p.activeColor}`} />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-white group">
                  <span className={p.activeColor}>ELEGIR ESTE CAMINO</span>
                  <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-cyan-400 group-hover:text-black transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
