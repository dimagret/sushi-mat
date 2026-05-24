// Service Worker — кэширование статики
const CACHE_NAME = 'sushi-mom-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/favicon.svg',
  '/robots.txt',
  '/sitemap.xml',
];

// Установка — кэшируем критические ресурсы
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Активация — удаляем старые кэши
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n))
      )
    ).then(() => self.clients.claim())
  );
});

// Стратегия: Cache First для статики, Network First для API
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Пропускаем API-запросы и POST
  if (request.method !== 'GET' || url.pathname.startsWith('/api/')) {
    return;
  }

  // Статика: JS, CSS, изображения, шрифты — Cache First
  if (
    url.pathname.match(/\.(js|css|png|jpg|jpeg|svg|webp|avif|woff2?|ttf)$/) ||
    url.pathname === '/' ||
    url.pathname.endsWith('.html')
  ) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) {
          return cached;
        }
        return fetch(request).then((response) => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          return response;
        });
      })
    );
    return;
  }

  // Остальные запросы — Network First с fallback на кэш
  event.respondWith(
    fetch(request).catch(() => caches.match(request))
  );
});
