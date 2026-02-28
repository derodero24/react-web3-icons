import { createIcon } from '../utils';

const busdContent = () => (
  <>
    <path d="M168.2.71l41.5 42.5-104.5 104.5-41.5-41.5zm63 63l41.5 42.5-167.5 167.5-41.5-41.5zm-189 63l41.5 42.5-41.5 41.5-41.5-41.5zm252 0l41.5 42.5-167.5 167.5-41.5-41.5z" />
  </>
);

export const Busd = createIcon(
  'Busd',
  '0.2 0.21 336 337',
  busdContent,
  '#f0b90b',
);

export const BusdMono = createIcon(
  'BusdMono',
  '0.2 0.21 336 337',
  busdContent,
  'currentColor',
);
