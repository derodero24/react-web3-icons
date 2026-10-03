import { createIcon } from '../utils';

// Source: https://ethereum.org
// Ethereum diamond paths scaled to fit in a 64×64 circle (≈72% fill).
// Original viewBox 0 0 784.37 1277.39 → scale 0.036, translate(17.9, 9)
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
  (_props, _id) => (
    <>
      <circle cx="32" cy="32" r="32" mask={`url(#${_id}-ethc-a)`} />
      <defs>
        <mask id={`${_id}-ethc-a`}>
          <rect width="100%" height="100%" fill="#fff" />
          <g fill="#000">
            <path d="m32.01 9-.3 1.05v30.4l.3.31 14.12-8.34z" />
            <path d="M32.01 9 17.9 32.42l14.11 8.34V26z" />
            <path d="m32.01 43.43-.17.22v10.83l.17.5L46.14 35.1z" />
            <path d="M32.01 54.99V43.43L17.9 35.1z" />
            <path d="m32.01 40.76 14.12-8.34L32 26z" />
            <path d="m17.9 32.42 14.11 8.34V26z" />
          </g>
        </mask>
      </defs>
    </>
  ),
  { fill: 'currentColor', ids: true },
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
  (_props, _id) => (
    <>
      <rect width="64" height="64" mask={`url(#${_id}-eths-a)`} rx="12.8" />
      <defs>
        <mask id={`${_id}-eths-a`}>
          <rect width="100%" height="100%" fill="#fff" />
          <g fill="#000">
            <path d="m32.01 9-.3 1.05v30.4l.3.31 14.12-8.34z" />
            <path d="M32.01 9 17.9 32.42l14.11 8.34V26z" />
            <path d="m32.01 43.43-.17.22v10.83l.17.5L46.14 35.1z" />
            <path d="M32.01 54.99V43.43L17.9 35.1z" />
            <path d="m32.01 40.76 14.12-8.34L32 26z" />
            <path d="m17.9 32.42 14.11 8.34V26z" />
          </g>
        </mask>
      </defs>
    </>
  ),
  { fill: 'currentColor', ids: true },
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
