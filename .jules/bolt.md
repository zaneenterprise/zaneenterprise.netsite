## 2025-05-15 - [Portfolio UI Optimization]
**Learning:** To prevent cascading re-renders in the portfolio list during lightbox interactions, apply `React.memo` to `ProjectCard` and `CDNImage`, and wrap the `openLightbox` and `closeLightbox` handlers in `useCallback` within `PortfolioPage`.
**Action:** Always verify that functional props passed to memoized components are stabilized with `useCallback` and that object literals are moved to stable constants.

## 2025-05-15 - [Image Lightbox Preloading]
**Learning:** Programmatic preloading of next and previous images in a lightbox gallery using the `Image` constructor significantly improves perceived transition speed without adding hidden DOM elements.
**Action:** Implement preloading in any carousel/gallery component for an instantaneous feel. Ensure cache consistency by using identical CDN options for both the active image and the preloaded ones.

## 2025-05-15 - [Environment Integrity]
**Learning:** Running `pnpm dev` or `pnpm build` in this Next.js project automatically modifies `next-env.d.ts` to include environment-specific route types (e.g., `./.next/types/routes.d.ts`).
**Action:** Always revert changes to `next-env.d.ts` before committing to maintain a clean production environment and avoid breaking CI.
