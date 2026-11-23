// جلب الطقس من Open-Meteo (مجاني وبدون مفتاح)
const { CITIES } = require('./config');

const CACHE_MS = 10 * 60 * 1000; // كاش 10 دقائق
const cache = {};

// تحويل كود الطقس (WMO) لنوع بسيط
function codeToType(c) {
  if (c <= 1) return 'clear';
  if (c === 2) return 'partly';
  if (c === 3) return 'cloudy';
  if (c <= 48) return 'fog';
  if (c <= 67) return 'rain';
  if (c <= 77) return 'snow';
  if (c <= 82) return 'rain';
  if (c <= 86) return 'snow';
  return 'storm';
}

async function getWeather(city) {
  const hit = cache[city];
  if (hit && Date.now() - hit.t < CACHE_MS) return hit.data;

  const c = CITIES[city];
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${c.lat}&longitude=${c.lon}` +
    `&current=temperature_2m,weather_code,is_day` +
    `&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=1`;

  const res = await fetch(url);
  const json = await res.json();
  const data = {
    temp: Math.round(json.current.temperature_2m),
    type: codeToType(json.current.weather_code),
    isDay: json.current.is_day === 1,
    hi: Math.round(json.daily.temperature_2m_max[0]),
    lo: Math.round(json.daily.temperature_2m_min[0]),
  };

  cache[city] = { t: Date.now(), data };
  return data;
}

module.exports = { getWeather };
