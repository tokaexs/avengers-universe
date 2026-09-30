import { useState } from 'react';
import { MISSIONS_DATA, type Mission } from '../data/missions';

interface MissionsPageProps {
  onPlayHover?: () => void;
  onPlayClick?: () => void;
}

export default function MissionsPage({
  onPlayHover,
  onPlayClick,
}: MissionsPageProps) {
  const [selectedMission, setSelectedMission] = useState<Mission>(MISSIONS_DATA[0]);

  return (
    <div
      className="missions-archive-page"
      style={{
        '--mission-accent': selectedMission.accentColor,
      } as React.CSSProperties}
    >
      <div className="missions-bg-glow" />

      {/* Header Bar */}
      <div className="gateway-header-bar">
        <div className="gateway-tag">
          <span className="bracket">[</span> S.H.I.E.L.D. TACTICAL COMBAT LOGS // MISSION ARCHIVE <span className="bracket">]</span>
        </div>
        <div className="gateway-status">
          LOGGED OPERATIONS: 05 // WORLD SECURITY COUNCIL
        </div>
      </div>

      {/* Page Title */}
      <div className="missions-page-header">
        <div className="sub-tag">CLASSIFIED OPERATIONAL RECORDS</div>
        <h1 className="hero-page-title">MISSIONS</h1>
        <p className="hero-page-desc">
          Declassified tactical briefings, deployment rosters, planetary battle damage assessments, and engagement outcomes.
        </p>
      </div>

      {/* Main Grid: Mission List and Mission Detail Briefing */}
      <div className="missions-layout-grid">
        
        {/* Left Column: Mission Select Stack */}
        <div className="missions-list-column">
          <div className="missions-stack">
            {MISSIONS_DATA.map((m) => {
              const isSelected = selectedMission.id === m.id;
              return (
                <div
                  key={m.id}
                  className={`mission-item-card ${isSelected ? 'mission-item-card-active' : ''}`}
                  onClick={() => {
                    setSelectedMission(m);
                    if (onPlayClick) onPlayClick();
                  }}
                  onMouseEnter={() => {
                    if (onPlayHover) onPlayHover();
                  }}
                  style={{ '--card-accent': m.accentColor } as React.CSSProperties}
                >
                  <div className="mission-item-top">
                    <span className="mission-code">{m.missionCode}</span>
                    <span className={`mission-status-tag status-${m.status.toLowerCase()}`}>
                      {m.status}
                    </span>
                  </div>
                  <h3 className="mission-item-title">{m.codename}</h3>
                  <div className="mission-item-meta">
                    <span>{m.year}</span> • <span>{m.location}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Mission Deep Briefing Dossier */}
        <div className="mission-briefing-column">
          <div className="mission-briefing-card">
            
            <div className="briefing-header-bar">
              <div className="b-code">{selectedMission.missionCode}</div>
              <div className={`b-status-pill status-${selectedMission.status.toLowerCase()}`}>
                STATUS: {selectedMission.status}
              </div>
            </div>

            <h2 className="briefing-title">{selectedMission.codename}</h2>
            
            <div className="briefing-intel-grid">
              <div className="intel-row">
                <span className="i-lbl">OPERATION YEAR:</span>
                <span className="i-val">{selectedMission.year}</span>
              </div>
              <div className="intel-row">
                <span className="i-lbl">THEATRE / LOCATION:</span>
                <span className="i-val">{selectedMission.location}</span>
              </div>
              <div className="intel-row">
                <span className="i-lbl">PRIMARY THREAT:</span>
                <span className="i-val" style={{ color: selectedMission.accentColor }}>{selectedMission.threat}</span>
              </div>
            </div>

            <div className="briefing-section-title">TACTICAL BRIEFING</div>
            <p className="briefing-p">{selectedMission.briefing}</p>

            <div className="briefing-section-title">DEPLOYED AVENGERS ROSTER</div>
            <div className="briefing-roster-tags">
              {selectedMission.avengersInvolved.map((hero, hIdx) => (
                <span key={hIdx} className="hero-deployed-badge">
                  <span className="shield-dot">🛡️</span> {hero}
                </span>
              ))}
            </div>

            <div className="briefing-section-title">OPERATIONAL OUTCOME</div>
            <div className="briefing-outcome-box">
              {selectedMission.outcome}
            </div>

            <div className="briefing-metrics-grid">
              {selectedMission.metrics.map((met, mIdx) => (
                <div key={mIdx} className="b-metric-box">
                  <span className="b-m-lbl">{met.label}</span>
                  <span className="b-m-val">{met.value}</span>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
