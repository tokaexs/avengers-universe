import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

useGLTF.preload('/models/ironman/iron_man_helmet.glb');

export default function IronManHelmet3D() {
  const { scene } = useGLTF('/models/ironman/iron_man_helmet.glb');
  const groupRef = useRef<THREE.Group>(null);
  const eyeLightRef = useRef<THREE.PointLight>(null);

  const { clonedScene, normalizedScale } = useMemo(() => {
    const clone = scene.clone(true);
    clone.updateMatrixWorld(true);

    const box = new THREE.Box3();
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const name = (mesh.name || '').toLowerCase();
        
        // Hide Blender studio backdrop, spot rigs, and ground planes
        if (
          name.includes('spot') ||
          name.includes('plane') ||
          name.includes('circle') ||
          name.includes('cube') ||
          name.includes('light') ||
          name.includes('sun') ||
          name.includes('camera') ||
          name.includes('concrete')
        ) {
          mesh.visible = false;
          return;
        }

        mesh.visible = true;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        if (mesh.material) {
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((m) => {
              m.side = THREE.FrontSide;
              m.needsUpdate = true;
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

    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const targetSize = 2.1;
    const scale = targetSize / maxDim;

    // Center helmet around origin
    clone.position.set(-center.x * scale, -center.y * scale, -center.z * scale);

    return { clonedScene: clone, normalizedScale: scale };
  }, [scene]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const ptrX = state.pointer.x * 0.35;
    const ptrY = state.pointer.y * 0.25;

    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.6) * 0.25 + ptrX;
      groupRef.current.rotation.x = Math.cos(t * 0.4) * 0.1 - ptrY;
      groupRef.current.position.y = Math.sin(t * 1.4) * 0.04;
    }

    if (eyeLightRef.current) {
      eyeLightRef.current.intensity = 3.5 + Math.sin(t * 3.5) * 1.0;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <primitive object={clonedScene} scale={[normalizedScale, normalizedScale, normalizedScale]} />

      {/* Glowing Ocular Light Beam */}
      <pointLight
        ref={eyeLightRef}
        position={[0, 0.1, 1.2]}
        color="#00e5ff"
        intensity={4}
        distance={5}
      />

      {/* Gold & Red Rim Highlights */}
      <pointLight position={[-2, 1.5, -1]} color="#ffd700" intensity={3} distance={6} />
      <pointLight position={[2, 0.5, 1.5]} color="#ff2233" intensity={2.5} distance={6} />
    </group>
  );
}
