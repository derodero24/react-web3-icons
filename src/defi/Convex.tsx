import { createIcon } from '../utils';

// Convex Finance stepped "C" bracket mark; extracted from official wordmark
/** Convex DeFi icon (colored). */
export const Convex = /* @__PURE__ */ createIcon(
  'Convex',
  '0 0 22.38 28.04',
  () => (
    <path d="M22.375 11.325v-5.57h-2.8V2.97H13.98V.185H8.39V2.97H2.797v2.785H0v16.711h2.797v2.785h5.59v2.785h5.594v-2.785h5.594v-2.785h2.8v-5.57h-5.597v2.778H13.98v2.785H8.39v-2.785H5.594V8.54H8.39V5.755h5.59V8.54h2.797v2.785z" />
  ),
  { fill: '#FF5C29' },
);

/** Convex DeFi icon (monochrome). */
export const ConvexMono = /* @__PURE__ */ createIcon(
  'ConvexMono',
  '0 0 22.38 28.04',
  () => (
    <path d="M22.375 11.325v-5.57h-2.8V2.97H13.98V.185H8.39V2.97H2.797v2.785H0v16.711h2.797v2.785h5.59v2.785h5.594v-2.785h5.594v-2.785h2.8v-5.57h-5.597v2.778H13.98v2.785H8.39v-2.785H5.594V8.54H8.39V5.755h5.59V8.54h2.797v2.785z" />
  ),
  { fill: 'currentColor' },
);
