---
"react-web3-icons": patch
---

The internal `createIcon` module that every icon imports no longer carries a second call form that no icon used. A single tree-shaken icon is 689 B instead of 766 B (minified and brotlied).
