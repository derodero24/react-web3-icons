import { createIcon } from '../utils';

// Paths sourced from @web3icons/react (MIT)
const pendleMonoContent = () => (
  <>
    <path d="M8.76 21a3.961 3.961 0 1 0 .001-7.922 3.961 3.961 0 0 0 0 7.922" />
    <path d="M8.326 4.007v10.017h.883V3.56q-.459.194-.883.446" />
  </>
);

export const Pendle = createIcon(
  'Pendle',
  '0 0 24 24',
  () => (
    <>
      <path
        fill="#fff"
        d="M19.2 10.2a7.2 7.2 0 1 1-14.4 0 7.2 7.2 0 0 1 14.4 0"
      />
      <path
        fill="#152E51"
        d="M8.76 21a3.961 3.961 0 1 0 .001-7.922 3.961 3.961 0 0 0 0 7.922"
      />
      <path
        fill="#152E51"
        d="M8.326 4.007v10.017h.883V3.56q-.459.194-.883.446"
      />
    </>
  ),
  'none',
);

export const PendleMono = createIcon(
  'PendleMono',
  '0 0 24 24',
  pendleMonoContent,
  'currentColor',
);
