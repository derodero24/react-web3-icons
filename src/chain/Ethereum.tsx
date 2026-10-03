import { createIcon } from '../utils';

// Source: https://ethereum.org
// Ethereum diamond paths scaled to fit in a 64×64 circle (≈72% fill).
// Original viewBox 0 0 784.37 1277.39 → scale 0.036, translate(17.9, 9)
// CircleMono / SquareMono: the diamond is knocked out with 1.2-unit ink seams on the facet edges that the colored art shows (the left/right split and the inner edge of the translucent left facet), derived from the colored facet paths.
/** Ethereum chain icon (colored). */
export const Ethereum = /* @__PURE__ */ createIcon(
  'Ethereum',
  '0 0 64 64',
  () => (
    <>
      <path fill="#343434" d="m32 4-.38 1.28V42.3l.38.38 17.18-10.16z" />
      <path fill="#8c8c8c" d="M32 4 14.8 32.52 32 42.68V24.7z" />
      <path fill="#3c3c3b" d="m32 45.93-.22.26v13.2l.22.6 17.2-24.21z" />
      <path fill="#8c8c8c" d="M32 60V45.93L14.8 35.78z" />
      <path fill="#141414" d="m32 42.68 17.18-10.16L32 24.7z" />
      <path fill="#393939" d="M14.8 32.52 32 42.68V24.7z" />
    </>
  ),
  {},
);

/** Ethereum Circle chain icon (colored). */
export const EthereumCircle = /* @__PURE__ */ createIcon(
  'EthereumCircle',
  '0 0 64 64',
  () => (
    <>
      <circle cx="32" cy="32" r="32" fill="#343434" />
      <g fill="#fff">
        <path d="m32.01 9-.3 1.05v30.4l.3.31 14.12-8.34z" />
        <path d="M32.01 9 17.9 32.42l14.11 8.34V26z" opacity=".6" />
        <path d="m32.01 43.43-.17.22v10.83l.17.5L46.14 35.1z" />
        <path d="M32.01 54.99V43.43L17.9 35.1z" opacity=".6" />
        <path d="m32.01 40.76 14.12-8.34L32 26z" />
        <path d="m17.9 32.42 14.11 8.34V26z" opacity=".6" />
      </g>
    </>
  ),
  {},
);

/** Ethereum Circle chain icon (monochrome). */
export const EthereumCircleMono = /* @__PURE__ */ createIcon(
  'EthereumCircleMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M0 32C0 14.33 14.33 0 32 0s32 14.33 32 32-14.33 32-32 32S0 49.67 0 32m32.61-22v30.4l13.52-7.98zm0 33.08v11.06L46.14 35.1zM31.23 53.9V43.45l.25-.33L17.9 35.1zm-.13-43.4-12.65 21 12.66-5.76zM18.53 32.8l12.58 7.43V27.07z"
    />
  ),
  { fill: 'currentColor' },
);

/** Ethereum Square chain icon (colored). */
export const EthereumSquare = /* @__PURE__ */ createIcon(
  'EthereumSquare',
  '0 0 64 64',
  () => (
    <>
      <rect width="64" height="64" fill="#343434" rx="12.8" />
      <g fill="#fff">
        <path d="m32.01 9-.3 1.05v30.4l.3.31 14.12-8.34z" />
        <path d="M32.01 9 17.9 32.42l14.11 8.34V26z" opacity=".6" />
        <path d="m32.01 43.43-.17.22v10.83l.17.5L46.14 35.1z" />
        <path d="M32.01 54.99V43.43L17.9 35.1z" opacity=".6" />
        <path d="m32.01 40.76 14.12-8.34L32 26z" />
        <path d="m17.9 32.42 14.11 8.34V26z" opacity=".6" />
      </g>
    </>
  ),
  {},
);

/** Ethereum Square chain icon (monochrome). */
export const EthereumSquareMono = /* @__PURE__ */ createIcon(
  'EthereumSquareMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M12.8 64C5.73 64 0 58.27 0 51.2V12.8C0 5.73 5.73 0 12.8 0h38.4C58.27 0 64 5.73 64 12.8v38.4C64 58.27 58.27 64 51.2 64zm19.81-54v30.4l13.52-7.98zm0 33.08v11.06L46.14 35.1zM31.23 53.9V43.45l.25-.33L17.9 35.1zm-.13-43.4-12.65 21 12.66-5.76zM18.53 32.8l12.58 7.43V27.07z"
    />
  ),
  { fill: 'currentColor' },
);

/** Ethereum chain icon (monochrome). */
export const EthereumMono = /* @__PURE__ */ createIcon(
  'EthereumMono',
  '0 0 64 64',
  () => (
    <>
      <path d="m32 4-.38 1.28V42.3l.38.38 17.18-10.16z" opacity=".98" />
      <path d="M32 4 14.8 32.52 32 42.68V24.7z" opacity=".85" />
      <path d="m32 45.93-.22.26v13.2l.22.6 17.2-24.21z" opacity=".94" />
      <path d="M32 60V45.93L14.8 35.78z" opacity=".85" />
      <path d="m32 42.68 17.18-10.16L32 24.7z" />
      <path d="M14.8 32.52 32 42.68V24.7z" opacity=".96" />
    </>
  ),
  { fill: 'currentColor' },
);
