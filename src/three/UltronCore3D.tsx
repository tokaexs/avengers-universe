import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface UltronCore3DProps {
  isGlitching?: boolean;
}

export default function UltronCore3D({ isGlitching = false }: UltronCore3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const skullRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      if (isGlitching) {
        groupRef.current.position.x = (Math.random() - 0.5) * 0.1;
        groupRef.current.position.y = (Math.random() - 0.5) * 0.1;
      } else {
        groupRef.current.position.x = 0;
        groupRef.current.position.y = Math.sin(t * 1.2) * 0.06;
      }
      groupRef.current.rotation.y = t * 0.4;
    }

    if (skullRef.current) {
      skullRef.current.rotation.x = Math.sin(t * 0.8) * 0.2;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 1.5;
    }

    if (lightRef.current) {
      lightRef.current.intensity = isGlitching ? 12 + Math.random() * 6 : 4 + Math.sin(t * 5) * 2;
    }
  });

  return (
    <group ref={groupRef} scale={1.3}>
      {/* Central Rogue AI Neural Skull Facet */}
      <mesh ref={skullRef}>
        <dodecahedronGeometry args={[0.85, 0]} />
        <meshStandardMaterial
          color="#ff2233"
          emissive="#ff2233"
          emissiveIntensity={isGlitching ? 2.5 : 1.2}
          wireframe
          metalness={0.9}
        />
      </mesh>

      {/* Inner Red Corrupted Nucleus */}
      <mesh scale={[0.5, 0.5, 0.5]}>
        <octahedronGeometry args={[0.85, 0]} />
        <meshStandardMaterial color="#110000" emissive="#ff0022" emissiveIntensity={2} metalness={0.9} />
      </mesh>

      {/* Corrupted Vibranium Spike Orbitals */}
      <mesh ref={ringRef}>
        <torusGeometry args={[1.35, 0.04, 16, 64]} />
        <meshStandardMaterial color="#1a202c" emissive="#ff2233" emissiveIntensity={0.6} metalness={0.95} />
      </mesh>

      <pointLight ref={lightRef} position={[0, 0, 0]} color="#ff2233" distance={6} />
      <pointLight position={[0, 2, 2]} color="#00e5ff" intensity={1} distance={4} />
    </group>
  );
}
