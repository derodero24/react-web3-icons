import { createIcon } from '../utils';

// Paths sourced from app.eigenlayer.xyz/logo/markLightA.svg
const markPath =
  'M150 300L150 0L0 0L0 300V600H150H225H300H375H450V450H375H300V300H375H450V150H525V0L450 0V150H375V0H303L300 0H228V75H300V300H225V450H150L150 300Z';

export const EigenLayer = createIcon(
  'EigenLayer',
  '0 0 525 600',
  () => (
    <path fillRule="evenodd" clipRule="evenodd" d={markPath} fill="#1A0C6D" />
  ),
  'none',
);

export const EigenLayerMono = createIcon(
  'EigenLayerMono',
  '0 0 525 600',
  () => <path fillRule="evenodd" clipRule="evenodd" d={markPath} />,
  'currentColor',
);
