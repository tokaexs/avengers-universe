import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface TacticalGlobe3DProps {
  accentColor?: string;
  isSimulating?: boolean;
}

export default function TacticalGlobe3D({
  accentColor = '#00e5ff',
  isSimulating = false,
}: TacticalGlobe3DProps) {
  const globeRef = useRef<THREE.Group>(null);
  const wireSphereRef = useRef<THREE.Mesh>(null);
  const radarRingRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const speed = isSimulating ? 4 : 1;

    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.25 * speed;
      globeRef.current.position.y = Math.sin(t * 1.2) * 0.05;
    }

    if (wireSphereRef.current) {
      wireSphereRef.current.rotation.x = Math.sin(t * 0.5) * 0.15;
    }

    if (radarRingRef.current) {
      radarRingRef.current.rotation.z += delta * 1.5 * speed;
    }
  });

  return (
    <group ref={globeRef} scale={1.3}>
      {/* Central Tactical Wireframe Globe */}
      <mesh ref={wireSphereRef}>
        <sphereGeometry args={[1.2, 24, 24]} />
        <meshStandardMaterial
          color={accentColor}
          wireframe
          transparent
          opacity={0.5}
          emissive={accentColor}
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Inner Dark Core Shield */}
      <mesh scale={[0.85, 0.85, 0.85]}>
        <sphereGeometry args={[1.2, 16, 16]} />
        <meshStandardMaterial color="#050810" roughness={0.9} />
      </mesh>

      {/* Equatorial Tactical Radar Ring */}
      <mesh ref={radarRingRef}>
        <torusGeometry args={[1.5, 0.02, 16, 64]} />
        <meshBasicMaterial color={accentColor} transparent opacity={0.8} />
      </mesh>

      {/* Polar Coordinate Marker 1 (NY) */}
      <mesh position={[0.7, 0.6, 0.7]}>
        <octahedronGeometry args={[0.08, 0]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Polar Coordinate Marker 2 (Wakanda) */}
      <mesh position={[0.4, -0.3, 1.0]}>
        <octahedronGeometry args={[0.08, 0]} />
        <meshBasicMaterial color="#ffd700" />
      </mesh>

      {/* Polar Coordinate Marker 3 (Sokovia) */}
      <mesh position={[0.8, 0.3, -0.6]}>
        <octahedronGeometry args={[0.08, 0]} />
        <meshBasicMaterial color="#ff2233" />
      </mesh>

      <pointLight position={[0, 0, 0]} color={accentColor} intensity={4} distance={6} />
    </group>
  );
}
