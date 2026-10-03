import { createIcon } from '../utils';

// Source: https://soliditylang.org
/** Solidity devtool icon (colored). */
export const Solidity = /* @__PURE__ */ createIcon(
  'Solidity',
  '0 0 64 64',
  () => (
    <>
      <path d="m40.95 4-9 16h-18l9-16z" opacity=".45" />
      <path d="M31.95 20h18l-9-16h-18z" opacity=".6" />
      <path d="m22.95 36 9-16-9-16-9 16z" opacity=".8" />
      <path d="m23.04 60 9-16h18l-9 16z" opacity=".45" />
      <path d="M32.04 44h-18l9 16h18z" opacity=".6" />
      <path d="m41.04 28-9 16 9 16 9-16z" opacity=".8" />
    </>
  ),
  { fill: '#2B247C' },
);

/** Solidity devtool icon (monochrome). */
export const SolidityMono = /* @__PURE__ */ createIcon(
  'SolidityMono',
  '0 0 64 64',
  () => (
    <>
      <path d="m40.95 4-9 16h-18l9-16z" opacity=".45" />
      <path d="M31.95 20h18l-9-16h-18z" opacity=".6" />
      <path d="m22.95 36 9-16-9-16-9 16z" opacity=".8" />
      <path d="m23.04 60 9-16h18l-9 16z" opacity=".45" />
      <path d="M32.04 44h-18l9 16h18z" opacity=".6" />
      <path d="m41.04 28-9 16 9 16 9-16z" opacity=".8" />
    </>
  ),
  { fill: 'currentColor' },
);
