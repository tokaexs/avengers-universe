import { Link } from 'react-router-dom';
import { THREATS_DATA } from '../../data/threats';

interface ThreatSubPageProps {
  onPlayHover?: () => void;
  onPlayClick?: () => void;
}

export default function ThanosThreatPage({
  onPlayHover,
  onPlayClick,
}: ThreatSubPageProps) {
  const threat = THREATS_DATA.find((t) => t.id === 'thanos') || THREATS_DATA[1];

  return (
    <div
      className="threat-deep-dossier-page"
      style={{
        '--threat-accent': threat.accentColor,
        '--threat-glow': threat.glowColor,
      } as React.CSSProperties}
    >
      <div className="threat-bg-glow" />

      {/* Header Bar */}
      <div className="gateway-header-bar">
        <div className="gateway-tag">
          <span className="bracket">[</span> S.H.I.E.L.D. EYES ONLY // THREAT DOSSIER 02 <span className="bracket">]</span>
        </div>
        <Link
          to="/threats"
          className="back-to-gateway"
          onClick={onPlayClick}
          onMouseEnter={onPlayHover}
        >
          ← RETURN TO THREAT MATRIX
        </Link>
      </div>

      <div className="dossier-main-layout">
        {/* Left Column: Dossier Details */}
        <div className="dossier-col-info">
          <div className="dossier-tag-row">
            <span className="dossier-tier-badge">{threat.threatTier}</span>
            <span className="dossier-id-tag">THREAT CODE: TITAN-02-DEC</span>
          </div>

          <h1 className="dossier-name">{threat.codename}</h1>
          <div className="dossier-moniker">{threat.moniker}</div>

          <blockquote className="dossier-quote">"{threat.quote}"</blockquote>

          <div className="dossier-origin-card">
            <div className="origin-row">
              <span className="o-lbl">CLASSIFICATION:</span>
              <span className="o-val">{threat.classification}</span>
            </div>
            <div className="origin-row">
              <span className="o-lbl">CREATOR / ORIGIN:</span>
              <span className="o-val">{threat.origin}</span>
            </div>
            <div className="origin-row">
              <span className="o-lbl">PRIMARY ANOMALY:</span>
              <span className="o-val">{threat.primaryPower}</span>
            </div>
          </div>

          <div className="dossier-section-title">TACTICAL BRIEFING</div>
          <p className="dossier-briefing-p">{threat.briefing}</p>

          <div className="dossier-section-title">COSMIC TELEMETRY & STONES RECORD</div>
          <div className="dossier-metrics-grid">
            {threat.metrics.map((m, idx) => (
              <div key={idx} className="dossier-metric-box">
                <span className="dm-lbl">{m.label}</span>
                <span className="dm-val">{m.value}</span>
              </div>
            ))}
          </div>

          <div className="dossier-keywords-wrap">
            {threat.keywords.map((kw, i) => (
              <span key={i} className="dossier-keyword-pill">
                #{kw}
              </span>
            ))}
          </div>
        </div>

        {/* Right Column: Hologram Visual & Containment Status */}
        <div className="dossier-col-visual">
          <div className="dossier-visual-frame">
            <img
              src={threat.image}
              alt={threat.codename}
              className="dossier-threat-img"
            />
            <span className="h-reticle tl" />
            <span className="h-reticle tr" />
            <span className="h-reticle bl" />
            <span className="h-reticle br" />
            <div className="dossier-scanline" />
          </div>

          <div className="dossier-containment-status">
            <div className="containment-title" style={{ color: '#ffd000' }}>
              <span className="dot-gold" /> PURGE STATUS: ATOMIC VAPORIZATION
            </div>
            <p className="containment-desc">
              Thanos and his 2014 armada were eradicated into quantum dust during the Battle of Earth via Tony Stark's nano-gauntlet sacrifice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
