import type { IronManSuit } from '../../data/ironManSuits';

interface SuitHUDProps {
  suit: IronManSuit;
  currentIndex: number;
  totalSuits: number;
}

export default function SuitHUD({ suit, currentIndex, totalSuits }: SuitHUDProps) {
  const indexFormatted = String(currentIndex + 1).padStart(2, '0');
  const totalFormatted = String(totalSuits).padStart(2, '0');

  return (
    <div className="suit-hud-overlay-wrapper" pointer-events="none">
      {/* Top Left: Lab Identifier */}
      <div className="hud-top-left">
        <div className="hud-lab-tag">
          <span className="hud-cyan-dot" /> STARK INDUSTRIES // ARMOR LAB 04
        </div>
        <div className="hud-archive-counter">
          ARMOR ARCHIVE: <span className="counter-curr">{indexFormatted}</span> / {totalFormatted}
        </div>
      </div>

      {/* Top Right: Suit Status Badge */}
      <div className="hud-top-right">
        <div className={`hud-status-badge status-${suit.status.toLowerCase()}`}>
          <span className="status-ping" /> {suit.status}
        </div>
        <div className="hud-movie-tag">{suit.movie}</div>
      </div>

      {/* Atmospheric Background Watermark Behind 3D Suit */}
      <div className="hud-bg-watermark" aria-hidden="true">
        <div className="watermark-brand">STARK INDUSTRIES</div>
        <div className="watermark-model">{suit.model}</div>
        <div className="watermark-code">ARCHIVE // {indexFormatted}</div>
      </div>
    </div>
  );
}
