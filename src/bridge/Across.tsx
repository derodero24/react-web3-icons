import { createIcon } from '../utils';

// Paths sourced from across.to — the circular logomark
// X-shaped crossing path (dark foreground)
const crossPath =
  'M6.95155 8.41964L8.51084 6.86035L14.7421 13.0917C14.364 13.2528 14.0097 13.4876 13.7012 13.7961C13.4623 14.035 13.2675 14.3014 13.117 14.5851L6.95155 8.41964ZM12.9996 17.4397L6.85938 23.5799L8.41866 25.1392L14.4964 19.0614C14.2104 18.9105 13.9419 18.7146 13.7012 18.474C13.3945 18.1673 13.1606 17.8154 12.9996 17.4397ZM17.5901 19.0582L23.5839 25.052L25.1432 23.4927L19.0835 17.433C18.9224 17.8112 18.6875 18.1655 18.379 18.474C18.1401 18.7129 17.8737 18.9076 17.5901 19.0582ZM18.9665 14.5913L25.051 8.50682L23.4917 6.94754L17.3448 13.0945C17.7204 13.2556 18.0724 13.4894 18.379 13.7961C18.6197 14.0368 18.8155 14.3053 18.9665 14.5913Z';

export const Across = createIcon(
  'Across',
  '0 0 32 32',
  () => (
    <>
      <rect width="32" height="32" rx="16" fill="#6CF9D8" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d={crossPath}
        fill="#2D2E33"
      />
    </>
  ),
  'none',
);

export const AcrossMono = createIcon(
  'AcrossMono',
  '0 0 32 32',
  _id => (
    <>
      <rect width="32" height="32" rx="16" mask={`url(#${_id}-ac-m)`} />
      <defs>
        <mask id={`${_id}-ac-m`}>
          <rect width="32" height="32" fill="white" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d={crossPath}
            fill="black"
          />
        </mask>
      </defs>
    </>
  ),
  'currentColor',
);
