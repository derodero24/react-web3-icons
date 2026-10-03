import { createIcon } from '../utils';

// Source: https://lido.fi/static/LIDO_press_kit.zip (official 2026 press kit: Lido/Logomark/Standart/No background/SVG/Lido_Color.svg, Lido_Black.svg)
// Default: the 2026 press-kit logomark (Lido_Color.svg, #0085FF: the kite drawn as an outline around a kite-shaped hole over a solid bowl), paths unchanged and placed on the 64 grid. It replaces the retired faceted #00A3FF drop of the old favicon-1080x1080.svg
// Mono: the kit's one-colour logomark (Lido_Black.svg, same geometry) in currentColor; it matches the one-colour mark in the lido.fi header
/** Lido DeFi icon (colored). */
export const Lido = /* @__PURE__ */ createIcon(
  'Lido',
  '0 0 64 64',
  () => (
    <>
      <path
        fillRule="evenodd"
        d="M32 4.02 45.95 25.7l-13.93 8.07-13.94-8.07zm-9.66 20.65L32 9.63l9.67 15.04-9.67 5.6z"
      />
      <path d="m32 38.53-16.17-9.35-.44.68a19.5 19.5 0 0 0 2.67 24.39c7.7 7.64 20.17 7.64 27.87 0a19.5 19.5 0 0 0 2.67-24.4l-.44-.67z" />
    </>
  ),
  { fill: '#0085FF' },
);

/** Lido DeFi icon (monochrome). */
export const LidoMono = /* @__PURE__ */ createIcon(
  'LidoMono',
  '0 0 64 64',
  () => (
    <>
      <path
        fillRule="evenodd"
        d="M32 4.02 45.95 25.7l-13.93 8.07-13.94-8.07zm-9.66 20.65L32 9.63l9.67 15.04-9.67 5.6z"
      />
      <path d="m32 38.53-16.17-9.35-.44.68a19.5 19.5 0 0 0 2.67 24.39c7.7 7.64 20.17 7.64 27.87 0a19.5 19.5 0 0 0 2.67-24.4l-.44-.67z" />
    </>
  ),
  { fill: 'currentColor' },
);
