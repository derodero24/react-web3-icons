import { createIcon } from '../utils';

// Source: https://github.com/ethers-io/ethers.js/blob/main/docs.wrm/logo.svg
// Source: https://docs.ethers.org/v6/static/logo.svg
// Colored: the path of the official logo.svg from the ethers.js repository (identical to the file docs.ethers.org serves), evenodd, filled #1D4C7C. Ethers publishes its vector logo only in white (logo.ai in the same folder has the same single white path, drawn on the dark #334 docs sidebar), and ethers.org itself shows the logo in #1D4C7C (html color in https://ethers.org/static/style.css and its homepage logo.png). A white-only default would vanish on light backgrounds, so the default uses the official path in the colour the official site renders it in
// Mono: the same path in currentColor (EthersJsMono with color="#fff" is the docs' white logo)
// The homepage logo.png is a raster with a thinner, different drawing of the cloud, so it is not used as artwork
// The previous colour #24339B matched no official asset
/** Ethers Js devtool icon (colored). */
export const EthersJs = /* @__PURE__ */ createIcon(
  'EthersJs',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M60 44.7C30.72 48.53 9.82 53.12 9.51 34.26c0 0 .64-7.31 9.6-7.77 0 0 .3-6.5 7.16-7.23 3.68-.4 7.86 3.4 8.32 7.39 0 0 9.06-1.68 9.45 7.15.14 3.08-.56 8.32-9.3 8.09 0 0-5.05-.69-5.74-8.5-1.42 15.13 20.46 14.25 20.78.5.13-5.94-3.67-12.05-12.24-10.9-4.7-11.83-17.21-11.15-21.87-.19C9 22.8 3.92 27.93 4 34.62c.25 21.54 30.22 15.05 56 10.08"
      clipRule="evenodd"
    />
  ),
  { fill: '#1D4C7C' },
);

/** Ethers Js devtool icon (monochrome). */
export const EthersJsMono = /* @__PURE__ */ createIcon(
  'EthersJsMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M60 44.7C30.72 48.53 9.82 53.12 9.51 34.26c0 0 .64-7.31 9.6-7.77 0 0 .3-6.5 7.16-7.23 3.68-.4 7.86 3.4 8.32 7.39 0 0 9.06-1.68 9.45 7.15.14 3.08-.56 8.32-9.3 8.09 0 0-5.05-.69-5.74-8.5-1.42 15.13 20.46 14.25 20.78.5.13-5.94-3.67-12.05-12.24-10.9-4.7-11.83-17.21-11.15-21.87-.19C9 22.8 3.92 27.93 4 34.62c.25 21.54 30.22 15.05 56 10.08"
      clipRule="evenodd"
    />
  ),
  { fill: 'currentColor' },
);
