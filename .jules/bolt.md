## 2025-05-22 - [Optimizing re-renders in portfolio interaction]
**Learning:** In React components with frequent state updates (like an image lightbox), using `React.memo` on child components (like `ProjectCard`) is only effective if parent event handlers (like `openLightbox`) are stabilized with `useCallback`. Similarly, object prop literals (like `cdnOptions`) must be moved to stable constants outside the component to prevent memoization bail-outs.
**Action:** Always wrap event handlers passed to memoized children in `useCallback` and extract object/array prop literals to stable constants.

## 2025-05-22 - [Programmatic Image Preloading]
**Learning:** For sequential image galleries like lightboxes, preloading the next and previous images using the browser's `Image` constructor in a `useEffect` hook provides a significant boost to perceived performance by ensuring instantaneous transitions.
**Action:** Implement programmatic preloading for adjacent assets in interactive media components.
