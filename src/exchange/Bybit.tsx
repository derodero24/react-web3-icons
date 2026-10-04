import { createIcon } from '../utils';

// Source: https://www.bybit.com (official site; stylesheet palette --by-orange-normal #f7a600, --by-color-black #121214)
// Checked 2026-10-04: no official vector of the BYBIT wordmark was reachable (bybit.com renders its header client-side behind bot protection and has no public press kit), so the artwork, which predates the source policy, is unchanged
// The #F7A600 bar matches the site palette; the #15192A lettering and the letter geometry are unverified (the palette black is #121214)
/** Extra props of the Bybit icons (on top of `IconProps`). */
export interface BybitProps {
  /** Fill of the bar of the logo. */
  fill1?: string;
  /** Fill of the lettering. */
  fill2?: string;
}

/** Bybit exchange icon (colored). */
export const Bybit = /* @__PURE__ */ createIcon<BybitProps>(
  'Bybit',
  '0 0 64 64',
  ({ fill1 = '#f7a600', fill2 = '#15192a' }) => (
    <>
      <path fill={fill1} d="M43.91 37.06V22.67h2.9v14.4z" />
      <path
        fill={fill2}
        d="M10.2 41.34H4v-14.4h5.95c2.9 0 4.58 1.59 4.58 4.05 0 1.6-1.08 2.63-1.83 2.97.9.4 2.04 1.32 2.04 3.24 0 2.68-1.9 4.14-4.54 4.14m-.48-11.88H6.9v3.31h2.83c1.23 0 1.92-.67 1.92-1.66s-.69-1.65-1.92-1.65m.19 5.84H6.89v3.53h3.02c1.31 0 1.94-.8 1.94-1.78s-.63-1.75-1.94-1.75m13.65.14v5.9h-2.87v-5.9l-4.46-8.5h3.15l2.76 5.81 2.73-5.8h3.14zm12.65 5.9h-6.2v-14.4h5.95c2.9 0 4.58 1.59 4.58 4.05 0 1.6-1.08 2.63-1.83 2.97.9.4 2.04 1.32 2.04 3.24 0 2.68-1.9 4.14-4.54 4.14m-.47-11.88H32.9v3.31h2.83c1.22 0 1.91-.67 1.91-1.66s-.69-1.65-1.91-1.65m.18 5.84H32.9v3.53h3.01c1.31 0 1.94-.8 1.94-1.78s-.63-1.75-1.94-1.75m20.2-5.84v11.88h-2.88V29.46h-3.87v-2.51H60v2.5z"
      />
    </>
  ),
  { props: ['fill1', 'fill2'] },
);

/** Bybit Inverted exchange icon (colored). */
export const BybitInverted = /* @__PURE__ */ createIcon<BybitProps>(
  'BybitInverted',
  '0 0 64 64',
  ({ fill1 = '#f7a600', fill2 = '#fff' }) => (
    <>
      <path fill={fill1} d="M43.91 37.06V22.67h2.9v14.4z" />
      <path
        fill={fill2}
        d="M10.2 41.34H4v-14.4h5.95c2.9 0 4.58 1.59 4.58 4.05 0 1.6-1.08 2.63-1.83 2.97.9.4 2.04 1.32 2.04 3.24 0 2.68-1.9 4.14-4.54 4.14m-.48-11.88H6.9v3.31h2.83c1.23 0 1.92-.67 1.92-1.66s-.69-1.65-1.92-1.65m.19 5.84H6.89v3.53h3.02c1.31 0 1.94-.8 1.94-1.78s-.63-1.75-1.94-1.75m13.65.14v5.9h-2.87v-5.9l-4.46-8.5h3.15l2.76 5.81 2.73-5.8h3.14zm12.65 5.9h-6.2v-14.4h5.95c2.9 0 4.58 1.59 4.58 4.05 0 1.6-1.08 2.63-1.83 2.97.9.4 2.04 1.32 2.04 3.24 0 2.68-1.9 4.14-4.54 4.14m-.47-11.88H32.9v3.31h2.83c1.22 0 1.91-.67 1.91-1.66s-.69-1.65-1.91-1.65m.18 5.84H32.9v3.53h3.01c1.31 0 1.94-.8 1.94-1.78s-.63-1.75-1.94-1.75m20.2-5.84v11.88h-2.88V29.46h-3.87v-2.51H60v2.5z"
      />
    </>
  ),
  { props: ['fill1', 'fill2'] },
);

/** Bybit exchange icon (monochrome). */
export const BybitMono = /* @__PURE__ */ createIcon<BybitProps>(
  'BybitMono',
  '0 0 64 64',
  ({ fill1, fill2 }) => (
    <>
      <path d="M43.91 37.06V22.67h2.9v14.4z" fill={fill1} />
      <path
        d="M10.2 41.34H4v-14.4h5.95c2.9 0 4.58 1.59 4.58 4.05 0 1.6-1.08 2.63-1.83 2.97.9.4 2.04 1.32 2.04 3.24 0 2.68-1.9 4.14-4.54 4.14m-.48-11.88H6.9v3.31h2.83c1.23 0 1.92-.67 1.92-1.66s-.69-1.65-1.92-1.65m.19 5.84H6.89v3.53h3.02c1.31 0 1.94-.8 1.94-1.78s-.63-1.75-1.94-1.75m13.65.14v5.9h-2.87v-5.9l-4.46-8.5h3.15l2.76 5.81 2.73-5.8h3.14zm12.65 5.9h-6.2v-14.4h5.95c2.9 0 4.58 1.59 4.58 4.05 0 1.6-1.08 2.63-1.83 2.97.9.4 2.04 1.32 2.04 3.24 0 2.68-1.9 4.14-4.54 4.14m-.47-11.88H32.9v3.31h2.83c1.22 0 1.91-.67 1.91-1.66s-.69-1.65-1.91-1.65m.18 5.84H32.9v3.53h3.01c1.31 0 1.94-.8 1.94-1.78s-.63-1.75-1.94-1.75m20.2-5.84v11.88h-2.88V29.46h-3.87v-2.51H60v2.5z"
        fill={fill2}
      />
    </>
  ),
  { fill: 'currentColor', props: ['fill1', 'fill2'] },
);
