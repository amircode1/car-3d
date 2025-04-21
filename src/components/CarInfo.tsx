import { useState } from 'react';

interface CarInfoProps {
  carId: string;
}

interface CarData {
  [key: string]: {
    specs: {
      [key: string]: string;
    };
    description: string;
  };
}

// اطلاعات ماشین‌ها
const carData: CarData = {
  'countach': {
    specs: {
      'موتور': 'V12، 6.5 لیتری هیبریدی',
      'حداکثر قدرت': '814 اسب بخار',
      'گیربکس': '7 سرعته اتوماتیک',
      'شتاب 0 تا 100': '2.8 ثانیه',
      'حداکثر سرعت': '355 کیلومتر بر ساعت',
      'وزن': '1595 کیلوگرم'
    },
    description: 'لامبورگینی کانتاچ LPI 800-4 (2021) ادای احترام به مدل افسانه‌ای کانتاچ دهه ۷۰ است که با تکنولوژی مدرن و پیشرانه هیبریدی، عملکردی خیره‌کننده ارائه می‌دهد.'
  },
  'nissan-z-proto': {
    specs: {
      'موتور': 'V6 توئین توربو 3.0 لیتری',
      'حداکثر قدرت': '400 اسب بخار',
      'گیربکس': '6 سرعته دستی یا 9 سرعته اتوماتیک',
      'شتاب 0 تا 100': 'حدود 4.5 ثانیه',
      'حداکثر سرعت': '250 کیلومتر بر ساعت (تخمینی)',
      'وزن': 'حدود 1550 کیلوگرم'
    },
    description: 'نیسان Z Proto پیش‌نمایش نسل جدید سری Z است که با الهام از مدل‌های کلاسیک و طراحی مدرن، تجربه رانندگی اسپرت و هیجان‌انگیزی ارائه می‌دهد.'
  },
  'rossa': {
    specs: {
      'موتور': 'V12 تنفس طبیعی',
      'حداکثر قدرت': '540 اسب بخار',
      'گیربکس': '6 سرعته دستی',
      'شتاب 0 تا 100': '4.1 ثانیه',
      'حداکثر سرعت': '320 کیلومتر بر ساعت',
      'وزن': '1300 کیلوگرم'
    },
    description: 'فراری روسا یک کانسپت اسپرت ایتالیایی است که با طراحی منحصر به فرد و عملکرد بالای خود، نمایانگر هنر مهندسی فراری است.'
  },
  'veneno-roadster': {
    specs: {
      'موتور': 'V12',
      'حداکثر قدرت': '750 اسب بخار',
      'شتاب 0 تا 100': '2.9 ثانیه',
      'حداکثر سرعت': '355 کیلومتر بر ساعت',
      'وزن': '1490 کیلوگرم'
    },
    description: 'لامبورگینی ونه‌نو رودستر نسخه روباز ونه‌نو است که در سال 2014 معرفی شد. تنها 9 دستگاه از این خودرو تولید شده و هر یک با قیمتی حدود 4.5 میلیون دلار به فروش رسیده‌اند. این خودرو یکی از گران‌ترین و انحصاری‌ترین محصولات لامبورگینی به شمار می‌رود.'
  }
};

export function CarInfo({ carId }: CarInfoProps) {
  const [showSpecs, setShowSpecs] = useState(true);
  
  if (!carData[carId]) {
    return <div>اطلاعات در دسترس نیست</div>;
  }
  
  const { specs, description } = carData[carId];
  
  return (
    <div className="car-info" style={{
      background: 'rgba(0,0,0,0.8)',
      padding: '20px',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '400px',
      margin: '20px auto',
      textAlign: 'right'
    }}>
      <div className="tabs" style={{ display: 'flex', marginBottom: '15px' }}>
        <button 
          onClick={() => setShowSpecs(true)}
          style={{
            flex: 1,
            padding: '10px',
            background: showSpecs ? '#ffcc00' : '#333',
            color: showSpecs ? '#000' : '#fff',
            border: 'none',
            borderTopLeftRadius: '4px',
            borderBottomLeftRadius: '4px',
            cursor: 'pointer'
          }}
        >
          مشخصات فنی
        </button>
        <button 
          onClick={() => setShowSpecs(false)}
          style={{
            flex: 1,
            padding: '10px',
            background: !showSpecs ? '#ffcc00' : '#333',
            color: !showSpecs ? '#000' : '#fff',
            border: 'none',
            borderTopRightRadius: '4px',
            borderBottomRightRadius: '4px',
            cursor: 'pointer'
          }}
        >
          توضیحات
        </button>
      </div>
      
      {showSpecs ? (
        <div className="specs">
          <h3 style={{ marginBottom: '15px', color: '#ffcc00' }}>مشخصات فنی</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              {Object.entries(specs).map(([key, value]) => (
                <tr key={key} style={{ borderBottom: '1px solid #333' }}>
                  <td style={{ padding: '8px', fontWeight: 'bold' }}>{key}</td>
                  <td style={{ padding: '8px' }}>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="description">
          <h3 style={{ marginBottom: '15px', color: '#ffcc00' }}>درباره خودرو</h3>
          <p style={{ lineHeight: '1.6' }}>{description}</p>
        </div>
      )}
    </div>
  );
} 