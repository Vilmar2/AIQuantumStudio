import React, { useState } from 'react';
import { ArrowRight, BarChart3, TrendingUp, Eye, CheckCircle2, ChevronRight } from 'lucide-react';
import { DASHBOARDS_DATA } from '../../data/mockData';
import { DashboardItem } from '../../types';

interface DashboardsShowroomProps {
  onViewAllClick: () => void;
  onRequestCustomization: (dashboardName: string) => void;
}

export const DashboardsShowroom: React.FC<DashboardsShowroomProps> = ({
  onViewAllClick,
  onRequestCustomization,
}) => {
  const [activeDashboardIndex, setActiveDashboardIndex] = useState(0);
  const activeDashboard = DASHBOARDS_DATA[activeDashboardIndex];

  return (
    <section id="dashboards" className="relative py-28 bg-[#070b13] border-t border-white/5 overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-blue-900/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-blue-400 font-semibold">
              04. Inteligencia de Datos
            </span>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase leading-[1.05]">
              DASHBOARDS
            </h2>
            <div className="mt-3 text-lg md:text-xl font-bold uppercase tracking-wider text-slate-300">
              TUS DATOS. UNA EXPERIENCIA COMPLETAMENTE NUEVA.
            </div>
            <p className="mt-3 text-slate-400 text-sm md:text-base leading-relaxed">
              Consolidamos tus fuentes de información dispersas en tableros ejecutivos diseñados para ver la realidad de tu negocio en una sola mirada.
            </p>
          </div>

          <button
            onClick={onViewAllClick}
            className="self-start md:self-end inline-flex items-center gap-2 px-5 py-3 text-xs font-mono uppercase tracking-wider text-blue-400 hover:text-white border border-blue-400/30 hover:border-blue-400 bg-blue-950/20 hover:bg-blue-900/30 rounded-sm transition-all cursor-pointer"
          >
            <span>EXPLORAR DASHBOARDS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Dashboard Categories Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {DASHBOARDS_DATA.map((dash, index) => (
            <button
              key={dash.id}
              onClick={() => setActiveDashboardIndex(index)}
              className={`px-4 py-2 text-xs font-mono tracking-wider uppercase transition-all rounded cursor-pointer whitespace-nowrap ${
                activeDashboardIndex === index
                  ? 'bg-blue-500 text-white font-bold shadow-lg shadow-blue-500/20'
                  : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {dash.category}
            </button>
          ))}
        </div>

        {/* Marquee Interactive Dashboard Viewer */}
        <div className="relative rounded-2xl glass-panel border border-white/15 p-6 sm:p-10 overflow-hidden">
          {/* Top Bar of the Dashboard Canvas */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-blue-400">
                <span>Categoría: {activeDashboard.category}</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Live Sync
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
                {activeDashboard.name}
              </h3>
              <p className="text-sm text-slate-400 mt-1 max-w-xl">
                {activeDashboard.description}
              </p>
            </div>

            <button
              onClick={() => onRequestCustomization(`Dashboard ${activeDashboard.name}`)}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-500 hover:bg-blue-400 text-white font-bold text-xs uppercase tracking-wider rounded transition-colors self-start sm:self-auto cursor-pointer"
            >
              <span>QUIERO ESTE DASHBOARD</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Main Visual KPIs & Simulated Real-time Charts */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Highlighted Primary Metric (Col 4) */}
            <div className="lg:col-span-4 p-6 rounded-xl bg-slate-900/90 border border-white/10 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                  {activeDashboard.kpiLabel}
                </span>
                <div className="font-mono text-4xl sm:text-5xl font-black text-white mt-3 tabular-nums">
                  {activeDashboard.highlightKpi}
                </div>
                <div className="inline-flex items-center gap-1.5 mt-3 text-xs font-mono text-emerald-400">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{activeDashboard.kpiDelta}</span>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 text-xs text-slate-400 leading-relaxed">
                Actualización continua desde tus puntos de venta, pasarelas de pago y sistemas de inventario.
              </div>
            </div>

            {/* Metrics Grid (Col 8) */}
            <div className="lg:col-span-8 flex flex-col justify-between gap-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {activeDashboard.metrics.map((metric, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-[11px] font-mono text-slate-400 block truncate">
                      {metric.label}
                    </span>
                    <div className="font-mono text-xl sm:text-2xl font-bold text-white mt-1 tabular-nums">
                      {metric.value}
                    </div>
                    <span className="text-[10px] font-mono text-cyan-400 block mt-1">
                      {metric.trend}
                    </span>
                  </div>
                ))}
              </div>

              {/* Dynamic Visual Trend Line / Bars Representation */}
              <div className="p-6 rounded-xl bg-slate-950/60 border border-white/10">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-4">
                  <span>Tendencia Últimos 30 Días (Proyección Cuántica)</span>
                  <span className="text-blue-400">Intervalo diario</span>
                </div>

                {/* Simulated SVG Wave Graph with Neon Gradient */}
                <div className="h-32 w-full flex items-end gap-1.5 sm:gap-3 pt-4">
                  {[45, 52, 48, 62, 70, 65, 80, 75, 88, 92, 85, 96, 110, 105, 120, 115, 130, 142].map((val, i) => {
                    const heightPercent = Math.min((val / 150) * 100, 100);
                    const isLast = i === 17;
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
                        <div
                          className={`w-full rounded-t transition-all duration-500 ${
                            isLast
                              ? 'bg-cyan-400 shadow-lg shadow-cyan-400/50'
                              : 'bg-blue-600/60 group-hover:bg-blue-500'
                          }`}
                          style={{ height: `${heightPercent}%` }}
                        />
                        <div className="opacity-0 group-hover:opacity-100 absolute -top-7 text-[10px] font-mono bg-black px-1.5 py-0.5 rounded border border-white/20 text-white pointer-events-none transition-opacity">
                          {val}k
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
