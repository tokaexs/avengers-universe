import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Link } from 'react-router-dom';
import WidowWeapons3D from '../../three/WidowWeapons3D';
import Particles from '../../three/Particles';
import Button from '../../components/Button';

interface BlackWidowPageProps {
  onPlayHover?: () => void;
  onPlayClick?: () => void;
}

export default function BlackWidowPage({
  onPlayHover,
  onPlayClick,
}: BlackWidowPageProps) {
  const [isStunActive, setIsStunActive] = useState(false);
  const [activeTab, setActiveTab] = useState<'covert' | 'weapons' | 'red_room'>('covert');

  const triggerStunDischarge = () => {
    if (onPlayClick) onPlayClick();
    setIsStunActive(true);
    setTimeout(() => setIsStunActive(false), 2400);
  };

  return (
    <div className={`hero-archive-page widow-archive-page ${isStunActive ? 'widow-stun-burst' : ''}`}>
      {/* Background Black Site Tactical Aura */}
      <div className="archive-bg-ambient widow-bg" />

      {/* Top Header HUD */}
      <div className="stark-header-hud">
        <div className="breadcrumb-box">
          <Link to="/heroes" className="back-link" onClick={onPlayClick} onMouseEnter={onPlayHover}>
            ← HERO ARCHIVES
          </Link>
          <span className="sep-slash">//</span>
          <span className="current-sub">S.H.I.E.L.D. BLACK SITE // BLACK WIDOW // NATASHA ROMANOFF</span>
        </div>
        <div className="stark-telemetry-tag">
          COVERT NETWORK: ACTIVE // RED ROOM DOSSIER #05-BW
        </div>
      </div>

      {/* Main Black Site Grid */}
      <div className="archive-stage-layout">
        
        {/* Left Column: Covert Intelligence & Aliases */}
        <div className="archive-left-col">
          <div className="hero-id-tag">KGB // S.H.I.E.L.D. LEVEL 10 SPECIALIST</div>
          <h1 className="hero-giant-name">BLACK WIDOW</h1>
          <div className="hero-real-id">NATALIA ALIANOVNA ROMANOVA</div>
          <p className="hero-manifesto">
            "I've got red in my ledger. I'd like to wipe it out."
          </p>

          {/* Sub Navigation Strip */}
          <div className="widow-subtabs-strip">
            <button
              className={`widow-tab-btn ${activeTab === 'covert' ? 'widow-tab-active' : ''}`}
              onClick={() => {
                setActiveTab('covert');
                if (onPlayClick) onPlayClick();
              }}
              onMouseEnter={onPlayHover}
            >
              🕵️ COVERT ALIASES
            </button>
            <button
              className={`widow-tab-btn ${activeTab === 'weapons' ? 'widow-tab-active' : ''}`}
              onClick={() => {
                setActiveTab('weapons');
                if (onPlayClick) onPlayClick();
              }}
              onMouseEnter={onPlayHover}
            >
              ⚡ WIDOW'S BITE
            </button>
            <button
              className={`widow-tab-btn ${activeTab === 'red_room' ? 'widow-tab-active' : ''}`}
              onClick={() => {
                setActiveTab('red_room');
                if (onPlayClick) onPlayClick();
              }}
              onMouseEnter={onPlayHover}
            >
              🩸 RED ROOM DOSSIER
            </button>
          </div>

          {activeTab === 'covert' && (
            <div className="widow-panel-box">
              <div className="alias-grid">
                <div className="alias-card">
                  <span className="alias-tag">STARK INDUSTRIES (2010)</span>
                  <div className="alias-name">NATALIE RUSHMAN</div>
                  <p className="alias-role">Legal Department undercover evaluation of Tony Stark for Avengers Initiative.</p>
                </div>
                <div className="alias-card">
                  <span className="alias-tag">S.H.I.E.L.D. TRISKELION (2014)</span>
                  <div className="alias-name">COUNCILWOMAN HAWLEY</div>
                  <p className="alias-role">Photostatic facial veil infiltration of the World Security Council.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'weapons' && (
            <div className="widow-panel-box">
              <div className="gear-prop-item"><strong>WIDOW'S BITE:</strong> 30,000-Volt Electroshock Gauntlet Cartridges</div>
              <div className="gear-prop-item"><strong>DUAL BATONS:</strong> Telescopic Titanium-Reinforced Stun Staves</div>
              <div className="gear-prop-item"><strong>GRAPPLE LINE:</strong> Micro-Filament Carbon Fiber Cable (500 kg Load)</div>
              <div className="gear-prop-item"><strong>SIDEARMS:</strong> Dual Glock 26 Handguns with Hollow-Point Magazines</div>
            </div>
          )}

          {activeTab === 'red_room' && (
            <div className="widow-panel-box">
              <p className="red-room-text">
                Trained in the clandestine Soviet "Red Room" facility under Madame B. Master of psychological warfare, bio-chemical tolerance, martial mastery in Sambo, Krav Maga, and multi-lingual espionage.
              </p>
            </div>
          )}
        </div>

        {/* Center: 3D Tactical Weapon Viewer */}
        <div className="archive-center-3d">
          <Canvas camera={{ position: [0, 0, 4.2], fov: 42 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.4} />
              <directionalLight position={[4, 5, 4]} color="#ff1a35" intensity={2.0} />
              <directionalLight position={[-4, -3, -2]} color="#00e5ff" intensity={1.8} />
              <WidowWeapons3D isStunActive={isStunActive} />
              <Particles />
              <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.7} minPolarAngle={Math.PI / 2.5} />
            </Suspense>
          </Canvas>

          {/* Stun Discharge Action Trigger */}
          <div className="stage-controls-overlay">
            <Button
              variant="primary"
              onClick={triggerStunDischarge}
              onHoverSound={onPlayHover}
              className="action-btn widow-btn"
            >
              {isStunActive ? '⚡ 30,000V STUN DISCHARGE ACTIVE' : '⚡ DISCHARGE WIDOW’S BITE'}
            </Button>
          </div>
        </div>

        {/* Right Column: Tactical Intelligence Specifications */}
        <div className="archive-right-col">
          <div className="specs-card">
            <div className="spec-tag">COVERT TACTICAL RATINGS</div>
            <div className="stat-row">
              <span className="s-lbl">ESPIONAGE / INFILTRATION</span>
              <span className="s-bar">◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎</span>
            </div>
            <div className="stat-row">
              <span className="s-lbl">CLOSE COMBAT MASTERY</span>
              <span className="s-bar">◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎</span>
            </div>
            <div className="stat-row">
              <span className="s-lbl">PSYCHOLOGICAL RESISTANCE</span>
              <span className="s-bar">◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎</span>
            </div>
            <div className="stat-row">
              <span className="s-lbl">TACTICAL ACUMEN</span>
              <span className="s-bar">◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◻︎</span>
            </div>
          </div>

          <div className="gear-specs-card">
            <div className="spec-tag">COVERT LOADOUT</div>
            <ul className="gear-list">
              <li>› Photostatic Veil Disguise Matrix</li>
              <li>› Taser Discs & Flash-Bang Micro-Pellets</li>
              <li>› Multi-Spectrum Thermal Night-Vision Visor</li>
              <li>› Encrypted Quantum S.H.I.E.L.D. Beacon</li>
            </ul>
          </div>

          <div className="status-badge-bar">
            <span className="status-dot" style={{ background: '#ff1a35', boxShadow: '0 0 10px #ff1a35' }} />
            <span className="status-txt">STATUS: MASTER SPY // AVENGERS CORE</span>
          </div>
        </div>

      </div>
    </div>
  );
}
