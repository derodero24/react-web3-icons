import { createIcon } from '../utils';

// Source: https://docs.tenderly.co/logo/tenderly-symbol.svg
// Source: https://tenderly.co/brand-assets (official brand kit)
// Colored: the three paths of the official docs.tenderly.co/logo/tenderly-symbol.svg (#9573F5, #6837F1, #D2C3FB), copied unchanged and only scaled (0.2) and shifted onto the 64 grid (silhouette IoU 0.996); the docs header lockups tenderly-logo-light-background.svg and tenderly-logo-dark-background.svg use the same mark
// The brand-assets page now lists a refreshed palette (#9273FF, #6837EE, #CFC0FF) and its own symbol-color.svg, but its files cannot be downloaded verbatim (Vercel Security Checkpoint, HTTP 429; checked 2026-10-09), so the artwork is unchanged
// Mono: the three wings of the coloured docs symbol in one ink, parted by 1.2-unit knock-out seams so the faceted structure reads
/** Tenderly devtool icon (colored). */
export const Tenderly = /* @__PURE__ */ createIcon(
  'Tenderly',
  '0 0 64 64',
  () => (
    <>
      <path
        fill="#9573F5"
        d="m44.87 20.46 15.1-8.4v16.33L48.29 34.9c-7.97 4.45-12.57 10.28-14.43 15.45s-1.58 8.14-1.64 9.44c0-8.24.03-10.7.03-17.64 0-1.7.2-3.59.42-4.49 0 0 1.99-11.5 12.2-17.2"
      />
      <path
        fill="#6837F1"
        d="m32.2 42.5.01 17.29-14.28-7.94-.01-13.38c0-9.13-2.86-15.98-6.48-20.13C7.82 14.21 5.1 12.96 4 12.28l15.09 8.12c1.5.8 3.47 2.35 4.14 2.99 0 0 8.97 7.42 8.97 19.12Z"
      />
      <path
        fill="#D2C3FB"
        d="M44.85 20.46c6.09-3.34 10.51-5.86 15.11-8.4-1.15.58-3.63 2.28-9.08 3.21a30.3 30.3 0 0 1-21.03-4.05l-11.6-7L4 12.27l15.59 8.37c3.88 2.33 13.58 6.23 25.26-.19"
      />
    </>
  ),
  {},
);

/** Tenderly devtool icon (monochrome). */
export const TenderlyMono = /* @__PURE__ */ createIcon(
  'TenderlyMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="m18.25 4.22 11.6 7a30.3 30.3 0 0 0 21.03 4.05q2.02-.35 3.53-.8l-9.83 5.47a24 24 0 0 0-3.1 2.11c-7.79 3.12-14.45 1.86-18.7.16-.94-.76-2.3-1.74-3.4-2.34L4.6 11.93zm41.72 24.17L48.29 34.9c-7.97 4.45-12.57 10.28-14.43 15.45a30 30 0 0 0-1.05 3.56L32.8 42.5v-.02a24 24 0 0 0-.33-3.7q.1-.68.2-1.12s1.57-9.08 9.09-15.1q1.61-.64 3.28-1.53l.1-.04c5.97-3.28 10.33-5.76 14.83-8.25zM17.93 51.85l-.01-13.38c0-9.13-2.86-15.98-6.48-20.13a31 31 0 0 0-3-3l10.85 5.82c.8.48 1.86 1.03 3.14 1.54q.52.42.8.69s7.05 5.83 8.65 15.3c-.13 1-.23 2.28-.23 3.46 0 6.84-.03 9.33-.03 17.31z"
    />
  ),
  { fill: 'currentColor' },
);
