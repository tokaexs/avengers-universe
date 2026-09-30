import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import ArcReactor from '../three/ArcReactor';
import { TECHNOLOGY_DATA, type TechItem } from '../data/technology';

interface TechnologyPageProps {
  onPlayHover?: () => void;
  onPlayClick?: () => void;
}

export default function TechnologyPage({
  onPlayHover,
  onPlayClick,
}: TechnologyPageProps) {
  const [selectedTech, setSelectedTech] = useState<TechItem>(TECHNOLOGY_DATA[0]);

  return (
    <div
      className="tech-archive-page"
      style={{
        '--tech-accent': selectedTech.accentColor,
      } as React.CSSProperties}
    >
      <div className="tech-ambient-glow" />

      {/* Header Bar */}
      <div className="gateway-header-bar">
        <div className="gateway-tag">
          <span className="bracket">[</span> STARK INDUSTRIES // ADVANCED RESEARCH ARCHIVE <span className="bracket">]</span>
        </div>
        <div className="gateway-status">
          QUANTUM MATRIX // ENCRYPTION AES-4096
        </div>
      </div>

      {/* Page Title */}
      <div className="tech-page-header">
        <div className="sub-tag">AVENGERS R&D LABS & TACTICAL ARSENAL</div>
        <h1 className="hero-page-title">TECHNOLOGY</h1>
        <p className="hero-page-desc">
          High-energy propulsion, molecular nanotech, quantum particle matrices, and strategic AI powering Earth's premier defense initiative.
        </p>
      </div>

      {/* Main Interactive Grid Layout */}
      <div className="tech-main-layout">
        
        {/* Left Column: Tech Selection Column */}
        <div className="tech-list-column">
          <div className="tech-items-stack">
            {TECHNOLOGY_DATA.map((item, idx) => {
              const isSelected = selectedTech.id === item.id;
              return (
                <div
                  key={item.id}
                  className={`tech-select-item ${isSelected ? 'tech-select-item-active' : ''}`}
                  onClick={() => {
                    setSelectedTech(item);
                    if (onPlayClick) onPlayClick();
                  }}
                  onMouseEnter={() => {
                    if (onPlayHover) onPlayHover();
                  }}
                  style={{ '--item-accent': item.accentColor } as React.CSSProperties}
                >
                  <div className="item-meta-top">
                    <span className="item-index">TECH // 0{idx + 1}</span>
                    <span className="item-class">{item.classification}</span>
                  </div>
                  <h3 className="item-title">{item.title}</h3>
                  <div className="item-dev">{item.developer}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: 3D Holographic Tech Viewer & Blueprints */}
        <div className="tech-viewer-column">
          <div className="tech-viewer-card">
            
            {/* Top Bar */}
            <div className="viewer-top-bar">
              <span className="viewer-id">{selectedTech.id.toUpperCase()}</span>
              <span className="viewer-status-pill">{selectedTech.status}</span>
            </div>

            {/* 3D Model / Interactive Canvas Showcase */}
            <div className="tech-3d-stage">
              <Canvas
                camera={{ position: [0, 0, 4.5], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
              >
                <ambientLight intensity={0.7} />
                <pointLight position={[5, 5, 5]} intensity={2.5} color={selectedTech.accentColor} />
                <pointLight position={[-5, -5, -3]} intensity={1.2} color="#ffffff" />
                <ArcReactor />
              </Canvas>
              <div className="tech-hologram-hud">
                <span className="hud-corner-tl" />
                <span className="hud-corner-tr" />
                <span className="hud-corner-bl" />
                <span className="hud-corner-br" />
                <div className="tech-core-label">INTERACTIVE 3D SCHEMATIC</div>
              </div>
            </div>

            {/* Specs & Description */}
            <div className="tech-details-area">
              <h2 className="tech-big-title">{selectedTech.title}</h2>
              <p className="tech-desc">{selectedTech.description}</p>

              {/* Telemetry Row */}
              <div className="tech-telemetry-row">
                {selectedTech.telemetry.map((t, idx) => (
                  <div key={idx} className="telemetry-cell">
                    <span className="t-lbl">{t.label}</span>
                    <span className="t-val">{t.value}</span>
                  </div>
                ))}
              </div>

              {/* Specifications List */}
              <div className="tech-specs-box">
                <div className="specs-title">ENGINEERING SPECIFICATIONS</div>
                <ul className="specs-ul">
                  {selectedTech.specifications.map((spec, sIdx) => (
                    <li key={sIdx} className="spec-li">
                      <span className="bullet">›</span> {spec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
