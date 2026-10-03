import { createIcon } from '../utils';

// Source: https://osmosis.zone/brand (official brand kit zip: Osmosis Brand Kit/Osmosis_IconBrandmark Combo.svg, Osmosis_Icon.png)
// Flask artwork originally taken from @web3icons/react (MIT, OSMO token SVG); checked on 2026-10-03 against the official brand kit's icon (Osmosis_Icon.png and the flask in Osmosis_IconBrandmark Combo.svg), which it matches
/** Osmosis DEX icon (colored). */
export const Osmosis = /* @__PURE__ */ createIcon(
  'Osmosis',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="translate(-5.32 -5.32)scale(3.11017)">
      <defs>
        <linearGradient
          id={`${_id}-osmo-a`}
          x1="17.43"
          x2="8.23"
          y1="6.69"
          y2="13.62"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".29" stopColor="#fff" />
          <stop offset=".78" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id={`${_id}-osmo-d`}
          x1="10.69"
          x2="13.88"
          y1="20.87"
          y2="3.05"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#81FFFF" />
          <stop offset=".62" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id={`${_id}-osmo-e`}
          x1="3.8"
          x2="20.2"
          y1="11.99"
          y2="11.99"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0002E9" />
          <stop offset="1" stopColor="#FF00C7" />
        </linearGradient>
        <linearGradient
          id={`${_id}-osmo-f`}
          x1="21.7"
          x2="2.41"
          y1="4.58"
          y2="20.57"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".29" stopColor="#fff" />
          <stop offset=".78" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id={`${_id}-osmo-g`}
          x1="3.42"
          x2="20.22"
          y1="11.99"
          y2="11.99"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#000292" />
          <stop offset="1" stopColor="#7D00C7" />
        </linearGradient>
        <linearGradient
          id={`${_id}-osmo-h`}
          x1="3.81"
          x2="20.21"
          y1="12.02"
          y2="12.02"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#000292" />
          <stop offset="1" stopColor="#BE00C7" />
        </linearGradient>
        <radialGradient
          id={`${_id}-osmo-b`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(18.3777 0 0 21.4266 19.36 10.4)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFEAFF" stopOpacity=".6" />
          <stop offset=".68" stopColor="#A087C9" />
          <stop offset="1" stopColor="#10002F" />
        </radialGradient>
        <radialGradient
          id={`${_id}-osmo-c`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(16.0515 0 0 17.6068 17.43 5.8)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFEAFF" stopOpacity=".6" />
          <stop offset=".68" stopColor="#A087C9" />
          <stop offset="1" stopColor="#10002F" />
        </radialGradient>
      </defs>
      <path
        fill={`url(#${_id}-osmo-a)`}
        d="M12.62 6.15a6.6 6.6 0 0 0-4.76 1l-.04.05c.53-.32 1.29-.62 1.29-.62C7.13 7.77 6.53 9.1 6.53 9.1c.76-1.53 3.01-2.6 4.78-2.67s2.92.46 4.34 1.62c1.41 1.18 2.26 3.59 2.18 5.5-.08 1.9-1.05 3.44-1.05 3.44a9 9 0 0 0 1.33-2.21q.08-.3.12-.61c.61-3.82-1.9-7.4-5.61-8.02"
      />
      <path
        fill="#5E12A0"
        d="M19.63 6.53c-.17-.67-.72-1.33-1.7-2.07-.8-.6-1.64-.93-2.3-.93q-.2-.01-.39.04a1.1 1.1 0 0 0-.74.62c-.2.4-.25.94-.12 1.27q.07.15.19.34c-.65.4-1.02.5-1.06.53a7.3 7.3 0 0 1 3.95 3.34l.01-.15q.07-.65.34-1.38.25.07.5.07c.45 0 .85-.18 1.09-.53.24-.33.34-.78.23-1.16z"
      />
      <path
        fill={`url(#${_id}-osmo-b)`}
        d="M17.88 7.78c1.1.31 1.56-.56 1.4-1.15q-.22-.88-1.56-1.87c-.9-.68-1.81-.95-2.4-.83s-.75 1.04-.61 1.39a3 3 0 0 0 .38.57l-.63.4a7 7 0 0 1 2.82 2.32q.14-.51.32-.9.12 0 .28.06"
      />
      <path
        fill={`url(#${_id}-osmo-c)`}
        d="M11.53 20.06c3.76 0 6.81-3.14 6.81-7 0-3.87-3.05-7.01-6.8-7.01s-6.81 3.13-6.81 7 3.04 7 6.8 7"
      />
      <path
        fill="#A98698"
        d="M18.73 6.05a4.5 4.5 0 0 0-2.64-1.48c-.73-.18-.54-.6.35-.52a2 2 0 0 0-1.12-.12c-.58.12-.75 1.04-.61 1.39q.1.22.38.56a10 10 0 0 1-.85.52 6 6 0 0 1 1.27.8c-.68-.6-.53-.88.4-1.55.3-.22.83-.2 1.33.07.5.26 1.09.93 1.09.93l-.56 1.1.1.04q.54.13.86-.02c.26-.15.92-.71 0-1.72"
      />
      <path
        fill={`url(#${_id}-osmo-d)`}
        d="M11.53 20.06c3.76 0 6.81-3.14 6.81-7 0-3.87-3.05-6.88-6.8-6.88s-6.81 3-6.81 6.87 3.04 7 6.8 7"
      />
      <path
        fill="#A98698"
        d="M11.49 19.2c-3.72-.6-6.24-4.2-5.63-8.03A7 7 0 0 1 8.12 7a7 7 0 0 0-3.31 4.94c-.6 3.82 1.92 7.41 5.63 8.03 2.06.35 4.06-.32 5.54-1.62a6.7 6.7 0 0 1-4.5.85"
      />
      <path
        fill={`url(#${_id}-osmo-e)`}
        d="M17.82 12.99c0 3.67-2.84 6.65-6.34 6.65S5.12 16.66 5.12 13z"
      />
      <path
        fill={`url(#${_id}-osmo-f)`}
        d="M17.32 12.99c0 3.58-2.7 6.51-6.1 6.65h.25c3.51 0 6.35-2.98 6.35-6.65z"
      />
      <path
        fill={`url(#${_id}-osmo-g)`}
        d="M5.21 12.99c0 3.67 2.75 6.65 6.31 6.65l.45-.01c-3.35-.25-6-3.13-6-6.64z"
      />
      <path
        fill={`url(#${_id}-osmo-h)`}
        d="M17.82 13.05c0-.76-1.27-1.2-2.95-1.35-1.22-.1-2.45.03-3.86.48-1.22.37-2.33.31-3.13.2-1.78-.2-2.76-.23-2.76.67 0 1.3 2.54 2.94 6.34 2.37 1.93-.29 2.92-.88 4.06-1.28 1.23-.42 2.3-.4 2.3-1.09"
      />
      <path
        fill="#fff"
        d="M13.85 9.88a1.05 1.05 0 1 0 0-2.11 1.05 1.05 0 0 0 0 2.11m1.6 1.06a.53.53 0 1 0 0-1.06.53.53 0 0 0 0 1.06"
      />
      <path
        fill="#5E12A0"
        d="M11.53 5.65c-3.98 0-7.2 3.32-7.2 7.4s3.22 7.42 7.2 7.42 7.09-3.32 7.09-7.41-3.12-7.41-7.09-7.41m0 14.3c-3.77 0-6.68-3.03-6.68-6.9s2.92-6.87 6.68-6.87 6.56 3.01 6.56 6.88-2.8 6.88-6.56 6.88"
      />
      <path
        fill="#fff"
        d="M18.25 4.03c1 .76 1.67 1.52 1.9 2.35.15.56 0 1.17-.32 1.62a1.8 1.8 0 0 1-1.66.74q-.05.14-.07.27a8 8 0 0 1 1.05 4.05c0 4.36-3.32 7.94-7.62 7.94-4.28 0-7.74-3.57-7.74-7.94s3.46-7.94 7.74-7.94a8 8 0 0 1 2.3.36 2.4 2.4 0 0 1 .2-1.53 1.6 1.6 0 0 1 1.11-.9 2 2 0 0 1 .48-.05c.83 0 1.78.4 2.62 1.03zm-3.75.16c-.2.4-.25.94-.12 1.27l.19.33-.55.32a7 7 0 0 0-2.5-.46c-3.97 0-7.2 3.32-7.2 7.4s3.23 7.42 7.21 7.42c3.99 0 7.09-3.32 7.09-7.41a7.7 7.7 0 0 0-1.08-3.96q.1-.46.26-.96.27.07.52.07c.45 0 .84-.18 1.08-.53.25-.33.34-.78.23-1.16q-.24-.97-1.7-2.06c-.8-.6-1.64-.93-2.3-.93q-.2 0-.38.04a1.1 1.1 0 0 0-.75.62"
      />
    </g>
  ),
  { fill: 'none', ids: true },
);

/** Osmosis DEX icon (monochrome). */
export const OsmosisMono = /* @__PURE__ */ createIcon(
  'OsmosisMono',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="translate(-5.32 -5.32)scale(3.11017)">
      <mask id={`${_id}-a`}>
        <rect width="24" height="24" fill="#fff" />
        <path
          fill="#000"
          d="M18.73 6.05a4.5 4.5 0 0 0-2.64-1.48c-.73-.18-.54-.6.35-.52a2 2 0 0 0-1.12-.12c-.58.12-.75 1.04-.61 1.39q.1.22.38.56a10 10 0 0 1-.85.52 6 6 0 0 1 1.27.8c-.68-.6-.53-.88.4-1.55.3-.22.83-.2 1.33.07.5.26 1.09.93 1.09.93l-.56 1.1.1.04q.54.13.86-.02c.26-.15.92-.71 0-1.72"
        />
      </mask>
      <mask id={`${_id}-b`}>
        <rect width="24" height="24" fill="#fff" />
        <rect width="24" height="13.6" fill="#000" />
      </mask>
      <g>
        <path
          fillRule="evenodd"
          d="M4.32 13.06a7.21 7.21 0 1 0 14.42 0 7.21 7.21 0 1 0-14.42 0m.56 0a6.65 6.65 0 1 0 13.3 0 6.65 6.65 0 1 0-13.3 0"
        />
        <path
          d="M19.63 6.53c-.17-.67-.72-1.33-1.7-2.07-.8-.6-1.64-.93-2.3-.93q-.2-.01-.39.04a1.1 1.1 0 0 0-.74.62c-.2.4-.25.94-.12 1.27q.07.15.19.34c-.65.4-1.02.5-1.06.53a7.3 7.3 0 0 1 3.95 3.34l.01-.15q.07-.65.34-1.38.25.07.5.07c.45 0 .85-.18 1.09-.53.24-.33.34-.78.23-1.16z"
          mask={`url(#${_id}-a)`}
        />
        <path
          d="M11.53 20.06c3.76 0 6.81-3.14 6.81-7 0-3.87-3.05-7.01-6.8-7.01s-6.81 3.13-6.81 7 3.04 7 6.8 7"
          mask={`url(#${_id}-b)`}
        />
        <path d="M17.82 13.05c0-.76-1.27-1.2-2.95-1.35-1.22-.1-2.45.03-3.86.48-1.22.37-2.33.31-3.13.2-1.78-.2-2.76-.23-2.76.67 0 1.3 2.54 2.94 6.34 2.37 1.93-.29 2.92-.88 4.06-1.28 1.23-.42 2.3-.4 2.3-1.09" />
        <path d="M13.85 9.88a1.05 1.05 0 1 0 0-2.11 1.05 1.05 0 0 0 0 2.11m1.6 1.06a.53.53 0 1 0 0-1.06.53.53 0 0 0 0 1.06" />
      </g>
    </g>
  ),
  { fill: 'currentColor', ids: true },
);
