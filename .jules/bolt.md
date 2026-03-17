## 2025-03-17 - Portfolio Page Memoization Optimization

**Learning:** Cascading re-renders in the portfolio list during lightbox interactions were causing performance overhead. By applying `React.memo` to `ProjectCard` and `CDNImage`, and wrapping state handlers in `useCallback`, we reduced unnecessary re-renders. Additionally, passing object literals as props (like `cdnOptions`) to memoized components bypasses memoization unless those objects are stable constants or memoized in the parent.

**Action:** Always memoize shared components like `CDNImage` and ensure props passed to them are stable (constants or `useMemo`). Use `useCallback` for event handlers passed down to memoized list items.
