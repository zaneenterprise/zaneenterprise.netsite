## 2025-05-15 - [Grid Re-render Optimization]
**Learning:** In React applications with large grids (like a portfolio), updating parent state (e.g., opening a lightbox) can cause every item in the grid to re-render if handlers are not memoized and components are not wrapped in React.memo. This is especially impactful when each grid item contains complex sub-components like carousels.
**Action:** Always wrap grid items in React.memo and memoize any callbacks passed to them using useCallback with minimal dependencies.

## 2025-05-15 - [Event Listener Efficiency]
**Learning:** Using useEffect to manage global event listeners (like keydown for a lightbox) with dependencies that change frequently (like the current image index) causes the listener to be removed and re-added unnecessarily. Functional state updates and useCallback can keep handlers stable and listeners persistent.
**Action:** Use functional updates in setCurrentIndex and memoize navigation handlers to keep global event listeners stable across state transitions.

## 2025-05-15 - [Node Version Standardization]
**Learning:** Cloudflare Pages builds often fail if there is a mismatch between the Node version specified in '.nvmrc' and the 'engines' field in 'package.json', or if a version that is too new (like 22.x or 25.x) is used before the platform fully supports it.
**Action:** Standardize the Node.js version to a stable LTS (like 20.18.1) across 'package.json', '.nvmrc', and 'Dockerfile' to ensure CI/CD compatibility.
