import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Link } from 'react-router-dom';
import HammerModel3D from '../../three/HammerModel3D';
import Button from '../../components/Button';

interface ThorPageProps {
  onPlayHover?: () => void;
  onPlayClick?: () => void;
}

export default function ThorPage({
  onPlayHover,
  onPlayClick,
}: ThorPageProps) {
  const [lightningSurge, setLightningSurge] = useState(false);

  const summonThunder = () => {
    if (onPlayClick) onPlayClick();
    setLightningSurge(true);
    setTimeout(() => setLightningSurge(false), 3000);
  };

  return (
    <div className="hero-archive-page thor-archive-page">
      {/* Background Ambient Cosmic Asgardian Flare */}
      <div className={`archive-bg-ambient thor-bg ${lightningSurge ? 'thor-surge' : ''}`} />

      {/* Header HUD */}
      <div className="stark-header-hud">
        <div className="breadcrumb-box">
          <Link to="/heroes" className="back-link" onClick={onPlayClick} onMouseEnter={onPlayHover}>
            ← HERO ARCHIVE
          </Link>
          <span className="sep-slash">//</span>
          <span className="current-sub">ASGARDIAN VAULT // THOR ODINSON</span>
        </div>
        <div className="stark-telemetry-tag">
          REALM STATUS: NINE REALMS GUARDIAN
        </div>
      </div>

      <div className="archive-stage-layout">
        
        {/* Left Column: Asgardian Heritage & Runes */}
        <div className="archive-left-col">
          <div className="hero-id-tag">ROYAL HOUSE OF ASGARD // GOD OF THUNDER</div>
          <h1 className="hero-giant-name">THOR ODINSON</h1>
          <div className="hero-real-id">KING OF NEW ASGARD</div>
          <p className="hero-manifesto">
            "I choose to run toward my problems, and not away from them. Because that's what heroes do."
          </p>

          <div className="tactical-directives-stack">
            <div className="directives-title">ANCIENT ASGARDIAN RELICS:</div>
            <div className="directive-card directive-card-active">
              <div className="dir-header">
                <span className="dir-num">RELIC 01</span>
                <span className="dir-title">MJÖLNIR (URU HAMMER)</span>
              </div>
              <p className="dir-detail">Forged in the heart of a dying star by Eitri. Enchanted by Odin: "Whosoever holds this hammer, if he be worthy, shall possess the power of Thor."</p>
            </div>
            <div className="directive-card">
              <div className="dir-header">
                <span className="dir-num">RELIC 02</span>
                <span className="dir-title">STORMBREAKER (KING'S WEAPON)</span>
              </div>
              <p className="dir-detail">The greatest weapon in Asgardian history. Channels cataclysmic cosmic lightning and summons the Bifrost across infinite dimensions.</p>
            </div>
          </div>
        </div>

        {/* Center: 3D Mjolnir Environment */}
        <div className="archive-center-3d">
          <Canvas camera={{ position: [0, 0, 4.2], fov: 42 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.4} />
              <directionalLight position={[4, 5, 4]} color="#ffffff" intensity={2.0} />
              <directionalLight position={[-4, -3, -2]} color="#ffd700" intensity={1.8} />
              <HammerModel3D />
              <OrbitControls enableZoom={false} enablePan={false} />
            </Suspense>
          </Canvas>

          <div className="stage-controls-overlay">
            <Button
              variant="primary"
              onClick={summonThunder}
              onHoverSound={onPlayHover}
              className="action-btn"
            >
              {lightningSurge ? '⚡ LIGHTNING SURGE UNLEASHED' : '⚡ SUMMON CATACLYSMIC THUNDER'}
            </Button>
          </div>
        </div>

        {/* Right Column: Cosmic Specifications */}
        <div className="archive-right-col">
          <div className="specs-card">
            <div className="spec-tag">DIVINE ATTRIBUTES</div>
            <div className="stat-row">
              <span className="s-lbl">GODLIKE STRENGTH</span>
              <span className="s-val">PLANETARY CLASS</span>
            </div>
            <div className="stat-row">
              <span className="s-lbl">ELECTROKINESIS</span>
              <span className="s-val">LIGHTNING CHANNEL</span>
            </div>
            <div className="stat-row">
              <span className="s-lbl">BIFROST ACCESS</span>
              <span className="s-val">INTERDIMENSIONAL</span>
            </div>
            <div className="stat-row">
              <span className="s-lbl">LONGEVITY</span>
              <span className="s-val">5,000+ SOLAR YEARS</span>
            </div>
          </div>

          <div className="gear-specs-card">
            <div className="spec-tag">WEAPONRY & ARMAMENT</div>
            <ul className="gear-list">
              <li>› Mjölnir (Uru Star-Forged Hammer)</li>
              <li>› Stormbreaker (Bifrost-Channeling Battleaxe)</li>
              <li>› Asgardian Scaled Royal Plate Armor</li>
              <li>› Crimson Cloak of the Crown Prince</li>
            </ul>
          </div>

          <div className="status-badge-bar">
            <span className="status-dot" />
            <span className="status-txt">STATUS: COSMIC DEFENDER // GOD OF THUNDER</span>
          </div>
        </div>

      </div>
    </div>
  );
}
