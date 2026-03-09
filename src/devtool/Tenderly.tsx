import { createIcon } from '../utils';

const TENDERLY_WING_RIGHT =
  'm15.152 6 5.235-2.917.004 5.665-4.055 2.259c-2.766 1.54-4.36 3.562-5.004 5.356-.644 1.794-.55 2.823-.57 3.271 0-2.856.01-3.71.01-6.115 0-.592.068-1.244.148-1.556 0 0 .688-3.99 4.232-5.964Z';
const TENDERLY_WING_LEFT =
  'm10.76 13.643.003 5.992-4.953-2.751-.002-4.642c-.001-3.166-.992-5.541-2.247-6.977C2.307 3.83 1.362 3.397.981 3.161c2.47 1.326 3.125 1.684 5.232 2.816.522.28 1.202.814 1.436 1.036 0 0 3.11 2.573 3.11 6.63Z';
const TENDERLY_BAR =
  'M15.144 6c2.113-1.161 3.647-2.032 5.242-2.916-.401.203-1.259.793-3.15 1.115a10.505 10.505 0 0 1-7.293-1.405L5.925.365.98 3.161l5.406 2.902c1.347.808 4.709 2.161 8.758-.063Z';

export const Tenderly = createIcon('Tenderly', '0 0 21 20', () => (
  <>
    <path d={TENDERLY_WING_RIGHT} fill="#9573F5" />
    <path d={TENDERLY_WING_LEFT} fill="#6837F1" />
    <path d={TENDERLY_BAR} fill="#D2C3FB" />
  </>
));

export const TenderlyMono = createIcon(
  'TenderlyMono',
  '0 0 21 20',
  () => (
    <>
      <path d={TENDERLY_WING_RIGHT} opacity="0.75" />
      <path d={TENDERLY_WING_LEFT} />
      <path d={TENDERLY_BAR} opacity="0.5" />
    </>
  ),
  'currentColor',
);
