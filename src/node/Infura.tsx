import type { IconProps } from '../utils';

function InfuraBase(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="78.33 78.33 184.68 156.67"
      width="1em"
      height="1em"
      {...props}
    >
      {props.title && <title>{props.title}</title>}
      <path d="M83.715 78.333v23.839l56.951-5.866h21.022v38.589l-35.397 10.827-47.959 11.568 7.12 23.306 45.961-17.66 30.275-9.249v63.343h-21.022l-56.951-5.869V235h173.92v-23.839l-56.952 5.869H179.66v-63.343l30.126 9.202 46.114 17.707 7.117-23.306-47.829-11.534-35.528-10.861V96.306h21.023l56.952 5.866V78.333z" />
    </svg>
  );
}

export function Infura(props: IconProps) {
  return <InfuraBase fill="#ff6b4a" {...props} />;
}

export function InfuraMono(props: IconProps) {
  return <InfuraBase fill="currentColor" {...props} />;
}
