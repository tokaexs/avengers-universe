import { useRef, useMemo, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import type { IronManSuit } from '../../data/ironManSuits';

// Preload authentic 3D armor models
useGLTF.preload('/models/ironman/iron_man.glb');
useGLTF.preload('/models/ironman/iron_man_mark7.glb');
useGLTF.preload('/models/ironman/iron_man_rig.glb');
useGLTF.preload('/models/ironman/nano_tech.glb');

interface ArmorModelProps {
  suit: IronManSuit;
  isInspecting?: boolean;
  isAssembling?: boolean;
  assemblyProgress?: number; // 0 (fully separated) to 1 (fully locked)
}

function GLBArmorMesh({
  modelPath,
  isInspecting,
  isHulkbuster,
}: {
  modelPath: string;
  isInspecting?: boolean;
  isHulkbuster?: boolean;
}) {
  const { scene } = useGLTF(modelPath);
  const modelRef = useRef<THREE.Group>(null);

  const { clonedScene, normalizedScale } = useMemo(() => {
    const clone = scene.clone(true);
    clone.updateMatrixWorld(true);

    const box = new THREE.Box3();
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const name = (mesh.name || '').toLowerCase();
        
        // Hide extraneous ground meshes, backdrop spheres, and pedestal planes
        if (
          name.includes('concrete') ||
          name.includes('plane') ||
          name.includes('floor') ||
          name.includes('ground') ||
          name.includes('sphere')
        ) {
          mesh.visible = false;
          return;
        }

        mesh.visible = true;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        if (mesh.material) {
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((mat) => {
              mat.side = THREE.FrontSide;
              mat.needsUpdate = true;
            });
          } else {
            mesh.material.side = THREE.FrontSide;
            mesh.material.needsUpdate = true;
          }
        }

        if (mesh.geometry) {
          mesh.geometry.computeBoundingBox();
          const b = mesh.geometry.boundingBox!.clone().applyMatrix4(mesh.matrixWorld);
          box.union(b);
        }
      }
    });

    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);

    // Standardize suit height to 2.45 units (2.85 for Hulkbuster)
    const suitHeight = (size.y > 0.1 ? size.y : Math.max(size.y, size.z)) || 2.0;
    const targetHeight = isHulkbuster ? 2.85 : 2.45;
    const scale = targetHeight / suitHeight;

    // Center the model cleanly around origin
    clone.position.set(-center.x * scale, -center.y * scale, -center.z * scale);

    return { clonedScene: clone, normalizedScale: scale };
  }, [scene, isHulkbuster]);

  useFrame((state) => {
    if (!modelRef.current) return;
    const t = state.clock.getElapsedTime();
    const ptrX = state.pointer.x * 0.25;
    const ptrY = state.pointer.y * 0.15;

    if (!isInspecting) {
      modelRef.current.position.y = Math.sin(t * 1.5) * 0.035;
      modelRef.current.rotation.y = Math.sin(t * 0.4) * 0.08 + ptrX;
      modelRef.current.rotation.x = -ptrY * 0.5;
    }
  });

  return (
    <group ref={modelRef} position={[0, 0, 0]}>
      <primitive object={clonedScene} scale={[normalizedScale, normalizedScale, normalizedScale]} />
    </group>
  );
}

function ProceduralArmorMesh({
  suit,
  isInspecting,
  isAssembling,
  assemblyProgress = 1,
}: ArmorModelProps) {
  const rootGroupRef = useRef<THREE.Group>(null);
  const helmetRef = useRef<THREE.Group>(null);
  const chestRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const leftLegRef = useRef<THREE.Group>(null);
  const rightLegRef = useRef<THREE.Group>(null);
  const reactorRef = useRef<THREE.Mesh>(null);
  const eyesRef = useRef<THREE.Group>(null);

  const {
    primary,
    secondary,
    trim,
    arcGlow,
    eyeGlow,
    metalness,
    roughness,
    arcShape,
  } = suit.colorPalette;

  const isHulkbuster = !!suit.isHulkbuster;
  const isNanotech = !!suit.isNanotech;
  const scale = isHulkbuster ? 1.75 : 1.1;

  // Materials
  const materials = useMemo(() => {
    const matPrimary = new THREE.MeshStandardMaterial({
      color: primary,
      metalness: metalness,
      roughness: roughness,
    });

    const matSecondary = new THREE.MeshStandardMaterial({
      color: secondary,
      metalness: metalness,
      roughness: roughness * 0.9,
    });

    const matTrim = new THREE.MeshStandardMaterial({
      color: trim,
      metalness: 0.95,
      roughness: 0.15,
    });

    const matArc = new THREE.MeshStandardMaterial({
      color: arcGlow,
      emissive: arcGlow,
      emissiveIntensity: 3.5,
      roughness: 0.1,
    });

    const matEyes = new THREE.MeshStandardMaterial({
      color: eyeGlow,
      emissive: eyeGlow,
      emissiveIntensity: 2.8,
      roughness: 0.2,
    });

    const matDarkJoints = new THREE.MeshStandardMaterial({
      color: '#1a1d20',
      metalness: 0.8,
      roughness: 0.4,
    });

    return { matPrimary, matSecondary, matTrim, matArc, matEyes, matDarkJoints };
  }, [primary, secondary, trim, arcGlow, eyeGlow, metalness, roughness]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const ptrX = state.pointer.x * 0.25;
    const ptrY = state.pointer.y * 0.15;

    // Subtle breathing / hovering animation
    if (rootGroupRef.current) {
      if (!isInspecting) {
        rootGroupRef.current.position.y = Math.sin(t * 1.5) * 0.035;
        rootGroupRef.current.rotation.y = Math.sin(t * 0.4) * 0.08 + ptrX;
        rootGroupRef.current.rotation.x = -ptrY * 0.5;
      }
    }

    // Arc reactor energy pulse
    if (reactorRef.current) {
      const pulse = 1 + Math.sin(t * 4) * 0.08;
      reactorRef.current.scale.set(pulse, pulse, pulse);
    }

    // Assembly / Component explosion offset calculations
    const sep = isAssembling ? (1 - assemblyProgress) * 1.2 : 0;

    if (helmetRef.current) {
      helmetRef.current.position.y = 0.95 + sep * 0.8;
      helmetRef.current.position.z = sep * 0.3;
    }
    if (chestRef.current) {
      chestRef.current.position.z = sep * 0.5;
    }
    if (leftArmRef.current) {
      leftArmRef.current.position.x = -0.52 - sep * 0.7;
      leftArmRef.current.position.y = 0.45 + sep * 0.2;
    }
    if (rightArmRef.current) {
      rightArmRef.current.position.x = 0.52 + sep * 0.7;
      rightArmRef.current.position.y = 0.45 + sep * 0.2;
    }
    if (leftLegRef.current) {
      leftLegRef.current.position.x = -0.22 - sep * 0.3;
      leftLegRef.current.position.y = -0.45 - sep * 0.6;
    }
    if (rightLegRef.current) {
      rightLegRef.current.position.x = 0.22 + sep * 0.3;
      rightLegRef.current.position.y = -0.45 - sep * 0.6;
    }
  });

  return (
    <group ref={rootGroupRef} scale={[scale, scale, scale]} position={[0, -0.15, 0]}>
      {/* 01 // HELMET & OPTICS */}
      <group ref={helmetRef} position={[0, 0.95, 0]}>
        <mesh material={materials.matPrimary} castShadow>
          <sphereGeometry args={[0.26, 24, 24]} />
        </mesh>
        <mesh position={[0, 0.02, 0.12]} material={materials.matSecondary} castShadow>
          <boxGeometry args={[0.22, 0.26, 0.18]} />
        </mesh>
        <mesh position={[0, -0.14, 0.11]} material={materials.matPrimary}>
          <boxGeometry args={[0.18, 0.12, 0.16]} />
        </mesh>
        <group ref={eyesRef} position={[0, 0.05, 0.21]}>
          <mesh position={[-0.055, 0, 0]} material={materials.matEyes}>
            <boxGeometry args={[0.045, 0.012, 0.02]} />
          </mesh>
          <mesh position={[0.055, 0, 0]} material={materials.matEyes}>
            <boxGeometry args={[0.045, 0.012, 0.02]} />
          </mesh>
        </group>
      </group>

      {/* 02 // NECK & COLLAR */}
      <mesh position={[0, 0.72, 0]} material={materials.matDarkJoints}>
        <cylinderGeometry args={[0.14, 0.17, 0.14, 16]} />
      </mesh>

      {/* 03 // CHEST & TORSO & ARC REACTOR */}
      <group ref={chestRef} position={[0, 0.35, 0]}>
        <mesh material={materials.matPrimary} castShadow>
          <boxGeometry args={[isHulkbuster ? 0.95 : 0.68, 0.42, 0.42]} />
        </mesh>
        <mesh position={[0, 0.06, 0.18]} material={materials.matSecondary}>
          <boxGeometry args={[isHulkbuster ? 0.7 : 0.46, 0.22, 0.12]} />
        </mesh>
        <group position={[0, 0.04, 0.23]}>
          {arcShape === 'triangle' ? (
            <mesh ref={reactorRef} rotation={[0, 0, Math.PI]} material={materials.matArc}>
              <coneGeometry args={[0.1, 0.04, 3]} />
            </mesh>
          ) : arcShape === 'hex' ? (
            <mesh ref={reactorRef} rotation={[Math.PI / 2, 0, 0]} material={materials.matArc}>
              <cylinderGeometry args={[0.09, 0.09, 0.04, 6]} />
            </mesh>
          ) : (
            <mesh ref={reactorRef} rotation={[Math.PI / 2, 0, 0]} material={materials.matArc}>
              <cylinderGeometry args={[isHulkbuster ? 0.14 : 0.085, isHulkbuster ? 0.14 : 0.085, 0.04, 24]} />
            </mesh>
          )}
          <mesh rotation={[Math.PI / 2, 0, 0]} material={materials.matTrim}>
            <torusGeometry args={[isHulkbuster ? 0.17 : 0.11, 0.016, 12, 24]} />
          </mesh>
        </group>
        <group position={[0, 0.08, -0.22]}>
          <mesh position={[-0.14, 0, 0]} material={materials.matTrim}>
            <boxGeometry args={[0.09, 0.2, 0.08]} />
          </mesh>
          <mesh position={[0.14, 0, 0]} material={materials.matTrim}>
            <boxGeometry args={[0.09, 0.2, 0.08]} />
          </mesh>
          {isNanotech && (
            <group position={[0, 0.1, -0.1]}>
              <mesh position={[-0.3, 0.2, 0]} rotation={[0, 0, 0.5]} material={materials.matSecondary}>
                <boxGeometry args={[0.06, 0.45, 0.03]} />
              </mesh>
              <mesh position={[0.3, 0.2, 0]} rotation={[0, 0, -0.5]} material={materials.matSecondary}>
                <boxGeometry args={[0.06, 0.45, 0.03]} />
              </mesh>
            </group>
          )}
        </group>
        <group position={[0, -0.32, 0]}>
          <mesh position={[0, 0.08, 0.04]} material={materials.matSecondary}>
            <boxGeometry args={[0.42, 0.1, 0.32]} />
          </mesh>
          <mesh position={[0, -0.04, 0.03]} material={materials.matDarkJoints}>
            <boxGeometry args={[0.38, 0.1, 0.3]} />
          </mesh>
          <mesh position={[0, -0.16, 0.02]} material={materials.matPrimary}>
            <boxGeometry args={[0.44, 0.12, 0.32]} />
          </mesh>
        </group>
      </group>

      {/* 04 // LEFT ARM */}
      <group ref={leftArmRef} position={[-0.52, 0.45, 0]}>
        <mesh material={materials.matPrimary} castShadow>
          <sphereGeometry args={[isHulkbuster ? 0.38 : 0.22, 16, 16]} />
        </mesh>
        <mesh position={[0, -0.22, 0]} material={materials.matSecondary}>
          <cylinderGeometry args={[0.1, 0.09, 0.24, 16]} />
        </mesh>
        <mesh position={[0, -0.38, 0]} material={materials.matDarkJoints}>
          <sphereGeometry args={[0.09, 12, 12]} />
        </mesh>
        <mesh position={[0, -0.56, 0]} material={materials.matPrimary} castShadow>
          <cylinderGeometry args={[0.11, 0.08, 0.28, 16]} />
        </mesh>
        <mesh position={[0, -0.74, 0.02]} rotation={[Math.PI / 2, 0, 0]} material={materials.matArc}>
          <cylinderGeometry args={[0.035, 0.035, 0.02, 16]} />
        </mesh>
      </group>

      {/* 05 // RIGHT ARM */}
      <group ref={rightArmRef} position={[0.52, 0.45, 0]}>
        <mesh material={materials.matPrimary} castShadow>
          <sphereGeometry args={[isHulkbuster ? 0.38 : 0.22, 16, 16]} />
        </mesh>
        <mesh position={[0, -0.22, 0]} material={materials.matSecondary}>
          <cylinderGeometry args={[0.1, 0.09, 0.24, 16]} />
        </mesh>
        <mesh position={[0, -0.38, 0]} material={materials.matDarkJoints}>
          <sphereGeometry args={[0.09, 12, 12]} />
        </mesh>
        <mesh position={[0, -0.56, 0]} material={materials.matPrimary} castShadow>
          <cylinderGeometry args={[0.11, 0.08, 0.28, 16]} />
        </mesh>
        <mesh position={[0, -0.74, 0.02]} rotation={[Math.PI / 2, 0, 0]} material={materials.matArc}>
          <cylinderGeometry args={[0.035, 0.035, 0.02, 16]} />
        </mesh>
      </group>

      {/* 06 // PELVIS / CODPIECE */}
      <mesh position={[0, -0.22, 0]} material={materials.matPrimary}>
        <boxGeometry args={[0.42, 0.16, 0.3]} />
      </mesh>

      {/* 07 // LEFT LEG */}
      <group ref={leftLegRef} position={[-0.22, -0.45, 0]}>
        <mesh position={[0, -0.18, 0]} material={materials.matSecondary} castShadow>
          <cylinderGeometry args={[0.13, 0.11, 0.36, 16]} />
        </mesh>
        <mesh position={[0, -0.38, 0.06]} material={materials.matTrim}>
          <boxGeometry args={[0.12, 0.12, 0.08]} />
        </mesh>
        <mesh position={[0, -0.62, 0]} material={materials.matPrimary} castShadow>
          <cylinderGeometry args={[0.12, 0.09, 0.38, 16]} />
        </mesh>
        <mesh position={[0, -0.85, 0.05]} material={materials.matPrimary}>
          <boxGeometry args={[0.14, 0.1, 0.24]} />
        </mesh>
        <mesh position={[0, -0.91, 0]} rotation={[Math.PI / 2, 0, 0]} material={materials.matArc}>
          <cylinderGeometry args={[0.04, 0.04, 0.02, 16]} />
        </mesh>
      </group>

      {/* 08 // RIGHT LEG */}
      <group ref={rightLegRef} position={[0.22, -0.45, 0]}>
        <mesh position={[0, -0.18, 0]} material={materials.matSecondary} castShadow>
          <cylinderGeometry args={[0.13, 0.11, 0.36, 16]} />
        </mesh>
        <mesh position={[0, -0.38, 0.06]} material={materials.matTrim}>
          <boxGeometry args={[0.12, 0.12, 0.08]} />
        </mesh>
        <mesh position={[0, -0.62, 0]} material={materials.matPrimary} castShadow>
          <cylinderGeometry args={[0.12, 0.09, 0.38, 16]} />
        </mesh>
        <mesh position={[0, -0.85, 0.05]} material={materials.matPrimary}>
          <boxGeometry args={[0.14, 0.1, 0.24]} />
        </mesh>
        <mesh position={[0, -0.91, 0]} rotation={[Math.PI / 2, 0, 0]} material={materials.matArc}>
          <cylinderGeometry args={[0.04, 0.04, 0.02, 16]} />
        </mesh>
      </group>
    </group>
  );
}

export default function ArmorModel(props: ArmorModelProps) {
  const { suit, isAssembling } = props;

  // Hulkbuster has its custom oversized armor chassis
  if (suit.isHulkbuster) {
    return <ProceduralArmorMesh {...props} />;
  }

  // Use dedicated model if specified (e.g. Mark III, Mark VII, Mark L, Mark LXXXV),
  // otherwise standardize to authentic iron_man.glb for all other suits
  const modelToUse = suit.modelPath || '/models/ironman/iron_man.glb';

  if (!isAssembling) {
    return (
      <Suspense fallback={<ProceduralArmorMesh {...props} />}>
        <GLBArmorMesh
          modelPath={modelToUse}
          isInspecting={props.isInspecting}
          isHulkbuster={false}
        />
      </Suspense>
    );
  }

  return <ProceduralArmorMesh {...props} />;
}
