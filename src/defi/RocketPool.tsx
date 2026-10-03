import { createIcon } from '../utils';

// Paths sourced from @web3icons/react (MIT)
/** Rocket Pool DeFi icon (colored). */
export const RocketPool = /* @__PURE__ */ createIcon(
  'RocketPool',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="translate(-10.637 -10.627)scale(3.55227)">
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
        d="M12 20.34a8.399 8.399 0 1 0 0-16.797 8.399 8.399 0 0 0 0 16.797"
      />
      <path
        fill="#FF7534"
        fillRule="evenodd"
        d="M12 20.459A8.457 8.457 0 0 0 20.458 12 8.458 8.458 0 1 0 12 20.459m0-.517A7.941 7.941 0 1 0 12 4.06a7.941 7.941 0 0 0 0 15.882"
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
        d="m9.658 11.169-.864 1.034 1.214.455c.017.459.127.65.18.689l-.463.427.463.473.455-.473c.252.093.523.126.79.096l.427 1.241 1.07-.974.268-1.192c2.473-2.249 2.75-4.043 2.58-4.66-2.19-.156-4.15 1.646-4.855 2.567zm.052 3.512-3.669 3.385-.387-.42 3.669-3.385zm-1.176.079-3.01 2.752-.387-.422 3.011-2.753zm1.088 1.053-3.037 2.792-.386-.421 3.036-2.791zm3.277-4.075a.707.707 0 1 0 0-1.414.707.707 0 0 0 0 1.414"
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
      d="M.02 32a31.97 31.97 0 1 0 63.94 0A31.97 31.97 0 1 0 .02 32m23.65-2.952-3.068 3.673 4.312 1.617c.06 1.63.451 2.309.64 2.447l-1.645 1.517 1.645 1.68 1.616-1.68c.895.33 1.858.448 2.806.341l1.517 4.408 3.8-3.46.953-4.234c8.785-7.989 9.769-14.362 9.165-16.553-7.78-.555-14.742 5.847-17.247 9.118zm.186 12.476L10.822 53.548l-1.374-1.492L22.48 40.032zm-4.178.28L8.986 51.58 7.61 50.081l10.696-9.78zm3.865 3.741-10.788 9.918-1.371-1.496 10.784-9.914zm11.64-14.475a2.511 2.511 0 1 0 0-5.023 2.511 2.511 0 0 0 0 5.023"
    />
  ),
  { fill: 'currentColor' },
);
