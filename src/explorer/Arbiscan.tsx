// Source: re-export of Arbitrum — see src/chain/Arbitrum.tsx. Arbiscan has no mark of its own, so the artwork now lives in one place
// Source: https://arbiscan.io/brandassets (Arbiscan brand assets, accessed 2026-10-09: logos.zip, logos/logo-symbol.svg)
// Source: https://arbiscan.io/assets/arbitrum/images/svg/brandassets/logo-symbol.svg
// Source: https://arbiscan.io/assets/arbitrum/images/svg/logos/chain-light.svg (the same file in the site header)
// Source: https://arbitrumfoundation.notion.site/Arbitrum-brand-guidelines-6014e69d7b574f378a50f5ee678495d3 (Arbitrum Foundation brand kit: AllWhite_Logos_Logomark_RGB.svg, the Mono)
// Arbiscan has no mark of its own: its brand assets page (headed "Arbitrum One Brand Assets & Guidelines") ships the Arbitrum logomark as logo-symbol.svg, and the header logo (logos/logo-light.svg) is that logomark beside an ARBISCAN wordmark
// Arbiscan re-exports Arbitrum: Arbiscan's logo-symbol.svg (byte-identical to the site's chain-light.svg and chain-dark.svg) matched the Arbitrum default to about 0.02 units
// ArbiscanMono re-exports ArbitrumMono: Arbiscan publishes no one-colour symbol, so its mono is the Arbitrum brand kit's one-colour logomark (AllWhite_Logos_Logomark_RGB.svg), the artwork of ArbitrumMono (the ring and the four strokes in ink, the navy body left open; docs/icon-variants.md, mono rule 5)
export {
  Arbitrum as Arbiscan,
  ArbitrumMono as ArbiscanMono,
} from '../chain/Arbitrum';
