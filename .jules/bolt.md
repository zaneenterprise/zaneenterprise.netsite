## 2025-05-15 - [ImageLightbox Optimization]
**Learning:** Performance in image-heavy components like lightboxes is significantly improved by programmatic preloading of adjacent images using the browser's `Image` constructor, which ensures instantaneous transitions. Stabilizing event handlers with `useCallback` and `useEffect` dependency management prevents "event listener churn" and redundant re-renders.
**Action:** Always check for opportunities to preload sequential assets and ensure event listeners use stable handler references to maintain efficiency in high-interaction components.
