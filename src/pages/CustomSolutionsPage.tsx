import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles, Send } from 'lucide-react';

interface CustomSolutionsPageProps {
  onBack: () => void;
  onOpenSolutionModal: (topic?: string) => void;
}

export const CustomSolutionsPage: React.FC<CustomSolutionsPageProps> = ({
  onBack,
  onOpenSolutionModal,
}) => {
  const [problemText, setProblemText] = useState('');
  const [sector, setSector] = useState('Gastronomía y Retail');
  const [urgency, setUrgency] = useState('En las próximas 2 semanas');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const encoded = encodeURIComponent(
      `Hola AI Quantum Studio! Quiero consultar por una Solución Personalizada:\n\n*Rubro:* ${sector}\n*Urgencia:* ${urgency}\n*Problema:* ${problemText}`
    );
    window.open(`https://wa.me/5493412852228?text=${encoded}`, '_blank');
    setSent(true);
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#05070b]">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 hover:text-cyan-400 transition-colors mb-8 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Inicio</span>
        </button>

        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-cyan-400 font-semibold">
            Laboratorio de Proyectos
          </span>
          <h1 className="mt-2 font-display text-4xl sm:text-6xl font-black text-white uppercase tracking-tight">
            SOLUCIONES PERSONALIZADAS
          </h1>
          <div className="mt-3 text-xl font-bold uppercase tracking-wider text-slate-300">
            ¿TENÉS UNA IDEA? QUIZÁS LA HERRAMIENTA QUE NECESITÁS TODAVÍA NO EXISTE.
          </div>
          <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
            No todas las empresas caben en un software estándar de caja. Si tenés una dinámica operativa única o querés crear una ventaja competitiva diferencial, desarrollamos tu solución a medida.
          </p>
        </div>

        {/* Methodology steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 rounded-xl glass-panel border border-white/10">
            <span className="font-mono text-cyan-400 text-xs">FASE 01</span>
            <h4 className="font-display text-lg font-bold text-white mt-2">Diagnóstico Cuántico</h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Analizamos tu cuello de botella real en una sesión de 30 minutos sin costo.
            </p>
          </div>
          <div className="p-6 rounded-xl glass-panel border border-white/10">
            <span className="font-mono text-blue-400 text-xs">FASE 02</span>
            <h4 className="font-display text-lg font-bold text-white mt-2">Prototipo Funcional</h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              En menos de 7 días tenés un prototipo visual e interactivo funcionando en tus manos.
            </p>
          </div>
          <div className="p-6 rounded-xl glass-panel border border-white/10">
            <span className="font-mono text-emerald-400 text-xs">FASE 03</span>
            <h4 className="font-display text-lg font-bold text-white mt-2">Despliegue & Escalado</h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Puesta en producción inmediata con capacitación directa para tu equipo.
            </p>
          </div>
        </div>

        {/* Form Container */}
        <div className="rounded-2xl glass-panel border border-cyan-500/30 p-8 sm:p-12 shadow-2xl shadow-cyan-950/40">
          {!sent ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2">
                  Rubro de tu actividad o proyecto
                </label>
                <select
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="Gastronomía y Bares">Gastronomía, Bares y Cafeterías</option>
                  <option value="Comercio y Distribución">Comercio Mayorista / Minorista / Distribución</option>
                  <option value="Salud y Estética">Salud, Clínicas, Odontología y Estética</option>
                  <option value="Servicios Profesionales">Estudios Contables, Legales y Consultoría</option>
                  <option value="Inmobiliario y Construcción">Inmobiliarias y Constructoras</option>
                  <option value="Otro">Otro rubro</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2">
                  ¿Qué problema querés resolver o qué herramienta imaginás?
                </label>
                <textarea
                  rows={5}
                  required
                  value={problemText}
                  onChange={(e) => setProblemText(e.target.value)}
                  placeholder="Detallá los pasos actuales de tu proceso y qué parte te gustaría resolver..."
                  className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2">
                  Plazo deseado para tener la solución funcionando
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {['Urgente (< 7 días)', 'En 2 a 3 semanas', 'Planificación próximo mes'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setUrgency(opt)}
                      className={`p-3 rounded-lg text-xs font-mono tracking-wider border transition-all text-left cursor-pointer ${
                        urgency === opt
                          ? 'bg-cyan-400 text-black font-bold border-cyan-400'
                          : 'bg-white/5 text-slate-300 border-white/10 hover:border-white/20'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs font-mono text-slate-400">
                  Sin compromiso. Recibís propuesta técnica personalizada.
                </span>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-4 bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold text-xs uppercase tracking-widest rounded transition-all cursor-pointer shadow-lg shadow-cyan-400/20 active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <span>CONTAR MI IDEA A VILMAR</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          ) : (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center mx-auto text-cyan-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-display text-2xl font-bold text-white">
                ¡Propuesta en marcha!
              </h3>
              <p className="text-slate-300 text-sm max-w-md mx-auto">
                Estamos coordinando la respuesta técnica para tu caso. Vilmar Olivera y el equipo de ingeniería revisarán los detalles en breve.
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-4 text-xs font-mono text-cyan-400 hover:text-cyan-300 uppercase tracking-wider underline cursor-pointer"
              >
                Enviar otra consulta
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
