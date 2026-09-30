import { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onComplete?: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Cinematic progressive simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoaded(true);
            if (onComplete) onComplete();
          }, 400);
          return 100;
        }
        const inc = Math.floor(Math.random() * 14) + 6;
        return Math.min(100, prev + inc);
      });
    }, 90);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`loading-screen-root ${isLoaded ? 'loading-screen-hidden' : ''}`}
      aria-label="Loading Cinematic Experience"
    >
      <div className="loading-center-content">
        {/* Glowing Avengers "A" Icon */}
        <div className="loading-crest-box">
          <svg viewBox="0 0 100 100" className="loading-crest-svg">
            <circle cx="50" cy="50" r="44" className="loading-ring-bg" />
            <circle
              cx="50"
              cy="50"
              r="44"
              className="loading-ring-fill"
              style={{
                strokeDashoffset: `${276.46 * (1 - progress / 100)}`,
              }}
            />
            <path
              d="M50 20L68 76H58L50 50L42 76H32L50 20Z"
              className="loading-a-glyph"
            />
            <path d="M36 58H64" className="loading-a-bar" />
          </svg>
        </div>

        {/* Minimal Monospace Telemetry */}
        <div className="loading-brand-label">THE AVENGERS INITIATIVE</div>
        <div className="loading-status-row">
          <span className="loading-status-text">INITIALIZING CORE MATRIX</span>
          <span className="loading-pct-text">{progress}%</span>
        </div>

        {/* Hairline Progress Meter */}
        <div className="loading-track-bar">
          <div
            className="loading-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
