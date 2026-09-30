import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IRON_MAN_SUITS_DATA, type Hotspot } from '../../data/ironManSuits';
import SuitViewer from '../../components/Armor/SuitViewer';
import SuitControls from '../../components/Armor/SuitControls';
import SuitHUD from '../../components/Armor/SuitHUD';
import SuitSpecs from '../../components/Armor/SuitSpecs';
import SuitHotspots from '../../components/Armor/SuitHotspots';
import SuitTimeline from '../../components/Armor/SuitTimeline';

interface IronManPageProps {
  onPlayHover?: () => void;
  onPlayClick?: () => void;
}

export default function IronManPage({
  onPlayHover,
  onPlayClick,
}: IronManPageProps) {
  // Start on Mark VII (Index 6) or Mark III (Index 2)
  const [selectedSuitIndex, setSelectedSuitIndex] = useState(6);
  const [isInspecting, setIsInspecting] = useState(false);
  const [isAssembling, setIsAssembling] = useState(false);
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);

  const currentSuit = IRON_MAN_SUITS_DATA[selectedSuitIndex] || IRON_MAN_SUITS_DATA[0];

  const handleSelectSuit = (idx: number) => {
    setSelectedSuitIndex(idx);
    setSelectedHotspot(null);
  };

  const handlePrevSuit = () => {
    const nextIdx = (selectedSuitIndex - 1 + IRON_MAN_SUITS_DATA.length) % IRON_MAN_SUITS_DATA.length;
    handleSelectSuit(nextIdx);
  };

  const handleNextSuit = () => {
    const nextIdx = (selectedSuitIndex + 1) % IRON_MAN_SUITS_DATA.length;
    handleSelectSuit(nextIdx);
  };

  const handleToggleInspect = () => {
    setIsInspecting((prev) => !prev);
    setSelectedHotspot(null);
  };

  const handleToggleAssembly = () => {
    setIsAssembling((prev) => !prev);
  };

  return (
    <div
      className="stark-armory-universe-page"
      style={{
        '--suit-arc-glow': currentSuit.colorPalette.arcGlow,
        '--suit-primary': currentSuit.colorPalette.primary,
        '--suit-secondary': currentSuit.colorPalette.secondary,
      } as React.CSSProperties}
    >
      {/* Background Volumetric Laboratory Aura */}
      <div className="armory-ambient-lab-aura" />

      {/* Top Header Breadcrumb Bar */}
      <div className="stark-header-hud">
        <div className="breadcrumb-box">
          <Link
            to="/heroes"
            className="back-link"
            onClick={onPlayClick}
            onMouseEnter={onPlayHover}
          >
            ← HERO ARCHIVES
          </Link>
          <span className="sep-slash">//</span>
          <span className="current-sub">STARK INDUSTRIES // ARMOR LAB // {currentSuit.model}</span>
        </div>
        <div className="stark-telemetry-tag">
          F.R.I.D.A.Y. QUANTUM ARCHIVE // LEVEL 10 CLEARANCE
        </div>
      </div>

      {/* Main Armory Showcase Viewport */}
      <div className="armory-showcase-container">
        
        {/* Environmental HUD Telemetry Overlay */}
        <SuitHUD
          suit={currentSuit}
          currentIndex={selectedSuitIndex}
          totalSuits={IRON_MAN_SUITS_DATA.length}
        />

        {/* Center Stage 3D Suit Experience */}
        <div className="armory-center-3d-viewport">
          <SuitViewer
            suit={currentSuit}
            isInspecting={isInspecting}
            isAssembling={isAssembling}
            selectedHotspot={selectedHotspot}
          />

          {/* Master Controls Toolbar */}
          <SuitControls
            onPrev={handlePrevSuit}
            onNext={handleNextSuit}
            isInspecting={isInspecting}
            onToggleInspect={handleToggleInspect}
            isAssembling={isAssembling}
            onToggleAssembly={handleToggleAssembly}
            onPlayHover={onPlayHover}
            onPlayClick={onPlayClick}
          />

          {/* Inspection Mode Hotspots Drawer */}
          {isInspecting && (
            <SuitHotspots
              hotspots={currentSuit.hotspots}
              selectedHotspot={selectedHotspot}
              onSelectHotspot={setSelectedHotspot}
              onPlayHover={onPlayHover}
              onPlayClick={onPlayClick}
            />
          )}
        </div>

        {/* Right Sidebar: Dynamic Technical Specifications HUD */}
        <div className="armory-specs-sidebar">
          <SuitSpecs suit={currentSuit} />
        </div>

      </div>

      {/* Bottom Horizontal Armor Timeline Ribbon */}
      <SuitTimeline
        suits={IRON_MAN_SUITS_DATA}
        selectedIndex={selectedSuitIndex}
        onSelectIndex={handleSelectSuit}
        onPlayHover={onPlayHover}
        onPlayClick={onPlayClick}
      />
    </div>
  );
}
