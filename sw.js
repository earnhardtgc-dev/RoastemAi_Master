self.addEventListener('install', e => {
  e.waitUntil(caches.open('roastemai-v1').then(c => c.addAll([
    './', './index.html', './styles.css', './app.js', './assets/logo-roastemai.png'
  ])));
});
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
