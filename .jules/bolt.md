## 2025-05-15 - [React.memo and Stable Props]
**Learning:** Even if a component is wrapped in `React.memo`, it will still re-render if its parent passes an object literal as a prop. For example, `LogoImage` passing `cdnOptions={{ quality: 90 }}` caused `CDNImage` to re-render every time.
**Action:** Move object literals used as props to stable constants outside the component or wrap them in `useMemo` if they depend on other props.

## 2025-05-15 - [Next.js Image Loader Signature]
**Learning:** Next.js performs a static analysis check on custom loader functions. If the function doesn't explicitly destructure `width` in its parameter list (e.g. `({ width, quality }) => ...`), Next.js might throw a warning or error assuming the loader doesn't handle sizing correctly.
**Action:** Always explicitly destructure `width` in custom image loaders.

## 2025-05-15 - [Event Listener Churn]
**Learning:** In components like `ImageLightbox`, including the current index in the dependency array of a `useEffect` that adds global event listeners (like keyboard `keydown`) causes the listener to be removed and re-added on every index change.
**Action:** Use stable `useCallback` handlers (with functional state updates like `setIndex(prev => prev + 1)`) and include those stable handlers in the `useEffect` dependencies instead of the state itself.

## 2025-05-15 - [CI Node Version Alignment]
**Learning:** Cloudflare Pages builds rely on `.nvmrc` to determine the Node.js version. If this version is set to a bleeding-edge version (like 24.x) that isn't fully supported by the platform's build image, the build will fail even if the code is correct.
**Action:** Align `.nvmrc` and `package.json` engines with stable, broadly supported LTS versions (e.g., Node 22) to ensure CI/CD reliability.
