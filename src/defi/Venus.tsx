import { createIcon } from '../utils';

// Source: https://github.com/VenusProtocol/venus-protocol-interface/blob/main/apps/evm/src/assets/img/venusLogo.svg
/** Venus DeFi icon (colored). */
export const Venus = /* @__PURE__ */ createIcon(
  'Venus',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="translate(3.613 7.211)scale(1.49405)">
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
        d="M37.095 7.077 23.387 30.82a4.717 4.717 0 0 1-8.167 0l-2.403-4.159a.049.049 0 0 1 .046-.077.05.05 0 0 1 .032.019 3.95 3.95 0 0 0 6.187-.822L30.557 5.886A3.95 3.95 0 0 0 28.15.097a.049.049 0 1 1 0-.097h4.864a4.72 4.72 0 0 1 4.08 7.077M20.867 0h-4.752a.049.049 0 0 0 0 .092 2.384 2.384 0 0 1 1.21 3.405L10.4 15.477a2.39 2.39 0 0 1-3.643.575.05.05 0 0 0-.068-.01.05.05 0 0 0-.01.068l2.432 4.222a3.114 3.114 0 0 0 5.395 0L23.567 4.67A3.113 3.113 0 0 0 20.868 0M4.374 0a4.1 4.1 0 1 0 0 8.2 4.1 4.1 0 0 0 0-8.2"
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
    <path d="m59.035 17.784-20.48 35.474a7.047 7.047 0 0 1-12.203 0l-3.59-6.214a.073.073 0 0 1 .069-.115.08.08 0 0 1 .048.028 5.9 5.9 0 0 0 9.243-1.228l17.145-29.724a5.9 5.9 0 0 0-3.596-8.65.073.073 0 1 1 0-.144h7.267a7.052 7.052 0 0 1 6.095 10.573M34.79 7.211h-7.1a.073.073 0 0 0 0 .137 3.562 3.562 0 0 1 1.808 5.088L19.151 30.334a3.57 3.57 0 0 1-5.443.86.075.075 0 0 0-.101-.015.075.075 0 0 0-.015.101l3.633 6.308a4.652 4.652 0 0 0 8.06 0l13.538-23.4a4.651 4.651 0 0 0-4.032-6.977m-24.643 0a6.126 6.126 0 1 0 0 12.251 6.126 6.126 0 0 0 0-12.251" />
  ),
  { fill: 'currentColor' },
);
