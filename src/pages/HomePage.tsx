import Hero from '../sections/Hero';
import HeroTransition from '../sections/HeroTransition';
import HeroArchive from '../sections/HeroArchive';
import Timeline from '../sections/Timeline';
import Threats from '../sections/Threats';
import Assemble from '../sections/Assemble';

interface HomePageProps {
  onPlayHover?: () => void;
  onPlayClick?: () => void;
  onAssembleTrigger?: () => void;
}

export default function HomePage({
  onPlayHover,
  onPlayClick,
  onAssembleTrigger,
}: HomePageProps) {
  return (
    <div className="homepage-wrapper">
      {/* 01 // 100vh Cinematic Hero with Real Video + Real 3D Camera Rig */}
      <Hero
        onPlayHover={onPlayHover}
        onPlayClick={onPlayClick}
        onAssembleTrigger={onAssembleTrigger}
      />

      {/* 02 // Blackout Cinematic Quote Transition */}
      <HeroTransition
        onPlayHover={onPlayHover}
        onPlayClick={onPlayClick}
      />

      {/* 03 // Fullscreen Character Sequences (No Grid Cards) */}
      <HeroArchive
        onPlayHover={onPlayHover}
        onPlayClick={onPlayClick}
      />

      {/* 04 // Horizontal Cinematic Timeline Journey */}
      <Timeline
        onPlayHover={onPlayHover}
        onPlayClick={onPlayClick}
      />

      {/* 05 // Fullscreen Cinematic Threats: Ultron, Thanos, Kang */}
      <Threats
        onPlayHover={onPlayHover}
        onPlayClick={onPlayClick}
      />

      {/* 06 // Climax Final Section: THE AVENGERS ASSEMBLE */}
      <Assemble
        onPlayHover={onPlayHover}
        onPlayClick={onPlayClick}
        onAssembleTrigger={onAssembleTrigger}
      />
    </div>
  );
}
