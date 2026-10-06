import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { NavigationTab } from '../../types';

interface HeaderProps {
  currentTab: NavigationTab;
  onNavigate: (tab: NavigationTab) => void;
  onOpenSolutionModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onNavigate,
  onOpenSolutionModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; tab: NavigationTab }[] = [
    { label: 'MINI APPS', tab: 'mini-apps' },
    { label: 'DASHBOARDS', tab: 'dashboards' },
    { label: 'SOLUCIONES', tab: 'soluciones' },
    { label: 'ACADEMY', tab: 'academy' },
    { label: 'NOSOTROS', tab: 'nosotros' },
  ];

  const handleLinkClick = (tab: NavigationTab) => {
    onNavigate(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#05070b]/85 backdrop-blur-md border-b border-white/5 py-3 sm:py-4'
            : 'bg-transparent border-b border-transparent py-4 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          {/* Logo / Brand */}
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-2.5 sm:gap-3 text-left focus:outline-none group cursor-pointer max-w-[calc(100%-48px)] sm:max-w-none"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-sm bg-cyan-400 flex items-center justify-center font-display font-black text-black text-base sm:text-lg tracking-tighter group-hover:bg-cyan-300 transition-colors shrink-0">
              Q
            </div>
            <div className="min-w-0">
              <span className="font-display font-black tracking-wider text-white text-xs sm:text-base uppercase flex items-center gap-1.5 truncate">
                AI QUANTUM STUDIO
              </span>
              <span className="block text-[8px] sm:text-[9px] font-mono text-cyan-400 tracking-[0.15em] sm:tracking-[0.2em] uppercase truncate">
                DIGITAL CRAFT & MINI APPS
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = currentTab === link.tab;
              return (
                <button
                  key={link.tab}
                  onClick={() => handleLinkClick(link.tab)}
                  className={`relative text-xs font-mono tracking-widest uppercase transition-colors py-1 cursor-pointer ${
                    isActive
                      ? 'text-cyan-400 font-bold'
                      : 'text-slate-400 hover:text-white font-normal'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-cyan-400" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Primary Action Button: CREAR ALGO → */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenSolutionModal}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 px-4 py-2 rounded-sm transition-all duration-200 active:scale-[0.98] shadow-sm hover:shadow-cyan-400/25 whitespace-nowrap cursor-pointer"
            >
              <span>CREAR ALGO</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-white focus:outline-none cursor-pointer"
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#05070b]/98 backdrop-blur-2xl md:hidden pt-24 px-6 flex flex-col justify-between pb-10 animate-in fade-in duration-200">
          <div className="flex flex-col gap-6">
            <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 pb-2 border-b border-white/10">
              Navegación
            </div>
            {navLinks.map((link) => (
              <button
                key={link.tab}
                onClick={() => handleLinkClick(link.tab)}
                className="text-left font-display text-2xl font-bold tracking-tight text-white hover:text-cyan-400 transition-colors py-1 cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSolutionModal();
              }}
              className="w-full text-center py-3.5 px-4 bg-cyan-400 text-black font-bold uppercase tracking-wider text-xs rounded-sm active:scale-[0.98] transition-transform cursor-pointer"
            >
              CREAR ALGO →
            </button>
            <p className="text-[11px] text-slate-500 text-center font-mono">
              Convertimos ideas en experiencias digitales.
            </p>
          </div>
        </div>
      )}
    </>
  );
};
