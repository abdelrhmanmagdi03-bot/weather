// الإعدادات: المدن واللغات وأنواع الطقس

// المدن: الإحداثيات + المنطقة الزمنية + الاسم بكل لغة
const CITIES = {
  cairo:   { lat: 30.04, lon: 31.24,  tz: 'Africa/Cairo',     names: { ar: 'القاهرة', en: 'Cairo',    fr: 'Le Caire' } },
  riyadh:  { lat: 24.71, lon: 46.68,  tz: 'Asia/Riyadh',      names: { ar: 'الرياض',  en: 'Riyadh',   fr: 'Riyad' } },
  dubai:   { lat: 25.20, lon: 55.27,  tz: 'Asia/Dubai',       names: { ar: 'دبي',     en: 'Dubai',    fr: 'Dubaï' } },
  london:  { lat: 51.51, lon: -0.13,  tz: 'Europe/London',    names: { ar: 'لندن',    en: 'London',   fr: 'Londres' } },
  newyork: { lat: 40.71, lon: -74.01, tz: 'America/New_York', names: { ar: 'نيويورك', en: 'New York', fr: 'New York' } },
  tokyo:   { lat: 35.68, lon: 139.69, tz: 'Asia/Tokyo',       names: { ar: 'طوكيو',   en: 'Tokyo',    fr: 'Tokyo' } },
};

// اللغات
const LANGS = {
  ar: { locale: 'ar-EG', dir: 'rtl', name: 'العربية',  hi: 'الأعلى', lo: 'الأدنى' },
  en: { locale: 'en-US', dir: 'ltr', name: 'English',  hi: 'H',       lo: 'L' },
  fr: { locale: 'fr-FR', dir: 'ltr', name: 'Français', hi: 'Max',     lo: 'Min' },
};

// أنواع الطقس: خلفية للنهار وخلفية لليل + الاسم بكل لغة
const WEATHER = {
  clear: {
    day:   'linear-gradient(180deg,#2d7fd6 0%,#5aa9f0 50%,#a8d8ff 100%)',
    night: 'linear-gradient(180deg,#05051a 0%,#16183a 45%,#2a2b55 70%,#14152e 100%)',
    label: { ar: 'صافي', en: 'Clear', fr: 'Dégagé' },
  },
  partly: {
    day:   'linear-gradient(180deg,#3a79c4 0%,#6fa6dd 55%,#a9c9e8 100%)',
    night: 'linear-gradient(180deg,#07071f 0%,#1c1d44 45%,#34366a 70%,#171836 100%)',
    label: { ar: 'غائم جزئياً', en: 'Partly Cloudy', fr: 'Partiellement nuageux' },
  },
  cloudy: {
    day:   'linear-gradient(180deg,#6b7a8f 0%,#8b99ab 55%,#b4bfcc 100%)',
    night: 'linear-gradient(180deg,#14162a 0%,#2a2d4a 55%,#3a3d5c 100%)',
    label: { ar: 'غائم', en: 'Cloudy', fr: 'Nuageux' },
  },
  fog: {
    day:   'linear-gradient(180deg,#9aa5b1 0%,#b9c2cb 55%,#d5dbe1 100%)',
    night: 'linear-gradient(180deg,#1c2028 0%,#343a46 55%,#454c5a 100%)',
    label: { ar: 'شبورة', en: 'Foggy', fr: 'Brouillard' },
  },
  rain: {
    day:   'linear-gradient(180deg,#2b3442 0%,#3f4e63 55%,#5b6d85 100%)',
    night: 'linear-gradient(180deg,#0a0d15 0%,#1a202c 55%,#2a3241 100%)',
    label: { ar: 'ممطر', en: 'Rainy', fr: 'Pluvieux' },
  },
  snow: {
    day:   'linear-gradient(180deg,#8aa3c0 0%,#b0c4da 55%,#dbe6f1 100%)',
    night: 'linear-gradient(180deg,#141b2b 0%,#2a3850 55%,#415671 100%)',
    label: { ar: 'ثلج', en: 'Snowy', fr: 'Neigeux' },
  },
  storm: {
    day:   'linear-gradient(180deg,#141b27 0%,#26334a 55%,#3a4a63 100%)',
    night: 'linear-gradient(180deg,#05080e 0%,#121a28 55%,#1f2a3c 100%)',
    label: { ar: 'عاصف', en: 'Stormy', fr: 'Orageux' },
  },
};

module.exports = { CITIES, LANGS, WEATHER };
