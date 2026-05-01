const CACHE_NAME = 'sewaastra-v2';
const assets = [
  '/My App/',
  '/My App/index.html',
  '/My App/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(assets))
  );
});

// यह 'fetch' इवेंट पॉपअप के लिए अनिवार्य है
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});