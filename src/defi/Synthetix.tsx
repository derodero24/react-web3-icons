import { createIcon } from '../utils';

// Source: https://synthetix.io/brand/brand-kit/icon/snx-icon-primary.svg
// Source: https://synthetix.io/brand/brand-kit/icon/snx-icon-black.svg
// Colored: the official brand-kit icon snx-icon-primary.svg (#00D1FF), without its no-op clip path
// Mono: the official one-colour snx-icon-black.svg (same path) in currentColor
/** Synthetix DeFi icon (colored). */
export const Synthetix = /* @__PURE__ */ createIcon(
  'Synthetix',
  '0 0 64 64',
  () => (
    <path d="M17.53 21.56q-.59-.67-1.45-.67H4.35a.3.3 0 0 1-.25-.1.3.3 0 0 1-.1-.21v-7.82a.3.3 0 0 1 .1-.21q.1-.1.25-.1h12.4q4.69 0 8.1 3.8l3 3.63L22 26.95zM39.2 16.2q3.39-3.75 8.13-3.75h12.36q.15 0 .23.08t.08.23v7.82q0 .12-.08.21-.08.1-.23.1H47.96q-.87 0-1.45.67l-8.64 10.4 8.68 10.46q.59.63 1.4.63H59.7q.15 0 .23.1a.4.4 0 0 1 .08.25v7.82q0 .11-.08.21t-.23.1H47.33q-4.73 0-8.1-3.8l-7.2-8.67-7.19 8.68q-3.4 3.8-8.13 3.79H4.35q-.15 0-.23-.1a.4.4 0 0 1-.08-.25v-7.82q0-.12.08-.21.08-.1.23-.1h11.73q.82 0 1.45-.67l8.49-10.23z" />
  ),
  { fill: '#00D1FF' },
);

/** Synthetix DeFi icon (monochrome). */
export const SynthetixMono = /* @__PURE__ */ createIcon(
  'SynthetixMono',
  '0 0 64 64',
  () => (
    <path d="M17.53 21.56q-.59-.67-1.45-.67H4.35a.3.3 0 0 1-.25-.1.3.3 0 0 1-.1-.21v-7.82a.3.3 0 0 1 .1-.21q.1-.1.25-.1h12.4q4.69 0 8.1 3.8l3 3.63L22 26.95zM39.2 16.2q3.39-3.75 8.13-3.75h12.36q.15 0 .23.08t.08.23v7.82q0 .12-.08.21-.08.1-.23.1H47.96q-.87 0-1.45.67l-8.64 10.4 8.68 10.46q.59.63 1.4.63H59.7q.15 0 .23.1a.4.4 0 0 1 .08.25v7.82q0 .11-.08.21t-.23.1H47.33q-4.73 0-8.1-3.8l-7.2-8.67-7.19 8.68q-3.4 3.8-8.13 3.79H4.35q-.15 0-.23-.1a.4.4 0 0 1-.08-.25v-7.82q0-.12.08-.21.08-.1.23-.1h11.73q.82 0 1.45-.67l8.49-10.23z" />
  ),
  { fill: 'currentColor' },
);
