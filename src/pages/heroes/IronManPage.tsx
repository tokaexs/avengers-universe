import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Link } from 'react-router-dom';
import { IRON_MAN_SUITS } from '../../data/suits';
import SuitModel3D from '../../three/SuitModel3D';
import Button from '../../components/Button';

interface IronManPageProps {
  onPlayHover?: () => void;
  onPlayClick?: () => void;
}

export default function IronManPage({
  onPlayHover,
  onPlayClick,
}: IronManPageProps) {
  const [selectedSuitIndex, setSelectedSuitIndex] = useState(2); // Start at Mark III
  const [isInspecting, setIsInspecting] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  const currentSuit = IRON_MAN_SUITS[selectedSuitIndex];

  const handleSuitChange = (idx: number) => {
    if (onPlayClick) onPlayClick();
    setSelectedSuitIndex(idx);
    setActiveHotspot(null);
  };

  const toggleInspect = () => {
    if (onPlayClick) onPlayClick();
    setIsInspecting((prev) => !prev);
    setActiveHotspot(null);
  };

  return (
    <div className="stark-archive-page">
      {/* Background Ambient Reactor Aura */}
      <div
        className="stark-bg-aura"
        style={{
          background: `radial-gradient(circle at 50% 45%, ${currentSuit.accentColor === '#00e5ff' ? 'rgba(0, 229, 255, 0.18)' : 'rgba(255, 215, 0, 0.16)'} 0%, transparent 65%)`,
        }}
      />

      {/* Top Breadcrumb & Hall of Armors Header Bar */}
      <div className="stark-header-hud">
        <div className="breadcrumb-box">
          <Link to="/heroes" className="back-link" onClick={onPlayClick} onMouseEnter={onPlayHover}>
            ← HERO ARCHIVE
          </Link>
          <span className="sep-slash">//</span>
          <span className="current-sub">STARK INDUSTRIES // HALL OF ARMORS</span>
        </div>
        <div className="stark-telemetry-tag">
          F.R.I.D.A.Y. ARMOR MATRIX // ONLINE
        </div>
      </div>

      {/* Main Armor Stage Layout */}
      <div className="stark-armor-stage">
        
        {/* Left Column: Suit Model Selector Rail */}
        <div className="suit-selector-rail">
          <div className="rail-title">ARMOR ARCHIVE</div>
          <div className="suits-nav-stack">
            {IRON_MAN_SUITS.map((suit, sIdx) => {
              const isActive = selectedSuitIndex === sIdx;
              return (
                <button
                  key={suit.id}
                  className={`suit-nav-btn ${isActive ? 'suit-nav-btn-active' : ''}`}
                  onClick={() => handleSuitChange(sIdx)}
                  onMouseEnter={onPlayHover}
                >
                  <span className="suit-btn-model">{suit.model}</span>
                  <span className="suit-btn-name">{suit.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Center Stage: 3D Floating Suit Experience */}
        <div className="suit-3d-stage">
          <Canvas
            camera={{ position: [0, 0, 4.2], fov: 42 }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: true }}
          >
            <Suspense fallback={null}>
              <ambientLight intensity={0.3} />
              <directionalLight position={[4, 6, 4]} color="#ffffff" intensity={1.8} />
              <directionalLight position={[-4, -3, -2]} color="#00e5ff" intensity={1.2} />
              <SuitModel3D suit={currentSuit} isInspecting={isInspecting} />
              {isInspecting && <OrbitControls enableZoom={false} enablePan={false} />}
            </Suspense>
          </Canvas>

          {/* Center Inspect Action Pill */}
          <div className="stage-controls-overlay">
            <Button
              variant={isInspecting ? 'secondary' : 'primary'}
              onClick={toggleInspect}
              onHoverSound={onPlayHover}
              className="inspect-toggle-btn"
            >
              {isInspecting ? '✕ EXIT INSPECTION' : '🔍 INSPECT ARMOR'}
            </Button>
          </div>

          {/* Interactive Inspection Hotspots when Inspecting */}
          {isInspecting && (
            <div className="hotspots-overlay-container">
              <div className="hotspots-title">DIAGNOSTIC TELEMETRY HOTSPOTS:</div>
              <div className="hotspots-chips-row">
                {currentSuit.hotspots.map((hs, hIdx) => {
                  const isSelected = activeHotspot === hIdx;
                  return (
                    <button
                      key={hIdx}
                      className={`hotspot-chip ${isSelected ? 'hotspot-chip-active' : ''}`}
                      onClick={() => {
                        setActiveHotspot(isSelected ? null : hIdx);
                        if (onPlayClick) onPlayClick();
                      }}
                      onMouseEnter={onPlayHover}
                    >
                      <span className="hs-dot" />
                      <span className="hs-name">{hs.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Hotspot Detailed Information Drawer */}
              {activeHotspot !== null && (
                <div className="hotspot-detail-box">
                  <div className="hs-detail-header">
                    <span className="hs-detail-title">{currentSuit.hotspots[activeHotspot].name}</span>
                    <span className="hs-detail-tel">{currentSuit.hotspots[activeHotspot].telemetry}</span>
                  </div>
                  <p className="hs-detail-desc">{currentSuit.hotspots[activeHotspot].description}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column: Dynamic Technical Specifications HUD */}
        <div className="suit-specs-panel">
          
          <div className="specs-header-row">
            <span className="suit-model-giant">{currentSuit.model}</span>
            <span className="suit-era-tag">{currentSuit.era}</span>
          </div>

          <h2 className="suit-name-title">{currentSuit.name}</h2>
          <div className="suit-designation">{currentSuit.designation}</div>

          <p className="suit-briefing-desc">{currentSuit.description}</p>

          {/* Visual Stat Meters */}
          <div className="stat-meters-card">
            <div className="stat-meter-row">
              <span className="stat-name">ARMOR INTEGRITY</span>
              <div className="stat-track"><div className="stat-fill" style={{ width: `${currentSuit.stats.armor}%` }} /></div>
              <span className="stat-val">{currentSuit.stats.armor}%</span>
            </div>
            <div className="stat-meter-row">
              <span className="stat-name">ARC CORE POWER</span>
              <div className="stat-track"><div className="stat-fill" style={{ width: `${currentSuit.stats.power}%` }} /></div>
              <span className="stat-val">{currentSuit.stats.power}%</span>
            </div>
            <div className="stat-meter-row">
              <span className="stat-name">AERIAL MOBILITY</span>
              <div className="stat-track"><div className="stat-fill" style={{ width: `${currentSuit.stats.mobility}%` }} /></div>
              <span className="stat-val">{currentSuit.stats.mobility}%</span>
            </div>
            <div className="stat-meter-row">
              <span className="stat-name">WEAPON SYSTEMS</span>
              <div className="stat-track"><div className="stat-fill" style={{ width: `${currentSuit.stats.weapons}%` }} /></div>
              <span className="stat-val">{currentSuit.stats.weapons}%</span>
            </div>
          </div>

          {/* Technical Telemetry Grid */}
          <div className="suit-tech-grid">
            <div className="tech-box">
              <span className="tech-label">POWER SOURCE</span>
              <span className="tech-value">{currentSuit.power}</span>
            </div>
            <div className="tech-box">
              <span className="tech-label">PROPULSION</span>
              <span className="tech-value">{currentSuit.propulsion}</span>
            </div>
          </div>

          {/* Weapon Loadout Tags */}
          <div className="weapons-loadout-box">
            <span className="loadout-title">ASSIGNED ARMAMENT:</span>
            <div className="weapons-tags-list">
              {currentSuit.weaponSystems.map((w, wIdx) => (
                <span key={wIdx} className="weapon-tag-pill">
                  ⚡ {w}
                </span>
              ))}
            </div>
          </div>

          {/* Status Bar */}
          <div className="suit-status-bar">
            <span className="status-indicator-dot" />
            <span className="status-label">{currentSuit.status}</span>
          </div>

        </div>

      </div>
    </div>
  );
}
