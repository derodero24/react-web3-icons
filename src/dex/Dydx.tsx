import { createIcon } from '../utils';

export const Dydx = createIcon(
  'Dydx',
  '41 38 100.77 108',
  _id => (
    <>
      <path d="M116.379 38L41 145.991h23.143L139.912 38h-23.533z" fill="#fff" />
      <path
        d="M66.554 38l22.179 31.821-11.571 17.357L42.929 38h23.625z"
        fill={`url(#${_id}-dydx-a)`}
      />
      <path
        d="M118.625 146l-24.589-35.196 11.571-16.875L141.768 146h-23.143z"
        fill={`url(#${_id}-dydx-b)`}
      />
      <defs>
        <linearGradient
          id={`${_id}-dydx-a`}
          x1="61.25"
          y1="44.75"
          x2="93"
          y2="83.079"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity=".55" />
        </linearGradient>
        <linearGradient
          id={`${_id}-dydx-b`}
          x1="123.929"
          y1="137.804"
          x2="84.92"
          y2="85.216"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#6966ff" />
          <stop offset="1" stopColor="#6966ff" stopOpacity=".36" />
        </linearGradient>
      </defs>
    </>
  ),
  'none',
);

export const Dydx2 = createIcon('Dydx2', '0 0 183 183', _id => (
  <>
    <rect
      x="1"
      y="1"
      width="181"
      height="181"
      rx="37"
      fill={`url(#${_id}-dydx-2a)`}
    />
    <path d="M115.316 43L45 141.992h21.588L137.269 43h-21.953z" fill="#fff" />
    <path
      d="M68.838 43l20.689 29.17L78.732 88.08 46.799 43h22.038z"
      fill={`url(#${_id}-dydx-2b)`}
    />
    <path
      d="M117.411 142l-22.937-32.263 10.794-15.469L139 142h-21.589z"
      fill={`url(#${_id}-dydx-2c)`}
    />
    <rect
      x="1"
      y="1"
      width="181"
      height="181"
      rx="37"
      stroke="#2d2d3d"
      strokeWidth="2"
      fill="none"
    />
    <defs>
      <linearGradient
        id={`${_id}-dydx-2a`}
        x1="147.5"
        y1="-24.5"
        x2="103"
        y2="160.5"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#2c2c3d" />
        <stop offset="1" stopColor="#1a1a27" />
      </linearGradient>
      <linearGradient
        id={`${_id}-dydx-2b`}
        x1="63.89"
        y1="49.188"
        x2="92.895"
        y2="84.821"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fff" />
        <stop offset="1" stopColor="#fff" stopOpacity=".55" />
      </linearGradient>
      <linearGradient
        id={`${_id}-dydx-2c`}
        x1="122.359"
        y1="134.487"
        x2="86.787"
        y2="85.686"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#6966ff" />
        <stop offset="1" stopColor="#6966ff" stopOpacity=".36" />
      </linearGradient>
    </defs>
  </>
));

export const DydxMono = createIcon(
  'DydxMono',
  '41 38 100.77 108',
  () => (
    <>
      <path d="M116.379 38L41 145.991h23.143L139.912 38h-23.533zm-49.825 0l22.179 31.821-11.571 17.357L42.929 38h23.625zm52.071 108l-24.589-35.196 11.571-16.875L141.768 146h-23.143z" />
    </>
  ),
  'currentColor',
);

export const DydxMono2 = createIcon(
  'DydxMono2',
  '0 0 183 183',
  _id => (
    <>
      <rect
        x="1"
        y="1"
        width="181"
        height="181"
        rx="37"
        mask={`url(#${_id}-bydxm2-a)`}
      />
      <defs>
        <mask id={`${_id}-bydxm2-a`}>
          <rect width="100%" height="100%" fill="#fff" />
          <path
            d="M115.316 43L45 141.992h21.588L137.269 43h-21.953zm-46.478 0l20.689 29.17-10.795 15.91L46.799 43h22.038zm48.573 99l-22.937-32.263 10.794-15.469L139 142h-21.589z"
            fill="#000"
          />
        </mask>
      </defs>
    </>
  ),
  'currentColor',
);
