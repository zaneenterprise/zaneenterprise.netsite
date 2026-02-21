# Bolt's Performance Journal ⚡

This journal tracks critical performance learnings and insights discovered while optimizing the ZaneEnterprise codebase.

## 2025-05-15 - Portfolio Grid Optimization
**Learning:** In React 19 / Next.js, grid layouts with many items and shared state (like a lightbox) can suffer from massive re-renders if handlers aren't referentially stable. Even with a small number of items, this is a best-practice that ensures scalability.
**Action:** Always wrap list-item components in `React.memo` and use `useCallback` for any handlers passed down from the parent state to prevent unnecessary grid-wide re-renders during state transitions.
