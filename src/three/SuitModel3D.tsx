import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { IronManSuit } from '../data/suits';

interface SuitModel3DProps {
  suit: IronManSuit;
  isInspecting?: boolean;
}

export default function SuitModel3D({
  suit,
  isInspecting = false,
}: SuitModel3DProps) {
  const suitGroupRef = useRef<THREE.Group>(null);
  const coreGlowRef = useRef<THREE.Mesh>(null);
  const headRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (suitGroupRef.current) {
      if (!isInspecting) {
        suitGroupRef.current.rotation.y = t * 0.45;
        suitGroupRef.current.position.y = Math.sin(t * 1.5) * 0.05;
      } else {
        // Slow inspection float
        suitGroupRef.current.rotation.y = THREE.MathUtils.lerp(suitGroupRef.current.rotation.y, state.pointer.x * 0.8, 0.05);
        suitGroupRef.current.rotation.x = THREE.MathUtils.lerp(suitGroupRef.current.rotation.x, -state.pointer.y * 0.4, 0.05);
      }
    }

    if (coreGlowRef.current) {
      const pulse = 1 + Math.sin(t * 4) * 0.15;
      coreGlowRef.current.scale.setScalar(pulse);
    }
  });

  const armorMat = new THREE.MeshStandardMaterial({
    color: suit.primaryColor,
    metalness: 0.94,
    roughness: 0.18,
  });

  const goldMat = new THREE.MeshStandardMaterial({
    color: suit.accentColor,
    metalness: 0.96,
    roughness: 0.12,
  });

  const darkMat = new THREE.MeshStandardMaterial({
    color: '#1a1f26',
    metalness: 0.9,
    roughness: 0.3,
  });

  return (
    <group ref={suitGroupRef} scale={isInspecting ? 1.25 : 0.95}>
      {/* ==================== CHEST & TORSO ==================== */}
      <group position={[0, 0, 0]}>
        {/* Main Chest Plate */}
        <mesh material={armorMat} position={[0, 0.15, 0]}>
          <boxGeometry args={[0.9, 0.75, 0.55]} />
        </mesh>
        {/* Gold Upper Collar Accent */}
        <mesh material={goldMat} position={[0, 0.42, 0.08]}>
          <boxGeometry args={[0.65, 0.15, 0.42]} />
        </mesh>
        {/* Arc Reactor Emitter */}
        <mesh ref={coreGlowRef} position={[0, 0.2, 0.3]}>
          {suit.id === 'mark-6' ? (
            <cylinderGeometry args={[0.16, 0.16, 0.06, 3]} />
          ) : (
            <cylinderGeometry args={[0.14, 0.14, 0.06, 32]} />
          )}
          <meshBasicMaterial color={suit.accentColor === '#00e5ff' ? '#00e5ff' : '#00ffff'} />
        </mesh>
        {/* Core Ring Bezel */}
        <mesh position={[0, 0.2, 0.28]} material={darkMat}>
          <torusGeometry args={[0.18, 0.02, 16, 32]} />
        </mesh>
        {/* Abdomen Articulated Plates */}
        <mesh material={darkMat} position={[0, -0.32, 0.02]}>
          <boxGeometry args={[0.68, 0.4, 0.42]} />
        </mesh>
      </group>

      {/* ==================== HELMET ==================== */}
      <group ref={headRef} position={[0, 0.85, 0]}>
        {/* Red Helmet Shell */}
        <mesh material={armorMat}>
          <sphereGeometry args={[0.32, 32, 24]} />
        </mesh>
        {/* Gold Faceplate */}
        <mesh material={goldMat} position={[0, 0.02, 0.14]} scale={[0.85, 0.9, 0.65]}>
          <sphereGeometry args={[0.3, 32, 24]} />
        </mesh>
        {/* Glowing Slit Eye 1 */}
        <mesh position={[-0.09, 0.04, 0.3]}>
          <boxGeometry args={[0.08, 0.02, 0.02]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        {/* Glowing Slit Eye 2 */}
        <mesh position={[0.09, 0.04, 0.3]}>
          <boxGeometry args={[0.08, 0.02, 0.02]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>

      {/* ==================== SHOULDERS & ARMS ==================== */}
      {/* Left Shoulder Pauldron */}
      <mesh material={armorMat} position={[-0.62, 0.42, 0]} rotation={[0, 0, 0.25]}>
        <sphereGeometry args={[0.22, 16, 16]} />
      </mesh>
      {/* Left Arm Upper */}
      <mesh material={goldMat} position={[-0.65, 0.15, 0]}>
        <cylinderGeometry args={[0.11, 0.1, 0.4, 16]} />
      </mesh>
      {/* Left Gauntlet */}
      <mesh material={armorMat} position={[-0.68, -0.22, 0]}>
        <cylinderGeometry args={[0.12, 0.11, 0.42, 16]} />
      </mesh>
      {/* Left Palm Repulsor */}
      <mesh position={[-0.68, -0.45, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.02, 16]} />
        <meshBasicMaterial color="#00e5ff" />
      </mesh>

      {/* Right Shoulder Pauldron */}
      <mesh material={armorMat} position={[0.62, 0.42, 0]} rotation={[0, 0, -0.25]}>
        <sphereGeometry args={[0.22, 16, 16]} />
      </mesh>
      {/* Right Arm Upper */}
      <mesh material={goldMat} position={[0.65, 0.15, 0]}>
        <cylinderGeometry args={[0.11, 0.1, 0.4, 16]} />
      </mesh>
      {/* Right Gauntlet */}
      <mesh material={armorMat} position={[0.68, -0.22, 0]}>
        <cylinderGeometry args={[0.12, 0.11, 0.42, 16]} />
      </mesh>
      {/* Right Palm Repulsor */}
      <mesh position={[0.68, -0.45, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.02, 16]} />
        <meshBasicMaterial color="#00e5ff" />
      </mesh>

      {/* ==================== LEGS & BOOTS ==================== */}
      {/* Left Thigh */}
      <mesh material={goldMat} position={[-0.24, -0.85, 0]}>
        <cylinderGeometry args={[0.16, 0.14, 0.55, 16]} />
      </mesh>
      {/* Left Shin Armor */}
      <mesh material={armorMat} position={[-0.24, -1.35, 0]}>
        <cylinderGeometry args={[0.15, 0.13, 0.55, 16]} />
      </mesh>
      {/* Left Boot Thruster Emitter */}
      <mesh position={[-0.24, -1.65, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.04, 16]} />
        <meshBasicMaterial color="#00e5ff" />
      </mesh>

      {/* Right Thigh */}
      <mesh material={goldMat} position={[0.24, -0.85, 0]}>
        <cylinderGeometry args={[0.16, 0.14, 0.55, 16]} />
      </mesh>
      {/* Right Shin Armor */}
      <mesh material={armorMat} position={[0.24, -1.35, 0]}>
        <cylinderGeometry args={[0.15, 0.13, 0.55, 16]} />
      </mesh>
      {/* Right Boot Thruster Emitter */}
      <mesh position={[0.24, -1.65, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.04, 16]} />
        <meshBasicMaterial color="#00e5ff" />
      </mesh>

      {/* Atmospheric Point Light from Core */}
      <pointLight position={[0, 0.2, 0.8]} color={suit.accentColor} intensity={5} distance={4} />
    </group>
  );
}
