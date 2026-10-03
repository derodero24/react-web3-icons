import { createIcon } from '../utils';

// Source: https://raw.githubusercontent.com/lidofinance/ethereum-staking-widget/main/public/favicon-1080x1080.svg
// Source: https://lido.fi (one-colour header mark)
// Drop paths from the official favicon-1080x1080.svg (lidofinance/ethereum-staking-widget), without its white background circle; flat #00A3FF at the official 1 / 0.6 / 0.2 facet opacities, as in the lido.fi header mark
// Mono: the official one-colour mark from the lido.fi header (the bowl, and the kite drawn as an outline around a kite-shaped hole), paths copied and uniformly scaled onto the coloured drop
/** Lido DeFi icon (colored). */
export const Lido = /* @__PURE__ */ createIcon(
  'Lido',
  '0 0 64 64',
  () => (
    <>
      <path d="m15.59 29.17-.45.69c-5.05 7.75-3.92 17.9 2.71 24.4C21.75 58.08 26.87 60 32 60z" />
      <path d="m31.98 38.54-16.4-9.37L31.98 60z" opacity=".6" />
      <path
        d="m48.4 29.17.46.69c5.05 7.75 3.92 17.9-2.72 24.4-3.9 3.82-9.02 5.74-14.13 5.74z"
        opacity=".6"
      />
      <path d="m32 38.54 16.4-9.37L32 60z" opacity=".2" />
      <path d="M32.01 17.61v16.16l14.13-8.07z" opacity=".2" />
      <path d="M32 17.61 17.88 25.7 32 33.77z" opacity=".6" />
      <path d="M32 4.02 17.88 25.7 32 17.6z" />
      <path d="m32.01 17.6 14.14 8.1L32.01 4z" opacity=".6" />
    </>
  ),
  { fill: '#00A3FF' },
);

/** Lido DeFi icon (monochrome). */
export const LidoMono = /* @__PURE__ */ createIcon(
  'LidoMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M48.92 29.86c5.08 7.75 3.95 17.9-2.72 24.4-7.85 7.65-20.57 7.65-28.4 0-6.67-6.5-7.8-16.65-2.73-24.4l.45-.69 16.47 9.37 16.48-9.37zm-2.7-4.16L32 33.77 17.8 25.7 32 4zm-24.07-1.03 9.86 5.6 9.86-5.6L32 9.62z"
    />
  ),
  { fill: 'currentColor' },
);
