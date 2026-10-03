import { createIcon } from '../utils';

// Source: https://drpc.org (official brand)
// dRPC brand mark — three-dimensional diamond cluster
// Three shades: bright (#49FF87), mid (#41E278), dark (#33B05D)
/** Drpc node icon (colored). */
export const Drpc = /* @__PURE__ */ createIcon(
  'Drpc',
  '0 1 38.14 44',
  () => (
    <>
      <path
        fill="#49FF87"
        d="m.029 34.004 6.348-3.668 6.348 3.668-6.348 3.668z"
      />
      <path fill="#33B05D" d="m6.377 8.365 6.349 3.632v22.008l-6.349-3.668z" />
      <path fill="#41E278" d="M6.377 8.365.029 11.997v22.008l6.348-3.668z" />
      <path fill="#49FF87" d="m19.073 1 .003 7.332-6.351 3.664-.002-7.332z" />
      <path fill="#41E278" d="m38.105 19.318.028-7.314L19.074 1l.002 7.332z" />
      <path
        fill="#33B05D"
        d="M38.104 19.319 31.784 23l-19.06-11.004.001-.001 6.35-3.662z"
      />
      <path fill="#49FF87" d="m31.785 23-.002 7.333 6.35 3.663.003-7.331z" />
      <path
        fill="#33B05D"
        d="M12.754 41.319 19.074 45l19.059-11.004-6.35-3.664z"
      />
      <path
        fill="#41E278"
        d="m12.755 41.319-.029-7.314L31.785 23l-.003 7.331z"
      />
    </>
  ),
  {},
);

/** Drpc node icon (monochrome). */
export const DrpcMono = /* @__PURE__ */ createIcon(
  'DrpcMono',
  '0 1 38.14 44',
  () => (
    <>
      <path d="m.029 34.004 6.348-3.668 6.348 3.668-6.348 3.668z" />
      <path d="m6.377 8.365 6.349 3.632v22.008l-6.349-3.668z" opacity=".45" />
      <path d="M6.377 8.365.029 11.997v22.008l6.348-3.668z" opacity=".7" />
      <path d="m19.073 1 .003 7.332-6.351 3.664-.002-7.332z" />
      <path d="m38.105 19.318.028-7.314L19.074 1l.002 7.332z" opacity=".7" />
      <path
        d="M38.104 19.319 31.784 23l-19.06-11.004.001-.001 6.35-3.662z"
        opacity=".45"
      />
      <path d="m31.785 23-.002 7.333 6.35 3.663.003-7.331z" />
      <path
        d="M12.754 41.319 19.074 45l19.059-11.004-6.35-3.664z"
        opacity=".45"
      />
      <path d="m12.755 41.319-.029-7.314L31.785 23l-.003 7.331z" opacity=".7" />
    </>
  ),
  { fill: 'currentColor' },
);
