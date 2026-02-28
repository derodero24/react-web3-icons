import type { SVGProps } from 'react';

export interface IconProps extends SVGProps<SVGSVGElement> {
  title?: string;
  titleId?: string;
  size?: string | number;
}

export { createIcon } from './createIcon';
