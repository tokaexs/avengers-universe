import { useState } from 'react';
import { INITIATIVE_PROTOCOLS, TIMELINE_LOGS, type InitiativeProtocol } from '../data/initiativeData';

interface InitiativeSectionProps {
  onPlayHover?: () => void;
  onPlayClick?: () => void;
}

export default function InitiativeSection({
  onPlayHover,
  onPlayClick,
}: InitiativeSectionProps) {
  const [activeProtocol, setActiveProtocol] = useState<InitiativeProtocol>(INITIATIVE_PROTOCOLS[0]);

  return (
    <section id="directives" className="initiative-section">
      <div className="section-container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <span className="tag-bracket">[</span> S.H.I.E.L.D. ARCHIVE // 001 <span className="tag-bracket">]</span>
          </div>
          <h2 className="section-title">THE AVENGERS INITIATIVE</h2>
          <p className="section-lead">
            "There was an idea, to bring together a group of remarkable people, to see if they could become something more. To see if they could work together when we needed them to, to fight the battles that we never could."
          </p>
          <div className="quote-author">— DIRECTOR NICHOLAS J. FURY</div>
        </div>

        {/* Tactical Defense Protocols Grid */}
        <div className="protocols-wrapper">
          <div className="protocols-header-row">
            <span className="protocols-category-title">STRATEGIC DEFENSE DIRECTIVES</span>
            <span className="protocols-status-label">SYS.SECURITY: MAX_LEVEL_10</span>
          </div>

          <div className="protocols-grid">
            {INITIATIVE_PROTOCOLS.map((protocol) => {
              const isSelected = activeProtocol.id === protocol.id;
              return (
                <div
                  key={protocol.id}
                  className={`protocol-card ${isSelected ? 'protocol-card-active' : ''}`}
                  onClick={() => {
                    if (onPlayClick) onPlayClick();
                    setActiveProtocol(protocol);
                  }}
                  onMouseEnter={onPlayHover}
                >
                  <div className="card-top-bar">
                    <span className="card-code">{protocol.code}</span>
                    <span className="card-status-pill">{protocol.status}</span>
                  </div>

                  <h3 className="card-title">{protocol.title}</h3>
                  <p className="card-summary">{protocol.summary}</p>

                  <div className="card-bottom-bar">
                    <span className="card-class">{protocol.classification}</span>
                    <span className="card-metric">{protocol.telemetryMetric}</span>
                  </div>

                  {/* Corner Accent */}
                  <span className="card-corner-accent" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive Chronological Operation Timeline */}
        <div className="timeline-wrapper">
          <div className="timeline-title-row">
            <span className="timeline-header-tag">TACTICAL DEPLOYMENT TIMELINE</span>
            <span className="timeline-status-tag">RECORD CHRONOLOGY // 2008 - PRESENT</span>
          </div>

          <div className="timeline-track">
            {TIMELINE_LOGS.map((item, idx) => (
              <div 
                key={idx} 
                className="timeline-item"
                onMouseEnter={onPlayHover}
              >
                <div className="timeline-marker">
                  <div className="marker-dot" />
                  <div className="marker-year">{item.year}</div>
                </div>
                <div className="timeline-content">
                  <h4 className="timeline-event-name">{item.event}</h4>
                  <p className="timeline-desc">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
