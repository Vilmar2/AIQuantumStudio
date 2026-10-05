import React, { useState } from 'react';
import { ArrowUpRight, MessageCircle } from 'lucide-react';

export const FloatingWhatsAppButton: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  const phoneNumber = '5493412852228';
  const defaultMessage = encodeURIComponent(
    'Hola AI Quantum Studio! Quiero conversar sobre un proyecto digital para mi negocio.'
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#090e17]/90 hover:bg-[#0c1424] border border-cyan-400/40 hover:border-cyan-400 text-white backdrop-blur-md shadow-2xl shadow-cyan-950/60 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        aria-label="Hablar por WhatsApp con AI Quantum Studio"
      >
        {/* Subtle pulsing beacon */}
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
        </span>

        {/* Dynamic text: HABLEMOS → vs WHATSAPP */}
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-200 group-hover:text-cyan-300 transition-colors">
          {isHovered ? 'WHATSAPP' : 'HABLEMOS →'}
        </span>

        <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </a>
    </div>
  );
};
