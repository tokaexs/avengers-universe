import { useState } from 'react';
import { INITIATIVE_PROTOCOLS, TIMELINE_LOGS, type InitiativeProtocol } from '../data/initiativeData';

interface InitiativePageProps {
  onPlayHover?: () => void;
  onPlayClick?: () => void;
}

export default function InitiativePage({
  onPlayHover,
  onPlayClick,
}: InitiativePageProps) {
  const [selectedProtocol, setSelectedProtocol] = useState<InitiativeProtocol>(INITIATIVE_PROTOCOLS[0]);

  return (
    <div className="initiative-command-page">
      <div className="initiative-ambient-glow" />

      {/* Top HUD */}
      <div className="gateway-header-bar">
        <div className="gateway-tag">
          <span className="bracket">[</span> S.H.I.E.L.D. AVENGERS INITIATIVE // HIGH COMMAND <span className="bracket">]</span>
        </div>
        <div className="gateway-status">
          DIRECTIVE 7-A // GLOBAL PROTOCOLS ACTIVE
        </div>
      </div>

      {/* Main Page Title */}
      <div className="initiative-header-area">
        <div className="sub-tag">STRATEGIC HOMELAND INTERVENTION</div>
        <h1 className="hero-page-title">THE INITIATIVE</h1>
        <p className="hero-page-desc">
          "There was an idea, to bring together a group of remarkable people, to see if we could become something more."
        </p>
      </div>

      {/* Quote Banner */}
      <div className="fury-quote-banner">
        <div className="quote-speaker">DIRECTOR NICHOLAS J. FURY // S.H.I.E.L.D. EXECUTIVE</div>
        <blockquote className="quote-text">
          "To see if they could work together when we needed them to, to fight the battles that we never could."
        </blockquote>
      </div>

      {/* Protocols Grid */}
      <div className="protocols-section">
        <h2 className="section-small-title">STRATEGIC DEFENSE PROTOCOLS</h2>
        <div className="protocols-grid">
          {INITIATIVE_PROTOCOLS.map((protocol) => {
            const isSelected = selectedProtocol.id === protocol.id;
            return (
              <div
                key={protocol.id}
                className={`protocol-card ${isSelected ? 'protocol-card-active' : ''}`}
                onClick={() => {
                  setSelectedProtocol(protocol);
                  if (onPlayClick) onPlayClick();
                }}
                onMouseEnter={onPlayHover}
              >
                <div className="protocol-card-header">
                  <span className="protocol-code">{protocol.code}</span>
                  <span className={`protocol-status status-${protocol.status.toLowerCase()}`}>
                    {protocol.status}
                  </span>
                </div>

                <h3 className="protocol-title">{protocol.title}</h3>
                <div className="protocol-class">{protocol.classification}</div>
                <p className="protocol-summary">{protocol.summary}</p>

                <div className="protocol-telemetry">
                  <span className="telemetry-lbl">TELEMETRY:</span>
                  <span className="telemetry-val">{protocol.telemetryMetric}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Historical Command Logs */}
      <div className="command-logs-section">
        <h2 className="section-small-title">INITIATIVE DIRECTIVE TIMELINE</h2>
        <div className="command-timeline-stack">
          {TIMELINE_LOGS.map((log, idx) => (
            <div key={idx} className="command-log-row" onMouseEnter={onPlayHover}>
              <div className="log-year-pill">{log.year}</div>
              <div className="log-body">
                <div className="log-event-title">{log.event}</div>
                <p className="log-event-desc">{log.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
