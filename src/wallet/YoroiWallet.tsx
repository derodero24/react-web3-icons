import { createIcon } from '../utils';

// Source: https://yoroi-wallet.com/assets/logo-yoroi-blue.svg
// Colored: the five #4B63F6 paths of the symbol, copied unchanged out of the official logo-yoroi-blue.svg lockup (the YOROI / Wallet lettering and rules are left out), placed on the 64 grid
// Mono: the same five paths in currentColor
/** Yoroi Wallet wallet icon (colored). */
export const YoroiWallet = /* @__PURE__ */ createIcon(
  'YoroiWallet',
  '0 0 64 64',
  () => (
    <>
      <path d="M10.14 19.95v6.08q0 .08.03.12c10.93 7.6 21.78 15.2 32.68 22.8l4.44-3.1c-12.4-8.62-24.73-17.22-37.15-25.9" />
      <path d="M38.14 16.45c-1.98 1.37-3.96 2.7-5.94 4.07-.28.18-.45.2-.72 0l-7.34-5.1q-3.82-2.74-7.68-5.45l-3.64-2.55H4l1.24.88 6.91 4.82 6.84 4.8 6.42 4.53q3.06 2.11 6.12 4.28c.22.15.37.15.6 0 1.63-1.16 3.29-2.26 4.95-3.4q6.09-4.25 12.19-8.46 4.44-3.08 8.87-6.12L60 7.45h-8.85c-4.33 2.97-8.65 6-13 9" />
      <path d="m10.2 35.13-.06.12v5.98l.03.12L32 56.58h.02l4.44-3.15z" />
      <path d="M53.78 19.97c-5.45 3.8-10.83 7.58-16.23 11.36q.1.14.17.2l4.12 2.92c.02.03.1.03.14.03l11.77-8.2.05-.1v-6.2z" />
      <path d="m53.78 35.35-5.43 3.78 4.21 3.02 1.22-.85z" />
    </>
  ),
  { fill: '#4B63F6' },
);

/** Yoroi Wallet wallet icon (monochrome). */
export const YoroiWalletMono = /* @__PURE__ */ createIcon(
  'YoroiWalletMono',
  '0 0 64 64',
  () => (
    <>
      <path d="M10.14 19.95v6.08q0 .08.03.12c10.93 7.6 21.78 15.2 32.68 22.8l4.44-3.1c-12.4-8.62-24.73-17.22-37.15-25.9" />
      <path d="M38.14 16.45c-1.98 1.37-3.96 2.7-5.94 4.07-.28.18-.45.2-.72 0l-7.34-5.1q-3.82-2.74-7.68-5.45l-3.64-2.55H4l1.24.88 6.91 4.82 6.84 4.8 6.42 4.53q3.06 2.11 6.12 4.28c.22.15.37.15.6 0 1.63-1.16 3.29-2.26 4.95-3.4q6.09-4.25 12.19-8.46 4.44-3.08 8.87-6.12L60 7.45h-8.85c-4.33 2.97-8.65 6-13 9" />
      <path d="m10.2 35.13-.06.12v5.98l.03.12L32 56.58h.02l4.44-3.15z" />
      <path d="M53.78 19.97c-5.45 3.8-10.83 7.58-16.23 11.36q.1.14.17.2l4.12 2.92c.02.03.1.03.14.03l11.77-8.2.05-.1v-6.2z" />
      <path d="m53.78 35.35-5.43 3.78 4.21 3.02 1.22-.85z" />
    </>
  ),
  { fill: 'currentColor' },
);
