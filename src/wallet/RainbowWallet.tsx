import type { IconProps } from '../utils';

interface Props extends IconProps {
  withBackground: boolean;
}

function RainbowWalletBase({ withBackground, ...props }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={withBackground ? '0 0 120 120' : '20 20 80 80'}
      width="1em"
      height="1em"
      {...props}
    >
      {props.title && <title>{props.title}</title>}
      {withBackground && <path fill="url(#rbw-a)" d="M0 0h120v120H0z" />}
      <path
        d="M20 38h6c30.928 0 56 25.072 56 56v6h12a6 6 0 0 0 6-6c0-40.869-33.131-74-74-74a6 6 0 0 0-6 6v12z"
        fill="url(#rbw-b)"
      />
      <path d="M84 94h16a6 6 0 0 1-6 6H84v-6z" fill="url(#rbw-c)" />
      <path d="M26 20v16h-6V26a6 6 0 0 1 6-6z" fill="url(#rbw-d)" />
      <path
        d="M20 36h6c32.033 0 58 25.968 58 58v6H66v-6c0-22.091-17.909-40-40-40h-6V36z"
        fill="url(#rbw-e)"
      />
      <path d="M68 94h16v6H68v-6z" fill="url(#rbw-f)" />
      <path d="M20 52V36h6v16h-6z" fill="url(#rbw-g)" />
      <path
        d="M20 62a6 6 0 0 0 6 6c14.359 0 26 11.641 26 26a6 6 0 0 0 6 6h10v-6c0-23.196-18.804-42-42-42h-6v10z"
        fill="url(#rbw-h)"
      />
      <path d="M52 94h16v6H58a6 6 0 0 1-6-6z" fill="url(#rbw-i)" />
      <path d="M26 68a6 6 0 0 1-6-6V52h6v16z" fill="url(#rbw-j)" />
      <defs>
        {withBackground && (
          <linearGradient
            id="rbw-a"
            x1="60"
            y1="0"
            x2="60"
            y2="120"
            xlinkHref="#rbw-k"
          >
            <stop stopColor="#174299" />
            <stop offset="1" stopColor="#001e59" />
          </linearGradient>
        )}
        <radialGradient
          id="rbw-b"
          cx="0"
          cy="0"
          r="1"
          gradientTransform="translate(26 94) rotate(-90) scale(74)"
          xlinkHref="#rbw-k"
        >
          <stop offset=".77" stopColor="#ff4000" />
          <stop offset="1" stopColor="#8754c9" />
        </radialGradient>
        <linearGradient
          id="rbw-c"
          x1="83"
          y1="97"
          x2="100"
          y2="97"
          xlinkHref="#rbw-k"
        >
          <stop stopColor="#ff4000" />
          <stop offset="1" stopColor="#8754c9" />
        </linearGradient>
        <linearGradient
          id="rbw-d"
          x1="23"
          y1="20"
          x2="23"
          y2="37"
          xlinkHref="#rbw-k"
        >
          <stop stopColor="#8754c9" />
          <stop offset="1" stopColor="#ff4000" />
        </linearGradient>
        <radialGradient
          id="rbw-e"
          cx="0"
          cy="0"
          r="1"
          gradientTransform="translate(26 94) rotate(-90) scale(58)"
          xlinkHref="#rbw-k"
        >
          <stop offset=".724" stopColor="#fff700" />
          <stop offset="1" stopColor="#ff9901" />
        </radialGradient>
        <linearGradient
          id="rbw-f"
          x1="68"
          y1="97"
          x2="84"
          y2="97"
          xlinkHref="#rbw-k"
        >
          <stop stopColor="#fff700" />
          <stop offset="1" stopColor="#ff9901" />
        </linearGradient>
        <linearGradient
          id="rbw-g"
          x1="23"
          y1="52"
          x2="23"
          y2="36"
          xlinkHref="#rbw-k"
        >
          <stop stopColor="#fff700" />
          <stop offset="1" stopColor="#ff9901" />
        </linearGradient>
        <radialGradient
          id="rbw-h"
          cx="0"
          cy="0"
          r="1"
          gradientTransform="translate(26 94) rotate(-90) scale(42)"
          xlinkHref="#rbw-k"
        >
          <stop offset=".595" stopColor="#0af" />
          <stop offset="1" stopColor="#01da40" />
        </radialGradient>
        <radialGradient
          id="rbw-i"
          cx="0"
          cy="0"
          r="1"
          gradientTransform="translate(51 97) scale(17 45.3333)"
          xlinkHref="#rbw-k"
        >
          <stop stopColor="#0af" />
          <stop offset="1" stopColor="#01da40" />
        </radialGradient>
        <radialGradient
          id="rbw-j"
          cx="0"
          cy="0"
          r="1"
          gradientTransform="translate(23 69) rotate(-90) scale(17 322.37)"
          xlinkHref="#rbw-k"
        >
          <stop stopColor="#0af" />
          <stop offset="1" stopColor="#01da40" />
        </radialGradient>
        <linearGradient id="rbw-k" gradientUnits="userSpaceOnUse" />
      </defs>
    </svg>
  );
}

export function RainbowWallet(props: IconProps) {
  return <RainbowWalletBase withBackground={true} {...props} />;
}

export function RainbowWallet2(props: IconProps) {
  return <RainbowWalletBase withBackground={false} {...props} />;
}
