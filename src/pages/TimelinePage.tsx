import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Link } from 'react-router-dom';
import { TIMELINE_EVENTS } from '../data/timeline';
import TimelineRings3D from '../three/TimelineRings3D';
import Particles from '../three/Particles';
import Button from '../components/Button';

interface TimelinePageProps {
  onPlayHover?: () => void;
  onPlayClick?: () => void;
}

export default function TimelinePage({
  onPlayHover,
  onPlayClick,
}: TimelinePageProps) {
  const [activeEraIdx, setActiveEraIdx] = useState(1); // Start at 2012 Battle of New York
  const [isPlayingIncident, setIsPlayingIncident] = useState(false);

  const currentEvent = TIMELINE_EVENTS[activeEraIdx] || TIMELINE_EVENTS[0];

  const handleNextEra = () => {
    const nextIdx = (activeEraIdx + 1) % TIMELINE_EVENTS.length;
    setActiveEraIdx(nextIdx);
    if (onPlayClick) onPlayClick();
  };

  const handlePrevEra = () => {
    const prevIdx = (activeEraIdx - 1 + TIMELINE_EVENTS.length) % TIMELINE_EVENTS.length;
    setActiveEraIdx(prevIdx);
    if (onPlayClick) onPlayClick();
  };

  const triggerIncidentPlayback = () => {
    if (onPlayClick) onPlayClick();
    setIsPlayingIncident(true);
    setTimeout(() => setIsPlayingIncident(false), 2400);
  };

  return (
    <div
      className="timeline-spatial-page"
      style={{
        '--era-accent': currentEvent.accentColor,
        '--era-glow': currentEvent.glowColor,
      } as React.CSSProperties}
    >
      {/* Background Volumetric Temporal Fog */}
      <div className="archive-bg-ambient timeline-bg" />

      {/* Top Header Breadcrumb HUD */}
      <div className="stark-header-hud">
        <div className="breadcrumb-box">
          <Link to="/" className="back-link" onClick={onPlayClick} onMouseEnter={onPlayHover}>
            ← COMMAND ARCHIVE
          </Link>
          <span className="sep-slash">//</span>
          <span className="current-sub">SACRED TIMELINE CHRONOLOGY // TVA CLASSIFICATION #616</span>
        </div>
        <div className="stark-telemetry-tag">
          BRANCH STABILITY: 99.8% // TEMPORAL ANCHOR {currentEvent.year}
        </div>
      </div>

      {/* Main Spatial Stage */}
      <div className="timeline-stage-layout">
        
        {/* Left Column: Era Dossier & Historical Briefing */}
        <div className="timeline-left-col">
          <div className="era-id-pill">{currentEvent.year} // {currentEvent.era}</div>
          <h1 className="era-giant-title">{currentEvent.title}</h1>
          <div className="era-subtitle">{currentEvent.subtitle} • {currentEvent.location}</div>
          <p className="era-description">{currentEvent.description}</p>

          <div className="era-stats-grid">
            {currentEvent.stats.map((st, sIdx) => (
              <div key={sIdx} className="era-stat-card">
                <span className="st-lbl">{st.label}</span>
                <span className="st-val">{st.value}</span>
              </div>
            ))}
          </div>

          <div className="era-controls-bar">
            <Button
              variant="secondary"
              onClick={handlePrevEra}
              onHoverSound={onPlayHover}
              className="ctrl-btn"
            >
              ← PREV ERA
            </Button>
            <Button
              variant="primary"
              onClick={triggerIncidentPlayback}
              onHoverSound={onPlayHover}
              className="ctrl-btn"
            >
              {isPlayingIncident ? '⚡ PLAYING INCIDENT SIMULATION' : '▶ SIMULATE INCIDENT'}
            </Button>
            <Button
              variant="secondary"
              onClick={handleNextEra}
              onHoverSound={onPlayHover}
              className="ctrl-btn"
            >
              NEXT ERA →
            </Button>
          </div>
        </div>

        {/* Center/Right: 3D Spatial Quantum Timeline Viewer */}
        <div className="timeline-center-3d">
          <Canvas camera={{ position: [0, 0, 4.4], fov: 42 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.4} />
              <directionalLight position={[4, 5, 4]} color={currentEvent.accentColor} intensity={2.0} />
              <directionalLight position={[-4, -3, -2]} color="#ffffff" intensity={1.5} />
              <TimelineRings3D activeEraIdx={activeEraIdx} />
              <Particles />
              <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.7} minPolarAngle={Math.PI / 2.5} />
            </Suspense>
          </Canvas>

          {/* Environmental Floating Watermark */}
          <div className="timeline-spatial-watermark">
            <span>{currentEvent.year}</span>
          </div>
        </div>

      </div>

      {/* Bottom Horizontal Era Scrubber */}
      <div className="timeline-bottom-scrubber">
        <div className="scrubber-track">
          {TIMELINE_EVENTS.map((ev, idx) => {
            const isActive = activeEraIdx === idx;
            return (
              <button
                key={ev.id}
                className={`scrubber-node ${isActive ? 'scrubber-node-active' : ''}`}
                onClick={() => {
                  setActiveEraIdx(idx);
                  if (onPlayClick) onPlayClick();
                }}
                onMouseEnter={onPlayHover}
              >
                <span className="node-year">{ev.year}</span>
                <span className="node-title">{ev.title}</span>
                <span className="node-dot" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
