## 2025-05-15 - [Event Listener Stability in Lightboxes]
**Learning:** In React components that add global event listeners (like keydown for a lightbox), including frequently changing state variables (like `currentIndex`) in the `useEffect` dependency array causes unnecessary removal and re-addition of the listener. This can be avoided by using functional state updates within `useCallback` memoized handlers and including those stable handlers in the `useEffect` instead.

**Action:** Always wrap event handlers in `useCallback` when they are used inside a `useEffect` that manages global event listeners, and ensure the `useEffect` dependencies are stable.

## 2025-05-15 - [Next.js Environment Hygiene]
**Learning:** Next.js dev server automatically modifies `next-env.d.ts` to include dev-specific route types. These changes should not be committed as they can interfere with CI/CD and other environments.

**Action:** Revert changes to `next-env.d.ts` before submitting a PR.
