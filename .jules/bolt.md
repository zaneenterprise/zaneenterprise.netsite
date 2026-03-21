## 2025-05-15 - [Next.js Custom Loader Validation]
**Learning:** Next.js performs a string-based check on custom loader functions to ensure they destructure 'src', 'width', and 'quality' from their argument object. If 'src' is missing from the destructuring (even if it's not used in the function body because it's captured from the parent scope), Next.js will issue a warning: "Image with src '...' has a 'loader' property that does not implement width".

**Action:** Always include 'src' in the destructured parameters of a custom loader, even if it's already available in the component's scope.
