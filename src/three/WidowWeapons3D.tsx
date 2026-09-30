import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface WidowWeapons3DProps {
  isStunActive?: boolean;
}

export default function WidowWeapons3D({ isStunActive = false }: WidowWeapons3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const baton1Ref = useRef<THREE.Mesh>(null);
  const baton2Ref = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.4;
      groupRef.current.position.y = Math.sin(t * 1.5) * 0.05;
    }

    if (baton1Ref.current && baton2Ref.current) {
      if (isStunActive) {
        baton1Ref.current.rotation.z = Math.PI / 4 + Math.sin(t * 20) * 0.1;
        baton2Ref.current.rotation.z = -Math.PI / 4 - Math.sin(t * 20) * 0.1;
      } else {
        baton1Ref.current.rotation.z = Math.PI / 4 + Math.sin(t * 1.2) * 0.05;
        baton2Ref.current.rotation.z = -Math.PI / 4 - Math.sin(t * 1.2) * 0.05;
      }
    }

    if (lightRef.current) {
      lightRef.current.intensity = isStunActive ? 12 + Math.random() * 6 : 4 + Math.sin(t * 4) * 1.5;
    }
  });

  return (
    <group ref={groupRef} scale={1.2}>
      {/* Central Widow Hourglass Holographic Emblem */}
      <group position={[0, 0, 0]}>
        {/* Top Triangle */}
        <mesh position={[0, 0.22, 0]} rotation={[0, 0, Math.PI]}>
          <coneGeometry args={[0.3, 0.4, 3]} />
          <meshStandardMaterial
            color="#ff1a35"
            emissive="#ff1a35"
            emissiveIntensity={isStunActive ? 2 : 0.8}
            roughness={0.2}
          />
        </mesh>
        {/* Bottom Triangle */}
        <mesh position={[0, -0.22, 0]}>
          <coneGeometry args={[0.3, 0.4, 3]} />
          <meshStandardMaterial
            color="#ff1a35"
            emissive="#ff1a35"
            emissiveIntensity={isStunActive ? 2 : 0.8}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* Dual Electroshock Tactical Batons */}
      {/* Baton 1 */}
      <mesh ref={baton1Ref} position={[-0.6, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 2.2, 16]} />
        <meshStandardMaterial color="#1a2028" metalness={0.95} roughness={0.2} />
      </mesh>
      {/* Baton 1 Blue/Red Stun Tip */}
      <mesh position={[-0.6, 0.9, 0]}>
        <cylinderGeometry args={[0.045, 0.045, 0.35, 16]} />
        <meshStandardMaterial
          color="#00e5ff"
          emissive={isStunActive ? '#00e5ff' : '#ff1a35'}
          emissiveIntensity={isStunActive ? 3 : 1}
        />
      </mesh>

      {/* Baton 2 */}
      <mesh ref={baton2Ref} position={[0.6, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 2.2, 16]} />
        <meshStandardMaterial color="#1a2028" metalness={0.95} roughness={0.2} />
      </mesh>
      {/* Baton 2 Stun Tip */}
      <mesh position={[0.6, 0.9, 0]}>
        <cylinderGeometry args={[0.045, 0.045, 0.35, 16]} />
        <meshStandardMaterial
          color="#00e5ff"
          emissive={isStunActive ? '#00e5ff' : '#ff1a35'}
          emissiveIntensity={isStunActive ? 3 : 1}
        />
      </mesh>

      {/* Widow's Bite Wrist Gauntlet Shell */}
      <mesh position={[0, 0, -0.2]}>
        <torusGeometry args={[0.7, 0.06, 12, 32]} />
        <meshStandardMaterial color="#2d3748" metalness={0.9} roughness={0.3} />
      </mesh>

      <pointLight ref={lightRef} position={[0, 0, 1]} color="#ff1a35" distance={6} />
      <pointLight position={[0, 1, 0]} color="#00e5ff" intensity={isStunActive ? 6 : 1} distance={4} />
    </group>
  );
}
