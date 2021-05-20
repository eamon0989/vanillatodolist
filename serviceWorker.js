const cacheName = "todo-list-v1"
const filesToCache = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js",
  "/icon.png",
]

// self.addEventListener("install", installEvent => {
//   installEvent.waitUntil(
//     caches.open(staticToDo).then(cache => {
//       cache.addAll(assets)
//     })
//   )
// })

self.addEventListener("install", e => {
    console.log("[ServiceWorker**] Install");
    e.waitUntil(
      caches.open(cacheName).then(cache => {
        console.log("[ServiceWorker**] Caching app shell");
        return cache.addAll(filesToCache);
      })
    );
  });

self.addEventListener("activate", event => {
  caches.keys().then(keyList => {
    return Promise.all(
      keyList.map(key => {
        if (key !== cacheName) {
          console.log("[ServiceWorker] - Removing old cache", key);
          return caches.delete(key);
        }
      })
    );
  });
});

self.addEventListener("fetch", event => {
    event.respondWith(
      caches.match(event.request, { ignoreSearch: true }).then(response => {
        return response || fetch(event.request);
      })
    );
  });

// self.addEventListener("fetch", fetchEvent => {
//     fetchEvent.respondWith(
//       caches.match(fetchEvent.request).then(res => {
//         return res || fetch(fetchEvent.request)
//       })
//     )
//   })

//   if ('serviceWorker' in navigator) {
//     window.addEventListener('load',()=> {
//       navigator.serviceWorker.register('/serviceWorker.js');
//     });
//   }

// if ("serviceWorker" in navigator) {
//   window.addEventListener("load", function() {
    // navigator.serviceWorker
    //   .register("/serviceWorker.js")
    //   .then(res => console.log("service worker registered"))
    //   .catch(err => console.log("service worker not registered", err))
//   })
// }