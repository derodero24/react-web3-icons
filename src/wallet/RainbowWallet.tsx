import { forwardRef, useId } from 'react';
import { createIcon, type IconProps } from '../utils';
import { useIconContext } from '../utils/IconContext';

interface RainbowWalletProps extends IconProps {
  withBackground?: boolean;
}

const RainbowWalletBase = forwardRef<
  SVGSVGElement,
  RainbowWalletProps & { withBackground: boolean }
>(function RainbowWalletBase({ withBackground, ...rawProps }, ref) {
  const {
    title,
    titleId,
    size = '1em',
    width,
    height,
    ...props
  } = useIconContext(rawProps);
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
            href={`#${_id}-rbw-k`}
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
          href={`#${_id}-rbw-k`}
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
          href={`#${_id}-rbw-k`}
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
          href={`#${_id}-rbw-k`}
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
          href={`#${_id}-rbw-k`}
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
          href={`#${_id}-rbw-k`}
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
          href={`#${_id}-rbw-k`}
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
          href={`#${_id}-rbw-k`}
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
          href={`#${_id}-rbw-k`}
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
          href={`#${_id}-rbw-k`}
        >
          <stop stopColor="#0af" />
          <stop offset="1" stopColor="#01da40" />
        </radialGradient>
        <linearGradient id={`${_id}-rbw-k`} gradientUnits="userSpaceOnUse" />
      </defs>
    </svg>
  );
});

export const RainbowWallet = forwardRef<SVGSVGElement, RainbowWalletProps>(
  function RainbowWallet({ withBackground = true, ...props }, ref) {
    return (
      <RainbowWalletBase withBackground={withBackground} {...props} ref={ref} />
    );
  },
);

export const RainbowWalletSymbol = forwardRef<
  SVGSVGElement,
  RainbowWalletProps
>(function RainbowWalletSymbol({ withBackground = false, ...props }, ref) {
  return (
    <RainbowWalletBase withBackground={withBackground} {...props} ref={ref} />
  );
});

const rainbowArcPaths = () => (
  <>
    <path d="M20 38h6c30.928 0 56 25.072 56 56v6h12a6 6 0 0 0 6-6c0-40.869-33.131-74-74-74a6 6 0 0 0-6 6v12z" />
    <path d="M84 94h16a6 6 0 0 1-6 6H84v-6z" />
    <path d="M26 20v16h-6V26a6 6 0 0 1 6-6z" />
    <path d="M20 36h6c32.033 0 58 25.968 58 58v6H66v-6c0-22.091-17.909-40-40-40h-6V36z" />
    <path d="M68 94h16v6H68v-6z" />
    <path d="M20 52V36h6v16h-6z" />
    <path d="M20 62a6 6 0 0 0 6 6c14.359 0 26 11.641 26 26a6 6 0 0 0 6 6h10v-6c0-23.196-18.804-42-42-42h-6v10z" />
    <path d="M52 94h16v6H58a6 6 0 0 1-6-6z" />
    <path d="M26 68a6 6 0 0 1-6-6V52h6v16z" />
  </>
);

// Arc paths from viewBox 20 20 80 80 → scale 0.575, translate(-2.5, -2.5)
const RBW_CIRCLE_TX = 'translate(-2.5 -2.5) scale(0.575)';

export const RainbowWalletCircle = createIcon(
  'RainbowWalletCircle',
  '0 0 64 64',
  _id => (
    <>
      <circle cx="32" cy="32" r="32" fill={`url(#${_id}-rbwc-bg)`} />
      <g transform={RBW_CIRCLE_TX}>
        <path
          d="M20 38h6c30.928 0 56 25.072 56 56v6h12a6 6 0 0 0 6-6c0-40.869-33.131-74-74-74a6 6 0 0 0-6 6v12z"
          fill={`url(#${_id}-rbwc-b)`}
        />
        <path d="M84 94h16a6 6 0 0 1-6 6H84v-6z" fill={`url(#${_id}-rbwc-c)`} />
        <path d="M26 20v16h-6V26a6 6 0 0 1 6-6z" fill={`url(#${_id}-rbwc-d)`} />
        <path
          d="M20 36h6c32.033 0 58 25.968 58 58v6H66v-6c0-22.091-17.909-40-40-40h-6V36z"
          fill={`url(#${_id}-rbwc-e)`}
        />
        <path d="M68 94h16v6H68v-6z" fill={`url(#${_id}-rbwc-f)`} />
        <path d="M20 52V36h6v16h-6z" fill={`url(#${_id}-rbwc-g)`} />
        <path
          d="M20 62a6 6 0 0 0 6 6c14.359 0 26 11.641 26 26a6 6 0 0 0 6 6h10v-6c0-23.196-18.804-42-42-42h-6v10z"
          fill={`url(#${_id}-rbwc-h)`}
        />
        <path d="M52 94h16v6H58a6 6 0 0 1-6-6z" fill={`url(#${_id}-rbwc-i)`} />
        <path d="M26 68a6 6 0 0 1-6-6V52h6v16z" fill={`url(#${_id}-rbwc-j)`} />
      </g>
      <defs>
        <linearGradient
          id={`${_id}-rbwc-bg`}
          x1="32"
          y1="0"
          x2="32"
          y2="64"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#174299" />
          <stop offset="1" stopColor="#001e59" />
        </linearGradient>
        <radialGradient
          id={`${_id}-rbwc-b`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="translate(26 94) rotate(-90) scale(74)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".77" stopColor="#ff4000" />
          <stop offset="1" stopColor="#8754c9" />
        </radialGradient>
        <linearGradient
          id={`${_id}-rbwc-c`}
          x1="83"
          y1="97"
          x2="100"
          y2="97"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#ff4000" />
          <stop offset="1" stopColor="#8754c9" />
        </linearGradient>
        <linearGradient
          id={`${_id}-rbwc-d`}
          x1="23"
          y1="20"
          x2="23"
          y2="37"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8754c9" />
          <stop offset="1" stopColor="#ff4000" />
        </linearGradient>
        <radialGradient
          id={`${_id}-rbwc-e`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="translate(26 94) rotate(-90) scale(58)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".724" stopColor="#fff700" />
          <stop offset="1" stopColor="#ff9901" />
        </radialGradient>
        <linearGradient
          id={`${_id}-rbwc-f`}
          x1="68"
          y1="97"
          x2="84"
          y2="97"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff700" />
          <stop offset="1" stopColor="#ff9901" />
        </linearGradient>
        <linearGradient
          id={`${_id}-rbwc-g`}
          x1="23"
          y1="52"
          x2="23"
          y2="36"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff700" />
          <stop offset="1" stopColor="#ff9901" />
        </linearGradient>
        <radialGradient
          id={`${_id}-rbwc-h`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="translate(26 94) rotate(-90) scale(42)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".595" stopColor="#0af" />
          <stop offset="1" stopColor="#01da40" />
        </radialGradient>
        <radialGradient
          id={`${_id}-rbwc-i`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="translate(51 97) scale(17 45.3333)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0af" />
          <stop offset="1" stopColor="#01da40" />
        </radialGradient>
        <radialGradient
          id={`${_id}-rbwc-j`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="translate(23 69) rotate(-90) scale(17 322.37)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0af" />
          <stop offset="1" stopColor="#01da40" />
        </radialGradient>
      </defs>
    </>
  ),
);

export const RainbowWalletCircleMono = createIcon(
  'RainbowWalletCircleMono',
  '0 0 64 64',
  _id => (
    <>
      <circle cx="32" cy="32" r="32" mask={`url(#${_id}-rbwcm-a)`} />
      <defs>
        <mask id={`${_id}-rbwcm-a`}>
          <rect width="100%" height="100%" fill="#fff" />
          <g transform={RBW_CIRCLE_TX} fill="#000">
            {rainbowArcPaths()}
          </g>
        </mask>
      </defs>
    </>
  ),
  'currentColor',
);

export const RainbowWalletSquare = createIcon(
  'RainbowWalletSquare',
  '0 0 64 64',
  _id => (
    <>
      <rect width="64" height="64" rx="12.8" fill={`url(#${_id}-rbwsq-bg)`} />
      <g transform={RBW_CIRCLE_TX}>
        <path
          d="M20 38h6c30.928 0 56 25.072 56 56v6h12a6 6 0 0 0 6-6c0-40.869-33.131-74-74-74a6 6 0 0 0-6 6v12z"
          fill={`url(#${_id}-rbwsq-b)`}
        />
        <path
          d="M84 94h16a6 6 0 0 1-6 6H84v-6z"
          fill={`url(#${_id}-rbwsq-c)`}
        />
        <path
          d="M26 20v16h-6V26a6 6 0 0 1 6-6z"
          fill={`url(#${_id}-rbwsq-d)`}
        />
        <path
          d="M20 36h6c32.033 0 58 25.968 58 58v6H66v-6c0-22.091-17.909-40-40-40h-6V36z"
          fill={`url(#${_id}-rbwsq-e)`}
        />
        <path d="M68 94h16v6H68v-6z" fill={`url(#${_id}-rbwsq-f)`} />
        <path d="M20 52V36h6v16h-6z" fill={`url(#${_id}-rbwsq-g)`} />
        <path
          d="M20 62a6 6 0 0 0 6 6c14.359 0 26 11.641 26 26a6 6 0 0 0 6 6h10v-6c0-23.196-18.804-42-42-42h-6v10z"
          fill={`url(#${_id}-rbwsq-h)`}
        />
        <path d="M52 94h16v6H58a6 6 0 0 1-6-6z" fill={`url(#${_id}-rbwsq-i)`} />
        <path d="M26 68a6 6 0 0 1-6-6V52h6v16z" fill={`url(#${_id}-rbwsq-j)`} />
      </g>
      <defs>
        <linearGradient
          id={`${_id}-rbwsq-bg`}
          x1="32"
          y1="0"
          x2="32"
          y2="64"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#174299" />
          <stop offset="1" stopColor="#001e59" />
        </linearGradient>
        <radialGradient
          id={`${_id}-rbwsq-b`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="translate(26 94) rotate(-90) scale(74)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".77" stopColor="#ff4000" />
          <stop offset="1" stopColor="#8754c9" />
        </radialGradient>
        <linearGradient
          id={`${_id}-rbwsq-c`}
          x1="83"
          y1="97"
          x2="100"
          y2="97"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#ff4000" />
          <stop offset="1" stopColor="#8754c9" />
        </linearGradient>
        <linearGradient
          id={`${_id}-rbwsq-d`}
          x1="23"
          y1="20"
          x2="23"
          y2="37"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8754c9" />
          <stop offset="1" stopColor="#ff4000" />
        </linearGradient>
        <radialGradient
          id={`${_id}-rbwsq-e`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="translate(26 94) rotate(-90) scale(58)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".724" stopColor="#fff700" />
          <stop offset="1" stopColor="#ff9901" />
        </radialGradient>
        <linearGradient
          id={`${_id}-rbwsq-f`}
          x1="68"
          y1="97"
          x2="84"
          y2="97"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff700" />
          <stop offset="1" stopColor="#ff9901" />
        </linearGradient>
        <linearGradient
          id={`${_id}-rbwsq-g`}
          x1="23"
          y1="52"
          x2="23"
          y2="36"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff700" />
          <stop offset="1" stopColor="#ff9901" />
        </linearGradient>
        <radialGradient
          id={`${_id}-rbwsq-h`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="translate(26 94) rotate(-90) scale(42)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".595" stopColor="#0af" />
          <stop offset="1" stopColor="#01da40" />
        </radialGradient>
        <radialGradient
          id={`${_id}-rbwsq-i`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="translate(51 97) scale(17 45.3333)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0af" />
          <stop offset="1" stopColor="#01da40" />
        </radialGradient>
        <radialGradient
          id={`${_id}-rbwsq-j`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="translate(23 69) rotate(-90) scale(17 322.37)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0af" />
          <stop offset="1" stopColor="#01da40" />
        </radialGradient>
      </defs>
    </>
  ),
);

export const RainbowWalletSquareMono = createIcon(
  'RainbowWalletSquareMono',
  '0 0 64 64',
  _id => (
    <>
      <rect width="64" height="64" rx="12.8" mask={`url(#${_id}-rbwsqm-a)`} />
      <defs>
        <mask id={`${_id}-rbwsqm-a`}>
          <rect width="100%" height="100%" fill="#fff" />
          <g transform={RBW_CIRCLE_TX} fill="#000">
            {rainbowArcPaths()}
          </g>
        </mask>
      </defs>
    </>
  ),
  'currentColor',
);

export const RainbowWalletMono = createIcon(
  'RainbowWalletMono',
  '0 0 120 120',
  _id => (
    <>
      <rect width="120" height="120" mask={`url(#${_id}-rbwm-a)`} />
      <defs>
        <mask id={`${_id}-rbwm-a`}>
          <rect width="120" height="120" fill="#fff" />
          <g fill="#000">{rainbowArcPaths()}</g>
        </mask>
      </defs>
    </>
  ),
  'currentColor',
);

export const RainbowWalletSymbolMono = createIcon(
  'RainbowWalletSymbolMono',
  '20 20 80 80',
  rainbowArcPaths,
  'currentColor',
);
