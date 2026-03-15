## 2025-05-15 - [Portfolio re-render optimization]
**Learning:** Opening the lightbox in the portfolio page caused the entire list of projects to re-render because the state update was happening in the parent `PortfolioPage` and handlers were being recreated on every render.
**Action:** Use `React.memo` on list items (`ProjectCard`) and leaf components (`CDNImage`). Wrap state-updating handlers in `useCallback`. Ensure props passed to memoized components are stable by using `useMemo` or moving them to constants.

**Learning:** Next.js Image component (version 16.1.4 in this project) performs a string-based check on the `loader` function. If it doesn't see `width` being used in the function body, it throws a warning.
**Action:** Explicitly destructure `width` in the custom loader signature and use it in the CDN URL generation to satisfy the check and ensure proper image sizing.

## 2025-05-15 - [Node.js Version Alignment]
**Learning:** Cloudflare Pages builds consistently failed when the project was configured for Node.js 25.x, likely due to environment incompatibilities.
**Action:** Standardize on Node.js 22.14.0 (LTS) across `.nvmrc`, `package.json` engines, and `Dockerfile` to ensure environment parity and CI stability.
