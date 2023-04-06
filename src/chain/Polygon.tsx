import type { IconProps } from '../utils';

export function Polygon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="14.85 41.75 470.3 416.51"
      width="1em"
      height="1em"
      {...props}
    >
      {props.title && <title>{props.title}</title>}
      <defs>
        <linearGradient
          id="plgn-a"
          x1="54.83"
          y1="392.31"
          x2="459.03"
          y2="97.58"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#a726c1" />
          <stop offset=".88" stopColor="#803bdf" />
          <stop offset="1" stopColor="#7b3fe4" />
        </linearGradient>
      </defs>
      <path
        d="M364.03 335.08l111.55-64.4c5.9-3.41 9.57-9.76 9.57-16.58V125.28a19.22 19.22 0 0 0-9.57-16.58L364.03 44.3a19.21 19.21 0 0 0-19.14 0l-111.55 64.4c-5.9 3.41-9.57 9.76-9.57 16.58v230.19l-78.22 45.15-78.22-45.15v-90.33l78.22-45.15 51.6 29.78v-60.59l-42.03-24.26a19.2 19.2 0 0 0-19.14 0L24.42 229.33c-5.9 3.41-9.57 9.76-9.57 16.58v128.81a19.22 19.22 0 0 0 9.57 16.58l111.55 64.41c5.9 3.4 13.23 3.4 19.14 0l111.55-64.4a19.22 19.22 0 0 0 9.57-16.58V144.54l1.41-.81 76.81-44.34 78.22 45.16v90.32l-78.22 45.16-51.52-29.74v60.59l41.95 24.23c5.9 3.4 13.24 3.4 19.14 0z"
        fill="url(#plgn-a)"
      />
    </svg>
  );
}

export function PolygonMono(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="14.85 41.75 470.3 416.51"
      width="1em"
      height="1em"
      fill="currentColor"
      {...props}
    >
      {props.title && <title>{props.title}</title>}
      <path d="M364.03 335.08l111.55-64.4c5.9-3.41 9.57-9.76 9.57-16.58V125.28a19.22 19.22 0 0 0-9.57-16.58L364.03 44.3a19.21 19.21 0 0 0-19.14 0l-111.55 64.4c-5.9 3.41-9.57 9.76-9.57 16.58v230.19l-78.22 45.15-78.22-45.15v-90.33l78.22-45.15 51.6 29.78v-60.59l-42.03-24.26a19.2 19.2 0 0 0-19.14 0L24.42 229.33c-5.9 3.41-9.57 9.76-9.57 16.58v128.81a19.22 19.22 0 0 0 9.57 16.58l111.55 64.41c5.9 3.4 13.23 3.4 19.14 0l111.55-64.4a19.22 19.22 0 0 0 9.57-16.58V144.54l1.41-.81 76.81-44.34 78.22 45.16v90.32l-78.22 45.16-51.52-29.74v60.59l41.95 24.23c5.9 3.4 13.24 3.4 19.14 0z" />
    </svg>
  );
}

export function Polygon2(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="4.5 5.5 491 489"
      width="1em"
      height="1em"
      {...props}
    >
      {props.title && <title>{props.title}</title>}
      <defs>
        <clipPath id="plgn2-a">
          <circle cx="250" cy="250" r="244.91" fill="none" />
        </clipPath>
        <linearGradient
          id="plgn2-b"
          x1="-116.09"
          y1="25.97"
          x2="437.45"
          y2="364.71"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#a229c5" />
          <stop offset="1" stopColor="#7b3fe4" />
        </linearGradient>
      </defs>
      <path
        d="M-18.1-18.1h536.2v536.2H-18.1z"
        clipPath="url(#plgn2-a)"
        fill="url(#plgn2-b)"
      />
      <path
        d="m320.83,302.85l69.29-40.01c3.67-2.12,5.94-6.06,5.94-10.3v-80.01c0-4.23-2.28-8.18-5.94-10.3l-69.29-40.01c-3.67-2.12-8.22-2.11-11.89,0l-69.29,40.01c-3.67,2.12-5.94,6.07-5.94,10.3v142.99l-48.59,28.05-48.59-28.05v-56.11l48.59-28.05,32.05,18.5v-37.64l-26.11-15.07c-1.8-1.04-3.86-1.59-5.95-1.59s-4.15.55-5.94,1.59l-69.29,40.01c-3.67,2.12-5.94,6.06-5.94,10.3v80.01c0,4.23,2.28,8.18,5.94,10.3l69.29,40.01c3.66,2.11,8.22,2.11,11.89,0l69.29-40c3.67-2.12,5.94-6.07,5.94-10.3v-142.99l.88-.5,47.71-27.55,48.59,28.05v56.11l-48.59,28.05-32-18.48v37.64l26.06,15.05c3.67,2.11,8.22,2.11,11.89,0Z"
        fill="#fff"
      />
    </svg>
  );
}

export function PolygonMono2(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="4.5 5.5 491 489"
      width="1em"
      height="1em"
      fill="currentColor"
      {...props}
    >
      {props.title && <title>{props.title}</title>}
      <path
        d="M-18.1-18.1h536.2v536.2H-18.1z"
        clipPath="url(#plgnm2-a)"
        mask="url(#plgnm2-b)"
      />
      <defs>
        <clipPath id="plgnm2-a">
          <circle cx="250" cy="250" r="244.91" fill="none" />
        </clipPath>
        <mask id="plgnm2-b">
          <rect width="200%" height="200%" fill="#fff" />
          <path
            d="m320.83,302.85l69.29-40.01c3.67-2.12,5.94-6.06,5.94-10.3v-80.01c0-4.23-2.28-8.18-5.94-10.3l-69.29-40.01c-3.67-2.12-8.22-2.11-11.89,0l-69.29,40.01c-3.67,2.12-5.94,6.07-5.94,10.3v142.99l-48.59,28.05-48.59-28.05v-56.11l48.59-28.05,32.05,18.5v-37.64l-26.11-15.07c-1.8-1.04-3.86-1.59-5.95-1.59s-4.15.55-5.94,1.59l-69.29,40.01c-3.67,2.12-5.94,6.06-5.94,10.3v80.01c0,4.23,2.28,8.18,5.94,10.3l69.29,40.01c3.66,2.11,8.22,2.11,11.89,0l69.29-40c3.67-2.12,5.94-6.07,5.94-10.3v-142.99l.88-.5,47.71-27.55,48.59,28.05v56.11l-48.59,28.05-32-18.48v37.64l26.06,15.05c3.67,2.11,8.22,2.11,11.89,0Z"
            fill="#000"
          />
        </mask>
      </defs>
    </svg>
  );
}
