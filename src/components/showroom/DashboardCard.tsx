import React from 'react';
import { BarChart3, TrendingUp, Play, ArrowRight } from 'lucide-react';
import { DashboardItem } from '../../types';

interface DashboardCardProps {
  dashboard: DashboardItem;
  onSelect: (dash: DashboardItem) => void;
  onRequestCustomization?: (name: string) => void;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  dashboard,
  onSelect,
  onRequestCustomization,
}) => {
  return (
    <div className="rounded-2xl glass-panel border border-white/10 hover:border-cyan-500/30 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-xl bg-[#070a10]">
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono tracking-widest text-slate-300 uppercase">
            {dashboard.category}
          </span>
          <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-mono text-[10px] font-bold">
            DEMO TABLERO
          </span>
        </div>

        <h3 className="font-display text-xl font-bold text-white tracking-tight">
          {dashboard.name}
        </h3>
        <p className="mt-1 text-xs text-cyan-200/80 font-mono">
          {dashboard.tagline}
        </p>

        {/* Highlight KPI Box */}
        <div className="my-5 p-4 rounded-xl bg-white/[0.03] border border-white/5">
          <div className="text-[11px] font-mono text-slate-400">{dashboard.kpiLabel}</div>
          <div className="flex items-baseline gap-3 mt-1">
            <span className="font-display text-2xl sm:text-3xl font-black text-white">{dashboard.highlightKpi}</span>
            <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" />
              {dashboard.kpiDelta}
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-400 font-light line-clamp-2 leading-relaxed">
          {dashboard.description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2.5">
        <button
          onClick={() => onSelect(dashboard)}
          className="flex-1 py-3 bg-cyan-400 hover:bg-cyan-300 text-black font-mono font-extrabold text-xs uppercase tracking-widest rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-400/20 active:scale-[0.98] cursor-pointer"
        >
          <Play className="w-3.5 h-3.5 fill-black" />
          <span>PROBAR AQUÍ</span>
        </button>

        {onRequestCustomization && (
          <button
            onClick={() => onRequestCustomization(dashboard.name)}
            className="px-4 py-3 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-mono text-xs uppercase tracking-wider rounded-lg border border-white/10 transition-colors cursor-pointer"
          >
            CONOCER MÁS
          </button>
        )}
      </div>
    </div>
  );
};
