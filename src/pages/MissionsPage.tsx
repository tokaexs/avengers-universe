import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Link } from 'react-router-dom';
import { MISSIONS_DATA } from '../data/missions';
import TacticalGlobe3D from '../three/TacticalGlobe3D';
import Particles from '../three/Particles';
import Button from '../components/Button';

interface MissionsPageProps {
  onPlayHover?: () => void;
  onPlayClick?: () => void;
}

export default function MissionsPage({
  onPlayHover,
  onPlayClick,
}: MissionsPageProps) {
  const [selectedMissionIdx, setSelectedMissionIdx] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);

  const currentMission = MISSIONS_DATA[selectedMissionIdx] || MISSIONS_DATA[0];

  const triggerMissionPlayback = () => {
    if (onPlayClick) onPlayClick();
    setIsSimulating(true);
    setTimeout(() => setIsSimulating(false), 2400);
  };

  return (
    <div
      className="missions-control-page"
      style={{
        '--mission-accent': currentMission.accentColor,
      } as React.CSSProperties}
    >
      {/* Background Volumetric War Room Lighting */}
      <div className="archive-bg-ambient mission-bg" />

      {/* Top Header HUD */}
      <div className="stark-header-hud">
        <div className="breadcrumb-box">
          <Link to="/" className="back-link" onClick={onPlayClick} onMouseEnter={onPlayHover}>
            ← COMMAND ARCHIVE
          </Link>
          <span className="sep-slash">//</span>
          <span className="current-sub">S.H.I.E.L.D. STRATEGIC MISSION CONTROL // WAR ROOM OVERWATCH</span>
        </div>
        <div className="stark-telemetry-tag">
          MISSION STATUS: {currentMission.status} // CODE {currentMission.missionCode}
        </div>
      </div>

      {/* Main War Room Grid */}
      <div className="missions-stage-layout">
        
        {/* Left Column: Tactical Mission Roster */}
        <div className="missions-left-col">
          <div className="mission-header-meta">
            <span className="mission-pill-tag">GLOBAL DEPLOYMENTS</span>
            <h1 className="mission-giant-title">MISSION CONTROL</h1>
            <p className="mission-lead-text">
              Tactical after-action reports, planetary coordinates, casualty mitigation data, and hero deployment logs for historic Avengers engagements.
            </p>
          </div>

          <div className="missions-select-stack">
            {MISSIONS_DATA.map((mission, idx) => {
              const isSelected = selectedMissionIdx === idx;
              return (
                <div
                  key={mission.id}
                  className={`mission-select-card ${isSelected ? 'mission-select-card-active' : ''}`}
                  onClick={() => {
                    setSelectedMissionIdx(idx);
                    if (onPlayClick) onPlayClick();
                  }}
                  onMouseEnter={onPlayHover}
                >
                  <div className="m-card-top">
                    <span className="m-code">{mission.missionCode}</span>
                    <span className={`m-status m-status-${mission.status.toLowerCase()}`}>{mission.status}</span>
                  </div>
                  <h3 className="m-title">{mission.codename}</h3>
                  <div className="m-loc">{mission.location} • {mission.year}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Center: 3D Tactical Globe & Satellite Radar */}
        <div className="missions-center-3d">
          <Canvas camera={{ position: [0, 0, 4.2], fov: 42 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.4} />
              <directionalLight position={[4, 5, 4]} color={currentMission.accentColor} intensity={2.0} />
              <directionalLight position={[-4, -3, -2]} color="#ffffff" intensity={1.5} />
              <TacticalGlobe3D accentColor={currentMission.accentColor} isSimulating={isSimulating} />
              <Particles />
              <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.7} minPolarAngle={Math.PI / 2.5} />
            </Suspense>
          </Canvas>

          {/* Action Trigger */}
          <div className="stage-controls-overlay">
            <Button
              variant="primary"
              onClick={triggerMissionPlayback}
              onHoverSound={onPlayHover}
              className="action-btn mission-btn"
            >
              {isSimulating ? '⚡ SIMULATING TACTICAL FLIGHT PATHS' : '▶ SIMULATE DEPLOYMENT TRAJECTORY'}
            </Button>
          </div>
        </div>

        {/* Right Column: Mission Briefing & Deployed Operatives */}
        <div className="missions-right-col">
          <div className="specs-card">
            <div className="spec-tag">MISSION BRIEFING & OUTCOME</div>
            <div className="mission-threat-tag"><strong>PRIMARY THREAT:</strong> {currentMission.threat}</div>
            <p className="mission-brief-text">{currentMission.briefing}</p>
            <div className="mission-outcome-box">
              <span className="outcome-lbl">STRATEGIC OUTCOME:</span>
              <p className="outcome-txt">{currentMission.outcome}</p>
            </div>
          </div>

          <div className="gear-specs-card">
            <div className="spec-tag">AVENGERS DEPLOYED ({currentMission.avengersInvolved.length})</div>
            <div className="operatives-tag-grid">
              {currentMission.avengersInvolved.map((hero, hIdx) => (
                <span key={hIdx} className="operative-pill">› {hero}</span>
              ))}
            </div>
          </div>

          <div className="specs-card">
            <div className="spec-tag">TACTICAL METRICS</div>
            {currentMission.metrics.map((met, mIdx) => (
              <div key={mIdx} className="stat-row">
                <span className="s-lbl">{met.label}</span>
                <span className="s-val">{met.value}</span>
              </div>
            ))}
          </div>

          <div className="status-badge-bar">
            <span className="status-dot" style={{ background: currentMission.accentColor, boxShadow: `0 0 10px ${currentMission.accentColor}` }} />
            <span className="status-txt">S.H.I.E.L.D. SECURE LOG // LEVEL 10</span>
          </div>
        </div>

      </div>
    </div>
  );
}
