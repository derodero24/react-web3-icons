import { createIcon } from '../utils';

// Source: https://docs.fluid.io/fluid-logo-light.svg
// Source: https://fluid.io (site sign: /assets/fluid-sign-*.js, same paths)
// Default: the Sign group of the official docs.fluid.io/fluid-logo-light.svg (fill #000000); its two paths are identical to the standalone sign fluid.io serves (white, for its dark UI)
// Fluid publishes its sign as a one-colour mark only (black on light, white on dark); the blue #366FFF app tile and the FLUID token disc exist only as rasters (fluid.io/icons/apple-touch-icon.png, github.com/Instadapp/assets icons/tokens/fluid.png), so no coloured variant is added
// Mono: the same two paths in currentColor
// Fluid is Instadapp's rebrand (fluid.instadapp.io redirects to fluid.io); the older Instadapp-era Fluid mark in github.com/Instadapp/assets icons/protocols/fluid.svg is superseded by this sign
/** Fluid DEX icon (colored). */
export const Fluid = /* @__PURE__ */ createIcon(
  'Fluid',
  '0 0 64 64',
  () => (
    <>
      <path d="M47.14 25.86c.75-.46 1.2-.16 1.4.61 1.96 7.77-4.06 12.13-11.9 12.13-7.86 0-15.63.42-18.6 8.52-1.25 3.43-.74 7.96.99 12.27.11.35-.17.7-.52.59-1.1-.35-3-1.1-4.5-2.38-3.08-2.66-5.34-7.87-4.04-13.58 2.34-10.3 11.18-14.24 22.43-15.17 5.55-.47 10.8-.51 14.74-2.99" />
      <path d="M51.93 4.26c.7-1.03 3.78.98 1.86 7.04-4.52 14-19.92 11-29.02 12.86-3.32.68-6.86 1.94-9.22 3.8-.54.42-1.1.38-1.35 0-.7-1.05-1.17-2.63-1.17-3.96.02-11.18 14.14-9.64 21.47-10.74 7.23-1.07 12.36-3.36 17.43-9" />
    </>
  ),
  { fill: '#000' },
);

/** Fluid DEX icon (monochrome). */
export const FluidMono = /* @__PURE__ */ createIcon(
  'FluidMono',
  '0 0 64 64',
  () => (
    <>
      <path d="M47.14 25.86c.75-.46 1.2-.16 1.4.61 1.96 7.77-4.06 12.13-11.9 12.13-7.86 0-15.63.42-18.6 8.52-1.25 3.43-.74 7.96.99 12.27.11.35-.17.7-.52.59-1.1-.35-3-1.1-4.5-2.38-3.08-2.66-5.34-7.87-4.04-13.58 2.34-10.3 11.18-14.24 22.43-15.17 5.55-.47 10.8-.51 14.74-2.99" />
      <path d="M51.93 4.26c.7-1.03 3.78.98 1.86 7.04-4.52 14-19.92 11-29.02 12.86-3.32.68-6.86 1.94-9.22 3.8-.54.42-1.1.38-1.35 0-.7-1.05-1.17-2.63-1.17-3.96.02-11.18 14.14-9.64 21.47-10.74 7.23-1.07 12.36-3.36 17.43-9" />
    </>
  ),
  { fill: 'currentColor' },
);
