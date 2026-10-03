import {
  type ForwardedRef,
  type ForwardRefExoticComponent,
  forwardRef,
  type ReactNode,
  type RefAttributes,
  useId,
} from 'react';
import type { IconProps } from './index';

/** Options of the `createIcon(displayName, viewBox, render, options)` form. */
export interface IconOptions {
  /** Default `fill` of the `<svg>` element (e.g. `'currentColor'`); a `fill` prop overrides it. */
  readonly fill?: string;
  /**
   * Set when `render` uses its `id` argument for internal ids (masks,
   * gradients, clip paths). Each rendered instance then gets its own ids via
   * `useId`; without `ids`, the component calls no hooks at all.
   */
  readonly ids?: boolean;
}

/** The extra props `render` receives; icons without extra props get none. */
export type NoExtraProps = Readonly<Record<never, never>>;

/** An icon component made by {@link createIcon}. */
export type IconComponent = ForwardRefExoticComponent<
  Omit<IconProps, 'ref'> & RefAttributes<SVGSVGElement>
>;

type RenderWithId = (props: NoExtraProps, id: string) => ReactNode;
type OptionsForm = [
  displayName: string,
  viewBox: string,
  render: RenderWithId,
  options: IconOptions,
];
type LegacyForm = [
  displayName: string,
  viewBox: string,
  render: (id: string) => ReactNode,
  defaultFill?: string | undefined,
];

function isOptionsForm(args: OptionsForm | LegacyForm): args is OptionsForm {
  return typeof args[3] === 'object';
}

const NO_EXTRA_PROPS: NoExtraProps = {};

/**
 * Turns `useId()` output into an id that is valid unescaped in `url(#…)` and
 * `href="#…"` on every React version: React 18 and 19.0 return `:r1:`, 19.1
 * `«r1»` and 19.2+ `_r_1_`; all of them map to `r1`, so markup is also the
 * same across versions. React's own characters are `[A-Za-z0-9]`, so only
 * its delimiters (and any such characters in `identifierPrefix`) are dropped.
 */
function toSvgId(reactId: string): string {
  return reactId.replace(/[^A-Za-z0-9-]/g, '');
}

/**
 * Factory that creates a typed, accessible SVG icon component.
 *
 * Icons without internal ids are pure function components without hooks.
 * Icons with internal ids call only `useId`, which React supports in Server
 * Components, so every icon renders in React Server Components without a
 * `'use client'` boundary.
 *
 * Two call forms are supported:
 *
 * - `createIcon(displayName, viewBox, render, options)` — `render(props, id)`
 *   receives the icon's extra props (none here) and, when `options.ids` is
 *   set, a per-instance id prefix for internal `id` attributes. This is the
 *   form the icon generator emits.
 * - `createIcon(displayName, viewBox, render, defaultFill?)` — the v4 form:
 *   `render(id)` always receives a per-instance id prefix.
 *
 * Per-instance ids keep every rendered icon self-contained: a `url(#…)`
 * reference never resolves into another instance, which may be hidden
 * (`display: none`) or styled differently.
 *
 * @param displayName - Component display name shown in React DevTools; also part of the id prefix (`w3i-<lowercased name>-<id>`).
 * @param viewBox - SVG `viewBox` attribute value (e.g. `"0 0 24 24"`).
 * @param render - Function that returns the SVG content.
 * @param options - Default `fill` and whether `render` needs ids; or, in the v4 form, the default `fill`.
 */
export function createIcon(
  displayName: string,
  viewBox: string,
  render: RenderWithId,
  options: IconOptions & { readonly ids: true },
): IconComponent;
export function createIcon(
  displayName: string,
  viewBox: string,
  render: (props: NoExtraProps) => ReactNode,
  options: IconOptions & { readonly ids?: false },
): IconComponent;
export function createIcon(
  displayName: string,
  viewBox: string,
  render: (id: string) => ReactNode,
  defaultFill?: string,
): IconComponent;
export function createIcon(...args: OptionsForm | LegacyForm): IconComponent {
  const [displayName, viewBox] = args;
  let draw: RenderWithId;
  let options: IconOptions;
  if (isOptionsForm(args)) {
    [, , draw, options] = args;
  } else {
    const [, , render, fill] = args;
    draw = (_props, id) => render(id);
    options = fill === undefined ? { ids: true } : { fill, ids: true };
  }
  const prefix = `w3i-${displayName.toLowerCase()}`;

  function renderSvg(
    rawProps: Omit<IconProps, 'ref'>,
    ref: ForwardedRef<SVGSVGElement>,
    id: string,
  ) {
    const { title, titleId, size = '1em', width, height, ...props } = rawProps;
    const isDecorative = !(
      title ||
      props['aria-label'] ||
      props['aria-labelledby']
    );
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={viewBox}
        width={width ?? size}
        height={height ?? size}
        fill={options.fill}
        aria-hidden={isDecorative || undefined}
        role={isDecorative ? undefined : 'img'}
        aria-labelledby={title && titleId ? titleId : undefined}
        ref={ref}
        {...props}
      >
        {title && <title id={titleId}>{title}</title>}
        {draw(NO_EXTRA_PROPS, id)}
      </svg>
    );
  }

  // Chosen once per component, so the hook order of an instance never
  // changes: only icons with internal ids call useId.
  const Icon: IconComponent = options.ids
    ? forwardRef<SVGSVGElement, Omit<IconProps, 'ref'>>((props, ref) =>
        renderSvg(props, ref, `${prefix}-${toSvgId(useId())}`),
      )
    : forwardRef<SVGSVGElement, Omit<IconProps, 'ref'>>((props, ref) =>
        renderSvg(props, ref, prefix),
      );
  Icon.displayName = displayName;
  return Icon;
}
