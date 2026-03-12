---
"react-web3-icons": minor
---

Add static SVG file exports to the npm package.

Running `pnpm run build` now also executes `scripts/generate-svgs.mjs`, which renders every icon component to a static `.svg` file and writes them to `dist/svg/<category>/<Name>.svg`. These files are included in the published package (already covered by the `"files": ["dist"]` field).

This enables use in non-React environments — Vue, Svelte, Angular, static HTML, CDN delivery, Figma plugins, and any toolchain that can import or reference plain SVG files.
