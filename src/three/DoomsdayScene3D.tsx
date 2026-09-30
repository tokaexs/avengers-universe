import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function DoomsdayScene3D() {
  const debrisGroupRef = useRef<THREE.Group>(null);
  const doomCoreRef = useRef<THREE.Mesh>(null);

  const debris = useMemo(() => {
    return Array.from({ length: 40 }, () => ({
      position: [
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8 - 1,
      ] as [number, number, number],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      ] as [number, number, number],
      scale: Math.random() * 0.35 + 0.1,
    }));
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const ptrX = state.pointer.x * 0.4;
    const ptrY = state.pointer.y * 0.3;

    if (debrisGroupRef.current) {
      debrisGroupRef.current.rotation.y = t * 0.05 + ptrX;
      debrisGroupRef.current.rotation.x = -ptrY;
    }

    if (doomCoreRef.current) {
      doomCoreRef.current.rotation.y += delta * 0.2;
      doomCoreRef.current.rotation.z = Math.sin(t * 0.5) * 0.2;
    }
  });

  return (
    <group>
      {/* Central Ominous Monolith / Doom Crest Core */}
      <mesh ref={doomCoreRef} position={[0, 0, -1]}>
        <octahedronGeometry args={[1.5, 0]} />
        <meshStandardMaterial
          color="#120508"
          roughness={0.4}
          metalness={0.9}
          wireframe
        />
      </mesh>

      {/* Floating Metallic Debris Field */}
      <group ref={debrisGroupRef}>
        {debris.map((d, i) => (
          <mesh key={i} position={d.position} rotation={d.rotation} scale={d.scale}>
            <dodecahedronGeometry args={[0.5, 0]} />
            <meshStandardMaterial color="#1f1118" metalness={0.9} roughness={0.3} />
          </mesh>
        ))}
      </group>

      {/* Dramatic Backlight & Crimson Energy Flare */}
      <pointLight position={[0, 1, -2]} color="#ff1133" intensity={8} distance={12} />
      <pointLight position={[2, -2, 2]} color="#660022" intensity={4} distance={10} />
      <directionalLight position={[0, 5, 5]} color="#ffffff" intensity={0.4} />
    </group>
  );
}
