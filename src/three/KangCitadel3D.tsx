import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface KangCitadel3DProps {
  isWarping?: boolean;
}

export default function KangCitadel3D({ isWarping = false }: KangCitadel3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y = t * (isWarping ? 3 : 0.4);
      groupRef.current.position.y = Math.sin(t * 1.5) * 0.08;
    }

    if (coreRef.current) {
      coreRef.current.rotation.x += delta * 0.8;
      coreRef.current.rotation.z += delta * 0.5;
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = Math.PI / 4 + Math.sin(t * 0.8) * 0.3;
      ring1Ref.current.rotation.z += delta * 1.2;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = Math.PI / 3 + Math.cos(t * 0.8) * 0.3;
      ring2Ref.current.rotation.x += delta * -1.0;
    }
  });

  return (
    <group ref={groupRef} scale={1.3}>
      {/* Central 4D Chrono-Cube Hyper-Structure */}
      <mesh ref={coreRef}>
        <boxGeometry args={[0.9, 0.9, 0.9]} />
        <meshStandardMaterial
          color="#00ffaa"
          emissive="#00ffaa"
          emissiveIntensity={isWarping ? 2.5 : 1.0}
          wireframe
          metalness={0.9}
        />
      </mesh>

      {/* Inner Temporal Singularity */}
      <mesh scale={[0.4, 0.4, 0.4]}>
        <octahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color="#00ffff" />
      </mesh>

      {/* Branching Chrono Rings */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.4, 0.03, 16, 64]} />
        <meshBasicMaterial color="#00ffaa" transparent opacity={0.7} />
      </mesh>

      <mesh ref={ring2Ref}>
        <torusGeometry args={[1.7, 0.02, 16, 64]} />
        <meshBasicMaterial color="#0088ff" transparent opacity={0.5} />
      </mesh>

      <pointLight position={[0, 0, 0]} color="#00ffaa" intensity={5} distance={8} />
    </group>
  );
}
