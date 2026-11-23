// نقطة البداية: السيرفر
const http = require('http');
const fs = require('fs');
const path = require('path');

const { CITIES, LANGS } = require('./config');
const { getWeather } = require('./weather');
const { renderPage } = require('./page');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

const MIME = {
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

// تقديم الملفات الثابتة من فولدر public
function serveStatic(pathname, res) {
  const file = path.normalize(path.join(PUBLIC_DIR, pathname));
  if (!file.startsWith(PUBLIC_DIR)) return false; // حماية من ../

  let content;
  try {
    content = fs.readFileSync(file);
  } catch {
    return false;
  }
  const type = MIME[path.extname(file)] || 'application/octet-stream';
  res.writeHead(200, { 'Content-Type': type });
  res.end(content);
  return true;
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  const cityParam = url.searchParams.get('city');
  const langParam = url.searchParams.get('lang');
  const city = CITIES[cityParam] ? cityParam : 'cairo';
  const lang = LANGS[langParam] ? langParam : 'ar';

  // API الطقس
  if (url.pathname === '/api/weather') {
    try {
      const data = await getWeather(city);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data));
    } catch (e) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'weather unavailable' }));
    }
    return;
  }

  // الصفحة الرئيسية
  if (url.pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(renderPage(city, lang));
    return;
  }

  // ملفات ثابتة (CSS / JS)
  if (serveStatic(url.pathname, res)) return;

  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Not found');
});

server.listen(PORT, () => {
  console.log(`السيرفر شغال على: http://localhost:${PORT}`);
});
