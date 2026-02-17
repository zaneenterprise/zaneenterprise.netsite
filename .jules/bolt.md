## 2025-03-05 - [Portfolio Grid Re-renders]
**Learning:** In projects with interactive overlays (like lightboxes), parent state changes trigger re-renders of the entire underlying grid. Even with few items, this can be inefficient as each card might contain complex components like carousels.
**Action:** Always memoize grid items (ProjectCard) and stabilize parent callbacks (useCallback) passed to them to ensure state-only updates don't thrash the DOM.

## 2025-03-05 - [Next.js Image Loader Stability]
**Learning:** Custom loaders passed to the Next.js `Image` component should be stable (useCallback) to prevent the component from potentially re-triggering loader logic or internal updates unnecessarily.
**Action:** Wrap custom loader functions in `useCallback` and memoize their dependencies.
