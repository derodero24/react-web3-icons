import { createIcon } from '../utils';

// Paths sourced from @web3icons/react (MIT) — MX token SVG (MEXC exchange)

const mexcMonoContent = () => (
  <>
    <path d="M7.2 7.406a2.113 2.113 0 0 1 3.701 0l5.813 10.281H5.201c-1.691 0-2.748-1.871-1.905-3.369z" />
    <path d="M16.8 7.406a2.113 2.113 0 0 0-3.701 0l-4.122 7.296c-.753 1.327.185 2.985 1.682 2.985h8.14c1.691 0 2.748-1.871 1.905-3.369z" />
    <path d="M10.659 17.687h6.055L12 9.347l-3.028 5.355c-.748 1.326.19 2.985 1.687 2.985" />
  </>
);

/** Mexc exchange icon (colored). */
export const Mexc = createIcon(
  'Mexc',
  '0 0 24 24',
  _id => (
    <>
      <defs>
        <linearGradient
          id={`${_id}-mx-a`}
          x1="9.029"
          x2="18.187"
          y1="15.981"
          y2="15.981"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".12" stopColor="#1C6AD9" />
          <stop offset=".76" stopColor="#1C6AD9" stopOpacity={0} />
        </linearGradient>
      </defs>
      <path
        fill="#1977F3"
        d="M7.2 7.406a2.113 2.113 0 0 1 3.7 0l5.814 10.28H5.2c-1.691 0-2.748-1.87-1.905-3.368z"
      />
      <path
        fill="#002F81"
        d="M16.8 7.406a2.113 2.113 0 0 0-3.7 0l-4.123 7.296c-.753 1.327.185 2.985 1.682 2.985h8.14c1.691 0 2.748-1.872 1.904-3.369z"
      />
      <path
        fill={`url(#${_id}-mx-a)`}
        d="M10.659 17.686h6.055L12 9.348 8.971 14.7c-.748 1.327.19 2.985 1.687 2.985"
      />
    </>
  ),
  'none',
);

/** Mexc exchange icon (monochrome). */
export const MexcMono = createIcon(
  'MexcMono',
  '0 0 24 24',
  mexcMonoContent,
  'currentColor',
);
