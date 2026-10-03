import { createIcon } from '../utils';

// Source: https://app.eigenlayer.xyz/logo/markLightA.svg (now 403; path data preserved from original retrieval)
/** Eigen Layer DeFi icon (colored). */
export const EigenLayer = /* @__PURE__ */ createIcon(
  'EigenLayer',
  '0 0 525 600',
  () => (
    <path
      fillRule="evenodd"
      d="M150 300V0H0v600h450V450H300V300h150V150h75V0h-75v150h-75V0H228v75h72v225h-75v150h-75z"
      clipRule="evenodd"
    />
  ),
  { fill: '#1A0C6D' },
);

/** Eigen Layer DeFi icon (monochrome). */
export const EigenLayerMono = /* @__PURE__ */ createIcon(
  'EigenLayerMono',
  '0 0 525 600',
  () => (
    <path
      fillRule="evenodd"
      d="M150 300V0H0v600h450V450H300V300h150V150h75V0h-75v150h-75V0H228v75h72v225h-75v150h-75z"
      clipRule="evenodd"
    />
  ),
  { fill: 'currentColor' },
);
