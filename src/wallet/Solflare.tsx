import { createIcon } from '../utils';

// Source: https://www.solflare.com/solflare-brand-kit.zip (official brand kit, linked from solflare.com: SVG/Solflare_INSIGNIA_Obsidian_Noir_BACKGROUND_Yellow.svg)
// Source: https://www.solflare.com/wp-content/uploads/2024/11/App-Icon.svg (official app icon)
// The insignia matches the kit's Solflare_INSIGNIA_Obsidian_Noir_BACKGROUND_Yellow.svg (#02050A on #FFEF46; alpha IoU 0.99, checked 2026-10-09), but the tile here is a composition: the insignia is 62.5% of the square tile, where the kit file draws it at 50% on its square artboard and the site's App-Icon.svg at 67% on a rounded tile. The artwork, which predates the source policy, is unchanged until one of the two official layouts is chosen
// Mono: the tile in currentColor with the insignia knocked out
/** Solflare wallet icon (colored). */
export const Solflare = /* @__PURE__ */ createIcon(
  'Solflare',
  '0 0 64 64',
  () => (
    <>
      <path fill="#FFEF46" d="M64 0H0v64h64z" />
      <path
        fill="#02050A"
        d="m32.15 33.7 2.93-2.85 5.46 1.8c3.57 1.2 5.36 3.39 5.36 6.48 0 2.34-.9 3.89-2.68 5.88l-.55.6.2-1.4c.8-5.08-.7-7.28-5.6-8.87zM24.8 16.3l14.9 4.99-3.24 3.08-7.74-2.59c-2.68-.9-3.57-2.34-3.92-5.38zm-.9 25.32 3.38-3.24 6.35 2.1c3.33 1.09 4.47 2.54 4.12 6.17zm-4.26-14.45c0-.95.5-1.85 1.34-2.6.9 1.3 2.43 2.45 4.86 3.24l5.26 1.75-2.92 2.84-5.16-1.7c-2.39-.8-3.38-2-3.38-3.53m15.59 26.16C46.14 46.06 52 41.12 52 35.04c0-4.04-2.38-6.28-7.64-8.03l-3.97-1.34L51.26 15.2l-2.19-2.34-3.22 2.84-15.24-5.03c-4.71 1.54-10.67 6.08-10.67 10.61q-.01.74.2 1.55c-3.92 2.24-5.5 4.34-5.5 6.93 0 2.44 1.28 4.88 5.4 6.23l3.28 1.1L12 48l2.18 2.34 3.53-3.24z"
      />
    </>
  ),
  {},
);

/** Solflare wallet icon (monochrome). */
export const SolflareMono = /* @__PURE__ */ createIcon(
  'SolflareMono',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="scale(2.66666)">
      <defs>
        <mask id={`${_id}-sfm-a`}>
          <path fill="#fff" d="M0 0h24v24H0z" />
          <path
            fill="#000"
            d="m12.06 12.64 1.1-1.07 2.04.67q2.01.68 2.01 2.43c0 .88-.33 1.46-1 2.2l-.2.23.07-.52c.3-1.9-.26-2.73-2.1-3.33zM9.3 6.1l5.58 1.87-1.2 1.16-2.9-.97c-1.01-.34-1.35-.88-1.48-2.02zm-.33 9.5 1.26-1.22 2.38.79c1.25.4 1.68.95 1.55 2.32zm-1.6-5.42q.01-.55.5-.97c.33.48.9.91 1.82 1.21l1.97.65-1.1 1.07-1.93-.64c-.9-.3-1.27-.74-1.27-1.32M13.22 20c4.1-2.73 6.29-4.58 6.29-6.86 0-1.51-.9-2.35-2.87-3.01l-1.48-.5 4.07-3.93-.82-.88-1.2 1.07L11.47 4c-1.77.58-4 2.28-4 3.98q0 .27.07.58c-1.47.84-2.06 1.63-2.06 2.6 0 .91.48 1.83 2.03 2.33l1.22.42L4.5 18l.82.88 1.32-1.22z"
          />
        </mask>
      </defs>
      <rect width="24" height="24" mask={`url(#${_id}-sfm-a)`} />
    </g>
  ),
  { fill: 'currentColor', ids: true },
);
