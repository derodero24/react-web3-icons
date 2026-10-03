import { createIcon } from '../utils';

// Source: https://ethena.fi
/** Ena coin icon (colored). */
export const Ena = /* @__PURE__ */ createIcon(
  'Ena',
  '0 0 64 64',
  () => (
    <g transform="scale(.16326)">
      <circle cx="196" cy="196" r="196" fill="#1C1C1C" />
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M153.4 104.36h-4.15l-2.7 3.17-69.58 81.73-4.97 5.83 4.97 5.84 69.58 81.73 2.7 3.17h138.43v-60.96h-18v42.96h-96.6l57.82-66.85 5.1-5.89-5.1-5.88-57.81-66.85h96.6v42.96h18v-60.96zm.06 22.82L95.64 195.1l57.82 67.9 58.73-67.9z"
        clipRule="evenodd"
      />
    </g>
  ),
  {},
);

/** Ena coin icon (monochrome). */
export const EnaMono = /* @__PURE__ */ createIcon(
  'EnaMono',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="scale(.16326)">
      <defs>
        <mask
          id={`${_id}-mask`}
          width="392"
          height="392"
          x="0"
          y="0"
          maskUnits="userSpaceOnUse"
        >
          <rect width="392" height="392" fill="white" />
          <path
            fill="black"
            fillRule="evenodd"
            d="M153.4 104.36h-4.15l-2.7 3.17-69.58 81.73-4.97 5.83 4.97 5.84 69.58 81.73 2.7 3.17h138.43v-60.96h-18v42.96h-96.6l57.82-66.85 5.1-5.89-5.1-5.88-57.81-66.85h96.6v42.96h18v-60.96zm.06 22.82L95.64 195.1l57.82 67.9 58.73-67.9z"
            clipRule="evenodd"
          />
        </mask>
      </defs>
      <circle
        cx="196"
        cy="196"
        r="196"
        fill="currentColor"
        mask={`url(#${_id}-mask)`}
      />
    </g>
  ),
  { ids: true },
);
