import { createIcon } from '../utils';

// Source: https://celo.org/brand-kit (official Celo Brand Kit, accessed 2026-10-24: Symbol, "Download")
// Source: https://drive.google.com/file/d/1TlwA79ZvGTxcpsIOyUxoAJHMs1TfAL_q/view (Celo_Symbol_RGB_ProsperityYellow.svg in the brand kit's RGB folder)
// Source: https://drive.google.com/file/d/1eQheMQOj0JegPF-7xcQ2XfL_yXIcPHbT/view (Celo_Symbol_RGB_Onyx.svg, same geometry)
// Default: the official Celo_Symbol_RGB_ProsperityYellow.svg, the symbol in Prosperity Yellow #FCFF52 (the brand kit's primary colour), path unchanged. It replaces legacy third-party artwork (@web3icons/react, MIT) in #FCFE52 that redrew the symbol with a circular arc
// Mono: the same path in currentColor, as the kit's one-colour Onyx, Gypsum and Snow symbols
/** Celo chain icon (colored). */
export const Celo = /* @__PURE__ */ createIcon(
  'Celo',
  '0 0 64 64',
  () => (
    <path d="M59.98 4.02H4.02v55.96h55.96V40.45h-9.3c-3.2 7.13-10.4 12.08-18.64 12.08-11.36 0-20.57-9.3-20.57-20.57-.01-11.28 9.2-20.49 20.57-20.49 8.4 0 15.6 5.11 18.8 12.4h9.14z" />
  ),
  { fill: '#FCFF52' },
);

/** Celo chain icon (monochrome). */
export const CeloMono = /* @__PURE__ */ createIcon(
  'CeloMono',
  '0 0 64 64',
  () => (
    <path d="M59.98 4.02H4.02v55.96h55.96V40.45h-9.3c-3.2 7.13-10.4 12.08-18.64 12.08-11.36 0-20.57-9.3-20.57-20.57-.01-11.28 9.2-20.49 20.57-20.49 8.4 0 15.6 5.11 18.8 12.4h9.14z" />
  ),
  { fill: 'currentColor' },
);
