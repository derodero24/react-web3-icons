import { createIcon } from '../utils';

// Source: https://www.eigencloud.xyz (site header logo: the inline <svg aria-label="Eigen Cloud">, whose three symbol paths are this mark)
// Source: https://app.eigenlayer.xyz/logo/markLightA.svg (original source, now 403)
// The mark is unchanged: it is the symbol of the current EigenCloud logo on eigencloud.xyz (eigenlayer.xyz redirects there), which the site draws in white; #1A0C6D is the colour of the original markLightA.svg
/** Eigen Layer DeFi icon (colored). */
export const EigenLayer = /* @__PURE__ */ createIcon(
  'EigenLayer',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M21.5 32V4h-14v56h42V46h-14V32h14V18h7V4h-7v14h-7V4H28.78v7h6.72v21h-7v14h-7z"
      clipRule="evenodd"
    />
  ),
  { fill: '#1A0C6D' },
);

/** Eigen Layer DeFi icon (monochrome). */
export const EigenLayerMono = /* @__PURE__ */ createIcon(
  'EigenLayerMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M21.5 32V4h-14v56h42V46h-14V32h14V18h7V4h-7v14h-7V4H28.78v7h6.72v21h-7v14h-7z"
      clipRule="evenodd"
    />
  ),
  { fill: 'currentColor' },
);
