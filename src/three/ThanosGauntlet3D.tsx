import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Center } from '@react-three/drei';
import * as THREE from 'three';

interface ThanosGauntlet3DProps {
  activeStone?: string | null;
  isSnapping?: boolean;
}

const STONES = [
  { id: 'space', color: '#0055ff', pos: [-0.3, 0.4, 0.4] },
  { id: 'mind', color: '#ffee00', pos: [0, 0.6, 0.45] },
  { id: 'reality', color: '#ff1133', pos: [0.3, 0.4, 0.4] },
  { id: 'power', color: '#9900ff', pos: [-0.4, 0.1, 0.35] },
  { id: 'time', color: '#00ff66', pos: [0.4, 0.1, 0.35] },
  { id: 'soul', color: '#ff7700', pos: [0, 0.1, 0.4] },
];

function RealThanosGLB({ isSnapping = false }: { isSnapping?: boolean }) {
  const { scene } = useGLTF('/models/thanos/thanos.glb');
  const groupRef = useRef<THREE.Group>(null);
  const auraRef = useRef<THREE.Mesh>(null);

  const { clonedScene, normalizedScale } = useMemo(() => {
    const clone = scene.clone(true);
    clone.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const targetSize = 2.45;
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
      if (isSnapping) {
        groupRef.current.rotation.y += delta * 8;
      } else {
        groupRef.current.rotation.y = t * 0.3;
        groupRef.current.position.y = Math.sin(t * 1.3) * 0.05;
      }
    }

    if (auraRef.current) {
      auraRef.current.scale.setScalar(1 + Math.sin(t * (isSnapping ? 12 : 3)) * (isSnapping ? 0.3 : 0.06));
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <Center>
        <primitive object={clonedScene} scale={[normalizedScale, normalizedScale, normalizedScale]} />
      </Center>
      {/* Cosmic Aura Ring */}
      <mesh ref={auraRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1.5, 24, 24]} />
        <meshBasicMaterial
          color="#9933ff"
          transparent
          opacity={isSnapping ? 0.4 : 0.08}
          wireframe
        />
      </mesh>
      <pointLight position={[0, 1.2, 1.5]} color="#ffee00" intensity={4} distance={6} />
      <pointLight position={[0, -1, -1.5]} color="#9933ff" intensity={4} distance={6} />
    </group>
  );
}

function ProceduralGauntlet({
  activeStone = null,
  isSnapping = false,
}: ThanosGauntlet3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const gauntletRef = useRef<THREE.Mesh>(null);
  const auraRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      if (isSnapping) {
        groupRef.current.rotation.y += delta * 8;
      } else {
        groupRef.current.rotation.y = t * 0.35;
        groupRef.current.position.y = Math.sin(t * 1.3) * 0.08;
      }
    }

    if (auraRef.current) {
      auraRef.current.scale.setScalar(1 + Math.sin(t * (isSnapping ? 12 : 3)) * (isSnapping ? 0.3 : 0.06));
    }
  });

  return (
    <group ref={groupRef} scale={1.3}>
      <mesh ref={gauntletRef} position={[0, 0, 0]}>
        <boxGeometry args={[1.0, 1.4, 0.7]} />
        <meshStandardMaterial color="#c69214" metalness={0.96} roughness={0.2} />
      </mesh>
      <mesh position={[0, -0.9, 0]}>
        <cylinderGeometry args={[0.45, 0.38, 0.8, 24]} />
        <meshStandardMaterial color="#8e680d" metalness={0.94} roughness={0.25} />
      </mesh>
      {STONES.map((st) => {
        const isSelected = activeStone === st.id;
        return (
          <mesh key={st.id} position={st.pos as [number, number, number]}>
            <octahedronGeometry args={[0.11, 0]} />
            <meshStandardMaterial
              color={st.color}
              emissive={st.color}
              emissiveIntensity={isSelected || isSnapping ? 3.5 : 1.2}
              roughness={0.1}
              metalness={0.9}
            />
          </mesh>
        );
      })}
      <mesh ref={auraRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1.2, 24, 24]} />
        <meshBasicMaterial
          color="#9933ff"
          transparent
          opacity={isSnapping ? 0.4 : 0.12}
          wireframe
        />
      </mesh>
      <pointLight position={[0, 0.4, 1.2]} color="#ffee00" intensity={4} distance={6} />
      <pointLight position={[0, -0.4, -1]} color="#9933ff" intensity={3} distance={5} />
    </group>
  );
}

export default function ThanosGauntlet3D(props: ThanosGauntlet3DProps) {
  try {
    return <RealThanosGLB isSnapping={props.isSnapping} />;
  } catch {
    return <ProceduralGauntlet {...props} />;
  }
}
