import type { IconProps } from '../lib';

function AlgorandBase(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 113 113.4"
      width="1em"
      height="1em"
      {...props}
    >
      {props.title && <title>{props.title}</title>}
      <path d="M19.6 113.4L36 85l16.4-28.3 16.3-28.4 2.7-4.5 1.2 4.5 5 18.7-5.6 9.7L55.6 85l-16.3 28.4h19.6L75.3 85l8.5-14.7 4 14.7 7.6 28.4H113L105.4 85l-7.6-28.3-2-7.3L108 28.3H90.2l-.6-2.1L83.4 3l-.8-3H65.5l-.4.6-16 27.7-16.4 28.4L16.4 85 0 113.4h19.6z" />
    </svg>
  );
}

export function Algorand(props: IconProps) {
  return <AlgorandBase {...props} />;
}
export function AlgorandMono(props: IconProps) {
  return <AlgorandBase fill="currentColor" {...props} />;
}

export function Algorand2(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 2500 2500"
      width="1em"
      height="1em"
      {...props}
    >
      {props.title && <title>{props.title}</title>}
      <circle cx="1250" cy="1250" r="1250" />
      <path
        d="M2051.7 2052.5h-252l-162.6-607.1-350.5 607.1h-280.5l541.5-939.7-86.5-326.7-732.4 1266.4H448.3l927.7-1605h244.7l108.8 398.3h253.6l-174.5 301.3z"
        fill="#fff"
      />
    </svg>
  );
}
