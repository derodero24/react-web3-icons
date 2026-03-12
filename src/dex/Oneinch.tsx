import { createIcon } from '../utils';

// Source: https://1inch.io
export const Oneinch = createIcon(
  'Oneinch',
  '0 0 40 40',
  () => (
    <>
      <rect width="40" height="40" rx="8" fill="#E82219" />
      <path
        d="M12.9957 30.3368H27.0039V27.3877H21.843V9.66367H18.7759C18.658 12.1409 17.9502 12.7602 14.5587 12.7602H12.9957V15.5913H18.1566V27.3877H12.9957V30.3368Z"
        fill="#FFFFFF"
      />
      <path
        d="M28.4786 15.5918V9.66413H25.5295V15.5918H28.4786Z"
        fill="#FFFFFF"
      />
      <path
        d="M33.665 15.5918V9.66413H30.7159V15.5918H33.665Z"
        fill="#FFFFFF"
      />
    </>
  ),
  'none',
);

export const OneinchMono = createIcon(
  'OneinchMono',
  '0 0 40 40',
  _id => (
    <>
      <rect width="40" height="40" rx="8" mask={`url(#${_id}-1i-m)`} />
      <defs>
        <mask id={`${_id}-1i-m`}>
          <rect width="40" height="40" fill="white" />
          <path
            d="M12.9957 30.3368H27.0039V27.3877H21.843V9.66367H18.7759C18.658 12.1409 17.9502 12.7602 14.5587 12.7602H12.9957V15.5913H18.1566V27.3877H12.9957V30.3368Z"
            fill="black"
          />
          <path
            d="M28.4786 15.5918V9.66413H25.5295V15.5918H28.4786Z"
            fill="black"
          />
          <path
            d="M33.665 15.5918V9.66413H30.7159V15.5918H33.665Z"
            fill="black"
          />
        </mask>
      </defs>
    </>
  ),
  'currentColor',
);
