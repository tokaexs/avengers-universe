import { useState, useEffect } from 'react';
import SoundToggle from './SoundToggle';

interface NavbarProps {
  isMuted: boolean;
  onToggleMute: () => void;
  onPlayHover?: () => void;
  onPlayClick?: () => void;
}

export default function Navbar({
  isMuted,
  onToggleMute,
  onPlayHover,
  onPlayClick,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (onPlayClick) onPlayClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`cinematic-navbar ${scrolled ? 'cinematic-navbar-scrolled' : ''}`}>
      <div className="cinematic-nav-container">
        
        {/* Left: Brand / Crest */}
        <div
          className="cinematic-nav-brand"
          onClick={() => scrollToSection('hero')}
          onMouseEnter={onPlayHover}
          role="button"
          tabIndex={0}
        >
          <span className="brand-dot" />
          <span className="brand-text">AVENGERS</span>
        </div>

        {/* Right: Minimal Navigation & Sound */}
        <div className="cinematic-nav-right">
          <nav className="cinematic-nav-links">
            <button
              className="nav-link"
              onClick={() => scrollToSection('initiative')}
              onMouseEnter={onPlayHover}
            >
              INITIATIVE
            </button>
            <button
              className="nav-link"
              onClick={() => scrollToSection('heroes')}
              onMouseEnter={onPlayHover}
            >
              HEROES
            </button>
            <button
              className="nav-link"
              onClick={() => scrollToSection('timeline')}
              onMouseEnter={onPlayHover}
            >
              TIMELINE
            </button>
            <button
              className="nav-link"
              onClick={() => scrollToSection('threats')}
              onMouseEnter={onPlayHover}
            >
              THREATS
            </button>
          </nav>

          {/* Sound Architecture Toggle */}
          <SoundToggle
            isMuted={isMuted}
            onToggle={onToggleMute}
            onHover={onPlayHover}
          />
        </div>

      </div>
    </header>
  );
}
