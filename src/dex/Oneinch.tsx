import { createIcon } from '../utils';

// Source: https://1inch.io
/** Oneinch DEX icon (colored). */
export const Oneinch = /* @__PURE__ */ createIcon(
  'Oneinch',
  '0 0 64 64',
  () => (
    <g transform="scale(1.6)">
      <rect width="40" height="40" fill="#E82219" rx="8" />
      <path
        fill="#FFFFFF"
        d="M13 30.34h14v-2.95h-5.16V9.66h-3.06c-.12 2.48-.83 3.1-4.22 3.1H13v2.83h5.16v11.8H13z"
      />
      <path fill="#FFFFFF" d="M28.48 15.6V9.65h-2.95v5.93z" />
      <path fill="#FFFFFF" d="M33.67 15.6V9.65h-2.95v5.93z" />
    </g>
  ),
  { fill: 'none' },
);

/** Oneinch DEX icon (monochrome). */
export const OneinchMono = /* @__PURE__ */ createIcon(
  'OneinchMono',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="scale(1.6)">
      <rect width="40" height="40" mask={`url(#${_id}-1i-m)`} rx="8" />
      <defs>
        <mask id={`${_id}-1i-m`}>
          <rect width="40" height="40" fill="white" />
          <path
            fill="black"
            d="M13 30.34h14v-2.95h-5.16V9.66h-3.06c-.12 2.48-.83 3.1-4.22 3.1H13v2.83h5.16v11.8H13z"
          />
          <path fill="black" d="M28.48 15.6V9.65h-2.95v5.93z" />
          <path fill="black" d="M33.67 15.6V9.65h-2.95v5.93z" />
        </mask>
      </defs>
    </g>
  ),
  { fill: 'currentColor', ids: true },
);
