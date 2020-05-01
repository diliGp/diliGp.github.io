const cacheName = 'v2';

self.addEventListener('intall', () => {
    console.log('SW Site: Installed');
});


self.addEventListener('activate', (e) => {
    console.log('SW Site: Activated');
    e.waitUntil(
        caches.keys().then(cacheNames => {
            cacheNames.map(cname => {
                if (cacheName !== cname) {
                    console.log('Clearing the old caches');
                    caches.delete(cname);
                }
            });
        })
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        fetch(e.request).then(res => {
            /**
             * Making a copy of res.
             */
            const resClone = res.clone();
            caches.open(cacheName).then(cache => {
                cache.put(e.request, resClone);
            });
            return res;
        }).catch(() => caches.match(e.request).then(res => res))
    )
});