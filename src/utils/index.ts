import type { SVGProps } from 'react';

export type { IconName } from '../icon-names';

/**
 * Props accepted by all icon components.
 * Extends all standard SVG attributes (`fill`, `stroke`, `onClick`, etc.).
 */
export interface IconProps extends SVGProps<SVGSVGElement> {
  /** Accessible label rendered as a `<title>` element inside the SVG. When provided, the icon is no longer treated as decorative. */
  title?: string | undefined;
  /** ID applied to the `<title>` element. When provided together with `title`, `aria-labelledby` is automatically set to this value on the `<svg>`. */
  titleId?: string | undefined;
  /**
   * Shorthand for both `width` and `height`. Defaults to `"1em"` so the icon scales with the surrounding font size.
   * Overridden by explicit `width` or `height` props.
   */
  size?: string | number | undefined;
}

export { createIcon } from './createIcon';
