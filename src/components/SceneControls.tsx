import { useState } from 'react';

interface SceneControlsProps {
  onRotateChange: (value: boolean) => void;
  onEnvironmentChange: (value: string) => void;
  onColorChange: (value: string) => void;
}

const environments = [
  { id: 'city', name: 'شهر' },
  { id: 'dawn', name: 'سپیده‌دم' },
  { id: 'night', name: 'شب' },
  { id: 'forest', name: 'جنگل' },
  { id: 'sunset', name: 'غروب' },
];

export function SceneControls({ 
  onRotateChange, 
  onEnvironmentChange,
  onColorChange
}: SceneControlsProps) {
  const [autoRotate, setAutoRotate] = useState(false);
  const [selectedEnv, setSelectedEnv] = useState('city');
  
  const toggleAutoRotate = () => {
    const newValue = !autoRotate;
    setAutoRotate(newValue);
    onRotateChange(newValue);
  };
  
  const changeEnvironment = (envId: string) => {
    setSelectedEnv(envId);
    onEnvironmentChange(envId);
  };
  
  return (
    <div className="scene-controls" style={{
      background: 'rgba(0,0,0,0.7)',
      padding: '15px',
      borderRadius: '8px',
      marginTop: '20px',
    }}>
      <h3 style={{ marginBottom: '15px', color: '#ffcc00', textAlign: 'right' }}>تنظیمات نمایش</h3>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <label style={{ color: 'white', fontWeight: 'bold', textAlign: 'right', flex: 1 }}>
          چرخش خودکار:
        </label>
        <div style={{ flex: 1, textAlign: 'left' }}>
          <button 
            onClick={toggleAutoRotate}
            style={{
              padding: '8px 15px',
              background: autoRotate ? '#4a90e2' : '#333',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {autoRotate ? 'فعال' : 'غیرفعال'}
          </button>
        </div>
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', color: 'white', fontWeight: 'bold', textAlign: 'right', marginBottom: '10px' }}>
          محیط:
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', justifyContent: 'flex-end' }}>
          {environments.map(env => (
            <button 
              key={env.id}
              onClick={() => changeEnvironment(env.id)}
              style={{
                padding: '5px 10px',
                background: selectedEnv === env.id ? '#4a90e2' : '#333',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {env.name}
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <label style={{ display: 'block', color: 'white', fontWeight: 'bold', textAlign: 'right', marginBottom: '10px' }}>
          رنگ پس‌زمینه:
        </label>
        <div style={{ display: 'flex', gap: '5px', justifyContent: 'flex-end' }}>
          {['#111', '#2d3436', '#0a3d62', '#6a0572', '#2c3e50'].map(color => (
            <button 
              key={color}
              onClick={() => onColorChange(color)}
              style={{
                width: '30px',
                height: '30px',
                background: color,
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 