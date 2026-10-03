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
        d="M45.012 45.834h-4.061v-8.635H23.074v8.635h-4.062v-28h4.062v8.428h17.873v-8.429h4.065z"
      />
      <path fill="#fff" d="M23.27 33.965h17.873v-4.459H23.269z" />
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
            d="M15.659 15.893h-1.143v-2.43H9.485v2.43H8.342v-7.88h1.143v2.372h5.03V8.013h1.144z"
          />
          <path fill="#000" d="M9.54 12.553h5.03v-1.255H9.54z" />
        </mask>
      </defs>
    </g>
  ),
  { fill: 'currentColor', ids: true },
);
