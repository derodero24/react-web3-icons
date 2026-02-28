import { forwardRef } from 'react';
import type { IconProps } from '../utils';
import { createIcon } from '../utils';

interface CoinbaseProps extends IconProps {
  fill1?: string;
  fill2?: string;
}

const CoinbaseBase = forwardRef<SVGSVGElement, CoinbaseProps>(
  function CoinbaseBase(
    { fill1, fill2, title, titleId, size = '1em', width, height, ...props },
    ref,
  ) {
    const isDecorative = !(
      title ||
      props['aria-label'] ||
      props['aria-labelledby']
    );
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 2500 2500"
        width={width ?? size}
        height={height ?? size}
        aria-hidden={isDecorative || undefined}
        role={isDecorative ? undefined : 'img'}
        ref={ref}
        {...props}
      >
        {title && <title id={titleId}>{title}</title>}
        <path
          d="M1250 0h0c690.2 0 1250 559.8 1250 1250h0c0 690.2-559.8 1250-1250 1250h0C559.8 2500 0 1940.2 0 1250h0C0 559.8 559.8 0 1250 0z"
          fill={fill1}
        />
        <path
          d="M1250.4 1689.5c-242.8 0-439.4-196.7-439.4-439.5s196.7-439.4 439.4-439.4c217.5 0 398.1 158.6 432.9 366.2H2126c-37.4-451.2-414.9-805.7-875.6-805.7-485.2 0-878.9 393.7-878.9 878.9s393.7 878.9 878.9 878.9c460.7 0 838.3-354.5 875.6-805.7h-443.1c-34.8 207.7-215 366.3-432.5 366.3h0z"
          fill={fill2}
        />
      </svg>
    );
  },
);

const coinbaseBase2Content = () => (
  <path d="M1250.4 1689.5c-242.8 0-439.4-196.7-439.4-439.5s196.7-439.4 439.4-439.4c217.5 0 398.1 158.6 432.9 366.2H2126c-37.4-451.2-414.9-805.7-875.6-805.7-485.2 0-878.9 393.7-878.9 878.9s393.7 878.9 878.9 878.9c460.7 0 838.3-354.5 875.6-805.7h-443.1c-34.8 207.7-215 366.3-432.5 366.3h0z" />
);

export const Coinbase = forwardRef<SVGSVGElement, IconProps>(
  function Coinbase(props, ref) {
    return <CoinbaseBase fill1="#fff" fill2="#0052ff" {...props} ref={ref} />;
  },
);

export const Coinbase2 = forwardRef<SVGSVGElement, IconProps>(
  function Coinbase2(props, ref) {
    return <CoinbaseBase fill1="#0052ff" fill2="#fff" {...props} ref={ref} />;
  },
);

export const Coinbase3 = createIcon(
  'Coinbase3',
  '371.5 371.1 1754.5 1757.8',
  coinbaseBase2Content,
  '#0052ff',
);

export const CoinbaseMono = createIcon(
  'CoinbaseMono',
  '0 0 2500 2500',
  _id => (
    <>
      <defs>
        <mask id={`${_id}-cbem-a`}>
          <rect width="100%" height="100%" fill="#fff" />
          <path
            d="M1250.4 1689.5c-242.8 0-439.4-196.7-439.4-439.5s196.7-439.4 439.4-439.4c217.5 0 398.1 158.6 432.9 366.2H2126c-37.4-451.2-414.9-805.7-875.6-805.7-485.2 0-878.9 393.7-878.9 878.9s393.7 878.9 878.9 878.9c460.7 0 838.3-354.5 875.6-805.7h-443.1c-34.8 207.7-215 366.3-432.5 366.3h0z"
            fill="#000"
          />
        </mask>
      </defs>
      <path
        d="M1250 0h0c690.2 0 1250 559.8 1250 1250h0c0 690.2-559.8 1250-1250 1250h0C559.8 2500 0 1940.2 0 1250h0C0 559.8 559.8 0 1250 0z"
        mask={`url(#${_id}-cbem-a)`}
      />
    </>
  ),
  'currentColor',
);

export const CoinbaseMono2 = createIcon(
  'CoinbaseMono2',
  '371.5 371.1 1754.5 1757.8',
  coinbaseBase2Content,
  'currentColor',
);
