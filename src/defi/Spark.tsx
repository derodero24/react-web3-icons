import { createIcon } from '../utils';

// Spark (SparkLend by MakerDAO) — lightning bolt mark
// Gradient: pink #FA43BD → orange #FFA930, from official spark.fi brand
/** Spark DeFi icon (colored). */
export const Spark = /* @__PURE__ */ createIcon(
  'Spark',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="translate(2.371 .394)scale(2.11127)">
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
        d="M17.316 16.61h9.193c.358 0 .464-.497.139-.648l-9.334-4.359v-9.55c0-.355-.467-.472-.628-.156l-3.874 7.604L8.486 7.49c-.287-.133-.578.178-.434.465l2.703 5.381H1.56c-.358 0-.464.497-.138.65l9.333 4.359v9.548c0 .356.468.473.629.157l3.873-7.604 4.32 2.016c.287.134.578-.177.434-.464l-2.696-5.386Z"
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
    <path d="M38.93 35.462h19.409c.755 0 .98-1.05.293-1.368l-19.706-9.203V4.728c0-.75-.986-.996-1.326-.329l-8.18 16.054-9.133-4.246c-.606-.28-1.22.376-.916.982l5.707 11.36H5.665c-.756 0-.98 1.05-.292 1.373l19.705 9.203v20.159c0 .751.988.998 1.328.331l8.177-16.054 9.12 4.256c.606.283 1.22-.373.917-.98l-5.692-11.37Z" />
  ),
  { fill: 'currentColor' },
);
