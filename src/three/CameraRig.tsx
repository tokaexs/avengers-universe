import { useRef, type RefObject } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface CameraRigProps {
  scrollRef: RefObject<number>;
  isMobile?: boolean;
}

export default function CameraRig({ scrollRef, isMobile = false }: CameraRigProps) {
  const { camera } = useThree();
  const targetCamPos = useRef(new THREE.Vector3(0, 0, 4.5));
  const targetCamLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state) => {
    const p = scrollRef.current ?? 0;
    const ptrX = isMobile ? 0 : state.pointer.x * 0.35;
    const ptrY = isMobile ? 0 : state.pointer.y * 0.25;

    // Cinematic Camera Scroll Choreography:
    // 0% -> Camera: wide [0, 0.2, 4.8], FOV 40
    // 25% -> Camera pushes closer [0, 0.1, 3.6], object rotates
    // 50% -> Camera enters close range [0, 0.0, 2.4]
    // 75% -> Camera approaches the energy core [0, 0.0, 1.3]
    // 100% -> Camera passes through the core [0, 0.0, 0.2]

    const targetZ = 4.8 - p * 4.4;
    const targetY = 0.2 - p * 0.2;
    const targetX = ptrX * (1 - p * 0.6);

    targetCamPos.current.set(targetX, targetY + ptrY * (1 - p * 0.6), targetZ);

    camera.position.lerp(targetCamPos.current, 0.08);

    // LookAt follows core with subtle tilt
    targetCamLookAt.current.set(ptrX * 0.1, ptrY * 0.1, 0);
    camera.lookAt(targetCamLookAt.current);
  });

  return null;
}
