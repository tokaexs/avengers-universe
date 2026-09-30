import { useRef, useMemo, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Center } from '@react-three/drei';
import * as THREE from 'three';

interface TimelineRings3DProps {
  activeEraIdx?: number;
}

function EndgameTitleGLB() {
  const { scene } = useGLTF('/models/titles/avengers_endgame.glb');
  const titleRef = useRef<THREE.Group>(null);

  const { clonedScene, normalizedScale } = useMemo(() => {
    const clone = scene.clone(true);
    clone.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const targetSize = 1.5;
    const scale = targetSize / maxDim;

    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    return { clonedScene: clone, normalizedScale: scale };
  }, [scene]);

  useFrame((state) => {
    if (titleRef.current) {
      const t = state.clock.getElapsedTime();
      titleRef.current.rotation.y = Math.sin(t * 0.5) * 0.15;
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

function ProceduralSingularityCore() {
  return (
    <mesh scale={[0.3, 0.3, 0.3]}>
      <octahedronGeometry args={[1, 0]} />
      <meshBasicMaterial color="#ffffff" />
    </mesh>
  );
}

export default function TimelineRings3D({ activeEraIdx = 0 }: TimelineRings3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const coreTunnelRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.2;
      groupRef.current.position.y = Math.sin(t * 0.8) * 0.1;
    }

    if (coreTunnelRef.current) {
      coreTunnelRef.current.rotation.z += delta * 0.4;
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.5) * 0.2;
      ring1Ref.current.rotation.z += delta * 0.6;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = Math.PI / 3 + Math.cos(t * 0.6) * 0.2;
      ring2Ref.current.rotation.x += delta * -0.5;
    }

    if (ring3Ref.current) {
      ring3Ref.current.rotation.z += delta * 0.3;
    }
  });

  const getEraColor = (idx: number) => {
    switch (idx) {
      case 0: return '#4d88ff'; // 1942
      case 1: return '#00e5ff'; // 2012
      case 2: return '#ff2233'; // 2015
      case 3: return '#ffd000'; // 2018
      case 4: return '#00e5ff'; // 2019
      default: return '#00e5ff';
    }
  };

  const currentColor = getEraColor(activeEraIdx);

  return (
    <group ref={groupRef} scale={1.2}>
      {/* Central Sacred Timeline Quantum Ring Tunnel */}
      <mesh ref={coreTunnelRef}>
        <cylinderGeometry args={[1.2, 1.2, 2.5, 32, 1, true]} />
        <meshStandardMaterial
          color={currentColor}
          wireframe
          transparent
          opacity={0.65}
          emissive={currentColor}
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* Outer Chrono Ring 1 */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.6, 0.025, 16, 64]} />
        <meshBasicMaterial color={currentColor} transparent opacity={0.7} />
      </mesh>

      {/* Outer Chrono Ring 2 */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[1.9, 0.02, 16, 64]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.4} />
      </mesh>

      {/* Outer Chrono Ring 3 */}
      <mesh ref={ring3Ref}>
        <torusGeometry args={[2.2, 0.015, 16, 64]} />
        <meshBasicMaterial color={currentColor} transparent opacity={0.5} />
      </mesh>

      {/* Core Quantum Singularity Point / Authentic Endgame 3D Emblem for Timeline */}
      {activeEraIdx === 4 ? (
        <Suspense fallback={<ProceduralSingularityCore />}>
          <EndgameTitleGLB />
        </Suspense>
      ) : (
        <ProceduralSingularityCore />
      )}

      <pointLight position={[0, 0, 0]} color={currentColor} intensity={5} distance={8} />
    </group>
  );
}
