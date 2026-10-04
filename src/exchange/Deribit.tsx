import { createIcon } from '../utils';

// Source: https://www.deribit.com/favicon/prod/favicon.svg (official favicon served by deribit.com)
// Colored: the official favicon.svg unchanged, #0052FF (the apple-touch-icon.png in the same folder shows the same blue), placed on the 64 grid; it replaces the earlier #2DAE9A artwork
// Mono: the same path in currentColor
/** Deribit exchange icon (colored). */
export const Deribit = /* @__PURE__ */ createIcon(
  'Deribit',
  '0 0 64 64',
  () => (
    <path d="M13.34 50.6H4.03v-9.3h9.31V22.7H4.03v-9.28h9.31v-9.3h9.34v9.3H32v-9.3h9.32v9.3c10.31 0 18.65 8.3 18.65 18.59 0 10.26-8.34 18.58-18.65 18.58v9.29H32v-9.29h-9.32v9.29h-9.34zm9.34-9.3h18.64c5.16 0 9.34-4.17 9.34-9.3s-4.18-9.3-9.34-9.3H22.68z" />
  ),
  { fill: '#0052FF' },
);

/** Deribit exchange icon (monochrome). */
export const DeribitMono = /* @__PURE__ */ createIcon(
  'DeribitMono',
  '0 0 64 64',
  () => (
    <path d="M13.34 50.6H4.03v-9.3h9.31V22.7H4.03v-9.28h9.31v-9.3h9.34v9.3H32v-9.3h9.32v9.3c10.31 0 18.65 8.3 18.65 18.59 0 10.26-8.34 18.58-18.65 18.58v9.29H32v-9.29h-9.32v9.29h-9.34zm9.34-9.3h18.64c5.16 0 9.34-4.17 9.34-9.3s-4.18-9.3-9.34-9.3H22.68z" />
  ),
  { fill: 'currentColor' },
);
