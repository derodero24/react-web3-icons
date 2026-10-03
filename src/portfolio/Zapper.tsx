import { createIcon } from '../utils';

// Source: https://zapper.xyz
/** Zapper portfolio icon (colored). */
export const Zapper = /* @__PURE__ */ createIcon(
  'Zapper',
  '0 0 64 64',
  () => (
    <>
      <path
        fill="#784ffe"
        d="M64 32C64 14.327 49.673 0 32 0S0 14.327 0 32s14.327 32 32 32 32-14.327 32-32"
      />
      <path
        fill="#fff"
        d="m19.755 24.047 22.562-.111-5.401 8.14 12.748-.06-5.403 8.003-22.708.146 5.487-8.084-12.704-.005z"
      />
    </>
  ),
  {},
);

/** Zapper portfolio icon (monochrome). */
export const ZapperMono = /* @__PURE__ */ createIcon(
  'ZapperMono',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="scale(.128)">
      <path
        d="M500 250C500 111.929 388.071 0 250 0S0 111.929 0 250s111.929 250 250 250 250-111.929 250-250"
        mask={`url(#${_id}-zprm-a)`}
      />
      <defs>
        <mask id={`${_id}-zprm-a`}>
          <rect width="500" height="500" fill="#fff" />
          <path
            fill="#000"
            d="M154.338 187.869 330.605 187l-42.201 63.6 99.596-.482-42.208 62.534-177.41 1.135 42.868-63.154-99.25-.038z"
          />
        </mask>
      </defs>
    </g>
  ),
  { fill: 'currentColor', ids: true },
);
