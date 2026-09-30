import { useMemo, useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticlesProps {
  scrollRef?: RefObject<number>;
  powerLevel?: number;
}

export default function Particles({ scrollRef, powerLevel = 1 }: ParticlesProps) {
  // Layer 1: Subtle Deep Background Starfield (tiny, faint)
  const bgCount = 500;
  const bgPointsRef = useRef<THREE.Points>(null);
  const bgData = useMemo(() => {
    const pos = new Float32Array(bgCount * 3);
    for (let i = 0; i < bgCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 2] = -4 - Math.random() * 8; // deep in background
    }
    return pos;
  }, []);

  // Layer 2: Midground Arc Reactor Motes (cyan/ember sparks)
  const midCount = 280;
  const midPointsRef = useRef<THREE.Points>(null);
  const midData = useMemo(() => {
    const pos = new Float32Array(midCount * 3);
    const orig = new Float32Array(midCount * 3);
    const speeds = new Float32Array(midCount);
    for (let i = 0; i < midCount; i++) {
      const x = (Math.random() - 0.5) * 12;
      const y = (Math.random() - 0.5) * 12;
      const z = (Math.random() - 0.5) * 6 - 1;
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      orig[i * 3] = x;
      orig[i * 3 + 1] = y;
      orig[i * 3 + 2] = z;
      speeds[i] = 0.4 + Math.random() * 0.8;
    }
    return { pos, orig, speeds };
  }, []);

  // Layer 3: Foreground Cinematic Floating Dust (close to camera, soft)
  const fgCount = 45;
  const fgPointsRef = useRef<THREE.Points>(null);
  const fgData = useMemo(() => {
    const pos = new Float32Array(fgCount * 3);
    const orig = new Float32Array(fgCount * 3);
    for (let i = 0; i < fgCount; i++) {
      const x = (Math.random() - 0.5) * 7;
      const y = (Math.random() - 0.5) * 7;
      const z = 1.2 + Math.random() * 2.2; // close to camera
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      orig[i * 3] = x;
      orig[i * 3 + 1] = y;
      orig[i * 3 + 2] = z;
    }
    return { pos, orig };
  }, []);

  useFrame((state, delta) => {
    const progress = scrollRef?.current ?? 0;
    const t = state.clock.getElapsedTime();
    const ptrX = state.pointer.x * 0.25;
    const ptrY = state.pointer.y * 0.25;

    // 1. Background layer rotation & slight mouse parallax
    if (bgPointsRef.current) {
      bgPointsRef.current.rotation.y = t * 0.01 + ptrX * 0.1;
      bgPointsRef.current.rotation.x = -ptrY * 0.1;
    }

    // 2. Midground particles: floating + forward drift accelerating on scroll
    if (midPointsRef.current) {
      const attr = midPointsRef.current.geometry.attributes.position;
      const arr = attr.array as Float32Array;
      const speedMultiplier = 1 + progress * 4;

      for (let i = 0; i < midCount; i++) {
        const idx = i * 3;
        arr[idx] = midData.orig[idx] + Math.sin(t * 0.4 + i) * 0.2 + ptrX * 0.5;
        arr[idx + 1] = midData.orig[idx + 1] + Math.cos(t * 0.3 + i) * 0.2 + ptrY * 0.5;
        
        arr[idx + 2] += delta * midData.speeds[i] * 0.35 * speedMultiplier;
        if (arr[idx + 2] > 3.5) {
          arr[idx + 2] = -5;
        }
      }
      attr.needsUpdate = true;
      midPointsRef.current.rotation.z = t * 0.02;
    }

    // 3. Foreground particles: gentle cinematic floating
    if (fgPointsRef.current) {
      const attr = fgPointsRef.current.geometry.attributes.position;
      const arr = attr.array as Float32Array;
      for (let i = 0; i < fgCount; i++) {
        const idx = i * 3;
        arr[idx] = fgData.orig[idx] + Math.sin(t * 0.25 + i * 2) * 0.3 + ptrX * 0.8;
        arr[idx + 1] = fgData.orig[idx + 1] + Math.cos(t * 0.2 + i * 2) * 0.3 + ptrY * 0.8;
      }
      attr.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Background Starfield */}
      <points ref={bgPointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[bgData, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.016}
          color="#a3c4d8"
          transparent
          opacity={0.3}
          depthWrite={false}
          sizeAttenuation
        />
      </points>

      {/* Midground Energy Sparks */}
      <points ref={midPointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[midData.pos, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.024}
          color="#00e5ff"
          transparent
          opacity={0.65 * powerLevel}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>

      {/* Foreground Cinematic Floating Dust */}
      <points ref={fgPointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[fgData.pos, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          color="#d5f4ff"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>
    </group>
  );
}