import { createIcon } from '../utils';

// Convex Finance stepped "C" bracket mark; extracted from official wordmark
const convexContent = () => (
  <path d="M22.3749 11.3253V5.75494H19.5745V2.96976H13.9807V0.18457H8.39058V2.96976H2.79686V5.75494H0V22.466H2.79686V25.2512H8.38702V28.0364H13.9807V25.2512H19.5745V22.466H22.3749V16.8957H16.7776V19.6738H13.9807V22.459H8.39058V19.6738H5.59372V8.54012H8.39058V5.75494H13.9807V8.54012H16.7776V11.3253H22.3749Z" />
);

/** Convex DeFi icon (colored). */
export const Convex = createIcon(
  'Convex',
  '0 0 22.38 28.04',
  convexContent,
  '#FF5C29',
);

/** Convex DeFi icon (monochrome). */
export const ConvexMono = createIcon(
  'ConvexMono',
  '0 0 22.38 28.04',
  convexContent,
  'currentColor',
);
