---
"react-web3-icons": minor
---

Deprecate `OpenSeaAlt` (#837). It is the pre-2025 white-disc OpenSea logomark (`#2081E2` ship), and the current OpenSea brand (`#0086FF`) has no white-disc asset to replace it with. Use `OpenSea` or `OpenSeaSymbol` instead. The export keeps working with unchanged artwork through v5, is listed in `DEPRECATED_ICON_NAMES`, is marked `deprecated: true` in the manifest, and is hidden in the Iconify collection (`marketplace-open-sea-alt`). The earliest removal is v6.
