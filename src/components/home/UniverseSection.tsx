import React from 'react';
import { ArrowUpRight, Smartphone, LayoutDashboard, Cpu, GraduationCap } from 'lucide-react';

interface UniverseSectionProps {
  onNavigateToCategory: (category: 'mini-apps' | 'dashboards' | 'automatizaciones' | 'academy') => void;
}

export const UniverseSection: React.FC<UniverseSectionProps> = ({ onNavigateToCategory }) => {
  return (
    <section id="universo" className="relative py-28 bg-[#05070b] overflow-hidden border-t border-white/5">
      {/* Background ambient accents */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-cyan-900/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -right-40 w-96 h-96 bg-blue-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-cyan-400 font-semibold mb-3">
            01. Ecosistema Digital
          </div>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase leading-[1.1]">
            UN UNIVERSO DE{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              POSIBILIDADES.
            </span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
            AI Quantum Studio reúne tecnología, creatividad y aplicación práctica para transformar necesidades reales en soluciones digitales de alto impacto.
          </p>
        </div>

        {/* Asymmetric Spatial Layout (not a boring corporate grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Card 1: MINI APPS (Large Marquee Card - Col 7) */}
          <div 
            onClick={() => onNavigateToCategory('mini-apps')}
            className="lg:col-span-7 group relative rounded-xl p-8 md:p-10 glass-panel hover:border-cyan-400/50 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between min-h-[360px]"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl group-hover:bg-cyan-500/10 transition-colors pointer-events-none" />
            
            <div>
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-lg bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1 text-xs font-mono text-cyan-400 group-hover:translate-x-1 transition-transform">
                  <span>EXPLORAR</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              <h3 className="mt-8 font-display text-2xl md:text-3xl font-bold text-white tracking-tight">
                MINI APPS
              </h3>
              <p className="mt-3 text-slate-400 text-sm md:text-base leading-relaxed max-w-lg">
                Herramientas hiper-específicas para resolver dolores puntuales en minutos: turnos, cálculo de propinas, comandas y utilidades de negocio sin instalaciones pesadas.
              </p>
            </div>

            {/* Micro visual simulation preview */}
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-2 text-slate-300">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                Acceso instantáneo vía Web & QR
              </span>
              <span className="text-cyan-400">01 / 04</span>
            </div>
          </div>

          {/* Card 2: DASHBOARDS (Col 5) */}
          <div 
            onClick={() => onNavigateToCategory('dashboards')}
            className="lg:col-span-5 group relative rounded-xl p-8 md:p-10 glass-panel hover:border-blue-400/50 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between min-h-[360px]"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-colors pointer-events-none" />

            <div>
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 border border-blue-400/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                  <LayoutDashboard className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1 text-xs font-mono text-blue-400 group-hover:translate-x-1 transition-transform">
                  <span>VER PANELES</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              <h3 className="mt-8 font-display text-2xl md:text-3xl font-bold text-white tracking-tight">
                DASHBOARDS
              </h3>
              <p className="mt-3 text-slate-400 text-sm md:text-base leading-relaxed">
                Tus datos convertidos en una experiencia visual intuitiva. Ventas, finanzas, inventario y retención para tomar decisiones en segundos.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="text-slate-300">Métricas vivas en tiempo real</span>
              <span className="text-blue-400">02 / 04</span>
            </div>
          </div>

          {/* Card 3: AUTOMATIZACIONES (Col 5) */}
          <div 
            onClick={() => onNavigateToCategory('automatizaciones')}
            className="lg:col-span-5 group relative rounded-xl p-8 md:p-10 glass-panel hover:border-cyan-400/50 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between min-h-[340px]"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-lg bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                  <Cpu className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1 text-xs font-mono text-cyan-400 group-hover:translate-x-1 transition-transform">
                  <span>DESCUBRIR</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              <h3 className="mt-8 font-display text-2xl md:text-3xl font-bold text-white tracking-tight">
                AUTOMATIZACIONES
              </h3>
              <p className="mt-3 text-slate-400 text-sm md:text-base leading-relaxed">
                Menos tareas manuales repetitivas. Conectamos tus formularios, facturas, turnos y mensajería en pipelines que corren solos.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="text-slate-300">Entrada → Proceso → Resultado</span>
              <span className="text-cyan-400">03 / 04</span>
            </div>
          </div>

          {/* Card 4: AI QUANTUM ACADEMY (Col 7) */}
          <div 
            onClick={() => onNavigateToCategory('academy')}
            className="lg:col-span-7 group relative rounded-xl p-8 md:p-10 glass-panel hover:border-sky-400/50 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between min-h-[340px]"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-lg bg-sky-500/10 border border-sky-400/20 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1 text-xs font-mono text-sky-400 group-hover:translate-x-1 transition-transform">
                  <span>PROGRAMA 2026</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              <h3 className="mt-8 font-display text-2xl md:text-3xl font-bold text-white tracking-tight">
                AI QUANTUM ACADEMY
              </h3>
              <p className="mt-3 text-slate-400 text-sm md:text-base leading-relaxed max-w-lg">
                Aprender IA también es crear. Formación práctica para dueños de negocio, desarrolladores y profesionales que quieren aplicar Inteligencia Artificial en el mundo real.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="text-slate-300">Metodología 100% práctica sobre proyectos reales</span>
              <span className="text-sky-400">04 / 04</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
