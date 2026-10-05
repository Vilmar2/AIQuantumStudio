import React, { useState, useEffect } from 'react';
import { ArrowLeft, Filter, Sparkles } from 'lucide-react';
import { MINI_APPS_DATA } from '../data/mockData';
import { MiniAppItem } from '../types';
import { MiniAppCard } from '../components/showroom/MiniAppCard';
import { LiveDemoWindow } from '../components/showroom/LiveDemoWindow';
import { MiniAppSimulatorModal } from '../components/shared/MiniAppSimulatorModal';

interface MiniAppsPageProps {
  onBack: () => void;
  onOpenSolutionModal: (topic?: string) => void;
  initialAppId?: string;
}

export const MiniAppsPage: React.FC<MiniAppsPageProps> = ({
  onBack,
  onOpenSolutionModal,
  initialAppId,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [activeLiveDemoApp, setActiveLiveDemoApp] = useState<MiniAppItem | null>(null);
  const [activeSimulatorApp, setActiveSimulatorApp] = useState<MiniAppItem | null>(null);

  // Check if initial app requested (e.g. dividi-mesa)
  useEffect(() => {
    if (initialAppId) {
      const match = MINI_APPS_DATA.find((a) => a.id === initialAppId);
      if (match) {
        if (match.embedUrl) {
          setActiveLiveDemoApp(match);
        } else {
          setActiveSimulatorApp(match);
        }
      }
    }
  }, [initialAppId]);

  const categories = ['Todos', 'Gastronomía & Finanzas Prácticas', 'Gastronomía & Utilidades', 'Servicios & Locales', 'Herramientas para Negocios', 'Operaciones'];

  const filteredApps = selectedCategory === 'Todos'
    ? MINI_APPS_DATA
    : MINI_APPS_DATA.filter((app) => app.category === selectedCategory);

  const handleTestClick = (app: MiniAppItem) => {
    if (app.embedUrl) {
      setActiveLiveDemoApp(app);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setActiveSimulatorApp(app);
    }
  };

  // If Live Demo is active, render the dedicated embedded showroom window!
  if (activeLiveDemoApp) {
    return (
      <LiveDemoWindow
        app={activeLiveDemoApp}
        onBack={() => setActiveLiveDemoApp(null)}
        onRequestCustomization={(name) => onOpenSolutionModal(`Mini App: ${name}`)}
      />
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#05070b]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Back navigation */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 hover:text-cyan-400 transition-colors mb-8 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Inicio</span>
        </button>

        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-cyan-400 font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>LIVE MINI APP SHOWROOM</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-black text-white uppercase tracking-tight">
            MINI APPS EN VIVO
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-light">
            Pequeñas herramientas. Problemas reales. Soluciones simples. Probá cada Mini App funcionando directamente dentro de AI Quantum Studio, sin necesidad de salir ni descargar nada.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-mono tracking-wider uppercase transition-colors whitespace-nowrap rounded-lg cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-cyan-400 text-black font-bold shadow-md shadow-cyan-400/20'
                  : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Scalable Mini Apps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApps.map((app) => (
            <MiniAppCard
              key={app.id}
              app={app}
              featured={app.id === 'dividi-mesa'}
              onTestClick={handleTestClick}
              onLearnMoreClick={(a) => onOpenSolutionModal(`Consulta sobre ${a.name}`)}
            />
          ))}
        </div>
      </div>

      {/* Simulator Modal Fallback for internal algorithmic tools */}
      {activeSimulatorApp && (
        <MiniAppSimulatorModal
          app={activeSimulatorApp}
          onClose={() => setActiveSimulatorApp(null)}
          onRequestCustomization={(name) => onOpenSolutionModal(`Mini App: ${name}`)}
        />
      )}
    </div>
  );
};
