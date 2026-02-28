import { createIcon } from '../utils';

export const Zapper = createIcon('Zapper', '0 0 500 500', () => (
  <>
    <path
      d="M500 250C500 111.929 388.071 0 250 0S0 111.929 0 250s111.929 250 250 250 250-111.929 250-250z"
      fill="#784ffe"
    />
    <path
      d="M154.338 187.869L330.605 187l-42.201 63.6 99.596-.482-42.208 62.534-177.41 1.135 42.868-63.154-99.25-.038 42.338-62.726z"
      fill="#fff"
    />
  </>
));

export const ZapperMono = createIcon(
  'ZapperMono',
  '0 0 500 500',
  _id => (
    <>
      <path
        d="M500 250C500 111.929 388.071 0 250 0S0 111.929 0 250s111.929 250 250 250 250-111.929 250-250z"
        mask={`url(#${_id}-zprm-a)`}
      />
      <defs>
        <mask id={`${_id}-zprm-a`}>
          <rect width="100%" height="100%" fill="#fff" />
          <path
            d="M154.338 187.869L330.605 187l-42.201 63.6 99.596-.482-42.208 62.534-177.41 1.135 42.868-63.154-99.25-.038 42.338-62.726z"
            fill="#000"
          />
        </mask>
      </defs>
    </>
  ),
  'currentColor',
);
