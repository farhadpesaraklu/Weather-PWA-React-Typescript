var CACHE_NAME = 'task-manager-pwa';
var urlsToCache = [
  '/',
  'offline.html',
  'index.html',
];

// Install service worker
this.addEventListener('install', event => {
  // Perform the install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Cache opened');
        return cache.addAll(urlsToCache);
      })
  );
});

// Cache and return the requests
this.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
    .then(()=>{
      return fetch(event.request)
      .catch(()=> caches.match("offline.html"))
    })
    //   .then(function(response) {
    //     // Return response as Cache is hit 

    //     if (response) {
    //       return response;
    //     }
    //     return fetch(event.request);
    //   }
    // )
  );
});

// Update service worker
this.addEventListener('activate', event => {
  var cacheWhitelist = ['weather-pwa'];
cacheWhitelist.push(CACHE_NAME)

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        // eslint-disable-next-line array-callback-return
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});