import { createIcon } from '../utils';

const exodusContent = () => (
  <>
    <path d="M21 8.026 13.194 3v2.81l5.008 3.195-.59 1.83h-4.418v2.33h4.419l.589 1.83-5.008 3.195V21L21 15.99l-1.276-3.982z" />
    <path d="M6.404 13.164h4.401v-2.328H6.387l-.572-1.83 4.99-3.196V3L3 8.026l1.276 3.982L3 15.99 10.822 21v-2.81l-5.007-3.195z" />
  </>
);

/** Exodus wallet icon (colored). */
export const Exodus = createIcon(
  'Exodus',
  '0 0 24 24',
  _id => (
    <>
      <defs>
        <linearGradient
          id={`${_id}-exodus-a`}
          x1="18.475"
          x2="13.422"
          y1="22.238"
          y2=".981"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0B46F9" />
          <stop offset="1" stopColor="#BBFBE0" />
        </linearGradient>
        <linearGradient
          id={`${_id}-exodus-b`}
          x1="18.475"
          x2="13.423"
          y1="22.238"
          y2=".981"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0B46F9" />
          <stop offset="1" stopColor="#BBFBE0" />
        </linearGradient>
        <linearGradient
          id={`${_id}-exodus-f`}
          x1="4.215"
          x2="13.103"
          y1="7.05"
          y2="13.688"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".12" stopColor="#8952FF" stopOpacity=".87" />
          <stop offset="1" stopColor="#DABDFF" stopOpacity="0" />
        </linearGradient>
        <mask
          id={`${_id}-exodus-e`}
          width="18"
          height="18"
          x="3"
          y="3"
          maskUnits="userSpaceOnUse"
          style={{ maskType: 'alpha' }}
        >
          <path
            fill="#fff"
            d="M20.758 8.026 13.092 3v2.81l4.918 3.195-.579 1.83h-4.339v2.33h4.34l.578 1.83-4.918 3.195V21l7.666-5.01-1.254-3.982z"
          />
          <path
            fill="#fff"
            d="M6.424 13.164h4.322v-2.328H6.407l-.562-1.83 4.901-3.196V3L3.081 8.026l1.253 3.982-1.253 3.982L10.762 21v-2.81l-4.917-3.195z"
          />
        </mask>
      </defs>
      <path
        fill={`url(#${_id}-exodus-a)`}
        d="M21 8.026 13.194 3v2.81l5.008 3.195-.59 1.83h-4.418v2.33h4.419l.589 1.83-5.008 3.195V21L21 15.99l-1.276-3.982z"
      />
      <path
        fill={`url(#${_id}-exodus-b)`}
        d="M6.404 13.164h4.401v-2.328H6.387l-.572-1.83 4.99-3.196V3L3 8.026l1.276 3.982L3 15.99 10.822 21v-2.81l-5.007-3.195z"
      />
      <g mask={`url(#${_id}-exodus-e)`}>
        <path fill={`url(#${_id}-exodus-f)`} d="M20.64 3H3.09v18h17.55z" />
      </g>
    </>
  ),
  'none',
);

/** Exodus wallet icon (monochrome). */
export const ExodusMono = createIcon(
  'ExodusMono',
  '0 0 24 24',
  exodusContent,
  'currentColor',
);
