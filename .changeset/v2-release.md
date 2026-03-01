---
"react-web3-icons": major
---

### Breaking Changes

- **React 18+ required**: Narrowed peer dependency from `>=16` to `>=18` to enable modern APIs (`useId`, `forwardRef` improvements)
- **`IconProps` type changed**: Now extends `SVGProps<SVGSVGElement>` instead of `SVGAttributes<SVGElement>`, providing more precise typing for SVG elements
- **New `size` prop**: All icons accept a `size` prop (defaults to `"1em"`) that sets both `width` and `height`. If you previously passed non-standard props that happen to be named `size`, they will now be intercepted
- **`type: module`**: Package now sets `"type": "module"` in package.json. Dual CJS/ESM exports are still provided, so most consumers are unaffected

### New Features

- **`createIcon` factory**: All icon components are now built with a shared factory that provides consistent behavior
- **Ref forwarding**: All icons support `React.forwardRef` for direct DOM access
- **`size` prop**: Unified sizing via a single `size` prop (e.g., `<Ethereum size={24} />`)
- **`title` / `titleId` props**: Built-in accessible labeling support
- **Automatic `aria-hidden`**: Icons without an accessible name (`title`, `aria-label`, or `aria-labelledby`) are automatically marked as decorative
- **Dynamic SVG IDs**: Internal `<mask>`, `<linearGradient>`, `<clipPath>`, and `<filter>` IDs are generated via `useId()` to prevent collisions when multiple icons render on the same page
- **Tree-shaking**: Added `"sideEffects": false` to package.json for optimal bundle sizes

### Bug Fixes

- Fix SVG ID collisions when rendering multiple instances of the same icon
- Fix ArbitrumNovaMono viewBox clipping
- Fix MetaMask2 inline `<style>` tag replaced with inline styles for CSP compatibility
- Fix stroke rendering on TruffleMono and GanacheMono icons
- Fix `fill="none"` missing on NftStorageMono masked stroke paths
- Fix `size` prop handling in Coinpanda multi-variant components

### Internal

- Migrated build tool from dts-cli → tsup → tsdown
- Modernized TypeScript configuration (target ES2022, moduleResolution Bundler)
- Optimized large SVG files with shared path constants
- Excluded source files from npm package for smaller install size
