import { createIcon } from '../utils';

// Source: https://datafdn.org/brand-guide (official DATA Foundation brand guide, brand kit 06252026)
// Source: https://assets.piplabs.xyz/datafdn.org/brand-kit/06252026/Symbol/sm/TDF_Symbol_Black.svg (the brand guide's Symbol; Symbol/sm/TDF_Symbol_White.svg is the same geometry in #F8F8F6)
// Source: https://assets.piplabs.xyz/datafdn.org/brand-kit/06252026/Token/sm/DATA/TDF_Token_DATA.svg (the brand guide's $DATA token badge)
// Formerly Story: https://www.datafdn.org/ says Story Network becomes DATA Network and $IP becomes $DATA, and https://www.datafdn.org/faqs says all $IP converts to $DATA at a 1:1 ratio. Chain ID 1514 is listed as Data Network on chainid.network (checked 2026-10-09). Story never shipped in this package, so story is an extra lookup key with no deprecated alias
// Default: the official Symbol TDF_Symbol_Black.svg (one path in #1A1A1A), path unchanged, placed on the 64 grid. The brand guide calls the Symbol the standalone mark for social icons, token badges and favicons. The brand colour stays the neutral #1A1A1A, as for Aptos and Hedera, because the guide reserves the #F6FF00 highlight for emphasis
// Mono: the same path in currentColor (TDF_Symbol_White.svg is this geometry in #F8F8F6)
// Square: the official $DATA token badge TDF_Token_DATA.svg (a full-bleed #1A1A1A square with the mark in #F8F8F6 at 60% of the side), paths unchanged, placed on the 64 grid. SquareMono: the square in currentColor with the badge's mark knocked out (one evenodd path; the mark is a single contour)
/** Data Network chain icon (colored). */
export const DataNetwork = /* @__PURE__ */ createIcon(
  'DataNetwork',
  '0 0 64 64',
  () => (
    <path
      fill="#1A1A1A"
      d="M12.18 29.6h-.49q-1.47 0-1.47 1.52v13.67q0 1.52 1.47 1.52h2.2q1.47 0 1.47-1.52V30.35q0-.76.73-.76h2.94q1.47 0 1.47-1.51V4.78q0-.76.73-.77h3.92q.73 0 .73.76v24.06q0 .76-.73.76h-3.18q-1.47 0-1.47 1.53v13.67c0 1.01.73 1.52 1.47 1.52h4.64q1.47 0 1.47-1.52V30.35q0-.76.73-.76h6.37q.73 0 .73.76V44.8c0 1 .74 1.5 1.47 1.5h4.65q1.47 0 1.47-1.5V31.1q0-1.52-1.47-1.52h-3.18q-.73 0-.73-.76V4.77q0-.75.73-.76h3.92q.72 0 .72.76v23.3q0 1.52 1.48 1.52h2.93q.73 0 .73.76V44.8q0 1.5 1.47 1.5h2.21q1.47 0 1.47-1.5V31.1q0-1.52-1.47-1.52h-.5q-.72 0-.72-.76V4.77q0-.75.73-.76h2.3q.73 0 .73.76v23.3q0 1.52 1.47 1.52h.24q.74 0 .74.76V44.8q0 1.5 1.47 1.5h.49q.72 0 .73.77v12.16q0 .76-.73.76h-2.3q-.74 0-.74-.76v-11.4c0-1-.48-1.52-1.22-1.52-.73 0-1.22.5-1.22 1.52v11.4q0 .76-.74.76h-3.67q-.73 0-.73-.76v-11.4q0-1.51-1.47-1.52h-2.2q-1.47 0-1.47 1.52v11.4q0 .76-.74.76h-6.11q-.73 0-.74-.76v-11.4q0-1.51-1.46-1.52h-4.9q-1.47 0-1.47 1.52v11.4q0 .76-.73.76h-6.12q-.74 0-.73-.76v-11.4q0-1.51-1.48-1.52h-2.2q-1.46 0-1.46 1.52v11.4q0 .76-.73.76h-3.68q-.73 0-.73-.76v-11.4c0-1-.49-1.52-1.22-1.52-.74 0-1.23.5-1.23 1.52v11.4q0 .76-.73.76h-2.3q-.73 0-.73-.76V47.07q0-.76.73-.76h.5q1.46 0 1.46-1.52V30.35q0-.76.73-.76h.25q1.47 0 1.47-1.51V4.78q0-.76.73-.77h2.3q.73 0 .73.76v24.06q0 .76-.73.76"
    />
  ),
  { fill: 'none' },
);

/** Data Network chain icon (monochrome). */
export const DataNetworkMono = /* @__PURE__ */ createIcon(
  'DataNetworkMono',
  '0 0 64 64',
  () => (
    <path d="M12.18 29.6h-.49q-1.47 0-1.47 1.52v13.67q0 1.52 1.47 1.52h2.2q1.47 0 1.47-1.52V30.35q0-.76.73-.76h2.94q1.47 0 1.47-1.51V4.78q0-.76.73-.77h3.92q.73 0 .73.76v24.06q0 .76-.73.76h-3.18q-1.47 0-1.47 1.53v13.67c0 1.01.73 1.52 1.47 1.52h4.64q1.47 0 1.47-1.52V30.35q0-.76.73-.76h6.37q.73 0 .73.76V44.8c0 1 .74 1.5 1.47 1.5h4.65q1.47 0 1.47-1.5V31.1q0-1.52-1.47-1.52h-3.18q-.73 0-.73-.76V4.77q0-.75.73-.76h3.92q.72 0 .72.76v23.3q0 1.52 1.48 1.52h2.93q.73 0 .73.76V44.8q0 1.5 1.47 1.5h2.21q1.47 0 1.47-1.5V31.1q0-1.52-1.47-1.52h-.5q-.72 0-.72-.76V4.77q0-.75.73-.76h2.3q.73 0 .73.76v23.3q0 1.52 1.47 1.52h.24q.74 0 .74.76V44.8q0 1.5 1.47 1.5h.49q.72 0 .73.77v12.16q0 .76-.73.76h-2.3q-.74 0-.74-.76v-11.4c0-1-.48-1.52-1.22-1.52-.73 0-1.22.5-1.22 1.52v11.4q0 .76-.74.76h-3.67q-.73 0-.73-.76v-11.4q0-1.51-1.47-1.52h-2.2q-1.47 0-1.47 1.52v11.4q0 .76-.74.76h-6.11q-.73 0-.74-.76v-11.4q0-1.51-1.46-1.52h-4.9q-1.47 0-1.47 1.52v11.4q0 .76-.73.76h-6.12q-.74 0-.73-.76v-11.4q0-1.51-1.48-1.52h-2.2q-1.46 0-1.46 1.52v11.4q0 .76-.73.76h-3.68q-.73 0-.73-.76v-11.4c0-1-.49-1.52-1.22-1.52-.74 0-1.23.5-1.23 1.52v11.4q0 .76-.73.76h-2.3q-.73 0-.73-.76V47.07q0-.76.73-.76h.5q1.46 0 1.46-1.52V30.35q0-.76.73-.76h.25q1.47 0 1.47-1.51V4.78q0-.76.73-.77h2.3q.73 0 .73.76v24.06q0 .76-.73.76" />
  ),
  { fill: 'currentColor' },
);

/** Data Network Square chain icon (colored). */
export const DataNetworkSquare = /* @__PURE__ */ createIcon(
  'DataNetworkSquare',
  '0 0 64 64',
  () => (
    <g transform="scale(.42667)">
      <rect width="150" height="150" fill="#1A1A1A" />
      <path
        fill="#F8F8F6"
        d="M43.14 71.13h-.79q-2.36 0-2.36 2.44v22q0 2.43 2.36 2.44h3.54q2.36 0 2.36-2.44V72.35q0-1.22 1.18-1.22h4.72q2.36 0 2.36-2.44V31.22q0-1.22 1.18-1.22h6.3q1.17 0 1.17 1.22v38.69q0 1.22-1.18 1.22h-5.11q-2.36 0-2.36 2.44v22c0 1.62 1.18 2.44 2.36 2.44h7.47q2.36 0 2.36-2.44V72.35q0-1.22 1.18-1.22h10.23q1.18 0 1.18 1.22v23.22c0 1.62 1.18 2.44 2.36 2.44h7.47q2.36 0 2.36-2.44v-22q0-2.44-2.36-2.44h-5.11q-1.18 0-1.18-1.22V31.22Q84.83 30 86 30h6.3q1.17 0 1.17 1.22V68.7q0 2.44 2.36 2.44h4.72q1.18 0 1.18 1.22v23.22q0 2.43 2.36 2.44h3.55q2.36 0 2.36-2.44v-22q0-2.44-2.36-2.44h-.79q-1.17 0-1.18-1.22v-38.7q0-1.22 1.18-1.22h3.7q1.18 0 1.18 1.22V68.7q0 2.44 2.36 2.44h.4q1.17 0 1.17 1.22v23.22q0 2.43 2.36 2.44h.79q1.18 0 1.18 1.22v19.55q0 1.22-1.18 1.22h-3.7q-1.17 0-1.18-1.22v-18.33c0-1.63-.78-2.44-1.96-2.44s-1.97.81-1.97 2.44v18.33q0 1.22-1.18 1.22h-5.9q-1.2 0-1.19-1.22v-18.33q0-2.44-2.36-2.44h-3.54q-2.36 0-2.36 2.44v18.33q0 1.22-1.18 1.22h-9.83q-1.18 0-1.18-1.22v-18.33q0-2.44-2.36-2.44h-7.87q-2.36 0-2.36 2.44v18.33q0 1.22-1.18 1.22H57.7q-1.18 0-1.18-1.22v-18.33q0-2.44-2.36-2.44h-3.54q-2.36 0-2.36 2.44v18.33q0 1.22-1.18 1.22h-5.9q-1.18 0-1.18-1.22v-18.33c0-1.63-.79-2.44-1.97-2.44s-1.96.81-1.96 2.44v18.33q0 1.22-1.18 1.22h-3.7Q30 120 30 118.78V99.23q0-1.22 1.18-1.22h.79q2.36 0 2.36-2.44V72.35q0-1.22 1.18-1.22h.39q2.36 0 2.36-2.44V31.22q0-1.22 1.18-1.22h3.7q1.17 0 1.18 1.22v38.69q0 1.22-1.18 1.22"
      />
    </g>
  ),
  { fill: 'none' },
);

/** Data Network Square chain icon (monochrome). */
export const DataNetworkSquareMono = /* @__PURE__ */ createIcon(
  'DataNetworkSquareMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M0 0h64v64H0Zm18.4 30.35h-.33q-1 0-1 1.04v9.39q0 1.03 1 1.04h1.51q1 0 1-1.04v-9.91q0-.52.51-.52h2.01q1.01 0 1.01-1.04V13.32q0-.52.5-.52h2.7q.5 0 .5.52v16.5q0 .53-.51.53h-2.18q-1 0-1 1.04v9.39c0 .69.5 1.04 1 1.04h3.19q1 0 1-1.04v-9.91q0-.52.5-.52h4.37q.5 0 .5.52v9.9c0 .7.5 1.05 1.01 1.05h3.19q1 0 1-1.04v-9.39q0-1.04-1-1.04H36.7q-.5 0-.5-.52v-16.5q0-.53.5-.53h2.68q.5 0 .5.52v16q0 1.03 1 1.03h2.02q.5 0 .5.52v9.91q0 1.04 1.01 1.04h1.52q1 0 1-1.04V31.4q0-1.04-1-1.04h-.34q-.5 0-.5-.52v-16.5q0-.53.5-.53h1.58q.5 0 .5.52v16q0 1.03 1 1.03h.18q.5 0 .5.52v9.91q0 1.04 1 1.04h.34q.5 0 .5.52v8.34q0 .52-.5.52h-1.58q-.5 0-.5-.52v-7.82c0-.7-.33-1.04-.84-1.04s-.84.35-.84 1.04v7.82q0 .52-.5.52h-2.52q-.51 0-.5-.52v-7.82q0-1.04-1.01-1.04h-1.51q-1.01 0-1.01 1.04v7.82q0 .52-.5.52h-4.2q-.5 0-.5-.52v-7.82q0-1.04-1-1.04H30.3q-1 0-1 1.04v7.82q0 .52-.5.52h-4.2q-.5 0-.5-.52v-7.82q0-1.04-1-1.04h-1.5q-1 0-1 1.04v7.82q0 .52-.51.52h-2.52q-.5 0-.5-.52v-7.82c0-.7-.34-1.04-.84-1.04s-.84.35-.84 1.04v7.82q0 .52-.5.52H13.3q-.51 0-.51-.52v-8.34q0-.52.5-.52h.34q1 0 1-1.04v-9.91q0-.52.51-.52h.17q1 0 1-1.04v-16q0-.52.5-.52h1.59q.5 0 .5.52v16.5q0 .53-.5.53"
    />
  ),
  { fill: 'currentColor' },
);
