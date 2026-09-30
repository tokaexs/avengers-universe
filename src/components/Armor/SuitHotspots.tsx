import type { Hotspot } from '../../data/ironManSuits';

interface SuitHotspotsProps {
  hotspots: Hotspot[];
  selectedHotspot: Hotspot | null;
  onSelectHotspot: (hotspot: Hotspot | null) => void;
  onPlayHover?: () => void;
  onPlayClick?: () => void;
}

export default function SuitHotspots({
  hotspots,
  selectedHotspot,
  onSelectHotspot,
  onPlayHover,
  onPlayClick,
}: SuitHotspotsProps) {
  return (
    <div className="suit-hotspots-hud-container">
      <div className="hotspots-hud-header">
        <span className="dot-cyan" /> DIAGNOSTIC INSPECTION HOTSPOTS:
      </div>

      <div className="hotspots-chip-list">
        {hotspots.map((hs) => {
          const isSelected = selectedHotspot?.id === hs.id;
          return (
            <button
              key={hs.id}
              className={`hotspot-hud-chip ${isSelected ? 'hotspot-hud-chip-active' : ''}`}
              onClick={() => {
                onSelectHotspot(isSelected ? null : hs);
                if (onPlayClick) onPlayClick();
              }}
              onMouseEnter={onPlayHover}
            >
              <span className="hs-indicator" />
              <span className="hs-label">{hs.name}</span>
            </button>
          );
        })}
      </div>

      {/* Focused Hotspot Technical Information Card */}
      {selectedHotspot && (
        <div className="hotspot-detail-drawer">
          <div className="drawer-top">
            <span className="drawer-cat">{selectedHotspot.category}</span>
            <span className="drawer-tel">{selectedHotspot.telemetry}</span>
          </div>
          <h3 className="drawer-title">{selectedHotspot.name}</h3>
          <p className="drawer-desc">{selectedHotspot.description}</p>
        </div>
      )}
    </div>
  );
}
