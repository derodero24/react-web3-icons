import { createIcon } from '../utils';

// Source: https://github.com/VenusProtocol/venus-protocol-interface/blob/main/apps/evm/src/assets/img/venusLogo.svg
/** Venus DeFi icon (colored). */
export const Venus = /* @__PURE__ */ createIcon(
  'Venus',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="translate(3.61 7.21)scale(1.49405)">
      <defs>
        <linearGradient
          id={`${_id}-venus-a`}
          x1="37.25"
          x2="-5.58"
          y1="26.25"
          y2="-2.83"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#5433FF" />
          <stop offset=".5" stopColor="#20BDFF" />
          <stop offset="1" stopColor="#5CFFA2" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${_id}-venus-a)`}
        d="M37.1 7.08 23.38 30.82a4.72 4.72 0 0 1-8.17 0l-2.4-4.16-.01-.04.05-.04.04.02a3.95 3.95 0 0 0 6.18-.82l11.48-19.9A3.95 3.95 0 0 0 28.15.1a.05.05 0 1 1 0-.1h4.86a4.72 4.72 0 0 1 4.08 7.08M20.86 0h-4.75a.05.05 0 0 0 0 .1 2.38 2.38 0 0 1 1.2 3.4L10.4 15.48a2.4 2.4 0 0 1-3.64.57h-.07l-.01.06 2.43 4.22a3.11 3.11 0 0 0 5.4 0l9.06-15.66A3.11 3.11 0 0 0 20.87 0M4.37 0a4.1 4.1 0 1 0 0 8.2 4.1 4.1 0 0 0 0-8.2"
      />
    </g>
  ),
  { ids: true },
);

/** Venus DeFi icon (monochrome). */
export const VenusMono = /* @__PURE__ */ createIcon(
  'VenusMono',
  '0 0 64 64',
  () => (
    <path d="M59.03 17.78 38.56 53.26a7.05 7.05 0 0 1-12.2 0l-3.6-6.22-.01-.05a.1.1 0 0 1 .08-.06q.03 0 .05.03a5.9 5.9 0 0 0 9.24-1.23L49.27 16a5.9 5.9 0 0 0-3.6-8.64.07.07 0 1 1 0-.15h7.27a7.05 7.05 0 0 1 6.1 10.57M34.8 7.21h-7.1a.06.06 0 0 0 0 .14 3.56 3.56 0 0 1 1.81 5.09l-10.35 17.9a3.57 3.57 0 0 1-5.44.85.1.1 0 0 0-.1-.01.1.1 0 0 0-.02.1l3.64 6.3a4.65 4.65 0 0 0 8.06 0l13.53-23.4a4.65 4.65 0 0 0-4.03-6.97m-24.64 0A6.13 6.13 0 1 0 15.8 11a6.1 6.1 0 0 0-5.66-3.78" />
  ),
  { fill: 'currentColor' },
);
