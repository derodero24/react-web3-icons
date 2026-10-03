import { createIcon } from '../utils';

// Source: https://docs.kaia.io/misc/brand/ (official brand guidelines, KAIA coin symbol_SVG.svg from the linked asset pack)
/** Kaia chain icon (colored). */
export const Kaia = /* @__PURE__ */ createIcon(
  'Kaia',
  '0 0 64 64',
  () => (
    <g transform="scale(.73299)">
      <rect width="87.28" height="87.28" fill="#040404" rx="43.64" />
      <g>
        <path
          fill="#bff009"
          d="M42.42 30.68a3.5 3.5 0 0 1 3.52-3.52h6.3v-8.54h-6.3c-6.67 0-12.08 5.4-12.08 12.06 0 1.73.37 3.39 1.03 4.88-5.18 2.18-8.62 6.83-9.42 12.7-.93 6.46 1.66 13.42 7.3 16.78 5.03 3.17 12.9 2.96 17.15-1.43v2.91h8.76V34.2H45.94a3.5 3.5 0 0 1-3.52-3.51m7.7 12.06v8.12c0 4.48-3.64 8.11-8.13 8.11s-8.13-3.63-8.13-8.11 3.64-8.12 8.13-8.12z"
        />
      </g>
    </g>
  ),
  {},
);

/** Kaia chain icon (monochrome). */
export const KaiaMono = /* @__PURE__ */ createIcon(
  'KaiaMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M31.99 0a31.98 31.98 0 1 0 0 63.97 31.98 31.98 0 1 0 0-63.97m-.9 22.49a2.6 2.6 0 0 1 2.58-2.58h4.61v-6.26h-4.6c-4.9 0-8.86 3.95-8.86 8.84q.01 1.92.76 3.57c-3.8 1.6-6.32 5-6.9 9.32-.7 4.73 1.2 9.83 5.34 12.3 3.69 2.32 9.46 2.16 12.57-1.06v2.14h6.42v-23.7h-9.34a2.6 2.6 0 0 1-2.58-2.57m5.64 8.84v5.95a5.95 5.95 0 0 1-5.95 5.95c-3.3 0-5.96-2.67-5.96-5.95s2.67-5.95 5.96-5.95z"
    />
  ),
  { fill: 'currentColor' },
);
