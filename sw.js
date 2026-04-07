const CACHE = 'habitflow-v1';

const ASSETS = [
  '/habitflow/',
  '/habitflow/index.html',
  '/habitflow/css/style.css',
  '/habitflow/js/assets.js',
  '/habitflow/js/data.js',
  '/habitflow/js/state.js',
  '/habitflow/js/helpers.js',
  '/habitflow/js/render.js',
  '/habitflow/js/actions.js',
  '/habitflow/js/ui.js',
  '/habitflow/manifest.json',
  '/habitflow/icons/icon-192.png',
  '/habitflow/icons/icon-512.png',
];

// Установка — кэшируем все файлы
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Активация — удаляем старые кэши
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch — сначала кэш, потом сеть
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => {
      return cached || fetch(e.request).catch(() => caches.match('/habitflow/index.html'));
    })
  );
});
