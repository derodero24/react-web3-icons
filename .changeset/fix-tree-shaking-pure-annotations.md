---
'react-web3-icons': patch
---

Fix tree-shaking: annotate every `createIcon` call with `/* @__PURE__ */`. Without the annotation, bundlers had to assume the calls were side-effectful and kept the whole category chunk, so importing a single icon bundled ~55–150 KB. A single-icon import now bundles ~3.3 KB minified (~1.5 KB gzip) in webpack, Rollup, and esbuild. A size-limit scenario and a source-level test now guard the annotation.
