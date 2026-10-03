import { createIcon } from '../utils';

// Source: https://tally.xyz
/** Tally devtool icon (colored). */
export const Tally = /* @__PURE__ */ createIcon(
  'Tally',
  '308.07 194 25 34.28',
  () => (
    <>
      <path
        fill="#2a21a3"
        d="M333.069 204.706v7.681l-6.064-3.43v15.828l-6.81-3.854v-15.825l-6.064-3.43v-7.681z"
      />
      <path
        fill="#725bff"
        d="M330.037 206.452v7.681l-6.06-3.43v15.828l-6.813-3.854v-15.825l-6.061-3.43v-7.681z"
      />
      <path
        fill="#00e6cd"
        d="M327.005 208.199v7.681l-6.06-3.43v15.828l-6.81-3.854v-15.825l-6.064-3.43v-7.681z"
      />
    </>
  ),
  {},
);

/** Tally devtool icon (monochrome). */
export const TallyMono = /* @__PURE__ */ createIcon(
  'TallyMono',
  '308.07 194 25 34.28',
  (_props, _id) => (
    <>
      <g mask={`url(#${_id}-tlym-a)`}>
        <path d="M333.069 204.706v7.681l-6.064-3.43v15.828l-6.81-3.854v-15.825l-6.064-3.43v-7.681z" />
        <path d="M330.037 206.452v7.681l-6.06-3.43v15.828l-6.813-3.854v-15.825l-6.061-3.43v-7.681z" />
        <path d="M327.005 208.199v7.681l-6.06-3.43v15.828l-6.81-3.854v-15.825l-6.064-3.43v-7.681z" />
      </g>
      <defs>
        <mask id={`${_id}-tlym-a`}>
          <rect width="100%" height="100%" fill="#fff" />
          <g fill="#fff" stroke="#000" strokeWidth=".5">
            <path d="M333.069 204.706v7.681l-6.064-3.43v15.828l-6.81-3.854v-15.825l-6.064-3.43v-7.681z" />
            <path d="M330.037 206.452v7.681l-6.06-3.43v15.828l-6.813-3.854v-15.825l-6.061-3.43v-7.681z" />
            <path d="M327.005 208.199v7.681l-6.06-3.43v15.828l-6.81-3.854v-15.825l-6.064-3.43v-7.681z" />
          </g>
        </mask>
      </defs>
    </>
  ),
  { fill: 'currentColor', ids: true },
);
