import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AvengersScene from '../three/AvengersScene';
import Button from '../components/Button';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onPlayHover?: () => void;
  onPlayClick?: () => void;
  onAssembleTrigger?: () => void;
  powerLevel?: number;
}

export default function HeroSection({
  onPlayHover,
  onPlayClick,
  onAssembleTrigger,
  powerLevel = 1,
}: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonWrapperRef = useRef<HTMLDivElement>(null);
  const protocolAlertRef = useRef<HTMLDivElement>(null);
  const hudMeterRef = useRef<HTMLDivElement>(null);

  // Performance: Scroll progress ref passed directly into Three.js useFrame without React re-renders
  const scrollRef = useRef<number>(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=180%',
          pin: true,
          scrub: 1.0,
          onUpdate: (self) => {
            scrollRef.current = self.progress;
            if (hudMeterRef.current) {
              hudMeterRef.current.style.width = `${Math.min(100, self.progress * 130)}%`;
            }
          },
        },
      });

      // 0% -> 25%: Eyebrow, subtitle, assemble button fade first
      tl.to([eyebrowRef.current, subtitleRef.current, buttonWrapperRef.current], {
        opacity: 0,
        y: -25,
        ease: 'power2.inOut',
        duration: 0.28,
        stagger: 0.04,
      }, 0.02);

      // 20% -> 50%: Typography shrinks and dissolves as Reactor becomes dominant
      tl.to(titleRef.current, {
        opacity: 0,
        scale: 0.88,
        letterSpacing: '0.2em',
        filter: 'blur(12px)',
        y: -40,
        ease: 'power2.inOut',
        duration: 0.4,
      }, 0.15);

      // 45% -> 80%: Holographic Protocol HUD emerges smoothly
      if (protocolAlertRef.current) {
        tl.fromTo(
          protocolAlertRef.current,
          { opacity: 0, scale: 0.92, y: 35 },
          { opacity: 1, scale: 1, y: 0, ease: 'power2.out', duration: 0.3 },
          0.45
        );

        tl.to(
          protocolAlertRef.current,
          { opacity: 0, scale: 1.06, y: -30, filter: 'blur(6px)', ease: 'power2.in', duration: 0.25 },
          0.78
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleAssembleClick = () => {
    if (onPlayClick) onPlayClick();
    if (onAssembleTrigger) onAssembleTrigger();

    const initiativeEl = document.getElementById('initiative');
    if (initiativeEl) {
      initiativeEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={containerRef} id="hero" className="hero-viewport-section">
      
      {/* 3D WebGL Canvas Layer */}
      <div className="hero-canvas-layer">
        <AvengersScene
          scrollRef={scrollRef}
          powerLevel={powerLevel}
        />
      </div>

      {/* Main Hero Cinematic Content */}
      <div ref={heroContentRef} className="hero-content">
        
        {/* Refined Eyebrow */}
        <p ref={eyebrowRef} className="eyebrow">
          <span className="eyebrow-accent">●</span> THE AVENGERS INITIATIVE // DIRECTIVE 7-A
        </p>

        {/* Monumental Metallic AVENGERS Title */}
        <h1 ref={titleRef} className="hero-title">
          AVENGERS
        </h1>

        {/* Subtitle */}
        <p ref={subtitleRef} className="subtitle">
          EARTH'S MIGHTIEST HEROES
        </p>

        {/* Call to Action */}
        <div ref={buttonWrapperRef} className="hero-cta-wrapper">
          <Button
            variant="primary"
            onClick={handleAssembleClick}
            onHoverSound={onPlayHover}
            className="assemble-main-btn"
          >
            ASSEMBLE
          </Button>

          <div 
            className="scroll-indicator" 
            onClick={handleAssembleClick}
            onMouseEnter={onPlayHover}
            role="button"
            tabIndex={0}
            aria-label="Scroll to engage protocol"
          >
            <span className="scroll-arrow" />
            <span className="scroll-text">SCROLL TO ENGAGE PROTOCOL</span>
          </div>
        </div>

      </div>

      {/* Mid-Scroll Protocol HUD Projection */}
      <div ref={protocolAlertRef} className="protocol-hud-alert">
        <div className="hud-badge-code">CLEARANCE: LEVEL 10 // OVERSIGHT</div>
        <h2 className="protocol-title">INITIATIVE PROTOCOL ENGAGED</h2>
        <p className="protocol-desc">
          BIOMETRIC RECOGNITION CONFIRMED. DECRYPTING CLASSIFIED STARK & S.H.I.E.L.D. TACTICAL ARCHIVES.
        </p>
        <div className="hud-progress-meter">
          <div ref={hudMeterRef} className="hud-meter-bar" style={{ width: '0%' }} />
        </div>
      </div>

      {/* Subtle Volumetric Glow & Vignette */}
      <div className="hero-ambient-glow" />

    </section>
  );
}
