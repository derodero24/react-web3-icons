import { createIcon } from '../utils';

// Source: https://hedera.com
/** Hedera chain icon (colored). */
export const Hedera = /* @__PURE__ */ createIcon(
  'Hedera',
  '0 0 64 64',
  () => (
    <>
      <path d="M32.01.02a31.98 31.98 0 1 0 0 63.96 31.98 31.98 0 0 0 0-63.96" />
      <path
        fill="#fff"
        d="M45.01 45.83h-4.06V37.2H23.07v8.63h-4.06v-28h4.06v8.43h17.88v-8.43H45z"
      />
      <path fill="#fff" d="M23.27 33.97h17.87V29.5H23.27z" />
    </>
  ),
  {},
);

/** Hedera chain icon (monochrome). */
export const HederaMono = /* @__PURE__ */ createIcon(
  'HederaMono',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="translate(-10.63 -10.64)scale(3.55337)">
      <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18" mask={`url(#${_id}-a)`} />
      <defs>
        <mask id={`${_id}-a`}>
          <rect width="24" height="24" fill="#fff" />
          <path
            fill="#000"
            d="M15.66 15.9h-1.14v-2.44H9.49v2.43H8.33V8.01H9.5v2.38h5.03V8h1.14z"
          />
          <path fill="#000" d="M9.54 12.55h5.03V11.3H9.54z" />
        </mask>
      </defs>
    </g>
  ),
  { fill: 'currentColor', ids: true },
);
