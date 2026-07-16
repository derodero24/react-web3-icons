---
'react-web3-icons': patch
---

Internal architecture: icons are now generated from an SVG-first source tree (`icons/`) instead of hand-written TSX. Rendered output is verified byte-identical (all snapshots unchanged), so nothing changes for consumers — except the static files under `react-web3-icons/svg/*`, which now ship with clean, stable internal ids instead of render-generated ones.
