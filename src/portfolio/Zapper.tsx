import type { IconProps } from '../utils';

export function Zapper(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 500"
      width="1em"
      height="1em"
      {...props}
    >
      {props.title && <title>{props.title}</title>}
      <path
        d="M500 250C500 111.929 388.071 0 250 0S0 111.929 0 250s111.929 250 250 250 250-111.929 250-250z"
        fill="#784ffe"
      />
      <path
        d="M154.338 187.869L330.605 187l-42.201 63.6 99.596-.482-42.208 62.534-177.41 1.135 42.868-63.154-99.25-.038 42.338-62.726z"
        fill="#fff"
      />
    </svg>
  );
}

export function ZapperMono(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 500"
      width="1em"
      height="1em"
      fill="currentColor"
      {...props}
    >
      {props.title && <title>{props.title}</title>}
      <path
        d="M500 250C500 111.929 388.071 0 250 0S0 111.929 0 250s111.929 250 250 250 250-111.929 250-250z"
        mask="url(#zprm-a)"
      />
      <defs>
        <mask id="zprm-a">
          <rect width="100%" height="100%" fill="#fff" />
          <path
            d="M154.338 187.869L330.605 187l-42.201 63.6 99.596-.482-42.208 62.534-177.41 1.135 42.868-63.154-99.25-.038 42.338-62.726z"
            fill="#000"
          />
        </mask>
      </defs>
    </svg>
  );
}
