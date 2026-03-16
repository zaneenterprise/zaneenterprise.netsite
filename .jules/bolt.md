## 2025-05-15 - [Portfolio Optimization]
**Learning:** Significant re-renders in the portfolio list (18+ components) were triggered by lightbox state updates because of unstable event handler references and lack of component memoization. Even though the lightbox is a separate overlay, updating the parent state caused the entire list to reconcile.
**Action:** Always wrap event handlers passed to large lists in `useCallback` and memoize the list items with `React.memo`. Ensure props are stable by moving object literals to constants or using `useMemo`.

**Learning:** Next.js performs a string-based check on custom loader functions to ensure they destructure the `width` parameter. Renaming this parameter (e.g., `{ width: loaderWidth }`) triggers a dev-time warning.
**Action:** Keep the parameter named `width` in the destructuring of Next.js image loaders.
