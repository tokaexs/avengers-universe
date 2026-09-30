import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CHARACTERS } from '../data/characters';

interface HeroesPageProps {
  onPlayHover?: () => void;
  onPlayClick?: () => void;
}

export default function HeroesPage({
  onPlayHover,
  onPlayClick,
}: HeroesPageProps) {
  const [activeHero, setActiveHero] = useState(CHARACTERS[0]);

  return (
    <div className="heroes-gateway-page">
      {/* Dynamic Ambient Background Glow */}
      <div
        className="heroes-bg-ambient"
        style={{
          background: `radial-gradient(circle at 75% 50%, ${activeHero.glowColor} 0%, transparent 65%)`,
        }}
      />

      {/* Subtle Classified Insignia Watermark */}
      <div className="heroes-emblem-watermark" aria-hidden="true">
        <img
          src="/assets/avengers-emblem.png"
          alt=""
          className="watermark-emblem-img"
        />
      </div>

      {/* Header HUD */}
      <div className="gateway-header-bar">
        <div className="gateway-tag">
          <span className="bracket">[</span> S.H.I.E.L.D. BIOMETRIC DATABASE // AVENGERS INITIATIVE <span className="bracket">]</span>
        </div>
        <div className="gateway-status">
          ACTIVE OPERATIVES: 06 // CLEARANCE LEVEL 10
        </div>
      </div>

      {/* Main Dual-Column Hero Showcase */}
      <div className="heroes-gateway-container">
        
        {/* Left Column: Hero Selection List & Active Overview */}
        <div className="heroes-roster-list">
          <h1 className="roster-title">PERSONNEL DOSSIERS</h1>
          <p className="roster-desc">
            Classified tactical profiles, physiological telemetry, combat ratings, and dedicated equipment archives for primary Avengers operatives.
          </p>

          <div className="heroes-selector-stack">
            {CHARACTERS.map((hero) => {
              const isSelected = activeHero.id === hero.id;
              return (
                <div
                  key={hero.id}
                  className={`hero-select-row ${isSelected ? 'hero-select-row-active' : ''}`}
                  onMouseEnter={() => {
                    setActiveHero(hero);
                    if (onPlayHover) onPlayHover();
                  }}
                  onClick={() => {
                    setActiveHero(hero);
                    if (onPlayClick) onPlayClick();
                  }}
                  style={{ '--hero-accent': hero.accentColor } as React.CSSProperties}
                >
                  <div className="row-left">
                    <span className="row-num">{hero.indexNumber}</span>
                    <span className="row-name">{hero.codename}</span>
                  </div>
                  <div className="row-right">
                    <span className="row-class">{hero.powerClass}</span>
                    <Link
                      to={`/heroes/${hero.id}`}
                      className="enter-archive-link"
                      onClick={onPlayClick}
                      onMouseEnter={onPlayHover}
                    >
                      ENTER ARCHIVE →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Interactive Holographic Hero Showcase */}
        <div className="hero-preview-display" style={{ '--hero-accent': activeHero.accentColor } as React.CSSProperties}>
          <div className="preview-card-inner">
            
            {/* Top Tag */}
            <div className="preview-top-bar">
              <span className="preview-index">STAGE // {activeHero.indexNumber}</span>
              <span className="preview-class-badge">{activeHero.powerClass}</span>
            </div>

            {/* Huge Name */}
            <h2 className="preview-name">{activeHero.codename}</h2>
            <div className="preview-real">{activeHero.name}</div>

            {/* Kinetic Keywords */}
            <div className="preview-keywords">
              {activeHero.keywords.map((kw, idx) => (
                <span key={idx} className="preview-kw-tag">
                  <span className="kw-bullet">›</span> {kw}
                </span>
              ))}
            </div>

            {/* Graphic Blueprint Frame */}
            <div className="preview-hologram-frame">
              <img
                src={activeHero.image}
                alt={activeHero.codename}
                className="preview-hero-img"
              />
              <span className="h-reticle tl" />
              <span className="h-reticle tr" />
              <span className="h-reticle bl" />
              <span className="h-reticle br" />
            </div>

            {/* Description & Quote */}
            <p className="preview-description">{activeHero.description}</p>
            <blockquote className="preview-quote">"{activeHero.quote}"</blockquote>

            {/* Dedicated Archive Direct Action Button */}
            <Link
              to={`/heroes/${activeHero.id}`}
              className="enter-full-archive-btn"
              onClick={onPlayClick}
              onMouseEnter={onPlayHover}
            >
              OPEN {activeHero.codename} ARCHIVE
            </Link>

          </div>
        </div>

      </div>
    </div>
  );
}
