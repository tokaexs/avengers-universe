import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface HammerModel3DProps {
  weaponType?: 'mjolnir' | 'stormbreaker';
  isSummoning?: boolean;
}

export default function HammerModel3D({
  weaponType = 'mjolnir',
  isSummoning = false,
}: HammerModel3DProps) {
  const hammerRef = useRef<THREE.Group>(null);
  const runeGlowRef = useRef<THREE.Mesh>(null);
  const lightningLightRef = useRef<THREE.PointLight>(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (hammerRef.current) {
      if (isSummoning) {
        hammerRef.current.position.y = Math.sin(t * 15) * 0.2 + 0.2;
        hammerRef.current.rotation.y += delta * 10;
      } else {
        hammerRef.current.rotation.y = t * 0.45;
        hammerRef.current.position.y = Math.sin(t * 1.5) * 0.08;
        hammerRef.current.rotation.z = Math.sin(t * 0.8) * 0.12;
      }
    }

    if (runeGlowRef.current) {
      runeGlowRef.current.scale.setScalar(1 + Math.sin(t * 4) * 0.1);
    }

    if (lightningLightRef.current) {
      lightningLightRef.current.intensity = isSummoning ? 12 + Math.random() * 8 : 4 + Math.sin(t * 6) * 2;
    }
  });

  return (
    <group ref={hammerRef} scale={1.25}>
      {weaponType === 'mjolnir' ? (
        /* ================== MJOLNIR ================== */
        <group>
          {/* Mjolnir Heavy Uru Metal Head */}
          <mesh position={[0, 0.45, 0]}>
            <boxGeometry args={[1.25, 0.75, 0.75]} />
            <meshStandardMaterial
              color="#4a5868"
              metalness={0.96}
              roughness={0.2}
              emissive="#00e5ff"
              emissiveIntensity={isSummoning ? 0.8 : 0.15}
            />
          </mesh>

          {/* Norse Beveled Edge Inset */}
          <mesh position={[0, 0.45, 0]}>
            <boxGeometry args={[1.3, 0.7, 0.7]} />
            <meshStandardMaterial color="#8da0b4" metalness={0.98} roughness={0.12} />
          </mesh>

          {/* Asgardian Rune Inscription Plate */}
          <mesh ref={runeGlowRef} position={[0, 0.45, 0.38]}>
            <boxGeometry args={[0.95, 0.08, 0.02]} />
            <meshBasicMaterial color="#00f0ff" />
          </mesh>
          <mesh position={[0, 0.45, -0.38]}>
            <boxGeometry args={[0.95, 0.08, 0.02]} />
            <meshBasicMaterial color="#00f0ff" />
          </mesh>

          {/* Handle */}
          <mesh position={[0, -0.4, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 1.1, 16]} />
            <meshStandardMaterial color="#352014" roughness={0.7} />
          </mesh>

          {/* Silver Grip Rings */}
          <mesh position={[0, -0.2, 0]}>
            <cylinderGeometry args={[0.09, 0.09, 0.06, 16]} />
            <meshStandardMaterial color="#d4dde6" metalness={0.95} />
          </mesh>
          <mesh position={[0, -0.5, 0]}>
            <cylinderGeometry args={[0.09, 0.09, 0.06, 16]} />
            <meshStandardMaterial color="#d4dde6" metalness={0.95} />
          </mesh>
          <mesh position={[0, -0.8, 0]}>
            <cylinderGeometry args={[0.09, 0.09, 0.06, 16]} />
            <meshStandardMaterial color="#d4dde6" metalness={0.95} />
          </mesh>

          {/* Pommel Cap & Wrist Strap */}
          <mesh position={[0, -0.98, 0]}>
            <cylinderGeometry args={[0.12, 0.1, 0.12, 16]} />
            <meshStandardMaterial color="#8da0b4" metalness={0.95} />
          </mesh>
          <mesh position={[0, -1.1, 0]}>
            <torusGeometry args={[0.1, 0.03, 12, 24]} />
            <meshStandardMaterial color="#352014" roughness={0.8} />
          </mesh>
        </group>
      ) : (
        /* ================== STORMBREAKER ================== */
        <group>
          {/* Main Axe Blade (Front) */}
          <mesh position={[0.6, 0.5, 0]} rotation={[0, 0, -Math.PI / 6]}>
            <cylinderGeometry args={[0.6, 0.1, 0.8, 3]} />
            <meshStandardMaterial
              color="#5a6878"
              metalness={0.98}
              roughness={0.15}
              emissive="#00e5ff"
              emissiveIntensity={isSummoning ? 0.9 : 0.2}
            />
          </mesh>

          {/* Heavy Blunt Hammer Head (Back) */}
          <mesh position={[-0.45, 0.45, 0]}>
            <boxGeometry args={[0.7, 0.6, 0.6]} />
            <meshStandardMaterial color="#404c58" metalness={0.96} roughness={0.2} />
          </mesh>

          {/* Central Socket Collar */}
          <mesh position={[0, 0.45, 0]}>
            <cylinderGeometry args={[0.22, 0.22, 0.65, 16]} />
            <meshStandardMaterial color="#7a8c9e" metalness={0.95} />
          </mesh>

          {/* Groot Vine Wooden Handle */}
          <mesh position={[0, -0.6, 0]}>
            <cylinderGeometry args={[0.09, 0.07, 1.8, 16]} />
            <meshStandardMaterial color="#3a2010" roughness={0.9} />
          </mesh>
          {/* Entangled Vine Knots */}
          <mesh position={[0, -0.2, 0]}>
            <torusGeometry args={[0.12, 0.04, 12, 24]} />
            <meshStandardMaterial color="#2d190b" roughness={0.95} />
          </mesh>
          <mesh position={[0, -0.9, 0]}>
            <torusGeometry args={[0.11, 0.035, 12, 24]} />
            <meshStandardMaterial color="#2d190b" roughness={0.95} />
          </mesh>
        </group>
      )}

      {/* Asgardian Lightning Energy Flare */}
      <pointLight ref={lightningLightRef} position={[0, 0.45, 0.6]} color="#00e5ff" intensity={5} distance={8} />
      <pointLight position={[0, 0.45, -0.6]} color="#ffd700" intensity={4} distance={6} />
    </group>
  );
}
