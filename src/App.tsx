import { CarScene } from './components/CarScene';
import './App.css';

function App() {
  return (
    <>
      <div className="app-container" style={{ textAlign: 'center', direction: 'rtl' }}>
        <header style={{ padding: '20px 0', background: '#000', color: 'white' }}>
          <h1>نمایشگاه ماشین‌های لامبورگینی سه‌بعدی</h1>
          <p>مدل سه‌بعدی ماشین‌های لامبورگینی را مشاهده و بررسی کنید</p>
        </header>
        
        <main>
          <CarScene />
        </main>
        
        <footer style={{ padding: '20px', background: '#111', color: '#aaa', marginTop: '20px' }}>
          <p>نمایشگاه مجازی ماشین‌های لامبورگینی | از مدل‌های GLTF استفاده شده است</p>
        </footer>
      </div>     
    </>
  )
}

export default App
