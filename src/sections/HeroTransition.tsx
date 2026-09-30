import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeroTransitionProps {
  onPlayHover?: () => void;
  onPlayClick?: () => void;
}

export default function HeroTransition({
  onPlayHover,
  onPlayClick,
}: HeroTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const emblemWrapperRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const authorRef = useRef<HTMLDivElement>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth - 0.5) * 16;
    const y = (e.clientY / innerHeight - 0.5) * 16;
    setMouseOffset({ x, y });
  };

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
        },
      });

      // Initial states
      gsap.set(emblemWrapperRef.current, {
        opacity: 0,
        scale: 0.95,
        filter: 'blur(8px)',
      });
      gsap.set(glowRef.current, {
        opacity: 0,
        scale: 0.85,
      });
      gsap.set([hudRef.current, tagRef.current, titleRef.current, subtitleRef.current, quoteRef.current, authorRef.current], {
        opacity: 0,
        y: 30,
        filter: 'blur(10px)',
      });

      // Step 1: Emblem slowly becomes visible with subtle scale 0.95 -> 1.02
      tl.to(
        emblemWrapperRef.current,
        {
          opacity: 1,
          scale: 1.01,
          filter: 'blur(0px)',
          duration: 1.4,
          ease: 'power2.out',
        },
        0.05
      );

      // Step 2: Green light behind emblem gradually intensifies
      tl.to(
        glowRef.current,
        {
          opacity: 0.75,
          scale: 1.08,
          duration: 1.2,
          ease: 'power2.out',
        },
        0.2
      );

      // Step 3: HUD elements appear around the emblem
      tl.to(
        hudRef.current,
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.8,
          ease: 'power2.out',
        },
        0.4
      );

      // Step 4: Small text: AVENGERS INITIATIVE
      tl.to(
        tagRef.current,
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.8,
          ease: 'power2.out',
        },
        0.55
      );

      tl.to(
        titleRef.current,
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.0,
          ease: 'power3.out',
        },
        0.7
      );

      // Step 5: Then: EARTH'S MIGHTIEST HEROES
      tl.to(
        subtitleRef.current,
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.8,
          ease: 'power2.out',
        },
        0.9
      );

      // Step 6: Fury Manifesto Quote
      tl.to(
        [quoteRef.current, authorRef.current],
        {
          opacity: 0.85,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.0,
          stagger: 0.15,
          ease: 'power2.out',
        },
        1.1
      );

      // Step 7: Emblem slowly fades / recedes into the background
      tl.to(
        emblemWrapperRef.current,
        {
          scale: 1.06,
          opacity: 0.25,
          duration: 1.2,
          ease: 'power1.inOut',
        },
        1.4
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="transition"
      className="hero-transition-section"
      aria-label="The Avengers Initiative Transition"
      onMouseMove={handleMouseMove}
      onMouseEnter={onPlayHover}
      onClick={onPlayClick}
    >
      {/* Cinematic Ambient Dark Void */}
      <div className="transition-ambient-void" />

      {/* Floating Dust / Foreground Particle Field */}
      <div className="transition-dust-field" aria-hidden="true">
        <span className="dust-particle dp-1" />
        <span className="dust-particle dp-2" />
        <span className="dust-particle dp-3" />
        <span className="dust-particle dp-4" />
        <span className="dust-particle dp-5" />
        <span className="dust-particle dp-6" />
      </div>

      {/* Green Atmospheric Illumination Glow */}
      <div
        ref={glowRef}
        className="emblem-green-aura"
        style={{
          transform: `translate3d(${mouseOffset.x * 0.4}px, ${mouseOffset.y * 0.4}px, 0)`,
        }}
      />

      {/* Uploaded Physical Emblem Visual Asset */}
      <div
        ref={emblemWrapperRef}
        className="cinematic-emblem-container"
        style={{
          transform: `translate3d(${mouseOffset.x * -0.6}px, ${mouseOffset.y * -0.6}px, 0)`,
        }}
      >
        <img
          src="/assets/avengers-emblem.png"
          alt="Classified Avengers Insignia"
          className="cinematic-emblem-img"
          loading="eager"
        />

        {/* HUD Frame Brackets */}
        <div ref={hudRef} className="emblem-hud-brackets">
          <span className="hud-corner-bracket tl" />
          <span className="hud-corner-bracket tr" />
          <span className="hud-corner-bracket bl" />
          <span className="hud-corner-bracket br" />
          <div className="hud-reticle-code">
            <span>ARCHIVE // DIRECTIVE 07-A</span>
            <span>CLEARANCE: LEVEL 10</span>
          </div>
        </div>
      </div>

      {/* Foreground Cinematic Typography & Manifesto */}
      <div className="transition-center-container">
        
        {/* Step 4: Small Text: AVENGERS INITIATIVE */}
        <div ref={tagRef} className="transition-tag">
          <span className="bracket">[</span> S.H.I.E.L.D. BIOMETRIC OVERWATCH <span className="bracket">]</span>
        </div>

        <h2 ref={titleRef} className="transition-title">
          AVENGERS INITIATIVE
        </h2>

        {/* Step 5: EARTH'S MIGHTIEST HEROES */}
        <div ref={subtitleRef} className="transition-subtitle">
          EARTH'S MIGHTIEST HEROES
        </div>

        <div className="transition-hairline" />

        {/* Iconic Fury Manifesto */}
        <blockquote ref={quoteRef} className="transition-quote">
          "There was an idea, to bring together a group of remarkable people, to see if they could become something more. To see if they could work together when we needed them to, to fight the battles that we never could."
        </blockquote>

        <div ref={authorRef} className="transition-author">
          — DIRECTOR NICHOLAS J. FURY // STRATEGIC HOMELAND DIVISION
        </div>

      </div>

      {/* Subtle Vignette & Film Grain */}
      <div className="transition-vignette-layer" />
    </section>
  );
}
