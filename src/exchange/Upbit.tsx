import { createIcon } from '../utils';

// Source: https://upbit.com (official brand)

const UPBIT_CIRCLE = 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18';
const UPBIT_U =
  'M5.94 15.225a1.5 1.5 0 0 1-.426-.08.95.95 0 0 1-.431-.293 1 1 0 0 1-.16-.29 1 1 0 0 1-.049-.163 1.7 1.7 0 0 1 .041-.833l.038-.126 1.534-4.665h2.114l-1.557 4.738c-.085.26-.019.49.167.587q.091.05.195.047h1.045l1.765-5.372h2.39L10.854 10.6l.946-.252-1.606 4.877z';
const UPBIT_P =
  'm11.45 15.226 1.606-4.878.773.252-.552-1.826h4.778c.868 0 1.319.774 1.007 1.727l-.303.922-.013.036-.012.033q-.127.342-.343.635c-.455.619-1.147 1.02-1.764 1.023h-2.399l-.68 2.075zm3.132-3.153h1.273c.319 0 .67-.284.785-.634l.313-.952c.115-.35-.05-.634-.369-.634h-1.273z';

export const Upbit = createIcon('Upbit', '0 0 24 24', () => (
  <>
    <path fill="#093687" d={UPBIT_CIRCLE} />
    <path fill="#fff" d={UPBIT_U} />
    <path fill="#fff" d={UPBIT_P} />
  </>
));

export const UpbitMono = createIcon(
  'UpbitMono',
  '0 0 24 24',
  _id => (
    <>
      <path d={UPBIT_CIRCLE} mask={`url(#${_id}-a)`} />
      <defs>
        <mask id={`${_id}-a`}>
          <rect width="100%" height="100%" fill="#fff" />
          <path d={UPBIT_U} fill="#000" />
          <path d={UPBIT_P} fill="#000" />
        </mask>
      </defs>
    </>
  ),
  'currentColor',
);
