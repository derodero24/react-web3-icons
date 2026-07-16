import { createIcon } from '../utils';

// Source: https://hedera.com
/** Hedera chain icon (colored). */
export const Hedera = /* @__PURE__ */ createIcon('Hedera', '0 0 24 24', () => (
  <>
    <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18" fill="#000" />
    <path
      d="M15.659 15.893h-1.143v-2.43H9.485v2.43H8.342v-7.88h1.143v2.372h5.03V8.013h1.144z"
      fill="#fff"
    />
    <path d="M9.54 12.553h5.03v-1.255H9.54z" fill="#fff" />
  </>
));

/** Hedera chain icon (monochrome). */
export const HederaMono = /* @__PURE__ */ createIcon(
  'HederaMono',
  '0 0 24 24',
  _id => (
    <>
      <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18" mask={`url(#${_id}-a)`} />
      <defs>
        <mask id={`${_id}-a`}>
          <rect width="100%" height="100%" fill="#fff" />
          <path
            d="M15.659 15.893h-1.143v-2.43H9.485v2.43H8.342v-7.88h1.143v2.372h5.03V8.013h1.144z"
            fill="#000"
          />
          <path d="M9.54 12.553h5.03v-1.255H9.54z" fill="#000" />
        </mask>
      </defs>
    </>
  ),
  'currentColor',
);
