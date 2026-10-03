import { createIcon } from '../utils';

// Source: https://blastscan.io (official brand)
// Blastscan uses the Blast L2 geometric "BLAST" wordmark as its brandmark
/** Blastscan explorer icon (colored). */
export const Blastscan = /* @__PURE__ */ createIcon(
  'Blastscan',
  '0 0 64 64',
  () => (
    <>
      <path d="m48.107 31.668 8.828-4.399 3.043-9.34-6.086-4.428H13.37L4 20.461h47.632l-2.53 7.833H30l-1.837 5.724h19.1l-5.362 16.48 8.948-4.429 3.194-9.882-5.996-4.398z" />
      <path d="m17.466 43.418 5.514-17.173-6.116-4.58-9.19 28.833H41.9l2.29-7.08z" />
    </>
  ),
  { fill: '#FCFC03' },
);

/** Blastscan Light explorer icon (colored). */
export const BlastscanLight = /* @__PURE__ */ createIcon(
  'BlastscanLight',
  '0 0 64 64',
  () => (
    <>
      <path d="m48.107 31.668 8.828-4.399 3.043-9.34-6.086-4.428H13.37L4 20.461h47.632l-2.53 7.833H30l-1.837 5.724h19.1l-5.362 16.48 8.948-4.429 3.194-9.882-5.996-4.398z" />
      <path d="m17.466 43.418 5.514-17.173-6.116-4.58-9.19 28.833H41.9l2.29-7.08z" />
    </>
  ),
  { fill: '#000' },
);

/** Blastscan explorer icon (monochrome). */
export const BlastscanMono = /* @__PURE__ */ createIcon(
  'BlastscanMono',
  '0 0 64 64',
  () => (
    <>
      <path d="m48.107 31.668 8.828-4.399 3.043-9.34-6.086-4.428H13.37L4 20.461h47.632l-2.53 7.833H30l-1.837 5.724h19.1l-5.362 16.48 8.948-4.429 3.194-9.882-5.996-4.398z" />
      <path d="m17.466 43.418 5.514-17.173-6.116-4.58-9.19 28.833H41.9l2.29-7.08z" />
    </>
  ),
  { fill: 'currentColor' },
);
