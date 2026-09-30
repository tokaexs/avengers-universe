import { useRef, useEffect } from 'react';
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
  const tagRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const authorRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 1.0,
        },
      });

      // Initial state
      gsap.set([tagRef.current, titleRef.current, quoteRef.current, authorRef.current], {
        opacity: 0,
        y: 40,
        filter: 'blur(12px)',
      });
      gsap.set(lineRef.current, { scaleX: 0 });

      // Step 1: Tag emerges
      tl.to(
        tagRef.current,
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.8,
          ease: 'power2.out',
        },
        0.1
      );

      // Step 2: Monumental Title Reveals
      tl.to(
        titleRef.current,
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: 'power3.out',
        },
        0.3
      );

      // Step 3: Hairline draws across
      tl.to(
        lineRef.current,
        {
          scaleX: 1,
          duration: 1.0,
          ease: 'power2.inOut',
        },
        0.6
      );

      // Step 4: Iconic Fury Quote fades in
      tl.to(
        quoteRef.current,
        {
          opacity: 0.85,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: 'power2.out',
        },
        0.8
      );

      // Step 5: Author signature
      tl.to(
        authorRef.current,
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.8,
          ease: 'power2.out',
        },
        1.1
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
    >
      <div
        className="transition-center-container"
        onMouseEnter={onPlayHover}
        onClick={onPlayClick}
      >
        {/* Minimal Tag */}
        <div ref={tagRef} className="transition-tag">
          DIRECTIVE 07-A // CLASSIFIED S.H.I.E.L.D. PROTOCOL
        </div>

        {/* Monumental Headline */}
        <h2 ref={titleRef} className="transition-title">
          THE AVENGERS INITIATIVE
        </h2>

        {/* Hairline Divider */}
        <div ref={lineRef} className="transition-hairline" />

        {/* Iconic Fury Manifesto */}
        <blockquote ref={quoteRef} className="transition-quote">
          "There was an idea, to bring together a group of remarkable people, to see if they could become something more. To see if they could work together when we needed them to, to fight the battles that we never could."
        </blockquote>

        {/* Director Signature */}
        <div ref={authorRef} className="transition-author">
          — DIRECTOR NICHOLAS J. FURY // STRATEGIC HOMELAND DIVISION
        </div>

      </div>

      {/* Deep Shadow Shading */}
      <div className="transition-ambient-void" />
    </section>
  );
}
