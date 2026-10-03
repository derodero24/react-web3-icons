import { createIcon } from '../utils';

// Source: https://optimism.io
// Source: https://cdn.sanity.io/images/y6ka751a/production/0619395edc911805bcea3268156418134c1c5b32-2500x1875.svg
// Circle/Square: the OP Mainnet glyph (same geometry as the official symbol linked from https://optimism.io/brand) at about 63% of the container height, filled with fill-rule="evenodd" so the centre sparkle is cut out, as in the official symbol
/** Optimism chain icon (colored). */
export const Optimism = /* @__PURE__ */ createIcon(
  'Optimism',
  '0 0 64 64',
  () => (
    <g transform="scale(2.28571)">
      <circle cx="14" cy="14" r="14" fill="#FF0420" />
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M14 26.25v-5.18c5.33 0 9.66-4.33 9.66-9.66S19.33 1.75 14 1.75v5.19c-5.33 0-9.66 4.32-9.66 9.65s4.33 9.66 9.66 9.66m4.78-12.2v-.1q-3.16-1.57-4.74-4.73h-.09q-1.57 3.16-4.73 4.74v.09q3.16 1.57 4.73 4.73h.1q1.57-3.16 4.73-4.73"
      />
    </g>
  ),
  {},
);

/** Optimism chain icon (monochrome). */
export const OptimismMono = /* @__PURE__ */ createIcon(
  'OptimismMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M0 32a32 32 0 1 0 64 0 32 32 0 1 0-64 0m32 28V48.15c12.19 0 22.08-9.88 22.08-22.07S44.19 4 32 4v11.85c-12.19 0-22.08 9.88-22.08 22.07S19.81 60 32 60m10.92-27.9v-.2Q35.7 28.3 32.1 21.08h-.2Q28.3 28.3 21.08 31.9v.2q7.22 3.6 10.82 10.82h.2q3.6-7.22 10.82-10.82"
    />
  ),
  { fill: 'currentColor' },
);

/** Optimism Circle chain icon (colored). */
export const OptimismCircle = /* @__PURE__ */ createIcon(
  'OptimismCircle',
  '0 0 64 64',
  () => (
    <>
      <circle cx="32" cy="32" r="32" fill="#FF0420" />
      <g>
        <path
          fill="#fff"
          fillRule="evenodd"
          d="M32 52.13V43.6c8.76 0 15.87-7.1 15.87-15.87S40.77 11.88 32 11.88v8.51c-8.76 0-15.87 7.1-15.87 15.87S23.24 52.13 32 52.13m7.85-20.05v-.15q-5.19-2.6-7.77-7.78h-.15q-2.6 5.19-7.78 7.78v.15q5.19 2.58 7.78 7.77h.15q2.58-5.19 7.77-7.77"
        />
      </g>
    </>
  ),
  {},
);

/** Optimism Square chain icon (colored). */
export const OptimismSquare = /* @__PURE__ */ createIcon(
  'OptimismSquare',
  '0 0 64 64',
  () => (
    <>
      <rect width="64" height="64" fill="#FF0420" rx="12.8" />
      <g>
        <path
          fill="#fff"
          fillRule="evenodd"
          d="M32 52.13V43.6c8.76 0 15.87-7.1 15.87-15.87S40.77 11.88 32 11.88v8.51c-8.76 0-15.87 7.1-15.87 15.87S23.24 52.13 32 52.13m7.85-20.05v-.15q-5.19-2.6-7.77-7.78h-.15q-2.6 5.19-7.78 7.78v.15q5.19 2.58 7.78 7.77h.15q2.58-5.19 7.77-7.77"
        />
      </g>
    </>
  ),
  {},
);

/** Optimism Square chain icon (monochrome). */
export const OptimismSquareMono = /* @__PURE__ */ createIcon(
  'OptimismSquareMono',
  '0 0 64 64',
  (_props, _id) => (
    <>
      <rect width="64" height="64" mask={`url(#${_id}-opts-a)`} rx="12.8" />
      <defs>
        <mask id={`${_id}-opts-a`}>
          <rect width="100%" height="100%" fill="#fff" />
          <g fill="#000">
            <path
              fillRule="evenodd"
              d="M32 52.13V43.6c8.76 0 15.87-7.1 15.87-15.87S40.77 11.88 32 11.88v8.51c-8.76 0-15.87 7.1-15.87 15.87S23.24 52.13 32 52.13m7.85-20.05v-.15q-5.19-2.6-7.77-7.78h-.15q-2.6 5.19-7.78 7.78v.15q5.19 2.58 7.78 7.77h.15q2.58-5.19 7.77-7.77"
            />
          </g>
        </mask>
      </defs>
    </>
  ),
  { fill: 'currentColor', ids: true },
);

/** Optimism Circle chain icon (monochrome). */
export const OptimismCircleMono = /* @__PURE__ */ createIcon(
  'OptimismCircleMono',
  '0 0 64 64',
  (_props, _id) => (
    <>
      <circle cx="32" cy="32" r="32" mask={`url(#${_id}-optc-a)`} />
      <defs>
        <mask id={`${_id}-optc-a`}>
          <rect width="100%" height="100%" fill="#fff" />
          <g fill="#000">
            <path
              fillRule="evenodd"
              d="M32 52.13V43.6c8.76 0 15.87-7.1 15.87-15.87S40.77 11.88 32 11.88v8.51c-8.76 0-15.87 7.1-15.87 15.87S23.24 52.13 32 52.13m7.85-20.05v-.15q-5.19-2.6-7.77-7.78h-.15q-2.6 5.19-7.78 7.78v.15q5.19 2.58 7.78 7.77h.15q2.58-5.19 7.77-7.77"
            />
          </g>
        </mask>
      </defs>
    </>
  ),
  { fill: 'currentColor', ids: true },
);
