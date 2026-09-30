import { useState } from 'react';
import { TIMELINE_EVENTS, type TimelineEvent } from '../data/timeline';

interface TimelinePageProps {
  onPlayHover?: () => void;
  onPlayClick?: () => void;
}

export default function TimelinePage({
  onPlayHover,
  onPlayClick,
}: TimelinePageProps) {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent>(TIMELINE_EVENTS[0]);

  return (
    <div
      className="timeline-full-page"
      style={{
        '--event-accent': selectedEvent.accentColor,
        '--event-glow': selectedEvent.glowColor,
      } as React.CSSProperties}
    >
      {/* Background Ambient Glow */}
      <div className="timeline-bg-glow" />

      {/* Top HUD bar */}
      <div className="gateway-header-bar">
        <div className="gateway-tag">
          <span className="bracket">[</span> S.H.I.E.L.D. TEMPORAL ARCHIVE // 1942 - PRESENT <span className="bracket">]</span>
        </div>
        <div className="gateway-status">
          ACTIVE ERA: {selectedEvent.era} // CLEARANCE LEVEL 10
        </div>
      </div>

      {/* Hero Header */}
      <div className="timeline-page-header">
        <div className="sub-tag">SACRED TIMELINE CHRONOLOGY</div>
        <h1 className="hero-page-title">THE TIMELINE</h1>
        <p className="hero-page-desc">
          Chronological record of Earth's defense, multiversal incursions, cosmic battles, and pivotal moments in Avengers history.
        </p>
      </div>

      {/* Interactive Year Selector Bar */}
      <div className="timeline-selector-strip">
        {TIMELINE_EVENTS.map((item) => {
          const isSelected = selectedEvent.id === item.id;
          return (
            <button
              key={item.id}
              className={`timeline-year-btn ${isSelected ? 'timeline-year-btn-active' : ''}`}
              onClick={() => {
                setSelectedEvent(item);
                if (onPlayClick) onPlayClick();
              }}
              onMouseEnter={onPlayHover}
              style={{ '--item-accent': item.accentColor } as React.CSSProperties}
            >
              <span className="timeline-btn-year">{item.year}</span>
              <span className="timeline-btn-era">{item.era}</span>
            </button>
          );
        })}
      </div>

      {/* Active Event Spotlight Showcase */}
      <div className="timeline-spotlight-card">
        <div className="spotlight-left">
          <div className="spotlight-badge-row">
            <span className="spotlight-year-tag">{selectedEvent.year}</span>
            <span className="spotlight-threat-tag">{selectedEvent.threatLevel}</span>
          </div>

          <h2 className="spotlight-title">{selectedEvent.title}</h2>
          <div className="spotlight-subtitle">{selectedEvent.subtitle}</div>
          <p className="spotlight-desc">{selectedEvent.description}</p>

          <div className="spotlight-location-box">
            <span className="loc-label">TACTICAL THEATRE:</span>
            <span className="loc-val">{selectedEvent.location}</span>
          </div>

          <div className="spotlight-stats-grid">
            {selectedEvent.stats.map((st, i) => (
              <div key={i} className="spotlight-stat-item">
                <span className="s-label">{st.label}</span>
                <span className="s-val">{st.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="spotlight-right">
          <div className="spotlight-graphic-frame">
            <img
              src={selectedEvent.image}
              alt={selectedEvent.title}
              className="spotlight-graphic"
            />
            <span className="h-reticle tl" />
            <span className="h-reticle tr" />
            <span className="h-reticle bl" />
            <span className="h-reticle br" />
          </div>
        </div>
      </div>

      {/* All Events Chronological List Below */}
      <div className="timeline-events-flow">
        <h3 className="flow-title">COMPLETE CHRONOLOGICAL LOGS</h3>
        <div className="flow-grid">
          {TIMELINE_EVENTS.map((ev, idx) => (
            <div
              key={ev.id}
              className={`flow-card ${ev.id === selectedEvent.id ? 'flow-card-active' : ''}`}
              onClick={() => {
                setSelectedEvent(ev);
                if (onPlayClick) onPlayClick();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onMouseEnter={onPlayHover}
              style={{ '--card-accent': ev.accentColor } as React.CSSProperties}
            >
              <div className="flow-card-top">
                <span className="flow-num">0{idx + 1}</span>
                <span className="flow-year">{ev.year}</span>
              </div>
              <h4 className="flow-event-title">{ev.title}</h4>
              <p className="flow-summary">{ev.subtitle}</p>
              <div className="flow-location">{ev.location}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
