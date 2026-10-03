import { join } from 'node:path';
import type { ComponentType } from 'react';
import type { IconProps } from '../../src/utils';

/** Shared helpers for tests that walk the icon sources. */

export const ROOT = join(import.meta.dirname, '..', '..');
export const ICONS = join(ROOT, 'icons');
export const SRC = join(ROOT, 'src');

const FORWARD_REF = Symbol.for('react.forward_ref');

/** True for the forwardRef components every icon export is built from. */
export function isIconComponent(
  value: unknown,
): value is ComponentType<IconProps> {
  return (
    typeof value === 'object' &&
    value !== null &&
    '$$typeof' in value &&
    value.$$typeof === FORWARD_REF
  );
}
