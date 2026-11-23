# Weather Clock App

تطبيق Node.js بيعرض الوقت والتاريخ والطقس مع خلفية متحركة (نجوم، قمر، سحاب، مطر...).

## التشغيل
```
npm start
```
وبعدين افتح: http://localhost:3000

(محتاج Node.js 18 أو أحدث، ومفيش مكتبات محتاجة تتنزّل)

## الهيكل
```
weather-clock-app/
├── package.json
├── README.md
├── src/
│   ├── index.js     السيرفر
│   ├── config.js    المدن واللغات وألوان الطقس
│   ├── weather.js   جلب الطقس
│   └── page.js      صفحة الـ HTML
└── public/
    ├── style.css    التصميم
    └── app.js       الساعة والمشهد (في المتصفح)
```

## إضافة مدينة جديدة
زوّد سطر في `CITIES` جوه `src/config.js`.
