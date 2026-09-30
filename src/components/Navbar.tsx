import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
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

  const navItems = [
    { to: '/', label: 'HOME' },
    { to: '/heroes', label: 'HEROES' },
    { to: '/timeline', label: 'TIMELINE' },
    { to: '/threats', label: 'THREATS' },
    { to: '/technology', label: 'TECHNOLOGY' },
    { to: '/missions', label: 'MISSIONS' },
    { to: '/initiative', label: 'INITIATIVE' },
    { to: '/doomsday', label: 'DOOMSDAY' },
  ];

  return (
    <header className={`cinematic-navbar ${scrolled ? 'cinematic-navbar-scrolled' : ''}`}>
      <div className="cinematic-nav-container">
        
        {/* Left: Brand / Crest */}
        <Link
          to="/"
          className="cinematic-nav-brand"
          onClick={onPlayClick}
          onMouseEnter={onPlayHover}
        >
          <span className="brand-dot" />
          <span className="brand-text">AVENGERS</span>
        </Link>

        {/* Right: Multi-Page Navigation & Sound */}
        <div className="cinematic-nav-right">
          <nav className="cinematic-nav-links">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'nav-link-active' : ''} ${item.to === '/doomsday' ? 'nav-link-doomsday' : ''}`
                }
                onClick={onPlayClick}
                onMouseEnter={onPlayHover}
                end={item.to === '/'}
              >
                {item.label}
              </NavLink>
            ))}
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
