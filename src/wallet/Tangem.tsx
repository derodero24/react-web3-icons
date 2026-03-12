import { createIcon } from '../utils';

const tangemContent = () => (
  <>
    <path d="M59.285 24.464H38.715c-3.246 0-4.867 0-6.108.631a5.8 5.8 0 0 0-2.531 2.531c-.632 1.241-.632 2.862-.632 6.108v3.441h39.111v-3.441c0-3.246 0-4.867-.631-6.108a5.8 5.8 0 0 0-2.531-2.531c-1.241-.631-2.862-.631-6.108-.631z" />
    <path d="M55.516 47.93h13.038v16.152c0 3.246 0 4.867-.631 6.108a5.8 5.8 0 0 1-2.531 2.531c-1.241.632-2.862.632-6.108.632h-3.764z" />
    <path d="M29.444 47.93h13.035v25.423h-3.764c-3.246 0-4.867 0-6.108-.632a5.8 5.8 0 0 1-2.531-2.531c-.632-1.241-.632-2.862-.632-6.108z" />
  </>
);

/** Tangem wallet icon (colored). */
export const Tangem = createIcon(
  'Tangem',
  '0 0 98 98',
  tangemContent,
  '#1E1E1E',
);

/** Tangem wallet icon (monochrome). */
export const TangemMono = createIcon(
  'TangemMono',
  '0 0 98 98',
  tangemContent,
  'currentColor',
);
