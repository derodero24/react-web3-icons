import type { ComponentType, CSSProperties } from 'react';

/** The props the site passes to icon components. */
export type IconComponent = ComponentType<{
  className?: string;
  style?: CSSProperties;
  size?: number | string;
}>;
