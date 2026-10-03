import { createIcon } from '../utils';

// Source: https://ethereum.org
// Ethereum diamond paths scaled to fit in a 64×64 circle (≈72% fill).
// Original viewBox 0 0 784.37 1277.39 → scale 0.036, translate(17.9, 9)
/** Ethereum chain icon (colored). */
export const Ethereum = /* @__PURE__ */ createIcon(
  'Ethereum',
  '0 0 784.37 1277.39',
  () => (
    <>
      <path
        fill="#343434"
        d="m392.07 0-8.57 29.11v844.63l8.57 8.55 392.06-231.75z"
      />
      <path fill="#8c8c8c" d="M392.07 0 0 650.54l392.07 231.75V472.33z" />
      <path
        fill="#3c3c3b"
        d="m392.07 956.52-4.83 5.89v300.87l4.83 14.1 392.3-552.49z"
      />
      <path fill="#8c8c8c" d="M392.07 1277.38V956.52L0 724.89z" />
      <path fill="#141414" d="m392.07 882.29 392.06-231.75-392.06-178.21z" />
      <path fill="#393939" d="m0 650.54 392.07 231.75V472.33z" />
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
        <path d="m32.015 9-.309 1.048v30.407l.309.307 14.114-8.343z" />
        <path d="M32.015 9 17.9 32.42l14.115 8.342V26.004z" opacity=".6" />
        <path d="m32.015 43.435-.174.212v10.831l.174.508 14.122-19.89z" />
        <path d="M32.015 54.986V43.435L17.9 35.096z" opacity=".6" />
        <path d="m32.015 40.762 14.114-8.343-14.114-6.415z" />
        <path d="m17.9 32.42 14.115 8.342V26.004z" opacity=".6" />
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
            <path d="m32.015 9-.309 1.048v30.407l.309.307 14.114-8.343z" />
            <path d="M32.015 9 17.9 32.42l14.115 8.342V26.004z" />
            <path d="m32.015 43.435-.174.212v10.831l.174.508 14.122-19.89z" />
            <path d="M32.015 54.986V43.435L17.9 35.096z" />
            <path d="m32.015 40.762 14.114-8.343-14.114-6.415z" />
            <path d="m17.9 32.42 14.115 8.342V26.004z" />
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
        <path d="m32.015 9-.309 1.048v30.407l.309.307 14.114-8.343z" />
        <path d="M32.015 9 17.9 32.42l14.115 8.342V26.004z" opacity=".6" />
        <path d="m32.015 43.435-.174.212v10.831l.174.508 14.122-19.89z" />
        <path d="M32.015 54.986V43.435L17.9 35.096z" opacity=".6" />
        <path d="m32.015 40.762 14.114-8.343-14.114-6.415z" />
        <path d="m17.9 32.42 14.115 8.342V26.004z" opacity=".6" />
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
            <path d="m32.015 9-.309 1.048v30.407l.309.307 14.114-8.343z" />
            <path d="M32.015 9 17.9 32.42l14.115 8.342V26.004z" />
            <path d="m32.015 43.435-.174.212v10.831l.174.508 14.122-19.89z" />
            <path d="M32.015 54.986V43.435L17.9 35.096z" />
            <path d="m32.015 40.762 14.114-8.343-14.114-6.415z" />
            <path d="m17.9 32.42 14.115 8.342V26.004z" />
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
  '0 0 784.37 1277.39',
  () => (
    <>
      <path
        d="m392.07 0-8.57 29.11v844.63l8.57 8.55 392.06-231.75z"
        opacity=".98"
      />
      <path d="M392.07 0 0 650.54l392.07 231.75V472.33z" opacity=".85" />
      <path
        d="m392.07 956.52-4.83 5.89v300.87l4.83 14.1 392.3-552.49z"
        opacity=".94"
      />
      <path d="M392.07 1277.38V956.52L0 724.89z" opacity=".85" />
      <path d="m392.07 882.29 392.06-231.75-392.06-178.21z" />
      <path d="m0 650.54 392.07 231.75V472.33z" opacity=".96" />
    </>
  ),
  { fill: 'currentColor' },
);
