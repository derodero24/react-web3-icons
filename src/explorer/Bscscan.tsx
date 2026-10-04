import { createIcon } from '../utils';

// Source: https://info.etherscan.com/explorer/bscscan/icon.svg
// Source: https://info.etherscan.com/explorer/bscscan/logo.svg
// bscscan.com (and its /brandassets page) sits behind a Cloudflare challenge; Etherscan, which runs BscScan, serves the BscScan files on info.etherscan.com (accessed 2026-10-04)
// Bscscan: matches the official icon.svg (#12161C mark, #F0B90B arc; silhouette IoU 0.995)
// BscscanInverted: matches the symbol of the official dark-background lockup logo.svg (group bscscan-logo-light-circle: #FFF mark, #F0B90B arc; IoU 0.996)
// BscscanMono: the same two paths in currentColor
/** Bscscan explorer icon (colored). */
export const Bscscan = /* @__PURE__ */ createIcon(
  'Bscscan',
  '0 0 64 64',
  () => (
    <>
      <path
        fill="#12161c"
        d="M15.64 30.62a2.37 2.37 0 0 1 2.38-2.37l3.95.01a2.4 2.4 0 0 1 2.38 2.38v14.95l1.64-.42a2 2 0 0 0 1.53-1.93V24.7a2.4 2.4 0 0 1 2.38-2.38h3.96a2.4 2.4 0 0 1 2.38 2.38v17.2l1.95-.8a2 2 0 0 0 1.22-1.83V18.76a2.4 2.4 0 0 1 2.37-2.38h3.96a2.4 2.4 0 0 1 2.38 2.38v16.89c3.43-2.49 6.91-5.48 9.67-9.08a4 4 0 0 0 .6-3.73A28 28 0 0 0 35.52 4.28a27.98 27.98 0 0 0-27.8 41.68 3.5 3.5 0 0 0 3.38 1.75q1.12-.1 2.8-.29a2 2 0 0 0 1.75-1.96z"
      />
      <path
        fill="#f0b90b"
        d="M15.55 54.6A27.99 27.99 0 0 0 60 31.95l-.07-1.92C49.7 45.3 30.83 52.42 15.55 54.6"
      />
    </>
  ),
  {},
);

/** Bscscan Inverted explorer icon (colored). */
export const BscscanInverted = /* @__PURE__ */ createIcon(
  'BscscanInverted',
  '0 0 64 64',
  () => (
    <>
      <path
        fill="#fff"
        d="M15.64 30.62a2.37 2.37 0 0 1 2.38-2.37l3.95.01a2.4 2.4 0 0 1 2.38 2.38v14.95l1.64-.42a2 2 0 0 0 1.53-1.93V24.7a2.4 2.4 0 0 1 2.38-2.38h3.96a2.4 2.4 0 0 1 2.38 2.38v17.2l1.95-.8a2 2 0 0 0 1.22-1.83V18.76a2.4 2.4 0 0 1 2.37-2.38h3.96a2.4 2.4 0 0 1 2.38 2.38v16.89c3.43-2.49 6.91-5.48 9.67-9.08a4 4 0 0 0 .6-3.73A28 28 0 0 0 35.52 4.28a27.98 27.98 0 0 0-27.8 41.68 3.5 3.5 0 0 0 3.38 1.75q1.12-.1 2.8-.29a2 2 0 0 0 1.75-1.96z"
      />
      <path
        fill="#f0b90b"
        d="M15.55 54.6A27.99 27.99 0 0 0 60 31.95l-.07-1.92C49.7 45.3 30.83 52.42 15.55 54.6"
      />
    </>
  ),
  {},
);

/** Bscscan explorer icon (monochrome). */
export const BscscanMono = /* @__PURE__ */ createIcon(
  'BscscanMono',
  '0 0 64 64',
  () => (
    <>
      <path d="M15.64 30.62a2.37 2.37 0 0 1 2.38-2.37l3.95.01a2.4 2.4 0 0 1 2.38 2.38v14.95l1.64-.42a2 2 0 0 0 1.53-1.93V24.7a2.4 2.4 0 0 1 2.38-2.38h3.96a2.4 2.4 0 0 1 2.38 2.38v17.2l1.95-.8a2 2 0 0 0 1.22-1.83V18.76a2.4 2.4 0 0 1 2.37-2.38h3.96a2.4 2.4 0 0 1 2.38 2.38v16.89c3.43-2.49 6.91-5.48 9.67-9.08a4 4 0 0 0 .6-3.73A28 28 0 0 0 35.52 4.28a27.98 27.98 0 0 0-27.8 41.68 3.5 3.5 0 0 0 3.38 1.75q1.12-.1 2.8-.29a2 2 0 0 0 1.75-1.96z" />
      <path d="M15.55 54.6A27.99 27.99 0 0 0 60 31.95l-.07-1.92C49.7 45.3 30.83 52.42 15.55 54.6" />
    </>
  ),
  { fill: 'currentColor' },
);
