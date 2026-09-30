import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { INITIATIVE_PROTOCOLS, TIMELINE_LOGS, type InitiativeProtocol } from '../data/initiativeData';
import ArcReactor from '../three/ArcReactor';
import Particles from '../three/Particles';
import Button from '../components/Button';

interface InitiativePageProps {
  onPlayHover?: () => void;
  onPlayClick?: () => void;
}

export default function InitiativePage({
  onPlayHover,
  onPlayClick,
}: InitiativePageProps) {
  const [selectedProtocol, setSelectedProtocol] = useState<InitiativeProtocol>(INITIATIVE_PROTOCOLS[0]);
  const [isAlertActive, setIsAlertActive] = useState(false);

  const triggerGlobalBroadcast = () => {
    if (onPlayClick) onPlayClick();
    setIsAlertActive(true);
    setTimeout(() => setIsAlertActive(false), 2400);
  };

  return (
    <div className={`initiative-command-page ${isAlertActive ? 'global-alert-active' : ''}`}>
      {/* Background Volumetric Command Glow */}
      <div className="initiative-ambient-glow" />

      {/* Top Header HUD */}
      <div className="stark-header-hud">
        <div className="breadcrumb-box">
          <span className="brand-flag">S.H.I.E.L.D. AVENGERS INITIATIVE // HIGH COMMAND</span>
          <span className="sep-slash">//</span>
          <span className="current-sub">STRATEGIC COMMAND ROOM // LEVEL 10 CLEARANCE</span>
        </div>
        <div className="stark-telemetry-tag">
          GLOBAL DEFENSE MATRIX: {isAlertActive ? 'LEVEL 10 BROADCAST' : 'ARMED & MONITORED'}
        </div>
      </div>

      {/* Main Command Room Layout */}
      <div className="initiative-stage-layout">
        
        {/* Left Column: Command Directives & Protocols */}
        <div className="initiative-left-col">
          <div className="initiative-header-area">
            <span className="sub-tag">DIRECTIVE 7-A // OMEGA ROSTER</span>
            <h1 className="hero-giant-name">THE INITIATIVE</h1>
            <p className="hero-manifesto">
              "There was an idea, to bring together a group of remarkable people, to see if we could become something more. To see if they could work together when we needed them to, to fight the battles that we never could."
            </p>
            <div className="fury-cite">— DIRECTOR NICHOLAS J. FURY</div>
          </div>

          <div className="protocols-section">
            <div className="section-small-title">STRATEGIC DEFENSE PROTOCOLS</div>
            <div className="protocols-grid">
              {INITIATIVE_PROTOCOLS.map((protocol) => {
                const isSelected = selectedProtocol.id === protocol.id;
                return (
                  <div
                    key={protocol.id}
                    className={`protocol-card ${isSelected ? 'protocol-card-active' : ''}`}
                    onClick={() => {
                      setSelectedProtocol(protocol);
                      if (onPlayClick) onPlayClick();
                    }}
                    onMouseEnter={onPlayHover}
                  >
                    <div className="protocol-card-header">
                      <span className="protocol-code">{protocol.code}</span>
                      <span className={`protocol-status status-${protocol.status.toLowerCase()}`}>
                        {protocol.status}
                      </span>
                    </div>
                    <h3 className="protocol-title">{protocol.title}</h3>
                    <p className="protocol-summary">{protocol.summary}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Center: 3D Command Energy Core */}
        <div className="initiative-center-3d">
          <Canvas camera={{ position: [0, 0, 4.4], fov: 42 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.4} />
              <directionalLight position={[4, 5, 4]} color="#00e5ff" intensity={2.0} />
              <directionalLight position={[-4, -3, -2]} color="#4d88ff" intensity={1.5} />
              <ArcReactor />
              <Particles />
              <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.7} minPolarAngle={Math.PI / 2.5} />
            </Suspense>
          </Canvas>

          {/* Broadcast Action Trigger */}
          <div className="stage-controls-overlay">
            <Button
              variant="primary"
              onClick={triggerGlobalBroadcast}
              onHoverSound={onPlayHover}
              className="action-btn"
            >
              {isAlertActive ? '🚨 GLOBAL DEFENSE ALERT BROADCASTED' : '🚨 TRANSMIT PRIORITY 1 DEFENSE BROADCAST'}
            </Button>
          </div>
        </div>

        {/* Right Column: Protocol Dossier & Timeline Logs */}
        <div className="initiative-right-col">
          <div className="specs-card">
            <div className="spec-tag">SELECTED PROTOCOL TELEMETRY</div>
            <div className="p-title-selected">{selectedProtocol.title}</div>
            <div className="p-class-selected">{selectedProtocol.classification}</div>
            <p className="p-summary-selected">{selectedProtocol.summary}</p>
            <div className="p-telem-row">
              <span className="s-lbl">TELEMETRY METRIC:</span>
              <span className="s-val">{selectedProtocol.telemetryMetric}</span>
            </div>
          </div>

          <div className="gear-specs-card">
            <div className="spec-tag">INITIATIVE DIRECTIVE TIMELINE</div>
            <div className="timeline-mini-stack">
              {TIMELINE_LOGS.map((log, idx) => (
                <div key={idx} className="t-mini-row" onMouseEnter={onPlayHover}>
                  <span className="t-mini-yr">{log.year}</span>
                  <div className="t-mini-info">
                    <strong>{log.event}</strong>
                    <p>{log.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="status-badge-bar">
            <span className="status-dot" style={{ background: '#00e5ff', boxShadow: '0 0 10px #00e5ff' }} />
            <span className="status-txt">S.H.I.E.L.D. HIGH COMMAND // ACTIVE</span>
          </div>
        </div>

      </div>
    </div>
  );
}
