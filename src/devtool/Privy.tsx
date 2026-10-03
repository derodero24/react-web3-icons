import { createIcon } from '../utils';

// Paths sourced from privy-io/examples (MIT) — Privy logomark (circle + shadow ellipse)
/** Privy devtool icon (colored). */
export const Privy = /* @__PURE__ */ createIcon(
  'Privy',
  '0 0 64 64',
  () => (
    <>
      <path d="M32 47.39c11.97 0 21.68-9.71 21.68-21.69S43.97 4.02 31.99 4.02s-21.68 9.7-21.68 21.68S20 47.4 31.99 47.4" />
      <path d="M32 60c8.17 0 14.81-1.4 14.81-3.11 0-1.72-6.63-3.11-14.82-3.11s-14.82 1.4-14.82 3.1C17.17 58.6 23.8 60 32 60" />
    </>
  ),
  { fill: '#5B4FFF' },
);

/** Privy devtool icon (monochrome). */
export const PrivyMono = /* @__PURE__ */ createIcon(
  'PrivyMono',
  '0 0 64 64',
  () => (
    <>
      <path d="M32 47.39c11.97 0 21.68-9.71 21.68-21.69S43.97 4.02 31.99 4.02s-21.68 9.7-21.68 21.68S20 47.4 31.99 47.4" />
      <path d="M32 60c8.17 0 14.81-1.4 14.81-3.11 0-1.72-6.63-3.11-14.82-3.11s-14.82 1.4-14.82 3.1C17.17 58.6 23.8 60 32 60" />
    </>
  ),
  { fill: 'currentColor' },
);
