import { createIcon } from '../utils';

// Paths sourced from privy-io/examples (MIT) — Privy logomark (circle + shadow ellipse)
/** Privy devtool icon (colored). */
export const Privy = /* @__PURE__ */ createIcon(
  'Privy',
  '0 0 64 64',
  () => (
    <>
      <path d="M31.992 47.388c11.974 0 21.684-9.71 21.684-21.685S43.966 4.018 31.992 4.018 10.307 13.73 10.307 25.703c0 11.975 9.71 21.685 21.685 21.685" />
      <path d="M31.991 59.995c8.184 0 14.82-1.396 14.82-3.11s-6.632-3.11-14.82-3.11-14.82 1.397-14.82 3.11 6.632 3.11 14.82 3.11" />
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
      <path d="M31.992 47.388c11.974 0 21.684-9.71 21.684-21.685S43.966 4.018 31.992 4.018 10.307 13.73 10.307 25.703c0 11.975 9.71 21.685 21.685 21.685" />
      <path d="M31.991 59.995c8.184 0 14.82-1.396 14.82-3.11s-6.632-3.11-14.82-3.11-14.82 1.397-14.82 3.11 6.632 3.11 14.82 3.11" />
    </>
  ),
  { fill: 'currentColor' },
);
