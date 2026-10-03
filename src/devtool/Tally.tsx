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
        d="M52.42 21.49v12.55l-9.9-5.6v25.85L31.38 48V22.14l-9.9-5.6V3.99z"
      />
      <path
        fill="#725bff"
        d="M47.47 24.34V36.9l-9.9-5.6v25.85l-11.13-6.3V25l-9.9-5.6V6.83z"
      />
      <path
        fill="#00e6cd"
        d="M42.51 27.2v12.54l-9.9-5.6V60L21.5 53.7V27.85l-9.9-5.6V9.7z"
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
    <g transform="translate(-491.68 -312.92)scale(1.6336)">
      <g mask={`url(#${_id}-tlym-a)`}>
        <path d="M333.07 204.7v7.69l-6.06-3.43v15.82l-6.81-3.85v-15.82l-6.07-3.43v-7.69z" />
        <path d="M330.04 206.45v7.68l-6.06-3.43v15.83l-6.82-3.85v-15.83l-6.06-3.43v-7.68z" />
        <path d="M327 208.2v7.68l-6.06-3.43v15.83l-6.8-3.86V208.6l-6.07-3.43v-7.68z" />
      </g>
      <defs>
        <mask id={`${_id}-tlym-a`}>
          <rect width="25" height="34.28" fill="#fff" />
          <g fill="#fff" stroke="#000" strokeWidth=".5">
            <path d="M333.07 204.7v7.69l-6.06-3.43v15.82l-6.81-3.85v-15.82l-6.07-3.43v-7.69z" />
            <path d="M330.04 206.45v7.68l-6.06-3.43v15.83l-6.82-3.85v-15.83l-6.06-3.43v-7.68z" />
            <path d="M327 208.2v7.68l-6.06-3.43v15.83l-6.8-3.86V208.6l-6.07-3.43v-7.68z" />
          </g>
        </mask>
      </defs>
    </g>
  ),
  { fill: 'currentColor', ids: true },
);
