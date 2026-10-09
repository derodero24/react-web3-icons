import { createIcon } from '../utils';

// Source: https://docs.spark.finance/brand/spark-logomark.svg (official press kit at https://docs.spark.finance/brand, linked from the spark.finance homepage)
// Spark is the lending and savings protocol of the Sky ecosystem; the mark is a four-point spark star
// Spark: the press kit's spark-logomark.svg, path and #FA43BD to #FFA930 gradient unchanged, placed on the 64 grid. The kit's lockup spark-logo.svg and the docs favicon https://docs.spark.finance/fav.svg draw the same square star
// SparkMono: the same path in currentColor
// The spark.finance site lockup (https://spark.finance/logo.svg; spark.fi now redirects there) draws a slightly narrower star (aspect 0.966 against 1.0), which the previous artwork copied; the kit is followed instead (accessed 2026-10-09)
/** Spark DeFi icon (colored). */
export const Spark = /* @__PURE__ */ createIcon(
  'Spark',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="translate(4 4)scale(.11268)">
      <defs>
        <linearGradient
          id={`${_id}-spark-a`}
          x1="400.58"
          x2="80.11"
          y1="661.97"
          y2="907.77"
          gradientTransform="translate(0 -530.11)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#FA43BD" />
          <stop offset="1" stopColor="#FFA930" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${_id}-spark-a)`}
        d="M313.04 279.2h177.98c6.84 0 8.22-9.32 2-12.17l-179.97-81.97V6.38c0-6.67-8.92-8.86-12-2.94L227.06 145.9l-81.99-37.66c-7.84-3.16-12.66 3.22-10 8.71l48.9 100.85h-178c-6.84 0-8.22 9.32-2 12.17l179.97 81.97v178.68c0 6.67 8.92 8.85 12 2.94l73.99-142.46 81.99 37.66c7.84 3.16 12.66-3.22 10-8.71z"
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
    <path d="M39.27 35.46h20.06c.77 0 .92-1.05.22-1.37l-20.28-9.24V4.72c0-.75-1-1-1.35-.33l-8.34 16.05-9.23-4.24c-.89-.36-1.43.36-1.13.98l5.5 11.36H4.68c-.77 0-.92 1.05-.22 1.37l20.28 9.24v20.13c0 .75 1 1 1.35.33l8.33-16.05 9.24 4.24c.89.36 1.43-.36 1.13-.98z" />
  ),
  { fill: 'currentColor' },
);
