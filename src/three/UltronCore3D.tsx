import { useMemo, useRef, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface UltronCore3DProps {
  isGlitching?: boolean;
}

function RealUltronGLB({ isGlitching = false }: UltronCore3DProps) {
  const { scene } = useGLTF('/models/ultron/ultron.glb');
  const groupRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  const { clonedScene, scale } = useMemo(() => {
    const clone = scene.clone(true);
    clone.updateMatrixWorld(true);

    const box = new THREE.Box3();
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        if (mesh.geometry) {
          mesh.geometry.computeBoundingBox();
          const meshBox = mesh.geometry.boundingBox!
            .clone()
            .applyMatrix4(mesh.matrixWorld);
          box.union(meshBox);
        }
      }
    });

    const size = new THREE.Vector3();
    box.getSize(size);
    const naturalHeight = Math.max(size.y, size.z, 0.001);
    const targetHeight = 2.35;
    const computedScale = targetHeight / naturalHeight;

    return {
      clonedScene: clone,
      scale: computedScale,
    };
  }, [scene]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      if (isGlitching) {
        groupRef.current.position.x = (Math.random() - 0.5) * 0.06;
        groupRef.current.position.y = (Math.random() - 0.5) * 0.06 - 1.1;
      } else {
        groupRef.current.position.x = 0;
        groupRef.current.position.y = Math.sin(t * 1.2) * 0.03 - 1.1;
      }

      groupRef.current.rotation.y = t * 0.28;
    }

    if (lightRef.current) {
      lightRef.current.intensity = isGlitching
        ? 14 + Math.random() * 8
        : 6.0 + Math.sin(t * 4) * 2.0;
    }
  });

  return (
    <group ref={groupRef} position={[0, -1.1, 0]}>
      <primitive object={clonedScene} scale={[scale, scale, scale]} />

      {/* Main glowing red ocular lighting */}
      <pointLight
        ref={lightRef}
        position={[0, 1.8, 1.2]}
        color="#ff2233"
        intensity={6.0}
        distance={8}
      />

      {/* Cybernetic cyan backlight */}
      <pointLight
        position={[-2, 1.2, -1.5]}
        color="#00e5ff"
        intensity={2.2}
        distance={6}
      />

      {/* Secondary crimson rim light */}
      <pointLight
        position={[2, 0.8, -1]}
        color="#ff1133"
        intensity={3.0}
        distance={5}
      />
    </group>
  );
}

function ProceduralUltron({ isGlitching = false }: UltronCore3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const skullRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      if (isGlitching) {
        groupRef.current.position.x = (Math.random() - 0.5) * 0.08;
        groupRef.current.position.y = (Math.random() - 0.5) * 0.08;
      } else {
        groupRef.current.position.x = 0;
        groupRef.current.position.y = Math.sin(t * 1.2) * 0.04;
      }
      groupRef.current.rotation.y = t * 0.3;
    }

    if (skullRef.current) {
      skullRef.current.rotation.x = Math.sin(t * 0.8) * 0.12;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 1.2;
    }

    if (lightRef.current) {
      lightRef.current.intensity = isGlitching
        ? 12 + Math.random() * 6
        : 4 + Math.sin(t * 5) * 1.5;
    }
  });

  return (
    <group ref={groupRef} scale={1.15}>
      <mesh ref={skullRef}>
        <dodecahedronGeometry args={[0.75, 0]} />
        <meshStandardMaterial
          color="#ff2233"
          emissive="#ff2233"
          emissiveIntensity={isGlitching ? 2.5 : 1.2}
          wireframe
          metalness={0.9}
          roughness={0.25}
        />
      </mesh>
      <mesh scale={[0.5, 0.5, 0.5]}>
        <octahedronGeometry args={[0.85, 0]} />
        <meshStandardMaterial
          color="#110000"
          emissive="#ff0022"
          emissiveIntensity={2}
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>
      <mesh ref={ringRef}>
        <torusGeometry args={[1.35, 0.04, 16, 64]} />
        <meshStandardMaterial
          color="#1a202c"
          emissive="#ff2233"
          emissiveIntensity={0.6}
          metalness={0.95}
          roughness={0.2}
        />
      </mesh>
      <pointLight ref={lightRef} position={[0, 0, 0]} color="#ff2233" intensity={4} distance={6} />
      <pointLight position={[0, 2, 2]} color="#00e5ff" intensity={1} distance={4} />
    </group>
  );
}

export default function UltronCore3D(props: UltronCore3DProps) {
  return (
    <Suspense fallback={<ProceduralUltron {...props} />}>
      <RealUltronGLB isGlitching={props.isGlitching} />
    </Suspense>
  );
}

useGLTF.preload('/models/ultron/ultron.glb');