import { createIcon } from '../utils';

// Source: https://etherscan.io/images/brandassets/etherscan-logo-circle.svg
// Source: https://etherscan.io/images/brandassets/etherscan-logo-circle-light.svg
// Source: https://etherscan.io/brandassets (official brand assets page: both files are among its downloads and in its Download Brand Package, https://etherscan.io/images/brandassets/logos.zip, under logos/)
// Etherscan: the brand asset etherscan-logo-circle.svg (#21325B mark, #979695 arc), placed on the 64 grid unchanged
// EtherscanMono: both paths of that file in currentColor; the brand package has no one-colour SVG
// EtherscanInverted: the brand asset etherscan-logo-circle-light.svg (white mark, #8B8B8B arc), placed on the 64 grid unchanged; it has the same geometry as the default. etherscan-logo-light-circle.svg (#BFCFDA arc), which an unreleased change (#853) briefly used for the Inverted variant, is served from the same folder but linked from neither the brand page nor the brand package, so it is not used (accessed 2026-10-09)
/** Etherscan explorer icon (colored). */
export const Etherscan = /* @__PURE__ */ createIcon(
  'Etherscan',
  '0 0 64 64',
  () => (
    <>
      <path
        fill="#21325b"
        d="M15.64 30.62a2.4 2.4 0 0 1 .7-1.68 2 2 0 0 1 .77-.51q.45-.18.91-.18l3.96.01a2.4 2.4 0 0 1 2.37 2.38v14.95l1.65-.42a2 2 0 0 0 1.52-1.93V24.7a2.4 2.4 0 0 1 2.38-2.38h3.96a2.37 2.37 0 0 1 2.38 2.38v17.2l1.95-.8a2 2 0 0 0 1.22-1.83V18.76a2.4 2.4 0 0 1 2.37-2.38h3.96a2.4 2.4 0 0 1 2.38 2.38v16.89c3.43-2.49 6.91-5.48 9.68-9.08a4 4 0 0 0 .77-1.79 4 4 0 0 0-.17-1.94A28 28 0 0 0 42.98 6.31a28 28 0 0 0-22.61.26 28 28 0 0 0-15.03 16.9 28 28 0 0 0 2.38 22.5 3.5 3.5 0 0 0 3.37 1.74q1.13-.1 2.8-.29a2 2 0 0 0 1.75-1.96z"
      />
      <path
        fill="#979695"
        d="M15.55 54.6A27.99 27.99 0 0 0 60 31.96a28 28 0 0 0-.07-1.92C49.7 45.3 30.83 52.42 15.55 54.6"
      />
    </>
  ),
  {},
);

/** Etherscan Inverted explorer icon (colored). */
export const EtherscanInverted = /* @__PURE__ */ createIcon(
  'EtherscanInverted',
  '0 0 64 64',
  () => (
    <>
      <path
        fill="white"
        d="M15.64 30.62a2.37 2.37 0 0 1 2.38-2.37l3.96.01a2.37 2.37 0 0 1 2.37 2.38v14.94q.68-.2 1.64-.42a2 2 0 0 0 1.53-1.92V24.7a2.37 2.37 0 0 1 2.37-2.38h3.96a2.4 2.4 0 0 1 2.38 2.38v17.2l1.96-.8a2 2 0 0 0 1.2-1.83V18.76a2.37 2.37 0 0 1 2.38-2.38h3.96a2.37 2.37 0 0 1 2.38 2.38v16.88c3.44-2.48 6.91-5.47 9.68-9.07a4 4 0 0 0 .6-3.73 27.98 27.98 0 0 0-47.32-9.4 28 28 0 0 0-3.35 32.52 3.5 3.5 0 0 0 3.37 1.75q1.13-.1 2.8-.3a2 2 0 0 0 1.75-1.96z"
      />
      <path
        fill="#8B8B8B"
        d="M15.55 54.59a28 28 0 0 0 29.16 2.3 28 28 0 0 0 15.28-24.93q0-.97-.07-1.92C49.7 45.3 30.82 52.42 15.55 54.6"
      />
    </>
  ),
  {},
);

/** Etherscan explorer icon (monochrome). */
export const EtherscanMono = /* @__PURE__ */ createIcon(
  'EtherscanMono',
  '0 0 64 64',
  () => (
    <>
      <path d="M15.64 30.62a2.4 2.4 0 0 1 .7-1.68 2 2 0 0 1 .77-.51q.45-.18.91-.18l3.96.01a2.4 2.4 0 0 1 2.37 2.38v14.95l1.65-.42a2 2 0 0 0 1.52-1.93V24.7a2.4 2.4 0 0 1 2.38-2.38h3.96a2.37 2.37 0 0 1 2.38 2.38v17.2l1.95-.8a2 2 0 0 0 1.22-1.83V18.76a2.4 2.4 0 0 1 2.37-2.38h3.96a2.4 2.4 0 0 1 2.38 2.38v16.89c3.43-2.49 6.91-5.48 9.68-9.08a4 4 0 0 0 .77-1.79 4 4 0 0 0-.17-1.94A28 28 0 0 0 42.98 6.31a28 28 0 0 0-22.61.26 28 28 0 0 0-15.03 16.9 28 28 0 0 0 2.38 22.5 3.5 3.5 0 0 0 3.37 1.74q1.13-.1 2.8-.29a2 2 0 0 0 1.75-1.96z" />
      <path d="M15.55 54.6A27.99 27.99 0 0 0 60 31.96a28 28 0 0 0-.07-1.92C49.7 45.3 30.83 52.42 15.55 54.6" />
    </>
  ),
  { fill: 'currentColor' },
);
