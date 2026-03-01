import { createContext, useContext } from 'react';
import type { IconProps } from './index';

export type IconContextValue = Partial<Omit<IconProps, 'ref'>>;

const EMPTY: IconContextValue = {};

export const IconContext = createContext<IconContextValue>(EMPTY);

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
