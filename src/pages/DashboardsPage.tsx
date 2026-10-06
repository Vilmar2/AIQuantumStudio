import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Play, X, TrendingUp, BarChart3, ExternalLink } from 'lucide-react';
import { DASHBOARDS_DATA } from '../data/mockData';
import { DashboardItem } from '../types';

interface DashboardsPageProps {
  onBack: () => void;
  onOpenSolutionModal: (topic?: string) => void;
}

export const DashboardsPage: React.FC<DashboardsPageProps> = ({
  onBack,
  onOpenSolutionModal,
}) => {
  const [selectedDashboard, setSelectedDashboard] = useState<DashboardItem | null>(null);

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-16 sm:pb-20 bg-[#05070b]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 hover:text-cyan-400 transition-colors mb-6 sm:mb-8 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Inicio</span>
        </button>

        <div className="max-w-3xl mb-10 sm:mb-12">
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] sm:tracking-[0.3em] text-cyan-400 font-semibold block mb-2">
            Showroom de Dashboards
          </span>
          <h1 className="font-display text-3xl min-[380px]:text-4xl sm:text-6xl font-black text-white uppercase tracking-tight">
            CENTRO DE CONTROL
          </h1>
          <p className="mt-4 text-sm sm:text-lg text-slate-300 font-light leading-relaxed">
            Todo lo que necesitás. En un solo lugar. Espacio diseñado para incorporar y visualizar tableros interactivos que unifican ventas, operaciones, finanzas e inventario.
          </p>
        </div>

        {/* Dashboard Grid with Demo buttons */}
        <div className="space-y-6 sm:space-y-8">
          {DASHBOARDS_DATA.map((dash, idx) => (
            <div
              key={dash.id}
              className="rounded-2xl glass-panel border border-white/10 p-4 sm:p-7 md:p-10 hover:border-cyan-400/40 transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-white/10 gap-4">
                <div>
                  <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                    DASHBOARD 0{idx + 1} · {dash.category}
                  </div>
                  <h3 className="font-display text-xl sm:text-3xl font-bold text-white mt-1">
                    {dash.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl font-light">
                    {dash.description}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                  <button
                    onClick={() => setSelectedDashboard(dash)}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-black font-mono font-bold text-xs uppercase tracking-wider rounded transition-all cursor-pointer shadow-md shadow-cyan-400/20 active:scale-95"
                  >
                    <Play className="w-3 h-3 fill-black" />
                    <span>PROBAR AQUÍ</span>
                  </button>

                  <button
                    onClick={() => onOpenSolutionModal(`Dashboard: ${dash.name}`)}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-wider rounded transition-colors cursor-pointer"
                  >
                    <span>SOLICITAR</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* KPI Display */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-xl bg-slate-900 border border-white/5">
                  <span className="text-xs font-mono text-slate-400 block">{dash.kpiLabel}</span>
                  <div className="font-mono text-3xl font-black text-white mt-2 tabular-nums">
                    {dash.highlightKpi}
                  </div>
                  <span className="text-xs font-mono text-emerald-400 mt-2 block">
                    {dash.kpiDelta}
                  </span>
                </div>

                {dash.metrics.slice(0, 3).map((m, i) => (
                  <div key={i} className="p-5 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-xs font-mono text-slate-400 block">{m.label}</span>
                    <div className="font-mono text-2xl font-bold text-white mt-2 tabular-nums">
                      {m.value}
                    </div>
                    <span className="text-xs font-mono text-cyan-400 mt-2 block">
                      {m.trend}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Modal Preview */}
      {selectedDashboard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div 
            className="relative w-full max-w-3xl bg-[#090e17] border border-cyan-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between pb-4 border-b border-white/10">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                  Preview en Vivo · {selectedDashboard.category}
                </span>
                <h3 className="font-display text-2xl font-bold text-white mt-1">
                  {selectedDashboard.name}
                </h3>
                <p className="text-xs text-slate-300 mt-1">{selectedDashboard.description}</p>
              </div>
              <button
                onClick={() => setSelectedDashboard(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-6 space-y-6">
              <div className="p-4 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-slate-400 block">{selectedDashboard.kpiLabel}</span>
                  <span className="font-mono text-3xl font-black text-cyan-400">{selectedDashboard.highlightKpi}</span>
                </div>
                <span className="text-xs font-mono text-emerald-400">{selectedDashboard.kpiDelta}</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {selectedDashboard.metrics.map((m, i) => (
                  <div key={i} className="p-3 rounded-lg bg-white/5 border border-white/5">
                    <span className="text-[11px] font-mono text-slate-400 block">{m.label}</span>
                    <span className="font-mono text-lg font-bold text-white block mt-1">{m.value}</span>
                    <span className="text-[10px] font-mono text-cyan-400">{m.trend}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs font-mono text-slate-400">
                Integración con tus fuentes de datos actuales.
              </span>
              <button
                onClick={() => {
                  const dName = selectedDashboard.name;
                  setSelectedDashboard(null);
                  onOpenSolutionModal(`Dashboard: ${dName}`);
                }}
                className="w-full sm:w-auto px-6 py-2.5 bg-cyan-400 text-black font-mono font-bold text-xs uppercase tracking-wider rounded hover:bg-cyan-300 transition-colors cursor-pointer"
              >
                SOLICITAR ESTE DASHBOARD
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
