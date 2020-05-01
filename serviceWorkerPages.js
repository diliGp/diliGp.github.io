const cacheName = 'v1';

const cacheAssets = [
    'index.html',
    'about.html',
    'js/index.js'
];

/**
 * 2. Installing SW
 */
self.addEventListener('install', (e) => {
    console.log(`Service Worker:`, 'Installed');
    e.waitUntil(
        caches.open(cacheName).then(cache => {
            console.log(cache,'Service Worker: Caching...');
            cache.addAll(cacheAssets);
            cache.add('https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css')
        }).then(() => self.skipWaiting())
        .catch(err => {
            console.error(err)
        })
    );
});

/**
 * 3. Activating SW
 */
self.addEventListener('activate', (e) => {
    console.log(`Service Worker:`, 'Activated');
    e.waitUntil(
        caches.keys().then(cachenames => {
            cachenames.map(cName => {
                if (cName !== cacheName) {
                    console.log('Clearing old cache...');
                    caches.delete(cName);
                }
            });
        })
    );
});


/**
 * Server cache by intercepting the request.
 * That can be done by handling fetch event.
 */
self.addEventListener('fetch', (e) => {
    console.log('SW: Fetching...');
    e.respondWith(
        fetch(e.request).catch(() => {
            console.log('SW: Serving response from cache!!');
            /**
             * If actual refetching failed serve from cache.
             */
            return caches.match(e.request);
        })
    );
});