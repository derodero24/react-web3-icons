import { createIcon } from '../utils';

// Source: https://www.getmonero.org/press-kit/symbols/monero-symbol.ai (official press kit https://www.getmonero.org/press-kit/)
// Source: https://www.getmonero.org/press-kit/symbols/monero-symbol-1280.png (the press kit's RGB export of the same symbol, for the colours)
// Colored: the three paths of the official monero-symbol.ai (PDF-compatible) converted 1:1 with pdftocairo -svg (white disc, orange ring with the M, grey band), placed on the 64 grid as a container
// Colours: the .ai stores CMYK swatches, so the RGB values are the press kit's own RGB exports of the symbol, #FF6600 and #4C4C4C (#4C4C4C is also getmonero.org's grey); the white disc is CMYK 0/0/0/0
// Mono: the orange and grey paths in currentColor; the white disc (the M and the gaps) stays transparent
/** Xmr coin icon (colored). */
export const Xmr = /* @__PURE__ */ createIcon(
  'Xmr',
  '0 0 64 64',
  () => (
    <>
      <path
        fill="#FFF"
        d="M64 32c0 17.66-14.33 31.99-32 31.99s-32-14.33-32-32C0 14.34 14.34.02 32 .02S64 14.33 64 32"
      />
      <path
        fill="#F60"
        d="M32 0C14.34 0-.01 14.36 0 32c0 3.53.57 6.92 1.63 10.1h9.57V15.19L32 35.98l20.79-20.8V42.1h9.57A32 32 0 0 0 64 32c.02-17.67-14.34-32-32.01-32Zm0 0"
      />
      <path
        fill="#4C4C4C"
        d="m27.22 40.76-9.08-9.08v16.94H4.66C10.28 57.83 20.42 63.99 32 63.99s21.72-6.16 27.34-15.37H45.85V31.68l-9.07 9.08L32 45.54zm0 0"
      />
    </>
  ),
  {},
);

/** Xmr coin icon (monochrome). */
export const XmrMono = /* @__PURE__ */ createIcon(
  'XmrMono',
  '0 0 64 64',
  () => (
    <>
      <path d="M32 0C14.34 0-.01 14.36 0 32c0 3.53.57 6.92 1.63 10.1h9.57V15.19L32 35.98l20.79-20.8V42.1h9.57A32 32 0 0 0 64 32c.02-17.67-14.34-32-32.01-32Zm0 0" />
      <path d="m27.22 40.76-9.08-9.08v16.94H4.66C10.28 57.83 20.42 63.99 32 63.99s21.72-6.16 27.34-15.37H45.85V31.68l-9.07 9.08L32 45.54zm0 0" />
    </>
  ),
  { fill: 'currentColor' },
);
