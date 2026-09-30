import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '../components/Button';

gsap.registerPlugin(ScrollTrigger);

interface AssembleProps {
  onPlayHover?: () => void;
  onPlayClick?: () => void;
  onAssembleTrigger?: () => void;
}

export default function Assemble({
  onPlayHover,
  onPlayClick,
  onAssembleTrigger,
}: AssembleProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reactorGlowRef = useRef<HTMLDivElement>(null);
  const emblemRef = useRef<HTMLDivElement>(null);
  const titleSmallRef = useRef<HTMLDivElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const buttonWrapperRef = useRef<HTMLDivElement>(null);
  const lineAccentRef = useRef<HTMLDivElement>(null);

  // Converging particles canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle system: slowly converge toward center
    const particleCount = 85;
    const particles: {
      x: number;
      y: number;
      origRadius: number;
      angle: number;
      speed: number;
      size: number;
      alpha: number;
      baseAlpha: number;
    }[] = [];

    const centerX = width / 2;
    const centerY = height / 2;

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * (Math.max(width, height) * 0.75) + 80;
      particles.push({
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        origRadius: radius,
        angle,
        speed: 0.15 + Math.random() * 0.35,
        size: 0.75 + Math.random() * 1.75,
        alpha: Math.random() * 0.6 + 0.1,
        baseAlpha: Math.random() * 0.6 + 0.1,
      });
    }

    let convergenceFactor = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.angle += 0.0015 * p.speed;
        
        // Slowly shrink radius toward center based on convergenceFactor
        const currentRadius = p.origRadius * (1 - convergenceFactor * 0.85);
        p.x = cx + Math.cos(p.angle) * currentRadius;
        p.y = cy + Math.sin(p.angle) * currentRadius;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
        gradient.addColorStop(0, `rgba(0, 229, 255, ${p.alpha})`);
        gradient.addColorStop(1, 'rgba(0, 229, 255, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // GSAP ScrollTrigger for Trailer Climax Sequence
    const ctxGsap = gsap.context(() => {
      if (!sectionRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 1.2,
          onUpdate: (self) => {
            convergenceFactor = self.progress;
          },
        },
      });

      // Initial States
      gsap.set(reactorGlowRef.current, { opacity: 0, scale: 0.4 });
      gsap.set(emblemRef.current, { opacity: 0, scale: 0.7, filter: 'blur(20px)' });
      gsap.set(titleSmallRef.current, { opacity: 0, y: 20, letterSpacing: '0.8em' });
      gsap.set(titleMainRef.current, { opacity: 0, scale: 0.9, filter: 'blur(12px)', y: 30 });
      gsap.set(lineAccentRef.current, { scaleX: 0, opacity: 0 });
      gsap.set(buttonWrapperRef.current, { opacity: 0, y: 30, scale: 0.95 });

      // Step 1: Arc Reactor Energy Returns (Cyan core pulses)
      tl.to(
        reactorGlowRef.current,
        {
          opacity: 0.9,
          scale: 1,
          duration: 1.5,
          ease: 'power2.out',
        },
        0.1
      );

      // Step 2: Avengers Silhouette Appears
      tl.to(
        emblemRef.current,
        {
          opacity: 0.85,
          scale: 1,
          filter: 'blur(0px)',
          duration: 2.0,
          ease: 'power3.out',
        },
        0.4
      );

      // Step 3: Typography "THE AVENGERS" Fades in
      tl.to(
        titleSmallRef.current,
        {
          opacity: 1,
          y: 0,
          letterSpacing: '0.5em',
          duration: 1.4,
          ease: 'power2.out',
        },
        1.0
      );

      // Step 4: Monumental "ASSEMBLE" Slams In
      tl.to(
        titleMainRef.current,
        {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          y: 0,
          duration: 1.8,
          ease: 'power3.out',
        },
        1.4
      );

      // Step 5: Accent Line Expands
      tl.to(
        lineAccentRef.current,
        {
          scaleX: 1,
          opacity: 0.8,
          duration: 1.2,
          ease: 'power2.inOut',
        },
        1.9
      );

      // Step 6: Button Appears Last with Glow Aura
      tl.to(
        buttonWrapperRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: 'power3.out',
        },
        2.2
      );
    }, sectionRef);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      ctxGsap.revert();
    };
  }, []);

  const handleEnterInitiative = () => {
    if (onAssembleTrigger) onAssembleTrigger();
    if (onPlayClick) onPlayClick();
    
    // Smooth cinematic pan to the Hero section
    const heroEl = document.getElementById('hero');
    if (heroEl) {
      heroEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="assemble"
      className="assemble-climax-section"
      aria-label="The Avengers Assemble"
    >
      {/* Absolute Pitch Black Background with Converging Canvas */}
      <div className="assemble-blackout-bg" />
      <canvas ref={canvasRef} className="assemble-particles-canvas" />

      {/* Central Arc Reactor Energy Heartbeat */}
      <div ref={reactorGlowRef} className="assemble-reactor-core">
        <div className="reactor-pulse-inner" />
        <div className="reactor-ring-outer" />
      </div>

      {/* Avengers "A" Silhouette Insignia */}
      <div ref={emblemRef} className="assemble-emblem-wrapper" aria-hidden="true">
        <svg viewBox="0 0 100 100" className="assemble-emblem-svg">
          <circle cx="50" cy="50" r="46" className="emblem-circle" />
          <path
            d="M50 14L74 80H61L50 48L39 80H26L50 14Z"
            className="emblem-a"
          />
          <path
            d="M30 58H70"
            className="emblem-crossbar"
          />
          <path
            d="M62 48L78 58L62 68"
            className="emblem-arrow"
          />
        </svg>
      </div>

      {/* Cinematic Trailer Typography Content */}
      <div className="assemble-content-container">
        
        {/* Minimal Sub-Eyebrow */}
        <div ref={titleSmallRef} className="assemble-eyebrow">
          THE AVENGERS
        </div>

        {/* Monumental Climax Title */}
        <h2 ref={titleMainRef} className="assemble-title">
          ASSEMBLE
        </h2>

        {/* Razor Hairline Divider */}
        <div ref={lineAccentRef} className="assemble-hairline" />

        {/* Premium Large Button */}
        <div ref={buttonWrapperRef} className="assemble-btn-box">
          <Button
            variant="primary"
            size="lg"
            onClick={handleEnterInitiative}
            onHoverSound={onPlayHover}
            className="assemble-climax-btn"
          >
            ENTER THE INITIATIVE
          </Button>

          <div className="assemble-directive-tag">
            <span>DIRECTIVE 07-A</span>
            <span className="dot-sep">•</span>
            <span>CLEARANCE LEVEL 10</span>
          </div>
        </div>

      </div>

      {/* Vignette Edge Shading */}
      <div className="assemble-vignette-overlay" />
    </section>
  );
}
