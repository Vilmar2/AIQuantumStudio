import React, { useEffect, useState } from 'react';

export const QuantumCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if device supports touch
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      // Check if cursor is over interactive elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('button, a, input, textarea, select, [role="button"], .cursor-pointer');
        setIsHovered(!!interactive);
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);

    // Trailing smooth animation loop
    let animId: number;
    const updateTrail = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.16,
        y: prev.y + (pos.y - prev.y) * 0.16,
      }));
      animId = requestAnimationFrame(updateTrail);
    };
    animId = requestAnimationFrame(updateTrail);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, [pos.x, pos.y]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {/* Outer Quantum Halo */}
      <div
        className={`fixed top-0 left-0 rounded-full border border-cyan-400/40 backdrop-blur-[1px] transition-transform duration-200 ease-out will-change-transform ${
          isHovered
            ? 'w-12 h-12 -ml-6 -mt-6 bg-cyan-400/10 border-cyan-400 shadow-[0_0_20px_rgba(0,229,255,0.4)]'
            : isClicking
            ? 'w-7 h-7 -ml-3.5 -mt-3.5 bg-cyan-500/20 border-cyan-300'
            : 'w-8 h-8 -ml-4 -mt-4 bg-transparent'
        }`}
        style={{
          transform: `translate3d(${trailingPos.x}px, ${trailingPos.y}px, 0)`,
        }}
      />

      {/* Center Quantum Spark Node */}
      <div
        className={`fixed top-0 left-0 rounded-full will-change-transform transition-all duration-100 ${
          isHovered
            ? 'w-2 h-2 -ml-1 -mt-1 bg-cyan-300 shadow-[0_0_12px_#00e5ff]'
            : 'w-1.5 h-1.5 -ml-[3px] -mt-[3px] bg-cyan-400'
        }`}
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        }}
      />
    </div>
  );
};
