import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function GammaCore3D() {
  const coreRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.6;
      coreRef.current.scale.setScalar(1 + Math.sin(t * 3.5) * 0.08);
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 1.2;
      ring1Ref.current.rotation.z = Math.sin(t * 0.9) * 0.3;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -t * 1.5;
    }
  });

  return (
    <group scale={1.2}>
      {/* Central Pulsing Gamma Plasma Chamber */}
      <group ref={coreRef}>
        <mesh>
          <sphereGeometry args={[0.7, 32, 32]} />
          <meshStandardMaterial
            color="#00ff66"
            emissive="#00ff44"
            emissiveIntensity={0.8}
            wireframe
          />
        </mesh>
        <mesh scale={[0.85, 0.85, 0.85]}>
          <sphereGeometry args={[0.7, 32, 32]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
        </mesh>
      </group>

      {/* Containment Ring 1 */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.15, 0.035, 16, 64]} />
        <meshStandardMaterial color="#1a251e" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Containment Ring 2 */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[1.35, 0.025, 16, 64]} />
        <meshBasicMaterial color="#00ff66" transparent opacity={0.7} />
      </mesh>

      <pointLight position={[0, 0, 0]} color="#00ff66" intensity={8} distance={8} />
    </group>
  );
}
