## 2025-03-05 - [Portfolio Grid Re-renders]
**Learning:** In projects with interactive overlays (like lightboxes), parent state changes trigger re-renders of the entire underlying grid. Even with few items, this can be inefficient as each card might contain complex components like carousels.
**Action:** Memoize grid items (ProjectCard) and stabilize parent callbacks (useCallback) passed to them to ensure state-only updates don't thrash the DOM.

## 2025-03-05 - [React.memo and Client Components]
**Learning:** Using React hooks like `memo`, `useMemo`, or `useCallback` in Next.js App Router requires the component to be marked with `"use client"`.
**Action:** Always add `"use client"` when introducing these features to a component.
