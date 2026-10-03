import { createIcon } from '../utils';

// Source: https://github.com/api3dao/logos/blob/main/raw/symbols/api3.svg
// Default: the official Api3 symbol (api3dao/logos raw/symbols/api3.svg: #1F267B disc with the #FAFAFA triangle mark), a container drawn full-bleed; it replaces the bare #4B6EFF triangle
// Mono: the disc in currentColor with the triangle mark knocked out (fill-rule=evenodd), so the mark's inner shapes stay ink as in the colored symbol
/** Api3 oracle icon (colored). */
export const Api3 = /* @__PURE__ */ createIcon(
  'Api3',
  '0 0 64 64',
  () => (
    <g transform="scale(1.5238)">
      <rect width="42" height="42" fill="#1F267B" rx="21" />
      <path
        fill="#FAFAFA"
        fillRule="evenodd"
        d="m21.3 8.06-.68 1.16-.05.08L8.6 30.03H34zm-4.23 10.41-5.77 9.99c3-.07 5.7-.42 7.72-1.44a7 7 0 0 0 1.7-1.18q-1.92-1.31-2.81-3c-.73-1.36-.95-2.82-.84-4.33zm2.53 10h11.67c-1.59-2.6-3.31-4.88-5.24-6.24q-.9-.63-1.83-.96-.15 2.46-1.19 4.16c-.8 1.34-1.94 2.3-3.3 2.98zm7.36-7.49-5.66-9.8c-1.45 2.66-2.51 5.2-2.68 7.45q-.06.82.05 1.58 2.1-.96 4.01-.83c1.56.09 2.97.68 4.24 1.57zm-7.68 1.12-.18-.37c1.28-.63 2.44-.86 3.49-.8h.07c-.07 1.55-.43 2.75-.98 3.69-1.16-.78-1.92-1.63-2.4-2.52"
        clipRule="evenodd"
      />
    </g>
  ),
  {},
);

/** Api3 oracle icon (monochrome). */
export const Api3Mono = /* @__PURE__ */ createIcon(
  'Api3Mono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M32 0a32 32 0 1 1 0 64 32 32 0 0 1 0-64m.45 12.27-1.03 1.78-.07.12-18.26 31.6H51.8zM26 28.15l-8.79 15.21c4.57-.1 8.69-.64 11.76-2.18q1.47-.74 2.58-1.8-2.91-2-4.28-4.58c-1.1-2.06-1.44-4.3-1.27-6.59zm3.86 15.24h17.78c-2.42-3.98-5.04-7.45-8-9.52q-1.35-.95-2.77-1.47-.25 3.75-1.81 6.35c-1.22 2.05-2.96 3.51-5.02 4.55zm11.22-11.42-8.63-14.92c-2.21 4.04-3.83 7.9-4.08 11.33q-.1 1.26.07 2.42 3.18-1.48 6.11-1.28c2.37.15 4.52 1.04 6.46 2.4zm-11.7 1.7-.28-.55c1.95-.97 3.7-1.32 5.31-1.23l.11.01c-.1 2.36-.65 4.18-1.5 5.61-1.76-1.18-2.92-2.47-3.65-3.83"
    />
  ),
  { fill: 'currentColor' },
);
