import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface TechHologram3DProps {
  techId?: string;
  isOverclocked?: boolean;
}

export default function TechHologram3D({
  techId = 'arc-reactor',
  isOverclocked = false,
}: TechHologram3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const speed = isOverclocked ? 4 : 1;

    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.3 * speed;
      groupRef.current.position.y = Math.sin(t * 1.5) * 0.06;
    }

    if (coreRef.current) {
      coreRef.current.rotation.x += delta * 0.5 * speed;
      coreRef.current.rotation.z += delta * 0.7 * speed;
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = Math.PI / 3 + Math.sin(t * 0.8) * 0.2;
      ring1Ref.current.rotation.z += delta * 0.8 * speed;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = Math.PI / 4 + Math.cos(t * 0.8) * 0.2;
      ring2Ref.current.rotation.x += delta * -0.6 * speed;
    }
  });

  const getTechColor = () => {
    switch (techId) {
      case 'nanotech-armor': return '#ffd700';
      case 'jarvis-friday': return '#00e5ff';
      case 'vibranium-shield': return '#4d88ff';
      case 'quinjet-stealth': return '#00ffaa';
      case 'pym-particles': return '#ff2233';
      case 'arc-reactor':
      default: return '#00e5ff';
    }
  };

  const techColor = getTechColor();

  return (
    <group ref={groupRef} scale={1.3}>
      {/* Central Hologram Wireframe Node */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.8, 1]} />
        <meshStandardMaterial
          color={techColor}
          emissive={techColor}
          emissiveIntensity={isOverclocked ? 2.5 : 1.0}
          wireframe
          metalness={0.9}
        />
      </mesh>

      {/* Inner Glowing Plasma Nucleus */}
      <mesh scale={[0.4, 0.4, 0.4]}>
        <sphereGeometry args={[0.8, 24, 24]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
      </mesh>

      {/* Diagnostic Orbital Ring 1 */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.35, 0.025, 16, 64]} />
        <meshBasicMaterial color={techColor} transparent opacity={0.7} />
      </mesh>

      {/* Diagnostic Orbital Ring 2 */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[1.65, 0.02, 16, 64]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.4} />
      </mesh>

      {/* Outer Hex Cage */}
      <mesh>
        <cylinderGeometry args={[1.8, 1.8, 0.08, 6]} />
        <meshStandardMaterial color="#2d3748" wireframe metalness={0.9} />
      </mesh>

      <pointLight position={[0, 0, 0]} color={techColor} intensity={5} distance={8} />
    </group>
  );
}
