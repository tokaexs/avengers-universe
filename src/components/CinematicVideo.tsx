import { useRef, useEffect, useState } from 'react';

interface CinematicVideoProps {
  src?: string;
  poster?: string;
  className?: string;
}

export default function CinematicVideo({
  src,
  poster,
  className = '',
}: CinematicVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [videoError, setVideoError] = useState(false);

  // High-end cinematic procedural space atmosphere fallback when video is loading or absent
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    // Motes of atmospheric cosmic energy
    const motes = Array.from({ length: 45 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -0.2 - Math.random() * 0.4,
      size: Math.random() * 2 + 0.8,
      alpha: Math.random() * 0.4 + 0.1,
      maxAlpha: Math.random() * 0.5 + 0.2,
    }));

    let t = 0;
    const draw = () => {
      t += 0.008;
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, w, h);

      // Deep volumetric space gradient
      const bgGrad = ctx.createRadialGradient(
        w * 0.5,
        h * 0.45,
        w * 0.05,
        w * 0.5,
        h * 0.5,
        w * 0.75
      );
      bgGrad.addColorStop(0, 'rgba(0, 25, 45, 0.45)');
      bgGrad.addColorStop(0.5, 'rgba(5, 10, 18, 0.6)');
      bgGrad.addColorStop(1, '#000000');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // Energy light stream streaks
      const streamGrad = ctx.createLinearGradient(0, 0, w, h);
      streamGrad.addColorStop(0, 'rgba(0, 229, 255, 0.015)');
      streamGrad.addColorStop(0.5 + Math.sin(t * 0.5) * 0.1, 'rgba(0, 150, 255, 0.035)');
      streamGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = streamGrad;
      ctx.fillRect(0, 0, w, h);

      // Render motes
      for (const m of motes) {
        m.x += m.vx;
        m.y += m.vy;
        if (m.y < -10) {
          m.y = h + 10;
          m.x = Math.random() * w;
        }
        if (m.x < -10) m.x = w + 10;
        if (m.x > w + 10) m.x = -10;

        ctx.beginPath();
        ctx.arc(m.x, m.y, m.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 229, 255, ${m.alpha * (0.6 + Math.sin(t + m.x) * 0.4)})`;
        ctx.shadowColor = '#00e5ff';
        ctx.shadowBlur = 8;
        ctx.fill();
      }

      ctx.shadowBlur = 0;
      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className={`cinematic-video-wrapper ${className}`}>
      {/* Procedural Canvas Atmosphere */}
      <canvas ref={canvasRef} className="cinematic-video-canvas" />

      {/* Real HTML5 Video Layer */}
      {!videoError && (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          onError={() => setVideoError(true)}
          className="cinematic-video-element"
        />
      )}

      {/* Cinematic Vignette & Black Shading Overlays */}
      <div className="cinematic-video-shading" />
      <div className="cinematic-video-vignette" />
    </div>
  );
}
