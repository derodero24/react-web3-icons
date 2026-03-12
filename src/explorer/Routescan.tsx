import { createIcon } from '../utils';

// Routescan uses a 6-facet isometric cube logo
const RS_TOP_LEFT = 'M20.9455 0L0.0026505 11.9984L20.9455 24V0Z';
const RS_TOP_RIGHT = 'M41.8883 11.9984L20.9455 0V24L41.8883 11.9984Z';
const RS_MID_LEFT =
  'M0.0026505 11.9984L0 12V36L0.00261818 36.0016L20.9455 24L0.0026505 11.9984Z';
const RS_MID_RIGHT =
  'M20.9455 24L41.8883 36.0016L41.8909 36V12L41.8883 11.9984L20.9455 24Z';
const RS_BOT_RIGHT = 'M20.9455 48L41.8883 36.0016L20.9455 24L20.9455 48Z';
const RS_BOT_LEFT =
  'M0.00261818 36.0016L20.9455 48L20.9455 24L0.00261818 36.0016Z';

/** Routescan explorer icon (colored). */
export const Routescan = createIcon('Routescan', '0 0 42 48', () => (
  <>
    <path d={RS_TOP_LEFT} fill="#00FF7F" />
    <path d={RS_TOP_RIGHT} fill="#FBEC0D" />
    <path d={RS_MID_LEFT} fill="#4A9DFF" />
    <path d={RS_MID_RIGHT} fill="#FFB100" />
    <path d={RS_BOT_RIGHT} fill="#FF4500" />
    <path d={RS_BOT_LEFT} fill="#A46BFF" />
  </>
));

/** Routescan explorer icon (monochrome). */
export const RoutescanMono = createIcon(
  'RoutescanMono',
  '0 0 42 48',
  () => (
    <>
      <path d={RS_TOP_LEFT} opacity="0.9" />
      <path d={RS_TOP_RIGHT} />
      <path d={RS_MID_LEFT} opacity="0.5" />
      <path d={RS_MID_RIGHT} opacity="0.75" />
      <path d={RS_BOT_RIGHT} opacity="0.65" />
      <path d={RS_BOT_LEFT} opacity="0.45" />
    </>
  ),
  'currentColor',
);
