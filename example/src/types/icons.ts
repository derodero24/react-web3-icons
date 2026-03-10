import type { ComponentType, CSSProperties } from 'react';

export type Variant = 'all' | 'colored' | 'mono';

export type IconComponent = ComponentType<{
  className?: string;
  style?: CSSProperties;
}>;
