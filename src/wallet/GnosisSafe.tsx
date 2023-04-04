import type { IconProps } from '../utils';

function GnosisSafeBase(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="90.15 110.1 115 115"
      width="1em"
      height="1em"
      {...props}
    >
      {props.title && <title>{props.title}</title>}
      <path d="M147.651 110.103c-31.7 0-57.5 25.7-57.5 57.5 0 31.7 25.7 57.5 57.5 57.5s57.5-25.7 57.5-57.5c0-31.7-25.8-57.5-57.5-57.5zm42.1 60.6h-26.7c-1.8 8.8-10.3 14.5-19.1 12.7s-14.5-10.3-12.7-19.1 10.3-14.5 19.1-12.7c6.7 1.3 11.8 6.7 12.9 13.5h26.5c1.6 0 2.8 1.3 2.8 2.8 0 1.6-1.3 2.8-2.8 2.8z" />
    </svg>
  );
}

function GnosisSafeBase2(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="126.88 145.93 32.08 33.07"
      width="1em"
      height="1em"
      {...props}
    >
      {props.title && <title>{props.title}</title>}
      <path
        d="M157.084 162.458h-3.479c-1.039 0-1.881.868-1.881 1.939v5.205c0 1.071-.842 1.939-1.881 1.939h-13.841c-1.039 0-1.881.868-1.881 1.939v3.586c0 1.071.842 1.939 1.881 1.939h14.642c1.039 0 1.869-.868 1.869-1.939v-2.877c0-1.071.842-1.831 1.881-1.831h2.689c1.039 0 1.881-.868 1.881-1.939v-6.045c0-1.071-.842-1.916-1.881-1.916h.001zm-22.963-7.124c0-1.071.842-1.939 1.881-1.939h13.832c1.039 0 1.881-.868 1.881-1.939v-3.586c0-1.071-.842-1.939-1.881-1.939H135.2c-1.039 0-1.881.868-1.881 1.939v2.763c0 1.071-.842 1.939-1.881 1.939h-2.677c-1.039 0-1.881.868-1.881 1.939v6.051c0 1.071.845 1.895 1.885 1.895h3.479c1.039 0 1.881-.868 1.881-1.939l-.004-5.184v-.001zm7.164 3.355h3.342c1.089 0 1.973.911 1.973 2.033v3.445c0 1.123-.884 2.033-1.973 2.033h-3.342c-1.089 0-1.973-.911-1.973-2.033v-3.445c0-1.123.884-2.033 1.973-2.033z"
        paintOrder="stroke"
      />
    </svg>
  );
}

export function GnosisSafe(props: IconProps) {
  return <GnosisSafeBase fill="#000" {...props} />;
}

export function GnosisSafeMono(props: IconProps) {
  return <GnosisSafeBase fill="currentColor" {...props} />;
}

export function GnosisSafe2(props: IconProps) {
  return <GnosisSafeBase2 fill="#000" {...props} />;
}

export function GnosisSafeMono2(props: IconProps) {
  return <GnosisSafeBase2 fill="currentColor" {...props} />;
}
