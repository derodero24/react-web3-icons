import type { IconProps } from '../lib';

export function YoroiWallet(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 215.39 187.24"
      width="1em"
      height="1em"
      {...props}
    >
      {props.title && <title>{props.title}</title>}
      <defs>
        <linearGradient
          id="yoroiwallet-a"
          x1="27.39"
          y1="132.9"
          x2="187.84"
          y2="-27.55"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#1a44b7" />
          <stop offset="1" stopColor="#4760ff" />
        </linearGradient>
      </defs>
      <path
        d="M166.41 146.46l-17.07 11.85-125.7-86.86c0-.17 0-.34-.05-.51v-7.75q0-3.77 0-7.53v-7.89zm-35.08-112.1l-22.84 15.5a2.05 2.05 0 0 1-2.76 0l-28.2-19.48Q62.71 20.09 47.91 9.74L33.9 0H0l4.77 3.35 26.57 18.42q13.14 9.14 26.27 18.28l24.71 17.21 23.51 16.24a1.72 1.72 0 0 0 2.31 0l19-12.92q23.48-16.09 46.92-32.23L208.22 5l7.17-5h-34q-25.04 17.17-50.06 34.36zM23.77 105.54a2.54 2.54 0 0 0-.18.45v14.24 8.51a1.35 1.35 0 0 0 .12.5l83.9 58h.08l17.07-11.84zm167.61-57.72L128.94 91a5.47 5.47 0 0 0 .66.74q7.92 5.61 15.85 11.17a.92.92 0 0 0 .57.1l45.21-31.3a1.73 1.73 0 0 0 .15-.42zm.05 58.63l-20.85 14.41 16.22 11.5 4.63-3.21z"
        fill="url(#yoroiwallet-a)"
      />
    </svg>
  );
}

export function YoroiWalletMono(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 215.39 187.24"
      width="1em"
      height="1em"
      fill="currentColor"
      {...props}
    >
      {props.title && <title>{props.title}</title>}
      <path d="M166.41 146.46l-17.07 11.85-125.7-86.86c0-.17 0-.34-.05-.51v-7.75q0-3.77 0-7.53v-7.89zm-35.08-112.1l-22.84 15.5a2.05 2.05 0 0 1-2.76 0l-28.2-19.48Q62.71 20.09 47.91 9.74L33.9 0H0l4.77 3.35 26.57 18.42q13.14 9.14 26.27 18.28l24.71 17.21 23.51 16.24a1.72 1.72 0 0 0 2.31 0l19-12.92q23.48-16.09 46.92-32.23L208.22 5l7.17-5h-34q-25.04 17.17-50.06 34.36zM23.77 105.54a2.54 2.54 0 0 0-.18.45v14.24 8.51a1.35 1.35 0 0 0 .12.5l83.9 58h.08l17.07-11.84zm167.61-57.72L128.94 91a5.47 5.47 0 0 0 .66.74q7.92 5.61 15.85 11.17a.92.92 0 0 0 .57.1l45.21-31.3a1.73 1.73 0 0 0 .15-.42zm.05 58.63l-20.85 14.41 16.22 11.5 4.63-3.21z" />
    </svg>
  );
}
