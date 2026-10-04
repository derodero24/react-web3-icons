import { createIcon } from '../utils';

// Source: https://cownation.notion.site/CoW-DAO-Brand-Kit-dad6212f182f49d38683e8410bfb37d2 (official CoW DAO brand kit, linked as "Brand Kit" in the cow.fi footer; CoW-logos.zip, CoW Protocol/icon/light/svg/CoW-Protocol-icon-light-purple.svg)
// The unit is CoW Protocol (export CowProtocol, slug cowprotocol): the brand kit gives CoW Protocol its own purple mark, distinct from CoW Swap (#012F7A / #65D9FF blue, the trading app built on the protocol) and CoW DAO (#23191A / #FFEDEC), so the CoW Protocol mark is used
// Colored: CoW-Protocol-icon-light-purple.svg unchanged (#490072, the kit variant for light backgrounds; the dark-background variant is #F996EE), placed on the 64 grid; it replaces #004293 paths taken from @web3icons/react, which matched no official file
// Mono: the same path in currentColor, eyes knocked out as in the kit
/** Cow Protocol DEX icon (colored). */
export const CowProtocol = /* @__PURE__ */ createIcon(
  'CowProtocol',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M25.24 50.71a6.2 6.2 0 0 1-5.94-4.35l-4.22-13.32h-2.6a6.2 6.2 0 0 1-5.94-4.35l-2.51-7.9h9.41L8.47 13.3h47.06l-4.97 7.48h9.41l-2.5 7.92a6.2 6.2 0 0 1-5.95 4.35h-2.6L44.7 46.36a6.2 6.2 0 0 1-5.94 4.35zm-3.19-21.3c0 2 1.5 3.64 3.35 3.64s3.35-1.63 3.35-3.64-1.5-3.64-3.35-3.64-3.35 1.63-3.35 3.64m19.9 0c0 2-1.5 3.64-3.35 3.64s-3.35-1.63-3.35-3.64 1.5-3.64 3.35-3.64 3.35 1.63 3.35 3.64"
    />
  ),
  { fill: '#490072' },
);

/** Cow Protocol DEX icon (monochrome). */
export const CowProtocolMono = /* @__PURE__ */ createIcon(
  'CowProtocolMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M25.24 50.71a6.2 6.2 0 0 1-5.94-4.35l-4.22-13.32h-2.6a6.2 6.2 0 0 1-5.94-4.35l-2.51-7.9h9.41L8.47 13.3h47.06l-4.97 7.48h9.41l-2.5 7.92a6.2 6.2 0 0 1-5.95 4.35h-2.6L44.7 46.36a6.2 6.2 0 0 1-5.94 4.35zm-3.19-21.3c0 2 1.5 3.64 3.35 3.64s3.35-1.63 3.35-3.64-1.5-3.64-3.35-3.64-3.35 1.63-3.35 3.64m19.9 0c0 2-1.5 3.64-3.35 3.64s-3.35-1.63-3.35-3.64 1.5-3.64 3.35-3.64 3.35 1.63 3.35 3.64"
    />
  ),
  { fill: 'currentColor' },
);
