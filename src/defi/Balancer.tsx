import { createIcon } from '../utils';

// Paths sourced from balancer/balancer-v2-monorepo logo.svg
/** Balancer DeFi icon (colored). */
export const Balancer = /* @__PURE__ */ createIcon(
  'Balancer',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="translate(4 9.6)scale(.06021)">
      <defs>
        <linearGradient
          id={`${_id}-bal-g`}
          x1="465"
          x2="465"
          y1="0"
          y2="744"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#68ACFF" />
          <stop offset="1" stopColor="#4851FF" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${_id}-bal-g)`}
        d="M256.09 448c62.81 10.64 133.78 16.63 208.91 16.63s146.1-5.99 208.91-16.62C825.81 473.72 930 526.6 930 587.69 930 674.02 721.81 744 465 744S0 674.02 0 587.69C0 526.6 104.2 473.72 256.09 448m354.7-245C736.29 221.44 824 263.54 824 312.52 824 378.51 664.84 432 468.5 432S113 378.5 113 312.52c0-48.98 87.7-91.08 213.21-109.52 43.57 6.4 91.7 9.96 142.29 9.96 49.08 0 95.85-3.35 138.38-9.4zM465 0c154.09 0 279 38.73 279 86.5S619.09 173 465 173s-279-38.73-279-86.5S310.91 0 465 0"
      />
    </g>
  ),
  { fill: 'none', ids: true },
);

/** Balancer DeFi icon (monochrome). */
export const BalancerMono = /* @__PURE__ */ createIcon(
  'BalancerMono',
  '0 0 64 64',
  () => (
    <path d="M19.42 36.58c3.78.64 8.06 1 12.58 1s8.8-.36 12.58-1C53.73 38.13 60 41.3 60 44.98c0 5.2-12.54 9.42-28 9.42S4 50.19 4 44.99c0-3.68 6.27-6.86 15.42-8.41m21.36-14.76c7.56 1.11 12.84 3.65 12.84 6.6 0 3.97-9.59 7.2-21.4 7.2-11.83 0-21.42-3.23-21.42-7.2 0-2.95 5.29-5.49 12.84-6.6 2.63.39 5.52.6 8.57.6 2.96 0 5.77-.2 8.33-.56zM32 9.6c9.28 0 16.8 2.33 16.8 5.2 0 2.89-7.52 5.22-16.8 5.22s-16.8-2.33-16.8-5.21S22.72 9.6 32 9.6" />
  ),
  { fill: 'currentColor' },
);
