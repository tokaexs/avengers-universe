import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Link } from 'react-router-dom';
import { TECHNOLOGY_DATA } from '../data/technology';
import TechHologram3D from '../three/TechHologram3D';
import Particles from '../three/Particles';
import Button from '../components/Button';

interface TechnologyPageProps {
  onPlayHover?: () => void;
  onPlayClick?: () => void;
}

export default function TechnologyPage({
  onPlayHover,
  onPlayClick,
}: TechnologyPageProps) {
  const [selectedTechIdx, setSelectedTechIdx] = useState(0);
  const [isOverclocked, setIsOverclocked] = useState(false);

  const currentTech = TECHNOLOGY_DATA[selectedTechIdx] || TECHNOLOGY_DATA[0];

  const triggerOverclockTest = () => {
    if (onPlayClick) onPlayClick();
    setIsOverclocked(true);
    setTimeout(() => setIsOverclocked(false), 2400);
  };

  return (
    <div
      className="technology-museum-page"
      style={{
        '--tech-accent': currentTech.accentColor,
      } as React.CSSProperties}
    >
      {/* Background Volumetric Engineering Lab Aura */}
      <div className="archive-bg-ambient tech-bg" />

      {/* Top Header HUD */}
      <div className="stark-header-hud">
        <div className="breadcrumb-box">
          <Link to="/" className="back-link" onClick={onPlayClick} onMouseEnter={onPlayHover}>
            ← COMMAND ARCHIVE
          </Link>
          <span className="sep-slash">//</span>
          <span className="current-sub">STARK R&D / S.H.I.E.L.D. ENGINEERING VAULT // LEVEL 10 CLEARANCE</span>
        </div>
        <div className="stark-telemetry-tag">
          DIAGNOSTIC STATUS: {isOverclocked ? 'OVERCLOCK ACTIVE' : 'NOMINAL 100%'} // SYSTEM #0{selectedTechIdx + 1}
        </div>
      </div>

      {/* Main Engineering Stage */}
      <div className="tech-stage-layout">
        
        {/* Left Column: Tech Catalogue & Blueprints */}
        <div className="tech-left-col">
          <div className="tech-header-meta">
            <span className="tech-pill-tag">ENGINEERING BLUEPRINTS</span>
            <h1 className="tech-giant-title">ADVANCED TECH</h1>
            <p className="tech-lead-text">
              Cutting-edge propulsion, clean fusion reactors, nanotech armaments, tactical AI matrices, and quantum particle physics engineered for global defense.
            </p>
          </div>

          <div className="tech-select-stack">
            {TECHNOLOGY_DATA.map((tech, idx) => {
              const isSelected = selectedTechIdx === idx;
              return (
                <div
                  key={tech.id}
                  className={`tech-select-row ${isSelected ? 'tech-select-row-active' : ''}`}
                  onClick={() => {
                    setSelectedTechIdx(idx);
                    if (onPlayClick) onPlayClick();
                  }}
                  onMouseEnter={onPlayHover}
                >
                  <span className="tech-row-num">0{idx + 1}</span>
                  <div className="tech-row-titles">
                    <span className="tech-row-name">{tech.title}</span>
                    <span className="tech-row-dev">{tech.developer}</span>
                  </div>
                  <span className="tech-status-dot" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Center: 3D Holographic Engineering Artifact */}
        <div className="tech-center-3d">
          <Canvas camera={{ position: [0, 0, 4.2], fov: 42 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.4} />
              <directionalLight position={[4, 5, 4]} color={currentTech.accentColor} intensity={2.0} />
              <directionalLight position={[-4, -3, -2]} color="#ffffff" intensity={1.5} />
              <TechHologram3D techId={currentTech.id} isOverclocked={isOverclocked} />
              <Particles />
              <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.7} minPolarAngle={Math.PI / 2.5} />
            </Suspense>
          </Canvas>

          {/* Action Trigger */}
          <div className="stage-controls-overlay">
            <Button
              variant="primary"
              onClick={triggerOverclockTest}
              onHoverSound={onPlayHover}
              className="action-btn tech-btn"
            >
              {isOverclocked ? '⚡ OVERCLOCK POWER DISCHARGE ACTIVE' : '⚡ RUN POWER DIAGNOSTIC TEST'}
            </Button>
          </div>
        </div>

        {/* Right Column: Specifications & Live Telemetry HUD */}
        <div className="tech-right-col">
          <div className="specs-card">
            <div className="spec-tag">LIVE TELEMETRY METRICS</div>
            {currentTech.telemetry.map((tel, tIdx) => (
              <div key={tIdx} className="stat-row">
                <span className="s-lbl">{tel.label}</span>
                <span className="s-val">{tel.value}</span>
              </div>
            ))}
          </div>

          <div className="gear-specs-card">
            <div className="spec-tag">SYSTEM SPECIFICATIONS</div>
            <ul className="gear-list">
              {currentTech.specifications.map((spec, spIdx) => (
                <li key={spIdx}>› {spec}</li>
              ))}
            </ul>
          </div>

          <div className="status-badge-bar">
            <span className="status-dot" style={{ background: currentTech.accentColor, boxShadow: `0 0 10px ${currentTech.accentColor}` }} />
            <span className="status-txt">STATUS: {currentTech.status}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
