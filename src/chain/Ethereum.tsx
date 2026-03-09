import { createIcon } from '../utils';

export const Ethereum = createIcon('Ethereum', '0 0 784.37 1277.39', () => (
  <>
    <path
      fill="#343434"
      d="M392.07 0l-8.57 29.11v844.63l8.57 8.55 392.06-231.75z"
    />
    <path fill="#8c8c8c" d="M392.07 0L0 650.54l392.07 231.75V472.33z" />
    <path
      fill="#3c3c3b"
      d="M392.07 956.52l-4.83 5.89v300.87l4.83 14.1 392.3-552.49z"
    />
    <path fill="#8c8c8c" d="M392.07 1277.38V956.52L0 724.89z" />
    <path fill="#141414" d="M392.07 882.29l392.06-231.75-392.06-178.21z" />
    <path fill="#393939" d="M0 650.54l392.07 231.75V472.33z" />
  </>
));

// Ethereum diamond paths scaled to fit in a 64×64 circle (≈72% fill).
// Original viewBox 0 0 784.37 1277.39 → scale 0.036, translate(17.9, 9)
const ETH_CIRCLE_TX = 'translate(17.9 9) scale(0.036)';

export const EthereumCircle = createIcon('EthereumCircle', '0 0 64 64', () => (
  <>
    <circle cx="32" cy="32" r="32" fill="#343434" />
    <g transform={ETH_CIRCLE_TX}>
      <path
        fill="#fff"
        d="M392.07 0l-8.57 29.11v844.63l8.57 8.55 392.06-231.75z"
      />
      <path
        fill="#fff"
        opacity="0.6"
        d="M392.07 0L0 650.54l392.07 231.75V472.33z"
      />
      <path
        fill="#fff"
        d="M392.07 956.52l-4.83 5.89v300.87l4.83 14.1 392.3-552.49z"
      />
      <path fill="#fff" opacity="0.6" d="M392.07 1277.38V956.52L0 724.89z" />
      <path fill="#fff" d="M392.07 882.29l392.06-231.75-392.06-178.21z" />
      <path fill="#fff" opacity="0.6" d="M0 650.54l392.07 231.75V472.33z" />
    </g>
  </>
));

export const EthereumCircleMono = createIcon(
  'EthereumCircleMono',
  '0 0 64 64',
  _id => (
    <>
      <circle cx="32" cy="32" r="32" mask={`url(#${_id}-ethc-a)`} />
      <defs>
        <mask id={`${_id}-ethc-a`}>
          <rect width="100%" height="100%" fill="#fff" />
          <g transform={ETH_CIRCLE_TX} fill="#000">
            <path d="M392.07 0l-8.57 29.11v844.63l8.57 8.55 392.06-231.75z" />
            <path d="M392.07 0L0 650.54l392.07 231.75V472.33z" />
            <path d="M392.07 956.52l-4.83 5.89v300.87l4.83 14.1 392.3-552.49z" />
            <path d="M392.07 1277.38V956.52L0 724.89z" />
            <path d="M392.07 882.29l392.06-231.75-392.06-178.21z" />
            <path d="M0 650.54l392.07 231.75V472.33z" />
          </g>
        </mask>
      </defs>
    </>
  ),
  'currentColor',
);

export const EthereumSquare = createIcon('EthereumSquare', '0 0 64 64', () => (
  <>
    <rect width="64" height="64" rx="12.8" fill="#343434" />
    <g transform={ETH_CIRCLE_TX}>
      <path
        fill="#fff"
        d="M392.07 0l-8.57 29.11v844.63l8.57 8.55 392.06-231.75z"
      />
      <path
        fill="#fff"
        opacity="0.6"
        d="M392.07 0L0 650.54l392.07 231.75V472.33z"
      />
      <path
        fill="#fff"
        d="M392.07 956.52l-4.83 5.89v300.87l4.83 14.1 392.3-552.49z"
      />
      <path fill="#fff" opacity="0.6" d="M392.07 1277.38V956.52L0 724.89z" />
      <path fill="#fff" d="M392.07 882.29l392.06-231.75-392.06-178.21z" />
      <path fill="#fff" opacity="0.6" d="M0 650.54l392.07 231.75V472.33z" />
    </g>
  </>
));

export const EthereumSquareMono = createIcon(
  'EthereumSquareMono',
  '0 0 64 64',
  _id => (
    <>
      <rect width="64" height="64" rx="12.8" mask={`url(#${_id}-eths-a)`} />
      <defs>
        <mask id={`${_id}-eths-a`}>
          <rect width="100%" height="100%" fill="#fff" />
          <g transform={ETH_CIRCLE_TX} fill="#000">
            <path d="M392.07 0l-8.57 29.11v844.63l8.57 8.55 392.06-231.75z" />
            <path d="M392.07 0L0 650.54l392.07 231.75V472.33z" />
            <path d="M392.07 956.52l-4.83 5.89v300.87l4.83 14.1 392.3-552.49z" />
            <path d="M392.07 1277.38V956.52L0 724.89z" />
            <path d="M392.07 882.29l392.06-231.75-392.06-178.21z" />
            <path d="M0 650.54l392.07 231.75V472.33z" />
          </g>
        </mask>
      </defs>
    </>
  ),
  'currentColor',
);

export const EthereumMono = createIcon(
  'EthereumMono',
  '0 0 784.37 1277.39',
  () => (
    <>
      <path
        opacity="0.98"
        d="M392.07 0l-8.57 29.11v844.63l8.57 8.55 392.06-231.75z"
      />
      <path opacity="0.85" d="M392.07 0L0 650.54l392.07 231.75V472.33z" />
      <path
        opacity="0.94"
        d="M392.07 956.52l-4.83 5.89v300.87l4.83 14.1 392.3-552.49z"
      />
      <path opacity="0.85" d="M392.07 1277.38V956.52L0 724.89z" />
      <path d="M392.07 882.29l392.06-231.75-392.06-178.21z" />
      <path opacity="0.96" d="M0 650.54l392.07 231.75V472.33z" />
    </>
  ),
  'currentColor',
);
