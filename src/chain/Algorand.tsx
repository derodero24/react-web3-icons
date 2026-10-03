import { createIcon } from '../utils';

// Source: https://algorand.com
/** Algorand chain icon (colored). */
export const Algorand = /* @__PURE__ */ createIcon(
  'Algorand',
  '0 0 64 64',
  () => (
    <path d="m13.78 60 8.1-14.02L29.98 32l8.04-14.02 1.34-2.23.6 2.23 2.46 9.23L39.65 32l-8.1 13.98L23.52 60h9.68l8.1-14.02 4.2-7.26 1.97 7.26L51.2 60h8.7l-3.76-14.02L52.4 32l-1-3.6 6.03-10.42h-8.79l-.3-1.04-3.06-11.46-.4-1.48h-8.44l-.2.3-7.9 13.68L20.25 32 12.2 45.98 4.1 60z" />
  ),
  {},
);

/** Algorand chain icon (monochrome). */
export const AlgorandMono = /* @__PURE__ */ createIcon(
  'AlgorandMono',
  '0 0 64 64',
  () => (
    <path d="m13.78 60 8.1-14.02L29.98 32l8.04-14.02 1.34-2.23.6 2.23 2.46 9.23L39.65 32l-8.1 13.98L23.52 60h9.68l8.1-14.02 4.2-7.26 1.97 7.26L51.2 60h8.7l-3.76-14.02L52.4 32l-1-3.6 6.03-10.42h-8.79l-.3-1.04-3.06-11.46-.4-1.48h-8.44l-.2.3-7.9 13.68L20.25 32 12.2 45.98 4.1 60z" />
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
