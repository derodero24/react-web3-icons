import { createIcon } from '../utils';

// Paths sourced from across.to — the circular logomark
// X-shaped crossing path (dark foreground)
/** Across bridge icon (colored). */
export const Across = /* @__PURE__ */ createIcon(
  'Across',
  '0 0 32 32',
  () => (
    <>
      <rect width="32" height="32" fill="#6CF9D8" rx="16" />
      <path
        fill="#2D2E33"
        fillRule="evenodd"
        d="M6.952 8.42 8.51 6.86l6.231 6.232a3.3 3.3 0 0 0-1.625 1.493zM13 17.44l-6.14 6.14 1.559 1.56 6.077-6.079A3.3 3.3 0 0 1 13 17.44m4.59 1.618 5.994 5.994 1.56-1.56-6.06-6.059a3.3 3.3 0 0 1-1.493 1.625m1.377-4.467 6.084-6.084-1.56-1.56-6.146 6.148a3.3 3.3 0 0 1 1.622 1.497"
        clipRule="evenodd"
      />
    </>
  ),
  { fill: 'none' },
);

/** Across bridge icon (monochrome). */
export const AcrossMono = /* @__PURE__ */ createIcon(
  'AcrossMono',
  '0 0 32 32',
  (_props, _id) => (
    <>
      <rect width="32" height="32" mask={`url(#${_id}-ac-m)`} rx="16" />
      <defs>
        <mask id={`${_id}-ac-m`}>
          <rect width="32" height="32" fill="white" />
          <path
            fill="black"
            fillRule="evenodd"
            d="M6.952 8.42 8.51 6.86l6.231 6.232a3.3 3.3 0 0 0-1.625 1.493zM13 17.44l-6.14 6.14 1.559 1.56 6.077-6.079A3.3 3.3 0 0 1 13 17.44m4.59 1.618 5.994 5.994 1.56-1.56-6.06-6.059a3.3 3.3 0 0 1-1.493 1.625m1.377-4.467 6.084-6.084-1.56-1.56-6.146 6.148a3.3 3.3 0 0 1 1.622 1.497"
            clipRule="evenodd"
          />
        </mask>
      </defs>
    </>
  ),
  { fill: 'currentColor', ids: true },
);
