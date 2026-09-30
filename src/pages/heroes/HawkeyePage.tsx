import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Link } from 'react-router-dom';
import BowModel3D from '../../three/BowModel3D';
import Particles from '../../three/Particles';
import Button from '../../components/Button';

interface HawkeyePageProps {
  onPlayHover?: () => void;
  onPlayClick?: () => void;
}

interface TrickArrow {
  id: string;
  name: string;
  type: string;
  effect: string;
  range: string;
  payload: string;
}

const TRICK_ARROWS: TrickArrow[] = [
  {
    id: 'explosive',
    name: 'HIGH-EXPLOSIVE C4 ARROW',
    type: 'KINETIC BREACH',
    effect: 'Concussive blast wave capable of disabling Chitauri Chariots and reinforced armor.',
    range: '800 METERS',
    payload: '500g Composition C-4 with proximity fuze',
  },
  {
    id: 'emp',
    name: 'ELECTRO-MAGNETIC PULSE (EMP)',
    type: 'CYBER-DISRUPTION',
    effect: 'Disables all robotic circuitry and avionics within a 25-meter radius upon impact.',
    range: '650 METERS',
    payload: 'Flux-compression generator capacitor',
  },
  {
    id: 'sonic',
    name: 'SONIC DISRUPTER ARROW',
    type: 'ACOUSTIC SUPPRESSION',
    effect: 'Emits 160dB directional acoustic pulses to disorient enemy infantry through barricades.',
    range: '750 METERS',
    payload: 'Piezo-electric multi-harmonic emitter',
  },
  {
    id: 'grapple',
    name: 'TITANIUM GRAPPLE CABLE',
    type: 'TACTICAL ASCENT',
    effect: 'High-tensile carbon cable for rapid rooftop traversal and aerial extraction.',
    range: '400 METERS',
    payload: 'Motorized micro-winch with 800kg tensile capacity',
  },
  {
    id: 'pym',
    name: 'PYM PARTICLE EXPANSION ARROW',
    type: 'QUANTUM SCALING',
    effect: 'Grows to 50x physical mass upon mid-air release to crush advancing armored vehicles.',
    range: '500 METERS',
    payload: 'Encapsulated Pym Growth Particle Vial',
  },
];

export default function HawkeyePage({
  onPlayHover,
  onPlayClick,
}: HawkeyePageProps) {
  const [selectedArrow, setSelectedArrow] = useState(TRICK_ARROWS[0]);
  const [isFiring, setIsFiring] = useState(false);
  const [activeTab, setActiveTab] = useState<'arrows' | 'ronin' | 'target'>('arrows');

  const triggerPrecisionShot = () => {
    if (onPlayClick) onPlayClick();
    setIsFiring(true);
    setTimeout(() => setIsFiring(false), 2400);
  };

  return (
    <div className={`hero-archive-page hawkeye-archive-page ${isFiring ? 'hawkeye-fire-active' : ''}`}>
      {/* Background Weapons Range Aura */}
      <div className="archive-bg-ambient hawkeye-bg" />

      {/* Top Header HUD */}
      <div className="stark-header-hud">
        <div className="breadcrumb-box">
          <Link to="/heroes" className="back-link" onClick={onPlayClick} onMouseEnter={onPlayHover}>
            ← HERO ARCHIVES
          </Link>
          <span className="sep-slash">//</span>
          <span className="current-sub">S.H.I.E.L.D. TACTICAL RANGE // HAWKEYE // CLINTON BARTON</span>
        </div>
        <div className="stark-telemetry-tag">
          BALLISTIC TELEMETRY: 100% ACCURACY // WINDAGE 0.0 MOA
        </div>
      </div>

      {/* Main Range Stage */}
      <div className="archive-stage-layout">
        
        {/* Left Column: Marksmanship Dossier & Arrow Selector */}
        <div className="archive-left-col">
          <div className="hero-id-tag">S.H.I.E.L.D. // SPECIAL AGENT #06</div>
          <h1 className="hero-giant-name">HAWKEYE</h1>
          <div className="hero-real-id">CLINTON FRANCIS BARTON • THE WORLD'S GREATEST MARKSMAN</div>
          <p className="hero-manifesto">
            "The city is flying, we’re fighting an army of robots, and I have a bow and arrow. None of this makes sense. But I’m going back out there because it’s my job."
          </p>

          {/* Sub Navigation */}
          <div className="hawkeye-nav-tabs">
            <button
              className={`hawkeye-tab-btn ${activeTab === 'arrows' ? 'hawkeye-tab-active' : ''}`}
              onClick={() => {
                setActiveTab('arrows');
                if (onPlayClick) onPlayClick();
              }}
              onMouseEnter={onPlayHover}
            >
              🏹 TRICK ARROW QUIVER ({TRICK_ARROWS.length})
            </button>
            <button
              className={`hawkeye-tab-btn ${activeTab === 'target' ? 'hawkeye-tab-active' : ''}`}
              onClick={() => {
                setActiveTab('target');
                if (onPlayClick) onPlayClick();
              }}
              onMouseEnter={onPlayHover}
            >
              🎯 FIRING SOLUTION
            </button>
            <button
              className={`hawkeye-tab-btn ${activeTab === 'ronin' ? 'hawkeye-tab-active' : ''}`}
              onClick={() => {
                setActiveTab('ronin');
                if (onPlayClick) onPlayClick();
              }}
              onMouseEnter={onPlayHover}
            >
              ⚔️ RONIN RECORD
            </button>
          </div>

          {activeTab === 'arrows' && (
            <div className="arrow-selector-panel">
              <div className="arrows-strip">
                {TRICK_ARROWS.map((ar) => (
                  <button
                    key={ar.id}
                    className={`arrow-btn ${selectedArrow.id === ar.id ? 'arrow-btn-active' : ''}`}
                    onClick={() => {
                      setSelectedArrow(ar);
                      if (onPlayClick) onPlayClick();
                    }}
                    onMouseEnter={onPlayHover}
                  >
                    {ar.name.split(' ')[0]}
                  </button>
                ))}
              </div>
              <div className="arrow-detail-card">
                <div className="ar-type">{selectedArrow.type} // RANGE {selectedArrow.range}</div>
                <h3 className="ar-name">{selectedArrow.name}</h3>
                <p className="ar-desc">{selectedArrow.effect}</p>
                <div className="ar-payload"><strong>PAYLOAD:</strong> {selectedArrow.payload}</div>
              </div>
            </div>
          )}

          {activeTab === 'target' && (
            <div className="arrow-detail-card">
              <div className="stat-row">
                <span>WIND DRIFT:</span> <span className="green-txt">0.02 M/S CALIBRATED</span>
              </div>
              <div className="stat-row">
                <span>TARGET LOCK:</span> <span className="green-txt">OPTICAL & THERMAL TRACKING</span>
              </div>
              <div className="stat-row">
                <span>ARROW VELOCITY:</span> <span className="green-txt">340 FPS (PEAK SPEED)</span>
              </div>
            </div>
          )}

          {activeTab === 'ronin' && (
            <div className="arrow-detail-card">
              <p className="ronin-desc">
                During the 5-year Blip, operated globally as the lethal vigilante "Ronin", wielding twin custom Damascus steel katanas and neutralizing global cartel syndicates.
              </p>
            </div>
          )}
        </div>

        {/* Center: 3D Compound Bow & Laser Sights */}
        <div className="archive-center-3d">
          <Canvas camera={{ position: [0, 0, 4.2], fov: 42 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.4} />
              <directionalLight position={[4, 5, 4]} color="#a855f7" intensity={2.0} />
              <directionalLight position={[-4, -3, -2]} color="#ffffff" intensity={1.8} />
              <BowModel3D arrowType={selectedArrow.id} isFiring={isFiring} />
              <Particles />
              <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.7} minPolarAngle={Math.PI / 2.5} />
            </Suspense>
          </Canvas>

          {/* Firing Action Button */}
          <div className="stage-controls-overlay">
            <Button
              variant="primary"
              onClick={triggerPrecisionShot}
              onHoverSound={onPlayHover}
              className="action-btn hawkeye-btn"
            >
              {isFiring ? '🎯 TARGET HIT // 100% ACCURACY' : '🏹 RELEASE PRECISION ARROW'}
            </Button>
          </div>
        </div>

        {/* Right Column: Ballistic Ratings & Quiver Specifications */}
        <div className="archive-right-col">
          <div className="specs-card">
            <div className="spec-tag">MARKSMANSHIP RATINGS</div>
            <div className="stat-row">
              <span className="s-lbl">PRECISION ACCURACY</span>
              <span className="s-bar">◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎</span>
            </div>
            <div className="stat-row">
              <span className="s-lbl">RAPID RELOAD CYCLE</span>
              <span className="s-bar">◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎</span>
            </div>
            <div className="stat-row">
              <span className="s-lbl">MELEE COMBAT (RONIN)</span>
              <span className="s-bar">◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◻︎</span>
            </div>
            <div className="stat-row">
              <span className="s-lbl">TACTICAL RECONNAISSANCE</span>
              <span className="s-bar">◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎</span>
            </div>
          </div>

          <div className="gear-specs-card">
            <div className="spec-tag">QUIVER SYSTEM</div>
            <ul className="gear-list">
              <li>› 32-Capacity Motorized Rotary Quiver</li>
              <li>› Custom 250lb Draw Weight Carbon Bow</li>
              <li>› Damascus Steel Ronin Katana & Wakizashi</li>
              <li>› S.H.I.E.L.D. Holographic Scope HUD</li>
            </ul>
          </div>

          <div className="status-badge-bar">
            <span className="status-dot" style={{ background: '#a855f7', boxShadow: '0 0 10px #a855f7' }} />
            <span className="status-txt">STATUS: MASTER MARKSMAN // FOUNDING 6</span>
          </div>
        </div>

      </div>
    </div>
  );
}
