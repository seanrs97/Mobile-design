const CACHE_NAME = 'food-fast-v1-appshell';
const CACHE_URLS = [
	'/index.html',
	'/offline14.html',
	'/404.html',
	'/images/app-icon.png',
	'/images/place-holder.png',
	'/images/place-holder-image.jpg',
	'/manifest.json',
	'/scripts.js',
	'/scripts/more.json',
	'/scripts/main.js',
	'/scripts/offline-locations.js',
	'/scripts/offline-scripts2.js',
	'/styles/main.css',
	'/styles/all.css',
	'/webfonts/fa-solid-900.woff',
	'/webfonts/fa-solid-900.woff2',
	'/webfonts/fa-regular-400.woff',
	'/webfonts/fa-regular-400.woff2',
	'/images/icons/android-chrome-192x192.png',
	'/images/icons/android-chrome-512x512.png',
	'/images/icons/favicon-32x32.png',
	'/images/icons/apple-touch-icon.png',
	'/images/icons/favicon.ico',
	'/images/json-images/brunchies.jpg',
	'/images/json-images/capones.jpg',
	'/images/json-images/chicken.jpg',
	'/images/json-images/chilli.jpg',
	'/images/json-images/kebab.jpg',
	'/images/json-images/kfc.jpeg',
	'/fonts/Lato-Black.ttf',
	'/fonts/Lato-BlackItalic.ttf',
	'/fonts/Lato-Bold.ttf',
	'/fonts/Lato-BoldItalic.ttf',
	'/fonts/Lato-Hairline.ttf',
	'/fonts/Lato-HairlineItalic.ttf',
	'/fonts/Lato-Heavy.ttf',
	'/fonts/Lato-Italic.ttf',
	'/fonts/Lato-Light.ttf',
	'/fonts/Lato-LightItalic.ttf',
	'/fonts/Lato-Medium.ttf',
	'/fonts/Lato-MediumItalic.ttf',
	'/fonts/Lato-Regular.ttf',
	'/fonts/Lato-Semibold.ttf',
	'/fonts/Lato-SemiboldItalic.ttf',
	'/fonts/Lato-Thin.ttf',
	'/fonts/Lato-ThinItalic.ttf',
	'/fonts/LeagueSpartan-Bold.otf'
];

/*self.addEventListener("install", function(event){
    console.log("Service worker installed", self);
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache){
            return cache.addAll(CACHE_URLS);
        })
    );
});
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('CACHE_NAME').then(function(cache) {
      return cache.add('offline2.html');
    })
  );
});
self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match('offline2.html');
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName.startsWith('food-fast-') && CACHE_NAME !== cacheName) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
self.addEventListener("fetch", function(event){
    event.respondWith(
        caches.match(event.request).then(function(response){
            if(response){
                console.log(`Returning ${event.request.url} from cache!`);
                return response;
            }
            console.log(`Sorry, ${event.request.url} not found in cache`);
            return fetch(event.request);
        })
    );
});
*/
self.addEventListener("install", function(event){
    console.log("Service worker installed", self);
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache){
            console.log("Cache opened: ", cache);
            return cache.addAll(CACHE_URLS);
        })
    );
});
//On activate update the cache with the new version and clean out old caches
self.addEventListener('activate', function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheName.endsWith('appshell') && CACHE_NAME !== cacheName) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });

const cacheOnly = (event) => {
    event.respondWith(caches.match(event.request));
};
const networkOnly = (event) => {
    event.respondWith(fetch(event.request));
};
const cacheThenNetwork = (event) => {
    event.respondWith(
        caches.match(event.request).then(function(response){
            if(response){
                console.log(`Returning ${event.request.url} from cache!`);
                return response;
            }
            console.log(`Sorry, ${event.request.url} not found in cache`);
            return fetch(event.request).then(function(response) {
                if (response.status === 404) {
                    return caches.match('404.html');
                } else {
                    return response;
                }
            });
        }).catch(function(error) {
            console.log('Error, ', error);
            // this just returns offline.html for any resources not found. This needs
            // changing to include files like replacement images
            return caches.match('offline14.html');
        })
    );
};
const networkThenCache = (event) => {
    event.respondWith(
        fetch(event.request).catch(() => {
          return caches.match(event.request);
        })
    );
};
const cacheThenNetworkAndStoreInCache = (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            if(response){
                console.log(`Returning ${event.request.url} from cache!`);
                return response;
            }
            console.log(`Sorry, ${event.request.url} not found in cache`);

            return caches.open(`${CACHE_NAME}-dynamic`).then((cache) => {
                return fetch(event.request).then((response) => {
                    cache.put(event.request, response.clone());
                    return response;
                });
            })
        })
    );
}
self.addEventListener("fetch", function(event){
    
    console.log("Service worker intercepting fetch event: ", event);
    
   cacheThenNetwork(event);
});


