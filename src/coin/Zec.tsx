import { createIcon } from '../utils';

// Source: https://z.cash/wp-content/uploads/2023/11/Brandmark-Yellow.svg (official Zcash Media Kit, https://z.cash/press/, Icons > Yellow SVG)
// Source: https://z.cash/wp-content/uploads/2023/11/Brandmark-Black.svg (same kit, Icons > Black SVG, for ZecMono)
// Colored: the official Brandmark-Yellow.svg unchanged (one evenodd path: the #F4B728 disc with the Z knocked out), placed on the 64 grid as a container
// Mono: the kit's one-colour Brandmark-Black.svg (the same path) in currentColor
// Replaces the legacy spothq/cryptocurrency-icons artwork (#ECB244 disc with a white rounded Z) (#836); the z.cash site header logo (wp-content/uploads/2023/03/zcash-logo.svg, #F3B724 with a white Z) predates the 2023 media kit
/** Zec coin icon (colored). */
export const Zec = /* @__PURE__ */ createIcon(
  'Zec',
  '0 0 64 64',
  () => (
    <path
      fill="#f4b728"
      fillRule="evenodd"
      d="M.03 32C.03 14.37 14.37.03 32 .03S63.97 14.37 63.97 32 49.63 63.97 32 63.97.03 49.63.03 32M43.4 17.16v4.87L29.87 40.38H43.4v6.46h-8.72v5.34h-5.36v-5.34h-8.73v-4.87l13.52-18.35H20.6v-6.46h8.73V11.8h5.36v5.36z"
    />
  ),
  {},
);

/** Zec coin icon (monochrome). */
export const ZecMono = /* @__PURE__ */ createIcon(
  'ZecMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M.03 32C.03 14.37 14.37.03 32 .03S63.97 14.37 63.97 32 49.63 63.97 32 63.97.03 49.63.03 32M43.4 17.16v4.87L29.87 40.38H43.4v6.46h-8.72v5.34h-5.36v-5.34h-8.73v-4.87l13.52-18.35H20.6v-6.46h8.73V11.8h5.36v5.36z"
    />
  ),
  { fill: 'currentColor' },
);
