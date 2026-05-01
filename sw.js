const CACHE_NAME = 'sewaastra-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png'
];

// 1. Install Event - Assets ko cache mein save karna
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('SewaAstra: Caching Shell Assets');
      return cache.addAll(ASSETS);
    })
  );
});

// 2. Activate Event - Purane cache ko delete karna
self.addEventListener('activate', (event) => {
  console.log('SewaAstra: Service Worker Activated');
});

// 3. FETCH EVENT - Iske bina Install Popup nahi aata!
self.addEventListener('fetch', (event) => {
  // Ye empty fetch bhi kaam kar jayega, lekin ye zaroori hai
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
