import { createIcon } from '../utils';

// Source: https://thirdweb.com
/** Thirdweb devtool icon (colored). */
export const Thirdweb = /* @__PURE__ */ createIcon(
  'Thirdweb',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="translate(4 14.581)scale(.10853)">
      <path
        fill={`url(#${_id}-thw-a)`}
        d="M1.405 27.001C-3.736 14.022 5.845 0 19.867 0h87.052c8.179 0 15.423 4.867 18.462 12.4l69.29 172.899c1.87 4.636 1.87 9.85 0 14.602l-43.584 108.583c-6.66 16.572-30.264 16.572-36.924 0z"
      />
      <path
        fill={`url(#${_id}-thw-b)`}
        d="M169.547 26.422C164.873 13.559 174.454 0 188.242 0h75.835c8.413 0 15.891 5.215 18.695 12.979l62.981 172.9c1.519 4.287 1.519 9.039 0 13.442L307.894 303.27c-6.309 17.382-31.081 17.382-37.391 0z"
      />
      <path
        fill={`url(#${_id}-thw-c)`}
        d="M321.331 27.001C316.19 14.022 325.771 0 339.793 0h87.052c8.179 0 15.424 4.867 18.462 12.4l69.29 172.899c1.87 4.636 1.87 9.85 0 14.602l-43.584 108.583c-6.66 16.572-30.263 16.572-36.924 0z"
      />
      <defs>
        <linearGradient
          id={`${_id}-thw-a`}
          x1="7.41"
          x2="260.49"
          y1="55.24"
          y2="164.44"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#f213a4" />
          <stop offset=".15" stopColor="#e011a7" />
          <stop offset=".46" stopColor="#b20daf" />
          <stop offset=".88" stopColor="#6806bb" />
          <stop offset="1" stopColor="#5204bf" />
        </linearGradient>
        <linearGradient
          id={`${_id}-thw-b`}
          x1="175.09"
          x2="410.97"
          y1="54.45"
          y2="148.47"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#f213a4" />
          <stop offset=".15" stopColor="#e011a7" />
          <stop offset=".46" stopColor="#b20daf" />
          <stop offset=".88" stopColor="#6806bb" />
          <stop offset="1" stopColor="#5204bf" />
        </linearGradient>
        <linearGradient
          id={`${_id}-thw-c`}
          x1="327.33"
          x2="580.41"
          y1="55.24"
          y2="164.44"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#f213a4" />
          <stop offset=".15" stopColor="#e011a7" />
          <stop offset=".46" stopColor="#b20daf" />
          <stop offset=".88" stopColor="#6806bb" />
          <stop offset="1" stopColor="#5204bf" />
        </linearGradient>
      </defs>
    </g>
  ),
  { ids: true },
);

/** Thirdweb devtool icon (monochrome). */
export const ThirdwebMono = /* @__PURE__ */ createIcon(
  'ThirdwebMono',
  '0 0 64 64',
  () => (
    <path d="M4.152 17.511c-.557-1.408.482-2.93 2.004-2.93h9.448c.887 0 1.673.528 2.003 1.346l7.52 18.764a2.14 2.14 0 0 1 0 1.585l-4.73 11.784c-.723 1.798-3.284 1.798-4.007 0zM22.4 17.45c-.507-1.396.533-2.868 2.03-2.868h8.23a2.15 2.15 0 0 1 2.028 1.409l6.836 18.764c.164.465.164.98 0 1.459l-4.11 11.281c-.684 1.886-3.372 1.886-4.057 0zm16.473.062c-.558-1.408.482-2.93 2.004-2.93h9.447c.888 0 1.674.528 2.004 1.346l7.52 18.764a2.14 2.14 0 0 1 0 1.585l-4.73 11.784c-.723 1.798-3.285 1.798-4.008 0z" />
  ),
  { fill: 'currentColor' },
);
