## 2026-02-22 - [Grid Optimization via Memoization]
**Learning:** In interactive grids where parent state (like a lightbox) frequently toggles, the absence of memoization and stable function references causes expensive re-renders across the entire grid.
**Action:** Always wrap list item components in `React.memo` and ensure event handlers passed from parents are stabilized with `useCallback`.
