import React, { useState } from 'react';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';
import { NavigationTab } from '../../types';
import { AdminPurchasesModal } from '../admin/AdminPurchasesModal';

interface FooterProps {
  onNavigate: (tab: NavigationTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="relative bg-[#05070b] border-t border-white/5 pt-16 pb-12 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 sm:gap-10 pb-12 border-b border-white/5">
            {/* Brand */}
            <div className="max-w-xs">
              <span className="font-display font-extrabold text-xl tracking-wider text-white block">
                AI QUANTUM STUDIO
              </span>
              <p className="mt-3 text-xs text-slate-400 font-mono leading-relaxed">
                Convertimos problemas reales en soluciones digitales.
              </p>
            </div>

            {/* Core Links */}
            <div className="flex flex-wrap gap-6 sm:gap-8 text-xs font-mono tracking-widest uppercase">
              <div className="flex flex-col gap-2.5">
                <span className="text-slate-300 font-semibold mb-1">Ecosistema</span>
                <button
                  onClick={() => {
                    onNavigate('mini-apps');
                    scrollToTop();
                  }}
                  className="text-left text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  MINI APPS
                </button>
                <button
                  onClick={() => {
                    onNavigate('dashboards');
                    scrollToTop();
                  }}
                  className="text-left text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  DASHBOARDS
                </button>
                <button
                  onClick={() => {
                    onNavigate('soluciones');
                    scrollToTop();
                  }}
                  className="text-left text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  SOLUCIONES
                </button>
                <button
                  onClick={() => {
                    onNavigate('academy');
                    scrollToTop();
                  }}
                  className="text-left text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  ACADEMY
                </button>
                <button
                  onClick={() => {
                    onNavigate('nosotros');
                    scrollToTop();
                  }}
                  className="text-left text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  NOSOTROS
                </button>
              </div>

              <div className="flex flex-col gap-2.5">
                <span className="text-slate-300 font-semibold mb-1">Conexión</span>
                <a
                  href="https://wa.me/5493412852228?text=Hola%20AI%20Quantum%20Studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  <span>WHATSAPP</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
                <a
                  href="https://instagram.com/vilmar.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  <span>INSTAGRAM</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
                <button
                  onClick={() => {
                    onNavigate('contacto');
                    scrollToTop();
                  }}
                  className="text-left text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  CONTACTO
                </button>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-[10px] sm:text-[11px] text-slate-400 font-mono text-center sm:text-left">
            <div>
              © 2026 AI Quantum Studio
            </div>
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2 sm:gap-4 text-center sm:text-right">
              <span>Vilmar Olivera · AI Quantum Studio · Fundadora</span>
              <span className="hidden sm:inline">·</span>
              <button
                onClick={() => setIsAdminOpen(true)}
                className="text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer flex items-center gap-1"
                title="Administración de Órdenes y Activación de Licencias"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Panel de Órdenes</span>
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal de Administración de Compras & Activación Manual */}
      <AdminPurchasesModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
    </>
  );
};
