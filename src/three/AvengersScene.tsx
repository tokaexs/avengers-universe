import { Suspense, type RefObject } from 'react';
import { Canvas } from '@react-three/fiber';
import ArcReactor from './ArcReactor';
import Particles from './Particles';
import CameraRig from './CameraRig';
import { useMediaQuery } from '../hooks/useMediaQuery';

interface AvengersSceneProps {
  scrollRef: RefObject<number>;
  powerLevel?: number;
}

export default function AvengersScene({
  scrollRef,
  powerLevel = 1,
}: AvengersSceneProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Canvas
      camera={{
        position: [0, 0, 4.8],
        fov: 40,
      }}
      dpr={isMobile ? [1, 1.25] : [1, 2]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      style={{ pointerEvents: 'none' }}
    >
      <Suspense fallback={null}>
        {/* Dynamic Animated Camera Rig */}
        <CameraRig scrollRef={scrollRef} isMobile={isMobile} />

        {/* Ambient Subtle Depth Light */}
        <ambientLight intensity={0.18} />

        {/* Primary Specular Chrome Directional Light */}
        <directionalLight
          position={[3, 6, 4]}
          color="#ffffff"
          intensity={1.6}
        />

        {/* Secondary Back Rim Light */}
        <directionalLight
          position={[-3, -4, -2]}
          color="#004488"
          intensity={1.2}
        />

        {/* Primary Arc Reactor Artifact */}
        <group position={[0, 0, 0]} scale={0.78}>
          <ArcReactor scrollRef={scrollRef} powerLevel={powerLevel} />
        </group>

        {/* Multi-depth Atmospheric Particle Field */}
        <Particles scrollRef={scrollRef} powerLevel={powerLevel} />
      </Suspense>
    </Canvas>
  );
}