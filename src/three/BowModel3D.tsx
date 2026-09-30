import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface BowModel3DProps {
  arrowType?: string;
  isFiring?: boolean;
}

export default function BowModel3D({
  arrowType = 'explosive',
  isFiring = false,
}: BowModel3DProps) {
  const bowGroupRef = useRef<THREE.Group>(null);
  const arrowRef = useRef<THREE.Group>(null);
  const laserSightRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (bowGroupRef.current) {
      bowGroupRef.current.rotation.y = t * 0.35;
      bowGroupRef.current.position.y = Math.sin(t * 1.4) * 0.05;
      bowGroupRef.current.rotation.z = Math.sin(t * 0.8) * 0.08;
    }

    if (arrowRef.current) {
      if (isFiring) {
        arrowRef.current.position.z += delta * 15;
        if (arrowRef.current.position.z > 8) {
          arrowRef.current.position.z = 0;
        }
      } else {
        arrowRef.current.position.z = 0;
      }
    }

    if (laserSightRef.current) {
      laserSightRef.current.scale.setScalar(1 + Math.sin(t * 6) * 0.1);
    }
  });

  const getArrowColor = () => {
    switch (arrowType) {
      case 'emp':
        return '#00e5ff';
      case 'sonic':
        return '#ffd700';
      case 'grapple':
        return '#a0aec0';
      case 'pym':
        return '#ff3366';
      case 'explosive':
      default:
        return '#ff4400';
    }
  };

  const arrowColor = getArrowColor();

  return (
    <group ref={bowGroupRef} scale={1.2}>
      {/* Tactical Compound Bow Riser */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.08, 0.9, 0.12]} />
        <meshStandardMaterial color="#1a202c" metalness={0.95} roughness={0.2} />
      </mesh>

      {/* Upper Limb Arc */}
      <mesh position={[0, 0.75, -0.15]} rotation={[Math.PI / 6, 0, 0]}>
        <cylinderGeometry args={[0.03, 0.04, 0.9, 16]} />
        <meshStandardMaterial color="#4a5568" metalness={0.9} roughness={0.25} />
      </mesh>
      {/* Upper Cam Wheel */}
      <mesh position={[0, 1.15, -0.35]} rotation={[0, Math.PI / 2, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.03, 24]} />
        <meshStandardMaterial color="#718096" metalness={0.95} />
      </mesh>

      {/* Lower Limb Arc */}
      <mesh position={[0, -0.75, -0.15]} rotation={[-Math.PI / 6, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.03, 0.9, 16]} />
        <meshStandardMaterial color="#4a5568" metalness={0.9} roughness={0.25} />
      </mesh>
      {/* Lower Cam Wheel */}
      <mesh position={[0, -1.15, -0.35]} rotation={[0, Math.PI / 2, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.03, 24]} />
        <meshStandardMaterial color="#718096" metalness={0.95} />
      </mesh>

      {/* High-Tension Bowstring */}
      <mesh position={[0, 0, -0.35]}>
        <cylinderGeometry args={[0.008, 0.008, 2.3, 8]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Active Arrow */}
      <group ref={arrowRef} position={[0, 0, 0]}>
        {/* Carbon Fiber Arrow Shaft */}
        <mesh position={[0, 0, 0.4]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 1.6, 12]} />
          <meshStandardMaterial color="#171923" metalness={0.9} />
        </mesh>
        {/* Trick Arrow Warhead */}
        <mesh position={[0, 0, 1.25]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.05, 0.2, 16]} />
          <meshStandardMaterial
            color={arrowColor}
            emissive={arrowColor}
            emissiveIntensity={isFiring ? 3 : 1.2}
            metalness={0.9}
          />
        </mesh>
        {/* Purple Fletching Vanes */}
        <mesh position={[0, 0, -0.35]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.04, 0.01, 0.25, 4]} />
          <meshStandardMaterial color="#9f7aea" />
        </mesh>
      </group>

      {/* Tactical Laser Rangefinder Line */}
      <mesh ref={laserSightRef} position={[0, 0.05, 2]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.004, 0.004, 4, 8]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.6} />
      </mesh>

      <pointLight position={[0, 0, 1.3]} color={arrowColor} intensity={3} distance={5} />
      <pointLight position={[0, 0, -1]} color="#9f7aea" intensity={2} distance={4} />
    </group>
  );
}
