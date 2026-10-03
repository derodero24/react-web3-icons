import { createIcon } from '../utils';

// Source: https://layerzero.network (official site header logo)
// Source: https://publicdocs.notion.site (LayerZero Media Kit, Feb 2022: LayerZero_emblem.svg, LayerZero_logo.svg)
// Paths sourced from layerzero.network header logo (the "L0" glyph)
// The Media Kit's LayerZero_emblem.svg (Feb 2022) is an older one-piece emblem; the current site header draws the newer two-piece glyph used here, so ours is kept (checked 2026-10-03)
/** Layer Zero bridge icon (colored). */
export const LayerZero = /* @__PURE__ */ createIcon(
  'LayerZero',
  '0 0 64 64',
  () => (
    <>
      <path
        fill="#000000"
        d="M32 4c-2.1.02-4.19.44-6.13 1.26a16 16 0 0 0-5.17 3.52 16 16 0 0 0-3.45 5.24 16 16 0 0 0-1.19 6.17v5.34h12.95V17.8a2.8 2.8 0 0 1 .8-1.96 2.8 2.8 0 0 1 1.95-.81h.47a2.7 2.7 0 0 1 1.95.81 2.8 2.8 0 0 1 .8 1.96v20.76c1.7 0 3.39-.34 4.96-1s3-1.6 4.2-2.81 2.15-2.65 2.8-4.23.99-3.27.99-4.98V20.2c0-4.29-1.67-8.4-4.67-11.44a16 16 0 0 0-5.16-3.51A16 16 0 0 0 32 4"
      />
      <path
        fill="#000000"
        d="M32.23 49.06h-.47a2.7 2.7 0 0 1-1.94-.82A2.8 2.8 0 0 1 29 46.3V25.53c-1.7 0-3.38.34-4.95.99q-2.38.99-4.2 2.82a13 13 0 0 0-2.81 4.22 13 13 0 0 0-.99 4.98v5.27A16 16 0 0 0 17.23 50c.8 1.97 1.96 3.75 3.44 5.26s3.25 2.7 5.2 3.51a16 16 0 0 0 12.26 0c1.94-.81 3.7-2 5.19-3.51A16 16 0 0 0 46.76 50a16 16 0 0 0 1.17-6.18v-5.27H34.98v7.75a2.8 2.8 0 0 1-.8 1.96 2.8 2.8 0 0 1-1.95.8"
      />
    </>
  ),
  { fill: 'none' },
);

/** Layer Zero bridge icon (monochrome). */
export const LayerZeroMono = /* @__PURE__ */ createIcon(
  'LayerZeroMono',
  '0 0 64 64',
  () => (
    <>
      <path d="M32 4c-2.1.02-4.19.44-6.13 1.26a16 16 0 0 0-5.17 3.52 16 16 0 0 0-3.45 5.24 16 16 0 0 0-1.19 6.17v5.34h12.95V17.8a2.8 2.8 0 0 1 .8-1.96 2.8 2.8 0 0 1 1.95-.81h.47a2.7 2.7 0 0 1 1.95.81 2.8 2.8 0 0 1 .8 1.96v20.76c1.7 0 3.39-.34 4.96-1s3-1.6 4.2-2.81 2.15-2.65 2.8-4.23.99-3.27.99-4.98V20.2c0-4.29-1.67-8.4-4.67-11.44a16 16 0 0 0-5.16-3.51A16 16 0 0 0 32 4" />
      <path d="M32.23 49.06h-.47a2.7 2.7 0 0 1-1.94-.82A2.8 2.8 0 0 1 29 46.3V25.53c-1.7 0-3.38.34-4.95.99q-2.38.99-4.2 2.82a13 13 0 0 0-2.81 4.22 13 13 0 0 0-.99 4.98v5.27A16 16 0 0 0 17.23 50c.8 1.97 1.96 3.75 3.44 5.26s3.25 2.7 5.2 3.51a16 16 0 0 0 12.26 0c1.94-.81 3.7-2 5.19-3.51A16 16 0 0 0 46.76 50a16 16 0 0 0 1.17-6.18v-5.27H34.98v7.75a2.8 2.8 0 0 1-.8 1.96 2.8 2.8 0 0 1-1.95.8" />
    </>
  ),
  { fill: 'currentColor' },
);
