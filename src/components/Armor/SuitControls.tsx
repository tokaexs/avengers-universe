import Button from '../Button';

interface SuitControlsProps {
  onPrev: () => void;
  onNext: () => void;
  isInspecting: boolean;
  onToggleInspect: () => void;
  isAssembling: boolean;
  onToggleAssembly: () => void;
  onPlayHover?: () => void;
  onPlayClick?: () => void;
}

export default function SuitControls({
  onPrev,
  onNext,
  isInspecting,
  onToggleInspect,
  isAssembling,
  onToggleAssembly,
  onPlayHover,
  onPlayClick,
}: SuitControlsProps) {
  return (
    <div className="suit-master-controls-bar">
      {/* Navigation Arrows */}
      <div className="suit-nav-pills">
        <button
          className="suit-arrow-btn"
          onClick={() => {
            onPrev();
            if (onPlayClick) onPlayClick();
          }}
          onMouseEnter={onPlayHover}
          title="Previous Armor"
        >
          ‹ PREV SUIT
        </button>
        <button
          className="suit-arrow-btn"
          onClick={() => {
            onNext();
            if (onPlayClick) onPlayClick();
          }}
          onMouseEnter={onPlayHover}
          title="Next Armor"
        >
          NEXT SUIT ›
        </button>
      </div>

      {/* Action Modes */}
      <div className="suit-action-modes">
        <Button
          variant={isAssembling ? 'secondary' : 'primary'}
          onClick={() => {
            onToggleAssembly();
            if (onPlayClick) onPlayClick();
          }}
          onHoverSound={onPlayHover}
          className="suit-mode-btn"
        >
          {isAssembling ? '⚡ LOCK ARMOR' : '⚙️ ASSEMBLE SUIT'}
        </Button>

        <Button
          variant={isInspecting ? 'secondary' : 'ghost'}
          onClick={() => {
            onToggleInspect();
            if (onPlayClick) onPlayClick();
          }}
          onHoverSound={onPlayHover}
          className="suit-mode-btn"
        >
          {isInspecting ? '✕ EXIT INSPECTION' : '🔍 INSPECT'}
        </Button>
      </div>
    </div>
  );
}
