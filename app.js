// جافاسكربت المتصفح: الساعة + الطقس + المشهد
const CFG = window.CFG;
const $ = (id) => document.getElementById(id);
const rnd = (a, b) => a + Math.random() * (b - a);
const num = (n) => n.toLocaleString(CFG.locale);

// الوقت والتاريخ (كل ثانية، حسب المنطقة الزمنية واللغة)
function tick() {
  const now = new Date();
  $('time').textContent = now.toLocaleTimeString(CFG.locale, {
    timeZone: CFG.tz, hour: '2-digit', minute: '2-digit', second: '2-digit',
  });
  $('date').textContent = now.toLocaleDateString(CFG.locale, {
    timeZone: CFG.tz, weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
}
tick();
setInterval(tick, 1000);

function add(parent, cls, css) {
  const d = document.createElement('div');
  d.className = cls;
  d.style.cssText = css;
  parent.appendChild(d);
}

// بناء المشهد حسب الطقس ونهار/ليل
function buildScene(type, isDay) {
  const scene = $('scene');
  scene.innerHTML = '';
  const info = CFG.weather[type];
  document.body.style.background = isDay ? info.day : info.night;

  // نجوم بالليل
  if (!isDay) {
    const n = type === 'clear' ? 150 : type === 'partly' ? 110 : type === 'cloudy' ? 30 : 0;
    for (let i = 0; i < n; i++) {
      const s = rnd(1, 3);
      add(scene, 'star',
        'left:' + rnd(0, 100) + '%;top:' + rnd(0, 65) + '%;width:' + s + 'px;height:' + s + 'px;' +
        'animation-delay:' + rnd(0, 3) + 's;animation-duration:' + rnd(2, 5) + 's');
    }
  }

  // قمر أو شمس
  if (type === 'clear' || type === 'partly') {
    add(scene, isDay ? 'sun' : 'moon', '');
  }

  // سحاب
  const clouds = { clear: 0, partly: 5, cloudy: 8, fog: 7, rain: 8, snow: 6, storm: 9 }[type];
  for (let i = 0; i < clouds; i++) {
    add(scene, 'cloud ' + (isDay ? 'day' : 'night'),
      'top:' + rnd(2, 60) + '%;width:' + rnd(240, 460) + 'px;' +
      'animation-duration:' + rnd(70, 150) + 's;animation-delay:-' + rnd(0, 150) + 's');
  }

  // مطر
  if (type === 'rain' || type === 'storm') {
    for (let i = 0; i < 100; i++) {
      add(scene, 'drop',
        'left:' + rnd(0, 100) + '%;animation-duration:' + rnd(0.6, 1.1) + 's;animation-delay:-' + rnd(0, 1.1) + 's');
    }
  }
  // برق
  if (type === 'storm') add(scene, 'flash', '');
  // ثلج
  if (type === 'snow') {
    for (let i = 0; i < 80; i++) {
      const s = rnd(3, 7);
      add(scene, 'flake',
        'left:' + rnd(0, 100) + '%;width:' + s + 'px;height:' + s + 'px;' +
        'animation-duration:' + rnd(5, 12) + 's;animation-delay:-' + rnd(0, 12) + 's');
    }
  }
}
buildScene('clear', false);

// جلب الطقس
async function loadWeather() {
  try {
    const r = await fetch('/api/weather?city=' + CFG.city);
    const w = await r.json();
    if (w.error) throw new Error(w.error);
    buildScene(w.type, w.isDay);
    $('temp').textContent = num(w.temp) + '°';
    $('cond').textContent = CFG.weather[w.type].label[CFG.lang];
    $('hilo').textContent = CFG.hi + ': ' + num(w.hi) + '°   ' + CFG.lo + ': ' + num(w.lo) + '°';
  } catch (e) {
    $('cond').textContent = '—';
  }
}
loadWeather();
setInterval(loadWeather, 10 * 60 * 1000);

// تغيير المدينة أو اللغة
function go() {
  location.href = '/?city=' + $('citySel').value + '&lang=' + $('langSel').value;
}
$('citySel').onchange = go;
$('langSel').onchange = go;
