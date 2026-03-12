import { createIcon } from '../utils';

// Source: https://sushi.com
const fishBodyPath =
  'M29.642 18.15l-5.905 8.256c-.86 1.204-2.537 1.734-4.673 1.562-2.967-.258-6.909-1.834-10.679-4.543a29.824 29.824 0 01-3.474-2.886C2.914 18.6 1.446 16.581.66 14.781c-.86-1.978-.888-3.726-.028-4.93l5.92-8.257C7.41.39 9.072-.14 11.222.032c2.968.243 6.895 1.834 10.679 4.53 3.77 2.708 6.537 5.933 7.712 8.657.101.234.191.464.27.69.584 1.693.517 3.179-.242 4.24z';

// Inner detail/eye paths
const fishDetailPath =
  'M28.696 13.62c-1.132-2.594-3.784-5.647-7.396-8.228-3.598-2.58-7.339-4.113-10.162-4.343-1.72-.143-3.082.173-3.77 1.133l-.03.057c-.644.96-.5 2.322.173 3.87 1.132 2.61 3.784 5.662 7.382 8.242 3.598 2.58 7.339 4.114 10.162 4.344 1.692.128 3.025-.173 3.727-1.076l.044-.071c.688-.946.544-2.351-.13-3.928zm-5.289.058c-.315.444-.96.573-1.748.501-1.42-.114-3.283-.889-5.09-2.178-1.805-1.29-3.138-2.81-3.697-4.114-.316-.731-.401-1.376-.086-1.82.316-.445.96-.574 1.763-.517 1.404.13 3.282.889 5.074 2.18 1.806 1.289 3.14 2.823 3.698 4.127.33.731.416 1.376.086 1.82z';

export const SushiSwap = createIcon(
  'SushiSwap',
  '0 0 30 28',
  () => (
    <>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d={fishBodyPath}
        fill="#FA52A0"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d={fishDetailPath}
        fill="#FFFFFF"
      />
    </>
  ),
  'none',
);

export const SushiSwapMono = createIcon(
  'SushiSwapMono',
  '0 0 30 28',
  _id => (
    <>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d={fishBodyPath}
        mask={`url(#${_id}-sushi-m)`}
      />
      <defs>
        <mask id={`${_id}-sushi-m`}>
          <rect width="30" height="28" fill="white" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d={fishDetailPath}
            fill="black"
          />
        </mask>
      </defs>
    </>
  ),
  'currentColor',
);
