import { createIcon } from '../utils';

// Source: https://linea.build
/** Linea chain icon (colored). */
export const Linea = /* @__PURE__ */ createIcon(
  'Linea',
  '0 0 40 40',
  () => (
    <>
      <path d="M0 0h40v40H0z" />
      <path
        fill="#fff"
        d="M25.695 29H11.384V13.92h3.274v12.158h11.037zm0-12.158a2.92 2.92 0 1 0 0-5.842 2.92 2.92 0 0 0 0 5.842"
      />
    </>
  ),
  {},
);

/** Linea chain icon (monochrome). */
export const LineaMono = /* @__PURE__ */ createIcon(
  'LineaMono',
  '0 0 40 40',
  (_props, _id) => (
    <>
      <rect width="40" height="40" mask={`url(#${_id}-a)`} />
      <defs>
        <mask id={`${_id}-a`}>
          <rect width="40" height="40" fill="#fff" />
          <path
            fill="#000"
            d="M25.695 29H11.384V13.92h3.274v12.158h11.037zm0-12.158a2.92 2.92 0 1 0 0-5.842 2.92 2.92 0 0 0 0 5.842"
          />
        </mask>
      </defs>
    </>
  ),
  { fill: 'currentColor', ids: true },
);
