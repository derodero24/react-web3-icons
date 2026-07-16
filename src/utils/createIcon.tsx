import { forwardRef, type ReactNode } from 'react';
import type { IconProps } from './index';

/**
 * Factory that creates a typed, accessible SVG icon component.
 *
 * The returned component is a pure function component with no hooks, so it
 * renders in React Server Components without a `'use client'` boundary.
 *
 * @param displayName - Component display name shown in React DevTools.
 * @param viewBox - SVG `viewBox` attribute value (e.g. `"0 0 24 24"`).
 * @param render - Function that returns the SVG content. Receives a stable, deterministic ID prefix for internal `id` attributes (e.g. gradient/mask definitions).
 * @param defaultFill - Default `fill` value applied to the `<svg>` element (e.g. `"none"` for stroke-based icons).
 */
export function createIcon(
  displayName: string,
  viewBox: string,
  render: (id: string) => ReactNode,
  defaultFill?: string,
) {
  // Deterministic per-component prefix instead of useId: rendering the same
  // icon twice yields duplicate ids, but the duplicated defs are identical,
  // so references still resolve to the correct shapes. In exchange, icons
  // render server-side (RSC) and markup is stable across renders.
  const iconId = `w3i-${displayName.toLowerCase()}`;
  const Icon = forwardRef<SVGSVGElement, IconProps>((rawProps, ref) => {
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
        fill={defaultFill}
        aria-hidden={isDecorative || undefined}
        role={isDecorative ? undefined : 'img'}
        aria-labelledby={title && titleId ? titleId : undefined}
        ref={ref}
        {...props}
      >
        {title && <title id={titleId}>{title}</title>}
        {render(iconId)}
      </svg>
    );
  });
  Icon.displayName = displayName;
  return Icon;
}
