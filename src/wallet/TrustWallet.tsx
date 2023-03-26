import type { IconProps } from '../lib';

export function TrustWallet(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1024 1024"
      width="1em"
      height="1em"
      {...props}
    >
      {props.title && <title>{props.title}</title>}
      <path
        d="M0 260C0 116.406 116.406 0 260 0h504c143.594 0 260 116.406 260 260v504c0 143.594-116.406 260-260 260H260C116.406 1024 0 907.594 0 764V260z"
        fill="#fff"
      />
      <path
        d="M512.3 215c103.319 86.288 221.801 80.966 255.653 80.966C760.548 786.707 704.128 689.395 512.3 827 320.472 689.395 264.405 786.707 257 295.966c33.499 0 151.981 5.322 255.3-80.966z"
        stroke="#3375bb"
        strokeWidth="70"
        strokeMiterlimit="10"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function TrustWallet2(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width="1em"
      height="1em"
      {...props}
    >
      {props.title && <title>{props.title}</title>}
      <circle cx="32" cy="32" r="32" fill="#3375bb" />
      <path
        d="M32.627 14c6.324 5.282 13.576 4.956 15.648 4.956-.453 30.038-3.907 24.081-15.648 32.504C20.885 43.037 17.453 48.994 17 18.956c2.05 0 9.303.326 15.627-4.956z"
        stroke="#fff"
        strokeWidth="4"
        strokeMiterlimit="10"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function TrustWalletMono(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1024 1024"
      width="1em"
      height="1em"
      {...props}
    >
      {props.title && <title>{props.title}</title>}
      <defs>
        <mask id="trustwalletmono-a">
          <rect width="100%" height="100%" fill="white" />
          <path
            d="M512.3 215c103.319 86.288 221.801 80.966 255.653 80.966C760.548 786.707 704.128 689.395 512.3 827 320.472 689.395 264.405 786.707 257 295.966c33.499 0 151.981 5.322 255.3-80.966z"
            stroke="black"
            strokeWidth="70"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            fill="none"
          />
        </mask>
      </defs>
      <path
        d="M0 260C0 116.406 116.406 0 260 0h504c143.594 0 260 116.406 260 260v504c0 143.594-116.406 260-260 260H260C116.406 1024 0 907.594 0 764V260z"
        fill="currentColor"
        mask="url(#trustwalletmono-a)"
      />
    </svg>
  );
}

export function TrustWalletMono2(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width="1em"
      height="1em"
      {...props}
    >
      {props.title && <title>{props.title}</title>}
      <defs>
        <mask id="trustwalletmono2-a">
          <rect width="100%" height="100%" fill="white" />
          <path
            d="M32.627 14c6.324 5.282 13.576 4.956 15.648 4.956-.453 30.038-3.907 24.081-15.648 32.504C20.885 43.037 17.453 48.994 17 18.956c2.05 0 9.303.326 15.627-4.956z"
            stroke="black"
            strokeWidth="4"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            fill="none"
          />
        </mask>
      </defs>
      <circle
        cx="32"
        cy="32"
        r="32"
        fill="currentColor"
        mask="url(#trustwalletmono2-a)"
      />
    </svg>
  );
}
