import { createIcon } from '../utils';

// Source: https://coinpanda.io/branding/ (official Branding page: Brand icon and Alternative brand icon)
// Source: https://coinpanda.io/wp-content/uploads/2024/06/icon-blue-svg.svg
// Source: https://coinpanda.io/wp-content/uploads/2024/06/icon-white-svg.svg
// Source: https://coinpanda.io/wp-content/uploads/2024/06/icon-blue-bg-circular-svg.svg
// Source: https://coinpanda.io/wp-content/uploads/2024/06/icon-blue-bg-square-svg.svg
// Default: icon-blue-svg.svg (#246AFF), path unchanged, uniformly scaled onto the 64 grid (silhouette IoU 0.995)
// Mono: the same path in currentColor, matching the official one-colour icon-white-svg.svg
// Circle and Square: icon-blue-bg-circular-svg.svg and icon-blue-bg-square-svg.svg (86×86 artboard, a #246AFF disc or square with the #FFFFFF panda), paths unchanged (rounded to 2 decimals) under scale(.74419) = 64/86
// CircleMono and SquareMono: the same disc or square with the panda knocked out
/** Coinpanda portfolio icon (colored). */
export const Coinpanda = /* @__PURE__ */ createIcon(
  'Coinpanda',
  '0 0 64 64',
  () => (
    <path d="M50.55 5.5c-5.1 0-9.26 4.06-9.43 9.11a22.7 22.7 0 0 0-18.25 0c-.17-5.05-4.33-9.11-9.43-9.11C8.24 5.5 4 9.73 4 14.94c0 4.74 3.5 8.69 8.12 9.33A23 23 0 0 0 9.1 35.6 22.93 22.93 0 0 0 32 58.49a22.93 22.93 0 0 0 22.9-22.9c0-3.96-1.04-7.86-3.02-11.32A9.4 9.4 0 0 0 60 14.94a9.46 9.46 0 0 0-9.45-9.44M13.44 19.8a4.86 4.86 0 0 1-4.86-4.86 4.86 4.86 0 0 1 4.86-4.86 4.86 4.86 0 0 1 4.86 4.86 4.86 4.86 0 0 1-4.86 4.85m36.88 15.79c0 10.1-8.22 18.32-18.32 18.32s-18.32-8.22-18.32-18.32S21.9 17.27 32 17.27a18.35 18.35 0 0 1 18.32 18.32M45.7 14.94a4.86 4.86 0 0 1 4.86-4.86 4.86 4.86 0 0 1 4.85 4.86 4.86 4.86 0 0 1-4.85 4.85 4.86 4.86 0 0 1-4.86-4.85" />
  ),
  { fill: '#246aff' },
);

/** Coinpanda portfolio icon (monochrome). */
export const CoinpandaMono = /* @__PURE__ */ createIcon(
  'CoinpandaMono',
  '0 0 64 64',
  () => (
    <path d="M50.55 5.5c-5.1 0-9.26 4.06-9.43 9.11a22.7 22.7 0 0 0-18.25 0c-.17-5.05-4.33-9.11-9.43-9.11C8.24 5.5 4 9.73 4 14.94c0 4.74 3.5 8.69 8.12 9.33A23 23 0 0 0 9.1 35.6 22.93 22.93 0 0 0 32 58.49a22.93 22.93 0 0 0 22.9-22.9c0-3.96-1.04-7.86-3.02-11.32A9.4 9.4 0 0 0 60 14.94a9.46 9.46 0 0 0-9.45-9.44M13.44 19.8a4.86 4.86 0 0 1-4.86-4.86 4.86 4.86 0 0 1 4.86-4.86 4.86 4.86 0 0 1 4.86 4.86 4.86 4.86 0 0 1-4.86 4.85m36.88 15.79c0 10.1-8.22 18.32-18.32 18.32s-18.32-8.22-18.32-18.32S21.9 17.27 32 17.27a18.35 18.35 0 0 1 18.32 18.32M45.7 14.94a4.86 4.86 0 0 1 4.86-4.86 4.86 4.86 0 0 1 4.85 4.86 4.86 4.86 0 0 1-4.85 4.85 4.86 4.86 0 0 1-4.86-4.85" />
  ),
  { fill: 'currentColor' },
);

/** Coinpanda Circle portfolio icon (colored). */
export const CoinpandaCircle = /* @__PURE__ */ createIcon(
  'CoinpandaCircle',
  '0 0 64 64',
  () => (
    <g transform="scale(.74419)">
      <circle cx="43" cy="43" r="43" fill="#246aff" />
      <path
        fill="#fff"
        d="M59.22 19.84c-4.45 0-8.1 3.55-8.25 7.97a19.8 19.8 0 0 0-15.94 0c-.16-4.42-3.8-7.97-8.25-7.97-4.55 0-8.25 3.7-8.25 8.25a8.24 8.24 0 0 0 7.1 8.16 20 20 0 0 0-2.65 9.9c0 11.03 8.98 20.01 20.02 20.01s20.02-8.98 20.02-20.02c0-3.46-.91-6.86-2.64-9.89a8.24 8.24 0 0 0 7.1-8.16 8.27 8.27 0 0 0-8.26-8.25m-32.44 12.5a4.25 4.25 0 0 1-4.25-4.25 4.25 4.25 0 1 1 8.5 0 4.25 4.25 0 0 1-4.26 4.25M59 46.14c0 8.83-7.18 16.02-16.01 16.02s-16.02-7.19-16.02-16.01S34.17 30.13 43 30.13s16 7.19 16 16.02M54.97 28.1c0-2.34 1.9-4.24 4.25-4.24s4.25 1.9 4.25 4.24a4.25 4.25 0 0 1-4.25 4.25 4.25 4.25 0 0 1-4.25-4.25"
      />
    </g>
  ),
  {},
);

/** Coinpanda Square portfolio icon (colored). */
export const CoinpandaSquare = /* @__PURE__ */ createIcon(
  'CoinpandaSquare',
  '0 0 64 64',
  () => (
    <g transform="scale(.74419)">
      <rect width="86" height="86" fill="#246aff" />
      <path
        fill="#fff"
        d="M59.22 19.84c-4.45 0-8.1 3.55-8.25 7.97a19.8 19.8 0 0 0-15.94 0c-.16-4.42-3.8-7.97-8.25-7.97-4.55 0-8.25 3.7-8.25 8.25a8.24 8.24 0 0 0 7.1 8.16 20 20 0 0 0-2.65 9.9c0 11.03 8.98 20.01 20.02 20.01s20.02-8.98 20.02-20.02c0-3.46-.91-6.86-2.64-9.89a8.24 8.24 0 0 0 7.1-8.16 8.27 8.27 0 0 0-8.26-8.25m-32.44 12.5a4.25 4.25 0 0 1-4.25-4.25 4.25 4.25 0 1 1 8.5 0 4.25 4.25 0 0 1-4.26 4.25M59 46.14c0 8.83-7.18 16.02-16.01 16.02s-16.02-7.19-16.02-16.01S34.17 30.13 43 30.13s16 7.19 16 16.02M54.97 28.1c0-2.34 1.9-4.24 4.25-4.24s4.25 1.9 4.25 4.24a4.25 4.25 0 0 1-4.25 4.25 4.25 4.25 0 0 1-4.25-4.25"
      />
    </g>
  ),
  {},
);

/** Coinpanda Circle portfolio icon (monochrome). */
export const CoinpandaCircleMono = /* @__PURE__ */ createIcon(
  'CoinpandaCircleMono',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="scale(.74419)">
      <circle cx="43" cy="43" r="43" mask={`url(#${_id}-cpd-a)`} />
      <defs>
        <mask id={`${_id}-cpd-a`}>
          <rect width="86" height="86" fill="#fff" />
          <path
            fill="#000"
            d="M59.22 19.84c-4.45 0-8.1 3.55-8.25 7.97a19.8 19.8 0 0 0-15.94 0c-.16-4.42-3.8-7.97-8.25-7.97-4.55 0-8.25 3.7-8.25 8.25a8.24 8.24 0 0 0 7.1 8.16 20 20 0 0 0-2.65 9.9c0 11.03 8.98 20.01 20.02 20.01s20.02-8.98 20.02-20.02c0-3.46-.91-6.86-2.64-9.89a8.24 8.24 0 0 0 7.1-8.16 8.27 8.27 0 0 0-8.26-8.25m-32.44 12.5a4.25 4.25 0 0 1-4.25-4.25 4.25 4.25 0 1 1 8.5 0 4.25 4.25 0 0 1-4.26 4.25M59 46.14c0 8.83-7.18 16.02-16.01 16.02s-16.02-7.19-16.02-16.01S34.17 30.13 43 30.13s16 7.19 16 16.02M54.97 28.1c0-2.34 1.9-4.24 4.25-4.24s4.25 1.9 4.25 4.24a4.25 4.25 0 0 1-4.25 4.25 4.25 4.25 0 0 1-4.25-4.25"
          />
        </mask>
      </defs>
    </g>
  ),
  { fill: 'currentColor', ids: true },
);

/** Coinpanda Square portfolio icon (monochrome). */
export const CoinpandaSquareMono = /* @__PURE__ */ createIcon(
  'CoinpandaSquareMono',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="scale(.74419)">
      <rect width="86" height="86" mask={`url(#${_id}-cpds-a)`} />
      <defs>
        <mask id={`${_id}-cpds-a`}>
          <rect width="86" height="86" fill="#fff" />
          <path
            fill="#000"
            d="M59.22 19.84c-4.45 0-8.1 3.55-8.25 7.97a19.8 19.8 0 0 0-15.94 0c-.16-4.42-3.8-7.97-8.25-7.97-4.55 0-8.25 3.7-8.25 8.25a8.24 8.24 0 0 0 7.1 8.16 20 20 0 0 0-2.65 9.9c0 11.03 8.98 20.01 20.02 20.01s20.02-8.98 20.02-20.02c0-3.46-.91-6.86-2.64-9.89a8.24 8.24 0 0 0 7.1-8.16 8.27 8.27 0 0 0-8.26-8.25m-32.44 12.5a4.25 4.25 0 0 1-4.25-4.25 4.25 4.25 0 1 1 8.5 0 4.25 4.25 0 0 1-4.26 4.25M59 46.14c0 8.83-7.18 16.02-16.01 16.02s-16.02-7.19-16.02-16.01S34.17 30.13 43 30.13s16 7.19 16 16.02M54.97 28.1c0-2.34 1.9-4.24 4.25-4.24s4.25 1.9 4.25 4.24a4.25 4.25 0 0 1-4.25 4.25 4.25 4.25 0 0 1-4.25-4.25"
          />
        </mask>
      </defs>
    </g>
  ),
  { fill: 'currentColor', ids: true },
);
