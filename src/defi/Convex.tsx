import { createIcon } from '../utils';

// Convex Finance stepped "C" bracket mark; extracted from official wordmark
/** Convex DeFi icon (colored). */
export const Convex = /* @__PURE__ */ createIcon(
  'Convex',
  '0 0 64 64',
  () => (
    <path d="M54.48 26.405V15.21h-5.628V9.612H37.607V4.015H26.372v5.597H15.13v5.598H9.509v33.587h5.622v5.597h11.235v5.598h11.243v-5.598h11.243v-5.597h5.628V37.602H43.23v5.583h-5.623v5.598H26.372v-5.598h-5.62V20.807h5.62V15.21h11.235v5.597h5.622v5.598z" />
  ),
  { fill: '#FF5C29' },
);

/** Convex DeFi icon (monochrome). */
export const ConvexMono = /* @__PURE__ */ createIcon(
  'ConvexMono',
  '0 0 64 64',
  () => (
    <path d="M54.48 26.405V15.21h-5.628V9.612H37.607V4.015H26.372v5.597H15.13v5.598H9.509v33.587h5.622v5.597h11.235v5.598h11.243v-5.598h11.243v-5.597h5.628V37.602H43.23v5.583h-5.623v5.598H26.372v-5.598h-5.62V20.807h5.62V15.21h11.235v5.597h5.622v5.598z" />
  ),
  { fill: 'currentColor' },
);
