import { createIcon } from '../utils';

/** CryptoCom exchange icon (colored). */
export const CryptoCom = createIcon(
  'CryptoCom',
  '0 0 24 24',
  () => (
    <>
      <path fill="#03316C" d="M12 3.001 4.2 7.505v8.999L12 21l7.8-4.496v-9z" />
      <path
        fill="white"
        d="M15.078 17.487h-1.113l-1.321-1.221v-.625l1.371-1.307V12.25l1.796-1.171 2.047 1.544zm-4.596-3.283.208-1.953-.675-1.753h3.972l-.661 1.753.187 1.953zm.905 2.061-1.322 1.236H8.938l-2.794-4.877 2.061-1.53 1.81 1.157v2.083l1.372 1.307zM8.923 6.893h6.141l.733 3.124H8.205z"
      />
    </>
  ),
  'none',
);

/** CryptoCom exchange icon (monochrome). */
export const CryptoComMono = createIcon(
  'CryptoComMono',
  '0 0 24 24',
  () => (
    <path
      fillRule="evenodd"
      d="M15.078 17.488h-1.114l-1.321-1.221v-.625l1.372-1.308v-2.083l1.795-1.17 2.048 1.544zm-4.597-3.283.208-1.954-.675-1.752h3.972l-.66 1.752.186 1.954zm.905 2.062-1.322 1.235H8.937l-2.795-4.877 2.062-1.53 1.81 1.156v2.083l1.372 1.308zM8.922 6.893h6.141l.733 3.125H8.204zM11.996 3 4.203 7.504v9L11.996 21l7.8-4.496v-9z"
    />
  ),
  'currentColor',
);
