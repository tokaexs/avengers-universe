import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Link } from 'react-router-dom';
import ShieldModel3D from '../../three/ShieldModel3D';
import Button from '../../components/Button';

interface CaptainAmericaPageProps {
  onPlayHover?: () => void;
  onPlayClick?: () => void;
}

export default function CaptainAmericaPage({
  onPlayHover,
  onPlayClick,
}: CaptainAmericaPageProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [activeDirective, setActiveDirective] = useState(0);

  const directives = [
    { title: 'PROJECT REBIRTH (1942)', detail: 'Vita-Ray radiation combined with Dr. Abraham Erskine’s formula to achieve peak human biology.' },
    { title: 'HOWLING COMMANDOS SIEGE', detail: 'Dismantled HYDRA’s Tesseract weapon production facilities across occupied Europe.' },
    { title: 'PROJECT INSIGHT QUARANTINE', detail: 'Exposed HYDRA infiltration within S.H.I.E.L.D. and grounded three compromised Helicarriers.' },
    { title: 'ENDGAME TIME HEIST COMMAND', detail: 'Field commander of the temporal GPS mission to retrieve the Space and Mind Stones.' },
  ];

  const triggerShieldStrike = () => {
    if (onPlayClick) onPlayClick();
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 2400);
  };

  return (
    <div className="hero-archive-page cap-archive-page">
      {/* Background Ambient Military Lighting */}
      <div className="archive-bg-ambient cap-bg" />

      {/* Header HUD */}
      <div className="stark-header-hud">
        <div className="breadcrumb-box">
          <Link to="/heroes" className="back-link" onClick={onPlayClick} onMouseEnter={onPlayHover}>
            ← HERO ARCHIVE
          </Link>
          <span className="sep-slash">//</span>
          <span className="current-sub">S.H.I.E.L.D. MILITARY ARCHIVE // CAPTAIN AMERICA</span>
        </div>
        <div className="stark-telemetry-tag">
          COMMAND CLEARANCE: LEVEL 10 // ACTIVE
        </div>
      </div>

      <div className="archive-stage-layout">
        
        {/* Left Column: Tactical Equipment & File Logs */}
        <div className="archive-left-col">
          <div className="hero-id-tag">SSR // 107TH INFANTRY REGIMENT</div>
          <h1 className="hero-giant-name">CAPTAIN AMERICA</h1>
          <div className="hero-real-id">STEVEN GRANT ROGERS</div>
          <p className="hero-manifesto">
            "For as long as I can remember, I just wanted to do what was right. I don't like bullies; I don't care where they're from."
          </p>

          <div className="tactical-directives-stack">
            <div className="directives-title">CLASSIFIED DIRECTIVE LOGS:</div>
            {directives.map((dir, dIdx) => (
              <div
                key={dIdx}
                className={`directive-card ${activeDirective === dIdx ? 'directive-card-active' : ''}`}
                onClick={() => {
                  setActiveDirective(dIdx);
                  if (onPlayClick) onPlayClick();
                }}
                onMouseEnter={onPlayHover}
              >
                <div className="dir-header">
                  <span className="dir-num">LOG 0{dIdx + 1}</span>
                  <span className="dir-title">{dir.title}</span>
                </div>
                <p className="dir-detail">{dir.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Center: 3D Vibranium Shield Environment */}
        <div className="archive-center-3d">
          <Canvas camera={{ position: [0, 0, 4.2], fov: 42 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.4} />
              <directionalLight position={[4, 5, 4]} color="#ffffff" intensity={1.8} />
              <directionalLight position={[-4, -3, -2]} color="#4d88ff" intensity={1.4} />
              <ShieldModel3D isSpinning={isSpinning} />
              <OrbitControls enableZoom={false} enablePan={false} />
            </Suspense>
          </Canvas>

          <div className="stage-controls-overlay">
            <Button
              variant="primary"
              onClick={triggerShieldStrike}
              onHoverSound={onPlayHover}
              className="action-btn"
            >
              {isSpinning ? '⚡ VIBRANIUM STRIKE ACTIVE' : '🛡️ ENGAGE KINETIC ROTATION'}
            </Button>
          </div>
        </div>

        {/* Right Column: Physical & Tactical Specifications */}
        <div className="archive-right-col">
          <div className="specs-card">
            <div className="spec-tag">PHYSIOLOGICAL PROFILE</div>
            <div className="stat-row">
              <span className="s-lbl">CELLULAR EFFICIENCY</span>
              <span className="s-val">100% MAXIMUM</span>
            </div>
            <div className="stat-row">
              <span className="s-lbl">METABOLIC ACCELERATION</span>
              <span className="s-val">4X BASELINE</span>
            </div>
            <div className="stat-row">
              <span className="s-lbl">VIBRANIUM SHIELD ABSORPTION</span>
              <span className="s-val">100.0% RECOILLESS</span>
            </div>
            <div className="stat-row">
              <span className="s-lbl">FIELD TACTICS RATING</span>
              <span className="s-val">OMEGA STRATEGIST</span>
            </div>
          </div>

          <div className="gear-specs-card">
            <div className="spec-tag">TACTICAL GEAR LOADOUT</div>
            <ul className="gear-list">
              <li>› 2.5-Foot Wakandan Vibranium Disc Shield</li>
              <li>› Nomex / Kevlar Reinforced Ballistic Uniform</li>
              <li>› Magnetic Forearm Gauntlet Harness</li>
              <li>› Encrypted S.H.I.E.L.D. Secure Comms Ear-link</li>
            </ul>
          </div>

          <div className="status-badge-bar">
            <span className="status-dot" />
            <span className="status-txt">STATUS: INDOMITABLE LEADER // LEGACY ASSIGNED</span>
          </div>
        </div>

      </div>
    </div>
  );
}
