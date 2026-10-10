import { createIcon } from '../utils';

// Source: https://support.avax.network/en/articles/4132288-avalanche-press-kit-and-brand-assets
// Source: https://drive.google.com/drive/folders/1i81sIjB6Z8hmQIITyXB37c1thodumFKJ
// Source: https://www.avax.network/touchicon.svg
// Default: the current Avalanche logomark (two shapes in #E6212F), identical in shape and colour to Avalanche_Logomark_Red.svg in the official brand-assets kit (linked from support.avax.network; Avalanche Logomark/SVG); paths from the site's 256-unit touchicon.svg, clipped to its 196x173 artwork box as in the file. It replaces the older #E84142 disc-cut mark
// Mono: the same two shapes in currentColor
// Square: the official touchicon.svg (the #E6212F mark on a #1D1D1D square); SquareMono is that square in currentColor with the mark knocked out (fill-rule=evenodd)
// Circle: the official AVAX token (Avax Token/Avalanche_AvaxToken 1.svg in the brand-assets kit), a #E6212F disc with the mark cut out over a white inner disc; CircleMono is the token's disc path alone in currentColor (the mark knocked out), which is what withBackground=false shows
/** Extra props of the Avalanche icons (on top of `IconProps`). */
export interface AvalancheProps {
  /** Fill the cut-out of the mark with white. Defaults to `true` for `AvalancheCircle` and `false` for `AvalancheCircleMono`. */
  withBackground?: boolean | undefined;
}

/** The artwork `withBackground` switches between. */
const withBackgroundArtwork = (withBackground: boolean) =>
  withBackground ? (
    <>
      <path
        fill="#fff"
        d="M32 56.43c13.5 0 24.43-10.94 24.43-24.43S45.5 7.56 32 7.56 7.56 18.5 7.56 32 18.5 56.43 32 56.43"
      />
      <path d="M32 0c17.67 0 32 14.33 32 32S49.67 64 32 64 0 49.67 0 32 14.33 0 32 0m12.33 31.86c-.58-1-2.02-1-2.6 0L35.6 42.5a1.5 1.5 0 0 0 1.3 2.24h12.27a1.5 1.5 0 0 0 1.3-2.24zm-11.04-19.1c-.57-1-2-1-2.58 0L13.54 42.49a1.5 1.5 0 0 0 1.3 2.24h10.25a3.2 3.2 0 0 0 2.77-1.6l10.56-18.3a3.2 3.2 0 0 0 0-3.2z" />
    </>
  ) : (
    <path d="M32 0c17.67 0 32 14.33 32 32S49.67 64 32 64 0 49.67 0 32 14.33 0 32 0m12.33 31.86c-.58-1-2.02-1-2.6 0L35.6 42.5a1.5 1.5 0 0 0 1.3 2.24h12.27a1.5 1.5 0 0 0 1.3-2.24zm-11.04-19.1c-.57-1-2-1-2.58 0L13.54 42.49a1.5 1.5 0 0 0 1.3 2.24h10.25a3.2 3.2 0 0 0 2.77-1.6l10.56-18.3a3.2 3.2 0 0 0 0-3.2z" />
  );

/** Avalanche Circle chain icon (colored). */
export const AvalancheCircle = /* @__PURE__ */ createIcon<AvalancheProps>(
  'AvalancheCircle',
  '0 0 64 64',
  ({ withBackground = true }) => withBackgroundArtwork(withBackground),
  { fill: '#E6212F', props: ['withBackground'] },
);

/** Avalanche chain icon (colored). */
export const Avalanche = /* @__PURE__ */ createIcon(
  'Avalanche',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="translate(-4.58 -4.55)scale(.28602)">
      <g clipPath={`url(#${_id}-avl-c)`}>
        <path d="M152.66 213.84h65.55c5.79 0 9.4-6.27 6.51-11.28l-32.78-56.77c-2.9-5-10.12-5-13.01 0l-32.78 56.77c-2.9 5.01.72 11.28 6.5 11.28" />
        <path d="m160.85 91.96-26.94-46.68c-2.72-4.71-9.53-4.71-12.25 0l-90.6 156.94c-2.99 5.16.74 11.61 6.7 11.61H91.7a16.1 16.1 0 0 0 13.94-8.05l55.2-95.62a18.2 18.2 0 0 0 0-18.2" />
      </g>
      <defs>
        <clipPath id={`${_id}-avl-c`}>
          <rect width="196" height="173" x="30" y="41" />
        </clipPath>
      </defs>
    </g>
  ),
  { fill: '#E6212F', ids: true },
);

/** Avalanche Circle chain icon (monochrome). */
export const AvalancheCircleMono = /* @__PURE__ */ createIcon<AvalancheProps>(
  'AvalancheCircleMono',
  '0 0 64 64',
  ({ withBackground = false }) => withBackgroundArtwork(withBackground),
  { fill: 'currentColor', props: ['withBackground'] },
);

/** Avalanche Square chain icon (colored). */
export const AvalancheSquare = /* @__PURE__ */ createIcon(
  'AvalancheSquare',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="scale(.25)">
      <path fill="#1D1D1D" d="M0 0h256v256H0Z" />
      <g fill="#E6212F" clipPath={`url(#${_id}-avls-c)`}>
        <path d="M152.66 213.84h65.55c5.79 0 9.4-6.27 6.51-11.28l-32.78-56.77c-2.9-5-10.12-5-13.01 0l-32.78 56.77c-2.9 5.01.72 11.28 6.5 11.28" />
        <path d="m160.85 91.96-26.94-46.68c-2.72-4.71-9.53-4.71-12.25 0l-90.6 156.94c-2.99 5.16.74 11.61 6.7 11.61H91.7a16.1 16.1 0 0 0 13.94-8.05l55.2-95.62a18.2 18.2 0 0 0 0-18.2" />
      </g>
      <defs>
        <clipPath id={`${_id}-avls-c`}>
          <rect width="196" height="173" x="30" y="41" />
        </clipPath>
      </defs>
    </g>
  ),
  { ids: true },
);

/** Avalanche Square chain icon (monochrome). */
export const AvalancheSquareMono = /* @__PURE__ */ createIcon(
  'AvalancheSquareMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M0 0h64v64H0Zm38.16 53.46h16.4c1.44 0 2.34-1.57 1.62-2.82l-8.2-14.2c-.72-1.24-2.52-1.24-3.25 0l-8.2 14.2c-.72 1.25.19 2.82 1.63 2.82m2.05-30.47-6.73-11.67c-.68-1.18-2.39-1.18-3.07 0L7.76 50.55c-.74 1.3.19 2.9 1.68 2.9h13.49c1.44 0 2.76-.76 3.48-2l13.8-23.91c.82-1.4.82-3.14 0-4.55"
    />
  ),
  { fill: 'currentColor' },
);

/** Avalanche chain icon (monochrome). */
export const AvalancheMono = /* @__PURE__ */ createIcon(
  'AvalancheMono',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="translate(-4.58 -4.55)scale(.28602)">
      <g clipPath={`url(#${_id}-avlm-c)`}>
        <path d="M152.66 213.84h65.55c5.79 0 9.4-6.27 6.51-11.28l-32.78-56.77c-2.9-5-10.12-5-13.01 0l-32.78 56.77c-2.9 5.01.72 11.28 6.5 11.28" />
        <path d="m160.85 91.96-26.94-46.68c-2.72-4.71-9.53-4.71-12.25 0l-90.6 156.94c-2.99 5.16.74 11.61 6.7 11.61H91.7a16.1 16.1 0 0 0 13.94-8.05l55.2-95.62a18.2 18.2 0 0 0 0-18.2" />
      </g>
      <defs>
        <clipPath id={`${_id}-avlm-c`}>
          <rect width="196" height="173" x="30" y="41" />
        </clipPath>
      </defs>
    </g>
  ),
  { fill: 'currentColor', ids: true },
);
