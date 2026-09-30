import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useLenis } from './hooks/useLenis';
import { useSoundEffects } from './hooks/useSoundEffects';

import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';

import HomePage from './pages/HomePage';
import HeroesPage from './pages/HeroesPage';
import IronManPage from './pages/heroes/IronManPage';
import CaptainAmericaPage from './pages/heroes/CaptainAmericaPage';
import ThorPage from './pages/heroes/ThorPage';
import HulkPage from './pages/heroes/HulkPage';
import BlackWidowPage from './pages/heroes/BlackWidowPage';
import HawkeyePage from './pages/heroes/HawkeyePage';

import TimelinePage from './pages/TimelinePage';
import ThreatsPage from './pages/ThreatsPage';
import UltronThreatPage from './pages/threats/UltronThreatPage';
import ThanosThreatPage from './pages/threats/ThanosThreatPage';
import KangThreatPage from './pages/threats/KangThreatPage';

import TechnologyPage from './pages/TechnologyPage';
import MissionsPage from './pages/MissionsPage';
import InitiativePage from './pages/InitiativePage';
import DoomsdayPage from './pages/DoomsdayPage';

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
    <BrowserRouter>
      <ScrollToTop />
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
          <Routes>
            {/* 01 // Frozen Source-of-Truth Homepage */}
            <Route
              path="/"
              element={
                <HomePage
                  onPlayHover={playHover}
                  onPlayClick={playClick}
                  onAssembleTrigger={playAssemble}
                />
              }
            />

            {/* 02 // Heroes Gateway & Deep Dedicated Hero Archives */}
            <Route
              path="/heroes"
              element={
                <HeroesPage
                  onPlayHover={playHover}
                  onPlayClick={playClick}
                />
              }
            />
            <Route
              path="/heroes/iron-man"
              element={
                <IronManPage
                  onPlayHover={playHover}
                  onPlayClick={playClick}
                />
              }
            />
            <Route
              path="/heroes/captain-america"
              element={
                <CaptainAmericaPage
                  onPlayHover={playHover}
                  onPlayClick={playClick}
                />
              }
            />
            <Route
              path="/heroes/thor"
              element={
                <ThorPage
                  onPlayHover={playHover}
                  onPlayClick={playClick}
                />
              }
            />
            <Route
              path="/heroes/hulk"
              element={
                <HulkPage
                  onPlayHover={playHover}
                  onPlayClick={playClick}
                />
              }
            />
            <Route
              path="/heroes/black-widow"
              element={
                <BlackWidowPage
                  onPlayHover={playHover}
                  onPlayClick={playClick}
                />
              }
            />
            <Route
              path="/heroes/hawkeye"
              element={
                <HawkeyePage
                  onPlayHover={playHover}
                  onPlayClick={playClick}
                />
              }
            />

            {/* 03 // Dedicated Timeline Route */}
            <Route
              path="/timeline"
              element={
                <TimelinePage
                  onPlayHover={playHover}
                  onPlayClick={playClick}
                />
              }
            />

            {/* 04 // Dedicated Threats Gateway & Deep Dossiers */}
            <Route
              path="/threats"
              element={
                <ThreatsPage
                  onPlayHover={playHover}
                  onPlayClick={playClick}
                />
              }
            />
            <Route
              path="/threats/ultron"
              element={
                <UltronThreatPage
                  onPlayHover={playHover}
                  onPlayClick={playClick}
                />
              }
            />
            <Route
              path="/threats/thanos"
              element={
                <ThanosThreatPage
                  onPlayHover={playHover}
                  onPlayClick={playClick}
                />
              }
            />
            <Route
              path="/threats/kang"
              element={
                <KangThreatPage
                  onPlayHover={playHover}
                  onPlayClick={playClick}
                />
              }
            />

            {/* 05 // Technology Archive Route */}
            <Route
              path="/technology"
              element={
                <TechnologyPage
                  onPlayHover={playHover}
                  onPlayClick={playClick}
                />
              }
            />

            {/* 06 // Missions Tactical Archive Route */}
            <Route
              path="/missions"
              element={
                <MissionsPage
                  onPlayHover={playHover}
                  onPlayClick={playClick}
                />
              }
            />

            {/* 07 // S.H.I.E.L.D. Avengers Initiative Command Route */}
            <Route
              path="/initiative"
              element={
                <InitiativePage
                  onPlayHover={playHover}
                  onPlayClick={playClick}
                />
              }
            />

            {/* 08 // DOOMSDAY Post-Credit Teaser Finale */}
            <Route
              path="/doomsday"
              element={
                <DoomsdayPage
                  onPlayHover={playHover}
                  onPlayClick={playClick}
                />
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}