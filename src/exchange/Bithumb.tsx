import { createIcon } from '../utils';

// Source: https://bithumb.com (official brand)
/** Bithumb exchange icon (colored). */
export const Bithumb = /* @__PURE__ */ createIcon(
  'Bithumb',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="translate(-5.322 -5.322)scale(3.11017)">
      <path
        fill="#D53127"
        d="M6.007 7.287h2.562L6.577 12.16s-1.042-.017-1.36-.927a1.44 1.44 0 0 1-.022-.835z"
      />
      <path
        fill="#F47320"
        d="m15.944 7.391-3.258-.057.733-2.418A1.483 1.483 0 0 0 12.005 3H9.03l-3.4 12.21s-1.218 5.222 3.4 5.695c0 0 7.3 1.492 9.643-7.329 0 0 1.236-5.335-2.73-6.185m-2.227 6.056s-.13 2.253-1.83 2.648a1.1 1.1 0 0 1-.75-.077c-.266-.136-.54-.418-.534-1.01q.006-.256.082-.504l.627-2.344h1.714s.776.252.691 1.287"
      />
      <path
        fill={`url(#${_id}-a)`}
        d="M18.83 11.117c-.312-3.584-2.886-3.726-2.886-3.726l-3.258-.057-1.4 4.854h1.71c.313.017.885.535.7 1.452"
      />
      <defs>
        <linearGradient
          id={`${_id}-a`}
          x1="18.23"
          x2="13.1"
          y1="15.91"
          y2="8.03"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".41" stopColor="#F47320" />
          <stop offset=".5" stopColor="#F16D21" />
          <stop offset=".62" stopColor="#E95C22" />
          <stop offset=".75" stopColor="#DC4125" />
          <stop offset=".81" stopColor="#D53127" />
        </linearGradient>
      </defs>
    </g>
  ),
  { ids: true },
);

/** Bithumb exchange icon (monochrome). */
export const BithumbMono = /* @__PURE__ */ createIcon(
  'BithumbMono',
  '0 0 64 64',
  () => (
    <>
      <path d="M13.36 17.342h7.969l-6.195 15.156s-3.241-.053-4.23-2.883a4.5 4.5 0 0 1-.069-2.597z" />
      <path d="m44.267 17.665-10.133-.177 2.28-7.52a4.612 4.612 0 0 0-4.398-5.96h-9.253L12.188 41.985S8.4 58.225 22.763 59.696c0 0 22.704 4.64 29.991-22.794 0 0 3.844-16.593-8.49-19.237M37.336 36.5s-.404 7.008-5.692 8.236a3.42 3.42 0 0 1-2.332-.24c-.827-.422-1.68-1.3-1.661-3.14q.019-.797.255-1.568l1.95-7.29h5.331s2.413.783 2.15 4.002" />
      <path d="M53.243 29.254c-.97-11.147-8.976-11.589-8.976-11.589l-10.133-.177-4.355 15.097h5.319c.973.053 2.752 1.664 2.177 4.516" />
    </>
  ),
  { fill: 'currentColor' },
);
