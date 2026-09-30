import React, { useState } from 'react';
import Button from '../components/Button';

interface ReactorCoreSectionProps {
  onPlayHover?: () => void;
  onPlayClick?: () => void;
  onAssembleTrigger?: () => void;
  powerLevel: number;
  setPowerLevel: React.Dispatch<React.SetStateAction<number>>;
}

export default function ReactorCoreSection({
  onPlayHover,
  onPlayClick,
  onAssembleTrigger,
  powerLevel,
  setPowerLevel,
}: ReactorCoreSectionProps) {
  const [subsystems, setSubsystems] = useState({
    unibeam: 75,
    repulsors: 85,
    flight: 60,
    nanoshield: 90,
  });

  const [isOverdrive, setIsOverdrive] = useState(false);

  const handleSliderChange = (key: keyof typeof subsystems, val: number) => {
    const updated = { ...subsystems, [key]: val };
    setSubsystems(updated);
    const avg = (updated.unibeam + updated.repulsors + updated.flight + updated.nanoshield) / 400;
    setPowerLevel(0.6 + avg * 0.8);
  };

  const handleTriggerOverdrive = () => {
    if (onPlayClick) onPlayClick();
    if (onAssembleTrigger) onAssembleTrigger();
    setIsOverdrive(true);
    setSubsystems({
      unibeam: 100,
      repulsors: 100,
      flight: 100,
      nanoshield: 100,
    });
    setPowerLevel(1.6);

    setTimeout(() => {
      setIsOverdrive(false);
      setPowerLevel(1.0);
      setSubsystems({
        unibeam: 75,
        repulsors: 85,
        flight: 60,
        nanoshield: 90,
      });
    }, 4500);
  };

  const totalOutputGW = (
    ((subsystems.unibeam * 0.4 +
      subsystems.repulsors * 0.3 +
      subsystems.flight * 0.15 +
      subsystems.nanoshield * 0.15) /
      100) *
    4.8
  ).toFixed(2);

  return (
    <section id="reactor" className="reactor-core-section">
      <div className="section-container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <span className="tag-bracket">[</span> STARK INDUSTRIES // 003 <span className="tag-bracket">]</span>
          </div>
          <h2 className="section-title">RT-01 ARC REACTOR POWER MATRIX</h2>
          <p className="section-lead">
            Miniaturized clean fusion core telemetry and tactical energy distribution terminal. Control subsystem routing in real-time.
          </p>
        </div>

        {/* Matrix Dashboard */}
        <div className="reactor-dashboard-grid">
          
          {/* Main Telemetry Readout */}
          <div className={`telemetry-panel ${isOverdrive ? 'panel-overdrive' : ''}`}>
            <div className="panel-header">
              <span className="panel-badge">CORE DIAGNOSTICS</span>
              <span className="panel-status-pill">
                {isOverdrive ? '⚠️ OVERDRIVE ACTIVE' : 'OPTIMAL // 100%'}
              </span>
            </div>

            <div className="output-display">
              <div className="output-metric-label">TOTAL ENERGY DISCHARGE</div>
              <div className="output-huge-val">
                {totalOutputGW} <span className="unit">GW/s</span>
              </div>
              <div className="core-specs-row">
                <div className="spec-item">
                  <span className="spec-label">CORE FREQ</span>
                  <span className="spec-val">{(4.21 * powerLevel).toFixed(2)} THz</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">OUTPUT MULTIPLIER</span>
                  <span className="spec-val">{Math.round(powerLevel * 100)}%</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">THERMAL DISSIPATION</span>
                  <span className="spec-val">{(0.14 * powerLevel).toFixed(2)} kW/m²</span>
                </div>
              </div>
            </div>

            <div className="overdrive-action-box">
              <Button
                variant={isOverdrive ? 'secondary' : 'primary'}
                onClick={handleTriggerOverdrive}
                onHoverSound={onPlayHover}
                className="overdrive-btn"
              >
                {isOverdrive ? 'OVERDRIVE ENGAGED (MAX POWER)' : '⚡ INITIATE 100% OVERDRIVE'}
              </Button>
            </div>
          </div>

          {/* Subsystem Allocators */}
          <div className="subsystems-panel">
            <div className="panel-header">
              <span className="panel-badge">ENERGY ROUTING MATRIX</span>
              <span className="panel-aux-info">AUTO-BALANCED</span>
            </div>

            <div className="sliders-list">
              
              {/* Unibeam */}
              <div className="subsystem-row">
                <div className="subsystem-info">
                  <span className="subsystem-title">CHEST UNIBEAM CANNON</span>
                  <span className="subsystem-pct">{subsystems.unibeam}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={subsystems.unibeam}
                  onChange={(e) => handleSliderChange('unibeam', Number(e.target.value))}
                  className="hud-slider"
                  aria-label="Chest Unibeam Power"
                />
              </div>

              {/* Repulsors */}
              <div className="subsystem-row">
                <div className="subsystem-info">
                  <span className="subsystem-title">PALM REPULSOR GAUNTLETS</span>
                  <span className="subsystem-pct">{subsystems.repulsors}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={subsystems.repulsors}
                  onChange={(e) => handleSliderChange('repulsors', Number(e.target.value))}
                  className="hud-slider"
                  aria-label="Palm Repulsors Power"
                />
              </div>

              {/* Nanoshield */}
              <div className="subsystem-row">
                <div className="subsystem-info">
                  <span className="subsystem-title">BLEEDING-EDGE NANOTECH SHIELD</span>
                  <span className="subsystem-pct">{subsystems.nanoshield}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={subsystems.nanoshield}
                  onChange={(e) => handleSliderChange('nanoshield', Number(e.target.value))}
                  className="hud-slider"
                  aria-label="Nanotech Shield Power"
                />
              </div>

              {/* Flight */}
              <div className="subsystem-row">
                <div className="subsystem-info">
                  <span className="subsystem-title">SUPERSONIC FLIGHT THRUSTERS</span>
                  <span className="subsystem-pct">{subsystems.flight}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={subsystems.flight}
                  onChange={(e) => handleSliderChange('flight', Number(e.target.value))}
                  className="hud-slider"
                  aria-label="Flight Thrusters Power"
                />
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
