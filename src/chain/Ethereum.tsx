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
      <path
        fill="#343434"
        d="m31.995 4-.376 1.276v37.028l.376.375 17.188-10.16z"
      />
      <path fill="#8c8c8c" d="M31.995 4 14.807 32.52l17.188 10.159V24.707z" />
      <path
        fill="#3c3c3b"
        d="m31.995 45.933-.212.258v13.19l.212.618 17.198-24.22z"
      />
      <path fill="#8c8c8c" d="M31.995 60V45.932L14.807 35.78z" />
      <path fill="#141414" d="m31.995 42.679 17.188-10.16-17.188-7.812z" />
      <path fill="#393939" d="m14.807 32.52 17.188 10.159V24.707z" />
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
  '0 0 64 64',
  () => (
    <>
      <path
        d="m31.995 4-.376 1.276v37.028l.376.375 17.188-10.16z"
        opacity=".98"
      />
      <path d="M31.995 4 14.807 32.52l17.188 10.159V24.707z" opacity=".85" />
      <path
        d="m31.995 45.933-.212.258v13.19l.212.618 17.198-24.22z"
        opacity=".94"
      />
      <path d="M31.995 60V45.932L14.807 35.78z" opacity=".85" />
      <path d="m31.995 42.679 17.188-10.16-17.188-7.812z" />
      <path d="m14.807 32.52 17.188 10.159V24.707z" opacity=".96" />
    </>
  ),
  { fill: 'currentColor' },
);
