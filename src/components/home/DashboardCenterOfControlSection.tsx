import React, { useState } from 'react';
import { ArrowRight, FileSpreadsheet, FileText, Users, DollarSign, Package, TrendingUp, CheckCircle, RefreshCw, BarChart2, Play, ExternalLink, X } from 'lucide-react';
import { DASHBOARDS_DATA } from '../../data/mockData';
import { DashboardItem } from '../../types';

interface DashboardCenterOfControlProps {
  onViewAllClick: () => void;
  onRequestCustomization: (topic: string) => void;
}

export const DashboardCenterOfControlSection: React.FC<DashboardCenterOfControlProps> = ({
  onViewAllClick,
  onRequestCustomization,
}) => {
  const [activeDashboard, setActiveDashboard] = useState<DashboardItem>(DASHBOARDS_DATA[0]);
  const [activeTimeRange, setActiveTimeRange] = useState<'Hoy' | '7D' | '30D'>('30D');
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [demoDashboard, setDemoDashboard] = useState<DashboardItem | null>(null);

  // 17. Tareas repetitivas que se centralizan
  const repetitiveTasks = [
    { title: 'PRESUPUESTOS', desc: 'Generación y actualización de valores una y otra vez.' },
    { title: 'EXCEL', desc: 'Cargar y actualizar planillas manualmente al cierre del día.' },
    { title: 'PDF & FACTURAS', desc: 'Trasladar información de comprobantes a sistemas contables.' },
    { title: 'DATOS DE CLIENTES', desc: 'Información dispersa en WhatsApps que necesita unificarse.' },
  ];

  const handleOpenDemo = (d: DashboardItem) => {
    setDemoDashboard(d);
    setIsDemoModalOpen(true);
  };

  return (
    <section id="dashboards" className="relative py-20 sm:py-28 md:py-32 bg-[#05070b] overflow-hidden border-t border-white/5">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-950/20 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 relative z-10">
        {/* 12. TRANSICIÓN: TODO ESTÁ DISPERSO */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] sm:tracking-[0.3em] text-cyan-400 font-semibold block mb-3">
            02. Dashboards & Centralización
          </span>
          <div className="font-mono text-xs sm:text-sm uppercase tracking-widest text-red-400 mb-2">
            TODO ESTÁ DISPERSO.
          </div>
          <h2 className="font-display text-2xl min-[380px]:text-3xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight leading-[1.05]">
            ¿Y SI TODO ESTUVIERA EN UN SOLO LUGAR?
          </h2>
          <p className="mt-4 text-sm sm:text-lg text-slate-300 font-light max-w-xl mx-auto leading-relaxed px-2">
            Tomamos información que hoy tenés fragmentada entre planillas, PDFs, mensajes y comprobantes, y la convertimos en una experiencia visual centralizada.
          </p>
        </div>

        {/* 16 & 17. EL CONCEPTO: ¿SEGUÍS HACIENDO ESTO MANUALMENTE? */}
        <div className="p-5 sm:p-8 md:p-10 rounded-2xl glass-panel border border-white/10 mb-12 sm:mb-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 pb-6 border-b border-white/5">
            <div>
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-slate-400">
                El dolor invisible
              </span>
              <h3 className="font-display text-lg sm:text-2xl font-bold text-white mt-1">
                ¿SEGUÍS HACIENDO ESTO MANUALMENTE?
              </h3>
            </div>
            <div className="text-[10px] sm:text-xs font-mono text-cyan-400">
              AUTOMATIZAR LO REPETITIVO → CENTRALIZARLO EN UN DASHBOARD
            </div>
          </div>

          <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {repetitiveTasks.map((task, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-900/60 border border-white/5">
                <span className="text-xs font-mono font-bold text-white block mb-1">
                  {task.title}
                </span>
                <p className="text-xs text-slate-400 font-mono leading-relaxed">
                  {task.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 13 & 14 & 15. EL CENTRO DE CONTROL + SISTEMA DE CARGA PREPARADO */}
        <div className="rounded-2xl glass-panel border border-cyan-500/30 p-4 sm:p-7 md:p-10 shadow-2xl shadow-cyan-950/40">
          {/* Header Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-white/10 gap-4">
            <div>
              <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono text-cyan-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>UN SOLO LUGAR · UNA SOLA EXPERIENCIA · MÁS CONTROL</span>
              </div>
              <h3 className="font-display text-xl sm:text-3xl font-black text-white mt-1">
                TODO LO QUE NECESITÁS. EN UN SOLO LUGAR.
              </h3>
            </div>

            {/* Time range selector */}
            <div className="flex items-center gap-2 text-xs font-mono self-start lg:self-auto">
              {(['Hoy', '7D', '30D'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTimeRange(t)}
                  className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                    activeTimeRange === t
                      ? 'bg-cyan-400 text-black font-bold'
                      : 'bg-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Active Control Center View */}
          <div className="mt-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-4">
              <span className="text-xs font-mono text-slate-400 uppercase truncate">
                Panel Activo: <strong className="text-white">{activeDashboard.name}</strong> ({activeDashboard.category})
              </span>
              <button
                onClick={() => handleOpenDemo(activeDashboard)}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-white uppercase font-bold cursor-pointer shrink-0"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>PROBAR DEMO INTERACTIVA</span>
              </button>
            </div>

            {/* Main KPI Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="p-4 sm:p-5 rounded-xl bg-slate-900/80 border border-white/5">
                <span className="text-xs font-mono text-slate-400 block">{activeDashboard.kpiLabel}</span>
                <div className="font-mono text-2xl sm:text-3xl font-black text-white mt-1 tabular-nums">
                  {activeTimeRange === 'Hoy' ? '$1.840.000' : activeTimeRange === '7D' ? '$14.200.000' : activeDashboard.highlightKpi}
                </div>
                <span className="text-xs font-mono text-emerald-400 mt-2 block">{activeDashboard.kpiDelta}</span>
              </div>

              {activeDashboard.metrics.slice(0, 3).map((m, i) => (
                <div key={i} className="p-4 sm:p-5 rounded-xl bg-slate-900/80 border border-white/5">
                  <span className="text-xs font-mono text-slate-400 block">{m.label}</span>
                  <div className="font-mono text-2xl sm:text-3xl font-black text-white mt-1 tabular-nums">{m.value}</div>
                  <span className="text-xs font-mono text-cyan-400 mt-2 block">{m.trend}</span>
                </div>
              ))}
            </div>

            {/* Live Chart Stream */}
            <div className="mt-6 p-4 sm:p-6 rounded-xl bg-slate-950/80 border border-white/5">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-4">
                <span>Flujo de Datos Centralizados en Tiempo Real</span>
                <span className="text-cyan-400 font-bold">● Live Sync</span>
              </div>
              <div className="h-24 sm:h-28 w-full flex items-end gap-1 sm:gap-2 md:gap-3 pt-2 overflow-hidden">
                {[38, 48, 44, 62, 74, 68, 85, 96, 90, 108, 115, 122, 130, 142].map((v, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-gradient-to-t from-blue-600 to-cyan-400 rounded-t transition-all duration-300 hover:brightness-125"
                      style={{ height: `${(v / 150) * 100}%` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 14 & 15. SISTEMA PREPARADO PARA AGREGAR NUEVOS DASHBOARDS */}
          <div className="mt-10 pt-8 border-t border-white/10">
            <div className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-4">
              Colección de Dashboards del Estudio (Preparado para incorporar nuevos paneles)
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {DASHBOARDS_DATA.map((dash, index) => (
                <div
                  key={dash.id}
                  className={`p-5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    activeDashboard.id === dash.id
                      ? 'bg-cyan-950/30 border-cyan-400'
                      : 'bg-white/5 border-white/5 hover:border-white/20'
                  }`}
                  onClick={() => setActiveDashboard(dash)}
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
                      <span className="text-cyan-400 font-bold">DASHBOARD 0{index + 1}</span>
                      <span>{dash.category}</span>
                    </div>
                    <h4 className="font-display text-lg font-bold text-white">{dash.name}</h4>
                    <p className="mt-1 text-xs text-slate-400 leading-relaxed font-light">{dash.tagline}</p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-white tabular-nums">
                      {dash.highlightKpi}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenDemo(dash);
                      }}
                      className="inline-flex items-center gap-1 text-xs font-mono text-cyan-400 hover:text-white transition-colors cursor-pointer"
                    >
                      <span>VER DEMO</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 sm:mt-14 flex justify-center">
          <button
            onClick={onViewAllClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 bg-white/5 hover:bg-cyan-400 text-white hover:text-black font-mono font-bold text-xs uppercase tracking-widest rounded border border-white/15 hover:border-cyan-400 transition-all duration-300 cursor-pointer"
          >
            <span>VER DASHBOARDS</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Interactive Modal Preview for any selected Dashboard */}
      {isDemoModalOpen && demoDashboard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div 
            className="relative w-full max-w-3xl bg-[#090e17] border border-cyan-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between pb-4 border-b border-white/10">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                  Preview en Vivo · {demoDashboard.category}
                </span>
                <h3 className="font-display text-2xl font-bold text-white mt-1">
                  {demoDashboard.name}
                </h3>
                <p className="text-xs text-slate-300 mt-1">{demoDashboard.description}</p>
              </div>
              <button
                onClick={() => setIsDemoModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-6 space-y-6">
              <div className="p-4 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-slate-400 block">{demoDashboard.kpiLabel}</span>
                  <span className="font-mono text-3xl font-black text-cyan-400">{demoDashboard.highlightKpi}</span>
                </div>
                <span className="text-xs font-mono text-emerald-400">{demoDashboard.kpiDelta}</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {demoDashboard.metrics.map((m, i) => (
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
                Se conecta a tus bases de datos, APIs o archivos existentes.
              </span>
              <button
                onClick={() => {
                  setIsDemoModalOpen(false);
                  onRequestCustomization(`Dashboard: ${demoDashboard.name}`);
                }}
                className="w-full sm:w-auto px-6 py-2.5 bg-cyan-400 text-black font-mono font-bold text-xs uppercase tracking-wider rounded hover:bg-cyan-300 transition-colors cursor-pointer"
              >
                SOLICITAR ESTE DASHBOARD
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
