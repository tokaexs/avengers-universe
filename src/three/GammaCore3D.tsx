import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface GammaCore3DProps {
  isRaging?: boolean;
  transformState?: 'banner' | 'hulk' | 'smart_hulk';
}

export default function GammaCore3D({
  isRaging = false,
  transformState = 'hulk',
}: GammaCore3DProps) {
  const coreRef = useRef<THREE.Group>(null);
  const nucleusRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const speedMultiplier = isRaging ? 6 : 1;

    if (coreRef.current) {
      if (isRaging) {
        coreRef.current.position.x = (Math.random() - 0.5) * 0.08;
        coreRef.current.position.y = (Math.random() - 0.5) * 0.08;
      } else {
        coreRef.current.position.x = 0;
        coreRef.current.position.y = Math.sin(t * 1.5) * 0.06;
      }
    }

    if (nucleusRef.current) {
      nucleusRef.current.rotation.x += delta * 0.8 * speedMultiplier;
      nucleusRef.current.rotation.y += delta * 1.2 * speedMultiplier;
      const pulse = 1 + Math.sin(t * (isRaging ? 14 : 3)) * (isRaging ? 0.3 : 0.08);
      nucleusRef.current.scale.setScalar(pulse);
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = Math.PI / 3 + Math.sin(t * 1.2) * 0.3;
      ring1Ref.current.rotation.y += delta * 1.5 * speedMultiplier;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = Math.PI / 4 + Math.cos(t * 1.5) * 0.3;
      ring2Ref.current.rotation.x += delta * -1.8 * speedMultiplier;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y += delta * 0.9 * speedMultiplier;
    }

    if (lightRef.current) {
      lightRef.current.intensity = isRaging ? 14 + Math.random() * 6 : 5 + Math.sin(t * 4) * 2;
    }
  });

  const getThemeColor = () => {
    if (transformState === 'banner') return '#00e5ff';
    if (transformState === 'smart_hulk') return '#39ff14';
    return '#00ff66';
  };

  const themeColor = getThemeColor();

  return (
    <group ref={coreRef} scale={1.3}>
      {/* Central Pulsating Gamma Nucleus */}
      <mesh ref={nucleusRef}>
        <icosahedronGeometry args={[0.75, 2]} />
        <meshStandardMaterial
          color={themeColor}
          emissive={themeColor}
          emissiveIntensity={isRaging ? 2.5 : 1.2}
          roughness={0.2}
          metalness={0.8}
          wireframe={transformState === 'banner'}
        />
      </mesh>

      {/* Inner Energy Plasma Core */}
      <mesh scale={[0.45, 0.45, 0.45]}>
        <sphereGeometry args={[0.75, 32, 32]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
      </mesh>

      {/* Gamma Containment Field Ring 1 */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.3, 0.035, 16, 64]} />
        <meshStandardMaterial
          color="#1b3020"
          emissive={themeColor}
          emissiveIntensity={0.6}
          metalness={0.9}
        />
      </mesh>

      {/* Gamma Containment Field Ring 2 */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[1.55, 0.03, 16, 64]} />
        <meshStandardMaterial
          color="#102518"
          emissive={themeColor}
          emissiveIntensity={0.4}
          metalness={0.9}
        />
      </mesh>

      {/* Heavy Steel Containment Cage Ring */}
      <mesh ref={ring3Ref}>
        <torusGeometry args={[1.8, 0.05, 8, 32]} />
        <meshStandardMaterial color="#2d3748" metalness={0.95} roughness={0.3} />
      </mesh>

      {/* Point Lights */}
      <pointLight ref={lightRef} position={[0, 0, 0]} color={themeColor} distance={8} />
      <pointLight position={[0, 2, 2]} color="#00ff66" intensity={3} distance={6} />
      <pointLight position={[0, -2, -2]} color="#ffffff" intensity={2} distance={4} />
    </group>
  );
}
