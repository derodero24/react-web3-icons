import { createIcon } from '../utils';

// Source: https://crypto.com (official brand)
/** Crypto Com exchange icon (colored). */
export const CryptoCom = /* @__PURE__ */ createIcon(
  'CryptoCom',
  '0 0 64 64',
  () => (
    <>
      <path
        fill="#03316C"
        d="M32 4.012 7.74 18.02v27.988L32 59.992l24.26-13.984V18.017z"
      />
      <path
        fill="white"
        d="M41.573 49.066h-3.461l-4.109-3.798v-1.944l4.264-4.065v-6.481l5.586-3.642 6.366 4.802zM27.28 38.855l.647-6.074-2.1-5.452H38.18l-2.056 5.452.582 6.074zm2.815 6.41-4.112 3.844h-3.505l-8.69-15.168 6.41-4.759 5.63 3.599v6.478l4.267 4.065zM22.43 16.116h19.1l2.28 9.717H20.196z"
      />
    </>
  ),
  { fill: 'none' },
);

/** Crypto Com exchange icon (monochrome). */
export const CryptoComMono = /* @__PURE__ */ createIcon(
  'CryptoComMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M41.573 49.069h-3.465L34 45.27v-1.944l4.267-4.068V32.78l5.583-3.64 6.37 4.803zM27.276 38.858l.647-6.077-2.1-5.45h12.354l-2.053 5.45.579 6.077zm2.814 6.413-4.111 3.841h-3.505L13.78 33.944l6.413-4.759 5.63 3.596v6.478l4.266 4.068zm-7.663-29.155h19.1l2.28 9.72H20.193zm9.56-12.107L7.75 18.017v27.991l24.238 13.984 24.259-13.984V18.017z"
    />
  ),
  { fill: 'currentColor' },
);
