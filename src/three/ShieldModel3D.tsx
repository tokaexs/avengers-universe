import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ShieldModel3DProps {
  isSpinning?: boolean;
}

export default function ShieldModel3D({ isSpinning = false }: ShieldModel3DProps) {
  const shieldRef = useRef<THREE.Group>(null);
  const ringGlowRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (shieldRef.current) {
      const speed = isSpinning ? 12 : 0.6;
      shieldRef.current.rotation.z += delta * speed;
      shieldRef.current.rotation.y = Math.sin(t * 0.8) * 0.25;
      shieldRef.current.rotation.x = Math.cos(t * 0.6) * 0.15;
    }

    if (ringGlowRef.current) {
      ringGlowRef.current.scale.setScalar(1 + Math.sin(t * 3) * 0.04);
    }
  });

  return (
    <group ref={shieldRef} scale={1.4}>
      {/* Outer Red Ring */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.2, 1.2, 0.04, 64]} />
        <meshStandardMaterial color="#c8102e" metalness={0.92} roughness={0.18} />
      </mesh>

      {/* Silver Ring */}
      <mesh position={[0, 0, 0.01]}>
        <cylinderGeometry args={[0.96, 0.96, 0.042, 64]} />
        <meshStandardMaterial color="#e8edf2" metalness={0.98} roughness={0.12} />
      </mesh>

      {/* Inner Red Ring */}
      <mesh position={[0, 0, 0.02]}>
        <cylinderGeometry args={[0.72, 0.72, 0.044, 64]} />
        <meshStandardMaterial color="#c8102e" metalness={0.92} roughness={0.18} />
      </mesh>

      {/* Blue Center Disc */}
      <mesh position={[0, 0, 0.03]}>
        <cylinderGeometry args={[0.48, 0.48, 0.046, 64]} />
        <meshStandardMaterial color="#0044aa" metalness={0.95} roughness={0.15} />
      </mesh>

      {/* Center 5-Point Vibranium Star */}
      <mesh position={[0, 0, 0.06]} rotation={[0, 0, Math.PI / 10]}>
        <octahedronGeometry args={[0.26, 0]} />
        <meshStandardMaterial color="#ffffff" metalness={0.99} roughness={0.08} />
      </mesh>

      {/* Subtle Kinetic Shockwave Ring */}
      <mesh ref={ringGlowRef} position={[0, 0, 0.04]}>
        <torusGeometry args={[1.24, 0.015, 16, 64]} />
        <meshBasicMaterial color="#00e5ff" transparent opacity={0.4} />
      </mesh>

      <pointLight position={[0, 0, 1.5]} color="#4d88ff" intensity={4} distance={6} />
    </group>
  );
}
