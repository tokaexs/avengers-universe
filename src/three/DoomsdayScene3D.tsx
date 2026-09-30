import { useRef, useMemo, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Center } from '@react-three/drei';
import * as THREE from 'three';

useGLTF.preload('/models/titles/avengers_doomsday.glb');

function DoomsdayTitleGLB() {
  const { scene } = useGLTF('/models/titles/avengers_doomsday.glb');
  const titleRef = useRef<THREE.Group>(null);
  
  const { clonedScene, normalizedScale } = useMemo(() => {
    const clone = scene.clone(true);
    // Rotate model to face the camera upright
    clone.rotation.x = Math.PI / 2;
    clone.updateMatrixWorld(true);

    const box = new THREE.Box3();
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        if (mesh.geometry) {
          mesh.geometry.computeBoundingBox();
          const b = mesh.geometry.boundingBox!.clone().applyMatrix4(mesh.matrixWorld);
          box.union(b);
        }
      }
    });

    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y) || 32;
    const targetSize = 3.6;
    const scale = targetSize / maxDim;

    return { clonedScene: clone, normalizedScale: scale };
  }, [scene]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const ptrX = state.pointer.x * 0.35;
    const ptrY = state.pointer.y * 0.25;

    if (titleRef.current) {
      titleRef.current.rotation.y = Math.sin(t * 0.4) * 0.15 + ptrX;
      titleRef.current.rotation.x = Math.cos(t * 0.3) * 0.08 - ptrY;
      titleRef.current.position.y = Math.sin(t * 0.8) * 0.08;
    }
  });

  return (
    <group ref={titleRef} position={[0, 0, 0]}>
      <Center>
        <primitive object={clonedScene} scale={[normalizedScale, normalizedScale, normalizedScale]} />
      </Center>
    </group>
  );
}

function ProceduralDoomCore() {
  const doomCoreRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (doomCoreRef.current) {
      doomCoreRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <mesh ref={doomCoreRef} position={[0, 0, -1]}>
      <octahedronGeometry args={[1.5, 0]} />
      <meshStandardMaterial
        color="#120508"
        roughness={0.4}
        metalness={0.9}
        wireframe
      />
    </mesh>
  );
}

export default function DoomsdayScene3D() {
  const debrisGroupRef = useRef<THREE.Group>(null);
  const greenLightRef = useRef<THREE.PointLight>(null);
  const redLightRef = useRef<THREE.PointLight>(null);

  const debris = useMemo(() => {
    return Array.from({ length: 60 }, () => ({
      position: [
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 10 - 1,
      ] as [number, number, number],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      ] as [number, number, number],
      scale: Math.random() * 0.4 + 0.08,
      speed: Math.random() * 0.4 + 0.2,
    }));
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const ptrX = state.pointer.x * 0.4;
    const ptrY = state.pointer.y * 0.3;

    if (debrisGroupRef.current) {
      debrisGroupRef.current.rotation.y = t * 0.04 + ptrX;
      debrisGroupRef.current.rotation.x = Math.sin(t * 0.1) * 0.05 - ptrY;
    }

    if (greenLightRef.current) {
      greenLightRef.current.intensity = 7.0 + Math.sin(t * 2.2) * 3.0;
      greenLightRef.current.position.x = Math.sin(t * 0.8) * 2.5;
    }

    if (redLightRef.current) {
      redLightRef.current.intensity = 5.0 + Math.cos(t * 1.8) * 2.5;
      redLightRef.current.position.y = Math.cos(t * 0.6) * 2.0;
    }
  });

  return (
    <group>
      {/* Central 3D Doomsday Title in Background with Dynamic Illumination */}
      <Suspense fallback={<ProceduralDoomCore />}>
        <DoomsdayTitleGLB />
      </Suspense>

      {/* Floating Obsidian & Vibranium Debris Shards */}
      <group ref={debrisGroupRef}>
        {debris.map((d, i) => (
          <mesh key={i} position={d.position} rotation={d.rotation} scale={d.scale}>
            <octahedronGeometry args={[0.4, 0]} />
            <meshStandardMaterial
              color={i % 3 === 0 ? '#0a2215' : '#1a0508'}
              metalness={0.95}
              roughness={0.2}
              emissive={i % 4 === 0 ? '#003318' : '#220006'}
              emissiveIntensity={0.6}
            />
          </mesh>
        ))}
      </group>

      {/* Dynamic Cosmic Energy Lighting */}
      <pointLight ref={greenLightRef} position={[0, 1.5, -2]} color="#00ff88" intensity={8} distance={14} />
      <pointLight ref={redLightRef} position={[2.5, -1.8, 1]} color="#ff1133" intensity={6} distance={12} />
      <directionalLight position={[0, 6, 6]} color="#ffffff" intensity={0.9} />
      <ambientLight intensity={0.45} />
    </group>
  );
}
