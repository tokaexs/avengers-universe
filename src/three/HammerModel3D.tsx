import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function HammerModel3D() {
  const hammerRef = useRef<THREE.Group>(null);
  const sparkRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (hammerRef.current) {
      hammerRef.current.rotation.y = t * 0.45;
      hammerRef.current.position.y = Math.sin(t * 1.4) * 0.08;
      hammerRef.current.rotation.z = Math.sin(t * 0.7) * 0.1;
    }

    if (sparkRef.current) {
      sparkRef.current.rotation.y = -t * 1.5;
    }
  });

  return (
    <group ref={hammerRef} scale={1.2}>
      {/* Mjolnir Heavy Head */}
      <mesh position={[0, 0.45, 0]}>
        <boxGeometry args={[1.2, 0.7, 0.7]} />
        <meshStandardMaterial color="#4a5560" metalness={0.96} roughness={0.2} />
      </mesh>

      {/* Nordic Bevel Trim */}
      <mesh position={[0, 0.45, 0]}>
        <boxGeometry args={[1.24, 0.65, 0.65]} />
        <meshStandardMaterial color="#8a99a8" metalness={0.98} roughness={0.12} />
      </mesh>

      {/* Center Rune Inscription Line */}
      <mesh position={[0, 0.45, 0.36]}>
        <boxGeometry args={[0.9, 0.04, 0.02]} />
        <meshBasicMaterial color="#00e5ff" />
      </mesh>

      {/* Handle */}
      <mesh position={[0, -0.4, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 1.1, 16]} />
        <meshStandardMaterial color="#3a2518" roughness={0.7} />
      </mesh>

      {/* Silver Handle Rings */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.088, 0.088, 0.06, 16]} />
        <meshStandardMaterial color="#d0d8e0" metalness={0.95} />
      </mesh>
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.088, 0.088, 0.06, 16]} />
        <meshStandardMaterial color="#d0d8e0" metalness={0.95} />
      </mesh>
      <mesh position={[0, -0.8, 0]}>
        <cylinderGeometry args={[0.088, 0.088, 0.06, 16]} />
        <meshStandardMaterial color="#d0d8e0" metalness={0.95} />
      </mesh>

      {/* Pommel Cap */}
      <mesh position={[0, -0.98, 0]}>
        <cylinderGeometry args={[0.12, 0.1, 0.12, 16]} />
        <meshStandardMaterial color="#8a99a8" metalness={0.95} />
      </mesh>

      {/* Asgardian Lightning Energy Flare */}
      <pointLight position={[0, 0.45, 0.6]} color="#ffd700" intensity={6} distance={6} />
      <pointLight position={[0, 0.45, -0.6]} color="#00e5ff" intensity={5} distance={6} />
    </group>
  );
}
