---
"react-web3-icons": patch
---

fix(devtool): ChainlinkMono mask cutout now works with any currentColor

The `<mask>` element was placed outside `<defs>` (non-conformant SVG) and the inner hexagon cutout path had no explicit `fill`, causing it to inherit `currentColor`. When `currentColor` was white or light, the mask failed to cut out the center, rendering a solid hexagon instead of a ring. Both issues are now fixed: mask moved into `<defs>`, cutout path uses explicit `fill="#000"`.
