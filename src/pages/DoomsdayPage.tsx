import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Link } from 'react-router-dom';
import DoomsdayScene3D from '../three/DoomsdayScene3D';
import Particles from '../three/Particles';

interface DoomsdayPageProps {
  onPlayHover?: () => void;
  onPlayClick?: () => void;
}

export default function DoomsdayPage({
  onPlayHover,
  onPlayClick,
}: DoomsdayPageProps) {
  // Cinematic timeline step: 0: blackout init, 1: status prompt, 2: threat warning, 3: glitch, 4: poster reveal
  const [sequenceStep, setSequenceStep] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Step 0: Fade to black on route enter (0ms)
    // Step 1: Status prompt appears (1000ms)
    const t1 = setTimeout(() => setSequenceStep(1), 800);
    // Step 2: "A NEW THREAT HAS BEEN DETECTED" (2600ms)
    const t2 = setTimeout(() => setSequenceStep(2), 2600);
    // Step 3: Brief Glitch & Black screen (4200ms)
    const t3 = setTimeout(() => setSequenceStep(3), 4400);
    // Step 4: Poster Reveal (5200ms)
    const t4 = setTimeout(() => setSequenceStep(4), 5400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth - 0.5) * 2;
    const y = (e.clientY / innerHeight - 0.5) * 2;
    setMousePos({ x, y });
  };

  return (
    <div
      className="doomsday-postcredit-experience"
      onMouseMove={handleMouseMove}
      style={{
        '--mouse-x': mousePos.x,
        '--mouse-y': mousePos.y,
      } as React.CSSProperties}
    >
      {/* 3D Atmospheric Background */}
      <div className="doomsday-canvas-container">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ antialias: true, alpha: true }}>
          <Particles />
          <DoomsdayScene3D />
        </Canvas>
      </div>

      {/* Atmospheric Fog & Dark Energy Overlays */}
      <div className="doomsday-fog-overlay" />
      <div
        className="doomsday-torch-light"
        style={{
          transform: `translate(${mousePos.x * 60}px, ${mousePos.y * 60}px)`,
        }}
      />
      <div className="doomsday-film-grain" />

      {/* Minimal Return Link */}
      <div className="doomsday-return-nav">
        <Link
          to="/"
          className="doomsday-home-link"
          onClick={onPlayClick}
          onMouseEnter={onPlayHover}
        >
          ‹ RETURN TO COMMAND
        </Link>
      </div>

      {/* Cinematic Opening Sequence */}
      {sequenceStep < 4 && (
        <div className={`doomsday-intro-sequence step-${sequenceStep}`}>
          {sequenceStep === 1 && (
            <div className="intro-text-block fade-in-up">
              <div className="sys-label">AVENGERS INITIATIVE</div>
              <div className="sys-status">ARCHIVE STATUS: <span className="green-text">ACTIVE</span></div>
            </div>
          )}

          {sequenceStep === 2 && (
            <div className="intro-text-block warning-glitch">
              <div className="danger-tag">[ EMERGENCY PROTOCOL 000 ]</div>
              <h2 className="danger-title">A NEW THREAT HAS BEEN DETECTED</h2>
              <div className="danger-sub">CALCULATING MULTIVERSAL INCURSION COORDINATES...</div>
            </div>
          )}

          {sequenceStep === 3 && (
            <div className="glitch-blackout" />
          )}
        </div>
      )}

      {/* Stage 4: Massive Dark Cinematic Poster Reveal */}
      {sequenceStep >= 4 && (
        <div className="doomsday-poster-stage fade-in-dramatic">
          
          <div className="poster-meta-top">
            <span className="poster-classification">CLASSIFIED // LEVEL 10 EYES ONLY</span>
            <span className="poster-year">PHASE 6 CLIMAX</span>
          </div>

          {/* Monumental Title with Parallax & Specular Glint */}
          <div
            className="doomsday-monumental-title"
            style={{
              transform: `translate3d(${mousePos.x * -15}px, ${mousePos.y * -15}px, 0)`,
            }}
          >
            <span className="title-prefix">AVENGERS</span>
            <h1 className="title-main">DOOMSDAY</h1>
          </div>

          <div
            className="poster-coming-soon"
            style={{
              transform: `translate3d(${mousePos.x * -8}px, ${mousePos.y * -8}px, 0)`,
            }}
          >
            COMING SOON...
          </div>

          {/* Interactive Tactical Dossier Preview */}
          <div className="poster-footer-hud">
            <div className="hud-code-bar">
              <span className="hud-dot-crimson" />
              <span className="hud-code-txt">LATVIAN ANOMALY DETECTED // DR. VICTOR VON DOOM</span>
            </div>
            <div className="hud-classified-tag">
              CLASSIFIED // 000
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
