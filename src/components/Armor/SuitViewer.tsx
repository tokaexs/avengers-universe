import { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import ArmorModel from '../../three/armor/ArmorModel';
import ArmorLighting from '../../three/armor/ArmorLighting';
import ArmorParticles from '../../three/armor/ArmorParticles';
import type { IronManSuit, Hotspot } from '../../data/ironManSuits';

interface CameraRigProps {
  isInspecting: boolean;
  isHulkbuster: boolean;
  selectedHotspot: Hotspot | null;
}

function DynamicArmorCamera({ isInspecting, isHulkbuster, selectedHotspot }: CameraRigProps) {
  const targetPosRef = useRef(new THREE.Vector3(0, 0, isHulkbuster ? 6.2 : 4.4));
  const targetLookAtRef = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    if (isInspecting && selectedHotspot) {
      const [fx, fy, fz] = selectedHotspot.focusPosition;
      targetLookAtRef.current.set(fx, fy, fz);
      targetPosRef.current.set(fx, fy + 0.1, selectedHotspot.cameraDistance);
    } else if (isInspecting) {
      targetLookAtRef.current.set(0, 0.3, 0);
      targetPosRef.current.set(0, 0.3, isHulkbuster ? 4.2 : 2.5);
    } else {
      targetLookAtRef.current.set(0, 0, 0);
      targetPosRef.current.set(0, 0, isHulkbuster ? 6.2 : 4.4);
    }
  }, [isInspecting, isHulkbuster, selectedHotspot]);

  useFrame((state) => {
    state.camera.position.lerp(targetPosRef.current, 0.06);
    state.camera.lookAt(targetLookAtRef.current);
  });

  return null;
}

// Ground Pedestal Ring & Lab Grid
function ArmoryPedestal({ accentColor, isHulkbuster }: { accentColor: string; isHulkbuster: boolean }) {
  const radius = isHulkbuster ? 2.2 : 1.4;
  return (
    <group position={[0, -1.5, 0]}>
      {/* Outer Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius - 0.05, radius, 48]} />
        <meshBasicMaterial color={accentColor} transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>
      {/* Inner Glowing Core */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <circleGeometry args={[radius - 0.1, 48]} />
        <meshStandardMaterial color="#050811" roughness={0.6} metalness={0.9} />
      </mesh>
      {/* Subtle Grid Plane */}
      <gridHelper args={[12, 24, '#1e293b', '#0f172a']} position={[0, -0.02, 0]} />
    </group>
  );
}

interface SuitViewerProps {
  suit: IronManSuit;
  isInspecting: boolean;
  isAssembling: boolean;
  selectedHotspot: Hotspot | null;
}

export default function SuitViewer({
  suit,
  isInspecting,
  isAssembling,
  selectedHotspot,
}: SuitViewerProps) {
  const [assemblyProgress, setAssemblyProgress] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Trigger cinematic transition on suit change
  useEffect(() => {
    setIsTransitioning(true);
    setAssemblyProgress(0.2);

    const timer = setTimeout(() => {
      setAssemblyProgress(1);
      setIsTransitioning(false);
    }, 450);

    return () => clearTimeout(timer);
  }, [suit.id]);

  // Assembly mode toggle animation
  useEffect(() => {
    if (isAssembling) {
      setAssemblyProgress(0);
      const t = setTimeout(() => setAssemblyProgress(0.6), 150);
      return () => clearTimeout(t);
    } else {
      setAssemblyProgress(1);
    }
  }, [isAssembling]);

  return (
    <div className={`suit-viewer-canvas-stage ${isTransitioning ? 'suit-stage-transitioning' : ''}`}>
      <Canvas
        camera={{ position: [0, 0, suit.isHulkbuster ? 6.2 : 4.4], fov: 42 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <DynamicArmorCamera
            isInspecting={isInspecting}
            isHulkbuster={!!suit.isHulkbuster}
            selectedHotspot={selectedHotspot}
          />

          <ArmorLighting suit={suit} isInspecting={isInspecting} />
          <ArmorParticles accentColor={suit.colorPalette.arcGlow} isAssembling={isAssembling || isTransitioning} />

          <ArmorModel
            suit={suit}
            isInspecting={isInspecting}
            isAssembling={isAssembling || isTransitioning}
            assemblyProgress={assemblyProgress}
          />

          <ArmoryPedestal
            accentColor={suit.colorPalette.arcGlow}
            isHulkbuster={!!suit.isHulkbuster}
          />

          <OrbitControls
            enableZoom={isInspecting}
            minDistance={1.8}
            maxDistance={8.0}
            enablePan={false}
            maxPolarAngle={Math.PI / 2 + 0.15}
            minPolarAngle={Math.PI / 4}
            dampingFactor={0.05}
          />
        </Suspense>
      </Canvas>

      {/* Reticle Overlay Brackets */}
      <div className="viewer-reticle-brackets" pointer-events="none">
        <span className="v-bracket tl" />
        <span className="v-bracket tr" />
        <span className="v-bracket bl" />
        <span className="v-bracket br" />
      </div>
    </div>
  );
}
