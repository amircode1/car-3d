import React, { Suspense, useState, useCallback, memo, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { 
  OrbitControls, 
  Environment, 
  Stage, 
  PerspectiveCamera,
  Html
} from '@react-three/drei';
import * as THREE from 'three';
import { CarModel } from './CarModel';
import { CarInfo } from './CarInfo';
import { SceneControls } from './SceneControls';


const carModels = [
  {
    id: 'countach',
    name: 'لامبورگینی کانتاچ LPI 800-4 (2021)',
    path: '/src/assets/2021_lamborghini_countach_lpi_800-4/scene.gltf'
  },
  {
    id: 'nissan-z-proto',
    name: 'نیسان Z Proto',
    path: '/src/assets/nissan_z_proto/scene.gltf'
  },
  {
    id: 'rossa',
    name: 'فراری روسا',
    path: '/src/assets/rossa/scene.gltf'
  }
];

type EnvironmentType = 'city' | 'dawn' | 'night' | 'forest' | 'sunset';

// کامپوننت لودینگ
const Loader = () => (
  <Html center>
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
    }}>
      <div style={{
        width: '50px',
        height: '50px',
        border: '5px solid #333',
        borderTop: '5px solid #ffcc00',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginBottom: '10px'
      }} />
      <p style={{ fontWeight: 'bold' }}>در حال بارگذاری مدل...</p>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  </Html>
);

// کامپوننت صحنه ماشین با ممو برای جلوگیری از رندرینگ غیرضروری
const Scene = memo(({ 
  modelPath, 
  autoRotate, 
  environment, 
  backgroundColor,
  controlsRef
}: { 
  modelPath: string;
  autoRotate: boolean;
  environment: EnvironmentType;
  backgroundColor: string;
  controlsRef: React.RefObject<any>;
}) => {
  // استفاده از هوک غیرفعال‌سازی اسکرول روی کنواس
  
  useEffect(() => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;
    const preventScroll = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };
    const preventTouch = (e: TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };
    canvas.addEventListener('wheel', preventScroll, { passive: false });
    canvas.addEventListener('touchmove', preventTouch, { passive: false });
    // Prevent scroll on parent container as well
    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener('wheel', preventScroll, { passive: false });
      parent.addEventListener('touchmove', preventTouch, { passive: false });
    }
    return () => {
      canvas.removeEventListener('wheel', preventScroll);
      canvas.removeEventListener('touchmove', preventTouch);
      if (parent) {
        parent.removeEventListener('wheel', preventScroll);
        parent.removeEventListener('touchmove', preventTouch);
      }
    };
  }, []);
  
  // تابع برای اعمال به کنواس بعد از ایجاد
  const handleCreated = useCallback(({ gl }: { gl: THREE.WebGLRenderer }) => {
    // غیرفعال کردن اسکرول روی کنواس
    const canvas = gl.domElement;
    canvas.addEventListener('wheel', (e: WheelEvent) => e.preventDefault(), { passive: false });
  }, []);
  
  return (
    <Canvas shadows onCreated={handleCreated}>
      <PerspectiveCamera makeDefault position={[5, 2, 5]} fov={10} />
      <color attach="background" args={[backgroundColor]} />
      
      <Suspense fallback={<Loader />}>
        <Stage environment={environment} >
          <CarModel modelPath={modelPath} />
        </Stage>
        <Environment preset={environment} />
      </Suspense>
      
      <OrbitControls 
        ref={controlsRef}
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        autoRotate={autoRotate}
        autoRotateSpeed={1}
        enableDamping={true}
        dampingFactor={0.1}
        zoomSpeed={0.5}
        rotateSpeed={0.5}
        mouseButtons={{
          LEFT: THREE.MOUSE.ROTATE,
          MIDDLE: THREE.MOUSE.DOLLY,
          RIGHT: THREE.MOUSE.PAN
        }}
        touches={{
          ONE: THREE.TOUCH.ROTATE,
          TWO: THREE.TOUCH.DOLLY_PAN
        }}
      />
    </Canvas>
  );
});

Scene.displayName = 'Scene';

export function CarScene() {
  const [selectedCar, setSelectedCar] = useState(carModels[0]);
  const [autoRotate, setAutoRotate] = useState(false);
  const [environment, setEnvironment] = useState<EnvironmentType>('city');
  const [backgroundColor, setBackgroundColor] = useState('#111');
  const controlsRef = useRef<any>(null);
  
  // استفاده از useCallback برای جلوگیری از ایجاد مجدد توابع در هر رندر
  const handleRotateChange = useCallback((value: boolean) => {
    setAutoRotate(value);
  }, []);
  
  const handleEnvironmentChange = useCallback((value: string) => {
    setEnvironment(value as EnvironmentType);
  }, []);
  
  const handleColorChange = useCallback((value: string) => {
    setBackgroundColor(value);
  }, []);
  
  // تابع ریست کردن موقعیت دوربین
  const resetCamera = useCallback(() => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  }, []);
  
  return (
    <div className="car-viewer">
      <div className="car-scene-container" style={{ width: '100%', height: '100vh' }}>
        <div className="car-selector" style={{ 
          position: 'absolute', 
          top: '20px', 
          left: '20px', 
          zIndex: 10,
          background: 'rgba(0,0,0,0.7)',
          padding: '10px',
          borderRadius: '8px',
          color: 'white'
        }}>
          <h3>انتخاب مدل:</h3>
          {carModels.map(car => (
            <button 
              key={car.id}
              onClick={() => setSelectedCar(car)}
              style={{
                margin: '5px',
                padding: '8px 15px',
                background: selectedCar.id === car.id ? '#4a90e2' : '#333',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {car.name}
            </button>
          ))}
        </div>
        
        <div className="reset-camera" style={{ 
          position: 'absolute', 
          bottom: '20px', 
          right: '20px', 
          zIndex: 10
        }}>
          <button 
            onClick={resetCamera}
            style={{
              padding: '8px 15px',
              background: 'rgba(0,0,0,0.7)',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <span style={{ marginLeft: '5px' }}>تنظیم مجدد نما</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 20C9.79086 20 7.79086 19.1571 6.34315 17.7094C4.89543 16.2617 4.05259 14.2617 4.05259 12.0526C4.05259 9.84342 4.89543 7.84342 6.34315 6.39571C7.79086 4.94799 9.79086 4.10515 12 4.10515C14.2092 4.10515 16.2092 4.94799 17.6569 6.39571C19.1046 7.84342 19.9474 9.84342 19.9474 12.0526H22L18.5 16L15 12.0526H17.8C17.8 10.3993 17.1678 8.94478 16.0355 7.8124C14.9031 6.68003 13.4486 6.04789 11.7953 6.04789C10.142 6.04789 8.68745 6.68003 7.55508 7.8124C6.4227 8.94478 5.79056 10.3993 5.79056 12.0526C5.79056 13.7058 6.4227 15.1603 7.55508 16.2927C8.68745 17.4251 10.142 18.0572 11.7953 18.0572" stroke="white" strokeWidth="2"/>
            </svg>
          </button>
        </div>
        
        <Scene 
          modelPath={selectedCar.path}
          autoRotate={autoRotate}
          environment={environment}
          backgroundColor={backgroundColor}
          controlsRef={controlsRef}
        />
      </div>
      
      <div className="controls-and-info" style={{ 
        display: 'flex', 
        flexDirection: 'row', 
        flexWrap: 'wrap',
        gap: '20px',
        justifyContent: 'center',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        <div style={{ flex: 1, minWidth: '300px' }}>
          <SceneControls 
            onRotateChange={handleRotateChange}
            onEnvironmentChange={handleEnvironmentChange}
            onColorChange={handleColorChange}
          />
        </div>
        <div style={{ flex: 1, minWidth: '300px' }}>
          <CarInfo carId={selectedCar.id} />
        </div>
      </div>
    </div>
  );
} 