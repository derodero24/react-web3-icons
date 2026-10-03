import { createIcon } from '../utils';

// Spark (SparkLend by MakerDAO) — lightning bolt mark
// Gradient: pink #FA43BD → orange #FFA930, from official spark.fi brand
/** Spark DeFi icon (colored). */
export const Spark = /* @__PURE__ */ createIcon(
  'Spark',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="translate(2.37 .4)scale(2.11127)">
      <defs>
        <linearGradient
          id={`${_id}-spark-a`}
          x1="20.82"
          x2="4.89"
          y1="9.45"
          y2="21.24"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FA43BD" />
          <stop offset="1" stopColor="#FFA930" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${_id}-spark-a)`}
        d="M17.32 16.61h9.19c.36 0 .46-.5.14-.65L17.3 11.6V2.05c0-.35-.46-.47-.62-.15L12.8 9.5l-4.3-2c-.3-.13-.58.18-.44.47l2.7 5.38H1.57c-.36 0-.46.5-.14.65l9.34 4.36v9.54c0 .36.46.48.62.16l3.88-7.6 4.32 2.01c.28.14.58-.17.43-.46z"
      />
    </g>
  ),
  { ids: true },
);

/** Spark DeFi icon (monochrome). */
export const SparkMono = /* @__PURE__ */ createIcon(
  'SparkMono',
  '0 0 64 64',
  () => (
    <path d="M38.93 35.46h19.4c.76 0 .99-1.05.3-1.37l-19.7-9.2V4.73c0-.75-.99-1-1.33-.33l-8.18 16.05-9.13-4.24c-.6-.28-1.22.37-.92.98l5.7 11.36H5.68c-.76 0-.99 1.05-.3 1.37l19.7 9.2v20.16c0 .76 1 1 1.34.34l8.17-16.06 9.12 4.26c.6.28 1.22-.38.92-.98z" />
  ),
  { fill: 'currentColor' },
);
