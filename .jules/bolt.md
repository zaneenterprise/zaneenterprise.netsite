## 2026-02-22 - [Grid Optimization via Memoization]
**Learning:** In interactive grids where parent state (like a lightbox) frequently toggles, the absence of memoization and stable function references causes expensive re-renders across the entire grid.
**Action:** Always wrap list item components in `React.memo` and ensure event handlers passed from parents are stabilized with `useCallback`.

## 2026-02-22 - [CI/CD Node Version Compatibility]
**Learning:** Cloudflare Pages build environment has specific Node.js versions available. Setting `.nvmrc` to a version that is too new (like 25.4.0) can cause build failures if that version is not yet supported in their build image, even if required by `package.json`.
**Action:** Use a widely supported Node.js version in `.nvmrc` and monitor CI for engine-related failures.
