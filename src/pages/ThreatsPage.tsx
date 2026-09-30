import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Link } from 'react-router-dom';
import { THREATS_DATA } from '../data/threats';
import UltronCore3D from '../three/UltronCore3D';
import ThanosGauntlet3D from '../three/ThanosGauntlet3D';
import KangCitadel3D from '../three/KangCitadel3D';
import Particles from '../three/Particles';

interface ThreatsPageProps {
  onPlayHover?: () => void;
  onPlayClick?: () => void;
}

export default function ThreatsPage({
  onPlayHover,
  onPlayClick,
}: ThreatsPageProps) {
  const [activeThreat, setActiveThreat] = useState(THREATS_DATA[0]);

  const renderThreat3D = () => {
    switch (activeThreat.id) {
      case 'ultron':
        return <UltronCore3D />;
      case 'thanos':
        return <ThanosGauntlet3D />;
      case 'kang':
        return <KangCitadel3D />;
      default:
        return <UltronCore3D />;
    }
  };

  return (
    <div
      className="threats-overview-page"
      style={{
        '--threat-accent': activeThreat.accentColor,
        '--threat-glow': activeThreat.glowColor,
      } as React.CSSProperties}
    >
      {/* Background Volumetric Threat Aura */}
      <div
        className="threat-bg-ambient"
        style={{
          background: `radial-gradient(circle at 75% 45%, ${activeThreat.glowColor} 0%, transparent 65%)`,
        }}
      />

      {/* Top Header HUD */}
      <div className="stark-header-hud">
        <div className="breadcrumb-box">
          <span className="brand-flag">S.H.I.E.L.D. OMEGA THREAT DATABASE</span>
          <span className="sep-slash">//</span>
          <span className="current-sub">GLOBAL DEFENSE ARCHIVE // SECURITY LEVEL: OMEGA</span>
        </div>
        <div className="stark-telemetry-tag">
          THREAT STATUS: {activeThreat.threatTier} // DOSSIER #{activeThreat.threatNumber}
        </div>
      </div>

      {/* Main Grid Stage */}
      <div className="threats-stage-layout">
        
        {/* Left Column: Threat Roster List */}
        <div className="threats-left-col">
          <div className="threat-header-meta">
            <span className="threat-badge-pill">OMEGA HAZARD REGISTRY</span>
            <h1 className="threat-giant-title">GLOBAL THREATS</h1>
            <p className="threat-lead-text">
              Classified intelligence dossiers on existential entities, rogue artificial intelligence, cosmic warlords, and multiversal conquerors.
            </p>
          </div>

          <div className="threats-select-stack">
            {THREATS_DATA.map((threat) => {
              const isSelected = activeThreat.id === threat.id;
              return (
                <div
                  key={threat.id}
                  className={`threat-select-card ${isSelected ? 'threat-select-card-active' : ''}`}
                  onMouseEnter={() => {
                    setActiveThreat(threat);
                    if (onPlayHover) onPlayHover();
                  }}
                  onClick={() => {
                    setActiveThreat(threat);
                    if (onPlayClick) onPlayClick();
                  }}
                >
                  <div className="t-card-top">
                    <span className="t-num">{threat.threatNumber}</span>
                    <span className="t-tier">{threat.threatTier}</span>
                  </div>
                  <h3 className="t-name">{threat.codename}</h3>
                  <div className="t-moniker">{threat.moniker}</div>
                  <Link
                    to={`/threats/${threat.id}`}
                    className="t-dossier-link"
                    onClick={onPlayClick}
                    onMouseEnter={onPlayHover}
                  >
                    FULL DOSSIER →
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* Center/Right: 3D Threat Model Stage & Tactical Profile */}
        <div className="threats-preview-viewport">
          
          {/* 3D Threat Artifact */}
          <div className="threat-3d-hologram-stage">
            <Canvas camera={{ position: [0, 0, 4.2], fov: 42 }}>
              <Suspense fallback={null}>
                <ambientLight intensity={0.4} />
                <directionalLight position={[4, 5, 4]} color={activeThreat.accentColor} intensity={2.0} />
                <directionalLight position={[-4, -3, -2]} color="#ffffff" intensity={1.5} />
                {renderThreat3D()}
                <Particles />
                <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.7} minPolarAngle={Math.PI / 2.5} />
              </Suspense>
            </Canvas>
          </div>

          {/* Tactical Dossier Details */}
          <div className="threat-dossier-card">
            <div className="t-dossier-top">
              <span className="t-dossier-id">{activeThreat.threatNumber} // {activeThreat.classification}</span>
              <span className="t-status-tag">{activeThreat.threatTier}</span>
            </div>

            <h2 className="t-dossier-title">{activeThreat.codename}</h2>
            <div className="t-dossier-origin">{activeThreat.origin}</div>
            <p className="t-dossier-quote">"{activeThreat.quote}"</p>
            <p className="t-dossier-briefing">{activeThreat.briefing}</p>

            <div className="t-metrics-grid">
              {activeThreat.metrics.map((m, mIdx) => (
                <div key={mIdx} className="t-metric-cell">
                  <span className="m-lbl">{m.label}</span>
                  <span className="m-val">{m.value}</span>
                </div>
              ))}
            </div>

            <Link
              to={`/threats/${activeThreat.id}`}
              className="t-launch-btn"
              onClick={onPlayClick}
              onMouseEnter={onPlayHover}
            >
              INSPECT {activeThreat.codename} ARCHIVE →
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
