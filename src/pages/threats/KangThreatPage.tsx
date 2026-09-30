import { Link } from 'react-router-dom';
import { THREATS_DATA } from '../../data/threats';

interface ThreatSubPageProps {
  onPlayHover?: () => void;
  onPlayClick?: () => void;
}

export default function KangThreatPage({
  onPlayHover,
  onPlayClick,
}: ThreatSubPageProps) {
  const threat = THREATS_DATA.find((t) => t.id === 'kang') || THREATS_DATA[2];

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
          <span className="bracket">[</span> S.H.I.E.L.D. EYES ONLY // THREAT DOSSIER 03 <span className="bracket">]</span>
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
            <span className="dossier-id-tag">THREAT CODE: CHRONO-03-KANG</span>
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

          <div className="dossier-section-title">MULTIVERSAL CHRONO METRICS</div>
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
            <div className="containment-title" style={{ color: '#00ffaa' }}>
              <span className="dot-green" /> PURGE STATUS: MULTIVERSAL THREAT ACTIVE
            </div>
            <p className="containment-desc">
              Infinite temporal variants detected across quantum realities. Council of Kangs active in extradimensional space. S.H.I.E.L.D. multiversal alert remains DEFCON 1.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
