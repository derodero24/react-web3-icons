import type { IconProps } from '../lib';

function ImmutableXBase(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="59.57 116.38 280 280"
      width="1em"
      height="1em"
      {...props}
    >
      {props.title && <title>{props.title}</title>}
      <path
        d="M90 45c0 24.851-20.149 45-45 45S0 69.851 0 45 20.149 0 45 0c24.857 0 45 20.149 45 45z"
        fill="#2081e2"
      />
      <path d="M199.571 116.377c-77.32 0-140 62.68-140 140s62.68 140 140 140 140-62.68 140-140-62.68-140-140-140zm11.47 99.43l5.44-6.35 18.87-22h17.07l-36.1 42.03-5.39-6.35c-1.79-2.13-1.74-5.31.11-7.33zm-45.35-28.35s30.23 36.18 41.17 47.4c1.74 1.75 1.43 4.05-.16 5.91l-5.97 6.95-52.01-60.26h16.97 0zm24.58 108.59l-5.44 6.35-18.87 22h-17.07l36.1-42.03 5.39 6.35c1.79 2.13 1.74 5.3-.11 7.33zm.69-36.95l-56.02 65.3h-18.34l56.24-65.13c1.8-2.08 1.8-5.2 0-7.22l-55.81-64.58h17.65l56.13 65.13c1.42 1.9 1.68 4.69.15 6.5zm44.39 65.3l-38.11-44.44-1.9-2.41c-1.8-2.08-1.74-5.31.11-7.34l71.03-82.75h17.6l-71.46 81.66c-1.85 2.03-1.9 5.25-.11 7.33l41.22 47.95h-18.38zm32.46 0l-41.02-47.89c-1.16-1.37-1.59-3.23-1.16-4.93.32-.93 1-1.97 1.64-2.68l4.76-5.25 52.48 60.75h-16.7 0z" />
    </svg>
  );
}

export function ImmutableX(props: IconProps) {
  return <ImmutableXBase {...props} />;
}

export function ImmutableXMono(props: IconProps) {
  return <ImmutableXBase fill="currentColor" {...props} />;
}
