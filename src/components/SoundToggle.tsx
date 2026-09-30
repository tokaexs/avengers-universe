interface SoundToggleProps {
  isMuted: boolean;
  onToggle: () => void;
  onHover?: () => void;
  className?: string;
}

export default function SoundToggle({
  isMuted,
  onToggle,
  onHover,
  className = '',
}: SoundToggleProps) {
  return (
    <button
      className={`sound-toggle-btn ${className}`}
      onClick={onToggle}
      onMouseEnter={onHover}
      aria-label={isMuted ? 'Turn Sound On' : 'Turn Sound Off'}
      title={isMuted ? 'SOUND OFF' : 'SOUND ON'}
    >
      <span className="sound-bars-icon" aria-hidden="true">
        <span className={`sound-bar bar-1 ${!isMuted ? 'active' : ''}`} />
        <span className={`sound-bar bar-2 ${!isMuted ? 'active' : ''}`} />
        <span className={`sound-bar bar-3 ${!isMuted ? 'active' : ''}`} />
      </span>
      <span className="sound-toggle-label">
        {isMuted ? 'SOUND OFF' : 'SOUND ON'}
      </span>
    </button>
  );
}
