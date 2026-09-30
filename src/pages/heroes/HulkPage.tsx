import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Link } from 'react-router-dom';
import GammaCore3D from '../../three/GammaCore3D';
import Button from '../../components/Button';

interface HulkPageProps {
  onPlayHover?: () => void;
  onPlayClick?: () => void;
}

export default function HulkPage({
  onPlayHover,
  onPlayClick,
}: HulkPageProps) {
  const [gammaOverload, setGammaOverload] = useState(false);

  const triggerRage = () => {
    if (onPlayClick) onPlayClick();
    setGammaOverload(true);
    setTimeout(() => setGammaOverload(false), 2800);
  };

  return (
    <div className="hero-archive-page hulk-archive-page">
      {/* Background Ambient Gamma Lab Atmosphere */}
      <div className={`archive-bg-ambient hulk-bg ${gammaOverload ? 'gamma-overload' : ''}`} />

      {/* Header HUD */}
      <div className="stark-header-hud">
        <div className="breadcrumb-box">
          <Link to="/heroes" className="back-link" onClick={onPlayClick} onMouseEnter={onPlayHover}>
            ← HERO ARCHIVE
          </Link>
          <span className="sep-slash">//</span>
          <span className="current-sub">CULVER BIO-LABS // THE INCREDIBLE HULK</span>
        </div>
        <div className="stark-telemetry-tag">
          RADIATION WARNING: GAMMA LEVEL 10 // ACTIVE
        </div>
      </div>

      <div className="archive-stage-layout">
        
        {/* Left Column: Banner Bio-Physics */}
        <div className="archive-left-col">
          <div className="hero-id-tag">NUCLEAR PHYSICIST // GAMMA DESTRUCT ENGINE</div>
          <h1 className="hero-giant-name">THE HULK</h1>
          <div className="hero-real-id">DR. ROBERT BRUCE BANNER (7 PH.Ds)</div>
          <p className="hero-manifesto">
            "That's my secret, Cap: I'm always angry."
          </p>

          <div className="tactical-directives-stack">
            <div className="directives-title">BIOPHYSICAL DIRECTIVES:</div>
            <div className="directive-card directive-card-active">
              <div className="dir-header">
                <span className="dir-num">LOG 01</span>
                <span className="dir-title">GAMMA OVERDOSE ACCIDENT</span>
              </div>
              <p className="dir-detail">Accidental saturation with high-frequency gamma rays transformed cellular mitosis into an instantaneous adrenaline-scaled kinetic titan.</p>
            </div>
            <div className="directive-card">
              <div className="dir-header">
                <span className="dir-num">LOG 02</span>
                <span className="dir-title">SMART HULK CELLULAR SYNTHESIS</span>
              </div>
              <p className="dir-detail">Eighteen months in the gamma lab blended Banner’s supreme intellect with the Hulk’s infinite physical powerhouse strength.</p>
            </div>
          </div>
        </div>

        {/* Center: 3D Gamma Reactor Chamber */}
        <div className="archive-center-3d">
          <Canvas camera={{ position: [0, 0, 4.2], fov: 42 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.4} />
              <directionalLight position={[4, 5, 4]} color="#ffffff" intensity={1.8} />
              <directionalLight position={[-4, -3, -2]} color="#00ff66" intensity={2.2} />
              <GammaCore3D />
              <OrbitControls enableZoom={false} enablePan={false} />
            </Suspense>
          </Canvas>

          <div className="stage-controls-overlay">
            <Button
              variant="primary"
              onClick={triggerRage}
              onHoverSound={onPlayHover}
              className="action-btn"
            >
              {gammaOverload ? '⚡ SEISMIC RAGE ACTIVE' : '💥 INITIATE GAMMA TRANSFORMATION'}
            </Button>
          </div>
        </div>

        {/* Right Column: Physical & Seismic Ratings */}
        <div className="archive-right-col">
          <div className="specs-card">
            <div className="spec-tag">PHYSICAL TELEMETRY</div>
            <div className="stat-row">
              <span className="s-lbl">KINETIC FORCE</span>
              <span className="s-val">INFINITE SCALING</span>
            </div>
            <div className="stat-row">
              <span className="s-lbl">CELLULAR REGENERATION</span>
              <span className="s-val">INSTANTANEOUS</span>
            </div>
            <div className="stat-row">
              <span className="s-lbl">SEISMIC THUNDERCLAP</span>
              <span className="s-val">180 dB SHOCKWAVE</span>
            </div>
            <div className="stat-row">
              <span className="s-lbl">RADIOACTIVE RESISTANCE</span>
              <span className="s-val">100% IMMUNE</span>
            </div>
          </div>

          <div className="gear-specs-card">
            <div className="spec-tag">SCIENTIFIC CONTRIBUTIONS</div>
            <ul className="gear-list">
              <li>› Co-Architect of the Quantum GPS Time GPS</li>
              <li>› Wielded the Stark Nano Gauntlet Restoration Snap</li>
              <li>› Anti-Gamma Molecular Stabilizers</li>
              <li>› Culver Bioscience Radiation Shielding</li>
            </ul>
          </div>

          <div className="status-badge-bar">
            <span className="status-dot" />
            <span className="status-txt">STATUS: OMEGA TIER TACTICAL HEAVY ASSAULT</span>
          </div>
        </div>

      </div>
    </div>
  );
}
