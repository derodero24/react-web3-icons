import { createIcon } from '../utils';

// Source: https://tally.xyz
/** Tally devtool icon (colored). */
export const Tally = /* @__PURE__ */ createIcon(
  'Tally',
  '308.07 194 25 34.28',
  () => (
    <>
      <path
        d="M333.069 204.706v7.681l-6.064-3.43v15.828l-6.81-3.854v-15.825l-6.064-3.43v-7.681l18.938 10.711z"
        fill="#2a21a3"
      />
      <path
        d="M330.037 206.452v7.681l-6.06-3.43v15.828l-6.813-3.854v-15.825l-6.061-3.43v-7.681l18.934 10.711z"
        fill="#725bff"
      />
      <path
        d="M327.005 208.199v7.681l-6.06-3.43v15.828l-6.81-3.854v-15.825l-6.064-3.43v-7.681l18.934 10.711z"
        fill="#00e6cd"
      />
    </>
  ),
);

/** Tally devtool icon (monochrome). */
export const TallyMono = /* @__PURE__ */ createIcon(
  'TallyMono',
  '308.07 194 25 34.28',
  _id => (
    <>
      <mask id={`${_id}-a`}>
        <rect width="25" height="34.28" x="308.07" y="194" fill="#fff" />
        <path
          fill="#000"
          stroke="#000"
          strokeWidth=".8"
          d="M330.037 206.452v7.681l-6.06-3.43v15.828l-6.813-3.854v-15.825l-6.061-3.43v-7.681z"
        />
      </mask>
      <mask id={`${_id}-b`}>
        <rect width="25" height="34.28" x="308.07" y="194" fill="#fff" />
        <path
          fill="#000"
          stroke="#000"
          strokeWidth=".8"
          d="M327.005 208.199v7.681l-6.06-3.43v15.828l-6.81-3.854v-15.825l-6.064-3.43v-7.681z"
        />
      </mask>
      <path
        d="M333.069 204.706v7.681l-6.064-3.43v15.828l-6.81-3.854v-15.825l-6.064-3.43v-7.681z"
        mask={`url(#${_id}-a)`}
      />
      <path
        d="M330.037 206.452v7.681l-6.06-3.43v15.828l-6.813-3.854v-15.825l-6.061-3.43v-7.681z"
        mask={`url(#${_id}-b)`}
      />
      <path d="M327.005 208.199v7.681l-6.06-3.43v15.828l-6.81-3.854v-15.825l-6.064-3.43v-7.681z" />
    </>
  ),
  'currentColor',
);
