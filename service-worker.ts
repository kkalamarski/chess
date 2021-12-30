// @ts-nocheck
//

const PRECACHE = 'precache-v1.1'
const RUNTIME = 'runtime-v1.1'

self.addEventListener('fetch', (event) => {
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse
        }

        return caches.open(RUNTIME).then((cache) => {
          return fetch(event.request).then((response) => {
            return cache.put(event.request, response.clone()).then(() => {
              return response
            })
          })
        })
      })
    )
  }
})
