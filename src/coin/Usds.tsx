import { createIcon } from '../utils';

// Source: https://app.sky.money/tokens/usds.svg (official Sky app token icon; the same file family as icons/defi/sky.json's https://app.sky.money/tokens/sky.svg)
// Colored: the official usds.svg unchanged (a #FFD232 to #FF6D6D radial-gradient disc under the white S), with its gradient id renamed; placed on the 64 grid as a container. Sky publishes USDS only as this disc (no stand-alone S was found on sky.money or app.sky.money, checked 2026-10-04), so the disc is the base icon and there is no separate Circle variant
// Mono: the disc in currentColor with the S of the same path knocked out (one evenodd path; the S renders identically under evenodd and nonzero)
/** Usds coin icon (colored). */
export const Usds = /* @__PURE__ */ createIcon(
  'Usds',
  '0 0 64 64',
  (_props, _id) => (
    <>
      <circle cx="32" cy="32" r="32" fill={`url(#${_id}-usds-a)`} />
      <path
        fill="#fff"
        d="M19.7 40.36h-4.55c.38 7.1 6.32 13.29 16.87 13.29 10.5 0 17.2-5.76 17.2-13.2 0-5.3-3.86-11.1-13.06-14.26-6-2.05-8.27-4.65-8.27-7.25 0-2.42 1.95-4.97 5.95-4.97 4.46 0 9.47 3.48 9.85 7.94h4.5c-.46-7.2-7.48-12.22-16.4-12.22-9.25 0-16.22 5.4-16.22 13.01 0 5.62 3.72 10.83 12.64 13.94 6.14 2 8.7 4.51 8.7 7.67 0 2.79-2 5.11-6.33 5.11-5.39 0-10.55-3.76-10.87-9.06m14.23-10.32c9.25 3.12 10.73 7.76 10.73 10.65 0 3.53-2.32 6.64-5.11 7.43.98-.93 1.72-2.97 1.72-4.93 0-3.34-2.23-7.38-10.5-10.26-9.53-3.26-10.69-7.72-10.69-10.37 0-3.76 2.42-6.78 5.44-7.71-1.16 1.35-2 3.3-2 5.16 0 3.44 2.83 7.52 10.4 10.03"
      />
      <defs>
        <radialGradient
          id={`${_id}-usds-a`}
          cx="32.05"
          cy="74.18"
          r="102.57"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFD232" />
          <stop offset="1" stopColor="#FF6D6D" />
        </radialGradient>
      </defs>
    </>
  ),
  { fill: 'none', ids: true },
);

/** Usds coin icon (monochrome). */
export const UsdsMono = /* @__PURE__ */ createIcon(
  'UsdsMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M0 32a32 32 0 1 0 64 0 32 32 0 1 0-64 0m19.7 8.36h-4.55c.38 7.1 6.32 13.29 16.87 13.29 10.5 0 17.2-5.76 17.2-13.2 0-5.3-3.86-11.1-13.06-14.26-6-2.05-8.27-4.65-8.27-7.25 0-2.42 1.95-4.97 5.95-4.97 4.46 0 9.47 3.48 9.85 7.94h4.5c-.46-7.2-7.48-12.22-16.4-12.22-9.25 0-16.22 5.4-16.22 13.01 0 5.62 3.72 10.83 12.64 13.94 6.14 2 8.7 4.51 8.7 7.67 0 2.79-2 5.11-6.33 5.11-5.39 0-10.55-3.76-10.87-9.06m14.23-10.32c9.25 3.12 10.73 7.76 10.73 10.65 0 3.53-2.32 6.64-5.11 7.43.98-.93 1.72-2.97 1.72-4.93 0-3.34-2.23-7.38-10.5-10.26-9.53-3.26-10.69-7.72-10.69-10.37 0-3.76 2.42-6.78 5.44-7.71-1.16 1.35-2 3.3-2 5.16 0 3.44 2.83 7.52 10.4 10.03"
    />
  ),
  { fill: 'currentColor' },
);
