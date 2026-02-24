## 2025-05-15 - [Grid Re-render Optimization]
**Learning:** In React applications with large grids (like a portfolio), updating parent state (e.g., opening a lightbox) can cause every item in the grid to re-render if handlers are not memoized and components are not wrapped in React.memo. This is especially impactful when each grid item contains complex sub-components like carousels.
**Action:** Always wrap grid items in React.memo and memoize any callbacks passed to them using useCallback with minimal dependencies.

## 2025-05-15 - [Event Listener Efficiency]
**Learning:** Using useEffect to manage global event listeners (like keydown for a lightbox) with dependencies that change frequently (like the current image index) causes the listener to be removed and re-added unnecessarily. Functional state updates and useCallback can keep handlers stable and listeners persistent.
**Action:** Use functional updates in setCurrentIndex and memoize navigation handlers to keep global event listeners stable across state transitions.
