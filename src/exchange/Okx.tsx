import { createIcon } from '../utils';

// Source: https://web3.okx.com/cdn/assets/imgs/258/4C0F53E9427468A2.svg (official OKX header lockup served on OKX's own domain: the black checker + "Wallet")
// Source: https://www.okx.com (official site; its own header logos are PNG only)
// Default: the checker matches the checker of the official header lockup (alpha IoU 0.96 at 256 px, the same small corner radius; checked 2026-10-09), so the paths are unchanged. okx.com serves its header logos only as PNG (logoMap block/text images), so the OKX lockup on web3.okx.com is the vector reference
// Mono: the same paths in currentColor
/** Okx exchange icon (colored). */
export const Okx = /* @__PURE__ */ createIcon(
  'Okx',
  '0 0 64 64',
  () => (
    <path d="M40.12 22.66H23.94c-.7 0-1.25.56-1.25 1.25v16.18c0 .7.56 1.25 1.25 1.25h16.18c.7 0 1.25-.56 1.25-1.25V23.91c0-.7-.56-1.25-1.25-1.25M21.44 4.03H5.25C4.56 4.03 4 4.59 4 5.28v16.19c0 .69.56 1.25 1.25 1.25h16.19c.69 0 1.25-.56 1.25-1.25V5.28c0-.69-.56-1.25-1.25-1.25m37.3 0H42.57c-.69 0-1.25.56-1.25 1.25v16.19c0 .69.56 1.25 1.25 1.25h16.19c.69 0 1.25-.56 1.25-1.25V5.28c0-.69-.56-1.25-1.25-1.25m-37.3 37.25H5.25c-.69 0-1.25.56-1.25 1.25v16.19c0 .69.56 1.25 1.25 1.25h16.19c.69 0 1.25-.56 1.25-1.25V42.53c0-.69-.56-1.25-1.25-1.25m37.3 0H42.57c-.69 0-1.25.56-1.25 1.25v16.19c0 .69.56 1.25 1.25 1.25h16.19c.69 0 1.25-.56 1.25-1.25V42.53c0-.69-.56-1.25-1.25-1.25" />
  ),
  { fill: '#000' },
);

/** Okx exchange icon (monochrome). */
export const OkxMono = /* @__PURE__ */ createIcon(
  'OkxMono',
  '0 0 64 64',
  () => (
    <path d="M40.12 22.66H23.94c-.7 0-1.25.56-1.25 1.25v16.18c0 .7.56 1.25 1.25 1.25h16.18c.7 0 1.25-.56 1.25-1.25V23.91c0-.7-.56-1.25-1.25-1.25M21.44 4.03H5.25C4.56 4.03 4 4.59 4 5.28v16.19c0 .69.56 1.25 1.25 1.25h16.19c.69 0 1.25-.56 1.25-1.25V5.28c0-.69-.56-1.25-1.25-1.25m37.3 0H42.57c-.69 0-1.25.56-1.25 1.25v16.19c0 .69.56 1.25 1.25 1.25h16.19c.69 0 1.25-.56 1.25-1.25V5.28c0-.69-.56-1.25-1.25-1.25m-37.3 37.25H5.25c-.69 0-1.25.56-1.25 1.25v16.19c0 .69.56 1.25 1.25 1.25h16.19c.69 0 1.25-.56 1.25-1.25V42.53c0-.69-.56-1.25-1.25-1.25m37.3 0H42.57c-.69 0-1.25.56-1.25 1.25v16.19c0 .69.56 1.25 1.25 1.25h16.19c.69 0 1.25-.56 1.25-1.25V42.53c0-.69-.56-1.25-1.25-1.25" />
  ),
  { fill: 'currentColor' },
);
