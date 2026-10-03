import { createIcon } from '../utils';

// Source: https://www.zksync.io/brand/zksync-logo/zksync-logomark-dark-transparent.svg
// Source: https://www.zksync.io/brand/zksync-logo-brand-assets.zip (official brand assets)
// Default: the official ZKsync logomark zksync-logomark-dark-transparent.svg (#11141A arrows on transparent); the brand kit ships the logomark only without a background, so it replaces the black tile with white arrows (whose shaft offset also differed)
// Mono: the logomark's two arrows in currentColor
// Circle and Square: no official container exists; the repo's black disc / rx=12.8 tile is kept, with the official arrows in white (as in zksync-logomark-light-transparent.svg) at translate(17.9 23.9457) scale(0.56632), the size of the previous arrows; CircleMono and SquareMono knock the same arrows out (fill-rule=evenodd)
/** Zk Sync chain icon (colored). */
export const ZkSync = /* @__PURE__ */ createIcon(
  'ZkSync',
  '0 0 64 64',
  () => (
    <>
      <path fill="#11141A" d="m20 15.99-16 16 16 16v-12l16-12H20z" />
      <path fill="#11141A" d="m60 31.99-16-16v12l-16 12h16v8z" />
    </>
  ),
  {},
);

/** Zk Sync chain icon (monochrome). */
export const ZkSyncMono = /* @__PURE__ */ createIcon(
  'ZkSyncMono',
  '0 0 64 64',
  () => (
    <>
      <path d="m20 15.99-16 16 16 16v-12l16-12H20z" />
      <path d="m60 31.99-16-16v12l-16 12h16v8z" />
    </>
  ),
  { fill: 'currentColor' },
);

/** Zk Sync Circle chain icon (colored). */
export const ZkSyncCircle = /* @__PURE__ */ createIcon(
  'ZkSyncCircle',
  '0 0 64 64',
  () => (
    <>
      <circle cx="32" cy="32" r="32" />
      <path
        fill="#fff"
        d="M25.95 23.95 17.9 32l8.05 8.05v-6.04l8.06-6.04h-8.06zM46.1 32l-8.05-8.05v6.04l-8.06 6.04h8.06v4.02z"
      />
    </>
  ),
  {},
);

/** Zk Sync Square chain icon (colored). */
export const ZkSyncSquare = /* @__PURE__ */ createIcon(
  'ZkSyncSquare',
  '0 0 64 64',
  () => (
    <>
      <rect width="64" height="64" rx="12.8" />
      <path
        fill="#fff"
        d="M25.95 23.95 17.9 32l8.05 8.05v-6.04l8.06-6.04h-8.06zM46.1 32l-8.05-8.05v6.04l-8.06 6.04h8.06v4.02z"
      />
    </>
  ),
  {},
);

/** Zk Sync Square chain icon (monochrome). */
export const ZkSyncSquareMono = /* @__PURE__ */ createIcon(
  'ZkSyncSquareMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M12.8 0h38.4A12.8 12.8 0 0 1 64 12.8v38.4A12.8 12.8 0 0 1 51.2 64H12.8A12.8 12.8 0 0 1 0 51.2V12.8A12.8 12.8 0 0 1 12.8 0m13.15 23.95L17.9 32l8.05 8.05v-6.04l8.06-6.04h-8.06zM46.1 32l-8.05-8.05v6.04l-8.06 6.04h8.06v4.02z"
    />
  ),
  { fill: 'currentColor' },
);

/** Zk Sync Circle chain icon (monochrome). */
export const ZkSyncCircleMono = /* @__PURE__ */ createIcon(
  'ZkSyncCircleMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M32 0a32 32 0 1 1 0 64 32 32 0 0 1 0-64m-6.05 23.95L17.9 32l8.05 8.05v-6.04l8.06-6.04h-8.06zM46.1 32l-8.05-8.05v6.04l-8.06 6.04h8.06v4.02z"
    />
  ),
  { fill: 'currentColor' },
);
