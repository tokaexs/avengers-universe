import type { Threat } from '../data/threatsData';

interface ThreatCardProps {
  threat: Threat;
  onHover?: () => void;
  onClick?: () => void;
}

export default function ThreatCard({ threat, onHover, onClick }: ThreatCardProps) {
  return (
    <div
      className="threat-slide-inner"
      style={{
        '--threat-accent': threat.accentColor,
        '--threat-glow': threat.glowColor,
        '--threat-sec': threat.secondaryColor,
      } as React.CSSProperties}
      onMouseEnter={onHover}
      onClick={onClick}
    >
      {/* Massive Background Threat Watermark */}
      <div className="threat-watermark-title" aria-hidden="true">
        {threat.codename}
      </div>

      <div className="threat-layout-grid">
        
        {/* Column 1: Info, Typography & Tactical Briefing */}
        <div className="threat-col-info">
          
          {/* Header Row */}
          <div className="threat-header-row">
            <span className="threat-num-tag">{threat.threatNumber}</span>
            <span className="threat-tier-pill">{threat.threatTier}</span>
          </div>

          {/* Monumental Codename */}
          <h3 className="threat-codename">
            {threat.codename}
          </h3>

          {/* Moniker */}
          <div className="threat-moniker">
            {threat.moniker}
          </div>

          {/* Kinetic Stacked Keywords */}
          <div className="threat-keywords-row">
            {threat.keywords.map((kw, kIdx) => (
              <span key={kIdx} className="threat-keyword-badge">
                <span className="k-bullet">⚡</span> {kw}
              </span>
            ))}
          </div>

          {/* Iconic Quote */}
          <blockquote className="threat-quote">
            "{threat.quote}"
          </blockquote>

          {/* Tactical Briefing */}
          <p className="threat-briefing-text">
            {threat.briefing}
          </p>

          {/* Danger Metrics Grid */}
          <div className="threat-metrics-grid">
            {threat.metrics.map((metric, mIdx) => (
              <div key={mIdx} className="threat-metric-box">
                <span className="t-metric-label">{metric.label}</span>
                <span className="t-metric-val">{metric.value}</span>
              </div>
            ))}
          </div>

          {/* Origin & Primary Power */}
          <div className="threat-origin-bar">
            <span className="origin-label">ORIGIN:</span> {threat.origin}
          </div>

        </div>

        {/* Column 2: Holographic Threat Blueprint Display */}
        <div className="threat-col-visual">
          <div className="threat-visual-container">
            
            {/* Corner Tech Reticles */}
            <span className="t-reticle reticle-tl" />
            <span className="t-reticle reticle-tr" />
            <span className="t-reticle reticle-bl" />
            <span className="t-reticle reticle-br" />

            {/* Rotating Cybernetic Target Ring */}
            <div className="threat-target-ring" />

            {/* Graphic Artwork */}
            <div className="threat-art-wrapper">
              <img
                src={threat.image}
                alt={`${threat.codename} Threat Analysis`}
                className="threat-art-img"
                loading="eager"
              />
            </div>

            {/* Live Security Warning Bar */}
            <div className="threat-warning-bar">
              <span className="warning-flash-dot" />
              <span className="warning-text">CRITICAL HAZARD // OMEGA PROTOCOL</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
