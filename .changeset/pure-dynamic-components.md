---
"react-web3-icons": patch
---

The eight `react-web3-icons/dynamic` components are now `/* @__PURE__ */`-annotated, so a bundler drops the ones you do not import. Before, importing only `CoinIcon` also bundled the lazy import maps and lookup maps of the seven other categories: with esbuild and code splitting, the entry chunk shrinks from 37.2 KB to 10.9 KB (minified).
