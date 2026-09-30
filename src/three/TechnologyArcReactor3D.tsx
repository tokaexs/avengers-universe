import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

useGLTF.preload('/models/ironman/arc_reactor.glb');

interface TechnologyArcReactor3DProps {
  isOverclocked?: boolean;
}

export default function TechnologyArcReactor3D({
  isOverclocked = false,
}: TechnologyArcReactor3DProps) {
  const { scene } = useGLTF('/models/ironman/arc_reactor.glb');
  const groupRef = useRef<THREE.Group>(null);
  const plasmaLightRef = useRef<THREE.PointLight>(null);

  const { clonedScene, normalizedScale } = useMemo(() => {
    const clone = scene.clone(true);
    clone.updateMatrixWorld(true);

    const box = new THREE.Box3();
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const name = (mesh.name || '').toLowerCase();
        
        // Hide the giant export cube container
        if (name.includes('cube')) {
          mesh.visible = false;
          return;
        }

        mesh.visible = true;
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
    const center = new THREE.Vector3();
    box.getCenter(center);

    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const targetSize = 2.4;
    const scale = targetSize / maxDim;

    // Center the authentic Arc Reactor components cleanly
    clone.position.set(-center.x * scale, -center.y * scale, -center.z * scale);

    return { clonedScene: clone, normalizedScale: scale };
  }, [scene]);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const speedMult = isOverclocked ? 3.5 : 1.0;

    if (groupRef.current) {
      groupRef.current.rotation.z += delta * 0.45 * speedMult;
      groupRef.current.rotation.y = Math.sin(t * 0.6) * 0.2;
      groupRef.current.rotation.x = Math.cos(t * 0.4) * 0.15;
    }

    if (plasmaLightRef.current) {
      plasmaLightRef.current.intensity = (isOverclocked ? 12 : 6) + Math.sin(t * 5.0) * 2.5;
    }
  });

  return (
    <group ref={groupRef} scale={1.15}>
      <primitive object={clonedScene} scale={[normalizedScale, normalizedScale, normalizedScale]} />

      {/* Central Plasma Core Illumination */}
      <pointLight
        ref={plasmaLightRef}
        position={[0, 0, 0.4]}
        color="#00e5ff"
        intensity={6}
        distance={8}
      />

      {/* Backlight Cyan Glow */}
      <pointLight position={[0, 0, -0.6]} color="#0088ff" intensity={4} distance={6} />
    </group>
  );
}
