import { createIcon } from '../utils';

// Paths sourced from @web3icons/react (MIT)
/** Rocket Pool DeFi icon (colored). */
export const RocketPool = /* @__PURE__ */ createIcon(
  'RocketPool',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="translate(-10.64 -10.63)scale(3.55227)">
      <defs>
        <linearGradient
          id={`${_id}-rpl-a`}
          x1="4.45"
          x2="21"
          y1="18.03"
          y2="5.85"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FB9533" />
          <stop offset=".26" stopColor="#FEBA67" />
          <stop offset=".75" stopColor="#FF9976" />
          <stop offset="1" stopColor="#FF6350" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${_id}-rpl-a)`}
        d="M12 20.34a8.4 8.4 0 1 0 0-16.8 8.4 8.4 0 0 0 0 16.8"
      />
      <path
        fill="#FF7534"
        fillRule="evenodd"
        d="M12 20.46A8.46 8.46 0 0 0 20.46 12 8.46 8.46 0 1 0 12 20.46m0-.52a7.94 7.94 0 1 0 0-15.88 7.94 7.94 0 0 0 0 15.88"
        clipRule="evenodd"
      />
      <path
        fill="#FFD58D"
        fillRule="evenodd"
        d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18m0-.53A8.47 8.47 0 0 0 20.47 12 8.47 8.47 0 0 0 12 3.53 8.47 8.47 0 0 0 3.53 12 8.47 8.47 0 0 0 12 20.47"
        clipRule="evenodd"
      />
      <path
        fill="#fff"
        fillRule="evenodd"
        d="m9.66 11.17-.87 1.03 1.22.46c.01.46.12.65.18.69l-.47.42.47.48.45-.48q.38.15.8.1l.42 1.24 1.07-.97.27-1.2c2.47-2.24 2.75-4.04 2.58-4.65-2.2-.16-4.15 1.64-4.86 2.56zm.05 3.51-3.67 3.39-.39-.42 3.67-3.39zm-1.18.08-3 2.75-.4-.42 3.02-2.75zm1.1 1.05-3.05 2.8-.38-.43 3.03-2.79zm3.27-4.07a.7.7 0 1 0 0-1.42.7.7 0 0 0 0 1.42"
        clipRule="evenodd"
      />
    </g>
  ),
  { fill: 'none', ids: true },
);

/** Rocket Pool DeFi icon (monochrome). */
export const RocketPoolMono = /* @__PURE__ */ createIcon(
  'RocketPoolMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M.02 32a31.97 31.97 0 1 0 63.94 0A31.97 31.97 0 1 0 .02 32m23.65-2.95-3.07 3.67 4.31 1.62c.06 1.63.46 2.3.64 2.45l-1.64 1.51 1.64 1.68 1.62-1.68q1.37.5 2.8.34l1.52 4.41 3.8-3.46.96-4.23C45.03 27.36 46 21 45.4 18.8c-7.78-.55-14.74 5.85-17.25 9.12zm.19 12.47L10.82 53.55l-1.37-1.5 13.03-12.02zm-4.18.28-10.7 9.78-1.37-1.5 10.7-9.78zm3.86 3.75-10.79 9.91-1.37-1.5 10.79-9.9zm11.64-14.48a2.51 2.51 0 1 0 0-5.02 2.51 2.51 0 0 0 0 5.02"
    />
  ),
  { fill: 'currentColor' },
);
