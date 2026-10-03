import { createIcon } from '../utils';

// Source: https://zapper.xyz
/** Zapper portfolio icon (colored). */
export const Zapper = /* @__PURE__ */ createIcon(
  'Zapper',
  '0 0 64 64',
  () => (
    <>
      <path
        fill="#784ffe"
        d="M64 32C64 14.33 49.67 0 32 0S0 14.33 0 32s14.33 32 32 32 32-14.33 32-32"
      />
      <path
        fill="#fff"
        d="m19.76 24.05 22.56-.11-5.4 8.14 12.74-.06-5.4 8-22.7.14 5.48-8.08h-12.7z"
      />
    </>
  ),
  {},
);

/** Zapper portfolio icon (monochrome). */
export const ZapperMono = /* @__PURE__ */ createIcon(
  'ZapperMono',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="scale(.128)">
      <path
        d="M500 250C500 111.93 388.07 0 250 0S0 111.93 0 250s111.93 250 250 250 250-111.93 250-250"
        mask={`url(#${_id}-zprm-a)`}
      />
      <defs>
        <mask id={`${_id}-zprm-a`}>
          <rect width="500" height="500" fill="#fff" />
          <path
            fill="#000"
            d="M154.34 187.87 330.6 187l-42.2 63.6 99.59-.48-42.2 62.53-177.42 1.14 42.87-63.16-99.25-.04z"
          />
        </mask>
      </defs>
    </g>
  ),
  { fill: 'currentColor', ids: true },
);
