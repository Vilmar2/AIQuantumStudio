import React, { useState } from 'react';
import { ArrowLeft, ArrowUpRight, Mail, MessageSquare, MapPin, Send, CheckCircle2 } from 'lucide-react';

interface ContactPageProps {
  onBack: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    interest: 'Mini App',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const encoded = encodeURIComponent(
      `Hola AI Quantum Studio! Te escribo desde la web:\n\n*Nombre:* ${formData.name}\n*Interés:* ${formData.interest}\n*Tel:* ${formData.phone}\n*Email:* ${formData.email}\n*Mensaje:* ${formData.message}`
    );
    window.open(`https://wa.me/5493412852228?text=${encoded}`, '_blank');
    setSubmitted(true);
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
            Canales Oficiales
          </span>
          <h1 className="mt-2 font-display text-4xl sm:text-6xl font-black text-white uppercase tracking-tight">
            CONTACTO DIRECTO
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Sin intermediarios ni demoras. Hablá directamente con el equipo de diseño e ingeniería de AI Quantum Studio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Contact Details (Col 5) */}
          <div className="md:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">
                Canal Prioritario
              </span>
              <h3 className="font-display text-xl font-bold text-white">
                WhatsApp Studio
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                El canal más rápido para diagnósticos, presupuestos ágiles y consultas de programas.
              </p>
              <div className="font-mono text-sm text-cyan-400 font-bold">
                +54 9 341 285-2228
              </div>
              <a
                href="https://wa.me/5493412852228?text=Hola%20AI%20Quantum%20Studio"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 px-4 py-2.5 rounded transition-all"
              >
                <span>HABLAR POR WHATSAPP</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-3 text-sm">
              <div className="flex items-center gap-3 text-slate-300">
                <Mail className="w-4 h-4 text-cyan-400" />
                <span className="font-mono text-xs">contacto@aiquantumstudio.com</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <MessageSquare className="w-4 h-4 text-cyan-400" />
                <a
                  href="https://instagram.com/vilmar.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-slate-300 hover:text-cyan-400 transition-colors"
                >
                  Instagram: @vilmar.ai
                </a>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span className="text-xs">Argentina (Atención Global)</span>
              </div>
            </div>
          </div>

          {/* Form (Col 7) */}
          <div className="md:col-span-7 rounded-2xl glass-panel border border-cyan-500/30 p-8 shadow-2xl">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-display text-2xl font-bold text-white mb-2">
                  Envianos tu mensaje
                </h3>

                <div>
                  <label className="text-xs font-mono text-slate-400 uppercase block mb-1">Nombre</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-slate-400 uppercase block mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-slate-400 uppercase block mb-1">Teléfono / WhatsApp</label>
                    <input
                      type="text"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-400 uppercase block mb-1">Área de interés</label>
                  <select
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Mini App">Mini App para negocio</option>
                    <option value="Dashboard">Dashboard Ejecutivo de Datos</option>
                    <option value="Automatización">Automatización de Procesos</option>
                    <option value="AI Quantum Academy">AI Quantum Academy (Formación)</option>
                    <option value="Solución Personalizada">Solución Digital Personalizada</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-400 uppercase block mb-1">Mensaje o Detalle</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold text-xs uppercase tracking-widest rounded-lg transition-all cursor-pointer shadow-lg shadow-cyan-400/20 active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <span>ENVIAR MENSAJE DIRECTO</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            ) : (
              <div className="py-12 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-cyan-400 mx-auto" />
                <h4 className="font-display text-2xl font-bold text-white">¡Mensaje Enviado!</h4>
                <p className="text-slate-300 text-sm max-w-sm mx-auto">
                  Nos contactaremos con vos a la brevedad. También podés escribirnos directo por WhatsApp.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-xs font-mono text-cyan-400 underline cursor-pointer"
                >
                  Enviar otro mensaje
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
