import { createIcon } from '../utils';

// Source: https://ledger.com
/** Ledger wallet icon (colored). */
export const Ledger = /* @__PURE__ */ createIcon(
  'Ledger',
  '0 0 64 64',
  () => (
    <path d="M4.02 42.53v13.83h21.05v-3.07H7.09V42.53zm52.9 0v10.76h-18v3.07h21.05V42.53zM25.1 21.48v21.04h13.83v-2.76H28.17V21.48zM4.02 7.64v13.84h3.07V10.7h17.98V7.64zm34.91 0v3.07h17.98v10.77h3.07V7.64z" />
  ),
  { fill: '#000000' },
);

/** Ledger wallet icon (monochrome). */
export const LedgerMono = /* @__PURE__ */ createIcon(
  'LedgerMono',
  '0 0 64 64',
  () => (
    <path d="M4.02 42.53v13.83h21.05v-3.07H7.09V42.53zm52.9 0v10.76h-18v3.07h21.05V42.53zM25.1 21.48v21.04h13.83v-2.76H28.17V21.48zM4.02 7.64v13.84h3.07V10.7h17.98V7.64zm34.91 0v3.07h17.98v10.77h3.07V7.64z" />
  ),
  { fill: 'currentColor' },
);
