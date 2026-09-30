import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Link } from 'react-router-dom';
import ShieldModel3D from '../../three/ShieldModel3D';
import Particles from '../../three/Particles';
import Button from '../../components/Button';

interface CaptainAmericaPageProps {
  onPlayHover?: () => void;
  onPlayClick?: () => void;
}

type CapSection = 'shield' | 'suits' | 'history' | 'specs';

interface CapSuit {
  era: string;
  name: string;
  designation: string;
  description: string;
  material: string;
  features: string[];
}

const CAP_SUITS: CapSuit[] = [
  {
    era: '1942',
    name: 'SSR RESCUE & FIELD UNIFORM',
    designation: 'MARK I SSR VITA-RAY',
    description: 'Constructed from heavy cotton canvas, leather harness, and carbon-infused helmet for trench warfare behind German lines.',
    material: 'Treated Nomex / Cowhide / Reinforced Carbon Steel',
    features: ['Triangular Carbon Shield', 'Colt M1911 Sidearm', 'Field Radio Harness'],
  },
  {
    era: '2012',
    name: 'AVENGERS BATTLE OF NY SUIT',
    designation: 'S.H.I.E.L.D. TACTICAL V3',
    description: 'Designed by S.H.I.E.L.D. with Coulson’s vintage inspiration. High-visibility patriotic standard designed to rally civilian morale.',
    material: 'Ballistic Kevlar / Nomex Fire-Retardant Weave',
    features: ['Concentric Vibranium Disc', 'Integrated Comms', 'High-Impact Joints'],
  },
  {
    era: '2014',
    name: 'STEALTH S.T.R.I.K.E. UNIFORM',
    designation: 'COVERT SPECIAL OPS',
    description: 'Subdued midnight blue tactical uniform designed for stealth maritime infiltration and zero-light close-quarters combat.',
    material: 'Silent-Weave Polymer / Kevlar Composite',
    features: ['Muted Blue Camouflage Shield', 'Magnetic Wrist Locks', 'Night-Ops HUD'],
  },
  {
    era: '2019',
    name: 'ENDGAME SCALE MAIL ARMOR',
    designation: 'VINTAGE COMMAND STANDARD',
    description: 'Classic scale mail chest armor reinforced with Wakandan micro-threading. The definitive field combat armor of Captain America.',
    material: 'Segmented Vibranium Micro-Scales / Hardened Kevlar',
    features: ['Dual-Wield Mjolnir Conduit', 'Broken Shield Retainer', 'Full Kinetic Dispersal'],
  },
];

const SHIELD_HOTSPOTS = [
  { id: 'star', label: 'STAR NUCLEUS', desc: 'Machined pure Vibranium star emitting zero acoustic vibration and absorbing kinetic shock.' },
  { id: 'rings', label: 'CONCENTRIC RINGS', desc: 'Alternating crimson and raw titanium-vibranium alloy rings for aerodynamic lift.' },
  { id: 'straps', label: 'MAGNETIC HARNESS', desc: 'Reinforced dual-leather arm harness paired with Stark electro-magnetic forearm gauntlets.' },
  { id: 'rim', label: 'KINETIC RIM', desc: 'Beveled outer edge designed for ricochet strikes with near 100% velocity retention.' },
];

export default function CaptainAmericaPage({
  onPlayHover,
  onPlayClick,
}: CaptainAmericaPageProps) {
  const [activeSection, setActiveSection] = useState<CapSection>('shield');
  const [selectedSuitIdx, setSelectedSuitIdx] = useState(3);
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);
  const [isKineticActive, setIsKineticActive] = useState(false);

  const currentSuit = CAP_SUITS[selectedSuitIdx];

  const triggerKineticStrike = () => {
    if (onPlayClick) onPlayClick();
    setIsKineticActive(true);
    setTimeout(() => setIsKineticActive(false), 2400);
  };

  return (
    <div className="hero-archive-page cap-archive-page">
      {/* Background Military Tactical Lighting */}
      <div className="archive-bg-ambient cap-bg" />

      {/* Top Header Breadcrumb HUD */}
      <div className="stark-header-hud">
        <div className="breadcrumb-box">
          <Link to="/heroes" className="back-link" onClick={onPlayClick} onMouseEnter={onPlayHover}>
            ← HERO ARCHIVES
          </Link>
          <span className="sep-slash">//</span>
          <span className="current-sub">S.H.I.E.L.D. MILITARY ARCHIVE // CAPTAIN AMERICA // STEVEN G. ROGERS</span>
        </div>
        <div className="stark-telemetry-tag">
          TACTICAL COMMAND: LEVEL 10 // SSR DOSSIER #107-SSR
        </div>
      </div>

      {/* Section Navigation Tabs */}
      <div className="cap-nav-ribbon">
        <div className="cap-tabs-container">
          <button
            className={`cap-tab-btn ${activeSection === 'shield' ? 'cap-tab-active' : ''}`}
            onClick={() => {
              setActiveSection('shield');
              if (onPlayClick) onPlayClick();
            }}
            onMouseEnter={onPlayHover}
          >
            🛡️ VIBRANIUM SHIELD
          </button>
          <button
            className={`cap-tab-btn ${activeSection === 'suits' ? 'cap-tab-active' : ''}`}
            onClick={() => {
              setActiveSection('suits');
              if (onPlayClick) onPlayClick();
            }}
            onMouseEnter={onPlayHover}
          >
            🎖️ SUIT ARCHIVE ({CAP_SUITS.length})
          </button>
          <button
            className={`cap-tab-btn ${activeSection === 'history' ? 'cap-tab-active' : ''}`}
            onClick={() => {
              setActiveSection('history');
              if (onPlayClick) onPlayClick();
            }}
            onMouseEnter={onPlayHover}
          >
            📜 COMBAT HISTORY
          </button>
          <button
            className={`cap-tab-btn ${activeSection === 'specs' ? 'cap-tab-active' : ''}`}
            onClick={() => {
              setActiveSection('specs');
              if (onPlayClick) onPlayClick();
            }}
            onMouseEnter={onPlayHover}
          >
            ⚙️ SPECIFICATIONS
          </button>
        </div>
      </div>

      {/* Main Showcase Stage */}
      <div className="archive-stage-layout">
        
        {/* Left Column: Tactical Dossier & Active Section Info */}
        <div className="archive-left-col">
          <div className="hero-id-tag">SSR // 107TH INFANTRY REGIMENT</div>
          <h1 className="hero-giant-name">CAPTAIN AMERICA</h1>
          <div className="hero-real-id">STEVEN GRANT ROGERS • THE FIRST AVENGER</div>
          <p className="hero-manifesto">
            "For as long as I can remember, I just wanted to do what was right. I don't like bullies; I don't care where they're from."
          </p>

          {/* Section: Shield Hotspot Inspector */}
          {activeSection === 'shield' && (
            <div className="cap-interactive-panel">
              <div className="panel-title-tag">SHIELD DIAGNOSTICS & HOTSPOTS</div>
              <div className="hotspots-chip-grid">
                {SHIELD_HOTSPOTS.map((hs) => (
                  <button
                    key={hs.id}
                    className={`hotspot-chip ${selectedHotspot === hs.id ? 'hotspot-chip-active' : ''}`}
                    onClick={() => {
                      setSelectedHotspot(selectedHotspot === hs.id ? null : hs.id);
                      if (onPlayClick) onPlayClick();
                    }}
                    onMouseEnter={onPlayHover}
                  >
                    {hs.label}
                  </button>
                ))}
              </div>
              {selectedHotspot && (
                <div className="hotspot-detail-box">
                  <div className="hs-title">{SHIELD_HOTSPOTS.find((h) => h.id === selectedHotspot)?.label}</div>
                  <p className="hs-desc">{SHIELD_HOTSPOTS.find((h) => h.id === selectedHotspot)?.desc}</p>
                </div>
              )}
            </div>
          )}

          {/* Section: Suit Evolution */}
          {activeSection === 'suits' && (
            <div className="cap-interactive-panel">
              <div className="panel-title-tag">SELECT COMBAT UNIFORM</div>
              <div className="suits-selector-strip">
                {CAP_SUITS.map((st, sIdx) => (
                  <button
                    key={sIdx}
                    className={`suit-era-btn ${selectedSuitIdx === sIdx ? 'suit-era-active' : ''}`}
                    onClick={() => {
                      setSelectedSuitIdx(sIdx);
                      if (onPlayClick) onPlayClick();
                    }}
                    onMouseEnter={onPlayHover}
                  >
                    {st.era}
                  </button>
                ))}
              </div>
              <div className="suit-detail-box">
                <div className="st-era">{currentSuit.era} // {currentSuit.designation}</div>
                <h3 className="st-name">{currentSuit.name}</h3>
                <p className="st-desc">{currentSuit.description}</p>
                <div className="st-mat"><strong>MATERIAL:</strong> {currentSuit.material}</div>
              </div>
            </div>
          )}

          {/* Section: Combat History */}
          {activeSection === 'history' && (
            <div className="cap-interactive-panel">
              <div className="panel-title-tag">CLASSIFIED COMBAT RECORDS</div>
              <div className="history-logs-stack">
                <div className="h-log-item">
                  <span className="log-yr">1942-1945</span>
                  <div className="log-content">
                    <strong>LIBERATION OF OCCUPIED EUROPE</strong>
                    <p>Led Howling Commandos against Red Skull's Tesseract research bases.</p>
                  </div>
                </div>
                <div className="h-log-item">
                  <span className="log-yr">2012</span>
                  <div className="log-content">
                    <strong>BATTLE OF NEW YORK</strong>
                    <p>Field commander establishing perimeter containment and triage in Manhattan.</p>
                  </div>
                </div>
                <div className="h-log-item">
                  <span className="log-yr">2014</span>
                  <div className="log-content">
                    <strong>PROJECT INSIGHT COLLAPSE</strong>
                    <p>Exposed HYDRA infiltration inside S.H.I.E.L.D. Triskelion headquarters.</p>
                  </div>
                </div>
                <div className="h-log-item">
                  <span className="log-yr">2019</span>
                  <div className="log-content">
                    <strong>BATTLE OF EARTH & TIME HEIST</strong>
                    <p>Led unified allied forces against Thanos. Proved worthy to wield Mjolnir.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section: Specifications */}
          {activeSection === 'specs' && (
            <div className="cap-interactive-panel">
              <div className="panel-title-tag">PHYSIOLOGICAL & COMBAT TELEMETRY</div>
              <div className="stat-blocks-grid">
                <div className="stat-block-item">
                  <span className="sb-label">VITA-RAY ENHANCEMENT</span>
                  <span className="sb-val">100% MAXIMUM HUMAN</span>
                </div>
                <div className="stat-block-item">
                  <span className="sb-label">CELLULAR REGENERATION</span>
                  <span className="sb-val">4.0X BASELINE</span>
                </div>
                <div className="stat-block-item">
                  <span className="sb-label">KINETIC RECOIL ABSORPTION</span>
                  <span className="sb-val">100.0% RECOILLESS</span>
                </div>
                <div className="stat-block-item">
                  <span className="sb-label">STRATEGIC MASTERY</span>
                  <span className="sb-val">OMEGA COMMANDER</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Center: 3D Vibranium Shield Environment */}
        <div className="archive-center-3d">
          <Canvas camera={{ position: [0, 0, 4.2], fov: 40 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.4} />
              <directionalLight position={[4, 5, 4]} color="#ffffff" intensity={2.0} />
              <directionalLight position={[-4, -3, -2]} color="#0055ff" intensity={1.6} />
              <ShieldModel3D isSpinning={isKineticActive} selectedHotspot={selectedHotspot} />
              <Particles />
              <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.7} minPolarAngle={Math.PI / 2.5} />
            </Suspense>
          </Canvas>

          {/* Floating Action Trigger */}
          <div className="stage-controls-overlay">
            <Button
              variant="primary"
              onClick={triggerKineticStrike}
              onHoverSound={onPlayHover}
              className="action-btn"
            >
              {isKineticActive ? '⚡ KINETIC SHOCKWAVE DISCHARGED' : '🛡️ ENGAGE KINETIC ROTATION'}
            </Button>
          </div>
        </div>

        {/* Right Column: Tactical Equipment Loadout & Stat Meters */}
        <div className="archive-right-col">
          <div className="specs-card">
            <div className="spec-tag">TACTICAL COMBAT RATINGS</div>
            <div className="stat-row">
              <span className="s-lbl">DEFENSE ABSORPTION</span>
              <span className="s-bar">◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎</span>
            </div>
            <div className="stat-row">
              <span className="s-lbl">CLOSE-QUARTERS COMBAT</span>
              <span className="s-bar">◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎</span>
            </div>
            <div className="stat-row">
              <span className="s-lbl">TACTICAL LEADERSHIP</span>
              <span className="s-bar">◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎</span>
            </div>
            <div className="stat-row">
              <span className="s-lbl">AGILITY / REFLEXES</span>
              <span className="s-bar">◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◻︎</span>
            </div>
          </div>

          <div className="gear-specs-card">
            <div className="spec-tag">TACTICAL GEAR SPECIFICATIONS</div>
            <ul className="gear-list">
              <li>› 2.5-Foot Wakandan Vibranium Disc (12 lbs)</li>
              <li>› Segmented Micro-Scale Nomex / Kevlar Suit</li>
              <li>› Stark Electromagnetic Forearm Gauntlets</li>
              <li>› Encrypted S.H.I.E.L.D. Quantum Secure Sub-vocal Link</li>
            </ul>
          </div>

          <div className="status-badge-bar">
            <span className="status-dot" />
            <span className="status-txt">STATUS: INDOMITABLE LEADER // SSR #107</span>
          </div>
        </div>

      </div>
    </div>
  );
}
