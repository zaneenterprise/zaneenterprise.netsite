# Bolt's Performance Journal

## 2025-05-15 - Portfolio Rendering & Image Optimization
**Learning:** In a portfolio grid where a single parent manages state for a shared Lightbox, opening the Lightbox triggers a re-render of the entire grid unless child components are explicitly memoized. Additionally, Next.js image loaders perform a static check on the loader function; if `width` is not explicitly destructured from the argument object, it may trigger a warning or fail to optimize correctly.
**Action:** Always wrap high-frequency list items in `React.memo` and ensure all passed callbacks are stabilized with `useCallback`. In custom image loaders, always explicitly destructure `width`.

## 2025-05-15 - Environment Stability
**Learning:** Running `next dev` or `next build` in this environment automatically updates `next-env.d.ts` to include route types, sometimes pointing to `.next/dev` which is non-portable.
**Action:** Always check and revert changes to `next-env.d.ts` before committing to ensure CI/CD and production builds remain stable.
