import { createIcon } from '../utils';

// Source: https://app.sky.money/tokens/sky.svg
// Source: https://sky.money (Sky-Logo-Monochrome.svg: the same pinwheel symbol without a background)
// MakerDAO rebranded to Sky (Sky Ecosystem) and MKR upgrades to SKY. Circle: the official SKY token file unchanged (a white disc with eleven radial-gradient rays)
// Default: the same file without its white disc, i.e. the pinwheel symbol the sky.money logo shows standalone
// Mono / CircleMono: the eleven ray paths of the token file as one currentColor path; CircleMono knocks them out of the disc
/** Sky DeFi icon (colored). */
export const Sky = /* @__PURE__ */ createIcon(
  'Sky',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="translate(-2.33 -2.35)scale(2.8612)">
      <path
        fill={`url(#${_id}-paint0_radial_3491_8833)`}
        d="M2.7 15.02q-.48-1.47-.48-3.02l.07-.05 9.44.01.27.04z"
      />
      <path
        fill={`url(#${_id}-paint1_radial_3491_8833)`}
        d="M15.02 21.3c-1.46.48-3.02.6-4.55.36l-.07-.11 1.57-9.43L12 12z"
      />
      <path
        fill={`url(#${_id}-paint2_radial_3491_8833)`}
        d="M21.78 12q0 1.55-.48 3.02h-.21l-9.04-2.98L12 12z"
      />
      <path
        fill={`url(#${_id}-paint3_radial_3491_8833)`}
        d="M4.09 6.25q.45-.62 1-1.17l.08.03 6.78 6.81.05.08z"
      />
      <path
        fill={`url(#${_id}-paint4_radial_3491_8833)`}
        d="M5.09 5.08a9.8 9.8 0 0 1 5.38-2.74l.04.07 1.5 9.43V12z"
      />
      <path
        fill={`url(#${_id}-paint5_radial_3491_8833)`}
        d="M10.47 2.34a10 10 0 0 1 4.55.36L12 12z"
      />
      <path
        fill={`url(#${_id}-paint6_radial_3491_8833)`}
        d="M2.22 12q0-1.55.48-3.02L12 12z"
      />
      <path
        fill={`url(#${_id}-paint7_radial_3491_8833)`}
        d="M17.75 4.09a9.8 9.8 0 0 1 3.55 4.89L12 12z"
      />
      <path
        fill={`url(#${_id}-paint8_radial_3491_8833)`}
        d="M6.25 19.91a10 10 0 0 1-2.16-2.16L12 12z"
      />
      <path
        fill={`url(#${_id}-paint9_radial_3491_8833)`}
        d="M10.47 21.66q-.75-.12-1.5-.36L12 12z"
      />
      <path
        fill={`url(#${_id}-paint10_radial_3491_8833)`}
        d="M21.3 15.02a9.8 9.8 0 0 1-3.55 4.9L12 12z"
      />
      <defs>
        <radialGradient
          id={`${_id}-paint0_radial_3491_8833`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="translate(12 12)scale(-13.026)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#6D28FF" />
          <stop offset="1" stopColor="#F7A7F9" />
        </radialGradient>
        <radialGradient
          id={`${_id}-paint1_radial_3491_8833`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="rotate(90 0 12)scale(10.0119)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFCD6B" />
          <stop offset="1" stopColor="#EB5EDF" />
        </radialGradient>
        <radialGradient
          id={`${_id}-paint2_radial_3491_8833`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="rotate(-90 12 0)scale(10.0038)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#A273FF" />
          <stop offset=".5" stopColor="#9FAEFF" />
          <stop offset="1" stopColor="#B6ECDF" />
          <stop offset="1" stopColor="#AAF2E1" />
        </radialGradient>
        <radialGradient
          id={`${_id}-paint3_radial_3491_8833`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="rotate(114.17 2.12 9.88)scale(10.719)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFD2B9" />
          <stop offset=".29" stopColor="#C99BED" />
          <stop offset="1" stopColor="#0075FF" />
        </radialGradient>
        <radialGradient
          id={`${_id}-paint4_radial_3491_8833`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="rotate(-99 11.13 .87)scale(10.0139)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F7A7F9" />
          <stop offset="1" stopColor="#00DDFB" />
        </radialGradient>
        <radialGradient
          id={`${_id}-paint5_radial_3491_8833`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="rotate(-90 12 0)scale(10.0038)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#A273FF" />
          <stop offset=".5" stopColor="#9FAEFF" />
          <stop offset="1" stopColor="#B6ECDF" />
          <stop offset="1" stopColor="#AAF2E1" />
        </radialGradient>
        <radialGradient
          id={`${_id}-paint6_radial_3491_8833`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="translate(12 12)scale(-10.0208)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFF3D0" />
          <stop offset="1" stopColor="#FFC044" />
        </radialGradient>
        <radialGradient
          id={`${_id}-paint7_radial_3491_8833`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="rotate(90 0 12)scale(10.0119)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFCD6B" />
          <stop offset="1" stopColor="#EB5EDF" />
        </radialGradient>
        <radialGradient
          id={`${_id}-paint8_radial_3491_8833`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="rotate(114.17 2.12 9.88)scale(10.719)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFD2B9" />
          <stop offset=".29" stopColor="#C99BED" />
          <stop offset="1" stopColor="#0075FF" />
        </radialGradient>
        <radialGradient
          id={`${_id}-paint9_radial_3491_8833`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="rotate(90 0 12)scale(10.0326)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#D5FAFF" />
          <stop offset="1" stopColor="#00DDFB" />
        </radialGradient>
        <radialGradient
          id={`${_id}-paint10_radial_3491_8833`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="rotate(35.99 -12.47 24.47)scale(9.9752)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0075FF" />
          <stop offset="1" stopColor="#00DDFB" />
        </radialGradient>
      </defs>
    </g>
  ),
  { fill: 'none', ids: true },
);

/** Sky DeFi icon (monochrome). */
export const SkyMono = /* @__PURE__ */ createIcon(
  'SkyMono',
  '0 0 64 64',
  () => (
    <path d="M5.4 40.63q-1.38-4.2-1.38-8.64l.2-.15 27 .03.78.12zM40.63 58.6c-4.18 1.37-8.64 1.71-13.02 1.03l-.2-.32 4.5-26.98.08-.34zm19.34-26.61q0 4.43-1.37 8.64H58L32.14 32.1 32 32zM9.34 15.53q1.29-1.77 2.86-3.34l.26.08 19.4 19.49.14.23zm2.86-3.34a28 28 0 0 1 15.45-7.84l.12.2L32 31.53v.46zm15.42-7.84a28.6 28.6 0 0 1 13.02 1.03L32 31.98zM4.02 31.99q0-4.44 1.37-8.64L32 31.99zM48.45 9.35a28 28 0 0 1 10.16 14L32 31.99zM15.55 54.6a29 29 0 0 1-6.18-6.18L32 31.99zm12.07 5q-2.14-.34-4.29-1.02L32 31.99zm30.99-19a28 28 0 0 1-10.16 14.03L32 31.99z" />
  ),
  { fill: 'currentColor' },
);

/** Sky Circle DeFi icon (colored). */
export const SkyCircle = /* @__PURE__ */ createIcon(
  'SkyCircle',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="scale(2.66666)">
      <rect width="24" height="24" fill="white" rx="12" />
      <path
        fill={`url(#${_id}-paint0_radial_3491_8833)`}
        d="M2.7 15.02q-.48-1.47-.48-3.02l.07-.05 9.44.01.27.04z"
      />
      <path
        fill={`url(#${_id}-paint1_radial_3491_8833)`}
        d="M15.02 21.3c-1.46.48-3.02.6-4.55.36l-.07-.11 1.57-9.43L12 12z"
      />
      <path
        fill={`url(#${_id}-paint2_radial_3491_8833)`}
        d="M21.78 12q0 1.55-.48 3.02h-.21l-9.04-2.98L12 12z"
      />
      <path
        fill={`url(#${_id}-paint3_radial_3491_8833)`}
        d="M4.09 6.25q.45-.62 1-1.17l.08.03 6.78 6.81.05.08z"
      />
      <path
        fill={`url(#${_id}-paint4_radial_3491_8833)`}
        d="M5.09 5.08a9.8 9.8 0 0 1 5.38-2.74l.04.07 1.5 9.43V12z"
      />
      <path
        fill={`url(#${_id}-paint5_radial_3491_8833)`}
        d="M10.47 2.34a10 10 0 0 1 4.55.36L12 12z"
      />
      <path
        fill={`url(#${_id}-paint6_radial_3491_8833)`}
        d="M2.22 12q0-1.55.48-3.02L12 12z"
      />
      <path
        fill={`url(#${_id}-paint7_radial_3491_8833)`}
        d="M17.75 4.09a9.8 9.8 0 0 1 3.55 4.89L12 12z"
      />
      <path
        fill={`url(#${_id}-paint8_radial_3491_8833)`}
        d="M6.25 19.91a10 10 0 0 1-2.16-2.16L12 12z"
      />
      <path
        fill={`url(#${_id}-paint9_radial_3491_8833)`}
        d="M10.47 21.66q-.75-.12-1.5-.36L12 12z"
      />
      <path
        fill={`url(#${_id}-paint10_radial_3491_8833)`}
        d="M21.3 15.02a9.8 9.8 0 0 1-3.55 4.9L12 12z"
      />
      <defs>
        <radialGradient
          id={`${_id}-paint0_radial_3491_8833`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="translate(12 12)scale(-13.026)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#6D28FF" />
          <stop offset="1" stopColor="#F7A7F9" />
        </radialGradient>
        <radialGradient
          id={`${_id}-paint1_radial_3491_8833`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="rotate(90 0 12)scale(10.0119)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFCD6B" />
          <stop offset="1" stopColor="#EB5EDF" />
        </radialGradient>
        <radialGradient
          id={`${_id}-paint2_radial_3491_8833`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="rotate(-90 12 0)scale(10.0038)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#A273FF" />
          <stop offset=".5" stopColor="#9FAEFF" />
          <stop offset="1" stopColor="#B6ECDF" />
          <stop offset="1" stopColor="#AAF2E1" />
        </radialGradient>
        <radialGradient
          id={`${_id}-paint3_radial_3491_8833`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="rotate(114.17 2.12 9.88)scale(10.719)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFD2B9" />
          <stop offset=".29" stopColor="#C99BED" />
          <stop offset="1" stopColor="#0075FF" />
        </radialGradient>
        <radialGradient
          id={`${_id}-paint4_radial_3491_8833`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="rotate(-99 11.13 .87)scale(10.0139)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F7A7F9" />
          <stop offset="1" stopColor="#00DDFB" />
        </radialGradient>
        <radialGradient
          id={`${_id}-paint5_radial_3491_8833`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="rotate(-90 12 0)scale(10.0038)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#A273FF" />
          <stop offset=".5" stopColor="#9FAEFF" />
          <stop offset="1" stopColor="#B6ECDF" />
          <stop offset="1" stopColor="#AAF2E1" />
        </radialGradient>
        <radialGradient
          id={`${_id}-paint6_radial_3491_8833`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="translate(12 12)scale(-10.0208)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFF3D0" />
          <stop offset="1" stopColor="#FFC044" />
        </radialGradient>
        <radialGradient
          id={`${_id}-paint7_radial_3491_8833`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="rotate(90 0 12)scale(10.0119)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFCD6B" />
          <stop offset="1" stopColor="#EB5EDF" />
        </radialGradient>
        <radialGradient
          id={`${_id}-paint8_radial_3491_8833`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="rotate(114.17 2.12 9.88)scale(10.719)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFD2B9" />
          <stop offset=".29" stopColor="#C99BED" />
          <stop offset="1" stopColor="#0075FF" />
        </radialGradient>
        <radialGradient
          id={`${_id}-paint9_radial_3491_8833`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="rotate(90 0 12)scale(10.0326)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#D5FAFF" />
          <stop offset="1" stopColor="#00DDFB" />
        </radialGradient>
        <radialGradient
          id={`${_id}-paint10_radial_3491_8833`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="rotate(35.99 -12.47 24.47)scale(9.9752)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0075FF" />
          <stop offset="1" stopColor="#00DDFB" />
        </radialGradient>
      </defs>
    </g>
  ),
  { fill: 'none', ids: true },
);

/** Sky Circle DeFi icon (monochrome). */
export const SkyCircleMono = /* @__PURE__ */ createIcon(
  'SkyCircleMono',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="scale(2.66666)">
      <rect width="24" height="24" mask={`url(#${_id}-skyc-a)`} rx="12" />
      <defs>
        <mask id={`${_id}-skyc-a`}>
          <rect width="24" height="24" fill="#fff" />
          <path
            fill="#000"
            d="M2.7 15.02q-.48-1.47-.48-3.02l.07-.05 9.44.01.27.04zm12.32 6.28c-1.46.48-3.02.6-4.55.36l-.07-.11 1.57-9.43L12 12zm6.76-9.3q0 1.55-.48 3.02h-.21l-9.04-2.98L12 12zM4.08 6.25q.45-.62 1-1.17l.09.03 6.78 6.81.05.08zm1-1.17a9.8 9.8 0 0 1 5.4-2.74l.04.07L12 11.84V12zm5.39-2.74a10 10 0 0 1 4.55.36L12 12zM2.22 12q0-1.55.48-3.02L12 12zm15.53-7.91a9.8 9.8 0 0 1 3.55 4.89L12 12zM6.25 19.9a10 10 0 0 1-2.16-2.16L12 12zm4.22 1.75q-.75-.12-1.5-.36L12 12zm10.83-6.64a9.8 9.8 0 0 1-3.55 4.9L12 12z"
          />
        </mask>
      </defs>
    </g>
  ),
  { fill: 'currentColor', ids: true },
);
