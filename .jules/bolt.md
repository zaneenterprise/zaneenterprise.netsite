## 2026-02-25 - [Stable Handlers for Event Listeners]
**Learning:** In components like lightboxes with keyboard navigation, including the 'currentIndex' in the useEffect dependency array for event listeners causes redundant registration/unregistration on every item change. By using stable memoized handlers (useCallback) with functional state updates (setCurrentIndex(prev => ...)), we can keep the event listener stable for the entire lifecycle of the component.
**Action:** Always prefer functional state updates and memoized handlers for global event listeners to avoid unnecessary churn.
