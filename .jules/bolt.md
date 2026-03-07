## 2025-05-15 - Portfolio Optimization & Lightbox Preloading
**Learning:** In a media-heavy portfolio, perceived performance is as important as raw metrics. Lightbox transitions feel sluggish if images aren't preloaded. Also, passing unstable callbacks to a list of components causes unnecessary re-renders of the entire list when any state (like opening a lightbox) changes.
**Action:** Use `useCallback` for event handlers passed to lists, `React.memo` for list items, and programmatic preloading for carousel/lightbox components.
