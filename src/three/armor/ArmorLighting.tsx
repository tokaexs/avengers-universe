import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { IronManSuit } from '../../data/ironManSuits';

interface ArmorLightingProps {
  suit: IronManSuit;
  isInspecting?: boolean;
}

export default function ArmorLighting({ suit, isInspecting }: ArmorLightingProps) {
  const arcLightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (arcLightRef.current) {
      // Subtle pulse to arc reactor lighting
      arcLightRef.current.intensity = 3.5 + Math.sin(t * 3) * 0.5;
    }
  });

  const isHulkbuster = suit.isHulkbuster;

  return (
    <group>
      {/* Neutral Ambient Environment Fill */}
      <ambientLight intensity={0.5} color="#dbeafe" />

      {/* Primary Key Spotlight from Top-Right Front */}
      <spotLight
        position={[isHulkbuster ? 6 : 4, isHulkbuster ? 8 : 6, 5]}
        angle={0.6}
        penumbra={0.8}
        intensity={isInspecting ? 3.8 : 2.8}
        color="#ffffff"
        castShadow
      />

      {/* Dramatic Blue/Cyan Rim Light from Behind */}
      <directionalLight
        position={[-4, 3, -4]}
        intensity={2.2}
        color={suit.colorPalette.arcGlow || '#00e5ff'}
      />

      {/* Warm Fill Light from Left Front */}
      <directionalLight
        position={[-3, -1, 3]}
        intensity={0.9}
        color="#fff4e6"
      />

      {/* Top Overhead Downlight */}
      <spotLight
        position={[0, 6, 0]}
        intensity={1.8}
        angle={0.5}
        penumbra={0.7}
        color="#f8fafc"
      />

      {/* Dedicated Point Light emanating from Arc Reactor Chest */}
      <pointLight
        ref={arcLightRef}
        position={[0, isHulkbuster ? 0.4 : 0.3, isHulkbuster ? 0.6 : 0.4]}
        color={suit.colorPalette.arcGlow || '#00e5ff'}
        intensity={3.5}
        distance={isHulkbuster ? 6 : 4}
      />

      {/* Floor Bounce Light */}
      <pointLight
        position={[0, -2.5, 1]}
        color="#0f172a"
        intensity={1.2}
        distance={5}
      />
    </group>
  );
}
