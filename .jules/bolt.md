## 2025-05-14 - [Portfolio Page Re-rendering Optimization]
**Learning:** In pages with multiple repeated components (like a portfolio grid), a state change in the parent (e.g., opening a lightbox) can trigger re-renders of all child components if they are not memoized and their props are not stable. Using `React.memo` combined with `useCallback` for passed handlers prevents this.
**Action:** Always check for stable references and use `React.memo` for list items that receive callbacks from their parent.

## 2025-05-14 - [Scope and Environment Management]
**Learning:** Implementing multiple optimizations when only "one" is requested can lead to bloated PRs and increased review complexity. Also, running dev servers or build commands can sometimes modify environment-specific files (like `next-env.d.ts`) or create log files which should not be committed.
**Action:** Stick to one clear optimization area. Be extremely careful to clean up any temporary files and revert accidental changes to environment files before submitting.
