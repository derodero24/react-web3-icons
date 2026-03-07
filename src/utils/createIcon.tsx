import { forwardRef, type ReactNode, useId } from 'react';
import { useIconContext } from './IconContext';
import type { IconProps } from './index';

/**
 * Factory that creates a typed, accessible SVG icon component.
 *
 * @param displayName - Component display name shown in React DevTools.
 * @param viewBox - SVG `viewBox` attribute value (e.g. `"0 0 24 24"`).
 * @param render - Function that returns the SVG content. Receives a stable unique ID for use in internal `id` attributes (e.g. gradient/mask definitions).
 * @param defaultFill - Default `fill` value applied to the `<svg>` element (e.g. `"none"` for stroke-based icons).
 */
export function createIcon(
  displayName: string,
  viewBox: string,
  render: (id: string) => ReactNode,
  defaultFill?: string,
) {
  const Icon = forwardRef<SVGSVGElement, IconProps>((rawProps, ref) => {
    const {
      title,
      titleId,
      size = '1em',
      width,
      height,
      ...props
    } = useIconContext(rawProps);
    const _id = useId();
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
        {render(_id)}
      </svg>
    );
  });
  Icon.displayName = displayName;
  return Icon;
}
