import { forwardRef, useId } from 'react';
import type { IconProps } from '../utils';

interface RainbowWalletProps extends IconProps {
  withBackground?: boolean;
}

export const RainbowWallet = forwardRef<SVGSVGElement, RainbowWalletProps>(
  function RainbowWallet(
    {
      withBackground = true,
      title,
      titleId,
      size = '1em',
      width,
      height,
      ...props
    },
    ref,
  ) {
    const _id = useId();
    const isDecorative = !(
      title ||
      props['aria-label'] ||
      props['aria-labelledby']
    );
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={withBackground ? '0 0 120 120' : '20 20 80 80'}
        width={width ?? size}
        height={height ?? size}
        aria-hidden={isDecorative || undefined}
        role={isDecorative ? undefined : 'img'}
        ref={ref}
        {...props}
      >
        {title && <title id={titleId}>{title}</title>}
        {withBackground && (
          <path fill={`url(#${_id}-rbw-a)`} d="M0 0h120v120H0z" />
        )}
        <path
          d="M20 38h6c30.928 0 56 25.072 56 56v6h12a6 6 0 0 0 6-6c0-40.869-33.131-74-74-74a6 6 0 0 0-6 6v12z"
          fill={`url(#${_id}-rbw-b)`}
        />
        <path d="M84 94h16a6 6 0 0 1-6 6H84v-6z" fill={`url(#${_id}-rbw-c)`} />
        <path d="M26 20v16h-6V26a6 6 0 0 1 6-6z" fill={`url(#${_id}-rbw-d)`} />
        <path
          d="M20 36h6c32.033 0 58 25.968 58 58v6H66v-6c0-22.091-17.909-40-40-40h-6V36z"
          fill={`url(#${_id}-rbw-e)`}
        />
        <path d="M68 94h16v6H68v-6z" fill={`url(#${_id}-rbw-f)`} />
        <path d="M20 52V36h6v16h-6z" fill={`url(#${_id}-rbw-g)`} />
        <path
          d="M20 62a6 6 0 0 0 6 6c14.359 0 26 11.641 26 26a6 6 0 0 0 6 6h10v-6c0-23.196-18.804-42-42-42h-6v10z"
          fill={`url(#${_id}-rbw-h)`}
        />
        <path d="M52 94h16v6H58a6 6 0 0 1-6-6z" fill={`url(#${_id}-rbw-i)`} />
        <path d="M26 68a6 6 0 0 1-6-6V52h6v16z" fill={`url(#${_id}-rbw-j)`} />
        <defs>
          {withBackground && (
            <linearGradient
              id={`${_id}-rbw-a`}
              x1="60"
              y1="0"
              x2="60"
              y2="120"
              xlinkHref={`#${_id}-rbw-k`}
            >
              <stop stopColor="#174299" />
              <stop offset="1" stopColor="#001e59" />
            </linearGradient>
          )}
          <radialGradient
            id={`${_id}-rbw-b`}
            cx="0"
            cy="0"
            r="1"
            gradientTransform="translate(26 94) rotate(-90) scale(74)"
            xlinkHref={`#${_id}-rbw-k`}
          >
            <stop offset=".77" stopColor="#ff4000" />
            <stop offset="1" stopColor="#8754c9" />
          </radialGradient>
          <linearGradient
            id={`${_id}-rbw-c`}
            x1="83"
            y1="97"
            x2="100"
            y2="97"
            xlinkHref={`#${_id}-rbw-k`}
          >
            <stop stopColor="#ff4000" />
            <stop offset="1" stopColor="#8754c9" />
          </linearGradient>
          <linearGradient
            id={`${_id}-rbw-d`}
            x1="23"
            y1="20"
            x2="23"
            y2="37"
            xlinkHref={`#${_id}-rbw-k`}
          >
            <stop stopColor="#8754c9" />
            <stop offset="1" stopColor="#ff4000" />
          </linearGradient>
          <radialGradient
            id={`${_id}-rbw-e`}
            cx="0"
            cy="0"
            r="1"
            gradientTransform="translate(26 94) rotate(-90) scale(58)"
            xlinkHref={`#${_id}-rbw-k`}
          >
            <stop offset=".724" stopColor="#fff700" />
            <stop offset="1" stopColor="#ff9901" />
          </radialGradient>
          <linearGradient
            id={`${_id}-rbw-f`}
            x1="68"
            y1="97"
            x2="84"
            y2="97"
            xlinkHref={`#${_id}-rbw-k`}
          >
            <stop stopColor="#fff700" />
            <stop offset="1" stopColor="#ff9901" />
          </linearGradient>
          <linearGradient
            id={`${_id}-rbw-g`}
            x1="23"
            y1="52"
            x2="23"
            y2="36"
            xlinkHref={`#${_id}-rbw-k`}
          >
            <stop stopColor="#fff700" />
            <stop offset="1" stopColor="#ff9901" />
          </linearGradient>
          <radialGradient
            id={`${_id}-rbw-h`}
            cx="0"
            cy="0"
            r="1"
            gradientTransform="translate(26 94) rotate(-90) scale(42)"
            xlinkHref={`#${_id}-rbw-k`}
          >
            <stop offset=".595" stopColor="#0af" />
            <stop offset="1" stopColor="#01da40" />
          </radialGradient>
          <radialGradient
            id={`${_id}-rbw-i`}
            cx="0"
            cy="0"
            r="1"
            gradientTransform="translate(51 97) scale(17 45.3333)"
            xlinkHref={`#${_id}-rbw-k`}
          >
            <stop stopColor="#0af" />
            <stop offset="1" stopColor="#01da40" />
          </radialGradient>
          <radialGradient
            id={`${_id}-rbw-j`}
            cx="0"
            cy="0"
            r="1"
            gradientTransform="translate(23 69) rotate(-90) scale(17 322.37)"
            xlinkHref={`#${_id}-rbw-k`}
          >
            <stop stopColor="#0af" />
            <stop offset="1" stopColor="#01da40" />
          </radialGradient>
          <linearGradient id={`${_id}-rbw-k`} gradientUnits="userSpaceOnUse" />
        </defs>
      </svg>
    );
  },
);

export const RainbowWallet2 = forwardRef<SVGSVGElement, RainbowWalletProps>(
  function RainbowWallet2(
    {
      withBackground = false,
      title,
      titleId,
      size = '1em',
      width,
      height,
      ...props
    },
    ref,
  ) {
    const _id = useId();
    const isDecorative = !(
      title ||
      props['aria-label'] ||
      props['aria-labelledby']
    );
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={withBackground ? '0 0 120 120' : '20 20 80 80'}
        width={width ?? size}
        height={height ?? size}
        aria-hidden={isDecorative || undefined}
        role={isDecorative ? undefined : 'img'}
        ref={ref}
        {...props}
      >
        {title && <title id={titleId}>{title}</title>}
        {withBackground && (
          <path fill={`url(#${_id}-rbw-a)`} d="M0 0h120v120H0z" />
        )}
        <path
          d="M20 38h6c30.928 0 56 25.072 56 56v6h12a6 6 0 0 0 6-6c0-40.869-33.131-74-74-74a6 6 0 0 0-6 6v12z"
          fill={`url(#${_id}-rbw-b)`}
        />
        <path d="M84 94h16a6 6 0 0 1-6 6H84v-6z" fill={`url(#${_id}-rbw-c)`} />
        <path d="M26 20v16h-6V26a6 6 0 0 1 6-6z" fill={`url(#${_id}-rbw-d)`} />
        <path
          d="M20 36h6c32.033 0 58 25.968 58 58v6H66v-6c0-22.091-17.909-40-40-40h-6V36z"
          fill={`url(#${_id}-rbw-e)`}
        />
        <path d="M68 94h16v6H68v-6z" fill={`url(#${_id}-rbw-f)`} />
        <path d="M20 52V36h6v16h-6z" fill={`url(#${_id}-rbw-g)`} />
        <path
          d="M20 62a6 6 0 0 0 6 6c14.359 0 26 11.641 26 26a6 6 0 0 0 6 6h10v-6c0-23.196-18.804-42-42-42h-6v10z"
          fill={`url(#${_id}-rbw-h)`}
        />
        <path d="M52 94h16v6H58a6 6 0 0 1-6-6z" fill={`url(#${_id}-rbw-i)`} />
        <path d="M26 68a6 6 0 0 1-6-6V52h6v16z" fill={`url(#${_id}-rbw-j)`} />
        <defs>
          {withBackground && (
            <linearGradient
              id={`${_id}-rbw-a`}
              x1="60"
              y1="0"
              x2="60"
              y2="120"
              xlinkHref={`#${_id}-rbw-k`}
            >
              <stop stopColor="#174299" />
              <stop offset="1" stopColor="#001e59" />
            </linearGradient>
          )}
          <radialGradient
            id={`${_id}-rbw-b`}
            cx="0"
            cy="0"
            r="1"
            gradientTransform="translate(26 94) rotate(-90) scale(74)"
            xlinkHref={`#${_id}-rbw-k`}
          >
            <stop offset=".77" stopColor="#ff4000" />
            <stop offset="1" stopColor="#8754c9" />
          </radialGradient>
          <linearGradient
            id={`${_id}-rbw-c`}
            x1="83"
            y1="97"
            x2="100"
            y2="97"
            xlinkHref={`#${_id}-rbw-k`}
          >
            <stop stopColor="#ff4000" />
            <stop offset="1" stopColor="#8754c9" />
          </linearGradient>
          <linearGradient
            id={`${_id}-rbw-d`}
            x1="23"
            y1="20"
            x2="23"
            y2="37"
            xlinkHref={`#${_id}-rbw-k`}
          >
            <stop stopColor="#8754c9" />
            <stop offset="1" stopColor="#ff4000" />
          </linearGradient>
          <radialGradient
            id={`${_id}-rbw-e`}
            cx="0"
            cy="0"
            r="1"
            gradientTransform="translate(26 94) rotate(-90) scale(58)"
            xlinkHref={`#${_id}-rbw-k`}
          >
            <stop offset=".724" stopColor="#fff700" />
            <stop offset="1" stopColor="#ff9901" />
          </radialGradient>
          <linearGradient
            id={`${_id}-rbw-f`}
            x1="68"
            y1="97"
            x2="84"
            y2="97"
            xlinkHref={`#${_id}-rbw-k`}
          >
            <stop stopColor="#fff700" />
            <stop offset="1" stopColor="#ff9901" />
          </linearGradient>
          <linearGradient
            id={`${_id}-rbw-g`}
            x1="23"
            y1="52"
            x2="23"
            y2="36"
            xlinkHref={`#${_id}-rbw-k`}
          >
            <stop stopColor="#fff700" />
            <stop offset="1" stopColor="#ff9901" />
          </linearGradient>
          <radialGradient
            id={`${_id}-rbw-h`}
            cx="0"
            cy="0"
            r="1"
            gradientTransform="translate(26 94) rotate(-90) scale(42)"
            xlinkHref={`#${_id}-rbw-k`}
          >
            <stop offset=".595" stopColor="#0af" />
            <stop offset="1" stopColor="#01da40" />
          </radialGradient>
          <radialGradient
            id={`${_id}-rbw-i`}
            cx="0"
            cy="0"
            r="1"
            gradientTransform="translate(51 97) scale(17 45.3333)"
            xlinkHref={`#${_id}-rbw-k`}
          >
            <stop stopColor="#0af" />
            <stop offset="1" stopColor="#01da40" />
          </radialGradient>
          <radialGradient
            id={`${_id}-rbw-j`}
            cx="0"
            cy="0"
            r="1"
            gradientTransform="translate(23 69) rotate(-90) scale(17 322.37)"
            xlinkHref={`#${_id}-rbw-k`}
          >
            <stop stopColor="#0af" />
            <stop offset="1" stopColor="#01da40" />
          </radialGradient>
          <linearGradient id={`${_id}-rbw-k`} gradientUnits="userSpaceOnUse" />
        </defs>
      </svg>
    );
  },
);
