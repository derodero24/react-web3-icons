---
"react-web3-icons": patch
---

Make the static SVG files safe to inline together and fix the Iconify metadata.

- `react-web3-icons/svg/*`: internal ids (gradients, masks, clip paths) are now prefixed per file as `w3i-<category>-<kebab-name>-<id>` (e.g. `w3i-chain-ethereum-circle-mono-ethc-a`), with every `url(#…)` reference updated, so two inlined SVGs no longer collide on ids like `id="a"`. Files are also serialized uniformly (one element per line). Rendering is unchanged.
- `react-web3-icons/iconify.json` and `iconify-mono.json`: `info.height` was hard-coded to 24 although most icons keep their native viewBox (64, 40, 2500, …). It is now omitted, as the IconifyJSON spec prescribes when icon heights differ; each icon's own `width`/`height` is unchanged.
