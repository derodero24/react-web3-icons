import { createIcon } from '../utils';

// Source: https://arbiscan.io/brandassets (Arbiscan brand assets, accessed 2026-10-09: logos.zip, logos/logo-symbol.svg)
// Source: https://arbiscan.io/assets/arbitrum/images/svg/brandassets/logo-symbol.svg
// Source: https://arbiscan.io/assets/arbitrum/images/svg/logos/chain-light.svg (the same file in the site header)
// Source: https://arbitrumfoundation.notion.site/Arbitrum-brand-guidelines-6014e69d7b574f378a50f5ee678495d3 (Arbitrum Foundation brand kit: AllWhite_Logos_Logomark_RGB.svg, the Mono)
// Arbiscan has no mark of its own: its brand assets page ("Arbitrum One Brand Assets & Guidelines") ships the Arbitrum logomark as logo-symbol.svg, and the header logo (logos/logo-light.svg) is that logomark beside an ARBISCAN wordmark
// Default: logo-symbol.svg from logos.zip (byte-identical to the site's chain-light.svg and chain-dark.svg), paths unchanged and placed on the 64 grid without the file's near-no-op clip path; it matches the Arbitrum default to about 0.02 units
// Mono: Arbiscan publishes no one-colour symbol, so it is the Arbitrum brand kit's one-colour logomark (AllWhite_Logos_Logomark_RGB.svg) in currentColor, the same artwork as ArbitrumMono: the ring and the four strokes in ink, the navy body left open (docs/icon-variants.md, mono rule 5). It replaces a hand-built filled hexagon with the strokes knocked out
/** Arbiscan explorer icon (colored). */
export const Arbiscan = /* @__PURE__ */ createIcon(
  'Arbiscan',
  '0 0 64 64',
  () => (
    <>
      <path
        fill="#213147"
        d="M9.07 21.03v21.94c0 1.4.75 2.7 1.96 3.4l19 10.98c1.21.7 2.7.7 3.92 0l19-10.98c1.21-.7 1.96-2 1.96-3.4V21.03c0-1.4-.75-2.7-1.96-3.4l-19-10.98c-1.22-.7-2.7-.7-3.92 0l-19 10.98c-1.22.7-1.96 2-1.96 3.4"
      />
      <path
        fill="#12AAFF"
        d="m36.13 36.26-2.7 7.43a1 1 0 0 0 0 .64l4.66 12.8L43.48 54 37 36.26a.46.46 0 0 0-.88 0"
      />
      <path
        fill="#12AAFF"
        d="M41.57 23.75a.46.46 0 0 0-.88 0L38 31.2a1 1 0 0 0 0 .64l7.63 20.94 5.4-3.11z"
      />
      <path
        fill="#9DCCED"
        fillRule="evenodd"
        d="M31.99 7.47q.2 0 .38.1l20.56 11.88c.24.14.39.4.39.67v23.75q-.02.44-.39.67L32.37 56.4a1 1 0 0 1-.38.1 1 1 0 0 1-.39-.1L11.04 44.55a.8.8 0 0 1-.39-.67V20.12c0-.27.15-.52.39-.66L31.6 7.58q.18-.1.39-.1m0-3.46c-.73 0-1.47.18-2.13.57L9.31 16.45a4.2 4.2 0 0 0-2.13 3.67v23.76c0 1.51.81 2.91 2.13 3.67l20.56 11.88q1 .57 2.12.57c.73 0 1.47-.19 2.12-.57l20.56-11.88a4.2 4.2 0 0 0 2.13-3.67V20.12c0-1.51-.81-2.91-2.13-3.67L34.11 4.58A4 4 0 0 0 31.99 4"
      />
      <path fill="#213147" d="m18.39 52.8 1.89-5.18 3.8 3.16-3.55 3.25z" />
      <path
        fill="#fff"
        d="M30.25 18.42h-5.2a.9.9 0 0 0-.88.62L12.99 49.68l5.4 3.12 12.3-33.75a.46.46 0 0 0-.44-.63"
      />
      <path
        fill="#fff"
        d="M39.38 18.42h-5.22a.9.9 0 0 0-.87.62L20.53 54.03l5.4 3.11 13.88-38.1a.47.47 0 0 0-.43-.62"
      />
    </>
  ),
  {},
);

/** Arbiscan explorer icon (monochrome). */
export const ArbiscanMono = /* @__PURE__ */ createIcon(
  'ArbiscanMono',
  '0 0 64 64',
  () => (
    <>
      <path d="m36.15 36.26-2.72 7.43a1 1 0 0 0 0 .64l4.67 12.8L43.5 54l-6.48-17.75a.46.46 0 0 0-.87 0m5.43-12.5a.46.46 0 0 0-.87 0L38 31.18a1 1 0 0 0 0 .64l7.64 20.94 5.4-3.11z" />
      <path d="M32 7.47q.2 0 .38.1l20.58 11.88c.23.14.38.4.38.67v23.75q-.02.44-.38.67L32.38 56.42q-.17.1-.38.1c-.21 0-.27-.04-.39-.1L11.04 44.55a.8.8 0 0 1-.39-.67V20.12c0-.27.15-.53.39-.67L31.6 7.58q.18-.1.39-.11M32 4c-.73 0-1.47.19-2.13.57L9.3 16.44a4.2 4.2 0 0 0-2.12 3.68v23.75a4.2 4.2 0 0 0 2.12 3.68l20.58 11.88a4.2 4.2 0 0 0 4.25 0L54.7 47.55a4.2 4.2 0 0 0 2.12-3.68V20.12a4.2 4.2 0 0 0-2.12-3.68L34.12 4.57A4 4 0 0 0 32 4" />
      <path d="M30.26 18.42h-5.21a.9.9 0 0 0-.88.61L13 49.68l5.4 3.12 12.3-33.75a.46.46 0 0 0-.44-.63m9.13 0h-5.22a.9.9 0 0 0-.87.61l-12.76 35 5.39 3.12 13.9-38.1a.47.47 0 0 0-.44-.63" />
    </>
  ),
  { fill: 'currentColor' },
);
