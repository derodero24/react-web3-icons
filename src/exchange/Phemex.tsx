import { createIcon } from '../utils';

// Source: https://phemex.com (official brand)
/** Phemex exchange icon (colored). */
export const Phemex = /* @__PURE__ */ createIcon(
  'Phemex',
  '0 0 64 64',
  () => (
    <>
      <path
        fill="#13DAFD"
        d="M12.05 20.45V46.7c0 5.6 9.8 13.3 16.45 13.3V33.75c0-5.25-9.8-13.3-16.45-13.3"
      />
      <path
        fill="#003398"
        d="M35.5 4v26.25c0 5.6 9.8 13.3 16.45 13.3V17.3c0-5.6-9.8-13.3-16.45-13.3"
      />
    </>
  ),
  {},
);

/** Phemex exchange icon (monochrome). */
export const PhemexMono = /* @__PURE__ */ createIcon(
  'PhemexMono',
  '0 0 64 64',
  () => (
    <>
      <path d="M12.05 20.45V46.7c0 5.6 9.8 13.3 16.45 13.3V33.75c0-5.25-9.8-13.3-16.45-13.3" />
      <path d="M35.5 4v26.25c0 5.6 9.8 13.3 16.45 13.3V17.3c0-5.6-9.8-13.3-16.45-13.3" />
    </>
  ),
  { fill: 'currentColor' },
);
