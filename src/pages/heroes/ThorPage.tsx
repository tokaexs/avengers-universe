import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Link } from 'react-router-dom';
import HammerModel3D from '../../three/HammerModel3D';
import Particles from '../../three/Particles';
import Button from '../../components/Button';

interface ThorPageProps {
  onPlayHover?: () => void;
  onPlayClick?: () => void;
}

type WeaponChoice = 'mjolnir' | 'stormbreaker';

export default function ThorPage({
  onPlayHover,
  onPlayClick,
}: ThorPageProps) {
  const [selectedWeapon, setSelectedWeapon] = useState<WeaponChoice>('mjolnir');
  const [isSummoning, setIsSummoning] = useState(false);
  const [activeTab, setActiveTab] = useState<'weapon' | 'lore' | 'bifrost'>('weapon');

  const triggerLightningStrike = () => {
    if (onPlayClick) onPlayClick();
    setIsSummoning(true);
    setTimeout(() => setIsSummoning(false), 2600);
  };

  return (
    <div className={`hero-archive-page thor-archive-page ${isSummoning ? 'thor-lightning-flash' : ''}`}>
      {/* Background Cosmic Asgardian Nebula */}
      <div className="archive-bg-ambient thor-bg" />

      {/* Top Header Breadcrumb HUD */}
      <div className="stark-header-hud">
        <div className="breadcrumb-box">
          <Link to="/heroes" className="back-link" onClick={onPlayClick} onMouseEnter={onPlayHover}>
            ← HERO ARCHIVES
          </Link>
          <span className="sep-slash">//</span>
          <span className="current-sub">ASGARDIAN ROYAL VAULT // THOR ODINSON // GOD OF THUNDER</span>
        </div>
        <div className="stark-telemetry-tag">
          NINE REALMS TELEMETRY // BIFROST APERTURE ONLINE
        </div>
      </div>

      {/* Main Asgardian Vault Grid */}
      <div className="archive-stage-layout">
        
        {/* Left Column: God of Thunder Identity & Weapon Selector */}
        <div className="archive-left-col">
          <div className="hero-id-tag">ASGARD // CROWN PRINCE</div>
          <h1 className="hero-giant-name">THOR ODINSON</h1>
          <div className="hero-real-id">KING OF NEW ASGARD • GOD OF THUNDER</div>
          <p className="hero-manifesto">
            "I choose to run toward my problems, and not away from them. Because that's what heroes do."
          </p>

          {/* Weapon Toggle Tabs */}
          <div className="thor-weapon-toggle-strip">
            <button
              className={`thor-toggle-btn ${selectedWeapon === 'mjolnir' ? 'thor-toggle-active' : ''}`}
              onClick={() => {
                setSelectedWeapon('mjolnir');
                if (onPlayClick) onPlayClick();
              }}
              onMouseEnter={onPlayHover}
            >
              🔨 MJOLNIR (URU HAMMER)
            </button>
            <button
              className={`thor-toggle-btn ${selectedWeapon === 'stormbreaker' ? 'thor-toggle-active' : ''}`}
              onClick={() => {
                setSelectedWeapon('stormbreaker');
                if (onPlayClick) onPlayClick();
              }}
              onMouseEnter={onPlayHover}
            >
              🪓 STORMBREAKER (KINGS AXE)
            </button>
          </div>

          {/* Dynamic Weapon Description Dossier */}
          {selectedWeapon === 'mjolnir' ? (
            <div className="thor-weapon-dossier">
              <div className="dossier-header-tag">ODIN'S ENCHANTMENT // FORGED IN NIDAVELLIR</div>
              <h3 className="weapon-name">MJOLNIR</h3>
              <p className="weapon-desc">
                Forged by Eitri from the heart of a dying star. Enchanted by All-Father Odin: "Whosoever holds this hammer, if he be worthy, shall possess the power of Thor."
              </p>
              <div className="weapon-prop-list">
                <div className="prop-item"><strong>MATERIAL:</strong> Pure Asgardian Uru Metal</div>
                <div className="prop-item"><strong>CONDUIT:</strong> Atmospheric Lightning Direct Channel</div>
                <div className="prop-item"><strong>PROPERTIES:</strong> Unbreakable • Inertial Lock • Worthiness Spell</div>
              </div>
            </div>
          ) : (
            <div className="thor-weapon-dossier">
              <div className="dossier-header-tag">KING'S WEAPON // FORGED BY EITRI & GROOT</div>
              <h3 className="weapon-name">STORMBREAKER</h3>
              <p className="weapon-desc">
                The greatest weapon in Asgard's history. Capable of summoning the Bifrost bridge, focusing cosmic lightning, and cleaving through the full kinetic energy of the Infinity Gauntlet.
              </p>
              <div className="weapon-prop-list">
                <div className="prop-item"><strong>MATERIAL:</strong> High-Density Uru Alloy / Yggdrasil Wood Handle</div>
                <div className="prop-item"><strong>CONDUIT:</strong> Bifrost Teleportation & Cosmic Plasma</div>
                <div className="prop-item"><strong>PROPERTIES:</strong> Interstellar Flight • Thanos-Cleaving Mass</div>
              </div>
            </div>
          )}

          {/* Sub Navigation */}
          <div className="thor-subtabs">
            <button
              className={`thor-subtab-btn ${activeTab === 'weapon' ? 'active' : ''}`}
              onClick={() => setActiveTab('weapon')}
            >
              ⚡ WEAPON STATS
            </button>
            <button
              className={`thor-subtab-btn ${activeTab === 'lore' ? 'active' : ''}`}
              onClick={() => setActiveTab('lore')}
            >
              📜 RUNIC LORE
            </button>
            <button
              className={`thor-subtab-btn ${activeTab === 'bifrost' ? 'active' : ''}`}
              onClick={() => setActiveTab('bifrost')}
            >
              🌌 BIFROST GRID
            </button>
          </div>

          {activeTab === 'lore' && (
            <div className="thor-tab-content">
              <p className="runic-text">ᚦᛟᚱ • ᛟᛞᛁᚾᛋᛟᚾ • ᛚᛁᚷᚺᛏᚾᛁᚾᚷ • ᚲᛁᚾᚷ</p>
              <p className="runic-desc">Ancient elder runes inscribed onto the Uru core channel cosmic electro-magnetic atmospheric plasma directly through the wielder's neurological synapses.</p>
            </div>
          )}

          {activeTab === 'bifrost' && (
            <div className="thor-tab-content">
              <div className="bifrost-grid-row">
                <span>MIDGARD (EARTH):</span> <span className="bifrost-coord">ONLINE // STABLE</span>
              </div>
              <div className="bifrost-grid-row">
                <span>ASGARD (NEW ASGARD):</span> <span className="bifrost-coord">ONLINE // MONITORED</span>
              </div>
              <div className="bifrost-grid-row">
                <span>NIDAVELLIR:</span> <span className="bifrost-coord">FORGE STANDBY</span>
              </div>
            </div>
          )}
        </div>

        {/* Center: 3D Asgardian Weapon Canvas */}
        <div className="archive-center-3d">
          <Canvas camera={{ position: [0, 0, 4.4], fov: 42 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.4} />
              <directionalLight position={[4, 5, 4]} color="#ffd700" intensity={1.8} />
              <directionalLight position={[-4, -3, -2]} color="#00e5ff" intensity={2.2} />
              <HammerModel3D weaponType={selectedWeapon} isSummoning={isSummoning} />
              <Particles />
              <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.7} minPolarAngle={Math.PI / 2.5} />
            </Suspense>
          </Canvas>

          {/* Summoning Action Trigger */}
          <div className="stage-controls-overlay">
            <Button
              variant="primary"
              onClick={triggerLightningStrike}
              onHoverSound={onPlayHover}
              className="action-btn"
            >
              {isSummoning ? '⚡ ASGARDIAN LIGHTNING SUMMONED' : '⚡ SUMMON DIVINE LIGHTNING'}
            </Button>
          </div>
        </div>

        {/* Right Column: Divine Specifications & Power Ratings */}
        <div className="archive-right-col">
          <div className="specs-card">
            <div className="spec-tag">DIVINE COMBAT RATINGS</div>
            <div className="stat-row">
              <span className="s-lbl">LIGHTNING OUTPUT</span>
              <span className="s-bar">◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎</span>
            </div>
            <div className="stat-row">
              <span className="s-lbl">PHYSICAL STRENGTH</span>
              <span className="s-bar">◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎</span>
            </div>
            <div className="stat-row">
              <span className="s-lbl">DURABILITY (STAR-FORGE)</span>
              <span className="s-bar">◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎</span>
            </div>
            <div className="stat-row">
              <span className="s-lbl">INTERSTELLAR MOBILITY</span>
              <span className="s-bar">◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎</span>
            </div>
          </div>

          <div className="gear-specs-card">
            <div className="spec-tag">ASGARDIAN REGALIA</div>
            <ul className="gear-list">
              <li>› Uru Armor Vestments with Silver Discs</li>
              <li>› Cloak of Levitation / Asgardian Royal Cape</li>
              <li>› Eye of Odin Regenerative Sight</li>
              <li>› Megingjörð Belt of Mythic Strength</li>
            </ul>
          </div>

          <div className="status-badge-bar">
            <span className="status-dot" style={{ background: '#ffd700', boxShadow: '0 0 10px #ffd700' }} />
            <span className="status-txt">STATUS: GOD OF THUNDER // ASGARD SOVEREIGN</span>
          </div>
        </div>

      </div>
    </div>
  );
}
