import { createIcon } from '../utils';

// Source: https://tensor.foundation (official Tensor Foundation site, header logo inline SVG, #000)
// Source: https://www.tensor.trade (official marketplace header logo, same path in white)
// Source: https://files.readme.io/7855997-white-on-transparent.svg (Tensor Developer Hub dev.tensor.trade logo, same geometry)
// Default: the two-part arrow path served inline on tensor.foundation in #000 (viewBox 0 0 1263 1280). tensor.trade and dev.tensor.trade serve the same geometry in white; no Tensor brand kit was found.
// Mono: the same path in currentColor.
/** Tensor marketplace icon (colored). */
export const Tensor = /* @__PURE__ */ createIcon(
  'Tensor',
  '0 0 64 64',
  () => (
    <path d="M28.14 7.94 4 32.14h10.55l6.62-6.61v23.54l6.96 6.96zm7.73 0L60 32.14H49.45l-6.62-6.61v23.54l-6.96 6.96z" />
  ),
  { fill: '#000' },
);

/** Tensor marketplace icon (monochrome). */
export const TensorMono = /* @__PURE__ */ createIcon(
  'TensorMono',
  '0 0 64 64',
  () => (
    <path d="M28.14 7.94 4 32.14h10.55l6.62-6.61v23.54l6.96 6.96zm7.73 0L60 32.14H49.45l-6.62-6.61v23.54l-6.96 6.96z" />
  ),
  { fill: 'currentColor' },
);
