import { useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface CarModelProps {
  modelPath: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

const MODEL_CONFIGS: Record<string, { scale: number; position: [number, number, number] }> = {
  '/assets/2021_lamborghini_countach_lpi_800-4/scene.gltf': { scale: 0.1, position: [0, -1, 0] },
  '/assets/nissan_z_proto/scene.gltf': { scale: 0.14, position: [0, -1, 0] },
  '/assets/rossa/scene.gltf': { scale: 0.13, position: [0, -1, 0] },
};

export function CarModel({ modelPath, rotation = [0, Math.PI / 4, 0] }: CarModelProps) {
  const { scene } = useGLTF(modelPath);
  const { camera } = useThree();
  const modelRef = useRef<THREE.Object3D>(null);

  const config = MODEL_CONFIGS[modelPath] || { scale: 0, position: [0, -1, 0] };

  useEffect(() => {
    // حذف کامل انیمیشن‌های مدل
    if (scene?.animations?.length) scene.animations.length = 0;

    // تنظیم دوربین
    camera.position.set(5, 2, 5);
    camera.lookAt(0, 0, 0);

    // تنظیم سایه‌ها و پوز اسکلت
    scene.traverse(child => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
      if (child instanceof THREE.SkinnedMesh && child.skeleton) {
        child.skeleton.pose();
      }
    });

    // تنظیم موقعیت و مقیاس مدل
    if (modelRef.current) {
      modelRef.current.scale.set(config.scale, config.scale, config.scale);
      modelRef.current.position.set(...config.position);
    }
  }, [scene, camera, modelPath, config]);

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={config.scale}
      position={new THREE.Vector3(...config.position)}
      rotation={new THREE.Euler(...rotation)}
    />
  );
}

// Pre-load models to improve performance
useGLTF.preload('/assets/2021_lamborghini_countach_lpi_800-4/scene.gltf');
useGLTF.preload('/assets/nissan_z_proto/scene.gltf');
useGLTF.preload('/assets/rossa/scene.gltf');