import { createIcon } from '../utils';

// Source: https://1inch.io
/** Oneinch DEX icon (colored). */
export const Oneinch = /* @__PURE__ */ createIcon(
  'Oneinch',
  '0 0 40 40',
  () => (
    <>
      <rect width="40" height="40" fill="#E82219" rx="8" />
      <path
        fill="#FFFFFF"
        d="M12.996 30.337h14.008v-2.95h-5.161V9.665h-3.067c-.118 2.477-.826 3.096-4.217 3.096h-1.563v2.831h5.16v11.797h-5.16z"
      />
      <path fill="#FFFFFF" d="M28.479 15.592V9.664h-2.95v5.928z" />
      <path fill="#FFFFFF" d="M33.665 15.592V9.664h-2.95v5.928z" />
    </>
  ),
  { fill: 'none' },
);

/** Oneinch DEX icon (monochrome). */
export const OneinchMono = /* @__PURE__ */ createIcon(
  'OneinchMono',
  '0 0 40 40',
  (_props, _id) => (
    <>
      <rect width="40" height="40" mask={`url(#${_id}-1i-m)`} rx="8" />
      <defs>
        <mask id={`${_id}-1i-m`}>
          <rect width="40" height="40" fill="white" />
          <path
            fill="black"
            d="M12.996 30.337h14.008v-2.95h-5.161V9.665h-3.067c-.118 2.477-.826 3.096-4.217 3.096h-1.563v2.831h5.16v11.797h-5.16z"
          />
          <path fill="black" d="M28.479 15.592V9.664h-2.95v5.928z" />
          <path fill="black" d="M33.665 15.592V9.664h-2.95v5.928z" />
        </mask>
      </defs>
    </>
  ),
  { fill: 'currentColor', ids: true },
);
