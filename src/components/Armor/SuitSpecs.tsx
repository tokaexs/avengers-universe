import type { IronManSuit } from '../../data/ironManSuits';

interface SuitSpecsProps {
  suit: IronManSuit;
}

export default function SuitSpecs({ suit }: SuitSpecsProps) {
  // Helper to render futuristic block meter
  const renderBlocks = (val: number) => {
    const total = 10;
    const filled = Math.round((val / 100) * total);
    return Array.from({ length: total }, (_, i) => (
      <span
        key={i}
        className={`stat-block ${i < filled ? 'stat-block-filled' : 'stat-block-empty'}`}
      >
        {i < filled ? '◼' : '◻'}
      </span>
    ));
  };

  return (
    <div className="suit-specs-sidebar-card">
      {/* Header */}
      <div className="specs-card-header">
        <span className="specs-model-pill">{suit.model}</span>
        <span className="specs-era-tag">{suit.era}</span>
      </div>

      <h1 className="specs-suit-title">{suit.name}</h1>
      <div className="specs-designation-text">{suit.designation}</div>
      <p className="specs-description-p">{suit.description}</p>

      {/* Futuristic Stat Indicators */}
      <div className="specs-meters-box">
        <div className="meter-entry">
          <div className="m-info">
            <span className="m-label">ARMOR INTEGRITY</span>
            <span className="m-val">{suit.stats.armor}%</span>
          </div>
          <div className="m-blocks-row">{renderBlocks(suit.stats.armor)}</div>
        </div>

        <div className="meter-entry">
          <div className="m-info">
            <span className="m-label">ARC POWER CORE</span>
            <span className="m-val">{suit.stats.power}%</span>
          </div>
          <div className="m-blocks-row">{renderBlocks(suit.stats.power)}</div>
        </div>

        <div className="meter-entry">
          <div className="m-info">
            <span className="m-label">FLIGHT MOBILITY</span>
            <span className="m-val">{suit.stats.mobility}%</span>
          </div>
          <div className="m-blocks-row">{renderBlocks(suit.stats.mobility)}</div>
        </div>

        <div className="meter-entry">
          <div className="m-info">
            <span className="m-label">WEAPON SYSTEMS</span>
            <span className="m-val">{suit.stats.weapons}%</span>
          </div>
          <div className="m-blocks-row">{renderBlocks(suit.stats.weapons)}</div>
        </div>
      </div>

      {/* Hardware Telemetry Grid */}
      <div className="specs-telemetry-grid">
        <div className="tel-row">
          <span className="tel-k">MATERIALS:</span>
          <span className="tel-v">{suit.materials}</span>
        </div>
        <div className="tel-row">
          <span className="tel-k">POWER SOURCE:</span>
          <span className="tel-v">{suit.powerSource}</span>
        </div>
        <div className="tel-row">
          <span className="tel-k">PROPULSION:</span>
          <span className="tel-v">{suit.flightSystem}</span>
        </div>
        <div className="tel-row">
          <span className="tel-k">DEFENSE:</span>
          <span className="tel-v">{suit.defense}</span>
        </div>
      </div>

      {/* Weapons Loadout */}
      <div className="specs-weapons-area">
        <div className="w-title">TACTICAL ORDNANCE:</div>
        <div className="w-badges-wrap">
          {suit.weapons.map((w, idx) => (
            <span key={idx} className="weapon-badge">
              ⚡ {w}
            </span>
          ))}
        </div>
      </div>

      {/* Technical Details Metrics */}
      <div className="specs-quick-metrics">
        {suit.technicalDetails.map((td, tIdx) => (
          <div key={tIdx} className="qm-cell">
            <span className="qm-label">{td.label}</span>
            <span className="qm-value">{td.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
