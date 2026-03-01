import { createIcon } from '../utils';

export const Thirdweb = createIcon('Thirdweb', '0 0 516 321', _id => (
  <>
    <path
      d="M1.405 27.001C-3.736 14.022 5.845 0 19.867 0h87.052c8.179 0 15.423 4.867 18.462 12.4l69.29 172.899c1.87 4.636 1.87 9.85 0 14.602l-43.584 108.583c-6.66 16.572-30.264 16.572-36.924 0L1.405 27.001z"
      fill={`url(#${_id}-thw-a)`}
    />
    <path
      d="M169.547 26.422C164.873 13.559 174.454 0 188.242 0h75.835c8.413 0 15.891 5.215 18.695 12.979l62.981 172.9c1.519 4.287 1.519 9.039 0 13.442L307.894 303.27c-6.309 17.382-31.081 17.382-37.391 0L169.547 26.422z"
      fill={`url(#${_id}-thw-b)`}
    />
    <path
      d="M321.331 27.001C316.19 14.022 325.771 0 339.793 0h87.052c8.179 0 15.424 4.867 18.462 12.4l69.29 172.899c1.87 4.636 1.87 9.85 0 14.602l-43.584 108.583c-6.66 16.572-30.263 16.572-36.924 0L321.331 27.001z"
      fill={`url(#${_id}-thw-c)`}
    />
    <defs>
      <linearGradient
        id={`${_id}-thw-a`}
        x1="7.405"
        y1="55.24"
        x2="260.485"
        y2="164.437"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#f213a4" />
        <stop offset=".152" stopColor="#e011a7" />
        <stop offset=".455" stopColor="#b20daf" />
        <stop offset=".879" stopColor="#6806bb" />
        <stop offset="1" stopColor="#5204bf" />
      </linearGradient>
      <linearGradient
        id={`${_id}-thw-b`}
        x1="175.093"
        y1="54.447"
        x2="410.968"
        y2="148.471"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#f213a4" />
        <stop offset=".152" stopColor="#e011a7" />
        <stop offset=".455" stopColor="#b20daf" />
        <stop offset=".879" stopColor="#6806bb" />
        <stop offset="1" stopColor="#5204bf" />
      </linearGradient>
      <linearGradient
        id={`${_id}-thw-c`}
        x1="327.331"
        y1="55.24"
        x2="580.411"
        y2="164.437"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#f213a4" />
        <stop offset=".152" stopColor="#e011a7" />
        <stop offset=".455" stopColor="#b20daf" />
        <stop offset=".879" stopColor="#6806bb" />
        <stop offset="1" stopColor="#5204bf" />
      </linearGradient>
    </defs>
  </>
));

export const ThirdwebMono = createIcon(
  'ThirdwebMono',
  '0 0 516 321',
  () => (
    <path d="M1.405 27.001C-3.736 14.022 5.845 0 19.867 0h87.052c8.179 0 15.423 4.867 18.462 12.4l69.29 172.899c1.87 4.636 1.87 9.85 0 14.602l-43.584 108.583c-6.66 16.572-30.264 16.572-36.924 0L1.405 27.001zm168.142-.579C164.873 13.559 174.454 0 188.242 0h75.835c8.413 0 15.891 5.215 18.695 12.979l62.981 172.9c1.519 4.287 1.519 9.039 0 13.442L307.894 303.27c-6.309 17.382-31.081 17.382-37.391 0L169.547 26.422zm151.784.579C316.19 14.022 325.771 0 339.793 0h87.052c8.179 0 15.424 4.867 18.462 12.4l69.29 172.899c1.87 4.636 1.87 9.85 0 14.602l-43.584 108.583c-6.66 16.572-30.263 16.572-36.924 0L321.331 27.001z" />
  ),
  'currentColor',
);
