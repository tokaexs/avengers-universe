import { useState } from 'react';
import { useLenis } from './hooks/useLenis';
import { useSoundEffects } from './hooks/useSoundEffects';

import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';

import Hero from './sections/Hero';
import HeroTransition from './sections/HeroTransition';
import HeroArchive from './sections/HeroArchive';
import Timeline from './sections/Timeline';
import Threats from './sections/Threats';
import Assemble from './sections/Assemble';

import './index.css';

export default function App() {
  // Lenis smooth scrolling synced with GSAP
  useLenis();

  // Futuristic audio synthesized sound effects
  const {
    isMuted,
    toggleMute,
    playHover,
    playClick,
    playAssemble,
  } = useSoundEffects();

  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="avengers-cinema-app">
      {/* Cinematic Loading Curtain */}
      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      )}

      {/* Premium Magnetic Custom Cursor */}
      <CustomCursor />

      {/* Minimal Top Command Navigation */}
      <Navbar
        isMuted={isMuted}
        onToggleMute={toggleMute}
        onPlayHover={playHover}
        onPlayClick={playClick}
      />

      <main>
        {/* 01 // 100vh Cinematic Hero with Real Video + Real 3D Camera Rig */}
        <Hero
          onPlayHover={playHover}
          onPlayClick={playClick}
          onAssembleTrigger={playAssemble}
        />

        {/* 02 // Blackout Cinematic Quote Transition */}
        <HeroTransition
          onPlayHover={playHover}
          onPlayClick={playClick}
        />

        {/* 03 // Fullscreen Character Sequences (No Grid Cards) */}
        <HeroArchive
          onPlayHover={playHover}
          onPlayClick={playClick}
        />

        {/* 04 // Horizontal Cinematic Timeline Journey */}
        <Timeline
          onPlayHover={playHover}
          onPlayClick={playClick}
        />

        {/* 05 // Fullscreen Cinematic Threats: Ultron, Thanos, Kang */}
        <Threats
          onPlayHover={playHover}
          onPlayClick={playClick}
        />

        {/* 06 // Climax Final Section: THE AVENGERS ASSEMBLE */}
        <Assemble
          onPlayHover={playHover}
          onPlayClick={playClick}
          onAssembleTrigger={playAssemble}
        />
      </main>
    </div>
  );
}