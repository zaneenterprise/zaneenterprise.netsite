## 2025-05-14 - [Portfolio Lightbox Optimization]
**Learning:** Cascading re-renders were identified in the portfolio page where opening the lightbox caused all project cards to re-render. Additionally, high-resolution image navigation in the lightbox was delayed by network latency without preloading.
**Action:** Use `React.memo` and `useCallback` to stabilize the component tree, and implement programmatic preloading for adjacent gallery images to eliminate navigation lag.
