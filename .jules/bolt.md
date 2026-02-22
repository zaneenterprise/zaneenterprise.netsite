## 2026-02-22 - [Grid Optimization via Memoization]
**Learning:** In interactive grids where parent state (like a lightbox) frequently toggles, the absence of memoization and stable function references causes expensive re-renders across the entire grid.
**Action:** Always wrap list item components in `React.memo` and ensure event handlers passed from parents are stabilized with `useCallback`.

## 2026-02-22 - [CI/CD Node Version & Engine Compatibility]
**Learning:** Cloudflare Pages build environment may not yet support very new Node.js versions (like 25.x). Even if `package.json` specifies a high version, setting `.nvmrc` to that version can fail if the platform doesn't have it. Conversely, if `package.json` has a strict high engine requirement, it can block installation on the platform's supported versions.
**Action:** Relax `package.json` engine requirements and use a stable LTS version in `.nvmrc` to ensure broad compatibility across CI/CD platforms.
