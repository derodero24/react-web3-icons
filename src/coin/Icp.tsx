import { createIcon } from '../utils';

export const Icp = createIcon('Icp', '0 0 24 24', _id => (
  <>
    <path
      fill={`url(#${_id}-a)`}
      fillRule="evenodd"
      d="m12 13.386.023-.027c1.313 1.277 3.208 2.763 4.85 2.763A4.09 4.09 0 0 0 21 12.072c0-2.237-1.845-4.05-4.126-4.05-1.746 0-3.465 1.295-4.874 2.736zm4.815 1.098c1.404 0 2.543-1.08 2.543-2.413S18.219 9.66 16.81 9.66s-2.781 1.305-3.744 2.412c.639.72 2.34 2.412 3.744 2.412z"
      clipRule="evenodd"
    />
    <path
      fill={`url(#${_id}-b)`}
      fillRule="evenodd"
      d="m12.054 13.44-.09-.09c-1.274 1.264-3.15 2.772-4.838 2.772A4.09 4.09 0 0 1 3 12.072c0-2.237 1.845-4.05 4.126-4.05 1.773 0 3.42 1.399 4.806 2.893l.122-.126zm-4.869 1.043c-1.409 0-2.547-1.08-2.547-2.412S5.776 9.66 7.185 9.66c1.408 0 2.78 1.305 3.744 2.412-.639.72-2.34 2.412-3.744 2.412"
      clipRule="evenodd"
    />
    <path
      fill="#46ABE3"
      d="m10.758 11.923.108.095 1.103 1.404c1.296 1.21 3.186 2.7 4.905 2.7a4.11 4.11 0 0 0 4.05-3.267c-.352.634-1.575 1.629-3.762 1.606q-.17.022-.351.023c-1.409 0-3.105-1.692-3.744-2.412l.013-.018-1.327-1.598-1.328-1.26c-1.062-.81-2.16-1.318-3.366-1.318-2.038 0-3.676 1.62-4.005 3.555.91-1.647 2.867-2.178 4.586-1.724 1.125.194 2.101 1.09 3.118 2.214"
    />
    <defs>
      <linearGradient
        id={`${_id}-a`}
        x1="21.918"
        x2="2.145"
        y1="11.615"
        y2="11.615"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#F2A528" />
        <stop offset="1" stopColor="#EF5E12" />
      </linearGradient>
      <linearGradient
        id={`${_id}-b`}
        x1="4.691"
        x2="21.402"
        y1="11.693"
        y2="11.693"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#5F2685" />
        <stop offset="1" stopColor="#DA1980" />
      </linearGradient>
    </defs>
  </>
));

const ICP_RIGHT =
  'm12 13.386.023-.027c1.313 1.277 3.208 2.763 4.85 2.763A4.09 4.09 0 0 0 21 12.072c0-2.237-1.845-4.05-4.126-4.05-1.746 0-3.465 1.295-4.874 2.736zm4.815 1.098c1.404 0 2.543-1.08 2.543-2.413S18.219 9.66 16.81 9.66s-2.781 1.305-3.744 2.412c.639.72 2.34 2.412 3.744 2.412z';
const ICP_LEFT =
  'm12.054 13.44-.09-.09c-1.274 1.264-3.15 2.772-4.838 2.772A4.09 4.09 0 0 1 3 12.072c0-2.237 1.845-4.05 4.126-4.05 1.773 0 3.42 1.399 4.806 2.893l.122-.126zm-4.869 1.043c-1.409 0-2.547-1.08-2.547-2.412S5.776 9.66 7.185 9.66c1.408 0 2.78 1.305 3.744 2.412-.639.72-2.34 2.412-3.744 2.412';
export const IcpMono = createIcon(
  'IcpMono',
  '0 0 24 24',
  _id => (
    <>
      <defs>
        {/* Mask: left loop knocks out right loop (with gap stroke) */}
        <mask id={`${_id}-r`}>
          <rect width="24" height="24" fill="white" />
          <path
            d={ICP_LEFT}
            fill="black"
            stroke="black"
            strokeWidth=".6"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </mask>
        {/* Mask: right loop knocks out left loop (with gap stroke) */}
        <mask id={`${_id}-l`}>
          <rect width="24" height="24" fill="white" />
          <path
            d={ICP_RIGHT}
            fill="black"
            stroke="black"
            strokeWidth=".6"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </mask>
        <clipPath id={`${_id}-cl`}>
          <rect width="12" height="24" />
        </clipPath>
        <clipPath id={`${_id}-cr`}>
          <rect x="12" width="12" height="24" />
        </clipPath>
      </defs>
      {/* Left half: left loop over right */}
      <g clipPath={`url(#${_id}-cl)`}>
        <path
          fillRule="evenodd"
          d={ICP_RIGHT}
          clipRule="evenodd"
          mask={`url(#${_id}-r)`}
        />
        <path fillRule="evenodd" d={ICP_LEFT} clipRule="evenodd" />
      </g>
      {/* Right half: right loop over left */}
      <g clipPath={`url(#${_id}-cr)`}>
        <path
          fillRule="evenodd"
          d={ICP_LEFT}
          clipRule="evenodd"
          mask={`url(#${_id}-l)`}
        />
        <path fillRule="evenodd" d={ICP_RIGHT} clipRule="evenodd" />
      </g>
    </>
  ),
  'currentColor',
);
