import { useRef, useMemo, Suspense, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Center } from "@react-three/drei";
import * as THREE from "three";

useGLTF.preload("/models/titles/avengers_title.glb");

interface AvengersLogo3DProps {
  scrollRef?: RefObject<number>;
}

function AvengersTitleGLB() {
  const { scene } = useGLTF("/models/titles/avengers_title.glb");
  const { clonedScene, normalizedScale } = useMemo(() => {
    const clone = scene.clone(true);
    clone.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const targetSize = 1.95;
    const scale = targetSize / maxDim;

    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    return { clonedScene: clone, normalizedScale: scale };
  }, [scene]);

  return (
    <group position={[0, 0, 0.05]}>
      <Center>
        <primitive object={clonedScene} scale={[normalizedScale, normalizedScale, normalizedScale]} />
      </Center>
    </group>
  );
}

function ProceduralAvengersA({ arrowRef }: { arrowRef: RefObject<THREE.Mesh | null> }) {
  return (
    <>
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
      <mesh ref={arrowRef as any} position={[0.74, -0.22, 0.14]} rotation={[0, 0, -Math.PI / 2 - 0.14]}>
        <coneGeometry args={[0.22, 0.38, 3]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={1.0}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </>
  );
}

export default function AvengersLogo3D({ scrollRef }: AvengersLogo3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const arrowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const isScrollDriven = scrollRef !== undefined;
    const progress = scrollRef?.current ?? 1;
    const t = state.clock.getElapsedTime();

    // If scroll-driven, smoothly fade in around 50% -> 85% of scroll; otherwise always visible (1.0)
    const opacity = isScrollDriven ? Math.max(0, Math.min(1, (progress - 0.48) * 3.5)) : 1.0;
    groupRef.current.visible = opacity > 0.01;

    // Smooth floating rotation and tilt
    groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.15 + (1 - opacity) * 0.5;
    groupRef.current.rotation.x = Math.cos(t * 0.35) * 0.08;

    if (ringRef.current) {
      ringRef.current.rotation.z = -t * 0.15;
    }

    if (arrowRef.current && (arrowRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity !== undefined) {
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

      {/* 3D Avengers Title with Procedural 'A' Fallback */}
      <Suspense fallback={<ProceduralAvengersA arrowRef={arrowRef} />}>
        <AvengersTitleGLB />
      </Suspense>

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
