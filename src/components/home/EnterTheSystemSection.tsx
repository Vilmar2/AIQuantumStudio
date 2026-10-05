import React, { useState } from 'react';
import { ArrowUpRight, Smartphone, LayoutDashboard, Cpu, GraduationCap, Sparkles } from 'lucide-react';
import { NavigationTab } from '../../types';

interface EnterTheSystemSectionProps {
  onNavigate: (tab: NavigationTab) => void;
}

export const EnterTheSystemSection: React.FC<EnterTheSystemSectionProps> = ({ onNavigate }) => {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  const systemNodes = [
    {
      id: 'mini-apps' as NavigationTab,
      label: 'MINI APPS',
      description: 'Micro-herramientas táctiles para resolver cuellos de botella hoy.',
      icon: Smartphone,
      accent: '#00e5ff',
      coord: 'NODE_01 // LATENCY: 0ms',
      depth: 'scale-100',
    },
    {
      id: 'dashboards' as NavigationTab,
      label: 'DASHBOARDS',
      description: 'Data dimension: tus métricas en tableros ejecutivos en vivo.',
      icon: LayoutDashboard,
      accent: '#0066ff',
      coord: 'NODE_02 // SYNC: ACTIVE',
      depth: 'scale-95',
    },
    {
      id: 'automatizaciones' as NavigationTab,
      label: 'AUTOMATIZACIONES',
      description: 'Pipelines automáticos que liberan horas repetitivas de tu equipo.',
      icon: Cpu,
      accent: '#38bdf8',
      coord: 'NODE_03 // FLOW: CONTINUOUS',
      depth: 'scale-100',
    },
    {
      id: 'academy' as NavigationTab,
      label: 'ACADEMY',
      description: 'Constelación de formación práctica en IA para creadores y empresas.',
      icon: GraduationCap,
      accent: '#818cf8',
      coord: 'NODE_04 // EXPANSION: 2026',
      depth: 'scale-95',
    },
  ];

  return (
    <section className="relative py-28 bg-[#05070b] overflow-hidden border-t border-white/5">
      {/* Background Neural Circuitry lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <line x1="20%" y1="15%" x2="50%" y2="50%" stroke="#00e5ff" strokeWidth="1" strokeDasharray="4 8" />
          <line x1="80%" y1="20%" x2="50%" y2="50%" stroke="#0066ff" strokeWidth="1" strokeDasharray="4 8" />
          <line x1="30%" y1="85%" x2="50%" y2="50%" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4 8" />
          <line x1="75%" y1="80%" x2="50%" y2="50%" stroke="#818cf8" strokeWidth="1" strokeDasharray="4 8" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-cyan-400 font-semibold mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            ENTER THE SYSTEM
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-black text-white uppercase tracking-tight leading-[1.05]">
            TODO ESTÁ{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
              CONECTADO.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
            La red neuronal de AI Quantum Studio vincula cada punto de tu operativa. Las herramientas no son islas aisladas: se comunican, alimentan tus datos y generan eficiencia autónoma.
          </p>
        </div>

        {/* Spatial 3D Synaptic Nodes (Hovering one elevates it and dims others) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {systemNodes.map((node, idx) => {
            const Icon = node.icon;
            const isHovered = hoveredNode === idx;
            const isAnyHovered = hoveredNode !== null;
            const dimmed = isAnyHovered && !isHovered;

            return (
              <div
                key={node.id}
                onMouseEnter={() => setHoveredNode(idx)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => onNavigate(node.id)}
                className={`relative rounded-2xl p-7 glass-panel border transition-all duration-400 cursor-pointer flex flex-col justify-between min-h-[320px] ${
                  isHovered
                    ? 'border-cyan-400 -translate-y-3 shadow-2xl shadow-cyan-950/60 bg-[#0c1424]/90 z-20 scale-[1.03]'
                    : dimmed
                    ? 'opacity-40 border-white/5 bg-[#070b13]/60 scale-95'
                    : 'border-white/10 bg-[#080d17]/80 hover:border-white/30'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-white/5">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300"
                      style={{
                        backgroundColor: `${node.accent}15`,
                        border: `1px solid ${node.accent}40`,
                        color: node.accent,
                      }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-[10px] text-slate-400">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="mt-6 font-display text-2xl font-bold text-white tracking-tight">
                    {node.label}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {node.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 group">
                  <span className="text-cyan-400">ENTRAR AL NODO</span>
                  <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-400 group-hover:text-black transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5" />
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
