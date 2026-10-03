---
"react-web3-icons": patch
---

Make the static SVG files safe to inline together and fix the Iconify metadata.

- `react-web3-icons/svg/*`: internal ids (gradients, masks, clip paths) are now prefixed per file as `w3i-<category>-<kebab-name>_<id>` (e.g. `w3i-chain-ethereum-circle-mono_ethc-a`), with every `url(#…)` reference (including `URL(#…)`) updated, so two inlined SVGs no longer collide on ids like `id="a"`. Iconify bodies use the same `<icon-name>_<id>` form, which keeps ids of different icons distinct even when one icon name is a prefix of another. Files are also serialized uniformly (one element per line). Rendering is unchanged.
- `react-web3-icons/iconify.json` and `iconify-mono.json`: `info.height` was hard-coded to 24 although most icons keep their native viewBox (64, 40, 2500, …). It is now omitted, as the IconifyJSON spec prescribes when icon heights differ; each icon's own `width`/`height` is unchanged.
- Attribute values keep their meaning through the build: literal line breaks inside an attribute are normalized to spaces as XML requires, and line breaks written as character references (`&#10;`) are kept instead of being collapsed.
