---
"react-web3-icons": major
---

Give every rendered icon its own internal SVG ids, so masked and gradient icons render independently of other instances on the page.

- **Breaking:** icons with internal ids (masks, gradients, clip paths) now render per-instance ids (`w3i-<name>-<instance>-…`, e.g. `w3i-arbitrumcirclemono-r1-arb-circle-a`) instead of one shared id per component. Previously `url(#…)` resolved to the first instance on the page, so a first instance inside a `display: none` subtree, or with a different `fill` or `color`, broke or restyled every later one. Regenerate markup snapshots that contain these ids. See the [migration guide](https://github.com/derodero24/react-web3-icons/blob/develop/MIGRATION.md#1-per-instance-internal-svg-ids).
- These icons call `useId`, which React supports in Server Components: icons still render without `'use client'`, and icons without internal ids still call no hooks. A new test renders every icon under React's `react-server` build.
- Mask content no longer inherits `fill` from the icon's `<svg>`: `<HardhatMono fill="#fff" />` keeps its cut-outs. Default rendering is unchanged; `react-web3-icons/svg/*` and the Iconify sets carry the same explicit mask fills.
