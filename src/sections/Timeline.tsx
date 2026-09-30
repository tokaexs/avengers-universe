import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TIMELINE_EVENTS } from '../data/timeline';

gsap.registerPlugin(ScrollTrigger);

interface TimelineProps {
  onPlayHover?: () => void;
  onPlayClick?: () => void;
}

export default function Timeline({
  onPlayHover,
  onPlayClick,
}: TimelineProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeEventIdx, setActiveEventIdx] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current || !trackRef.current) return;

      const track = trackRef.current;
      const getScrollDistance = () => track.scrollWidth - window.innerWidth;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${getScrollDistance() * 1.25}`,
          pin: true,
          scrub: 1.0,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const curIdx = Math.min(
              TIMELINE_EVENTS.length - 1,
              Math.floor(self.progress * (TIMELINE_EVENTS.length + 1))
            );
            setActiveEventIdx(curIdx);
          },
        },
      });

      tl.to(track, {
        x: () => -getScrollDistance(),
        ease: 'none',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const activeEvent = TIMELINE_EVENTS[activeEventIdx] || TIMELINE_EVENTS[0];

  return (
    <section
      ref={sectionRef}
      id="timeline"
      className="cinematic-timeline-section"
      style={{
        '--event-accent': activeEvent.accentColor,
        '--event-glow': activeEvent.glowColor,
      } as React.CSSProperties}
    >
      {/* Background Ambient Color Flare */}
      <div className="timeline-ambient-flare" />

      {/* Top HUD Header */}
      <div className="timeline-header-bar">
        <div className="timeline-header-tag">
          <span className="bracket">[</span> STRATEGIC TIMELINE CHRONOLOGY // 1942 - PRESENT <span className="bracket">]</span>
        </div>
        <div className="timeline-active-era-badge">
          ERA // {activeEvent.year}
        </div>
      </div>

      {/* Main Horizontal Track */}
      <div className="timeline-track-stage">
        <div ref={trackRef} className="timeline-horizontal-strip">
          
          {/* Intro Card */}
          <div className="timeline-panel intro-panel">
            <div className="panel-tag">HISTORICAL TIMELINE</div>
            <h2 className="panel-giant-title">THE CHRONOLOGY</h2>
            <p className="panel-lead">
              Decades of extraterrestrial defense, classified transformations, and multiversal incursions that defined the modern era.
            </p>
            <div className="intro-scroll-indicator">
              <span className="arrow-x">→</span>
              <span className="text-x">SCROLL TO TRAVERSE THE TIMELINE</span>
            </div>
          </div>

          {/* Event Panels */}
          {TIMELINE_EVENTS.map((event) => (
            <div
              key={event.id}
              className="timeline-panel event-panel"
              style={{ '--ev-accent': event.accentColor } as React.CSSProperties}
              onMouseEnter={onPlayHover}
            >
              {/* Massive Year Watermark */}
              <div className="event-watermark-year" aria-hidden="true">
                {event.year}
              </div>

              {/* Top Meta */}
              <div className="event-meta-header">
                <span className="event-year-badge">{event.year}</span>
                <span className="event-era-pill">{event.era}</span>
              </div>

              {/* Title & Subtitle */}
              <h3 className="event-title">{event.title}</h3>
              <div className="event-subtitle">{event.subtitle}</div>

              {/* Description */}
              <p className="event-description">{event.description}</p>

              {/* Visual Frame */}
              <div className="event-visual-frame">
                <img
                  src={event.image}
                  alt={event.title}
                  className="event-blueprint-graphic"
                />
              </div>

              {/* Tactical Stats Grid */}
              <div className="event-stats-row">
                {event.stats.map((st, sIdx) => (
                  <div key={sIdx} className="event-stat-box">
                    <span className="st-lbl">{st.label}</span>
                    <span className="st-val">{st.value}</span>
                  </div>
                ))}
              </div>

              {/* Location Bar */}
              <div className="event-location-bar">
                <span className="loc-dot" />
                <span className="loc-name">{event.location}</span>
              </div>
            </div>
          ))}

          {/* Outro Panel */}
          <div className="timeline-panel outro-panel">
            <div className="panel-tag">CHRONOLOGY COMPLETE</div>
            <h2 className="panel-giant-title">THE INITIATIVE ENDURES</h2>
            <p className="panel-lead">
              New multiversal variants, cosmic threats, and quantum operations stand ready across all defense matrices.
            </p>
            <div className="outro-status-box">
              DEFCON 1 // ACTIVE MONITORING
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Timeline Quick Rail */}
      <div className="timeline-quick-rail">
        <div className="quick-nodes-row">
          {TIMELINE_EVENTS.map((ev, rIdx) => (
            <div
              key={ev.id}
              className={`quick-node ${activeEventIdx === rIdx ? 'quick-node-active' : ''}`}
              onMouseEnter={onPlayHover}
              onClick={() => {
                if (onPlayClick) onPlayClick();
                if (sectionRef.current && trackRef.current) {
                  const getScrollDistance = trackRef.current.scrollWidth - window.innerWidth;
                  const targetY = sectionRef.current.offsetTop + (rIdx / (TIMELINE_EVENTS.length - 1)) * (getScrollDistance * 1.25);
                  window.scrollTo({ top: targetY, behavior: 'smooth' });
                }
              }}
            >
              <span className="node-dot" />
              <span className="node-year">{ev.year}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
