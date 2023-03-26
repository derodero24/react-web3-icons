import type { IconProps } from '../lib';

export function CoinbaseWallet(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 2500 2500"
      width="1em"
      height="1em"
      {...props}
    >
      {props.title && <title>{props.title}</title>}
      <path
        d="M520.7 0h1458.5C2266.9 0 2500 250.8 2500 560.2v1379.6c0 309.4-233.1 560.2-520.7 560.2H520.7C233.1 2500 0 2249.2 0 1939.8V560.2C0 250.8 233.1 0 520.7 0z"
        fill="#0052ff"
      />
      <path
        d="M1250 362.1h0c490.4 0 887.9 397.5 887.9 887.9h0c0 490.4-397.5 887.9-887.9 887.9h0c-490.4 0-887.9-397.5-887.9-887.9h0c0-490.4 397.5-887.9 887.9-887.9z"
        fill="#fff"
      />
      <path
        d="M1031.3 966.2h437.3c36 0 65.1 31.4 65.1 70v427.5c0 38.7-29.2 70-65.1 70h-437.3c-36 0-65.1-31.4-65.1-70v-427.5c0-38.6 29.2-70 65.1-70z"
        fill="#0052ff"
      />
    </svg>
  );
}

export function CoinbaseWalletMono(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 2500 2500"
      width="1em"
      height="1em"
      fill="currentColor"
      {...props}
    >
      {props.title && <title>{props.title}</title>}

      <defs>
        <mask id="cbwm-a">
          <rect width="100%" height="100%" fill="#fff" />
          <path
            d="M1250 362.1h0c490.4 0 887.9 397.5 887.9 887.9h0c0 490.4-397.5 887.9-887.9 887.9h0c-490.4 0-887.9-397.5-887.9-887.9h0c0-490.4 397.5-887.9 887.9-887.9z"
            fill="#000"
          />
        </mask>
      </defs>
      <path
        d="M520.7 0h1458.5C2266.9 0 2500 250.8 2500 560.2v1379.6c0 309.4-233.1 560.2-520.7 560.2H520.7C233.1 2500 0 2249.2 0 1939.8V560.2C0 250.8 233.1 0 520.7 0z"
        mask="url(#cbwm-a)"
      />
      <path d="M1031.3 966.2h437.3c36 0 65.1 31.4 65.1 70v427.5c0 38.7-29.2 70-65.1 70h-437.3c-36 0-65.1-31.4-65.1-70v-427.5c0-38.6 29.2-70 65.1-70z" />
    </svg>
  );
}
