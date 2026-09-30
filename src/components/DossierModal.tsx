import { useEffect } from 'react';
import type { Hero } from '../data/heroesData';
import Button from './Button';

interface DossierModalProps {
  hero: Hero | null;
  onClose: () => void;
  onPlayHover?: () => void;
  onPlayClick?: () => void;
}

export default function DossierModal({
  hero,
  onClose,
  onPlayHover,
  onPlayClick
}: DossierModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (hero) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [hero, onClose]);

  if (!hero) return null;

  return (
    <div className="dossier-modal-backdrop" onClick={onClose}>
      <div 
        className="dossier-modal-window" 
        onClick={(e) => e.stopPropagation()}
        style={{ '--hero-color': hero.accentColor } as React.CSSProperties}
      >
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-classification">
            <span className="clearance-tag">
              LEVEL {hero.clearanceLevel} // {hero.threatClass} CLASS
            </span>
            <span className="status-badge" data-status={hero.status}>
              {hero.status}
            </span>
          </div>

          <button 
            className="modal-close-btn"
            onClick={() => {
              if (onPlayClick) onPlayClick();
              onClose();
            }}
            onMouseEnter={onPlayHover}
            aria-label="Close Dossier"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-content-grid">
          
          {/* Column 1: Identity & Technical Specs */}
          <div className="modal-col-main">
            <h2 className="modal-hero-codename">{hero.codename}</h2>
            <p className="modal-hero-realname">ID: {hero.realName}</p>
            <p className="modal-hero-role">{hero.role}</p>

            <blockquote className="modal-hero-quote">
              "{hero.quote}"
            </blockquote>

            <div className="modal-bio-block">
              <h4 className="modal-section-title">TACTICAL BRIEFING</h4>
              <p className="modal-bio-text">{hero.biography}</p>
            </div>

            <div className="modal-tech-block">
              <h4 className="modal-section-title">PRIMARY COMBAT SPECIFICATIONS</h4>
              <p className="modal-tech-text">{hero.primaryTech}</p>
              <p className="modal-affiliation">AFFILIATION: {hero.affiliation}</p>
            </div>
          </div>

          {/* Column 2: Tactical Power Index & Equipment */}
          <div className="modal-col-stats">
            <h4 className="modal-section-title">COMBAT EFFECTIVENESS INDEX</h4>
            
            <div className="stat-bars-container">
              <div className="stat-row">
                <span className="stat-name">STRENGTH</span>
                <div className="stat-bar-track">
                  <div className="stat-bar-fill" style={{ width: `${hero.stats.strength}%` }} />
                </div>
                <span className="stat-value">{hero.stats.strength}</span>
              </div>

              <div className="stat-row">
                <span className="stat-name">INTELLIGENCE</span>
                <div className="stat-bar-track">
                  <div className="stat-bar-fill" style={{ width: `${hero.stats.intelligence}%` }} />
                </div>
                <span className="stat-value">{hero.stats.intelligence}</span>
              </div>

              <div className="stat-row">
                <span className="stat-name">COMBAT SKILL</span>
                <div className="stat-bar-track">
                  <div className="stat-bar-fill" style={{ width: `${hero.stats.combat}%` }} />
                </div>
                <span className="stat-value">{hero.stats.combat}</span>
              </div>

              <div className="stat-row">
                <span className="stat-name">AGILITY / SPEED</span>
                <div className="stat-bar-track">
                  <div className="stat-bar-fill" style={{ width: `${hero.stats.speed}%` }} />
                </div>
                <span className="stat-value">{hero.stats.speed}</span>
              </div>

              <div className="stat-row">
                <span className="stat-name">TECH APTITUDE</span>
                <div className="stat-bar-track">
                  <div className="stat-bar-fill" style={{ width: `${hero.stats.techLevel}%` }} />
                </div>
                <span className="stat-value">{hero.stats.techLevel}</span>
              </div>
            </div>

            {/* Gear & Loadout */}
            <div className="modal-equipment-section">
              <h4 className="modal-section-title">ASSIGNED HARDWARE // LOADOUT</h4>
              <ul className="equipment-list">
                {hero.equipment.map((item, idx) => (
                  <li key={idx} className="equipment-item">
                    <span className="item-bullet">›</span> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Recent Operations */}
            <div className="modal-ops-section">
              <h4 className="modal-section-title">RECENT DIRECTIVES</h4>
              <ul className="ops-list">
                {hero.recentOps.map((op, idx) => (
                  <li key={idx} className="ops-item">
                    <span className="ops-tag">LOG {idx + 1}</span> {op}
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="modal-footer">
          <span className="dossier-hash">
            STARK-AUTH-{hero.id.toUpperCase()}-VERIFIED
          </span>
          <Button 
            variant="secondary" 
            onClick={onClose}
            onHoverSound={onPlayHover}
            onClickSound={onPlayClick}
          >
            CLOSE DOSSIER
          </Button>
        </div>

      </div>
    </div>
  );
}
