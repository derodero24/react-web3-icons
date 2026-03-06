import { createIcon } from '../utils';

// Paths sourced from stargate.finance/static/logo-mobile-dark.svg
// Corner arc shapes (outer, gray in original)
const arcTopRight =
  'M18.58,1.73l.83,1.93c1.62,3.79,4.64,6.81,8.43,8.43l1.93.83c.51.22.92.52,1.23.9-.97-6.91-6.42-12.37-13.32-13.32.37.32.68.73.9,1.23Z';
const arcTopLeft =
  'M1.24,12.93l1.93-.83c3.79-1.62,6.81-4.64,8.44-8.43l.83-1.93c.22-.51.53-.92.9-1.23C6.42,1.46.97,6.92,0,13.82c.32-.37.73-.68,1.23-.9h0Z';
const arcBottomRight =
  'M29.77,19.07l-1.93.83c-3.79,1.62-6.81,4.64-8.43,8.44l-.83,1.93c-.22.51-.53.92-.9,1.23,6.9-.96,12.35-6.42,13.32-13.32-.32.37-.73.68-1.23.9h0Z';
const arcBottomLeft =
  'M12.43,30.26l-.83-1.93c-1.62-3.79-4.64-6.81-8.44-8.44l-1.93-.83c-.51-.22-.92-.52-1.23-.9.96,6.9,6.42,12.36,13.32,13.32-.37-.32-.68-.73-.9-1.23h.01Z';
// Center star shape (white in original)
const starCenter =
  'M8.48,14.48l.95-.41c1.87-.8,3.36-2.28,4.16-4.16l.41-.95c.57-1.33,2.46-1.33,3.03,0l.41.95c.8,1.87,2.28,3.36,4.16,4.16l.95.41c1.33.57,1.33,2.46,0,3.03l-.95.41c-1.87.8-3.36,2.28-4.16,4.16l-.41.95c-.57,1.33-2.46,1.33-3.03,0l-.41-.95c-.8-1.87-2.28-3.36-4.16-4.16l-.95-.41c-1.33-.57-1.33-2.46,0-3.03Z';

export const Stargate = createIcon(
  'Stargate',
  '0 0 31.01 32',
  () => (
    <>
      <path d={arcTopRight} fill="#999999" />
      <path d={arcTopLeft} fill="#999999" />
      <path d={arcBottomRight} fill="#999999" />
      <path d={arcBottomLeft} fill="#999999" />
      <path d={starCenter} fill="#FAFAFA" />
    </>
  ),
  'none',
);

export const StargateMono = createIcon(
  'StargateMono',
  '0 0 31.01 32',
  _id => (
    <>
      <path d={arcTopRight} mask={`url(#${_id}-sg-m)`} />
      <path d={arcTopLeft} mask={`url(#${_id}-sg-m)`} />
      <path d={arcBottomRight} mask={`url(#${_id}-sg-m)`} />
      <path d={arcBottomLeft} mask={`url(#${_id}-sg-m)`} />
      <defs>
        <mask id={`${_id}-sg-m`}>
          <rect width="31.01" height="32" fill="white" />
          <path d={starCenter} fill="black" />
        </mask>
      </defs>
    </>
  ),
  'currentColor',
);
