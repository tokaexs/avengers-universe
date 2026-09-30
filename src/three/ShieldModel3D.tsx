import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Center } from '@react-three/drei';
import * as THREE from 'three';

interface ShieldModel3DProps {
  isSpinning?: boolean;
  selectedHotspot?: string | null;
}

function RealShieldGLB({ isSpinning = false }: { isSpinning?: boolean }) {
  const { scene } = useGLTF('/models/captain-america/shield.glb');
  const groupRef = useRef<THREE.Group>(null);

  const { clonedScene, normalizedScale } = useMemo(() => {
    const clone = scene.clone(true);
    clone.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const targetSize = 2.2;
    const scale = targetSize / maxDim;

    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    return { clonedScene: clone, normalizedScale: scale };
  }, [scene]);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      if (isSpinning) {
        groupRef.current.rotation.z += delta * 12;
        groupRef.current.rotation.y = Math.sin(t * 2) * 0.4;
      } else {
        groupRef.current.rotation.z += delta * 0.35;
        groupRef.current.rotation.y = Math.sin(t * 0.7) * 0.3;
        groupRef.current.rotation.x = Math.cos(t * 0.5) * 0.15;
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <Center>
        <primitive object={clonedScene} scale={[normalizedScale, normalizedScale, normalizedScale]} />
      </Center>
      <pointLight position={[0, 0, 2]} color="#00e5ff" intensity={4} distance={6} />
      <pointLight position={[0, 0, -2]} color="#ff3344" intensity={2} distance={4} />
    </group>
  );
}

function ProceduralShield({ isSpinning = false, selectedHotspot = null }: ShieldModel3DProps) {
  const shieldRef = useRef<THREE.Group>(null);
  const ringGlowRef = useRef<THREE.Mesh>(null);
  const starGlowRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (shieldRef.current) {
      if (isSpinning) {
        shieldRef.current.rotation.z += delta * 12;
        shieldRef.current.rotation.y = Math.sin(t * 2) * 0.4;
      } else {
        shieldRef.current.rotation.z += delta * 0.35;
        shieldRef.current.rotation.y = Math.sin(t * 0.7) * 0.3;
        shieldRef.current.rotation.x = Math.cos(t * 0.5) * 0.15;
      }
    }

    if (ringGlowRef.current) {
      ringGlowRef.current.scale.setScalar(1 + Math.sin(t * 3) * 0.05);
    }
    if (starGlowRef.current) {
      starGlowRef.current.scale.setScalar(1 + Math.cos(t * 4) * 0.08);
    }
  });

  const isStarActive = selectedHotspot === 'star';
  const isRingsActive = selectedHotspot === 'rings';
  const isStrapsActive = selectedHotspot === 'straps';
  const isRimActive = selectedHotspot === 'rim';

  return (
    <group ref={shieldRef} scale={1.35}>
      {/* Front Convex Dome - Outer Red Ring */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.25, 1.25, 0.04, 64]} />
        <meshStandardMaterial
          color={isRimActive ? '#ff2a4b' : '#b8122a'}
          metalness={0.92}
          roughness={0.16}
          emissive={isRimActive ? '#ff2a4b' : '#000000'}
          emissiveIntensity={isRimActive ? 0.6 : 0}
        />
      </mesh>

      {/* Silver Concentric Ring */}
      <mesh position={[0, 0, 0.015]}>
        <cylinderGeometry args={[1.02, 1.02, 0.042, 64]} />
        <meshStandardMaterial
          color={isRingsActive ? '#ffffff' : '#d8e2ec'}
          metalness={0.98}
          roughness={0.1}
          emissive={isRingsActive ? '#00e5ff' : '#000000'}
          emissiveIntensity={isRingsActive ? 0.4 : 0}
        />
      </mesh>

      {/* Inner Red Concentric Ring */}
      <mesh position={[0, 0, 0.03]}>
        <cylinderGeometry args={[0.78, 0.78, 0.044, 64]} />
        <meshStandardMaterial
          color={isRingsActive ? '#ff3b56' : '#b8122a'}
          metalness={0.92}
          roughness={0.16}
        />
      </mesh>

      {/* Central Blue Disc */}
      <mesh position={[0, 0, 0.045]}>
        <cylinderGeometry args={[0.52, 0.52, 0.046, 64]} />
        <meshStandardMaterial
          color={isStarActive ? '#0055ff' : '#003399'}
          metalness={0.95}
          roughness={0.14}
          emissive={isStarActive ? '#00e5ff' : '#000000'}
          emissiveIntensity={isStarActive ? 0.5 : 0}
        />
      </mesh>

      {/* 5-Point Vibranium Star */}
      <group position={[0, 0, 0.075]}>
        <mesh ref={starGlowRef}>
          <octahedronGeometry args={[0.28, 0]} />
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.99}
            roughness={0.06}
            emissive={isStarActive ? '#00e5ff' : '#ffffff'}
            emissiveIntensity={isStarActive ? 0.8 : 0.2}
          />
        </mesh>
      </group>

      {/* Backside: Dual Leather & Magnetic Forearm Straps */}
      <group position={[0, 0, -0.04]}>
        <mesh position={[-0.32, 0, 0]}>
          <boxGeometry args={[0.1, 0.5, 0.04]} />
          <meshStandardMaterial
            color={isStrapsActive ? '#a06030' : '#4a2c16'}
            roughness={0.8}
            metalness={isStrapsActive ? 0.6 : 0.2}
          />
        </mesh>
        <mesh position={[0.32, 0, 0]}>
          <boxGeometry args={[0.1, 0.5, 0.04]} />
          <meshStandardMaterial
            color={isStrapsActive ? '#a06030' : '#4a2c16'}
            roughness={0.8}
            metalness={isStrapsActive ? 0.6 : 0.2}
          />
        </mesh>
        {/* Back Disc Plate */}
        <mesh position={[0, 0, -0.01]}>
          <cylinderGeometry args={[1.2, 1.2, 0.02, 48]} />
          <meshStandardMaterial color="#222830" metalness={0.9} roughness={0.3} />
        </mesh>
      </group>

      {/* Kinetic Shockwave Energy Ring */}
      <mesh ref={ringGlowRef} position={[0, 0, 0.05]}>
        <torusGeometry args={[1.28, 0.018, 16, 64]} />
        <meshBasicMaterial
          color="#00e5ff"
          transparent
          opacity={isSpinning ? 0.85 : 0.3}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <pointLight position={[0, 0, 2]} color="#00e5ff" intensity={4} distance={6} />
      <pointLight position={[0, 0, -2]} color="#ff3344" intensity={2} distance={4} />
    </group>
  );
}

export default function ShieldModel3D(props: ShieldModel3DProps) {
  try {
    return <RealShieldGLB isSpinning={props.isSpinning} />;
  } catch {
    return <ProceduralShield {...props} />;
  }
}
