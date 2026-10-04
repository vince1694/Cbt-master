/**
 * CBT Master — Offline Service Worker
 * Network-First for navigation/HTML (ensures immediate updates on release),
 * Stale-While-Revalidate for static assets, with offline fallback.
 */
const CACHE_NAME = 'cbt-master-v6';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './css/style.css',
  './css/auth.css',
  './css/dashboard.css',
  './css/cbt-simulator.css',
  './css/mobile.css',
  './css/novel-hub.css',
  './css/features.css',
  './css/paywall.css',
  './js/app.js',
  './js/api.js',
  './js/auth.js',
  './js/auth-view.js',
  './js/cbt-engine.js',
  './js/cbt-view.js',
  './js/dashboard.js',
  './js/profile-view.js',
  './js/result-view.js',
  './js/storage.js',
  './js/sound-fx.js',
  './js/icons.js',
  './js/novel-hub.js',
  './js/daily-challenge.js',
  './js/achievements.js',
  './js/cheatsheet.js',
  './js/subject-advisor.js',
  './js/question-browser.js',
  './js/analytics-view.js',
  './js/study-planner.js',
  './js/paywall.js',
  './js/questions/index.js',
  './js/questions/english.js',
  './js/questions/science.js',
  './js/questions/biology.js',
  './js/questions/chemistry.js',
  './js/questions/arts.js',
  './js/questions/commercial.js',
  './js/questions/general.js',
  './js/questions/novel.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.allSettled(
        ASSETS_TO_CACHE.map((url) =>
          cache.add(url).catch((err) => console.warn('[SW] Pre-cache skip:', url, err.message))
        )
      );
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Skip non-GET, external CDNs / APIs, and API backend endpoints
  if (
    event.request.method !== 'GET' ||
    url.origin !== self.location.origin ||
    url.pathname.startsWith('/api')
  ) {
    return;
  }

  // Navigation (HTML document requests): Network-first so fresh code loads on click
  if (event.request.mode === 'navigate' || event.request.destination === 'document') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => caches.match(event.request).then((cached) => cached || caches.match('./index.html')))
    );
    return;
  }

  // Static assets: Stale-While-Revalidate (fetch newest in background, serve cache immediately)
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return networkResponse;
        })
        .catch(() => null);

      return cachedResponse || fetchPromise;
    })
  );
});
