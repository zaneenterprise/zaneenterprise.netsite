## 2025-05-15 - [Portfolio Rendering & Image Preloading]
**Learning:** In the Portfolio page, opening the lightbox or navigating between images triggered full re-renders of all `ProjectCard` and `CDNImage` components because state was managed at the page level and passed down as object literals or non-memoized handlers. Programmatic image preloading in the lightbox significantly improves perceived performance.

**Action:**
- Use `React.memo` for list items and leaf components like `CDNImage`.
- Stabilize props by defining objects (like `cdnOptions`) as constants outside the component or using `useMemo`.
- Wrap page-level handlers in `useCallback` when passed to memoized children.
- Implement preloading for sequential assets (like gallery images) using the `Image` constructor in a `useEffect`.

## 2025-05-15 - [Environment Artifacts]
**Learning:** Running `pnpm dev` in this environment automatically modifies `next-env.d.ts` to reference `./.next/dev/types/routes.d.ts`. This causes build/CI issues if committed.
**Action:** Always revert changes to `next-env.d.ts` before submitting.
