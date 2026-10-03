import { createIcon } from '../utils';

// Source: https://zapper.xyz
/** Zapper portfolio icon (colored). */
export const Zapper = /* @__PURE__ */ createIcon(
  'Zapper',
  '0 0 500 500',
  () => (
    <>
      <path
        fill="#784ffe"
        d="M500 250C500 111.929 388.071 0 250 0S0 111.929 0 250s111.929 250 250 250 250-111.929 250-250"
      />
      <path
        fill="#fff"
        d="M154.338 187.869 330.605 187l-42.201 63.6 99.596-.482-42.208 62.534-177.41 1.135 42.868-63.154-99.25-.038z"
      />
    </>
  ),
  {},
);

/** Zapper portfolio icon (monochrome). */
export const ZapperMono = /* @__PURE__ */ createIcon(
  'ZapperMono',
  '0 0 500 500',
  (_props, _id) => (
    <>
      <path
        d="M500 250C500 111.929 388.071 0 250 0S0 111.929 0 250s111.929 250 250 250 250-111.929 250-250"
        mask={`url(#${_id}-zprm-a)`}
      />
      <defs>
        <mask id={`${_id}-zprm-a`}>
          <rect width="100%" height="100%" fill="#fff" />
          <path
            fill="#000"
            d="M154.338 187.869 330.605 187l-42.201 63.6 99.596-.482-42.208 62.534-177.41 1.135 42.868-63.154-99.25-.038z"
          />
        </mask>
      </defs>
    </>
  ),
  { fill: 'currentColor', ids: true },
);
