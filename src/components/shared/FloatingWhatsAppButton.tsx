import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface FloatingWhatsAppButtonProps {
  currentTab?: string;
}

export const FloatingWhatsAppButton: React.FC<FloatingWhatsAppButtonProps> = ({ currentTab }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPageJumping, setIsPageJumping] = useState(false);

  const phoneNumber = '5493412852228';
  const defaultMessage = encodeURIComponent(
    'Hola AI Quantum Studio! Quiero conversar sobre un proyecto digital para mi negocio.'
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  // Se activa una animación llamativa cada vez que el usuario cambia de página o sección
  useEffect(() => {
    setIsPageJumping(true);
    const timer = setTimeout(() => {
      setIsPageJumping(false);
    }, 950);

    return () => clearTimeout(timer);
  }, [currentTab]);

  return (
    <div 
      className={`fixed bottom-20 sm:bottom-26 right-4 sm:right-7 z-50 pointer-events-auto select-none transition-all duration-300 ${
        isPageJumping ? 'animate-page-jump' : 'animate-float-slow'
      }`}
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex items-center gap-2.5 px-4.5 py-3 rounded-full bg-[#090e17]/95 hover:bg-[#0c1424] border-2 border-cyan-400/60 hover:border-cyan-400 text-white backdrop-blur-xl shadow-[0_0_30px_rgba(0,229,255,0.25)] hover:shadow-[0_0_40px_rgba(0,229,255,0.5)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        aria-label="Hablar por WhatsApp con AI Quantum Studio"
      >
        {/* Glow halo on page jump */}
        {isPageJumping && (
          <span className="absolute -inset-1 rounded-full bg-cyan-400/30 blur-md animate-ping" />
        )}

        {/* Subtle pulsing beacon */}
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-80" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400 shadow-[0_0_10px_#00e5ff]" />
        </span>

        {/* Dynamic text: HABLEMOS → vs WHATSAPP */}
        <span className="font-mono text-xs font-black uppercase tracking-wider text-slate-100 group-hover:text-cyan-300 transition-colors">
          {isHovered ? 'WHATSAPP' : 'HABLEMOS →'}
        </span>

        <ArrowUpRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </a>
    </div>
  );
};
