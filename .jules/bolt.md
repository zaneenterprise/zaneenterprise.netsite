## 2025-05-15 - [React.memo and useCallback optimization]
**Learning:** Component re-renders in the portfolio page were triggered by the lightbox state changes. Even though children didn't visually change, they re-rendered because the parent state updated and function props were recreated.
**Action:** Use `React.memo` on list items and `useCallback` on handlers. Ensure props passed to memoized components are referentially stable (e.g., move object literals to constants).

## 2025-05-15 - [Next.js Image Loader width check]
**Learning:** Next.js performs a static code check on custom loader functions to ensure they use the `width` parameter. If the parameter is not explicitly named `width` in the destructured argument, Next.js throws a warning.
**Action:** Always name the width parameter `width` in the loader's signature: `({ src, width, quality }) => ...`.
