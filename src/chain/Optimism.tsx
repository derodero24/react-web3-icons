import { createIcon } from '../utils';

const OP_SYMBOL =
  'M14 26.25v-5.185c5.333 0 9.658-4.324 9.658-9.657S19.333 1.75 14 1.75v5.185c-5.333 0-9.658 4.324-9.658 9.657S8.667 26.25 14 26.25Zm4.778-12.205v-.09c-2.106-1.049-3.684-2.627-4.733-4.733h-.09c-1.049 2.106-2.627 3.684-4.733 4.733v.09c2.106 1.049 3.684 2.627 4.733 4.733h.09c1.049-2.106 2.627-3.684 4.733-4.733Z';

/** Optimism chain icon (colored). */
export const Optimism = createIcon('Optimism', '0 0 28 28', () => (
  <>
    <circle cx="14" cy="14" r="14" fill="#FF0420" />
    <path d={OP_SYMBOL} fill="#fff" />
  </>
));

/** Optimism chain icon (monochrome). */
export const OptimismMono = createIcon(
  'OptimismMono',
  '0 0 28 28',
  _id => (
    <>
      <circle cx="14" cy="14" r="14" mask={`url(#${_id}-a)`} />
      <defs>
        <mask id={`${_id}-a`}>
          <rect width="100%" height="100%" fill="#fff" />
          <path d={OP_SYMBOL} fill="#000" />
        </mask>
      </defs>
    </>
  ),
  'currentColor',
);

// Circle variant: 28×28 content scaled to ~46px centered in 64×64
const OP_CIRCLE_TX = 'translate(9 9) scale(1.643)';

/** Optimism Circle chain icon (colored). */
export const OptimismCircle = createIcon('OptimismCircle', '0 0 64 64', () => (
  <>
    <circle cx="32" cy="32" r="32" fill="#FF0420" />
    <g transform={OP_CIRCLE_TX}>
      <path d={OP_SYMBOL} fill="#fff" />
    </g>
  </>
));

/** Optimism Square chain icon (colored). */
export const OptimismSquare = createIcon('OptimismSquare', '0 0 64 64', () => (
  <>
    <rect width="64" height="64" rx="12.8" fill="#FF0420" />
    <g transform={OP_CIRCLE_TX}>
      <path d={OP_SYMBOL} fill="#fff" />
    </g>
  </>
));

/** Optimism Square chain icon (monochrome). */
export const OptimismSquareMono = createIcon(
  'OptimismSquareMono',
  '0 0 64 64',
  _id => (
    <>
      <rect width="64" height="64" rx="12.8" mask={`url(#${_id}-opts-a)`} />
      <defs>
        <mask id={`${_id}-opts-a`}>
          <rect width="100%" height="100%" fill="#fff" />
          <g transform={OP_CIRCLE_TX} fill="#000">
            <path d={OP_SYMBOL} />
          </g>
        </mask>
      </defs>
    </>
  ),
  'currentColor',
);

/** Optimism Circle chain icon (monochrome). */
export const OptimismCircleMono = createIcon(
  'OptimismCircleMono',
  '0 0 64 64',
  _id => (
    <>
      <circle cx="32" cy="32" r="32" mask={`url(#${_id}-optc-a)`} />
      <defs>
        <mask id={`${_id}-optc-a`}>
          <rect width="100%" height="100%" fill="#fff" />
          <g transform={OP_CIRCLE_TX} fill="#000">
            <path d={OP_SYMBOL} />
          </g>
        </mask>
      </defs>
    </>
  ),
  'currentColor',
);
