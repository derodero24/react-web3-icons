import { createIcon } from '../utils';

// Source: https://algorand.com
/** Algorand chain icon (colored). */
export const Algorand = /* @__PURE__ */ createIcon(
  'Algorand',
  '0 0 64 64',
  () => (
    <path d="m13.778 60 8.099-14.025L29.976 32l8.049-14.025 1.333-2.222.593 2.222 2.469 9.235L39.655 32l-8.1 13.975L23.507 60h9.68l8.098-14.025 4.198-7.259 1.975 7.26L51.21 60h8.691l-3.753-14.025L52.395 32l-.987-3.605 6.024-10.42h-8.79l-.296-1.037-3.062-11.457L44.89 4h-8.444l-.198.296-7.901 13.68L20.247 32l-8.05 13.975L4.1 60z" />
  ),
  {},
);

/** Algorand chain icon (monochrome). */
export const AlgorandMono = /* @__PURE__ */ createIcon(
  'AlgorandMono',
  '0 0 64 64',
  () => (
    <path d="m13.778 60 8.099-14.025L29.976 32l8.049-14.025 1.333-2.222.593 2.222 2.469 9.235L39.655 32l-8.1 13.975L23.507 60h9.68l8.098-14.025 4.198-7.259 1.975 7.26L51.21 60h8.691l-3.753-14.025L52.395 32l-.987-3.605 6.024-10.42h-8.79l-.296-1.037-3.062-11.457L44.89 4h-8.444l-.198.296-7.901 13.68L20.247 32l-8.05 13.975L4.1 60z" />
  ),
  { fill: 'currentColor' },
);

/** Algorand Circle chain icon (colored). */
export const AlgorandCircle = /* @__PURE__ */ createIcon(
  'AlgorandCircle',
  '0 0 64 64',
  () => (
    <g transform="scale(.0256)">
      <circle cx="1250" cy="1250" r="1250" />
      <path
        fill="#fff"
        d="M2051.7 2052.5h-252l-162.6-607.1-350.5 607.1h-280.5l541.5-939.7-86.5-326.7-732.4 1266.4H448.3l927.7-1605h244.7l108.8 398.3h253.6l-174.5 301.3z"
      />
    </g>
  ),
  {},
);

/** Algorand Circle chain icon (monochrome). */
export const AlgorandCircleMono = /* @__PURE__ */ createIcon(
  'AlgorandCircleMono',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="scale(.0256)">
      <circle cx="1250" cy="1250" r="1250" mask={`url(#${_id}-algo-cm-a)`} />
      <defs>
        <mask id={`${_id}-algo-cm-a`}>
          <rect width="2500" height="2500" fill="#fff" />
          <path
            fill="#000"
            d="M2051.7 2052.5h-252l-162.6-607.1-350.5 607.1h-280.5l541.5-939.7-86.5-326.7-732.4 1266.4H448.3l927.7-1605h244.7l108.8 398.3h253.6l-174.5 301.3z"
          />
        </mask>
      </defs>
    </g>
  ),
  { fill: 'currentColor', ids: true },
);
