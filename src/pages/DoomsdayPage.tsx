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
  // Cinematic Timeline Sequence:
  // Step 0: Blackout initial entrance (0ms)
  // Step 1: "AVENGERS INITIATIVE / ARCHIVE STATUS // CLASSIFIED" (1000ms)
  // Step 2: "SYSTEM WARNING / THREAT SIGNATURE DETECTED" (2800ms)
  // Step 3: Brief blackout & glitch pulse (4600ms)
  // Step 4: Theatrical reveal of Avengers: Doomsday Image (5600ms)
  // Step 5: "DOOMSDAY" & "COMING SOON..." fade in (7000ms)
  // Step 6: "THE AVENGERS WILL RETURN" & "CLASSIFIED // 000" (9000ms)
  const [sequenceStep, setSequenceStep] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const t1 = setTimeout(() => setSequenceStep(1), 1000);
    const t2 = setTimeout(() => setSequenceStep(2), 2800);
    const t3 = setTimeout(() => setSequenceStep(3), 4600);
    const t4 = setTimeout(() => setSequenceStep(4), 5600);
    const t5 = setTimeout(() => setSequenceStep(5), 7200);
    const t6 = setTimeout(() => setSequenceStep(6), 9200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
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
      {/* 3D Atmospheric Depth & Floating Ash Motes */}
      <div className="doomsday-canvas-container">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ antialias: true, alpha: true }}>
          <Particles />
          <DoomsdayScene3D />
        </Canvas>
      </div>

      {/* Atmospheric Fog, Vignette & Film Grain */}
      <div className="doomsday-fog-overlay" />
      <div
        className="doomsday-torch-light"
        style={{
          transform: `translate(${mousePos.x * 40}px, ${mousePos.y * 40}px)`,
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
              <div className="sys-status">ARCHIVE STATUS // <span className="green-text">CLASSIFIED</span></div>
            </div>
          )}

          {sequenceStep === 2 && (
            <div className="intro-text-block warning-glitch">
              <div className="danger-tag">[ SYSTEM WARNING ]</div>
              <h2 className="danger-title">THREAT SIGNATURE DETECTED</h2>
              <div className="danger-sub">CALCULATING LATVIAN INCURSION SIGNATURE...</div>
            </div>
          )}

          {sequenceStep === 3 && (
            <div className="glitch-blackout" />
          )}
        </div>
      )}

      {/* Stage 4+: Theatrical Reveal of the Provided Image */}
      {sequenceStep >= 4 && (
        <div className="doomsday-theatre-reveal fade-in-dramatic">
          
          {/* Subtle Classification Tag */}
          <div className="doomsday-stage-header">
            <span className="doomsday-classification-tag">CLASSIFIED // LEVEL 10 EYES ONLY</span>
          </div>

          {/* Primary Cinematic Asset: The Provided Avengers: Doomsday Image */}
          <div
            className="doomsday-poster-wrapper"
            style={{
              transform: `translate3d(${mousePos.x * -12}px, ${mousePos.y * -12}px, 0)`,
            }}
          >
            <div className="doomsday-backlight-aura" />
            <img
              src="/assets/avengers-emblem.png"
              alt="Avengers: Doomsday"
              className="doomsday-hero-image-asset"
            />
          </div>

          {/* Doomsday Typography Sequence */}
          {sequenceStep >= 5 && (
            <div
              className="doomsday-text-group fade-in-up"
              style={{
                transform: `translate3d(${mousePos.x * -6}px, ${mousePos.y * -6}px, 0)`,
              }}
            >
              <h1 className="doomsday-wordmark">DOOMSDAY</h1>
              <div className="doomsday-coming-soon">COMING SOON...</div>
            </div>
          )}

          {/* Final Return & Archive Tag */}
          {sequenceStep >= 6 && (
            <div className="doomsday-final-credits fade-in-slow">
              <div className="avengers-will-return">THE AVENGERS WILL RETURN</div>
              <div className="doomsday-classified-zero">CLASSIFIED // 000</div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
