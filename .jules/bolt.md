## 2026-02-22 - [Grid Optimization via Memoization]
**Learning:** In interactive grids where parent state (like a lightbox) frequently toggles, the absence of memoization and stable function references causes expensive re-renders across the entire grid.
**Action:** Always wrap list item components in `React.memo` and ensure event handlers passed from parents are stabilized with `useCallback`.

## 2026-02-22 - [CI/CD Node Version Mismatch]
**Learning:** Cloudflare Pages relies on `.nvmrc` to determine the Node.js version. If this version is lower than the `engines` requirement in `package.json`, the build will fail during the dependency installation or build phase due to strict engine checks.
**Action:** Ensure `.nvmrc` is always in sync with `package.json` and the production `Dockerfile`.
