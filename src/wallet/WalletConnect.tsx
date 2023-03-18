import type { IconProps } from '../lib';

function WalletConnectBase(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="45.52 99.74 387.64 237.59"
      width="1em"
      height="1em"
      {...props}
    >
      {props.title && <title>{props.title}</title>}
      <path d="M124.874 146.163c63.216-61.894 165.709-61.894 228.926 0l7.608 7.449c3.161 3.094 3.161 8.112 0 11.207L335.382 190.3a4.11 4.11 0 0 1-5.723 0l-10.47-10.251c-44.101-43.178-115.604-43.178-159.705 0l-11.212 10.978a4.11 4.11 0 0 1-5.723 0l-26.026-25.482c-3.161-3.094-3.161-8.112 0-11.206l8.351-8.176zm282.75 52.698l23.163 22.679c3.161 3.094 3.161 8.112 0 11.207L326.343 335.008a8.22 8.22 0 0 1-11.447 0l-74.128-72.578c-.79-.773-2.072-.773-2.862 0l-74.127 72.578a8.22 8.22 0 0 1-11.446 0L47.886 232.745c-3.161-3.094-3.161-8.112 0-11.207l23.163-22.678a8.22 8.22 0 0 1 11.446 0l74.129 72.579c.791.773 2.072.773 2.862 0l74.126-72.579a8.22 8.22 0 0 1 11.446 0l74.13 72.579c.79.773 2.071.773 2.861 0l74.129-72.578a8.22 8.22 0 0 1 11.446 0z" />
    </svg>
  );
}

export function WalletConnect(props: IconProps) {
  return <WalletConnectBase fill="#3b99fc" {...props} />;
}

export function WalletConnectMono(props: IconProps) {
  return <WalletConnectBase fill="currentColor" {...props} />;
}
