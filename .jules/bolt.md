## 2025-02-23 - [Optimization] Prevent grid-wide re-renders in Portfolio

**Learning:** In React applications with lists of complex components (like the ProjectCard grid), parent state changes (like opening a lightbox) can trigger expensive re-renders across the entire list. Using `React.memo` on child components combined with `useCallback` for event handlers passed down to them is essential to maintain performance as the list grows.

**Action:** Always check if list items are re-rendering unnecessarily when parent state changes. Ensure all props passed to memoized children have stable identities.

## 2025-02-23 - [Next.js] Automatic next-env.d.ts modifications

**Learning:** Running `pnpm dev` or `pnpm build` in a Next.js project can automatically update `next-env.d.ts`, sometimes adding environment-specific type imports (e.g., from `.next/dev/`). These changes should not be committed as they can break type checking in other environments or in CI.

**Action:** Always check for and revert accidental changes to `next-env.d.ts` before submitting a PR.
