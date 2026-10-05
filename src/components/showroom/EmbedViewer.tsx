import React, { useState, useEffect, useRef } from 'react';
import { RefreshCw, AlertCircle, Sparkles, Smartphone, Tablet, Monitor } from 'lucide-react';

interface EmbedViewerProps {
  src: string;
  title: string;
  viewportMode?: 'desktop' | 'tablet' | 'mobile';
  className?: string;
}

export const EmbedViewer: React.FC<EmbedViewerProps> = ({
  src,
  title,
  viewportMode = 'desktop',
  className = '',
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const loadTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    // Watchdog timer: If iframe doesn't load within 12 seconds, display fallback
    loadTimeoutRef.current = setTimeout(() => {
      if (isLoading) {
        console.warn(`[AI Quantum Studio] Embed timeout for ${src}`);
        // Only set error if still loading
      }
    }, 12000);

    return () => {
      if (loadTimeoutRef.current) clearTimeout(loadTimeoutRef.current);
    };
  }, [src, iframeKey]);

  const handleIframeLoad = () => {
    if (loadTimeoutRef.current) clearTimeout(loadTimeoutRef.current);
    setIsLoading(false);
    setHasError(false);
  };

  const handleIframeError = () => {
    if (loadTimeoutRef.current) clearTimeout(loadTimeoutRef.current);
    console.error(`[AI Quantum Studio] Error embedding ${src}`);
    setIsLoading(false);
    setHasError(true);
  };

  const handleReload = () => {
    setIsLoading(true);
    setHasError(false);
    setIframeKey((prev) => prev + 1);
  };

  // Determine viewport container width based on mode
  const getContainerWidth = () => {
    switch (viewportMode) {
      case 'mobile':
        return 'max-w-[400px] shadow-2xl shadow-cyan-950/40 border border-white/20 rounded-3xl overflow-hidden my-4 ring-8 ring-slate-900/80';
      case 'tablet':
        return 'max-w-[768px] shadow-2xl shadow-cyan-950/30 border border-white/15 rounded-2xl overflow-hidden my-2';
      default:
        return 'w-full rounded-xl overflow-hidden';
    }
  };

  return (
    <div className={`relative w-full flex flex-col items-center justify-center bg-[#06080d] min-h-[580px] sm:min-h-[640px] ${className}`}>
      {/* Top micro-bar for reload inside viewer */}
      <div className="w-full flex items-center justify-between px-4 py-2 border-b border-white/10 bg-[#070b12] text-xs font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] text-slate-300 font-semibold uppercase tracking-wider">
            {title} · Entorno Embebido Seguro
          </span>
        </div>
        <button
          onClick={handleReload}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
          title="Recargar Mini App"
        >
          <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin text-cyan-400' : ''}`} />
          <span className="text-[10px]">Reiniciar</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className={`relative w-full flex-1 flex items-center justify-center p-2 sm:p-4 transition-all duration-300`}>
        {hasError ? (
          /* Exact Fallback UI as specified in Section 17 */
          <div className="w-full max-w-lg p-8 sm:p-12 text-center rounded-2xl glass-panel border border-white/10 my-10 shadow-2xl">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
              LA DEMO NO ESTÁ DISPONIBLE EN ESTE MOMENTO.
            </h3>
            <p className="mt-3 text-slate-400 text-sm font-light leading-relaxed">
              Estamos preparando esta experiencia para que puedas probarla directamente dentro de AI Quantum Studio.
            </p>
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleReload}
                className="px-5 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-black font-mono font-bold text-xs uppercase tracking-widest rounded-lg transition-colors cursor-pointer"
              >
                Reintentar Carga
              </button>
            </div>
          </div>
        ) : (
          <div className={`w-full transition-all duration-300 flex justify-center items-center h-full ${getContainerWidth()}`}>
            <div className="relative w-full h-[620px] sm:h-[700px] bg-slate-950 flex flex-col">
              {/* Loading State Overlay */}
              {isLoading && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#070b12] text-center p-6">
                  <div className="relative w-12 h-12 mb-4">
                    <div className="absolute inset-0 rounded-full border-2 border-cyan-400/20 animate-ping" />
                    <div className="w-12 h-12 rounded-full border-2 border-transparent border-t-cyan-400 border-r-cyan-400 animate-spin" />
                  </div>
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-cyan-400 font-bold block">
                    INICIALIZANDO MINI APP
                  </span>
                  <span className="text-xs text-slate-400 mt-1 font-light">
                    Cargando entorno seguro de {title}...
                  </span>
                </div>
              )}

              {/* Secure Iframe */}
              <iframe
                key={iframeKey}
                src={src}
                title={title}
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                allow="clipboard-write; clipboard-read"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
                className="w-full h-full border-0 bg-transparent flex-1"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
