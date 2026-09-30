import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Link } from 'react-router-dom';
import { CHARACTERS } from '../data/characters';
import CharacterModel from '../three/CharacterModel';
import Particles from '../three/Particles';

interface HeroesPageProps {
  onPlayHover?: () => void;
  onPlayClick?: () => void;
}

export default function HeroesPage({
  onPlayHover,
  onPlayClick,
}: HeroesPageProps) {
  const [activeHero, setActiveHero] = useState(CHARACTERS[0]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth - 0.5) * 2;
    const y = (e.clientY / innerHeight - 0.5) * 2;
    setMousePos({ x, y });
  };

  return (
    <div
      className="heroes-gateway-page"
      onMouseMove={handleMouseMove}
      style={{
        '--hero-accent': activeHero.accentColor,
        '--hero-glow': activeHero.glowColor,
      } as React.CSSProperties}
    >
      {/* Dynamic Ambient Hero Spotlight Aura */}
      <div
        className="heroes-bg-ambient"
        style={{
          background: `radial-gradient(circle at 70% 45%, ${activeHero.glowColor} 0%, transparent 60%)`,
        }}
      />

      {/* Emblem Watermark */}
      <div className="heroes-emblem-watermark" aria-hidden="true">
        <img
          src="/assets/avengers-emblem.png"
          alt=""
          className="watermark-emblem-img"
        />
      </div>

      {/* Top Header HUD Bar */}
      <div className="gateway-header-hud">
        <div className="breadcrumb-box">
          <span className="brand-flag">S.H.I.E.L.D. BIOMETRIC ARCHIVE</span>
          <span className="sep-slash">//</span>
          <span className="current-sub">AVENGERS INITIATIVE ROSTER // CLEARANCE LEVEL 10</span>
        </div>
        <div className="stark-telemetry-tag">
          OPERATIVE TELEMETRY: 06 ACTIVE UNITS // ENCRYPTED QUANTUM LINK
        </div>
      </div>

      {/* Main Roster Environment */}
      <div className="heroes-roster-stage">
        
        {/* Left Column: Interactive Operative Selection Stack */}
        <div className="heroes-sidebar-panel">
          <div className="roster-meta-header">
            <span className="roster-badge">PERSONNEL REGISTRY</span>
            <h1 className="roster-giant-title">THE AVENGERS</h1>
            <p className="roster-lead-text">
              Select an operative dossier to inspect classified tactical profiles, physiological telemetry, combat ratings, and dedicated equipment archives.
            </p>
          </div>

          <div className="heroes-select-list">
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
                >
                  <div className="row-left">
                    <span className="row-num">{hero.indexNumber}</span>
                    <div className="row-titles">
                      <span className="row-codename">{hero.codename}</span>
                      <span className="row-realname">{hero.name}</span>
                    </div>
                  </div>
                  <div className="row-right">
                    <span className="row-class-tag">{hero.powerClass}</span>
                    <Link
                      to={`/heroes/${hero.id}`}
                      className="row-link-btn"
                      onClick={onPlayClick}
                      onMouseEnter={onPlayHover}
                    >
                      DOSSIER →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Center/Right: Cinematic Holographic Hero Stage */}
        <div className="hero-feature-viewport">
          
          {/* 3D Holographic Artifact Canvas */}
          <div className="hero-3d-hologram-box">
            <Canvas camera={{ position: [0, 0, 3.8], fov: 42 }}>
              <Suspense fallback={null}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[3, 4, 3]} intensity={1.5} color="#ffffff" />
                <directionalLight position={[-3, -3, -2]} intensity={1.8} color={activeHero.accentColor} />
                <CharacterModel accentColor={activeHero.accentColor} powerClass={activeHero.powerClass} />
                <Particles />
                <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 2.4} />
              </Suspense>
            </Canvas>
          </div>

          {/* Interactive Operative Dossier Card */}
          <div
            className="hero-dossier-card"
            style={{
              transform: `translate3d(${mousePos.x * -6}px, ${mousePos.y * -6}px, 0)`,
            }}
          >
            <div className="dossier-top-hud">
              <span className="dossier-designation">DOSSIER // {activeHero.indexNumber}</span>
              <span className="dossier-status-pill">
                <span className="status-live-dot" /> ACTIVE STATUS
              </span>
            </div>

            <div className="dossier-hero-identity">
              <h2 className="dossier-hero-name">{activeHero.codename}</h2>
              <div className="dossier-real-name">{activeHero.name} • {activeHero.affiliation}</div>
            </div>

            {/* Keyword Pills */}
            <div className="dossier-keywords">
              {activeHero.keywords.map((kw, idx) => (
                <span key={idx} className="dossier-kw-badge">
                  <span className="kw-caret">›</span> {kw}
                </span>
              ))}
            </div>

            {/* Narrative & Quote */}
            <p className="dossier-narrative">{activeHero.description}</p>
            <blockquote className="dossier-quote">"{activeHero.quote}"</blockquote>

            {/* Stat Block Indicators */}
            <div className="dossier-stat-meters">
              <div className="stat-meter-row">
                <span className="meter-label">COMBAT POWER</span>
                <span className="meter-blocks">◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◻︎◻︎</span>
              </div>
              <div className="stat-meter-row">
                <span className="meter-label">TACTICAL MASTERY</span>
                <span className="meter-blocks">◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◻︎</span>
              </div>
              <div className="stat-meter-row">
                <span className="meter-label">GLOBAL CLEARANCE</span>
                <span className="meter-blocks">◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎</span>
              </div>
            </div>

            {/* Direct Archive Launch CTA */}
            <Link
              to={`/heroes/${activeHero.id}`}
              className="dossier-launch-btn"
              onClick={onPlayClick}
              onMouseEnter={onPlayHover}
            >
              <span>ENTER {activeHero.codename} ARCHIVE</span>
              <span className="btn-arrow">→</span>
            </Link>

          </div>

        </div>

      </div>
    </div>
  );
}
