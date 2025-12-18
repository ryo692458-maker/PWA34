const CACHE_NAME = 'kai-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  // アイコンもキャッシュ対象に入れると良いですが、必須ではありません
  // './icon-192.png',
];

// インストール時：ファイルをキャッシュする
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// ネットワークリクエスト時：キャッシュがあればそれを返す（オフライン対応）
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});

// 更新時：古いキャッシュを削除する
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});
