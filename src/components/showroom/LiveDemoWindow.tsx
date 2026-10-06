import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Monitor, 
  Tablet, 
  Smartphone, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  Play
} from 'lucide-react';
import { MiniAppItem } from '../../types';
import { EmbedViewer } from './EmbedViewer';
import { DividiMesaPurchaseModal } from '../checkout/DividiMesaPurchaseModal';

interface LiveDemoWindowProps {
  app: MiniAppItem;
  onBack: () => void;
  onRequestCustomization?: (appName: string) => void;
}

export const LiveDemoWindow: React.FC<LiveDemoWindowProps> = ({
  app,
  onBack,
  onRequestCustomization,
}) => {
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('mobile');
  const [activeTab, setActiveTab] = useState<'demo' | 'features' | 'modules'>('demo');
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);

  return (
    <div className="min-h-screen pt-24 pb-20 bg-[#04060a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Volver al Showcase de Mini Apps</span>
          </button>
        </div>

        {/* Header Window Bar */}
        <div className="rounded-2xl glass-panel border border-white/15 p-6 mb-6 relative overflow-hidden shadow-2xl shadow-cyan-950/20">
          <div className="absolute top-0 right-0 w-80 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-[10px] font-mono font-bold tracking-widest text-cyan-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  LIVE DEMO
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {app.category}
                </span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {app.name}
              </h1>
              <p className="mt-1 text-sm sm:text-base text-cyan-200/90 font-mono">
                {app.tagline}
              </p>
            </div>

            {/* Viewport & Controls */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Device Selector */}
              <div className="flex items-center bg-black/40 border border-white/10 rounded-xl p-1">
                <button
                  onClick={() => setViewportMode('mobile')}
                  className={`p-2 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                    viewportMode === 'mobile'
                      ? 'bg-cyan-400 text-black font-bold shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Vista Mobile"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Mobile</span>
                </button>
                <button
                  onClick={() => setViewportMode('tablet')}
                  className={`p-2 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                    viewportMode === 'tablet'
                      ? 'bg-cyan-400 text-black font-bold shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Vista Tablet"
                >
                  <Tablet className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Tablet</span>
                </button>
                <button
                  onClick={() => setViewportMode('desktop')}
                  className={`p-2 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                    viewportMode === 'desktop'
                      ? 'bg-cyan-400 text-black font-bold shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Vista Completa"
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Desktop</span>
                </button>
              </div>
            </div>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex items-center gap-3 sm:gap-6 mt-6 pt-4 border-t border-white/10 text-[11px] sm:text-xs font-mono overflow-x-auto no-scrollbar whitespace-nowrap">
            <button
              onClick={() => setActiveTab('demo')}
              className={`pb-2 transition-all cursor-pointer border-b-2 font-bold shrink-0 ${
                activeTab === 'demo'
                  ? 'border-cyan-400 text-cyan-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              01. EXPERIENCIA EN VIVO
            </button>
            <button
              onClick={() => setActiveTab('features')}
              className={`pb-2 transition-all cursor-pointer border-b-2 font-bold shrink-0 ${
                activeTab === 'features'
                  ? 'border-cyan-400 text-cyan-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              02. DETALLE & CAPACIDADES
            </button>
            <button
              onClick={() => setActiveTab('modules')}
              className={`pb-2 transition-all cursor-pointer border-b-2 font-bold flex items-center gap-1.5 shrink-0 ${
                activeTab === 'modules'
                  ? 'border-cyan-400 text-cyan-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>03. MÓDULOS AVANZADOS</span>
            </button>
          </div>
        </div>

        {/* Tab 01: Live Interactive Demo */}
        {activeTab === 'demo' && (
          <div className="rounded-3xl border border-white/15 bg-[#070a10] overflow-hidden shadow-2xl relative">
            <EmbedViewer
              src={app.embedUrl || 'https://dividimesa.netlify.app/'}
              title={app.name}
              viewportMode={viewportMode}
            />

            {/* Bottom info strip */}
            <div className="p-4 sm:p-5 bg-[#090d15] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
              <div className="flex items-center gap-2.5 text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-slate-400">
                  Esta Mini App está funcionando en vivo dentro de AI Quantum Studio.
                </span>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-[10px] text-cyan-400 font-bold uppercase tracking-widest">
                <Sparkles className="w-3 h-3" />
                <span>EXPERIENCIA REAL</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 02: Features & Scope */}
        {activeTab === 'features' && (
          <div className="w-full max-w-4xl mx-auto p-8 sm:p-10 rounded-2xl glass-panel border border-white/10 space-y-6">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-1">
                Descripción Operativa
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                ¿Qué problema resuelve {app.name}?
              </h3>
              <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                {app.description}
              </p>
            </div>

            <div className="pt-6 border-t border-white/10">
              <h4 className="font-mono text-xs text-white uppercase tracking-wider mb-4">
                Funcionalidades Incluidas en la Demo:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {app.features.map((feat, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-300">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-6">
                <div>
                  <span className="text-[11px] font-mono text-slate-400 block">Tiempo de despliegue:</span>
                  <span className="text-sm font-mono font-bold text-white">{app.timeToImplement}</span>
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-400 block">Métrica de impacto:</span>
                  <span className="text-sm font-mono font-bold text-cyan-400">{app.impactMetric}</span>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('demo')}
                className="px-6 py-3 bg-cyan-400 hover:bg-cyan-300 text-black font-mono font-extrabold text-xs uppercase tracking-widest rounded-lg transition-all cursor-pointer text-center shadow-lg shadow-cyan-400/20 active:scale-95 flex items-center gap-2"
              >
                <Play className="w-3.5 h-3.5 fill-black" />
                <span>PROBAR AQUÍ →</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 03: System Modules & Capabilities */}
        {activeTab === 'modules' && (
          <div className="p-8 sm:p-12 rounded-3xl glass-panel border border-white/15 space-y-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-400 mb-2">
                <Layers className="w-3.5 h-3.5" />
                <span>MÓDULOS DE VERSIÓN COMPLETA</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight">
                CAPACIDADES DEL SISTEMA
              </h3>
              <p className="mt-2 text-sm text-slate-300 font-light leading-relaxed">
                Todas las integraciones y herramientas operativas disponibles en la suite de {app.name}.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(app.protectedFeatures || [
                'Exportación automática y comprobante de propinas a WhatsApp',
                'Historial ilimitado de mesas y turnos para el restaurante',
                'Integración de pagos con alias bancario y CBU/CVU'
              ]).map((feature, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between hover:border-cyan-500/30 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs text-cyan-400 font-bold">MÓDULO 0{i + 1}</span>
                      <span className="px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-400 font-mono text-[10px] font-bold">
                        DISPONIBLE
                      </span>
                    </div>
                    <h4 className="font-display text-base font-bold text-white mb-2">
                      {feature}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-light">
                      Funcionalidad avanzada lista para ser utilizada en tu negocio.
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-400">Estado</span>
                    <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Operativo
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setActiveTab('demo')}
                className="px-6 py-3 bg-cyan-400 hover:bg-cyan-300 text-black font-mono font-extrabold text-xs uppercase tracking-widest rounded-lg transition-all cursor-pointer flex items-center gap-2 shadow-lg shadow-cyan-400/20 active:scale-95"
              >
                <Play className="w-3.5 h-3.5 fill-black" />
                <span>PROBAR MINI APP AQUÍ →</span>
              </button>
            </div>
          </div>
        )}

        {/* Flujo de Compra Final tras la experiencia de Dividí Mesa */}
        {app.id === 'dividi-mesa' && (
          <div className="mt-8 p-6 sm:p-8 rounded-3xl glass-panel border border-cyan-500/40 bg-gradient-to-b from-cyan-950/20 via-[#070b12] to-[#04060a] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-[10px] font-mono font-bold tracking-widest text-cyan-400 uppercase">
                  USD 2 · Argentina: $3.300 ARS
                </span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold">
                  ACCESO PERMANENTE
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                ¿Querés usar Dividí Mesa?
              </h3>
              <p className="text-sm font-mono text-slate-300 font-light">
                Comprá tu acceso y empezá a usarlo.
              </p>
            </div>

            <button
              onClick={() => setIsPurchaseModalOpen(true)}
              className="w-full md:w-auto px-8 py-4 bg-cyan-400 hover:bg-cyan-300 text-black font-mono font-black text-sm uppercase tracking-widest rounded-xl transition-all shadow-xl shadow-cyan-400/25 active:scale-98 flex items-center justify-center gap-2.5 cursor-pointer whitespace-nowrap"
            >
              <span>🛒 COMPRAR DIVIDÍ MESA</span>
            </button>
          </div>
        )}

        {/* Modal de Compra y Solicitud de Acceso */}
        <DividiMesaPurchaseModal
          isOpen={isPurchaseModalOpen}
          onClose={() => setIsPurchaseModalOpen(false)}
        />
      </div>
    </div>
  );
};
