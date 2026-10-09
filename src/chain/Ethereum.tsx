import { createIcon } from '../utils';

// Source: https://ethereum.org/assets/ (ethereum.org brand assets, accessed 2026-10-09: "ETH diamond (gray)")
// Source: https://ethereum.org/images/assets/svgs/eth-diamond-black.svg (the "ETH diamond (gray)" SVG download)
// Default: the Ethereum diamond as six opaque grey faces (upper left #8C8C8C, upper right #343434, middle band #393939 / #141414, lower left #8C8C8C, lower right #3C3C3B), placed on the 64 grid; artwork predating the source policy whose origin file was not recorded. Its geometry is that of eth-diamond-black.svg, and its greys are that file's black opacity tiers (.45, .6, .8 and their overlaps) composited over white, within a few levels (the lower right face is #3C3C3B where .8 gives #333333), so the two render alike on white
// Mono: eth-diamond-black.svg itself, its five paths unchanged in currentColor with the file's own opacity tiers (.6 for the middle band, .45 for the left faces, .8 for the right faces), placed on the 64 grid like the default (docs/icon-variants.md, mono rule 5). It replaces a mono whose near-opaque tiers (.85 to 1) hid the facets
// Circle and Square: repository containers, as ethereum.org ships no containered diamond: the diamond in white on a #343434 disc or square (rx 12.8), with the left faces at opacity .6
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
      <path d="m32 24.7-17.2 7.83L32 42.68l17.19-10.16z" opacity=".6" />
      <path d="M14.82 32.52 32 42.68V4z" opacity=".45" />
      <path d="M32 4v38.68l17.18-10.16z" opacity=".8" />
      <path d="M14.81 35.78 32 59.99V45.93z" opacity=".45" />
      <path d="M32 45.93v14.06l17.19-24.21z" opacity=".8" />
    </>
  ),
  { fill: 'currentColor' },
);
