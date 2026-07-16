import { createIcon } from '../utils';

// Source: https://www.monad.xyz/brand-page-assets/Logomark.svg (official brand & media kit, monad.xyz/brand-and-media-kit)
/** Monad chain icon (colored). */
export const Monad = /* @__PURE__ */ createIcon(
  'Monad',
  '0 0 182 184',
  () => (
    <path
      fill="#6E54FF"
      d="M90.536 0C64.39 0 0 65.26 0 91.76c0 26.499 64.391 91.76 90.536 91.76s90.537-65.262 90.537-91.76c0-26.5-64.391-91.76-90.537-91.76M76.427 144.23c-11.025-3.045-40.666-55.596-37.662-66.77 3.005-11.175 54.855-41.216 65.88-38.17 11.025 3.044 40.667 55.595 37.662 66.769s-54.855 41.217-65.88 38.171"
    />
  ),
  'none',
);

/** Monad chain icon (monochrome). */
export const MonadMono = /* @__PURE__ */ createIcon(
  'MonadMono',
  '0 0 182 184',
  () => (
    <path d="M90.536 0C64.39 0 0 65.26 0 91.76c0 26.499 64.391 91.76 90.536 91.76s90.537-65.262 90.537-91.76c0-26.5-64.391-91.76-90.537-91.76M76.427 144.23c-11.025-3.045-40.666-55.596-37.662-66.77 3.005-11.175 54.855-41.216 65.88-38.17 11.025 3.044 40.667 55.595 37.662 66.769s-54.855 41.217-65.88 38.171" />
  ),
  'currentColor',
);
