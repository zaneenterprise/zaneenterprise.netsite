## 2026-02-25 - [Stable Handlers for Event Listeners]
**Learning:** In components like lightboxes with keyboard navigation, including the 'currentIndex' in the useEffect dependency array for event listeners causes redundant registration/unregistration on every item change. By using stable memoized handlers (useCallback) with functional state updates (setCurrentIndex(prev => ...)), we can keep the event listener stable for the entire lifecycle of the component.
**Action:** Always prefer functional state updates and memoized handlers for global event listeners to avoid unnecessary churn.

## 2026-02-25 - [CI Version Mismatch]
**Learning:** Cloudflare Pages CI is sensitive to Node.js versions. A mismatch between package.json engines, .nvmrc, and the Dockerfile can cause build failures. Standardizing on Node 20.18.1 ensures compatibility.
**Action:** Ensure Node versions are aligned across all configuration files when fixing CI blockers.
