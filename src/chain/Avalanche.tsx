import type { IconProps } from '../lib';

interface Props extends IconProps {
  withBackground: boolean;
}

function AvalancheBase({ withBackground, ...props }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0.5 1 1502 1502"
      width="1em"
      height="1em"
      {...props}
    >
      {props.title && <title>{props.title}</title>}
      {withBackground && <path fill="#fff" d="M287 258h928v844H287z" />}
      <path
        fillRule="evenodd"
        d="M1502.5 752c0 414.77-336.23 751-751 751S.5 1166.77.5 752 336.734 1 751.5 1s751 336.234 751 751zm-963.812 298.86H392.94c-30.626 0-45.754 0-54.978-5.9-9.963-6.46-16.051-17.16-16.789-28.97-.554-10.88 7.011-24.168 22.139-50.735l359.87-634.32c15.313-26.936 23.061-40.404 32.839-45.385 10.516-5.35 23.062-5.35 33.578 0 9.778 4.981 17.527 18.449 32.839 45.385l73.982 129.144.377.659c16.539 28.897 24.926 43.551 28.588 58.931 4.058 16.789 4.058 34.5 0 51.289-3.69 15.497-11.992 30.257-28.781 59.591L687.573 964.702l-.489.856c-16.648 29.135-25.085 43.902-36.778 55.042a110.03 110.03 0 0 1-44.832 26.02c-15.313 4.24-32.47 4.24-66.786 4.24zm368.062 0h208.84c30.81 0 46.31 0 55.54-6.08 9.96-6.46 16.23-17.35 16.79-29.15.53-10.53-6.87-23.3-21.37-48.323l-1.51-2.601-104.61-178.956-1.19-2.015c-14.7-24.858-22.12-37.411-31.65-42.263-10.51-5.351-22.88-5.351-33.391 0-9.594 4.981-17.342 18.08-32.655 44.462L857.306 964.891l-.357.616c-15.259 26.34-22.885 39.503-22.335 50.303.738 11.81 6.826 22.69 16.788 29.15 9.041 5.9 24.538 5.9 55.348 5.9z"
      />
    </svg>
  );
}

export function Avalanche(props: IconProps) {
  return <AvalancheBase withBackground={true} fill="#e84142" {...props} />;
}

export function AvalancheMono(props: IconProps) {
  return (
    <AvalancheBase withBackground={false} fill="currentColor" {...props} />
  );
}
