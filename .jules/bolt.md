## 2025-03-01 - [Lightbox Navigation Optimization]
**Learning:** Functional state updates in event listeners prevent the need to re-register the listener on every state change. Implementing hidden preloading for adjacent images significantly improves perceived performance in image-heavy carousels.
**Action:** Always check if event listeners can be stabilized using functional updates and consider preloading the "next" logical asset in sequential UI components.
