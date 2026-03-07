---
"react-web3-icons": major
---

Drop CommonJS (CJS) output — distribute ESM only.

The library now publishes only `.mjs` and `.d.mts` files. CommonJS `require()` is no longer supported.

Most modern bundlers (Vite, Webpack 5, Next.js, etc.) and runtimes (Node.js 22+) fully support ESM natively. Dropping CJS reduces published package size and removes the tsdown CJS deprecation warning.

**Migration:** If you were using `require('react-web3-icons')`, switch to ESM `import` syntax. No import paths or API surface changed.
