import { createIcon } from '../utils';

// Source: https://www.near.org (the NEAR symbol inlined in the site header, fill #000000)
// Source: https://docs.near.org (logo.svg of the docs, the same black symbol with the wordmark)
// Default: the NEAR symbol from the near.org header, path unchanged, in its #000000; it replaces a #00EC97 N whose colour and geometry match no current official asset (near.org/brand returns 404)
// Mono: the same path in currentColor
/** Near chain icon (colored). */
export const Near = /* @__PURE__ */ createIcon(
  'Near',
  '0 0 64 64',
  () => (
    <path d="M54.02 4.57a6 6 0 0 0-5.07 2.76L37.23 24.39c-.38.56-.23 1.3.37 1.68.45.3 1.08.26 1.5-.08l11.53-9.81a.5.5 0 0 1 .63.03q.11.11.11.34v30.64q0 .41-.45.45a.4.4 0 0 1-.37-.15L15.73 6.62a6 6 0 0 0-4.55-2.05h-1.2c-3.28 0-5.97 2.61-5.97 5.78v43.3c0 3.2 2.69 5.82 5.97 5.82a6 6 0 0 0 5.08-2.76l11.72-17.06a1.12 1.12 0 0 0-.38-1.68 1.3 1.3 0 0 0-1.49.08l-11.53 9.81a.5.5 0 0 1-.64-.04l-.1-.33V16.8q0-.45.44-.49.22 0 .37.2l34.82 40.86c1.12 1.3 2.8 2.05 4.52 2.05h1.23c3.29 0 5.97-2.61 5.97-5.82V10.35c0-3.2-2.68-5.82-5.97-5.82" />
  ),
  { fill: '#000' },
);

/** Near chain icon (monochrome). */
export const NearMono = /* @__PURE__ */ createIcon(
  'NearMono',
  '0 0 64 64',
  () => (
    <path d="M54.02 4.57a6 6 0 0 0-5.07 2.76L37.23 24.39c-.38.56-.23 1.3.37 1.68.45.3 1.08.26 1.5-.08l11.53-9.81a.5.5 0 0 1 .63.03q.11.11.11.34v30.64q0 .41-.45.45a.4.4 0 0 1-.37-.15L15.73 6.62a6 6 0 0 0-4.55-2.05h-1.2c-3.28 0-5.97 2.61-5.97 5.78v43.3c0 3.2 2.69 5.82 5.97 5.82a6 6 0 0 0 5.08-2.76l11.72-17.06a1.12 1.12 0 0 0-.38-1.68 1.3 1.3 0 0 0-1.49.08l-11.53 9.81a.5.5 0 0 1-.64-.04l-.1-.33V16.8q0-.45.44-.49.22 0 .37.2l34.82 40.86c1.12 1.3 2.8 2.05 4.52 2.05h1.23c3.29 0 5.97-2.61 5.97-5.82V10.35c0-3.2-2.68-5.82-5.97-5.82" />
  ),
  { fill: 'currentColor' },
);
