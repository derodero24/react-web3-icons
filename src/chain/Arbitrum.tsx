import { createIcon } from '../utils';

// Source: https://arbitrum.foundation (links the Arbitrum Brand Kit)
// Source: https://arbitrumfoundation.notion.site/Arbitrum-Brand-Kit-48751dc5e03240a5872496283f088f79 (Arbitrum Foundation brand kit, accessed 2026-10-09)
// Source: https://arbitrumfoundation.notion.site/Arbitrum-brand-guidelines-6014e69d7b574f378a50f5ee678495d3 (Primary_Logomark_RGB.svg, AllWhite_Logos_Logomark_RGB.svg)
// Source: https://docs.arbitrum.io/img/logo.svg (the same logomark on the Arbitrum docs site)
// Source: https://arbitrumfoundation.notion.site/Arbitrum-One-brand-guidelines-20d0980a7bed43148e7de559ee90aa87 (0923_One_Logos_Logomark_RGB.svg, 0923_One-logomark_AllWhite_RGB.svg)
// Source: https://arbitrumfoundation.notion.site/Arbitrum-Nova-brand-guidelines-42f91337e0c541a28b2b0fcce7e60b0b (0923_Nova_Logos_Logomark_RGB.svg, 1223_Nova-logomark_AllWhite_RGB.svg)
// The kit pages serve their files through signed, expiring links, so the pages are cited and the files are named here
// Default: the Arbitrum logomark, Primary_Logomark_RGB.svg from the kit page "Arbitrum brand guidelines": the #213147 hexagon with the #9DCCED ring, the #12AAFF and white strokes and the #213147 notch, placed on the 64 grid; docs.arbitrum.io/img/logo.svg is the same artwork
// Mono: the kit's one-colour "Secondary" logomark, AllWhite_Logos_Logomark_RGB.svg, in currentColor: the ring and the four strokes in ink, the navy body left open (fill none in the file) and no notch. It is an outline rather than a filled hexagon because the brand's own one-colour mark is drawn that way (docs/icon-variants.md, mono rule 5)
// Circle and Square: the kit has no containered logomark (its "1:1 Logomarks" are the same marks on a transparent square), so these follow the repository container convention: the logomark on a #213147 disc (Circle) or on a #213147 square with rounded corners, rx 12.8 (Square). CircleMono and SquareMono are the container in currentColor with the AllWhite shape (ring and strokes) knocked out
// One: the kit's Arbitrum One logomark (0923_One_Logos_Logomark_RGB.svg on "Arbitrum One brand guidelines"): a hexagon outline around the A in Blue Shift #1B4ADD, paths unchanged and placed on the 64 grid. OneMono is the same paths in currentColor, which is the kit's 0923_One-logomark_AllWhite_RGB.svg (path data identical to the colour file)
// Nova: the kit's Arbitrum Nova logomark (0923_Nova_Logos_Logomark_RGB.svg on "Arbitrum Nova brand guidelines"): a hexagon outline around the N in Nova Orange #FF7700 (#f70 in the file), paths unchanged and placed on the 64 grid. NovaMono is the same paths in currentColor, which is the kit's 1223_Nova-logomark_AllWhite_RGB.svg (path data identical to the colour file)
// One and Nova replace pre-2023 circle marks of unrecorded origin (a #1B4ADD or #E57310 disc with the white letter, and their ring-shaped Flat versions); the current kit ships only the hexagon logomarks
// ArbitrumOneFlat, ArbitrumOneFlatMono, ArbitrumNovaFlat and ArbitrumNovaFlatMono: deprecated aliases of ArbitrumOne, ArbitrumOneMono, ArbitrumNova and ArbitrumNovaMono, since the current One and Nova logomarks are single-colour, so Flat is the same artwork as the default (#835)
/** Arbitrum chain icon (colored). */
export const Arbitrum = /* @__PURE__ */ createIcon(
  'Arbitrum',
  '0 0 64 64',
  () => (
    <>
      <path
        fill="#213147"
        d="M9.06 21.02v21.95c0 1.4.75 2.7 1.97 3.4l19 10.98a3.9 3.9 0 0 0 3.93 0l19.01-10.98c1.21-.7 1.96-2 1.96-3.4V21.02c0-1.4-.75-2.7-1.96-3.4L33.96 6.66a3.9 3.9 0 0 0-3.92 0L11.02 17.63a3.9 3.9 0 0 0-1.96 3.4"
      />
      <path
        fill="#12aaff"
        d="m36.15 36.26-2.72 7.43a1 1 0 0 0 0 .64l4.67 12.8L43.5 54l-6.48-17.75a.46.46 0 0 0-.87 0m5.43-12.5a.46.46 0 0 0-.87 0L38 31.18a1 1 0 0 0 0 .64l7.64 20.94 5.4-3.11z"
      />
      <path
        fill="#9dcced"
        d="M32 7.47q.2 0 .38.1l20.58 11.88c.23.14.38.4.38.67v23.75q-.02.44-.38.67L32.38 56.42q-.17.1-.38.1c-.21 0-.27-.04-.39-.1L11.04 44.55a.8.8 0 0 1-.39-.67V20.12c0-.27.15-.53.39-.67L31.6 7.58q.18-.1.39-.11M32 4c-.73 0-1.47.19-2.13.57L9.3 16.44a4.2 4.2 0 0 0-2.12 3.68v23.75a4.2 4.2 0 0 0 2.12 3.68l20.58 11.88a4.2 4.2 0 0 0 4.25 0L54.7 47.55a4.2 4.2 0 0 0 2.12-3.68V20.12a4.2 4.2 0 0 0-2.12-3.68L34.12 4.57A4 4 0 0 0 32 4"
      />
      <path fill="#213147" d="m18.39 52.8 1.9-5.18 3.8 3.16-3.56 3.26z" />
      <path
        fill="#fff"
        d="M30.26 18.42h-5.21a.9.9 0 0 0-.88.61L13 49.68l5.4 3.12 12.3-33.75a.46.46 0 0 0-.44-.63m9.13 0h-5.22a.9.9 0 0 0-.87.61l-12.76 35 5.39 3.12 13.9-38.1a.47.47 0 0 0-.44-.63"
      />
    </>
  ),
  {},
);

/** Arbitrum Circle chain icon (colored). */
export const ArbitrumCircle = /* @__PURE__ */ createIcon(
  'ArbitrumCircle',
  '0 0 64 64',
  () => (
    <>
      <g fill="#213147" transform="scale(.05216)">
        <circle cx="613.44" cy="613.44" r="613.44" />
        <path d="M162.91 397.79V829c0 27.53 14.71 52.99 38.54 66.71l373.44 215.65a77.2 77.2 0 0 0 77 0l373.44-215.65c23.83-13.72 38.54-39.18 38.54-66.71V397.79c0-27.53-14.71-52.99-38.54-66.71L651.89 115.43a77.2 77.2 0 0 0-77 0L201.36 331.08c-23.83 13.72-38.45 39.18-38.45 66.71" />
      </g>
      <path
        fill="#12aaff"
        d="m36.25 36.36-2.78 7.62a1 1 0 0 0 0 .65l4.78 13.11 5.53-3.19-6.64-18.19a.48.48 0 0 0-.9 0m5.57-12.81a.48.48 0 0 0-.9 0l-2.78 7.62a1 1 0 0 0 0 .65l7.84 21.46 5.52-3.19z"
      />
      <path
        fill="#9dcced"
        d="M32 6.86q.2 0 .4.1l21.07 12.18c.25.14.4.4.4.68v24.34q-.01.45-.4.69L32.4 57.02q-.19.1-.4.1c-.2 0-.27-.04-.39-.1L10.52 44.85a.8.8 0 0 1-.4-.68V19.83c0-.28.15-.54.4-.68L31.6 6.97a1 1 0 0 1 .4-.1m0-3.56q-1.14 0-2.18.58L8.74 16.06a4.4 4.4 0 0 0-2.17 3.77v24.34a4.4 4.4 0 0 0 2.17 3.76l21.08 12.18q1.04.58 2.18.58c1.14 0 1.5-.2 2.18-.58l21.08-12.18a4.4 4.4 0 0 0 2.17-3.76V19.83a4.4 4.4 0 0 0-2.17-3.77L34.17 3.89A4.3 4.3 0 0 0 32 3.31"
      />
      <path fill="#213147" d="M18.05 53.31 20 48l3.9 3.24-3.64 3.34z" />
      <path
        fill="#fff"
        d="M30.22 18.09h-5.34c-.4 0-.76.24-.9.62l-11.46 31.4 5.53 3.2 12.62-34.58a.47.47 0 0 0-.45-.64m9.35 0h-5.34c-.4 0-.76.24-.9.62L20.25 54.57l5.53 3.2 14.24-39.04a.48.48 0 0 0-.45-.64"
      />
    </>
  ),
  {},
);

/** Arbitrum chain icon (monochrome). */
export const ArbitrumMono = /* @__PURE__ */ createIcon(
  'ArbitrumMono',
  '0 0 64 64',
  () => (
    <>
      <path d="m36.15 36.26-2.72 7.43a1 1 0 0 0 0 .64l4.67 12.8L43.5 54l-6.48-17.75a.46.46 0 0 0-.87 0m5.43-12.5a.46.46 0 0 0-.87 0L38 31.18a1 1 0 0 0 0 .64l7.64 20.94 5.4-3.11z" />
      <path d="M32 7.47q.2 0 .38.1l20.58 11.88c.23.14.38.4.38.67v23.75q-.02.44-.38.67L32.38 56.42q-.17.1-.38.1c-.21 0-.27-.04-.39-.1L11.04 44.55a.8.8 0 0 1-.39-.67V20.12c0-.27.15-.53.39-.67L31.6 7.58q.18-.1.39-.11M32 4c-.73 0-1.47.19-2.13.57L9.3 16.44a4.2 4.2 0 0 0-2.12 3.68v23.75a4.2 4.2 0 0 0 2.12 3.68l20.58 11.88a4.2 4.2 0 0 0 4.25 0L54.7 47.55a4.2 4.2 0 0 0 2.12-3.68V20.12a4.2 4.2 0 0 0-2.12-3.68L34.12 4.57A4 4 0 0 0 32 4" />
      <path d="M30.26 18.42h-5.21a.9.9 0 0 0-.88.61L13 49.68l5.4 3.12 12.3-33.75a.46.46 0 0 0-.44-.63m9.13 0h-5.22a.9.9 0 0 0-.87.61l-12.76 35 5.39 3.12 13.9-38.1a.47.47 0 0 0-.44-.63" />
    </>
  ),
  { fill: 'currentColor' },
);

/** Arbitrum Circle chain icon (monochrome). */
export const ArbitrumCircleMono = /* @__PURE__ */ createIcon(
  'ArbitrumCircleMono',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="scale(.05216)">
      <circle
        cx="613.44"
        cy="613.44"
        r="613.44"
        mask={`url(#${_id}-arb-circle-a)`}
      />
      <defs>
        <mask id={`${_id}-arb-circle-a`}>
          <rect width="2453.76" height="2453.76" fill="#fff" />
          <g fill="#000">
            <path d="M694.86 697.03 641.6 843.08a18.8 18.8 0 0 0 0 12.55l91.62 251.3 105.97-61.2L712 697.03c-2.89-8.03-14.26-8.03-17.15 0zm106.79-245.62c-2.89-8.03-14.26-8.03-17.15 0l-53.26 146.05a18.8 18.8 0 0 0 0 12.55l150.11 411.44 105.97-61.2z" />
            <path d="M613.35 131.59c2.62 0 5.24.72 7.58 1.99l404.13 233.34c4.69 2.71 7.58 7.76 7.58 13.09V846.6c0 5.42-2.89 10.38-7.58 13.09l-404.13 233.34c-2.26 1.35-4.96 1.99-7.58 1.99s-5.24-.72-7.58-1.99L201.64 859.87c-4.69-2.71-7.58-7.76-7.58-13.09V380.1c0-5.42 2.89-10.38 7.58-13.09l404.13-233.34c2.35-1.35 4.96-2.08 7.58-2.08m0-68.15c-14.35 0-28.8 3.7-41.7 11.19L167.61 307.88c-25.82 14.89-41.7 42.43-41.7 72.21v466.59a83.4 83.4 0 0 0 41.7 72.21l404.13 233.34c12.91 7.4 27.26 11.19 41.7 11.19s28.8-3.7 41.7-11.19l404.13-233.34c25.82-14.89 41.7-42.43 41.7-72.21V380.09a83.4 83.4 0 0 0-41.7-72.21L655.05 74.63c-12.91-7.49-27.35-11.19-41.7-11.19" />
            <path d="M579.32 346.7H476.87a18.2 18.2 0 0 0-17.15 12.01L240.1 960.79l105.97 61.2L587.9 358.98c2.26-5.96-2.17-12.28-8.58-12.28m179.27 0H656.14a18.2 18.2 0 0 0-17.15 12.01l-250.76 687.48 105.97 61.2 272.97-748.41c2.17-5.96-2.26-12.28-8.58-12.28" />
          </g>
        </mask>
      </defs>
    </g>
  ),
  { fill: 'currentColor', ids: true },
);

/** Arbitrum Square chain icon (colored). */
export const ArbitrumSquare = /* @__PURE__ */ createIcon(
  'ArbitrumSquare',
  '0 0 64 64',
  () => (
    <>
      <rect width="64" height="64" fill="#213147" rx="12.8" />
      <g>
        <path
          fill="#12aaff"
          d="m35.41 35.5-2.23 6.1a1 1 0 0 0 0 .53l3.83 10.51 4.44-2.56-5.32-14.58a.38.38 0 0 0-.72 0m4.47-10.27a.38.38 0 0 0-.72 0l-2.23 6.1a1 1 0 0 0 0 .53l6.28 17.2 4.43-2.55z"
        />
        <path
          fill="#9dcced"
          d="M32 11.85q.17 0 .32.09l16.9 9.76c.2.1.32.32.32.54v19.52c0 .22-.12.43-.32.54l-16.9 9.76q-.15.09-.32.08a1 1 0 0 1-.32-.08l-16.9-9.75a.6.6 0 0 1-.31-.55V22.25q.01-.37.31-.55l16.9-9.76q.15-.09.32-.09M32 9q-.91 0-1.74.47l-16.9 9.76a3.5 3.5 0 0 0-1.74 3.02v19.5a3.5 3.5 0 0 0 1.74 3.03l16.9 9.76q.82.46 1.75.47c.93 0 1.2-.16 1.74-.47l16.9-9.76a3.5 3.5 0 0 0 1.74-3.02V22.25a3.5 3.5 0 0 0-1.74-3.02l-16.9-9.76A3.5 3.5 0 0 0 32 9"
        />
        <path
          fill="#fff"
          d="M30.58 20.85h-4.29c-.32 0-.6.2-.71.5l-9.19 25.18 4.43 2.56 10.12-27.73a.38.38 0 0 0-.36-.51m7.5 0h-4.29c-.32 0-.6.2-.72.5L22.6 50.1l4.43 2.56 11.41-31.3a.38.38 0 0 0-.35-.51"
        />
      </g>
    </>
  ),
  {},
);

/** Arbitrum Square chain icon (monochrome). */
export const ArbitrumSquareMono = /* @__PURE__ */ createIcon(
  'ArbitrumSquareMono',
  '0 0 64 64',
  (_props, _id) => (
    <>
      <rect width="64" height="64" mask={`url(#${_id}-arbs-a)`} rx="12.8" />
      <defs>
        <mask id={`${_id}-arbs-a`}>
          <rect width="100%" height="100%" fill="#fff" />
          <g fill="#000">
            <path d="m35.41 35.5-2.23 6.1a1 1 0 0 0 0 .53l3.83 10.51 4.44-2.56-5.32-14.58a.38.38 0 0 0-.72 0m4.47-10.27a.38.38 0 0 0-.72 0l-2.23 6.1a1 1 0 0 0 0 .53l6.28 17.2 4.43-2.55z" />
            <path d="M32 11.85q.17 0 .32.09l16.9 9.76c.2.1.32.32.32.54v19.52c0 .22-.12.43-.32.54l-16.9 9.76q-.15.09-.32.08a1 1 0 0 1-.32-.08l-16.9-9.75a.6.6 0 0 1-.31-.55V22.25q.01-.37.31-.55l16.9-9.76q.15-.09.32-.09M32 9q-.91 0-1.74.47l-16.9 9.76a3.5 3.5 0 0 0-1.74 3.02v19.5a3.5 3.5 0 0 0 1.74 3.03l16.9 9.76q.82.46 1.75.47c.93 0 1.2-.16 1.74-.47l16.9-9.76a3.5 3.5 0 0 0 1.74-3.02V22.25a3.5 3.5 0 0 0-1.74-3.02l-16.9-9.76A3.5 3.5 0 0 0 32 9" />
            <path d="M30.58 20.85h-4.29c-.32 0-.6.2-.71.5l-9.19 25.18 4.43 2.56 10.12-27.73a.38.38 0 0 0-.36-.51m7.5 0h-4.29c-.32 0-.6.2-.72.5L22.6 50.1l4.43 2.56 11.41-31.3a.38.38 0 0 0-.35-.51" />
          </g>
        </mask>
      </defs>
    </>
  ),
  { fill: 'currentColor', ids: true },
);

/** Arbitrum One chain icon (colored). */
export const ArbitrumOne = /* @__PURE__ */ createIcon(
  'ArbitrumOne',
  '0 0 64 64',
  () => (
    <>
      <path d="M32.07 7.48a1 1 0 0 1 .4.1L53 19.52c.24.14.4.4.38.67l-.08 23.76c0 .27-.15.53-.39.66l-20.6 11.8q-.18.11-.4.11c-.22 0-.26-.03-.39-.1L11 44.48a.7.7 0 0 1-.38-.67l.08-23.76c0-.28.15-.53.39-.66L31.7 7.57q.18-.1.37-.1M32.1 4q-1.12 0-2.13.56l-20.6 11.8a4.2 4.2 0 0 0-2.14 3.68L7.14 43.8c0 1.52.8 2.91 2.11 3.68L29.8 59.43a4.3 4.3 0 0 0 4.25 0l20.6-11.8a4.2 4.2 0 0 0 2.14-3.67l.08-23.76c0-1.51-.8-2.91-2.11-3.68L34.2 4.57A4 4 0 0 0 32.09 4" />
      <path d="M36.25 16.95h-3a.5.5 0 0 0-.51.36l-9.68 26.53c-.07.18.07.36.25.36h3c.23 0 .43-.14.51-.36l9.68-26.53c.07-.17-.07-.36-.25-.36m-5.27 0h-3a.5.5 0 0 0-.5.36L17.8 43.83c-.07.18.07.36.25.36h3.01q.36-.02.5-.36l9.68-26.52c.07-.17-.06-.36-.26-.36m3.9 10.28c-.07-.24-.42-.24-.5 0l-1.56 4.3a.5.5 0 0 0 0 .36l4.36 11.94c.08.21.28.36.5.36h3.01c.19 0 .32-.18.25-.36zm11.32 16.6-8.7-23.81a.25.25 0 0 0-.5 0l-1.56 4.29a.5.5 0 0 0 0 .36l6.99 19.16c.08.21.27.36.5.36h3c.2.01.33-.18.26-.36" />
    </>
  ),
  { fill: '#1B4ADD' },
);

/** Arbitrum One chain icon (monochrome). */
export const ArbitrumOneMono = /* @__PURE__ */ createIcon(
  'ArbitrumOneMono',
  '0 0 64 64',
  () => (
    <>
      <path d="M32.07 7.48a1 1 0 0 1 .4.1L53 19.52c.24.14.4.4.38.67l-.08 23.76c0 .27-.15.53-.39.66l-20.6 11.8q-.18.11-.4.11c-.22 0-.26-.03-.39-.1L11 44.48a.7.7 0 0 1-.38-.67l.08-23.76c0-.28.15-.53.39-.66L31.7 7.57q.18-.1.37-.1M32.1 4q-1.12 0-2.13.56l-20.6 11.8a4.2 4.2 0 0 0-2.14 3.68L7.14 43.8c0 1.52.8 2.91 2.11 3.68L29.8 59.43a4.3 4.3 0 0 0 4.25 0l20.6-11.8a4.2 4.2 0 0 0 2.14-3.67l.08-23.76c0-1.51-.8-2.91-2.11-3.68L34.2 4.57A4 4 0 0 0 32.09 4" />
      <path d="M36.25 16.95h-3a.5.5 0 0 0-.51.36l-9.68 26.53c-.07.18.07.36.25.36h3c.23 0 .43-.14.51-.36l9.68-26.53c.07-.17-.07-.36-.25-.36m-5.27 0h-3a.5.5 0 0 0-.5.36L17.8 43.83c-.07.18.07.36.25.36h3.01q.36-.02.5-.36l9.68-26.52c.07-.17-.06-.36-.26-.36m3.9 10.28c-.07-.24-.42-.24-.5 0l-1.56 4.3a.5.5 0 0 0 0 .36l4.36 11.94c.08.21.28.36.5.36h3.01c.19 0 .32-.18.25-.36zm11.32 16.6-8.7-23.81a.25.25 0 0 0-.5 0l-1.56 4.29a.5.5 0 0 0 0 .36l6.99 19.16c.08.21.27.36.5.36h3c.2.01.33-.18.26-.36" />
    </>
  ),
  { fill: 'currentColor' },
);

/** Arbitrum Nova chain icon (colored). */
export const ArbitrumNova = /* @__PURE__ */ createIcon(
  'ArbitrumNova',
  '0 0 64 64',
  () => (
    <>
      <path d="M32 7.47a1 1 0 0 1 .39.1l20.58 11.88c.24.14.39.4.39.67v23.75c0 .27-.15.53-.4.66L32.4 56.43q-.17.1-.39.1c-.22 0-.26-.04-.39-.1L11.04 44.54a.8.8 0 0 1-.39-.67V20.12q.01-.44.4-.67L31.6 7.58q.19-.1.39-.1M32 4a4 4 0 0 0-2.12.58L9.3 16.45a4.3 4.3 0 0 0-2.12 3.67v23.75c0 1.51.81 2.91 2.12 3.68l20.58 11.88c.65.38 1.39.57 2.12.57s1.47-.2 2.12-.57L54.7 47.55a4.2 4.2 0 0 0 2.12-3.68V20.12c0-1.52-.82-2.91-2.12-3.68L34.12 4.56A4 4 0 0 0 32 4" />
      <path d="M26.75 19.83h-2.68q-.33.02-.45.32l-8.66 23.7c-.05.16.06.32.23.32h2.69q.32-.02.44-.32l8.65-23.71c.07-.15-.05-.3-.22-.3Z" />
      <path d="M30.23 29.03c-.08-.21-.37-.21-.44 0l-1.4 3.82a.6.6 0 0 0 0 .34l3.9 10.67c.07.2.25.32.44.32h2.69c.17 0 .28-.16.22-.32z" />
      <path d="M31.45 19.83h-2.68c-.2 0-.38.13-.45.32l-8.64 23.7c-.06.16.05.32.23.32h2.68c.2 0 .38-.13.45-.32l8.64-23.71c.06-.15-.06-.3-.23-.3" />
      <path d="M32.58 22.57c-.08-.2-.37-.2-.44 0l-1.4 3.83a1 1 0 0 0 0 .33l6.25 17.12c.07.2.25.32.44.32h2.69c.17 0 .28-.16.23-.32z" />
      <path d="M48.8 19.83h-2.68c-.2 0-.38.13-.44.32l-6.26 17.12a1 1 0 0 0 0 .33l1.4 3.83c.08.2.37.2.44 0l7.76-21.28a.24.24 0 0 0-.21-.32Z" />
      <path d="M38.46 34.97c.08.21.38.21.45 0l5.41-14.82a.24.24 0 0 0-.23-.32h-2.68c-.2 0-.38.13-.45.32l-3.9 10.67a.6.6 0 0 0 0 .34z" />
    </>
  ),
  { fill: '#FF7700' },
);

/** Arbitrum Nova chain icon (monochrome). */
export const ArbitrumNovaMono = /* @__PURE__ */ createIcon(
  'ArbitrumNovaMono',
  '0 0 64 64',
  () => (
    <>
      <path d="M32 7.47a1 1 0 0 1 .39.1l20.58 11.88c.24.14.39.4.39.67v23.75c0 .27-.15.53-.4.66L32.4 56.43q-.17.1-.39.1c-.22 0-.26-.04-.39-.1L11.04 44.54a.8.8 0 0 1-.39-.67V20.12q.01-.44.4-.67L31.6 7.58q.19-.1.39-.1M32 4a4 4 0 0 0-2.12.58L9.3 16.45a4.3 4.3 0 0 0-2.12 3.67v23.75c0 1.51.81 2.91 2.12 3.68l20.58 11.88c.65.38 1.39.57 2.12.57s1.47-.2 2.12-.57L54.7 47.55a4.2 4.2 0 0 0 2.12-3.68V20.12c0-1.52-.82-2.91-2.12-3.68L34.12 4.56A4 4 0 0 0 32 4" />
      <path d="M26.75 19.83h-2.68q-.33.02-.45.32l-8.66 23.7c-.05.16.06.32.23.32h2.69q.32-.02.44-.32l8.65-23.71c.07-.15-.05-.3-.22-.3Z" />
      <path d="M30.23 29.03c-.08-.21-.37-.21-.44 0l-1.4 3.82a.6.6 0 0 0 0 .34l3.9 10.67c.07.2.25.32.44.32h2.69c.17 0 .28-.16.22-.32z" />
      <path d="M31.45 19.83h-2.68c-.2 0-.38.13-.45.32l-8.64 23.7c-.06.16.05.32.23.32h2.68c.2 0 .38-.13.45-.32l8.64-23.71c.06-.15-.06-.3-.23-.3" />
      <path d="M32.58 22.57c-.08-.2-.37-.2-.44 0l-1.4 3.83a1 1 0 0 0 0 .33l6.25 17.12c.07.2.25.32.44.32h2.69c.17 0 .28-.16.23-.32z" />
      <path d="M48.8 19.83h-2.68c-.2 0-.38.13-.44.32l-6.26 17.12a1 1 0 0 0 0 .33l1.4 3.83c.08.2.37.2.44 0l7.76-21.28a.24.24 0 0 0-.21-.32Z" />
      <path d="M38.46 34.97c.08.21.38.21.45 0l5.41-14.82a.24.24 0 0 0-.23-.32h-2.68c-.2 0-.38.13-.45.32l-3.9 10.67a.6.6 0 0 0 0 .34z" />
    </>
  ),
  { fill: 'currentColor' },
);

/** @deprecated The current Arbitrum One logomark is single-colour, so Flat is the same artwork as the default — use `ArbitrumOne` instead. */
export const ArbitrumOneFlat = ArbitrumOne;

/** @deprecated The current Arbitrum One logomark is single-colour, so FlatMono is the same artwork as the mono — use `ArbitrumOneMono` instead. */
export const ArbitrumOneFlatMono = ArbitrumOneMono;

/** @deprecated The current Arbitrum Nova logomark is single-colour, so Flat is the same artwork as the default — use `ArbitrumNova` instead. */
export const ArbitrumNovaFlat = ArbitrumNova;

/** @deprecated The current Arbitrum Nova logomark is single-colour, so FlatMono is the same artwork as the mono — use `ArbitrumNovaMono` instead. */
export const ArbitrumNovaFlatMono = ArbitrumNovaMono;
