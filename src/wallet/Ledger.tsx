import { createIcon } from '../utils';

// Source: https://ledger.com
/** Ledger wallet icon (colored). */
export const Ledger = /* @__PURE__ */ createIcon(
  'Ledger',
  '0 0 29 24',
  () => (
    <path d="M.715 17.185V24h10.37v-1.511H2.226v-5.304zm26.059 0v5.304h-8.86v1.51h10.37v-6.814zM11.1 6.815v10.37h6.815v-1.363H12.61V6.815zM.715 0v6.815h1.511V1.51h8.86V0zm17.2 0v1.511h8.859v5.304h1.51V0z" />
  ),
  { fill: '#000000' },
);

/** Ledger wallet icon (monochrome). */
export const LedgerMono = /* @__PURE__ */ createIcon(
  'LedgerMono',
  '0 0 29 24',
  () => (
    <path d="M.715 17.185V24h10.37v-1.511H2.226v-5.304zm26.059 0v5.304h-8.86v1.51h10.37v-6.814zM11.1 6.815v10.37h6.815v-1.363H12.61V6.815zM.715 0v6.815h1.511V1.51h8.86V0zm17.2 0v1.511h8.859v5.304h1.51V0z" />
  ),
  { fill: 'currentColor' },
);
