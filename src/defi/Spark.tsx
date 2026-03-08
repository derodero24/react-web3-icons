import { createIcon } from '../utils';

// Spark (SparkLend by MakerDAO) — lightning bolt mark
// Gradient: pink #FA43BD → orange #FFA930, from official spark.fi brand
const SPARK_BOLT =
  'M17.316 16.61h9.193c.358 0 .464-.497.139-.648l-9.334-4.359v-9.55c0-.355-.467-.472-.628-.156l-3.874 7.604L8.486 7.49c-.287-.133-.578.178-.434.465l2.703 5.381H1.56c-.358 0-.464.497-.138.65l9.333 4.359v9.548c0 .356.468.473.629.157l3.873-7.604 4.32 2.016c.287.134.578-.177.434-.464l-2.696-5.386Z';

export const Spark = createIcon('Spark', '0 0 27.5 29.75', _id => (
  <>
    <defs>
      <linearGradient
        id={`${_id}-spark-a`}
        x1="20.815"
        y1="9.447"
        x2="4.893"
        y2="21.239"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FA43BD" />
        <stop offset="1" stopColor="#FFA930" />
      </linearGradient>
    </defs>
    <path d={SPARK_BOLT} fill={`url(#${_id}-spark-a)`} />
  </>
));

export const SparkMono = createIcon(
  'SparkMono',
  '0 0 27.5 29.75',
  () => <path d={SPARK_BOLT} />,
  'currentColor',
);
