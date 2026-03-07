import { createContext, useContext } from 'react';
import type { IconProps } from './index';

/** Default prop values applied to all icons within the provider subtree. Per-icon props take precedence; `style` objects are shallow-merged (spread). */
export type IconContextValue = Partial<Omit<IconProps, 'ref'>>;

const EMPTY: IconContextValue = {};

/**
 * React context for setting default props on all icon components in a subtree.
 *
 * @example
 * ```tsx
 * <IconContext.Provider value={{ size: 32, className: 'icon' }}>
 *   <Ethereum />
 *   <Bitcoin />
 * </IconContext.Provider>
 * ```
 */
export const IconContext = createContext<IconContextValue>(EMPTY);
IconContext.displayName = 'ReactWeb3Icons.IconContext';

/** Merges `IconContext` defaults with per-icon props. Per-icon props win; `style` objects are shallow-merged (spread). */
export function useIconContext<T extends IconProps>(props: T): T {
  const ctx = useContext(IconContext);
  if (ctx === EMPTY) {
    return props;
  }
  const { style: ctxStyle, ...ctxRest } = ctx;
  const { style: propStyle, ...propRest } = props;
  return {
    ...ctxRest,
    ...propRest,
    ...(ctxStyle || propStyle ? { style: { ...ctxStyle, ...propStyle } } : {}),
  } as T;
}
