import Button from '../components/Button';

interface FooterSectionProps {
  onPlayHover?: () => void;
  onPlayClick?: () => void;
  onAssembleTrigger?: () => void;
}

export default function FooterSection({
  onPlayHover,
  onPlayClick,
  onAssembleTrigger,
}: FooterSectionProps) {
  const scrollToTop = () => {
    if (onPlayClick) onPlayClick();
    if (onAssembleTrigger) onAssembleTrigger();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="cinematic-footer">
      <div className="section-container">
        
        {/* Massive Call to Action */}
        <div className="footer-cta-card">
          <div className="footer-cta-tag">AVENGERS INITIATIVE // DIRECTIVE 7-A</div>
          <h2 className="footer-cta-title">THE WORLD STILL NEEDS HEROES</h2>
          <p className="footer-cta-sub">
            Standing ready against planetary and interdimensional threats. 
            All clearance protocols active and authorized.
          </p>

          <div className="footer-btn-row">
            <Button
              variant="primary"
              onClick={scrollToTop}
              onHoverSound={onPlayHover}
              className="footer-assemble-btn"
            >
              RETURN TO CORE & ASSEMBLE
            </Button>
          </div>
        </div>

        {/* Footer Meta Details */}
        <div className="footer-meta-grid">
          <div className="meta-brand-col">
            <div className="meta-brand-title">STARK INDUSTRIES // S.H.I.E.L.D.</div>
            <p className="meta-brand-desc">
              Classified defense interface designed for Earth's Mightiest Heroes. Developed under Stark Strategic Oversight.
            </p>
            <div className="meta-auth-hash">
              SHA-256: 8b0f42a99c7f1a30c5e937d110023e
            </div>
          </div>

          <div className="meta-links-col">
            <div className="meta-col-title">DIRECTIVES</div>
            <ul className="meta-links-list">
              <li><a href="#hero" onClick={(e) => { e.preventDefault(); scrollToTop(); }}>01 // Hero Command</a></li>
              <li><a href="#initiative" onClick={(e) => { e.preventDefault(); if (onPlayClick) onPlayClick(); document.getElementById('initiative')?.scrollIntoView({ behavior: 'smooth' }); }}>02 // Character Archive</a></li>
              <li><a href="#timeline" onClick={(e) => { e.preventDefault(); if (onPlayClick) onPlayClick(); document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' }); }}>03 // Chronology</a></li>
              <li><a href="#threats" onClick={(e) => { e.preventDefault(); if (onPlayClick) onPlayClick(); document.getElementById('threats')?.scrollIntoView({ behavior: 'smooth' }); }}>04 // Global Threats</a></li>
              <li><a href="#directives" onClick={(e) => { e.preventDefault(); if (onPlayClick) onPlayClick(); document.getElementById('directives')?.scrollIntoView({ behavior: 'smooth' }); }}>05 // Strategic Defense</a></li>
              <li><a href="#roster" onClick={(e) => { e.preventDefault(); if (onPlayClick) onPlayClick(); document.getElementById('roster')?.scrollIntoView({ behavior: 'smooth' }); }}>06 // Hero Dossiers</a></li>
              <li><a href="#reactor" onClick={(e) => { e.preventDefault(); if (onPlayClick) onPlayClick(); document.getElementById('reactor')?.scrollIntoView({ behavior: 'smooth' }); }}>07 // Arc Reactor Matrix</a></li>
            </ul>
          </div>

          <div className="meta-links-col">
            <div className="meta-col-title">SECTOR CLEARANCE</div>
            <ul className="meta-links-list">
              <li><span className="clear-item" onMouseEnter={onPlayHover}>LEVEL 10 // EYES ONLY</span></li>
              <li><span className="clear-item" onMouseEnter={onPlayHover}>NEW YORK TOWER // SECTOR 4</span></li>
              <li><span className="clear-item" onMouseEnter={onPlayHover}>QUINJET HANGAR // AIRSPACE 9</span></li>
              <li><span className="clear-item" onMouseEnter={onPlayHover}>QUANTUM TUNNEL // LAB B</span></li>
              <li><span className="clear-item" onMouseEnter={onPlayHover}>SOKOVIA CORRIDOR // CLEARED</span></li>
              <li><span className="clear-item" onMouseEnter={onPlayHover}>AVENGERS COMPOUND // ACTIVE</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal / Watermark Bar */}
        <div className="footer-bottom-bar">
          <div className="copyright-text">
            © {new Date().getFullYear()} THE AVENGERS INITIATIVE. ALL TACTICAL RIGHTS RESERVED.
          </div>
          <div className="system-specs-tag">
            VITE + REACT THREE FIBER + GSAP + LENIS // CINEMATIC EDITION
          </div>
        </div>

      </div>
    </footer>
  );
}
