import { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CHARACTERS } from '../data/characters';
import CharacterModel from '../three/CharacterModel';
import { useMediaQuery } from '../hooks/useMediaQuery';

gsap.registerPlugin(ScrollTrigger);

interface HeroArchiveProps {
  onPlayHover?: () => void;
  onPlayClick?: () => void;
}

export default function HeroArchive({
  onPlayHover,
  onPlayClick,
}: HeroArchiveProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current) return;

      const total = CHARACTERS.length;
      const slides = slidesRef.current.filter(Boolean) as HTMLDivElement[];

      slides.forEach((slide, idx) => {
        if (idx === 0) {
          gsap.set(slide, {
            opacity: 1,
            scale: 1,
            yPercent: 0,
            filter: 'blur(0px)',
            visibility: 'visible',
          });
        } else {
          gsap.set(slide, {
            opacity: 0,
            scale: 0.92,
            yPercent: 35,
            filter: 'blur(16px)',
            visibility: 'hidden',
          });
        }
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${(total - 1) * 160}%`,
          pin: true,
          scrub: 1.0,
          onUpdate: (self) => {
            const cur = Math.min(
              total - 1,
              Math.floor(self.progress * total + 0.05)
            );
            setActiveIdx(cur);
          },
        },
      });

      for (let i = 0; i < total - 1; i++) {
        const cur = slides[i];
        const nxt = slides[i + 1];
        if (!cur || !nxt) continue;

        const offset = i * 1.5;

        // Current Hero dissolves and pushes up
        tl.to(
          cur,
          {
            opacity: 0,
            scale: 0.85,
            yPercent: -35,
            filter: 'blur(16px)',
            ease: 'power2.inOut',
            duration: 1.1,
            onComplete: () => {
              gsap.set(cur, { visibility: 'hidden' });
            },
            onReverseComplete: () => {
              gsap.set(cur, { visibility: 'visible' });
            },
          },
          offset
        );

        // Next Hero rises and sharpens
        tl.fromTo(
          nxt,
          {
            opacity: 0,
            scale: 0.92,
            yPercent: 35,
            filter: 'blur(16px)',
            visibility: 'visible',
          },
          {
            opacity: 1,
            scale: 1,
            yPercent: 0,
            filter: 'blur(0px)',
            ease: 'power2.inOut',
            duration: 1.1,
          },
          offset + 0.3
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const activeChar = CHARACTERS[activeIdx] || CHARACTERS[0];

  return (
    <section
      ref={containerRef}
      id="heroes"
      className="hero-archive-cinematic-section"
      style={{
        '--char-accent': activeChar.accentColor,
        '--char-glow': activeChar.glowColor,
      } as React.CSSProperties}
    >
      {/* Dynamic Ambient Background Flare */}
      <div className="archive-ambient-glow" />

      {/* Top Telemetry Header */}
      <div className="archive-header-hud">
        <div className="archive-hud-tag">
          <span className="bracket">[</span> TACTICAL OPERATIVE SEQUENCE <span className="bracket">]</span>
        </div>
        <div className="archive-hud-counter">
          <span className="cur-num">{activeChar.indexNumber}</span>
          <span className="slash">/</span>
          <span className="tot-num">06</span>
        </div>
      </div>

      {/* Fullscreen Character Stage */}
      <div className="archive-stage">
        {CHARACTERS.map((char, index) => (
          <div
            key={char.id}
            ref={(el) => { slidesRef.current[index] = el; }}
            className="archive-fullscreen-slide"
            style={{ '--slide-accent': char.accentColor } as React.CSSProperties}
          >
            {/* Massive Index Watermark */}
            <div className="char-watermark-num" aria-hidden="true">
              {char.indexNumber}
            </div>

            {/* Main Composition Grid */}
            <div className="char-stage-grid">
              
              {/* Column 1: Typography & Movie Introduction */}
              <div className="char-col-info">
                
                {/* Index Pill & Classification */}
                <div className="char-meta-row">
                  <span className="char-index-pill">AVENGER {char.indexNumber}</span>
                  <span className="char-tier-pill">{char.powerClass}</span>
                </div>

                {/* Monumental Hero Name */}
                <h2 className="char-monumental-name">
                  {char.codename}
                </h2>

                {/* Real Name Identification */}
                <div className="char-real-name">
                  ID // {char.name}
                </div>

                {/* Stacked Cinematic Keywords */}
                <div className="char-kinetic-keywords">
                  {char.keywords.map((kw, kIdx) => (
                    <div key={kIdx} className="keyword-row">
                      <span className="kw-bullet">›</span>
                      <span className="kw-text">{kw}</span>
                    </div>
                  ))}
                </div>

                {/* Tagline */}
                <div className="char-tagline-text">
                  {char.tagline}
                </div>

                {/* Briefing Description */}
                <p className="char-briefing-desc">
                  {char.description}
                </p>

                {/* Abilities Pill List */}
                <div className="char-abilities-grid">
                  {char.abilities.map((ab, aIdx) => (
                    <span key={aIdx} className="ab-pill">
                      {ab}
                    </span>
                  ))}
                </div>

                {/* Iconic Quote */}
                <blockquote className="char-quote-box">
                  "{char.quote}"
                </blockquote>

                {/* Affiliation */}
                <div className="char-affil-tag">
                  <span className="affil-label">AFFILIATION:</span> {char.affiliation}
                </div>

              </div>

              {/* Column 2: 3D Holographic Artifact / Character Visual */}
              <div className="char-col-visual">
                <div className="char-visual-hologram">
                  
                  {/* 3D WebGL Holographic Artifact */}
                  <div className="char-3d-canvas-wrap">
                    <Canvas
                      camera={{ position: [0, 0, 3.8], fov: 45 }}
                      dpr={isMobile ? [1, 1] : [1, 1.5]}
                      gl={{ antialias: true, alpha: true }}
                    >
                      <Suspense fallback={null}>
                        <ambientLight intensity={0.4} />
                        <CharacterModel accentColor={char.accentColor} powerClass={char.powerClass} />
                      </Suspense>
                    </Canvas>
                  </div>

                  {/* Holographic 2D Vector Layer */}
                  <div className="char-hologram-img-layer">
                    <img
                      src={char.image}
                      alt={`${char.codename} Blueprint`}
                      className="char-blueprint-img"
                      loading="eager"
                    />
                  </div>

                  {/* Corner Tech Reticles */}
                  <span className="c-reticle tl" />
                  <span className="c-reticle tr" />
                  <span className="c-reticle bl" />
                  <span className="c-reticle br" />

                  {/* Frame Status Bar */}
                  <div className="char-frame-status">
                    <span className="live-dot" />
                    <span className="live-text">TACTICAL BIOMETRIC // ACTIVE</span>
                  </div>

                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Right Side Navigation Rail */}
      <div className="archive-nav-rail">
        {CHARACTERS.map((c, cIdx) => (
          <div
            key={c.id}
            className={`archive-rail-pip ${activeIdx === cIdx ? 'archive-rail-pip-active' : ''}`}
            onClick={() => {
              if (onPlayClick) onPlayClick();
              if (containerRef.current) {
                const totalScroll = (CHARACTERS.length - 1) * window.innerHeight * 1.6;
                const targetY = containerRef.current.offsetTop + (cIdx / (CHARACTERS.length - 1)) * totalScroll;
                window.scrollTo({ top: targetY, behavior: 'smooth' });
              }
            }}
            onMouseEnter={onPlayHover}
            title={`${c.indexNumber} // ${c.codename}`}
          >
            <span className="pip-label">{c.indexNumber}</span>
            <span className="pip-line" />
          </div>
        ))}
      </div>

      {/* Bottom Scroll Prompt */}
      <div
        className="archive-bottom-prompt"
        onClick={() => {
          if (onPlayClick) onPlayClick();
          if (containerRef.current) {
            const nextIdx = (activeIdx + 1) % CHARACTERS.length;
            const totalScroll = (CHARACTERS.length - 1) * window.innerHeight * 1.6;
            const targetY = containerRef.current.offsetTop + (nextIdx / (CHARACTERS.length - 1)) * totalScroll;
            window.scrollTo({ top: targetY, behavior: 'smooth' });
          }
        }}
        onMouseEnter={onPlayHover}
        role="button"
        tabIndex={0}
      >
        <span className="prompt-arrow">↓</span>
        <span className="prompt-caption">SCROLL OR CLICK TO ADVANCE DOSSIER</span>
      </div>
    </section>
  );
}
