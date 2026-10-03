import { createIcon } from '../utils';

// Source: https://soliditylang.org
/** Solidity devtool icon (colored). */
export const Solidity = /* @__PURE__ */ createIcon(
  'Solidity',
  '0 0 64 64',
  () => (
    <>
      <path d="M40.954 4 31.95 20H13.956l8.998-16z" opacity=".45" />
      <path d="M31.95 20.001h18.001L40.954 4h-18z" opacity=".6" />
      <path d="M22.954 35.997 31.95 20 22.954 4l-8.998 16z" opacity=".8" />
      <path d="m23.04 60 9.004-16.002h18l-9.003 16.001z" opacity=".45" />
      <path d="M32.044 43.998h-18L23.04 60h18z" opacity=".6" />
      <path
        d="m41.041 28.002-8.997 15.996L41.041 60l9.003-16.002z"
        opacity=".8"
      />
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
      <path d="M40.954 4 31.95 20H13.956l8.998-16z" opacity=".45" />
      <path d="M31.95 20.001h18.001L40.954 4h-18z" opacity=".6" />
      <path d="M22.954 35.997 31.95 20 22.954 4l-8.998 16z" opacity=".8" />
      <path d="m23.04 60 9.004-16.002h18l-9.003 16.001z" opacity=".45" />
      <path d="M32.044 43.998h-18L23.04 60h18z" opacity=".6" />
      <path
        d="m41.041 28.002-8.997 15.996L41.041 60l9.003-16.002z"
        opacity=".8"
      />
    </>
  ),
  { fill: 'currentColor' },
);
