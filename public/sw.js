'use strict';
let cacheName = 'pwa';
let filesToCache = [
  './',
  './css/main.css',
  './css/profile.css',
  './index.html',
  './home.html',
  './profile.html',
  './js/main.js',
  './js/home.js',
  './js/profile.js',
  './favicon.ico',
];

self.addEventListener('install', (e) => {
  e.waitUntil((async () => {
    try {
      const cache = await caches.open(cacheName);
      return cache.addAll(filesToCache);
    }
    catch (e) {
      console.log('after install', e.message);
    }
  })());
});

self.addEventListener('fetch', (e) => {
  e.respondWith((async () => {
    try {
      const response = await caches.match(e.request);
      return response || fetch(e.request);
    }
    catch (e) {
      console.log('load cache', e.message);
    }
  })());
});
