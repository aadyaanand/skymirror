// SkyMirror Service Worker
// PWA offline support with cache strategies

const CACHE_VERSION = 'skymirror-v1.0.0';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const DYNAMIC_CACHE = `${CACHE_VERSION}-dynamic`;
const TILE_CACHE = `${CACHE_VERSION}-tiles`;

// Static assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/styles/main.css',
  '/styles/animations.css',
  '/js/app.js',
  '/manifest.json',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
];

// Maximum number of tiles to cache (LRU eviction)
const MAX_TILE_CACHE = 100;

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      console.log('[SW] Caching static assets');
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('[SW] Failed to cache some static assets:', err);
        // Don't fail installation if some assets fail to cache
      });
    }).then(() => {
      console.log('[SW] Installed successfully');
      return self.skipWaiting();
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name.startsWith('skymirror-') && name !== STATIC_CACHE && name !== DYNAMIC_CACHE && name !== TILE_CACHE)
          .map((name) => {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    }).then(() => {
      console.log('[SW] Activated successfully');
      return self.clients.claim();
    })
  );
});

// Fetch event - implement cache strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Strategy 1: Static assets - Cache First
  if (STATIC_ASSETS.some(asset => url.pathname === asset || url.href === asset)) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }
  
  // Strategy 2: GIBS tiles - Network First with cache fallback and LRU
  if (url.hostname === 'gibs.earthdata.nasa.gov') {
    event.respondWith(networkFirstWithLRU(request, TILE_CACHE, MAX_TILE_CACHE));
    return;
  }
  
  // Strategy 3: External resources (Leaflet, etc) - Stale While Revalidate
  if (url.hostname !== location.hostname) {
    event.respondWith(staleWhileRevalidate(request, DYNAMIC_CACHE));
    return;
  }
  
  // Strategy 4: Other dynamic content - Network First
  event.respondWith(networkFirst(request, DYNAMIC_CACHE));
});

// Cache First strategy (for static assets)
async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) {
    return cached;
  }
  
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.warn('[SW] Fetch failed:', error);
    throw error;
  }
}

// Network First strategy (for dynamic content)
async function networkFirst(request, cacheName) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await caches.match(request);
    if (cached) {
      return cached;
    }
    throw error;
  }
}

// Network First with LRU eviction (for tiles)
async function networkFirstWithLRU(request, cacheName, maxItems) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      
      // Put new item in cache
      await cache.put(request, response.clone());
      
      // Implement LRU eviction
      const keys = await cache.keys();
      if (keys.length > maxItems) {
        // Delete oldest (first) items
        const deleteCount = keys.length - maxItems;
        for (let i = 0; i < deleteCount; i++) {
          await cache.delete(keys[i]);
        }
      }
    }
    return response;
  } catch (error) {
    const cached = await caches.match(request);
    if (cached) {
      console.log('[SW] Serving cached tile (offline)');
      return cached;
    }
    
    // Return a placeholder image for failed tile requests
    return new Response(
      '<svg width="256" height="256" xmlns="http://www.w3.org/2000/svg"><rect fill="#EAF6FF" width="256" height="256"/><text x="50%" y="50%" text-anchor="middle" fill="#7CC4FF" font-size="14" font-family="sans-serif">Offline</text></svg>',
      {
        headers: {
          'Content-Type': 'image/svg+xml',
          'Cache-Control': 'no-store'
        }
      }
    );
  }
}

// Stale While Revalidate strategy (for external resources)
async function staleWhileRevalidate(request, cacheName) {
  const cached = await caches.match(request);
  
  const fetchPromise = fetch(request).then((response) => {
    if (response.ok) {
      const cache = caches.open(cacheName);
      cache.then(c => c.put(request, response.clone()));
    }
    return response;
  }).catch((error) => {
    console.warn('[SW] Background fetch failed:', error);
  });
  
  return cached || fetchPromise;
}

// Handle messages from the client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((name) => caches.delete(name))
        );
      }).then(() => {
        return self.clients.matchAll();
      }).then((clients) => {
        clients.forEach(client => {
          client.postMessage({ type: 'CACHE_CLEARED' });
        });
      })
    );
  }
});

