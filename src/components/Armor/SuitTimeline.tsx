import type { IronManSuit } from '../../data/ironManSuits';

interface SuitTimelineProps {
  suits: IronManSuit[];
  selectedIndex: number;
  onSelectIndex: (index: number) => void;
  onPlayHover?: () => void;
  onPlayClick?: () => void;
}

export default function SuitTimeline({
  suits,
  selectedIndex,
  onSelectIndex,
  onPlayHover,
  onPlayClick,
}: SuitTimelineProps) {
  return (
    <div className="suit-timeline-bottom-rail">
      <div className="timeline-rail-label">
        <span>ARMOR TIMELINE</span>
        <span className="rail-sub">// 2008 - 2023</span>
      </div>

      <div className="suit-timeline-pills-row">
        {suits.map((suit, sIdx) => {
          const isSelected = selectedIndex === sIdx;
          return (
            <button
              key={suit.id}
              className={`timeline-suit-pill ${isSelected ? 'timeline-suit-pill-active' : ''}`}
              onClick={() => {
                onSelectIndex(sIdx);
                if (onPlayClick) onPlayClick();
              }}
              onMouseEnter={onPlayHover}
              title={`${suit.model}: ${suit.name}`}
            >
              <span className="pill-roman">{suit.isHulkbuster ? 'XLIV' : suit.roman}</span>
              <span className="pill-model">{suit.isHulkbuster ? 'HULKBUSTER' : suit.model}</span>
              {isSelected && <span className="pill-active-glow" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
