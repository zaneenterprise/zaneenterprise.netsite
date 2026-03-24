## 2025-05-14 - [Portfolio Memoization and Stable Handlers]
**Learning:** In 'ImageLightbox', preloading consistency is ensured by using a shared 'LIGHTBOX_IMAGE_OPTIONS' constant for the active image and programmatically preloaded adjacent images, preventing cache-bushing URL mismatches. The portfolio optimization (memoization and stable handlers) significantly improved scrolling and interaction smoothness by reducing redundant re-renders of the project cards when the lightbox state changes.
**Action:** Always wrap derived optimization options in 'useMemo' and use functional state updates within memoized handlers (useCallback) to maintain stable references in 'useEffect' dependency arrays.

## 2025-05-14 - [CI Stability and Node.js Parity]
**Learning:** Cloudflare Pages builds can fail if there is a version mismatch between '.nvmrc', 'package.json' engines, and the build environment. Standardizing on Node.js 25.4.0 across all configs ensures consistency and avoids 'unsupported engine' warnings or CI failures.
**Action:** Align Node.js versions in 'package.json', '.nvmrc', and 'Dockerfile' to match the production environment requirements.
