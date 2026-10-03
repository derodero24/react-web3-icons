import { createIcon } from '../utils';

// Source: https://optimism.io
// Circle variant: 28×28 content scaled to ~46px centered in 64×64
/** Optimism chain icon (colored). */
export const Optimism = /* @__PURE__ */ createIcon(
  'Optimism',
  '0 0 28 28',
  () => (
    <>
      <circle cx="14" cy="14" r="14" fill="#FF0420" />
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M14 26.25v-5.185c5.333 0 9.658-4.324 9.658-9.657S19.333 1.75 14 1.75v5.185c-5.333 0-9.658 4.324-9.658 9.657S8.667 26.25 14 26.25m4.778-12.205v-.09q-3.16-1.574-4.733-4.733h-.09q-1.574 3.16-4.733 4.733v.09q3.16 1.574 4.733 4.733h.09q1.574-3.16 4.733-4.733"
      />
    </>
  ),
  {},
);

/** Optimism chain icon (monochrome). */
export const OptimismMono = /* @__PURE__ */ createIcon(
  'OptimismMono',
  '0 0 28 28',
  () => (
    <path
      fillRule="evenodd"
      d="M0 14a14 14 0 1 0 28 0 14 14 0 1 0-28 0m14 12.25v-5.185c5.333 0 9.658-4.324 9.658-9.657S19.333 1.75 14 1.75v5.185c-5.333 0-9.658 4.324-9.658 9.657S8.667 26.25 14 26.25m4.778-12.205v-.09q-3.16-1.574-4.733-4.733h-.09q-1.574 3.16-4.733 4.733v.09q3.16 1.574 4.733 4.733h.09q1.574-3.16 4.733-4.733"
    />
  ),
  { fill: 'currentColor' },
);

/** Optimism Circle chain icon (colored). */
export const OptimismCircle = /* @__PURE__ */ createIcon(
  'OptimismCircle',
  '0 0 64 64',
  () => (
    <>
      <circle cx="32" cy="32" r="32" fill="#FF0420" />
      <g>
        <path
          fill="#fff"
          d="M32.002 52.129v-8.52c8.762 0 15.868-7.104 15.868-15.866s-7.106-15.868-15.868-15.868v8.52c-8.762 0-15.868 7.104-15.868 15.866s7.106 15.868 15.868 15.868m7.85-20.053v-.148q-5.19-2.585-7.776-7.776h-.148q-2.585 5.19-7.776 7.776v.148q5.19 2.585 7.776 7.776h.148q2.585-5.19 7.776-7.776"
        />
      </g>
    </>
  ),
  {},
);

/** Optimism Square chain icon (colored). */
export const OptimismSquare = /* @__PURE__ */ createIcon(
  'OptimismSquare',
  '0 0 64 64',
  () => (
    <>
      <rect width="64" height="64" fill="#FF0420" rx="12.8" />
      <g>
        <path
          fill="#fff"
          d="M32.002 52.129v-8.52c8.762 0 15.868-7.104 15.868-15.866s-7.106-15.868-15.868-15.868v8.52c-8.762 0-15.868 7.104-15.868 15.866s7.106 15.868 15.868 15.868m7.85-20.053v-.148q-5.19-2.585-7.776-7.776h-.148q-2.585 5.19-7.776 7.776v.148q5.19 2.585 7.776 7.776h.148q2.585-5.19 7.776-7.776"
        />
      </g>
    </>
  ),
  {},
);

/** Optimism Square chain icon (monochrome). */
export const OptimismSquareMono = /* @__PURE__ */ createIcon(
  'OptimismSquareMono',
  '0 0 64 64',
  (_props, _id) => (
    <>
      <rect width="64" height="64" mask={`url(#${_id}-opts-a)`} rx="12.8" />
      <defs>
        <mask id={`${_id}-opts-a`}>
          <rect width="100%" height="100%" fill="#fff" />
          <g fill="#000">
            <path d="M32.002 52.129v-8.52c8.762 0 15.868-7.104 15.868-15.866s-7.106-15.868-15.868-15.868v8.52c-8.762 0-15.868 7.104-15.868 15.866s7.106 15.868 15.868 15.868m7.85-20.053v-.148q-5.19-2.585-7.776-7.776h-.148q-2.585 5.19-7.776 7.776v.148q5.19 2.585 7.776 7.776h.148q2.585-5.19 7.776-7.776" />
          </g>
        </mask>
      </defs>
    </>
  ),
  { fill: 'currentColor', ids: true },
);

/** Optimism Circle chain icon (monochrome). */
export const OptimismCircleMono = /* @__PURE__ */ createIcon(
  'OptimismCircleMono',
  '0 0 64 64',
  (_props, _id) => (
    <>
      <circle cx="32" cy="32" r="32" mask={`url(#${_id}-optc-a)`} />
      <defs>
        <mask id={`${_id}-optc-a`}>
          <rect width="100%" height="100%" fill="#fff" />
          <g fill="#000">
            <path d="M32.002 52.129v-8.52c8.762 0 15.868-7.104 15.868-15.866s-7.106-15.868-15.868-15.868v8.52c-8.762 0-15.868 7.104-15.868 15.866s7.106 15.868 15.868 15.868m7.85-20.053v-.148q-5.19-2.585-7.776-7.776h-.148q-2.585 5.19-7.776 7.776v.148q5.19 2.585 7.776 7.776h.148q2.585-5.19 7.776-7.776" />
          </g>
        </mask>
      </defs>
    </>
  ),
  { fill: 'currentColor', ids: true },
);
