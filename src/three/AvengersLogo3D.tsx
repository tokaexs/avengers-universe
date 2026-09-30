import { useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface AvengersLogo3DProps {
  scrollRef?: RefObject<number>;
}

export default function AvengersLogo3D({ scrollRef }: AvengersLogo3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const arrowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const progress = scrollRef?.current ?? 0;
    const t = state.clock.getElapsedTime();

    // The logo smoothly fades in around 55% -> 85% of scroll
    const opacity = Math.max(0, Math.min(1, (progress - 0.48) * 3.5));
    groupRef.current.visible = opacity > 0.01;

    // Smooth floating rotation and tilt
    groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.15 + (1 - opacity) * 0.5;
    groupRef.current.rotation.x = Math.cos(t * 0.35) * 0.08;

    if (ringRef.current) {
      ringRef.current.rotation.z = -t * 0.15;
    }

    if (arrowRef.current) {
      const pulse = Math.sin(t * 5) * 0.15 + 0.85;
      (arrowRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 1.2 * pulse * opacity;
    }
  });

  return (
    <group ref={groupRef} scale={0.65}>
      {/* Outer Targeting Tech Ring */}
      <mesh ref={ringRef} position={[0, 0, -0.05]}>
        <torusGeometry args={[1.58, 0.035, 16, 80]} />
        <meshStandardMaterial
          color="#00e5ff"
          emissive="#00b4d8"
          emissiveIntensity={0.8}
          transparent
          opacity={0.85}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Segmented Ring Crosshair Marks */}
      <mesh position={[0, 0, -0.02]} rotation={[0, 0, Math.PI / 4]}>
        <ringGeometry args={[1.65, 1.7, 4]} />
        <meshBasicMaterial
          color="#8cf4ff"
          transparent
          opacity={0.6}
          wireframe
        />
      </mesh>

      {/* Left Diagonal Leg of the 'A' */}
      <mesh position={[-0.35, -0.1, 0.06]} rotation={[0, 0, -0.32]}>
        <boxGeometry args={[0.24, 2.0, 0.16]} />
        <meshStandardMaterial
          color="#dbe4ec"
          metalness={0.96}
          roughness={0.12}
          emissive="#003355"
          emissiveIntensity={0.25}
        />
      </mesh>

      {/* Right Diagonal Leg of the 'A' */}
      <mesh position={[0.38, -0.15, 0.06]} rotation={[0, 0, 0.32]}>
        <boxGeometry args={[0.24, 1.9, 0.16]} />
        <meshStandardMaterial
          color="#dbe4ec"
          metalness={0.96}
          roughness={0.12}
          emissive="#003355"
          emissiveIntensity={0.25}
        />
      </mesh>

      {/* Horizontal Crossbar */}
      <mesh position={[0.12, -0.12, 0.14]} rotation={[0, 0, -0.14]}>
        <boxGeometry args={[1.1, 0.2, 0.18]} />
        <meshStandardMaterial
          color="#00e5ff"
          emissive="#00e5ff"
          emissiveIntensity={0.7}
          metalness={0.85}
          roughness={0.15}
        />
      </mesh>

      {/* Arrow Head On Crossbar */}
      <mesh ref={arrowRef} position={[0.74, -0.22, 0.14]} rotation={[0, 0, -Math.PI / 2 - 0.14]}>
        <coneGeometry args={[0.22, 0.38, 3]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={1.0}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Luminous Center Point */}
      <pointLight
        position={[0, 0, 0.9]}
        color="#00e5ff"
        intensity={5}
        distance={4.5}
      />
    </group>
  );
}
