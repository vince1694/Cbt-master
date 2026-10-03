/**
 * CBT Master — Offline Service Worker
 * Caches core app shell, CSS, JavaScript, and Past Questions
 * so candidates can practice seamlessly without internet connection.
 */
const CACHE_NAME = 'cbt-master-v2';
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
  './js/app.js',
  './js/auth.js',
  './js/auth-view.js',
  './js/cbt-engine.js',
  './js/cbt-view.js',
  './js/dashboard.js',
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
      // Cache assets individually — if any one fails (404 etc.), skip it
      return Promise.allSettled(
        ASSETS_TO_CACHE.map(url =>
          cache.add(url).catch(err => console.warn('[SW] Failed to cache:', url, err.message))
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
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return networkResponse;
      }).catch(() => {
        // Fallback to cached index.html for navigation requests
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
