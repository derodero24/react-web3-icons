import { createIcon } from '../utils';

// Source: https://drpc.org (official brand)
// dRPC brand mark — three-dimensional diamond cluster
// Three shades: bright (#49FF87), mid (#41E278), dark (#33B05D)
// Mono: every prism face in ink, kept apart by 1.2-unit knockout seams along the shared face edges (no opacity tiers).
/** Drpc node icon (colored). */
export const Drpc = /* @__PURE__ */ createIcon(
  'Drpc',
  '0 0 64 64',
  () => (
    <>
      <path fill="#49FF87" d="m7.75 46 8.08-4.66L23.91 46l-8.08 4.66z" />
      <path fill="#33B05D" d="M15.83 13.37 23.91 18v28l-8.08-4.66z" />
      <path fill="#41E278" d="M15.83 13.37 7.75 18v28l8.08-4.66z" />
      <path fill="#49FF87" d="M32 4v9.33L23.9 18V8.66z" />
      <path fill="#41E278" d="m56.21 27.31.04-9.3L31.99 4v9.33z" />
      <path fill="#33B05D" d="M56.21 27.31 48.17 32 23.9 18l8.1-4.68z" />
      <path fill="#49FF87" d="M48.17 32v9.33L56.25 46v-9.33z" />
      <path fill="#33B05D" d="M23.95 55.31 31.99 60l24.26-14-8.08-4.67z" />
      <path fill="#41E278" d="m23.95 55.31-.04-9.3 24.26-14v9.32z" />
    </>
  ),
  {},
);

/** Drpc node icon (monochrome). */
export const DrpcMono = /* @__PURE__ */ createIcon(
  'DrpcMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="m15.83 50.66-7.48-4.31 7.48-4.32 7.48 4.32zM7.75 18l7.48-4.29V41l-7.48 4.32zM23.9 8.66l7.49-4.3v8.62L23.9 17.3zm32.35 9.35-.04 8.6L32.6 12.98V4.35zm0 18.66v8.64l-7.48-4.33v-8.63zM31.99 60l-7.44-4.34 23.62-13.64 7.48 4.33zM16.43 41V13.7l6.87 3.94v.7l.6.34h.01V45.3zm8.08 5.35v-.69l23.06-13.3v8.62L23.95 54.62l-.04-7.93zm7.48-32.32 23.62 13.63-6.84 4-.6-.35-.6.35L24.5 18.35z"
    />
  ),
  { fill: 'currentColor' },
);
