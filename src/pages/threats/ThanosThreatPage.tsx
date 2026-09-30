import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Link } from 'react-router-dom';
import ThanosGauntlet3D from '../../three/ThanosGauntlet3D';
import Particles from '../../three/Particles';
import Button from '../../components/Button';

interface ThanosThreatPageProps {
  onPlayHover?: () => void;
  onPlayClick?: () => void;
}

const STONES_INFO = [
  { id: 'space', name: 'SPACE STONE (TESSERACT)', color: '#0055ff', power: 'Omnipresent wormhole creation & spatial teleportation' },
  { id: 'mind', name: 'MIND STONE (SCEPTER)', color: '#ffee00', power: 'Telepathy, astral manipulation, consciousness alteration' },
  { id: 'reality', name: 'REALITY STONE (AETHER)', color: '#ff1133', power: 'Universal matter transmutation & illusion creation' },
  { id: 'power', name: 'POWER STONE (ORB)', color: '#9900ff', power: 'Planetary surface decimation & pure energy projection' },
  { id: 'time', name: 'TIME STONE (EYE OF AGAMOTTO)', color: '#00ff66', power: 'Temporal loop manipulation, chrono-reversal' },
  { id: 'soul', name: 'SOUL STONE (VORMIR)', color: '#ff7700', power: 'Spiritual dominion, life & death manipulation' },
];

export default function ThanosThreatPage({
  onPlayHover,
  onPlayClick,
}: ThanosThreatPageProps) {
  const [selectedStone, setSelectedStone] = useState<string | null>(null);
  const [isSnapping, setIsSnapping] = useState(false);

  const triggerSnapSimulation = () => {
    if (onPlayClick) onPlayClick();
    setIsSnapping(true);
    setTimeout(() => setIsSnapping(false), 2800);
  };

  const activeStoneObj = STONES_INFO.find((s) => s.id === selectedStone);

  return (
    <div className={`hero-archive-page thanos-archive-page ${isSnapping ? 'thanos-snap-burst' : ''}`}>
      {/* Background Deep Cosmic Space Aura */}
      <div className="archive-bg-ambient thanos-bg" />

      {/* Top Header HUD */}
      <div className="stark-header-hud">
        <div className="breadcrumb-box">
          <Link to="/threats" className="back-link" onClick={onPlayClick} onMouseEnter={onPlayHover}>
            ← THREAT DATABASE
          </Link>
          <span className="sep-slash">//</span>
          <span className="current-sub">COSMIC THREAT ARCHIVE // THANOS // THE MAD TITAN</span>
        </div>
        <div className="stark-telemetry-tag">
          THREAT STATUS: UNIVERSAL OMEGA // CASUALTIES: 50% LIFE
        </div>
      </div>

      {/* Main Grid */}
      <div className="archive-stage-layout">
        
        {/* Left Column: Cosmic Warlord Dossier */}
        <div className="archive-left-col">
          <div className="hero-id-tag">PLANET TITAN // BLACK ORDER HIGH COMMAND</div>
          <h1 className="hero-giant-name">THANOS</h1>
          <div className="hero-real-id">THE MAD TITAN • WIELDER OF THE INFINITY GAUNTLET</div>
          <p className="hero-manifesto">
            "I know what it's like to lose. To feel so desperately that you're right, yet to fail nonetheless. Dread it. Run from it. Destiny arrives all the same."
          </p>

          <div className="thanos-stones-selector-box">
            <div className="stones-header-tag">INTERACTIVE INFINITY STONES MATRIX:</div>
            <div className="stones-chips-strip">
              {STONES_INFO.map((st) => (
                <button
                  key={st.id}
                  className={`stone-chip-btn ${selectedStone === st.id ? 'stone-chip-active' : ''}`}
                  style={{ '--stone-color': st.color } as React.CSSProperties}
                  onClick={() => {
                    setSelectedStone(selectedStone === st.id ? null : st.id);
                    if (onPlayClick) onPlayClick();
                  }}
                  onMouseEnter={onPlayHover}
                >
                  {st.name.split(' ')[0]}
                </button>
              ))}
            </div>

            {activeStoneObj && (
              <div className="stone-info-card">
                <div className="stone-name-title" style={{ color: activeStoneObj.color }}>{activeStoneObj.name}</div>
                <p className="stone-power-desc">{activeStoneObj.power}</p>
              </div>
            )}
          </div>
        </div>

        {/* Center: 3D Infinity Gauntlet */}
        <div className="archive-center-3d">
          <Canvas camera={{ position: [0, 0, 4.4], fov: 42 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.4} />
              <directionalLight position={[4, 5, 4]} color="#ffd700" intensity={2.0} />
              <directionalLight position={[-4, -3, -2]} color="#9933ff" intensity={1.8} />
              <ThanosGauntlet3D activeStone={selectedStone} isSnapping={isSnapping} />
              <Particles />
              <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.7} minPolarAngle={Math.PI / 2.5} />
            </Suspense>
          </Canvas>

          {/* Decimation Snap Trigger Button */}
          <div className="stage-controls-overlay">
            <Button
              variant="primary"
              onClick={triggerSnapSimulation}
              onHoverSound={onPlayHover}
              className="action-btn thanos-btn"
            >
              {isSnapping ? '⚡ THE DECIMATION SNAP ACTIVE' : '⚡ SIMULATE THE DECIMATION SNAP'}
            </Button>
          </div>
        </div>

        {/* Right Column: Universal Threat Ratings & Casualties */}
        <div className="archive-right-col">
          <div className="specs-card">
            <div className="spec-tag">UNIVERSAL THREAT RATINGS</div>
            <div className="stat-row">
              <span className="s-lbl">REALITY WARPING (6 STONES)</span>
              <span className="s-bar">◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎</span>
            </div>
            <div className="stat-row">
              <span className="s-lbl">PHYSICAL INDESTRUCTIBILITY</span>
              <span className="s-bar">◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎</span>
            </div>
            <div className="stat-row">
              <span className="s-lbl">TACTICAL STRATEGY</span>
              <span className="s-bar">◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎</span>
            </div>
            <div className="stat-row">
              <span className="s-lbl">COSMIC ARMADA STRENGTH</span>
              <span className="s-bar">◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎</span>
            </div>
          </div>

          <div className="gear-specs-card">
            <div className="spec-tag">MILITARY ASSETS</div>
            <ul className="gear-list">
              <li>› Sanctuary II War Flagship & Outrider Swarms</li>
              <li>› Double-Edged Uru Battleblade</li>
              <li>› The Black Order (Children of Thanos)</li>
              <li>› Nidavellir-Forged Uru Infinity Gauntlet</li>
            </ul>
          </div>

          <div className="status-badge-bar">
            <span className="status-dot" style={{ background: '#ffd000', boxShadow: '0 0 10px #ffd000' }} />
            <span className="status-txt">STATUS: ERADICATED (CHRONO-SNAP)</span>
          </div>
        </div>

      </div>
    </div>
  );
}
