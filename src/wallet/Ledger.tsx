import { createIcon } from '../utils';

// Source: https://ledger.com
/** Ledger wallet icon (colored). */
export const Ledger = /* @__PURE__ */ createIcon(
  'Ledger',
  '0 0 64 64',
  () => (
    <path d="M4.02 42.525v13.833h21.048V53.29H7.086V42.525zm52.893 0V53.29H38.93v3.065h21.05v-13.83zM25.1 21.476v21.049h13.833v-2.767H28.164V21.476zM4.019 7.643v13.833h3.067V10.708H25.07V7.643zm34.913 0v3.067h17.981v10.766h3.065V7.643z" />
  ),
  { fill: '#000000' },
);

/** Ledger wallet icon (monochrome). */
export const LedgerMono = /* @__PURE__ */ createIcon(
  'LedgerMono',
  '0 0 64 64',
  () => (
    <path d="M4.02 42.525v13.833h21.048V53.29H7.086V42.525zm52.893 0V53.29H38.93v3.065h21.05v-13.83zM25.1 21.476v21.049h13.833v-2.767H28.164V21.476zM4.019 7.643v13.833h3.067V10.708H25.07V7.643zm34.913 0v3.067h17.981v10.766h3.065V7.643z" />
  ),
  { fill: 'currentColor' },
);
