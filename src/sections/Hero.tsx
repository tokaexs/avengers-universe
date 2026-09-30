import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AvengersScene from '../three/AvengersScene';
import CinematicVideo from '../components/CinematicVideo';
import Button from '../components/Button';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onPlayHover?: () => void;
  onPlayClick?: () => void;
  onAssembleTrigger?: () => void;
  powerLevel?: number;
}

export default function Hero({
  onPlayHover,
  onPlayClick,
  onAssembleTrigger,
  powerLevel = 1,
}: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonWrapperRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  // Scroll progress ref passed directly into Three.js CameraRig & ArcReactor without React state re-renders
  const scrollRef = useRef<number>(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: 1.0,
          onUpdate: (self) => {
            scrollRef.current = self.progress;
          },
        },
      });

      // 0% -> 30%: Eyebrow, subtitle and button dissolve first as camera pushes inward
      tl.to(
        [eyebrowRef.current, subtitleRef.current, buttonWrapperRef.current, scrollIndicatorRef.current],
        {
          opacity: 0,
          y: -30,
          filter: 'blur(8px)',
          ease: 'power2.inOut',
          duration: 0.35,
          stagger: 0.05,
        },
        0.02
      );

      // 25% -> 60%: Monumental "AVENGERS" typography tracks outward, blurs, and vanishes into negative space
      tl.to(
        titleRef.current,
        {
          opacity: 0,
          scale: 0.85,
          letterSpacing: '0.24em',
          filter: 'blur(16px)',
          y: -50,
          ease: 'power2.inOut',
          duration: 0.5,
        },
        0.25
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleEnterInitiative = () => {
    if (onPlayClick) onPlayClick();
    if (onAssembleTrigger) onAssembleTrigger();

    const nextSection = document.getElementById('transition');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={containerRef} id="hero" className="cinematic-hero-section">
      {/* Real HTML5 Cinematic Video & Atmospheric Backdrop */}
      <CinematicVideo />

      {/* Real 3D React Three Fiber WebGL Layer (Arc Reactor + Energy Core + Particles) */}
      <div className="hero-webgl-layer">
        <AvengersScene scrollRef={scrollRef} powerLevel={powerLevel} />
      </div>

      {/* Monumental Hero Cinematic Typography */}
      <div ref={heroContentRef} className="hero-foreground-content">
        
        {/* Minimal Letterspaced Eyebrow */}
        <p ref={eyebrowRef} className="hero-eyebrow">
          <span className="eyebrow-pip" />
          THE AVENGERS INITIATIVE
        </p>

        {/* Monumental Metallic Specular AVENGERS Heading */}
        <h1 ref={titleRef} className="hero-monumental-title">
          AVENGERS
        </h1>

        {/* Subtitle */}
        <p ref={subtitleRef} className="hero-subtitle">
          EARTH'S MIGHTIEST HEROES
        </p>

        {/* Understated Luxury Call to Action */}
        <div ref={buttonWrapperRef} className="hero-actions-box">
          <Button
            variant="primary"
            size="lg"
            onClick={handleEnterInitiative}
            onHoverSound={onPlayHover}
            className="hero-enter-btn"
          >
            ENTER THE INITIATIVE
          </Button>
        </div>

        {/* Minimalist Scroll Cue */}
        <div
          ref={scrollIndicatorRef}
          className="hero-scroll-cue"
          onClick={handleEnterInitiative}
          onMouseEnter={onPlayHover}
          role="button"
          tabIndex={0}
        >
          <span className="scroll-line" />
          <span className="scroll-caption">SCROLL TO ENGAGE CORE</span>
        </div>

      </div>

      {/* Cinematic Deep Shading Gradients */}
      <div className="hero-bottom-vignette" />
    </section>
  );
}
