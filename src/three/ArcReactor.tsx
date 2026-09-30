import { useRef, useMemo, type RefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import EnergyCore from './EnergyCore';

interface ArcReactorProps {
  scrollRef?: RefObject<number>;
  powerLevel?: number;
}

export default function ArcReactor({
  scrollRef,
  powerLevel = 1,
}: ArcReactorProps) {
  const outerRingRef = useRef<THREE.Group>(null);
  const midRingRef = useRef<THREE.Group>(null);
  const innerRingRef = useRef<THREE.Group>(null);
  const gearsRef = useRef<THREE.Group>(null);
  const coilGroupRef = useRef<THREE.Group>(null);

  // Solenoid Copper Induction Coils (10 around the perimeter)
  const coilData = useMemo(() => {
    const coils = [];
    const count = 10;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 0.88;
      coils.push({
        position: [Math.cos(angle) * radius, Math.sin(angle) * radius, 0] as [number, number, number],
        rotation: [0, 0, angle + Math.PI / 2] as [number, number, number],
      });
    }
    return coils;
  }, []);

  // 6 Iris Aperture Titanium Struts
  const strutData = useMemo(() => {
    const struts = [];
    const count = 6;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 0.58;
      struts.push({
        position: [Math.cos(angle) * radius, Math.sin(angle) * radius, 0.04] as [number, number, number],
        rotation: [0, 0, angle] as [number, number, number],
      });
    }
    return struts;
  }, []);

  // Frame update: Continuous mechanical motion & acceleration on scroll
  useFrame((_, delta) => {
    const p = scrollRef?.current ?? 0;
    const speedMult = (1 + p * 3.5) * powerLevel;

    // Counter-rotating concentric mechanical tiers
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z += delta * 0.25 * speedMult;
    }

    if (midRingRef.current) {
      midRingRef.current.rotation.z -= delta * 0.45 * speedMult;
    }

    if (innerRingRef.current) {
      innerRingRef.current.rotation.z += delta * 0.85 * speedMult;
    }

    if (gearsRef.current) {
      gearsRef.current.rotation.z -= delta * 0.65 * speedMult;
    }
  });

  return (
    <group>
      {/* =========================================
          TIER 1: OUTER TITANIUM CHASSIS RING
      ========================================= */}
      <group ref={outerRingRef}>
        {/* Outer Heavy Bevel Ring */}
        <mesh>
          <torusGeometry args={[1.08, 0.055, 24, 64]} />
          <meshStandardMaterial
            color="#222830"
            metalness={0.92}
            roughness={0.22}
          />
        </mesh>

        {/* Outer Fine Specular Rim */}
        <mesh position={[0, 0, 0.02]}>
          <torusGeometry args={[1.14, 0.012, 16, 64]} />
          <meshStandardMaterial
            color="#d8e4f0"
            metalness={0.98}
            roughness={0.15}
          />
        </mesh>

        {/* 10 Copper Electromagnetic Induction Coils */}
        <group ref={coilGroupRef}>
          {coilData.map((c, i) => (
            <group key={i} position={c.position} rotation={c.rotation}>
              {/* Coil Core Block */}
              <mesh>
                <boxGeometry args={[0.16, 0.08, 0.12]} />
                <meshStandardMaterial
                  color="#151b22"
                  metalness={0.88}
                  roughness={0.3}
                />
              </mesh>
              {/* Copper Winding Solenoid */}
              <mesh position={[0, 0, 0.02]}>
                <cylinderGeometry args={[0.042, 0.042, 0.14, 16]} />
                <meshStandardMaterial
                  color="#cc6633"
                  metalness={0.95}
                  roughness={0.25}
                />
              </mesh>
              {/* Solenoid Cyan Emissive Micro-Arc */}
              <mesh position={[0, 0, 0.07]}>
                <boxGeometry args={[0.08, 0.015, 0.02]} />
                <meshBasicMaterial
                  color="#00e5ff"
                  transparent
                  opacity={0.85 * powerLevel}
                />
              </mesh>
            </group>
          ))}
        </group>
      </group>

      {/* =========================================
          TIER 2: PALLADIUM INTERMEDIATE GEAR RING
      ========================================= */}
      <group ref={midRingRef}>
        {/* Secondary Structural Ring */}
        <mesh>
          <torusGeometry args={[0.78, 0.038, 20, 64]} />
          <meshStandardMaterial
            color="#3a4450"
            metalness={0.94}
            roughness={0.18}
          />
        </mesh>

        {/* Cyan Internal Light Guide Ring */}
        <mesh position={[0, 0, 0.015]}>
          <torusGeometry args={[0.72, 0.014, 16, 64]} />
          <meshBasicMaterial
            color="#00e5ff"
            transparent
            opacity={0.7 * powerLevel}
          />
        </mesh>
      </group>

      {/* =========================================
          TIER 3: INNER IRIS APERTURE STRUTS
      ========================================= */}
      <group ref={innerRingRef}>
        {/* Inner Titanium Collar */}
        <mesh>
          <torusGeometry args={[0.52, 0.032, 20, 64]} />
          <meshStandardMaterial
            color="#182028"
            metalness={0.95}
            roughness={0.2}
          />
        </mesh>

        {/* 6 Iris Struts */}
        {strutData.map((s, i) => (
          <mesh key={i} position={s.position} rotation={s.rotation}>
            <boxGeometry args={[0.18, 0.024, 0.04]} />
            <meshStandardMaterial
              color="#e0e8f0"
              metalness={0.96}
              roughness={0.12}
            />
          </mesh>
        ))}
      </group>

      {/* =========================================
          CENTRAL UNIBEAM PLASMA ENERGY CORE
      ========================================= */}
      <EnergyCore powerLevel={powerLevel} />
    </group>
  );
}