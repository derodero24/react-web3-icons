import { createIcon } from '../utils';

const ledgerContent = () => (
  <path d="M0.715088 17.1853V24H11.0853V22.4887H2.22605V17.1853H0.715088ZM26.7739 17.1853V22.4887H17.9147V23.9996H28.2849V17.1853H26.7739ZM11.1003 6.81473V17.1849H17.9147V15.822H12.6113V6.81473H11.1003ZM0.715088 0V6.81473H2.22605V1.51096H11.0853V0H0.715088ZM17.9147 0V1.51096H26.7739V6.81473H28.2849V0H17.9147Z" />
);

export const Ledger = createIcon(
  'Ledger',
  '0 0 29 24',
  ledgerContent,
  '#000000',
);

export const LedgerMono = createIcon(
  'LedgerMono',
  '0 0 29 24',
  ledgerContent,
  'currentColor',
);
