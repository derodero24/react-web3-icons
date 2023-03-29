import type { IconProps } from '../lib';

function BusdBase(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0.2 0.21 336 337"
      width="1em"
      height="1em"
      {...props}
    >
      {props.title && <title>{props.title}</title>}
      <path d="M168.2.71l41.5 42.5-104.5 104.5-41.5-41.5zm63 63l41.5 42.5-167.5 167.5-41.5-41.5zm-189 63l41.5 42.5-41.5 41.5-41.5-41.5zm252 0l41.5 42.5-167.5 167.5-41.5-41.5z" />
    </svg>
  );
}

export function Busd(props: IconProps) {
  return <BusdBase fill="#f0b90b" {...props} />;
}

export function BusdMono(props: IconProps) {
  return <BusdBase fill="currentColor" {...props} />;
}
