## 2025-05-15 - [Next.js Custom Loader Validation]
**Learning:** Next.js performs a string-based check on custom loader functions to ensure they destructure 'src', 'width', and 'quality' from their argument object. If 'src' is missing from the destructuring (even if it's not used in the function body because it's captured from the parent scope), Next.js will issue a warning: "Image with src '...' has a 'loader' property that does not implement width".

**Action:** Always include 'src' in the destructured parameters of a custom loader, even if it's already available in the component's scope.

## 2025-05-15 - [Node.js Environment Standardization]
**Learning:** Cloudflare Pages and other CI/CD pipelines may fail when encountering Node.js versions higher than the current LTS (e.g., 25.x). Aligning Node.js 22.14.0 (LTS) across 'package.json', '.nvmrc', and 'Dockerfile' ensures environment parity and build stability.

**Action:** Standardize Node.js 22.14.0 across all project configuration files to ensure build consistency across dev, CI, and production.
