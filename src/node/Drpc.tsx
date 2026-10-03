import { createIcon } from '../utils';

// Source: https://drpc.org (official brand)
// dRPC brand mark — three-dimensional diamond cluster
// Three shades: bright (#49FF87), mid (#41E278), dark (#33B05D)
/** Drpc node icon (colored). */
export const Drpc = /* @__PURE__ */ createIcon(
  'Drpc',
  '0 0 64 64',
  () => (
    <>
      <path
        fill="#49FF87"
        d="m7.753 46.005 8.08-4.669 8.078 4.669-8.079 4.668z"
      />
      <path fill="#33B05D" d="m15.832 13.373 8.08 4.623v28.01l-8.08-4.668z" />
      <path fill="#41E278" d="m15.832 13.373-8.08 4.623v28.01l8.08-4.668z" />
      <path fill="#49FF87" d="m31.99 4 .004 9.331-8.083 4.664-.002-9.332z" />
      <path fill="#41E278" d="m56.213 27.313.036-9.308L31.992 4l.002 9.331z" />
      <path
        fill="#33B05D"
        d="M56.212 27.315 48.168 32 23.91 17.995l.001-.002 8.082-4.66z"
      />
      <path fill="#49FF87" d="m48.17 32-.003 9.332 8.082 4.662.003-9.33z" />
      <path
        fill="#33B05D"
        d="m23.948 55.315 8.044 4.684 24.257-14.005-8.082-4.663z"
      />
      <path fill="#41E278" d="m23.95 55.315-.037-9.31L48.169 32l-.003 9.33z" />
    </>
  ),
  {},
);

/** Drpc node icon (monochrome). */
export const DrpcMono = /* @__PURE__ */ createIcon(
  'DrpcMono',
  '0 0 64 64',
  () => (
    <>
      <path d="m7.753 46.005 8.08-4.669 8.078 4.669-8.079 4.668z" />
      <path d="m15.832 13.373 8.08 4.623v28.01l-8.08-4.668z" opacity=".45" />
      <path d="m15.832 13.373-8.08 4.623v28.01l8.08-4.668z" opacity=".7" />
      <path d="m31.99 4 .004 9.331-8.083 4.664-.002-9.332z" />
      <path d="m56.213 27.313.036-9.308L31.992 4l.002 9.331z" opacity=".7" />
      <path
        d="M56.212 27.315 48.168 32 23.91 17.995l.001-.002 8.082-4.66z"
        opacity=".45"
      />
      <path d="m48.17 32-.003 9.332 8.082 4.662.003-9.33z" />
      <path
        d="m23.948 55.315 8.044 4.684 24.257-14.005-8.082-4.663z"
        opacity=".45"
      />
      <path d="m23.95 55.315-.037-9.31L48.169 32l-.003 9.33z" opacity=".7" />
    </>
  ),
  { fill: 'currentColor' },
);
