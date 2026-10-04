import { createIcon } from '../utils';

// Source: https://www.zksync.io/brand/zksync-logo/zksync-logomark-dark-transparent.svg
// Source: https://www.zksync.io/brand/zksync-logo-brand-assets.zip (official brand assets)
// Default: the official ZKsync logomark zksync-logomark-dark-transparent.svg (#11141A arrows on transparent); the brand kit ships the logomark only without a background, so it replaces the black tile with white arrows (whose shaft offset also differed)
// Mono: the logomark's two arrows in currentColor
// Circle and Square: no official container exists; the repo's black disc / rx=12.8 tile is kept, with the official arrows in white (as in zksync-logomark-light-transparent.svg) at translate(17.9 23.9457) scale(0.56632), the size of the previous arrows; CircleMono and SquareMono knock the same arrows out (fill-rule=evenodd)
/** Zksync chain icon (colored). */
export const Zksync = /* @__PURE__ */ createIcon(
  'Zksync',
  '0 0 64 64',
  () => (
    <>
      <path fill="#11141A" d="m20 15.99-16 16 16 16v-12l16-12H20z" />
      <path fill="#11141A" d="m60 31.99-16-16v12l-16 12h16v8z" />
    </>
  ),
  {},
);

/** Zksync chain icon (monochrome). */
export const ZksyncMono = /* @__PURE__ */ createIcon(
  'ZksyncMono',
  '0 0 64 64',
  () => (
    <>
      <path d="m20 15.99-16 16 16 16v-12l16-12H20z" />
      <path d="m60 31.99-16-16v12l-16 12h16v8z" />
    </>
  ),
  { fill: 'currentColor' },
);

/** Zksync Circle chain icon (colored). */
export const ZksyncCircle = /* @__PURE__ */ createIcon(
  'ZksyncCircle',
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

/** Zksync Square chain icon (colored). */
export const ZksyncSquare = /* @__PURE__ */ createIcon(
  'ZksyncSquare',
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

/** Zksync Square chain icon (monochrome). */
export const ZksyncSquareMono = /* @__PURE__ */ createIcon(
  'ZksyncSquareMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M12.8 0h38.4A12.8 12.8 0 0 1 64 12.8v38.4A12.8 12.8 0 0 1 51.2 64H12.8A12.8 12.8 0 0 1 0 51.2V12.8A12.8 12.8 0 0 1 12.8 0m13.15 23.95L17.9 32l8.05 8.05v-6.04l8.06-6.04h-8.06zM46.1 32l-8.05-8.05v6.04l-8.06 6.04h8.06v4.02z"
    />
  ),
  { fill: 'currentColor' },
);

/** Zksync Circle chain icon (monochrome). */
export const ZksyncCircleMono = /* @__PURE__ */ createIcon(
  'ZksyncCircleMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M32 0a32 32 0 1 1 0 64 32 32 0 0 1 0-64m-6.05 23.95L17.9 32l8.05 8.05v-6.04l8.06-6.04h-8.06zM46.1 32l-8.05-8.05v6.04l-8.06 6.04h8.06v4.02z"
    />
  ),
  { fill: 'currentColor' },
);

/** @deprecated ZkSync was renamed to follow the naming rules (ZKsync, acronyms written as words) — use `Zksync` instead. */
export const ZkSync = Zksync;

/** @deprecated Use `ZksyncMono` instead. */
export const ZkSyncMono = ZksyncMono;

/** @deprecated Use `ZksyncCircle` instead. */
export const ZkSyncCircle = ZksyncCircle;

/** @deprecated Use `ZksyncSquare` instead. */
export const ZkSyncSquare = ZksyncSquare;

/** @deprecated Use `ZksyncSquareMono` instead. */
export const ZkSyncSquareMono = ZksyncSquareMono;

/** @deprecated Use `ZksyncCircleMono` instead. */
export const ZkSyncCircleMono = ZksyncCircleMono;
