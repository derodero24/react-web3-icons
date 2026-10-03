import { createIcon } from '../utils';

// Convex Finance stepped "C" bracket mark; extracted from official wordmark
/** Convex DeFi icon (colored). */
export const Convex = /* @__PURE__ */ createIcon(
  'Convex',
  '0 0 64 64',
  () => (
    <path d="M54.48 26.4V15.22h-5.63v-5.6H37.61v-5.6H26.37v5.6H15.13v5.6H9.51V48.8h5.62v5.6h11.24V60H37.6v-5.6h11.24v-5.6h5.63V37.6H43.23v5.58h-5.62v5.6H26.37v-5.6h-5.62V20.81h5.62v-5.6h11.24v5.6h5.62v5.6z" />
  ),
  { fill: '#FF5C29' },
);

/** Convex DeFi icon (monochrome). */
export const ConvexMono = /* @__PURE__ */ createIcon(
  'ConvexMono',
  '0 0 64 64',
  () => (
    <path d="M54.48 26.4V15.22h-5.63v-5.6H37.61v-5.6H26.37v5.6H15.13v5.6H9.51V48.8h5.62v5.6h11.24V60H37.6v-5.6h11.24v-5.6h5.63V37.6H43.23v5.58h-5.62v5.6H26.37v-5.6h-5.62V20.81h5.62v-5.6h11.24v5.6h5.62v5.6z" />
  ),
  { fill: 'currentColor' },
);
