import React, { useState } from 'react';
import { X, Send, CheckCircle2, ArrowRight } from 'lucide-react';

interface SolutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopic?: string;
}

export const SolutionModal: React.FC<SolutionModalProps> = ({
  isOpen,
  onClose,
  initialTopic = '',
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [projectType, setProjectType] = useState<'Mini App' | 'Dashboard' | 'Automatización' | 'Solución Personalizada'>('Mini App');
  const [description, setDescription] = useState(initialTopic ? `Interés en: ${initialTopic}` : '');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const encodedMessage = encodeURIComponent(
      `Hola AI Quantum Studio! Quiero crear una solución:\n\n*Nombre:* ${name || 'Sin especificar'}\n*Tipo:* ${projectType}\n*Detalle:* ${description}\n*Contacto:* ${contact}`
    );
    window.open(`https://wa.me/5493412852228?text=${encodedMessage}`, '_blank');
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-[#090e17] border border-cyan-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-cyan-950/60 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div>
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-cyan-400 font-semibold mb-1">
              AI Quantum Studio
            </div>
            <h3 className="font-display text-2xl font-bold text-white">
              CREAR UNA SOLUCIÓN
            </h3>
            <p className="mt-1 text-xs text-slate-400 leading-relaxed">
              Contanos sobre tu necesidad. Te respondemos con un diagnóstico preliminar y propuesta de alcance.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1">
                  Tu Nombre o Empresa
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Martín Rossi (Restó Palermo)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1">
                  Tipo de Solución
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['Mini App', 'Dashboard', 'Automatización', 'Solución Personalizada'] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setProjectType(type)}
                      className={`py-2 px-3 rounded text-xs font-mono tracking-wider transition-all border text-left cursor-pointer ${
                        projectType === type
                          ? 'bg-cyan-400 text-black font-bold border-cyan-400'
                          : 'bg-white/5 text-slate-300 border-white/10 hover:border-white/20'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1">
                  Descripción del Problema o Idea
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="¿Qué proceso querés resolver o qué herramienta imaginás?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1">
                  WhatsApp o Email de contacto
                </label>
                <input
                  type="text"
                  required
                  placeholder="+54 9 11 ... o email@dominio.com"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3.5 bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold text-xs uppercase tracking-widest rounded-lg transition-all cursor-pointer shadow-lg shadow-cyan-400/20 active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <span>ENVIAR CONSULTA POR WHATSAPP</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center mx-auto text-cyan-400">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="font-display text-2xl font-bold text-white">
              ¡Consulta Iniciada!
            </h4>
            <p className="text-slate-300 text-sm max-w-sm mx-auto">
              Se abrió WhatsApp para que conversemos directamente sobre tu proyecto con Vilmar y el equipo.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2 bg-white/10 text-white rounded text-xs font-mono uppercase hover:bg-white/20 transition-colors cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
