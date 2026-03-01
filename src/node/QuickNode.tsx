import { createIcon } from '../utils';

const quickNodeContent = (_id: string) => (
  <>
    <g clipPath={`url(#${_id}-qn-a)`}>
      <path
        fillRule="evenodd"
        d="M20 32.5a12.46 12.46 0 0 0 8.728-3.551c.062-.06.161-.06.222.001l5.193 5.193 5.39 5.39c.117.117-.003.311-.16.259l-8.602-2.867c-.045-.015-.093-.009-.133.016C27.556 38.879 23.909 40 20 40 8.954 40 0 31.046 0 20S8.954 0 20 0s20 8.954 20 20c0 4.718-1.633 9.054-4.366 12.474-.058.072-.166.078-.231.012l-10.56-10.56c-.117-.117.003-.311.16-.259l6.711 2.237c.082.027.171-.017.197-.099A12.49 12.49 0 0 0 32.5 20c0-6.904-5.596-12.5-12.5-12.5S7.5 13.096 7.5 20 13.096 32.5 20 32.5z"
      />
    </g>
    <defs>
      <clipPath id={`${_id}-qn-a`}>
        <path d="M0 0h40v40H0z" />
      </clipPath>
    </defs>
  </>
);

export const QuickNode = createIcon(
  'QuickNode',
  '0 0 40 40',
  quickNodeContent,
  '#00a4d6',
);

export const QuickNodeMono = createIcon(
  'QuickNodeMono',
  '0 0 40 40',
  quickNodeContent,
  'currentColor',
);
