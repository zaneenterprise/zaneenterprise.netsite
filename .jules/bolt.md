## 2025-05-22 - Portfolio Performance Optimization (Memoization & Preloading)

**Learning:** To prevent cascading re-renders in a list of components when a parent state changes (e.g., opening a lightbox), it's critical to stabilize event handlers with `useCallback` and memoize the child components with `React.memo`. Additionally, using object literals for props (like `cdnOptions`) breaks memoization; they should be moved to stable constants.

**Action:**
1. Wrap state-updating handlers in `useCallback` at the page level.
2. Memoize list items (`ProjectCard`) and their sub-components (`ProjectCarousel`, `CDNImage`).
3. Move prop object literals to stable constants outside the component definition.
4. Implement programmatic preloading for high-priority interactive assets (like lightbox images) to improve perceived performance.

## 2025-05-22 - Next.js 16.1.4 (Turbopack) and React.memo

**Learning:** When using `React.memo` in this specific version/environment with Turbopack, defining the component as an arrow function assigned to a `const` and explicitly setting `.displayName` ensures better debugging and avoids potential build-time issues with anonymous components.

**Action:** Always use `export const MyComp = React.memo(...)` followed by `MyComp.displayName = "MyComp"`.
