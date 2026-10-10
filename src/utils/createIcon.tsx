import {
  type ForwardedRef,
  type ForwardRefExoticComponent,
  forwardRef,
  type ReactNode,
  type RefAttributes,
  useId,
} from 'react';
import type { IconProps } from './index';

/** Icons without extra props. */
export type NoExtraProps = Readonly<Record<never, never>>;

/** Options of `createIcon(displayName, viewBox, render, options)`. */
export interface IconOptions<P extends object = NoExtraProps> {
  /** Default `fill` of the `<svg>` element (e.g. `'currentColor'`); a `fill` prop overrides it. */
  readonly fill?: string;
  /**
   * Set when `render` uses its `id` argument for internal ids (masks,
   * gradients, clip paths). Each rendered instance then gets its own ids via
   * `useId`; without `ids`, the component calls no hooks at all.
   */
  readonly ids?: boolean;
  /**
   * Names of the extra props (`P`) that `render` reads. They are passed to
   * `render` and not forwarded to the `<svg>`.
   */
  readonly props?: readonly (keyof P & string)[];
}

/** An icon component made by {@link createIcon}, with extra props `P`. */
export type IconComponent<P extends object = NoExtraProps> =
  ForwardRefExoticComponent<
    Omit<IconProps, 'ref'> & P & RefAttributes<SVGSVGElement>
  >;

/** A `viewBox`, or a function of the extra props that returns one. */
export type IconViewBox<P extends object> =
  | string
  | ((props: Readonly<P>) => string);

/**
 * What the implementation sees of the props: the extra props `P` are only
 * passed through to `render` (and `viewBox`), so they stay opaque here.
 */
type SvgProps = Omit<IconProps, 'ref'>;
type Render = (props: SvgProps, id: string) => ReactNode;

/** Outer delimiters of `useId()` output per React version. */
const USE_ID_DELIMITERS: Readonly<Record<string, string>> = {
  ':': ':', // React 18, 19.0: `:<prefix>r1:`
  '«': '»', // React 19.1: `«<prefix>r1»`
  _: '_', // React 19.2+: `_<prefix>r_1_`
};

/**
 * Turns `useId()` output into an id that is valid unescaped in `url(#…)` and
 * `href="#…"` and the same on every React version: `:r1:`, `«r1»` and
 * `_r_1_` all become `r1`.
 *
 * Only React's own delimiters are dropped: the outer pair, and in the 19.2+
 * format the `_` before the counter (React's counters never contain `_`, so
 * it is the last one). Any other character outside `[A-Za-z0-9-]`, which can
 * only come from a consumer's `identifierPrefix`, is escaped as `_<hex>_`
 * rather than dropped, so distinct prefixes (`app_one-`, `appone-`) keep
 * producing distinct ids.
 *
 * @internal exported for tests
 */
export function toSvgId(reactId: string): string {
  const open = reactId.charAt(0);
  const close = USE_ID_DELIMITERS[open];
  let inner = reactId;
  if (close !== undefined && reactId.length >= 2 && reactId.endsWith(close)) {
    inner = reactId.slice(1, -1);
    if (open === '_') {
      const separator = inner.lastIndexOf('_');
      if (separator !== -1) {
        inner = inner.slice(0, separator) + inner.slice(separator + 1);
      }
    }
  }
  // Per UTF-16 code unit, so the escape stays reversible for any input.
  return inner.replace(
    /[^A-Za-z0-9-]/g,
    unit => `_${unit.charCodeAt(0).toString(16)}_`,
  );
}

/**
 * Factory that creates a typed, accessible SVG icon component.
 *
 * Icons without internal ids are pure function components without hooks.
 * Icons with internal ids call only `useId`, which React supports in Server
 * Components, so every icon renders in React Server Components without a
 * `'use client'` boundary.
 *
 * `render(props, id)` receives the component's props, from which it reads
 * its extra props `P` (listed in `options.props`, e.g. `withBackground`),
 * and, when `options.ids` is set, a per-instance id prefix for internal `id`
 * attributes. `viewBox` may also be a function of the props.
 *
 * Per-instance ids keep every rendered icon self-contained: a `url(#…)`
 * reference never resolves into another instance, which may be hidden
 * (`display: none`) or styled differently.
 *
 * @param displayName - Component display name shown in React DevTools; also part of the id prefix (`w3i-<lowercased name>-<instance>`).
 * @param viewBox - SVG `viewBox` attribute value (e.g. `"0 0 24 24"`).
 * @param render - Function that returns the SVG content.
 * @param options - Default `fill`, extra props, and whether `render` needs ids.
 */
export function createIcon<P extends object = NoExtraProps>(
  displayName: string,
  viewBox: IconViewBox<P>,
  render: (props: Readonly<P>, id: string) => ReactNode,
  options: IconOptions<P> & { readonly ids: true },
): IconComponent<P>;
export function createIcon<P extends object = NoExtraProps>(
  displayName: string,
  viewBox: IconViewBox<P>,
  render: (props: Readonly<P>) => ReactNode,
  options: IconOptions<P> & { readonly ids?: false },
): IconComponent<P>;
export function createIcon(
  displayName: string,
  viewBox: IconViewBox<SvgProps>,
  render: Render,
  options: IconOptions<Readonly<Record<string, unknown>>>,
): IconComponent {
  const prefix = `w3i-${displayName.toLowerCase()}`;
  const extraProps = options.props ?? [];

  function renderSvg(
    allProps: SvgProps,
    ref: ForwardedRef<SVGSVGElement>,
    id: string,
  ) {
    const { title, titleId, size = '1em', width, height, ...props } = allProps;
    for (const name of extraProps) {
      Reflect.deleteProperty(props, name);
    }
    const isDecorative = !(
      title ||
      props['aria-label'] ||
      props['aria-labelledby']
    );
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={typeof viewBox === 'string' ? viewBox : viewBox(allProps)}
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
        {render(allProps, id)}
      </svg>
    );
  }

  // Chosen once per component, so the hook order of an instance never
  // changes: only icons with internal ids call useId.
  const Icon: IconComponent = options.ids
    ? forwardRef<SVGSVGElement, SvgProps>((props, ref) =>
        renderSvg(props, ref, `${prefix}-${toSvgId(useId())}`),
      )
    : forwardRef<SVGSVGElement, SvgProps>((props, ref) =>
        renderSvg(props, ref, prefix),
      );
  Icon.displayName = displayName;
  return Icon;
}
