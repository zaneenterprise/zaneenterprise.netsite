## 2025-03-03 - [Portfolio performance and re-render optimization]
**Learning:** Cascading re-renders in the portfolio list were triggered by unstable handlers passed from the parent to ProjectCard components. Using React.memo on shared components (ProjectCard, CDNImage) is only effective if their props (especially object literals and functions) remain stable.
**Action:** Always wrap parent handlers in useCallback and extract object literal props to stable constants outside the component or use useMemo.
**Learning:** Preloading images in a lightbox requires matching the exact URL (including query parameters) used for the visible image, otherwise the browser will perform a redundant fetch.
**Action:** Use a shared constant for image optimization options to ensure URL consistency between visible images and hidden preload tags.
