import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Link } from 'react-router-dom';
import KangCitadel3D from '../../three/KangCitadel3D';
import Particles from '../../three/Particles';
import Button from '../../components/Button';

interface KangThreatPageProps {
  onPlayHover?: () => void;
  onPlayClick?: () => void;
}

const VARIANTS = [
  { name: 'HE WHO REMAINS', era: 'CITADEL AT THE END OF TIME', desc: 'Preserved the Sacred Timeline to isolate universe 616 from catastrophic multiversal war.' },
  { name: 'KANG THE CONQUEROR', era: 'QUANTUM REALM REALM EMPIRE', desc: 'Exiled conqueror equipped with 31st-century neuro-kinetic armor and Chrono-sphere ship.' },
  { name: 'VICTOR TIMELY', era: '1893 CHICAGO WORLD FAIR', desc: 'Temporal divergent inventor who pioneered the prototype Temporal Loom.' },
  { name: 'PHARAOH RAMA-TUT', era: 'ANCIENT EGYPT 2942 BC', desc: 'Time-traveling ruler armed with ultra-sonic stun staves and solar-powered Sphinx vessel.' },
];

export default function KangThreatPage({
  onPlayHover,
  onPlayClick,
}: KangThreatPageProps) {
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(1);
  const [isWarping, setIsWarping] = useState(false);

  const triggerChronoWarp = () => {
    if (onPlayClick) onPlayClick();
    setIsWarping(true);
    setTimeout(() => setIsWarping(false), 2600);
  };

  const activeVariant = VARIANTS[selectedVariantIdx];

  return (
    <div className={`hero-archive-page kang-archive-page ${isWarping ? 'kang-warp-active' : ''}`}>
      {/* Background Temporal Distortion Aura */}
      <div className="archive-bg-ambient kang-bg" />

      {/* Top Header HUD */}
      <div className="stark-header-hud">
        <div className="breadcrumb-box">
          <Link to="/threats" className="back-link" onClick={onPlayClick} onMouseEnter={onPlayHover}>
            ← THREAT DATABASE
          </Link>
          <span className="sep-slash">//</span>
          <span className="current-sub">MULTIVERSAL CHRONO-THREAT // KANG // THE CONQUEROR</span>
        </div>
        <div className="stark-telemetry-tag">
          MULTIVERSE STATUS: INCURSION ACTIVE // VARIANTS: INFINITE
        </div>
      </div>

      {/* Main Grid */}
      <div className="archive-stage-layout">
        
        {/* Left Column: Multiversal Conqueror Dossier */}
        <div className="archive-left-col">
          <div className="hero-id-tag">31ST CENTURY // COUNCIL OF KANGS</div>
          <h1 className="hero-giant-name">KANG</h1>
          <div className="hero-real-id">NATHANIEL RICHARDS • MASTER OF THE MULTIVERSE</div>
          <p className="hero-manifesto">
            "I have lived a thousand lives. I have fought an infinite number of you. You think you can stop time itself?"
          </p>

          <div className="kang-variants-box">
            <div className="variants-header-tag">COUNCIL OF KANGS // TIMELINE VARIANTS:</div>
            <div className="variants-strip">
              {VARIANTS.map((v, vIdx) => (
                <button
                  key={vIdx}
                  className={`variant-chip-btn ${selectedVariantIdx === vIdx ? 'variant-chip-active' : ''}`}
                  onClick={() => {
                    setSelectedVariantIdx(vIdx);
                    if (onPlayClick) onPlayClick();
                  }}
                  onMouseEnter={onPlayHover}
                >
                  {v.name.split(' ')[0]}
                </button>
              ))}
            </div>

            <div className="variant-info-card">
              <div className="var-era">{activeVariant.era}</div>
              <h3 className="var-name">{activeVariant.name}</h3>
              <p className="var-desc">{activeVariant.desc}</p>
            </div>
          </div>
        </div>

        {/* Center: 3D Chrono Citadel */}
        <div className="archive-center-3d">
          <Canvas camera={{ position: [0, 0, 4.4], fov: 42 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.4} />
              <directionalLight position={[4, 5, 4]} color="#00ffaa" intensity={2.0} />
              <directionalLight position={[-4, -3, -2]} color="#0088ff" intensity={1.8} />
              <KangCitadel3D isWarping={isWarping} />
              <Particles />
              <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.7} minPolarAngle={Math.PI / 2.5} />
            </Suspense>
          </Canvas>

          {/* Chrono Warp Trigger Button */}
          <div className="stage-controls-overlay">
            <Button
              variant="primary"
              onClick={triggerChronoWarp}
              onHoverSound={onPlayHover}
              className="action-btn kang-btn"
            >
              {isWarping ? '⚡ TIMELINE FRACTURE ACTIVE' : '⚡ TRIGGER MULTIVERSAL WARP'}
            </Button>
          </div>
        </div>

        {/* Right Column: Multiversal Threat Ratings & Tech */}
        <div className="archive-right-col">
          <div className="specs-card">
            <div className="spec-tag">MULTIVERSAL THREAT RATINGS</div>
            <div className="stat-row">
              <span className="s-lbl">CHRONO-MANIPULATION</span>
              <span className="s-bar">◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎</span>
            </div>
            <div className="stat-row">
              <span className="s-lbl">MULTIVERSE REPLICATION</span>
              <span className="s-bar">◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎</span>
            </div>
            <div className="stat-row">
              <span className="s-lbl">31ST CENTURY ARMAMENTS</span>
              <span className="s-bar">◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎</span>
            </div>
            <div className="stat-row">
              <span className="s-lbl">QUANTUM MOBILITY</span>
              <span className="s-bar">◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎</span>
            </div>
          </div>

          <div className="gear-specs-card">
            <div className="spec-tag">CHRONO-ARSENAL</div>
            <ul className="gear-list">
              <li>› Neuro-Kinetic 31st-Century Battle Armor</li>
              <li>› Time-Chair Multiversal Displacement Engine</li>
              <li>› Quantum Chrono-Sphere Reality Core</li>
              <li>› Multiversal Fleet of Time-Dilation Cruisers</li>
            </ul>
          </div>

          <div className="status-badge-bar">
            <span className="status-dot" style={{ background: '#00ffaa', boxShadow: '0 0 10px #00ffaa' }} />
            <span className="status-txt">STATUS: QUANTUM INVASION ACTIVE</span>
          </div>
        </div>

      </div>
    </div>
  );
}
