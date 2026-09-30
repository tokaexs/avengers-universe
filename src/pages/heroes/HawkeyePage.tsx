import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';

interface HawkeyePageProps {
  onPlayHover?: () => void;
  onPlayClick?: () => void;
}

export default function HawkeyePage({
  onPlayHover,
  onPlayClick,
}: HawkeyePageProps) {
  const [selectedArrow, setSelectedArrow] = useState(0);

  const trickArrows = [
    { name: 'HIGH-EXPLOSIVE WARHEAD', desc: 'Miniaturized C4 charge capable of piercing and detonating heavy alien armor.' },
    { name: 'EMP DISRUPTOR PULSE', desc: 'Disables all electronic guidance systems and cybernetic circuits within 50 meters.' },
    { name: 'GRAPPLING HOOK // CABLE', desc: 'High-tensile steel-vibranium cable capable of supporting 5,000 lbs for rapid aerial extraction.' },
    { name: 'SONIC CONCUSSION SHOCK', desc: '140 dB directional sound blast incapacitating non-lethal targets instantly.' },
    { name: 'PYM PARTICLE ENLARGING', desc: 'Releases Pym gas on impact, expanding the arrow tip into an enormous battering ram.' },
  ];

  return (
    <div className="hero-archive-page hawkeye-archive-page">
      {/* Background Ambient Violet Precision Range Lighting */}
      <div className="archive-bg-ambient hawkeye-bg" />

      {/* Header HUD */}
      <div className="stark-header-hud">
        <div className="breadcrumb-box">
          <Link to="/heroes" className="back-link" onClick={onPlayClick} onMouseEnter={onPlayHover}>
            ← HERO ARCHIVE
          </Link>
          <span className="sep-slash">//</span>
          <span className="current-sub">S.H.I.E.L.D. TACTICAL WEAPONS RANGE // HAWKEYE</span>
        </div>
        <div className="stark-telemetry-tag">
          BALLISTIC ACCURACY: 100.0% // VERIFIED
        </div>
      </div>

      <div className="archive-stage-layout">
        
        {/* Left Column: Marksman Dossier */}
        <div className="archive-left-col">
          <div className="hero-id-tag">STRIKE TEAM DELTA // MASTER MARKSMAN</div>
          <h1 className="hero-giant-name">HAWKEYE</h1>
          <div className="hero-real-id">CLINTON FRANCIS BARTON</div>
          <p className="hero-manifesto">
            "You shoot and you miss, you die. I don't miss. None of this makes sense, but I'm going out there because it's my job."
          </p>

          <div className="tactical-directives-stack">
            <div className="directives-title">SPECIALIZED ARROW QUIVER MATRIX:</div>
            {trickArrows.map((arrow, aIdx) => (
              <div
                key={aIdx}
                className={`directive-card ${selectedArrow === aIdx ? 'directive-card-active' : ''}`}
                onClick={() => {
                  setSelectedArrow(aIdx);
                  if (onPlayClick) onPlayClick();
                }}
                onMouseEnter={onPlayHover}
              >
                <div className="dir-header">
                  <span className="dir-num">ARROW 0{aIdx + 1}</span>
                  <span className="dir-title">{arrow.name}</span>
                </div>
                <p className="dir-detail">{arrow.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Center: Holographic Ballistic Range Display */}
        <div className="archive-center-3d">
          <div className="hawkeye-range-holo">
            <div className="target-crosshair-ring" />
            <img
              src="/assets/characters/hawkeye.svg"
              alt="Hawkeye"
              className="hawkeye-blueprint-graphic"
            />
            <div className="range-telemetry-badge">
              <span className="range-dot" />
              <span>RANGE LOCK: 2,400 METERS // ZERO DEVIATION</span>
            </div>
          </div>

          <div className="stage-controls-overlay">
            <Button
              variant="primary"
              onClick={onPlayClick}
              onHoverSound={onPlayHover}
              className="action-btn"
            >
              🏹 ARM {trickArrows[selectedArrow].name}
            </Button>
          </div>
        </div>

        {/* Right Column: Ballistic Ratings */}
        <div className="archive-right-col">
          <div className="specs-card">
            <div className="spec-tag">BALLISTIC TELEMETRY</div>
            <div className="stat-row">
              <span className="s-lbl">PRECISION HIT ACCURACY</span>
              <span className="s-val">100.0% ZERO MISS</span>
            </div>
            <div className="stat-row">
              <span className="s-lbl">DRAW WEIGHT</span>
              <span className="s-val">250 LBS COMPOUND</span>
            </div>
            <div className="stat-row">
              <span className="s-lbl">ARROW VELOCITY</span>
              <span className="s-val">420 FPS RECURVE</span>
            </div>
            <div className="stat-row">
              <span className="s-lbl">SPATIAL CALCULATION</span>
              <span className="s-val">SUPERHUMAN REAL-TIME</span>
            </div>
          </div>

          <div className="gear-specs-card">
            <div className="spec-tag">TACTICAL ARSENAL</div>
            <ul className="gear-list">
              <li>› Hoyt Custom Recurve & Compound Bows</li>
              <li>› 32-Capacity Motorized Trick Arrow Quiver</li>
              <li>› Ronin Folded Carbon Steel Katana</li>
              <li>› S.H.I.E.L.D. Night-Vision Ballistic Goggles</li>
            </ul>
          </div>

          <div className="status-badge-bar">
            <span className="status-dot" />
            <span className="status-txt">STATUS: ACTIVE VETERAN MARKSMAN</span>
          </div>
        </div>

      </div>
    </div>
  );
}
