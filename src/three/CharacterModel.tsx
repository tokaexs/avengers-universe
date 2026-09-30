import { useRef, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import IronManHelmet3D from './IronManHelmet3D';
import ShieldModel3D from './ShieldModel3D';
import HammerModel3D from './HammerModel3D';

interface CharacterModelProps {
  heroId?: string;
  modelPath?: string;
  accentColor?: string;
  powerClass?: string;
}

function ProceduralHologramArtifact({ accentColor = '#00e5ff' }: { accentColor?: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.4;
    }

    if (coreRef.current) {
      coreRef.current.rotation.x = t * 0.6;
      coreRef.current.rotation.z = t * 0.3;
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = Math.PI / 3 + Math.sin(t * 0.8) * 0.2;
      ring1Ref.current.rotation.z = t * 0.7;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = Math.PI / 4 + Math.cos(t * 0.6) * 0.2;
      ring2Ref.current.rotation.x = -t * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Holographic Geometric Artifact */}
      <mesh ref={coreRef}>
        <octahedronGeometry args={[0.9, 0]} />
        <meshStandardMaterial
          color={accentColor}
          wireframe
          transparent
          opacity={0.85}
          emissive={accentColor}
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Solid Inner Core Nucleus */}
      <mesh scale={[0.45, 0.45, 0.45]}>
        <octahedronGeometry args={[0.9, 0]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Orbital Hologram Ring 1 */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.35, 0.018, 16, 64]} />
        <meshBasicMaterial
          color={accentColor}
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Orbital Hologram Ring 2 */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[1.65, 0.012, 16, 64]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Soft Ambient Beacon Light */}
      <pointLight
        color={accentColor}
        intensity={4}
        distance={6}
      />
    </group>
  );
}

export default function CharacterModel({
  heroId,
  accentColor = '#00e5ff',
}: CharacterModelProps) {
  if (heroId === 'iron-man') {
    return (
      <Suspense fallback={<ProceduralHologramArtifact accentColor={accentColor} />}>
        <IronManHelmet3D />
      </Suspense>
    );
  }

  if (heroId === 'captain-america') {
    return (
      <Suspense fallback={<ProceduralHologramArtifact accentColor={accentColor} />}>
        <ShieldModel3D />
      </Suspense>
    );
  }

  if (heroId === 'thor') {
    return (
      <Suspense fallback={<ProceduralHologramArtifact accentColor={accentColor} />}>
        <HammerModel3D weaponType="stormbreaker" />
      </Suspense>
    );
  }

  return <ProceduralHologramArtifact accentColor={accentColor} />;
}
