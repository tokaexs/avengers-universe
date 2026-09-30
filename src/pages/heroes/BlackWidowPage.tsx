import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';

interface BlackWidowPageProps {
  onPlayHover?: () => void;
  onPlayClick?: () => void;
}

export default function BlackWidowPage({
  onPlayHover,
  onPlayClick,
}: BlackWidowPageProps) {
  const [activeIntel, setActiveIntel] = useState(0);

  const intelLogs = [
    { title: 'RED ROOM ALUMNI GRADUATION', detail: 'Trained from childhood in psychological warfare, espionage, marksmanship, and close-quarters lethal combat.' },
    { title: 'BUDAPEST OPERATION', detail: 'Joint deep-cover strike with Hawkeye to sever rogue Russian syndicate networks.' },
    { title: 'HYDRA EXTRACTION // WASHINGTON', detail: 'Infiltrated the World Security Council and leaked all classified S.H.I.E.L.D. and HYDRA secrets to the internet.' },
    { title: 'VORMIR SOUL STONE RECOVERY', detail: 'Heroic ultimate sacrifice to secure the Soul Stone, making the reversal of the Decimation possible.' },
  ];

  return (
    <div className="hero-archive-page widow-archive-page">
      {/* Background Ambient Red Room Surveillance Lighting */}
      <div className="archive-bg-ambient widow-bg" />

      {/* Header HUD */}
      <div className="stark-header-hud">
        <div className="breadcrumb-box">
          <Link to="/heroes" className="back-link" onClick={onPlayClick} onMouseEnter={onPlayHover}>
            ← HERO ARCHIVE
          </Link>
          <span className="sep-slash">//</span>
          <span className="current-sub">S.H.I.E.L.D. ESPIONAGE DIVISION // BLACK WIDOW</span>
        </div>
        <div className="stark-telemetry-tag">
          BLACK-OPS CLEARANCE // EYES ONLY
        </div>
      </div>

      <div className="archive-stage-layout">
        
        {/* Left Column: Espionage Profile */}
        <div className="archive-left-col">
          <div className="hero-id-tag">KGB // S.H.I.E.L.D. SPECIAL OPERATIONS</div>
          <h1 className="hero-giant-name">BLACK WIDOW</h1>
          <div className="hero-real-id">NATALIA ALIANOVNA ROMANOVA</div>
          <p className="hero-manifesto">
            "I used to have nothing. And then I got this job, this family. But we're always looking out for each other."
          </p>

          <div className="tactical-directives-stack">
            <div className="directives-title">CLASSIFIED INTEL DOSSIERS:</div>
            {intelLogs.map((log, lIdx) => (
              <div
                key={lIdx}
                className={`directive-card ${activeIntel === lIdx ? 'directive-card-active' : ''}`}
                onClick={() => {
                  setActiveIntel(lIdx);
                  if (onPlayClick) onPlayClick();
                }}
                onMouseEnter={onPlayHover}
              >
                <div className="dir-header">
                  <span className="dir-num">INTEL 0{lIdx + 1}</span>
                  <span className="dir-title">{log.title}</span>
                </div>
                <p className="dir-detail">{log.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Center: Tactical Surveillance Display */}
        <div className="archive-center-3d">
          <div className="widow-surveillance-holo">
            <div className="holo-reticle-circle" />
            <img
              src="/assets/characters/blackwidow.svg"
              alt="Black Widow"
              className="widow-blueprint-graphic"
            />
            <div className="surveillance-telemetry">
              <span className="rec-dot" />
              <span>LIVE BIOMETRIC TRACKING // OMEGA CLEARANCE</span>
            </div>
          </div>

          <div className="stage-controls-overlay">
            <Button
              variant="primary"
              onClick={onPlayClick}
              onHoverSound={onPlayHover}
              className="action-btn"
            >
              ⚡ DECRYPT WIDOW'S BITE PROTOCOL
            </Button>
          </div>
        </div>

        {/* Right Column: Tactical Combat Specs */}
        <div className="archive-right-col">
          <div className="specs-card">
            <div className="spec-tag">COMBAT SPECIFICATIONS</div>
            <div className="stat-row">
              <span className="s-lbl">CLOSE COMBAT ACCURACY</span>
              <span className="s-val">99.8% LETHAL</span>
            </div>
            <div className="stat-row">
              <span className="s-lbl">ESPIONAGE APTITUDE</span>
              <span className="s-val">MASTER CLASS</span>
            </div>
            <div className="stat-row">
              <span className="s-lbl">WIDOW'S BITE VOLTAGE</span>
              <span className="s-val">300,000 VOLTS</span>
            </div>
            <div className="stat-row">
              <span className="s-lbl">POLYGRAPH RESISTANCE</span>
              <span className="s-val">100% UNREADABLE</span>
            </div>
          </div>

          <div className="gear-specs-card">
            <div className="spec-tag">CUSTOM WEAPONS LOADOUT</div>
            <ul className="gear-list">
              <li>› Electroshock Widow’s Bite Gauntlets</li>
              <li>› Dual Electrified Tactical Stun Batons</li>
              <li>› Dual Glock 26 Concealed Firearms</li>
              <li>› Photostatic Holographic Disguise Veil</li>
            </ul>
          </div>

          <div className="status-badge-bar">
            <span className="status-dot" />
            <span className="status-txt">STATUS: HIGHEST HEROIC SERVICE // SOUL STONE SECURED</span>
          </div>
        </div>

      </div>
    </div>
  );
}
