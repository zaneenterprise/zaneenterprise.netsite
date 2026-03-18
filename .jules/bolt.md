## 2025-03-24 - [Portfolio Memoization and Lightbox Preloading]
**Learning:** In 'ImageLightbox', using the browser 'Image' constructor in a 'useEffect' hook ensures adjacent images are preloaded into the browser cache. For this to be effective, the preloaded URL must exactly match the rendered URL, which I achieved by using a shared 'LIGHTBOX_IMAGE_OPTIONS' constant.
**Action:** Always use stable configuration constants when preloading assets to avoid cache misses caused by slight URL mismatches (e.g., quality or width parameters).
