import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { THREATS_DATA } from '../data/threats';

gsap.registerPlugin(ScrollTrigger);

interface ThreatsProps {
  onPlayHover?: () => void;
  onPlayClick?: () => void;
}

export default function Threats({ onPlayHover, onPlayClick }: ThreatsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current) return;

      const total = THREATS_DATA.length;
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
            scale: 0.9,
            yPercent: 40,
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

        // Current Threat Exits
        tl.to(
          cur,
          {
            opacity: 0,
            scale: 0.85,
            yPercent: -40,
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

        // Next Threat Enters
        tl.fromTo(
          nxt,
          {
            opacity: 0,
            scale: 0.9,
            yPercent: 40,
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

  const activeThreat = THREATS_DATA[activeIdx] || THREATS_DATA[0];

  return (
    <section
      ref={containerRef}
      id="threats"
      className="cinematic-threats-section"
      style={{
        '--threat-accent': activeThreat.accentColor,
        '--threat-glow': activeThreat.glowColor,
      } as React.CSSProperties}
    >
      {/* Background Signature Ambient Energy Flare */}
      <div className="threats-ambient-energy" />

      {/* Top Header */}
      <div className="threats-hud-header">
        <div className="threats-tag">
          <span className="bracket">[</span> S.H.I.E.L.D. SURVEILLANCE // GLOBAL THREAT MATRIX <span className="bracket">]</span>
        </div>
        <div className="threats-counter">
          <span className="cur-t">0{activeIdx + 1}</span>
          <span className="sep">/</span>
          <span className="tot-t">03</span>
        </div>
      </div>

      {/* Fullscreen Threat Stage */}
      <div className="threats-stage-wrap">
        {THREATS_DATA.map((threat, index) => (
          <div
            key={threat.id}
            ref={(el) => { slidesRef.current[index] = el; }}
            className="threat-fullscreen-stage"
            style={{ '--t-accent': threat.accentColor } as React.CSSProperties}
          >
            {/* Massive Background Codename Watermark */}
            <div className="threat-watermark-bg" aria-hidden="true">
              {threat.codename}
            </div>

            {/* Layout Grid */}
            <div className="threat-stage-grid">
              
              {/* Column 1: Typography & Tactical Briefing */}
              <div className="threat-col-left">
                
                {/* Threat Tier & Number */}
                <div className="threat-tag-row">
                  <span className="threat-number-tag">{threat.threatNumber}</span>
                  <span className="threat-tier-pill">{threat.threatTier}</span>
                </div>

                {/* Monumental Codename */}
                <h2 className="threat-monumental-name">
                  {threat.codename}
                </h2>

                {/* Moniker */}
                <div className="threat-moniker-text">
                  {threat.moniker}
                </div>

                {/* Kinetic Keywords */}
                <div className="threat-keywords-row">
                  {threat.keywords.map((kw, kIdx) => (
                    <span key={kIdx} className="threat-kw-badge">
                      <span className="bullet">⚡</span> {kw}
                    </span>
                  ))}
                </div>

                {/* Iconic Threat Quote */}
                <blockquote className="threat-quote-callout">
                  "{threat.quote}"
                </blockquote>

                {/* Briefing */}
                <p className="threat-briefing-p">
                  {threat.briefing}
                </p>

                {/* Metrics */}
                <div className="threat-metrics-row">
                  {threat.metrics.map((m, mIdx) => (
                    <div key={mIdx} className="threat-metric-box">
                      <span className="m-lbl">{m.label}</span>
                      <span className="m-val">{m.value}</span>
                    </div>
                  ))}
                </div>

                {/* Origin */}
                <div className="threat-origin-line">
                  <span className="o-lbl">ORIGIN:</span> {threat.origin}
                </div>

              </div>

              {/* Column 2: Holographic Threat Artifact Frame */}
              <div className="threat-col-right">
                <div className="threat-visual-frame">
                  
                  {/* Vector Blueprint */}
                  <div className="threat-img-box">
                    <img
                      src={threat.image}
                      alt={threat.codename}
                      className="threat-graphic-img"
                    />
                  </div>

                  {/* Corner Reticles */}
                  <span className="t-bracket tl" />
                  <span className="t-bracket tr" />
                  <span className="t-bracket bl" />
                  <span className="t-bracket br" />

                  {/* Security Alert Bar */}
                  <div className="threat-status-bar">
                    <span className="alert-dot" />
                    <span className="alert-text">CRITICAL HAZARD // OMEGA PROTOCOL</span>
                  </div>

                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Right Side Navigation Rail */}
      <div className="threats-quick-rail">
        {THREATS_DATA.map((t, tIdx) => (
          <div
            key={t.id}
            className={`threat-node ${activeIdx === tIdx ? 'threat-node-active' : ''}`}
            onClick={() => {
              if (onPlayClick) onPlayClick();
              if (containerRef.current) {
                const totalScroll = (THREATS_DATA.length - 1) * window.innerHeight * 1.6;
                const targetY = containerRef.current.offsetTop + (tIdx / (THREATS_DATA.length - 1)) * totalScroll;
                window.scrollTo({ top: targetY, behavior: 'smooth' });
              }
            }}
            onMouseEnter={onPlayHover}
            title={`${t.threatNumber} // ${t.codename}`}
          >
            <span className="t-name">{t.codename}</span>
            <span className="t-line" />
          </div>
        ))}
      </div>
    </section>
  );
}
