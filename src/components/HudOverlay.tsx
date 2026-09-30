export default function HudOverlay() {
  return (
    <div className="hud-overlay" aria-hidden="true">
      {/* 4 Corner Tech Reticles */}
      <div className="reticle reticle-tl">
        <span className="reticle-line-h" />
        <span className="reticle-line-v" />
        <span className="reticle-label">SEC // NORTH-WEST</span>
      </div>

      <div className="reticle reticle-tr">
        <span className="reticle-line-h" />
        <span className="reticle-line-v" />
        <span className="reticle-label">GRID 40.7128° N</span>
      </div>

      <div className="reticle reticle-bl">
        <span className="reticle-line-h" />
        <span className="reticle-line-v" />
        <span className="reticle-label">STARK TOWER HQ</span>
      </div>

      <div className="reticle reticle-br">
        <span className="reticle-line-h" />
        <span className="reticle-line-v" />
        <span className="reticle-label">DEF-CON 1 // READY</span>
      </div>

      {/* Subtle Lateral Metric Markers */}
      <div className="hud-edge-left">
        <div className="metric-tick" />
        <div className="metric-tick" />
        <div className="metric-tick active" />
        <div className="metric-tick" />
        <div className="metric-tick" />
      </div>

      <div className="hud-edge-right">
        <div className="metric-tick" />
        <div className="metric-tick active" />
        <div className="metric-tick" />
        <div className="metric-tick" />
        <div className="metric-tick" />
      </div>

      {/* Cinematic Edge Vignette */}
      <div className="cinematic-vignette" />
    </div>
  );
}
