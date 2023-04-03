import type { IconProps } from '../lib';

function CoinpandaBase(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 1.1 39.95 37.81"
      width="1em"
      height="1em"
      {...props}
    >
      {props.title && <title>{props.title}</title>}
      <path d="M33.212 1.097c-3.636 0-6.608 2.896-6.731 6.502-4.155-1.822-8.864-1.821-13.016 0-.123-3.605-3.095-6.502-6.731-6.502C3.021 1.097 0 4.118 0 7.832c0 3.384 2.499 6.201 5.792 6.661-1.412 2.469-2.156 5.247-2.156 8.072a16.36 16.36 0 0 0 16.338 16.338 16.36 16.36 0 0 0 16.338-16.338c0-2.825-.744-5.603-2.156-8.072 3.294-.46 5.793-3.277 5.793-6.661a6.75 6.75 0 0 0-6.737-6.735zM6.734 11.298a3.47 3.47 0 0 1-3.465-3.465 3.47 3.47 0 0 1 3.465-3.466A3.47 3.47 0 0 1 10.2 7.833a3.47 3.47 0 0 1-3.466 3.465zm26.309 11.268c0 7.206-5.863 13.068-13.069 13.068S6.905 29.772 6.905 22.566 12.767 9.497 19.973 9.497a13.09 13.09 0 0 1 13.07 13.069zM29.747 7.833a3.47 3.47 0 0 1 3.466-3.466 3.47 3.47 0 0 1 3.466 3.466 3.47 3.47 0 0 1-3.466 3.465 3.47 3.47 0 0 1-3.466-3.465z" />
    </svg>
  );
}

export function Coinpanda(props: IconProps) {
  return <CoinpandaBase fill="#246aff" {...props} />;
}

export function CoinpandaMono(props: IconProps) {
  return <CoinpandaBase fill="currentColor" {...props} />;
}

interface PropsWithBackground extends IconProps {
  background: 'circle' | 'rect';
}

function CoinpandaBase2({ background, ...props }: PropsWithBackground) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 86 86"
      width="1em"
      height="1em"
      {...props}
    >
      {props.title && <title>{props.title}</title>}
      {background === 'circle' ? (
        <circle fill="#246aff" cx="43" cy="43" r="43" />
      ) : (
        <rect fill="#246aff" width="86" height="86" />
      )}
      <path
        fill="#fff"
        d="M59.22 19.84c-4.455 0-8.097 3.548-8.247 7.967a19.83 19.83 0 0 0-15.948 0c-.151-4.418-3.793-7.968-8.247-7.968-4.549 0-8.251 3.702-8.251 8.252a8.24 8.24 0 0 0 7.097 8.162c-1.73 3.025-2.642 6.429-2.642 9.891 0 11.039 8.98 20.019 20.019 20.019s20.019-8.98 20.019-20.019c0-3.461-.912-6.865-2.642-9.891a8.24 8.24 0 0 0 7.098-8.162 8.27 8.27 0 0 0-8.255-8.251h0zM26.775 32.338c-2.34 0-4.246-1.905-4.246-4.246s1.905-4.247 4.246-4.247 4.247 1.905 4.247 4.247a4.25 4.25 0 0 1-4.247 4.246zm32.236 13.807c0 8.829-7.184 16.012-16.013 16.012s-16.013-7.183-16.013-16.012 7.184-16.013 16.013-16.013 16.013 7.184 16.013 16.013zm-4.039-18.052c0-2.342 1.905-4.247 4.247-4.247s4.247 1.905 4.247 4.247a4.25 4.25 0 0 1-4.247 4.246 4.25 4.25 0 0 1-4.247-4.246z"
      />
    </svg>
  );
}

export function Coinpanda2(props: IconProps) {
  return <CoinpandaBase2 background="circle" {...props} />;
}

export function Coinpanda3(props: IconProps) {
  return <CoinpandaBase2 background="rect" {...props} />;
}

function CoinpandaMonoBase({ background, ...props }: PropsWithBackground) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 86 86"
      width="1em"
      height="1em"
      fill="currentColor"
      {...props}
    >
      {props.title && <title>{props.title}</title>}
      {background === 'circle' ? (
        <circle cx="43" cy="43" r="43" mask="url(#cpd-a)" />
      ) : (
        <rect width="86" height="86" mask="url(#cpd-a)" />
      )}
      <defs>
        <mask id="cpd-a">
          <rect width="100%" height="100%" fill="#fff" />
          <path
            d="M59.22 19.84c-4.455 0-8.097 3.548-8.247 7.967a19.83 19.83 0 0 0-15.948 0c-.151-4.418-3.793-7.968-8.247-7.968-4.549 0-8.251 3.702-8.251 8.252a8.24 8.24 0 0 0 7.097 8.162c-1.73 3.025-2.642 6.429-2.642 9.891 0 11.039 8.98 20.019 20.019 20.019s20.019-8.98 20.019-20.019c0-3.461-.912-6.865-2.642-9.891a8.24 8.24 0 0 0 7.098-8.162 8.27 8.27 0 0 0-8.255-8.251h0zM26.775 32.338c-2.34 0-4.246-1.905-4.246-4.246s1.905-4.247 4.246-4.247 4.247 1.905 4.247 4.247a4.25 4.25 0 0 1-4.247 4.246zm32.236 13.807c0 8.829-7.184 16.012-16.013 16.012s-16.013-7.183-16.013-16.012 7.184-16.013 16.013-16.013 16.013 7.184 16.013 16.013zm-4.039-18.052c0-2.342 1.905-4.247 4.247-4.247s4.247 1.905 4.247 4.247a4.25 4.25 0 0 1-4.247 4.246 4.25 4.25 0 0 1-4.247-4.246z"
            fill="#000"
          />
        </mask>
      </defs>
    </svg>
  );
}

export function CoinpandaMono2(props: IconProps) {
  return <CoinpandaMonoBase background="circle" {...props} />;
}

export function CoinpandaMono3(props: IconProps) {
  return <CoinpandaMonoBase background="rect" {...props} />;
}
