import { createIcon } from '../utils';

// Source: https://solana.com/src/img/branding/solanaLogoMark.svg
// Source: https://solana.com/branding (official brand assets)
// Default: the official logomark solanaLogoMark.svg from solana.com/branding (six-stop gradient #9945FF -> #19FB9B), replacing the older #00FFA3 -> #DC1FFF mark
// Mono: the logomark's three bars in currentColor
// Circle and Square: no official container version exists; the repo's black disc / rx=12.8 tile is kept, with the official logomark (101x88) at translate(12.1 14.664) scale(0.394), the width of the previous mark; CircleMono and SquareMono knock the same bars out of the container (fill-rule=evenodd)
/** Solana chain icon (colored). */
export const Solana = /* @__PURE__ */ createIcon(
  'Solana',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="translate(4 7.6)scale(.55446)">
      <path
        fill={`url(#${_id}-sol-a)`}
        d="M100.48 69.38 83.81 86.8q-.55.57-1.3.89-.73.3-1.54.31H1.94q-.58 0-1.07-.3a2 2 0 0 1-.71-.83 1.8 1.8 0 0 1 .36-2.04L17.21 67.4q.55-.57 1.28-.89.74-.3 1.54-.31h79.03q.58 0 1.07.3.47.32.71.83.23.52.13 1.08t-.49.96M83.81 34.3q-.55-.57-1.3-.88a4 4 0 0 0-1.54-.32H1.94q-.58 0-1.07.31-.48.32-.71.83a1.8 1.8 0 0 0 .36 2.04L17.21 53.7q.55.57 1.28.88.74.3 1.54.32h79.03q.58 0 1.07-.31.47-.32.71-.83a1.8 1.8 0 0 0-.36-2.04zM1.94 21.8h79.03q.81-.01 1.55-.32.73-.31 1.29-.89l16.67-17.42q.4-.41.5-.96.09-.56-.14-1.08a2 2 0 0 0-.71-.82Q99.64 0 99.06 0H20.03q-.8 0-1.54.31-.74.32-1.28.89L.52 18.62q-.38.41-.49.96-.1.56.13 1.07.23.52.72.83.48.3 1.06.31"
      />
      <defs>
        <linearGradient
          id={`${_id}-sol-a`}
          x1="8.53"
          x2="88.99"
          y1="90.1"
          y2="-3.02"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".08" stopColor="#9945FF" />
          <stop offset=".3" stopColor="#8752F3" />
          <stop offset=".5" stopColor="#5497D5" />
          <stop offset=".6" stopColor="#43B4CA" />
          <stop offset=".72" stopColor="#28E0B9" />
          <stop offset=".97" stopColor="#19FB9B" />
        </linearGradient>
      </defs>
    </g>
  ),
  { ids: true },
);

/** Solana Circle chain icon (colored). */
export const SolanaCircle = /* @__PURE__ */ createIcon(
  'SolanaCircle',
  '0 0 64 64',
  (_props, _id) => (
    <>
      <circle cx="32" cy="32" r="32" />
      <g transform="translate(12.1 14.66)scale(.394)">
        <path
          fill={`url(#${_id}-solc-a)`}
          d="M100.48 69.38 83.81 86.8q-.55.57-1.3.89-.73.3-1.54.31H1.94q-.58 0-1.07-.3a2 2 0 0 1-.71-.83 1.8 1.8 0 0 1 .36-2.04L17.21 67.4q.55-.57 1.28-.89.74-.3 1.54-.31h79.03q.58 0 1.07.3.47.32.71.83.23.52.13 1.08t-.49.96M83.81 34.3q-.55-.57-1.3-.88a4 4 0 0 0-1.54-.32H1.94q-.58 0-1.07.31-.48.32-.71.83a1.8 1.8 0 0 0 .36 2.04L17.21 53.7q.55.57 1.28.88.74.3 1.54.32h79.03q.58 0 1.07-.31.47-.32.71-.83a1.8 1.8 0 0 0-.36-2.04zM1.94 21.8h79.03q.81-.01 1.55-.32.73-.31 1.29-.89l16.67-17.42q.4-.41.5-.96.09-.56-.14-1.08a2 2 0 0 0-.71-.82Q99.64 0 99.06 0H20.03q-.8 0-1.54.31-.74.32-1.28.89L.52 18.62q-.38.41-.49.96-.1.56.13 1.07.23.52.72.83.48.3 1.06.31"
        />
        <defs>
          <linearGradient
            id={`${_id}-solc-a`}
            x1="8.53"
            x2="88.99"
            y1="90.1"
            y2="-3.02"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset=".08" stopColor="#9945FF" />
            <stop offset=".3" stopColor="#8752F3" />
            <stop offset=".5" stopColor="#5497D5" />
            <stop offset=".6" stopColor="#43B4CA" />
            <stop offset=".72" stopColor="#28E0B9" />
            <stop offset=".97" stopColor="#19FB9B" />
          </linearGradient>
        </defs>
      </g>
    </>
  ),
  { ids: true },
);

/** Solana Square chain icon (colored). */
export const SolanaSquare = /* @__PURE__ */ createIcon(
  'SolanaSquare',
  '0 0 64 64',
  (_props, _id) => (
    <>
      <rect width="64" height="64" rx="12.8" />
      <g transform="translate(12.1 14.66)scale(.394)">
        <path
          fill={`url(#${_id}-sols-a)`}
          d="M100.48 69.38 83.81 86.8q-.55.57-1.3.89-.73.3-1.54.31H1.94q-.58 0-1.07-.3a2 2 0 0 1-.71-.83 1.8 1.8 0 0 1 .36-2.04L17.21 67.4q.55-.57 1.28-.89.74-.3 1.54-.31h79.03q.58 0 1.07.3.47.32.71.83.23.52.13 1.08t-.49.96M83.81 34.3q-.55-.57-1.3-.88a4 4 0 0 0-1.54-.32H1.94q-.58 0-1.07.31-.48.32-.71.83a1.8 1.8 0 0 0 .36 2.04L17.21 53.7q.55.57 1.28.88.74.3 1.54.32h79.03q.58 0 1.07-.31.47-.32.71-.83a1.8 1.8 0 0 0-.36-2.04zM1.94 21.8h79.03q.81-.01 1.55-.32.73-.31 1.29-.89l16.67-17.42q.4-.41.5-.96.09-.56-.14-1.08a2 2 0 0 0-.71-.82Q99.64 0 99.06 0H20.03q-.8 0-1.54.31-.74.32-1.28.89L.52 18.62q-.38.41-.49.96-.1.56.13 1.07.23.52.72.83.48.3 1.06.31"
        />
        <defs>
          <linearGradient
            id={`${_id}-sols-a`}
            x1="8.53"
            x2="88.99"
            y1="90.1"
            y2="-3.02"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset=".08" stopColor="#9945FF" />
            <stop offset=".3" stopColor="#8752F3" />
            <stop offset=".5" stopColor="#5497D5" />
            <stop offset=".6" stopColor="#43B4CA" />
            <stop offset=".72" stopColor="#28E0B9" />
            <stop offset=".97" stopColor="#19FB9B" />
          </linearGradient>
        </defs>
      </g>
    </>
  ),
  { ids: true },
);

/** Solana Square chain icon (monochrome). */
export const SolanaSquareMono = /* @__PURE__ */ createIcon(
  'SolanaSquareMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M12.8 0h38.4A12.8 12.8 0 0 1 64 12.8v38.4A12.8 12.8 0 0 1 51.2 64H12.8A12.8 12.8 0 0 1 0 51.2V12.8A12.8 12.8 0 0 1 12.8 0m38.89 42-6.57 6.86q-.22.23-.5.35-.3.12-.62.13H12.86a1 1 0 0 1-.42-.13 1 1 0 0 1-.28-.32.7.7 0 0 1 .14-.8l6.58-6.87q.21-.22.5-.35t.61-.12h31.14q.23 0 .42.12.18.13.28.33a.7.7 0 0 1-.14.8m-6.57-13.82a2 2 0 0 0-.5-.35q-.3-.12-.62-.12H12.86q-.23 0-.42.12a1 1 0 0 0-.28.32.7.7 0 0 0 .14.8l6.58 6.87q.21.23.5.35t.61.12h31.14q.23 0 .42-.12.18-.13.28-.32a.7.7 0 0 0-.14-.8zm-32.26-4.93H44q.32 0 .61-.12.3-.12.51-.35l6.57-6.87a.7.7 0 0 0 .14-.8 1 1 0 0 0-.28-.32 1 1 0 0 0-.42-.13H20q-.3 0-.6.13-.3.12-.51.35L12.3 22q-.15.16-.2.38-.03.22.05.42.1.2.29.33.18.12.41.12"
    />
  ),
  { fill: 'currentColor' },
);

/** Solana Circle chain icon (monochrome). */
export const SolanaCircleMono = /* @__PURE__ */ createIcon(
  'SolanaCircleMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M32 0a32 32 0 1 1 0 64 32 32 0 0 1 0-64m19.69 42-6.57 6.86q-.22.23-.5.35-.3.12-.62.13H12.86a1 1 0 0 1-.42-.13 1 1 0 0 1-.28-.32.7.7 0 0 1 .14-.8l6.58-6.87q.21-.22.5-.35t.61-.12h31.14q.23 0 .42.12.18.13.28.33a.7.7 0 0 1-.14.8m-6.57-13.82a2 2 0 0 0-.5-.35q-.3-.12-.62-.12H12.86q-.23 0-.42.12a1 1 0 0 0-.28.32.7.7 0 0 0 .14.8l6.58 6.87q.21.23.5.35t.61.12h31.14q.23 0 .42-.12.18-.13.28-.32a.7.7 0 0 0-.14-.8zm-32.26-4.93H44q.32 0 .61-.12.3-.12.51-.35l6.57-6.87a.7.7 0 0 0 .14-.8 1 1 0 0 0-.28-.32 1 1 0 0 0-.42-.13H20q-.3 0-.6.13-.3.12-.51.35L12.3 22q-.15.16-.2.38-.03.22.05.42.1.2.29.33.18.12.41.12"
    />
  ),
  { fill: 'currentColor' },
);

/** Solana chain icon (monochrome). */
export const SolanaMono = /* @__PURE__ */ createIcon(
  'SolanaMono',
  '0 0 64 64',
  () => (
    <path d="m59.71 46.07-9.24 9.66q-.3.32-.72.5a2 2 0 0 1-.85.17H5.07q-.31 0-.59-.18a1 1 0 0 1-.4-.45 1 1 0 0 1 .2-1.13l9.26-9.66q.3-.32.71-.5.4-.16.86-.17h43.82q.31 0 .59.18.25.17.4.45a1 1 0 0 1-.2 1.13m-9.24-19.45q-.3-.3-.72-.49a2 2 0 0 0-.85-.17H5.07q-.31 0-.59.17-.25.17-.4.46a1 1 0 0 0 .2 1.13l9.26 9.66q.3.3.71.49.4.17.86.17h43.82q.31 0 .59-.17.25-.17.4-.46a1 1 0 0 0-.2-1.13zM5.07 19.7H48.9q.45 0 .85-.18.41-.17.72-.49l9.24-9.66q.22-.23.27-.53t-.07-.6a1 1 0 0 0-.4-.45 1 1 0 0 0-.58-.18H15.1q-.45 0-.86.18t-.71.49l-9.25 9.66q-.22.23-.27.53t.07.6.4.45q.26.18.58.18" />
  ),
  { fill: 'currentColor' },
);
