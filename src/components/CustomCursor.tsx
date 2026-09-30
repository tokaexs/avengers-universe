import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch device
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Check if hovering interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest('button, a, input, [role="button"], .interactive, .rail-dot, .rail-node, .threat-rail-dot, .pagination-dot')
        );
        setIsHovered(isInteractive);
      }
    };

    const render = () => {
      // Smooth lerping for the trailing aura ring
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      animId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <div className="custom-cursor-container" aria-hidden="true">
      {/* Precision Center Point */}
      <div
        ref={cursorRef}
        className={`cursor-dot ${isHovered ? 'cursor-dot-hovered' : ''}`}
      />
      {/* Trailing Aura Ring */}
      <div
        ref={ringRef}
        className={`cursor-ring ${isHovered ? 'cursor-ring-hovered' : ''}`}
      />
    </div>
  );
}
