import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Link } from 'react-router-dom';
import GammaCore3D from '../../three/GammaCore3D';
import Particles from '../../three/Particles';
import Button from '../../components/Button';

interface HulkPageProps {
  onPlayHover?: () => void;
  onPlayClick?: () => void;
}

type TransformState = 'banner' | 'hulk' | 'smart_hulk';

export default function HulkPage({
  onPlayHover,
  onPlayClick,
}: HulkPageProps) {
  const [transformState, setTransformState] = useState<TransformState>('hulk');
  const [isRaging, setIsRaging] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'mutation' | 'containment'>('profile');

  const triggerGammaOverload = () => {
    if (onPlayClick) onPlayClick();
    setIsRaging(true);
    setTimeout(() => setIsRaging(false), 2600);
  };

  const getProfileData = () => {
    switch (transformState) {
      case 'banner':
        return {
          title: 'DR. ROBERT BRUCE BANNER',
          class: 'LEVEL 10 BIO-PHYSICIST (7 PHDs)',
          quote: "That's my secret, Cap: I'm always angry.",
          desc: 'World renowned expert in nuclear physics, bio-chemistry, and gamma radiation. Originator of the cellular anti-radiation serum.',
          dosage: '2.5 MeV BASELINE',
          pulseRate: '72 BPM (CALM)',
          threatLevel: 'CLASS 1 (BENIGN SCIENTIST)',
        };
      case 'smart_hulk':
        return {
          title: 'PROFESSOR HULK (UNIFIED)',
          class: 'INTEGRATED SYMBIOSIS FORM',
          quote: "Eighteen months in the gamma lab. I put the brains and the brawn together.",
          desc: 'Complete neurological fusion of Banner’s intellect with the Hulk’s indestructible physical anatomy. Capable of surviving the Infinity Gauntlet snap.',
          dosage: '850 MeV CONTROLLED EMISSION',
          pulseRate: '110 BPM (BALANCED)',
          threatLevel: 'CLASS 10 (ALPHA DEFENDER)',
        };
      case 'hulk':
      default:
        return {
          title: 'THE INCREDIBLE HULK',
          class: 'GAMMA JUGGERNAUT // WORLD BREAKER',
          quote: "HULK SMASH!",
          desc: 'Unchecked kinetic colossus powered by adrenaline-catalyzed cellular mutation. Physical strength scales infinitely with emotional distress.',
          dosage: 'CRITICAL RADIATION OVERLOAD (3.4 GeV)',
          pulseRate: '240 BPM (RAGING)',
          threatLevel: 'OMEGA LEVEL EXTINCTION RISK',
        };
    }
  };

  const profile = getProfileData();

  return (
    <div className={`hero-archive-page hulk-archive-page ${isRaging ? 'hulk-gamma-rage-glitch' : ''}`}>
      {/* Background Gamma Glow Aura */}
      <div className="archive-bg-ambient hulk-bg" />

      {/* Header HUD */}
      <div className="stark-header-hud">
        <div className="breadcrumb-box">
          <Link to="/heroes" className="back-link" onClick={onPlayClick} onMouseEnter={onPlayHover}>
            ← HERO ARCHIVES
          </Link>
          <span className="sep-slash">//</span>
          <span className="current-sub">CULVER UNIVERSITY GAMMA RESEARCH FACILITY // FILE #04-GAMMA</span>
        </div>
        <div className="stark-telemetry-tag">
          CONTAINMENT PROTOCOL: {isRaging ? 'BREACH WARNING' : 'NOMINAL'} // DOSAGE {profile.dosage}
        </div>
      </div>

      {/* Main Facility Grid */}
      <div className="archive-stage-layout">
        
        {/* Left Column: Bio-Physical Dossier & State Switcher */}
        <div className="archive-left-col">
          <div className="hero-id-tag">BIO-NUCLEAR ARCHIVE // SECTOR 4</div>
          <h1 className="hero-giant-name">{profile.title}</h1>
          <div className="hero-real-id">{profile.class}</div>
          <p className="hero-manifesto">"{profile.quote}"</p>

          {/* Transformation State Selector Strip */}
          <div className="hulk-transform-strip">
            <button
              className={`hulk-state-btn ${transformState === 'banner' ? 'hulk-state-active' : ''}`}
              onClick={() => {
                setTransformState('banner');
                if (onPlayClick) onPlayClick();
              }}
              onMouseEnter={onPlayHover}
            >
              🧪 DR. BANNER
            </button>
            <button
              className={`hulk-state-btn ${transformState === 'hulk' ? 'hulk-state-active' : ''}`}
              onClick={() => {
                setTransformState('hulk');
                if (onPlayClick) onPlayClick();
              }}
              onMouseEnter={onPlayHover}
            >
              💥 THE HULK
            </button>
            <button
              className={`hulk-state-btn ${transformState === 'smart_hulk' ? 'hulk-state-active' : ''}`}
              onClick={() => {
                setTransformState('smart_hulk');
                if (onPlayClick) onPlayClick();
              }}
              onMouseEnter={onPlayHover}
            >
              🧠 PROFESSOR HULK
            </button>
          </div>

          <p className="hulk-state-desc">{profile.desc}</p>

          {/* Sub Navigation */}
          <div className="hulk-subtabs">
            <button
              className={`hulk-subtab-btn ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              ☢️ GAMMA METERS
            </button>
            <button
              className={`hulk-subtab-btn ${activeTab === 'mutation' ? 'active' : ''}`}
              onClick={() => setActiveTab('mutation')}
            >
              🧬 CELLULAR MUTATION
            </button>
            <button
              className={`hulk-subtab-btn ${activeTab === 'containment' ? 'active' : ''}`}
              onClick={() => setActiveTab('containment')}
            >
              🛡️ CONTAINMENT LOGS
            </button>
          </div>

          {activeTab === 'profile' && (
            <div className="hulk-tab-box">
              <div className="hulk-telemetry-row">
                <span>PULSE FREQUENCY:</span> <span className="green-val">{profile.pulseRate}</span>
              </div>
              <div className="hulk-telemetry-row">
                <span>GAMMA RADIANCE:</span> <span className="green-val">{profile.dosage}</span>
              </div>
              <div className="hulk-telemetry-row">
                <span>THREAT CLASS:</span> <span className="green-val">{profile.threatLevel}</span>
              </div>
            </div>
          )}

          {activeTab === 'mutation' && (
            <div className="hulk-tab-box">
              <p className="hulk-lab-note">
                Gamma ray exposure triggered epigenetic hyper-regeneration. Myostatin gene transcription is permanently suppressed, yielding unbounded muscle mass generation under sympathetic nervous stimulation.
              </p>
            </div>
          )}

          {activeTab === 'containment' && (
            <div className="hulk-tab-box">
              <div className="containment-log-item">› CULVER LAB 2008: Sonic Cannon Neutralization Failed</div>
              <div className="containment-log-item">› HELICARRIER 2012: Code Green Airborne Detonation</div>
              <div className="containment-log-item">› SAAKAAR 2017: Grandmaster Arena Champion (2 Years)</div>
            </div>
          )}
        </div>

        {/* Center: 3D Gamma Radiation Core */}
        <div className="archive-center-3d">
          <Canvas camera={{ position: [0, 0, 4.4], fov: 42 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.4} />
              <directionalLight position={[4, 5, 4]} color="#00ff66" intensity={2.0} />
              <directionalLight position={[-4, -3, -2]} color="#00e5ff" intensity={1.5} />
              <GammaCore3D isRaging={isRaging} transformState={transformState} />
              <Particles />
              <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.7} minPolarAngle={Math.PI / 2.5} />
            </Suspense>
          </Canvas>

          {/* Action Trigger */}
          <div className="stage-controls-overlay">
            <Button
              variant="primary"
              onClick={triggerGammaOverload}
              onHoverSound={onPlayHover}
              className="action-btn hulk-btn"
            >
              {isRaging ? '☢️ GAMMA SURGE PEAK ACTIVE' : '☢️ TRIGGER GAMMA OVERLOAD'}
            </Button>
          </div>
        </div>

        {/* Right Column: Biological Specifications & Combat Meters */}
        <div className="archive-right-col">
          <div className="specs-card">
            <div className="spec-tag">GAMMA JUGGERNAUT RATINGS</div>
            <div className="stat-row">
              <span className="s-lbl">PHYSICAL MASS / STRENGTH</span>
              <span className="s-bar">◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎</span>
            </div>
            <div className="stat-row">
              <span className="s-lbl">CELLULAR REGENERATION</span>
              <span className="s-bar">◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎</span>
            </div>
            <div className="stat-row">
              <span className="s-lbl">RADIATION IMMUNITY</span>
              <span className="s-bar">◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎</span>
            </div>
            <div className="stat-row">
              <span className="s-lbl">INTELLECT (BANNER FORM)</span>
              <span className="s-bar">◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎</span>
            </div>
          </div>

          <div className="gear-specs-card">
            <div className="spec-tag">FACILITY TELEMETRY</div>
            <ul className="gear-list">
              <li>› Sub-Zero Cryogenic Sedation Tanks</li>
              <li>› Reinforced Vibranium-Alloy Cage Retainers</li>
              <li>› High-Density Electro-Static Shock Dampeners</li>
              <li>› Nano-Infused Hyper-Elastic Stretch Fabric</li>
            </ul>
          </div>

          <div className="status-badge-bar">
            <span className="status-dot" style={{ background: '#00ff66', boxShadow: '0 0 10px #00ff66' }} />
            <span className="status-txt">STATUS: OMEGA CLASS TITAN // CONTAINED</span>
          </div>
        </div>

      </div>
    </div>
  );
}
