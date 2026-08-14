/* PopSchool! service worker — hand-rolled, dependency-free.
 * - Precache the app shell so the app opens offline.
 * - Cache-first for static assets (JS/CSS/fonts/icons).
 * - Network-first for /api/questions, falling back to the last
 *   successful round per topic so kids can replay offline. */
const SW_VERSION = "1.0.0";
const STATIC_CACHE = `popschool-static-${SW_VERSION}`;
const SHELL_CACHE = `popschool-shell-${SW_VERSION}`;
const ROUNDS_CACHE = `popschool-rounds-${SW_VERSION}`;

const SHELL = [
  "/",
  "/play",
  "/manifest.webmanifest",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/icon-maskable-512.png",
  "/icons/apple-touch-icon.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const shell = await caches.open(SHELL_CACHE);
      await Promise.all(SHELL.map((url) => shell.add(url).catch(() => {})));
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((k) => k.startsWith("popschool-") && !k.endsWith(SW_VERSION))
          .map((k) => caches.delete(k)),
      );
      await self.clients.claim();
    })(),
  );
});

/** Strip seed/count from a /api/questions URL so the fallback cache is stable per topic+band. */
function canonicalRoundUrl(url) {
  try {
    const u = new URL(url);
    if (u.pathname !== "/api/questions") return null;
    u.searchParams.delete("seed");
    u.searchParams.delete("count");
    return u.href;
  } catch {
    return null;
  }
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // App navigation: network first, offline falls back to the cached shell.
  if (request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const res = await fetch(request);
          if (res.ok) {
            const cache = await caches.open(SHELL_CACHE);
            cache.put("/", res.clone());
            return res;
          }
          throw new Error("bad response");
        } catch {
          const cached = await caches.match(request);
          if (cached) return cached;
          const home = await caches.match("/");
          return home || Response.error();
        }
      })(),
    );
    return;
  }

  // Question rounds: network first, fall back to the last cached round.
  if (url.pathname === "/api/questions") {
    event.respondWith(
      (async () => {
        const canonical = canonicalRoundUrl(request.url);
        try {
          const res = await fetch(request);
          if (res.ok && canonical) {
            const cache = await caches.open(ROUNDS_CACHE);
            cache.put(canonical, res.clone());
          }
          return res;
        } catch {
          if (canonical) {
            const rounds = await caches.open(ROUNDS_CACHE);
            const hit = await rounds.match(canonical);
            if (hit) return hit;
          }
          return Response.error();
        }
      })(),
    );
    return;
  }

  // Same-origin static assets: cache-first, then network + save.
  if (url.origin === self.location.origin) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(STATIC_CACHE);
        const hit = await cache.match(request);
        if (hit) return hit;
        try {
          const res = await fetch(request);
          if (res.ok && (res.type === "basic" || res.type === "default")) {
            cache.put(request, res.clone());
          }
          return res;
        } catch {
          return hit || Response.error();
        }
      })(),
    );
  }
});
