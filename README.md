# Car 3D Viewer

یک پروژه مدرن React + Vite برای نمایش تعاملی مدل‌های سه‌بعدی خودرو با استفاده از Three.js و @react-three/fiber.

## ویژگی‌ها
- نمایش سه مدل سه‌بعدی خودرو (لامبورگینی کانتاچ، نیسان Z Proto، فراری روسا)
- انتخاب مدل دلخواه و مشاهده اطلاعات فنی و توضیحات هر خودرو
- کنترل زاویه دید، چرخش خودکار، تغییر محیط نوری و رنگ پس‌زمینه
- رابط کاربری فارسی، مدرن و سازگار با موبایل
- جلوگیری از اختلال اسکرول صفحه روی مدل سه‌بعدی

## ساختار پروژه
```
car-3d/
├── public/
│   └── assets/
│       └── ... (فایل‌های مدل سه‌بعدی gltf, bin, textures)
├── src/
│   ├── components/
│   │   ├── CarScene.tsx
│   │   ├── CarModel.tsx
│   │   ├── CarInfo.tsx
│   │   └── SceneControls.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── vite.config.ts
└── ...
```

## راه‌اندازی و اجرا

1. نصب وابستگی‌ها:
   ```bash
   npm install
   ```
2. اجرای پروژه در حالت توسعه:
   ```bash
   npm run dev
   ```
3. ساخت نسخه production:
   ```bash
   npm run build
   ```
4. مشاهده نسخه build شده:
   ```bash
   npm run preview
   ```

## نکات مهم دیپلوی
- همه فایل‌های مدل و تکسچر باید در مسیر `public/assets` قرار بگیرند تا در هاست مانند Netlify بدون ارور 404 بارگذاری شوند.
- مسیر مدل‌ها در کد باید با `/assets/...` شروع شود.

## تکنولوژی‌ها
- React + Vite
- TypeScript
- Three.js, @react-three/fiber, @react-three/drei
- CSS مدرن و فونت فارسی Vazirmatn

## توسعه‌دهنده
- [نام شما]

---

### اگر سوال یا مشکلی داشتید، issue ثبت کنید یا پیام دهید!
