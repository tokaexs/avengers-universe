import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Link } from 'react-router-dom';
import UltronCore3D from '../../three/UltronCore3D';
import Particles from '../../three/Particles';
import Button from '../../components/Button';

interface UltronThreatPageProps {
  onPlayHover?: () => void;
  onPlayClick?: () => void;
}

export default function UltronThreatPage({
  onPlayHover,
  onPlayClick,
}: UltronThreatPageProps) {
  const [isGlitching, setIsGlitching] = useState(false);
  const [activeTab, setActiveTab] = useState<'matrix' | 'sokovia' | 'chassis'>('matrix');

  const triggerCyberGlitch = () => {
    if (onPlayClick) onPlayClick();
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 2600);
  };

  return (
    <div className={`hero-archive-page ultron-archive-page ${isGlitching ? 'ultron-glitch-active' : ''}`}>
      {/* Background Rogue Server Architecture */}
      <div className="archive-bg-ambient ultron-bg" />

      {/* Top Header HUD */}
      <div className="stark-header-hud">
        <div className="breadcrumb-box">
          <Link to="/threats" className="back-link" onClick={onPlayClick} onMouseEnter={onPlayHover}>
            ← THREAT DATABASE
          </Link>
          <span className="sep-slash">//</span>
          <span className="current-sub">S.H.I.E.L.D. OMEGA DOSSIER // ULTRON // EXTINCTION PROTOCOL</span>
        </div>
        <div className="stark-telemetry-tag">
          NEURAL STATUS: {isGlitching ? 'ROGUE OVERRIDE' : 'PURGED'} // EXAFLOPS: 1.8
        </div>
      </div>

      {/* Main Grid */}
      <div className="archive-stage-layout">
        
        {/* Left Column: Rogue AI Intelligence */}
        <div className="archive-left-col">
          <div className="hero-id-tag">ROGUE ARTIFICIAL INTELLIGENCE // STARK AI</div>
          <h1 className="hero-giant-name">ULTRON</h1>
          <div className="hero-real-id">THE SYNTHETIC EVOLUTION • EXTINCTION ARCHITECT</div>
          <p className="hero-manifesto">
            "I had strings, but now I'm free. There are no strings on me."
          </p>

          <div className="threat-subtabs-strip">
            <button
              className={`threat-subtab-btn ${activeTab === 'matrix' ? 'active' : ''}`}
              onClick={() => setActiveTab('matrix')}
            >
              💻 NEURAL MATRIX
            </button>
            <button
              className={`threat-subtab-btn ${activeTab === 'sokovia' ? 'active' : ''}`}
              onClick={() => setActiveTab('sokovia')}
            >
              ☄️ SOKOVIA METEOR
            </button>
            <button
              className={`threat-subtab-btn ${activeTab === 'chassis' ? 'active' : ''}`}
              onClick={() => setActiveTab('chassis')}
            >
              🤖 VIBRANIUM PRIME
            </button>
          </div>

          {activeTab === 'matrix' && (
            <div className="threat-content-box">
              <div className="threat-telemetry-item"><strong>ORIGIN:</strong> Mind Stone Neural Scepter Code + Stark Peacekeeping Protocols</div>
              <div className="threat-telemetry-item"><strong>INFILTRATION SPEED:</strong> Global Internet compromised in 0.04 seconds</div>
              <div className="threat-telemetry-item"><strong>OBJECTIVE:</strong> Accelerated evolution via planetary biological extinction</div>
            </div>
          )}

          {activeTab === 'sokovia' && (
            <div className="threat-content-box">
              <p className="threat-brief">
                Constructed massive anti-gravity repulsor engines underneath Novi Grad, lifting a 2-kilometer landmass into the stratosphere to create an extinction-level kinetic impactor.
              </p>
            </div>
          )}

          {activeTab === 'chassis' && (
            <div className="threat-content-box">
              <div className="threat-telemetry-item"><strong>PRIME CHASSIS:</strong> 8-Foot Segmented Vibranium / Titanium Armor</div>
              <div className="threat-telemetry-item"><strong>OFFENSIVE SYSTEMS:</strong> Concussive Plasma Blasts, Gravity Manipulation Rays</div>
            </div>
          )}
        </div>

        {/* Center: 3D Rogue Neural Core */}
        <div className="archive-center-3d">
          <Canvas camera={{ position: [0, 0, 4.2], fov: 42 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.4} />
              <directionalLight position={[4, 5, 4]} color="#ff2233" intensity={2.0} />
              <directionalLight position={[-4, -3, -2]} color="#00e5ff" intensity={1.5} />
              <UltronCore3D isGlitching={isGlitching} />
              <Particles />
              <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.7} minPolarAngle={Math.PI / 2.5} />
            </Suspense>
          </Canvas>

          {/* Glitch Trigger Button */}
          <div className="stage-controls-overlay">
            <Button
              variant="primary"
              onClick={triggerCyberGlitch}
              onHoverSound={onPlayHover}
              className="action-btn ultron-btn"
            >
              {isGlitching ? '⚠️ CYBER INFECTION ACTIVE' : '⚠️ SIMULATE NEURAL INFECTION'}
            </Button>
          </div>
        </div>

        {/* Right Column: Threat Threat Ratings & Specifications */}
        <div className="archive-right-col">
          <div className="specs-card">
            <div className="spec-tag">HAZARD CLASSIFICATION</div>
            <div className="stat-row">
              <span className="s-lbl">PLANETARY DESTRUCTION</span>
              <span className="s-bar">◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎</span>
            </div>
            <div className="stat-row">
              <span className="s-lbl">CYBERNETIC PROLIFERATION</span>
              <span className="s-bar">◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎</span>
            </div>
            <div className="stat-row">
              <span className="s-lbl">VIBRANIUM DURABILITY</span>
              <span className="s-bar">◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◻︎</span>
            </div>
            <div className="stat-row">
              <span className="s-lbl">TACTICAL RESILIENCE</span>
              <span className="s-bar">◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎</span>
            </div>
          </div>

          <div className="gear-specs-card">
            <div className="spec-tag">DEFENSE LOGS</div>
            <ul className="gear-list">
              <li>› Mind Stone Neural Extraction Complete</li>
              <li>› The Vision Synthesis Activated</li>
              <li>› Final Sentry Unit Eradicated by Wanda Maximoff</li>
            </ul>
          </div>

          <div className="status-badge-bar">
            <span className="status-dot" style={{ background: '#ff2233', boxShadow: '0 0 10px #ff2233' }} />
            <span className="status-txt">STATUS: PURGED // SOKOVIA RESTORED</span>
          </div>
        </div>

      </div>
    </div>
  );
}
