import { useState } from 'react';
import { HEROES_DATA, type Hero } from '../data/heroesData';
import DossierModal from '../components/DossierModal';
import Button from '../components/Button';

interface RosterSectionProps {
  onPlayHover?: () => void;
  onPlayClick?: () => void;
}

export default function RosterSection({
  onPlayHover,
  onPlayClick,
}: RosterSectionProps) {
  const [selectedHero, setSelectedHero] = useState<Hero | null>(null);

  const handleOpenDossier = (hero: Hero) => {
    if (onPlayClick) onPlayClick();
    setSelectedHero(hero);
  };

  return (
    <section id="roster" className="roster-section">
      <div className="section-container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <span className="tag-bracket">[</span> CLASSIFIED PERSONNEL // 002 <span className="tag-bracket">]</span>
          </div>
          <h2 className="section-title">ACTIVE ROSTER DOSSIERS</h2>
          <p className="section-lead">
            Tactical profiles, biometrics, combat metrics, and clearance levels for primary Avengers Initiative operatives.
          </p>
        </div>

        {/* Heroes Grid */}
        <div className="roster-grid">
          {HEROES_DATA.map((hero) => {
            return (
              <div
                key={hero.id}
                className="hero-card"
                style={{ '--card-accent': hero.accentColor } as React.CSSProperties}
                onMouseEnter={onPlayHover}
              >
                {/* Holographic Header Bar */}
                <div className="hero-card-header">
                  <span className="hero-class-badge">{hero.threatClass} CLASS</span>
                  <span className="hero-clearance-pill">LVL {hero.clearanceLevel}</span>
                </div>

                {/* Hero Details */}
                <div className="hero-card-body">
                  <h3 className="hero-card-name">{hero.codename}</h3>
                  <p className="hero-card-real">{hero.realName}</p>
                  <p className="hero-card-role">{hero.role}</p>

                  {/* Primary Tech Tag */}
                  <div className="hero-tech-pill">
                    <span className="tech-dot" />
                    <span className="tech-text">{hero.primaryTech}</span>
                  </div>

                  {/* Mini Stat Previews */}
                  <div className="hero-mini-stats">
                    <div className="mini-stat">
                      <span className="mini-stat-label">STR</span>
                      <div className="mini-stat-bar">
                        <div className="mini-stat-fill" style={{ width: `${hero.stats.strength}%` }} />
                      </div>
                    </div>
                    <div className="mini-stat">
                      <span className="mini-stat-label">INT</span>
                      <div className="mini-stat-bar">
                        <div className="mini-stat-fill" style={{ width: `${hero.stats.intelligence}%` }} />
                      </div>
                    </div>
                    <div className="mini-stat">
                      <span className="mini-stat-label">CMB</span>
                      <div className="mini-stat-bar">
                        <div className="mini-stat-fill" style={{ width: `${hero.stats.combat}%` }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hero Card Footer */}
                <div className="hero-card-footer">
                  <Button
                    variant="secondary"
                    onClick={() => handleOpenDossier(hero)}
                    onHoverSound={onPlayHover}
                    className="view-dossier-btn"
                  >
                    ACCESS DOSSIER
                  </Button>
                </div>

                {/* Corner Laser Notches */}
                <span className="card-notch notch-tl" />
                <span className="card-notch notch-br" />
              </div>
            );
          })}
        </div>

      </div>

      {/* Deep Dossier Modal */}
      <DossierModal
        hero={selectedHero}
        onClose={() => setSelectedHero(null)}
        onPlayHover={onPlayHover}
        onPlayClick={onPlayClick}
      />
    </section>
  );
}
