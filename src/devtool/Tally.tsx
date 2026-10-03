import { createIcon } from '../utils';

// Source: https://tally.xyz
/** Tally devtool icon (colored). */
export const Tally = /* @__PURE__ */ createIcon(
  'Tally',
  '0 0 64 64',
  () => (
    <>
      <path
        fill="#2a21a3"
        d="M52.419 21.49v12.547l-9.907-5.603v25.857l-11.124-6.296V22.143L21.48 16.54V3.992z"
      />
      <path
        fill="#725bff"
        d="M47.465 24.342V36.89l-9.9-5.604v25.857l-11.129-6.296V24.995l-9.901-5.603V6.844z"
      />
      <path
        fill="#00e6cd"
        d="M42.512 27.196v12.548l-9.9-5.604v25.857L21.489 53.7V27.849l-9.906-5.603V9.698z"
      />
    </>
  ),
  {},
);

/** Tally devtool icon (monochrome). */
export const TallyMono = /* @__PURE__ */ createIcon(
  'TallyMono',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="translate(-491.683 -312.918)scale(1.6336)">
      <g mask={`url(#${_id}-tlym-a)`}>
        <path d="M333.069 204.706v7.681l-6.064-3.43v15.828l-6.81-3.854v-15.825l-6.064-3.43v-7.681z" />
        <path d="M330.037 206.452v7.681l-6.06-3.43v15.828l-6.813-3.854v-15.825l-6.061-3.43v-7.681z" />
        <path d="M327.005 208.199v7.681l-6.06-3.43v15.828l-6.81-3.854v-15.825l-6.064-3.43v-7.681z" />
      </g>
      <defs>
        <mask id={`${_id}-tlym-a`}>
          <rect width="25" height="34.28" fill="#fff" />
          <g fill="#fff" stroke="#000" strokeWidth=".5">
            <path d="M333.069 204.706v7.681l-6.064-3.43v15.828l-6.81-3.854v-15.825l-6.064-3.43v-7.681z" />
            <path d="M330.037 206.452v7.681l-6.06-3.43v15.828l-6.813-3.854v-15.825l-6.061-3.43v-7.681z" />
            <path d="M327.005 208.199v7.681l-6.06-3.43v15.828l-6.81-3.854v-15.825l-6.064-3.43v-7.681z" />
          </g>
        </mask>
      </defs>
    </g>
  ),
  { fill: 'currentColor', ids: true },
);
