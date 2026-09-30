import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface EnergyCoreProps {
  powerLevel?: number;
}

export default function EnergyCore({ powerLevel = 1 }: EnergyCoreProps) {
  const coreSphereRef = useRef<THREE.Mesh>(null);
  const flareRing1Ref = useRef<THREE.Mesh>(null);
  const flareRing2Ref = useRef<THREE.Mesh>(null);
  const arcSparksRef = useRef<THREE.LineSegments>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (coreSphereRef.current) {
      const pulse = 1 + Math.sin(t * 3.5) * 0.08 * powerLevel;
      coreSphereRef.current.scale.setScalar(pulse);
    }

    if (flareRing1Ref.current) {
      flareRing1Ref.current.rotation.z = t * 1.2;
      flareRing1Ref.current.rotation.x = Math.sin(t * 0.8) * 0.2;
    }

    if (flareRing2Ref.current) {
      flareRing2Ref.current.rotation.z = -t * 1.5;
      flareRing2Ref.current.rotation.y = Math.cos(t * 0.9) * 0.2;
    }

    if (arcSparksRef.current) {
      arcSparksRef.current.rotation.z = t * 2.5;
    }
  });

  return (
    <group>
      {/* Intense Inner Core Sphere */}
      <mesh ref={coreSphereRef}>
        <sphereGeometry args={[0.34, 32, 32]} />
        <meshBasicMaterial
          color="#d5f8ff"
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* Volumetric Cyan Plasma Corona */}
      <mesh scale={[1.25, 1.25, 1.25]}>
        <sphereGeometry args={[0.38, 32, 32]} />
        <meshBasicMaterial
          color="#00e5ff"
          transparent
          opacity={0.35 * powerLevel}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Deep Blue Sub-Surface Core */}
      <mesh scale={[1.6, 1.6, 1.6]}>
        <sphereGeometry args={[0.42, 32, 32]} />
        <meshBasicMaterial
          color="#0055ff"
          transparent
          opacity={0.15 * powerLevel}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Rotating High-Frequency Energy Ring 1 */}
      <mesh ref={flareRing1Ref}>
        <torusGeometry args={[0.48, 0.008, 16, 64]} />
        <meshBasicMaterial
          color="#00ffff"
          transparent
          opacity={0.8 * powerLevel}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Rotating High-Frequency Energy Ring 2 */}
      <mesh ref={flareRing2Ref}>
        <torusGeometry args={[0.54, 0.006, 16, 64]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.6 * powerLevel}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Point Light Source */}
      <pointLight
        color="#00e5ff"
        intensity={12 * powerLevel}
        distance={8}
        decay={2}
      />
    </group>
  );
}
