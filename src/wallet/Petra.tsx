import { createIcon } from '../utils';

// Petra "P" symbol — two white paths from the 3000×3000 source SVG
/** Petra wallet icon (colored). */
export const Petra = /* @__PURE__ */ createIcon(
  'Petra',
  '0 0 3000 3000',
  () => (
    <>
      <rect width="3000" height="3000" rx="580.27" fill="#FF5F5F" />
      <g fill="#fff">
        <path d="m1432.64 2612.11c-406.84 0-736.66-329.81-736.66-736.66V655.77l736.66-267.89v2224.22Z" />
        <path d="m1567.36 1697.09c406.84 0 736.66-329.81 736.66-736.66V655.77l-736.66-267.89v1309.2Z" />
      </g>
    </>
  ),
);

/** Petra wallet icon (monochrome). */
export const PetraMono = /* @__PURE__ */ createIcon(
  'PetraMono',
  '0 0 3000 3000',
  _id => (
    <>
      <defs>
        <mask id={`${_id}-petra-a`}>
          <rect width="3000" height="3000" rx="580.27" fill="#fff" />
          <g fill="#000">
            <path d="m1432.64 2612.11c-406.84 0-736.66-329.81-736.66-736.66V655.77l736.66-267.89v2224.22Z" />
            <path d="m1567.36 1697.09c406.84 0 736.66-329.81 736.66-736.66V655.77l-736.66-267.89v1309.2Z" />
          </g>
        </mask>
      </defs>
      <rect
        width="3000"
        height="3000"
        rx="580.27"
        mask={`url(#${_id}-petra-a)`}
      />
    </>
  ),
  'currentColor',
);
