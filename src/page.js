// بناء صفحة الـ HTML
const { CITIES, LANGS, WEATHER } = require('./config');

function renderPage(city, lang) {
  const L = LANGS[lang];

  const cityOptions = Object.entries(CITIES)
    .map(([k, v]) => `<option value="${k}" ${k === city ? 'selected' : ''}>${v.names[lang]}</option>`)
    .join('');
  const langOptions = Object.entries(LANGS)
    .map(([k, v]) => `<option value="${k}" ${k === lang ? 'selected' : ''}>${v.name}</option>`)
    .join('');

  // الإعدادات اللي الجافاسكربت في المتصفح محتاجها
  const cfg = JSON.stringify({
    city,
    lang,
    locale: L.locale,
    tz: CITIES[city].tz,
    hi: L.hi,
    lo: L.lo,
    weather: WEATHER,
  });

  return `<!DOCTYPE html>
<html lang="${lang}" dir="${L.dir}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${CITIES[city].names[lang]}</title>
  <link rel="stylesheet" href="/style.css">
</head>
<body>
  <div id="scene"></div>

  <div class="controls">
    <select id="citySel">${cityOptions}</select>
    <select id="langSel">${langOptions}</select>
  </div>

  <main>
    <h1 id="city">${CITIES[city].names[lang]}</h1>
    <div id="temp">--°</div>
    <p id="cond">&nbsp;</p>
    <div id="hilo">&nbsp;</div>
    <div class="card">
      <p id="time"></p>
      <p id="date"></p>
    </div>
  </main>

  <script>window.CFG = ${cfg};</script>
  <script src="/app.js"></script>
</body>
</html>`;
}

module.exports = { renderPage };
