import { createIcon } from '../utils';

// Petra "P" symbol — two white paths from the 3000×3000 source SVG
/** Petra wallet icon (colored). */
export const Petra = /* @__PURE__ */ createIcon(
  'Petra',
  '0 0 64 64',
  () => (
    <g transform="scale(.02133)">
      <rect width="3000" height="3000" fill="#FF5F5F" rx="580.27" />
      <g fill="#fff">
        <path d="M1432.64 2612.11c-406.84 0-736.66-329.81-736.66-736.66V655.77l736.66-267.89V2612.1Z" />
        <path d="M1567.36 1697.09c406.84 0 736.66-329.81 736.66-736.66V655.77l-736.66-267.89z" />
      </g>
    </g>
  ),
  {},
);

/** Petra wallet icon (monochrome). */
export const PetraMono = /* @__PURE__ */ createIcon(
  'PetraMono',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="scale(.02133)">
      <defs>
        <mask id={`${_id}-petra-a`}>
          <rect width="3000" height="3000" fill="#fff" rx="580.27" />
          <g fill="#000">
            <path d="M1432.64 2612.11c-406.84 0-736.66-329.81-736.66-736.66V655.77l736.66-267.89V2612.1Z" />
            <path d="M1567.36 1697.09c406.84 0 736.66-329.81 736.66-736.66V655.77l-736.66-267.89z" />
          </g>
        </mask>
      </defs>
      <rect
        width="3000"
        height="3000"
        mask={`url(#${_id}-petra-a)`}
        rx="580.27"
      />
    </g>
  ),
  { fill: 'currentColor', ids: true },
);
