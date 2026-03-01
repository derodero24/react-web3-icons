import { forwardRef, type ReactNode, useId } from 'react';
import { useIconContext } from './IconContext';
import type { IconProps } from './index';

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
