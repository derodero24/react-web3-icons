import { createIcon } from '../utils';

// Source: https://deribit.com (official brand)

const deribitContent = () => (
  <path
    fillRule="evenodd"
    d="M179.25 88c-.62-26.5-13.31-41.31-25.84-49.5a61.49 61.49 0 0 0-33.67-9.75h-3V0h-28.24v28.75H57.75V0h-28.25v28.75H0l.13 29.5h29.25v58.13H0v28.62h29.5v29.75h28.25V145h30.75v29.75h28.25V145h5a59.09 59.09 0 0 0 28.25-7c30-16.3 29.25-50 29.25-50zm-32.19 13.42a28 28 0 0 1-7.58 9.22 28.37 28.37 0 0 1-17.56 5.86H57.83V58.33l64.26-.16a30.73 30.73 0 0 1 8.91 1.22 26.43 26.43 0 0 1 15.78 12.77 31 31 0 0 1 .28 29.26z"
    clipRule="evenodd"
  />
);

export const Deribit = createIcon(
  'Deribit',
  '0 0 179.25 174.75',
  deribitContent,
  '#2DAE9A',
);

export const DeribitMono = createIcon(
  'DeribitMono',
  '0 0 179.25 174.75',
  deribitContent,
  'currentColor',
);
