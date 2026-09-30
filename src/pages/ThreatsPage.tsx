import { useState } from 'react';
import { Link } from 'react-router-dom';
import { THREATS_DATA } from '../data/threats';

interface ThreatsPageProps {
  onPlayHover?: () => void;
  onPlayClick?: () => void;
}

export default function ThreatsPage({
  onPlayHover,
  onPlayClick,
}: ThreatsPageProps) {
  const [activeThreat, setActiveThreat] = useState(THREATS_DATA[0]);

  return (
    <div
      className="threats-full-page"
      style={{
        '--threat-accent': activeThreat.accentColor,
        '--threat-glow': activeThreat.glowColor,
      } as React.CSSProperties}
    >
      {/* Background Ambient Glow */}
      <div className="threats-bg-glow" />

      {/* Top HUD bar */}
      <div className="gateway-header-bar">
        <div className="gateway-tag">
          <span className="bracket">[</span> S.H.I.E.L.D. GLOBAL DEFENSE // THREAT MATRIX <span className="bracket">]</span>
        </div>
        <div className="gateway-status">
          ACTIVE SURVEILLANCE: 03 OMEGA TARGETS // DEFCON 1
        </div>
      </div>

      {/* Page Header */}
      <div className="threats-page-header">
        <div className="sub-tag">GLOBAL THREAT DOSSIERS</div>
        <h1 className="hero-page-title">GLOBAL THREATS</h1>
        <p className="hero-page-desc">
          Classified tactical records, physiological telemetry, combat ratings, and deep dossiers for existential threats to Earth and reality.
        </p>
      </div>

      {/* 3 Main Threat Cards */}
      <div className="threats-grid-cards">
        {THREATS_DATA.map((threat) => {
          const isSelected = activeThreat.id === threat.id;
          return (
            <div
              key={threat.id}
              className={`threat-overview-card ${isSelected ? 'threat-overview-card-active' : ''}`}
              onMouseEnter={() => {
                setActiveThreat(threat);
                if (onPlayHover) onPlayHover();
              }}
              style={{ '--card-threat-accent': threat.accentColor } as React.CSSProperties}
            >
              <div className="card-threat-number">{threat.threatNumber}</div>
              <div className="card-threat-tier">{threat.threatTier}</div>
              
              <h2 className="card-threat-title">{threat.codename}</h2>
              <div className="card-threat-moniker">{threat.moniker}</div>

              <div className="card-visual-box">
                <img
                  src={threat.image}
                  alt={threat.codename}
                  className="card-threat-img"
                />
              </div>

              <p className="card-threat-quote">"{threat.quote}"</p>

              <div className="card-metrics-strip">
                {threat.metrics.map((m, i) => (
                  <div key={i} className="card-metric-entry">
                    <span className="c-m-lbl">{m.label}</span>
                    <span className="c-m-val">{m.value}</span>
                  </div>
                ))}
              </div>

              <Link
                to={`/threats/${threat.id}`}
                className="threat-dossier-btn"
                onClick={onPlayClick}
                onMouseEnter={onPlayHover}
              >
                OPEN CLASSIFIED DOSSIER →
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
