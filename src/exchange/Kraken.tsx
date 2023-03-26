import type { IconProps } from '../lib';

function KrakenBase(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-0.2 264.35 2500.2 1971.32"
      width="1em"
      height="1em"
      {...props}
    >
      {props.title && <title>{props.title}</title>}
      <path d="M1169.6 267.1c217.2-14.6 438.6 29.2 632.8 127.4 288.2 142 518 396.8 624.5 697.6 48 133.7 73.1 273.6 73.1 415.6v524.2c0 20.9 0 43.9-4.2 64.8-12.5 52.2-50.1 100.2-100.2 123.2-35.5 16.7-75.2 18.8-110.7 12.5-79.4-14.6-142-89.8-142-171.3v-488.7c2.1-45.9 2.1-96.1-23-135.8-39.7-75.2-139.9-110.7-217.2-79.4-66.8 23-114.9 91.9-117 162.9v495c0 31.3 2.1 62.7-8.4 91.9-16.7 58.5-64.7 104.4-123.2 121.1-77.3 20.9-165-12.5-202.6-83.5-27.2-41.8-25.1-94-23-142v-492.9c-2.1-83.5-71-158.7-152.5-169.2-54.3-8.4-110.7 10.4-150.4 48-35.5 33.4-54.3 81.4-54.3 129.5v478.3c0 39.7 4.2 81.4-10.4 119.1-23 68.9-91.9 119.1-165 117-75.2 4.2-148.3-48-171.3-117-12.5-35.5-10.4-71-10.4-108.6v-495c0-81.4-64.8-156.6-144.1-171.3-73.1-14.6-152.5 20.9-190.1 87.7-14.6 27.1-23 58.5-23 89.8v536.8c0 52.2-23 104.4-62.7 137.9-60.6 52.2-158.7 56.4-221.4 8.4-46-31.3-73.1-85.6-73.1-142v-543c0-204.7 52.2-409.4 150.4-591.1C229.7 776.7 340.4 645.1 472 540.7c194.3-162.9 442.8-259 697.6-273.6h0 0z" />
    </svg>
  );
}

export function Kraken(props: IconProps) {
  return <KrakenBase fill="#5741d9" {...props} />;
}
export function KrakenMono(props: IconProps) {
  return <KrakenBase fill="currentColor" {...props} />;
}
