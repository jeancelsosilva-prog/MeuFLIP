/* MeuFLIP — service worker
   Cache-first: o app é 100% offline.

   AO TROCAR QUALQUER ARQUIVO (ícone, HTML, o que for), suba o número da
   constante CACHE abaixo. Sem isso o navegador continua servindo a versão
   antiga para sempre, mesmo com o arquivo novo no servidor. */
const CACHE = 'meuflip-v12';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest?v=3',
  './icon-16.png?v=3',
  './icon-32.png?v=3',
  './icon-48.png?v=3',
  './icon-152.png?v=3',
  './icon-167.png?v=3',
  './icon-180.png?v=3',
  './icon-192.png?v=3',
  './icon-512.png?v=3',
  './icon-maskable-512.png?v=3'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => c.addAll(ASSETS))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;

  // navegação: sempre devolve o app, mesmo offline
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then((r) => {
          const copy = r.clone();
          caches.open(CACHE).then((c) => c.put('./index.html', copy)).catch(() => {});
          return r;
        })
        .catch(() => caches.match('./index.html').then((r) => r || caches.match('./')))
    );
    return;
  }

  e.respondWith(
    caches.match(req).then((hit) => {
      if (hit) return hit;
      return fetch(req).then((r) => {
        if (r && r.status === 200 && r.type === 'basic') {
          const copy = r.clone();
          caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
        }
        return r;
      }).catch(() => hit);
    })
  );
});
