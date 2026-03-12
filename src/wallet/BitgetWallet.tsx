import { createIcon } from '../utils';

const bitgetWalletContent = () => (
  <>
    <path d="M11.121 9.46h4.283l4.381 4.555a.785.785 0 0 1 .003 1.076L14.17 21H9.757l1.334-1.357 4.898-5.092-4.836-5.092" />
    <path d="M12.879 14.54H8.596L4.215 9.986a.785.785 0 0 1-.003-1.076L9.83 3h4.412l-1.334 1.357L8.01 9.449l4.836 5.092" />
  </>
);

/** Bitget Wallet wallet icon (colored). */
export const BitgetWallet = createIcon(
  'BitgetWallet',
  '0 0 24 24',
  bitgetWalletContent,
  '#00F0FF',
);

/** Bitget Wallet wallet icon (monochrome). */
export const BitgetWalletMono = createIcon(
  'BitgetWalletMono',
  '0 0 24 24',
  bitgetWalletContent,
  'currentColor',
);
