import { readdirSync, readFileSync } from 'node:fs';
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

/** A hand-maintained (`"kind": "custom"`) icon unit declared in `icons/`. */
export interface CustomUnit {
  readonly category: string;
  readonly name: string;
  /** Export names, one per declared variant (`""` → `name`). */
  readonly exportNames: readonly string[];
  /** Absolute path of the hand-written TSX module. */
  readonly modulePath: string;
}

interface CustomUnitMeta {
  readonly kind: 'custom';
  readonly name: string;
  readonly variants: object;
}

function isCustomUnitMeta(value: unknown): value is CustomUnitMeta {
  return (
    typeof value === 'object' &&
    value !== null &&
    'kind' in value &&
    value.kind === 'custom' &&
    'name' in value &&
    typeof value.name === 'string' &&
    'variants' in value &&
    typeof value.variants === 'object' &&
    value.variants !== null
  );
}

/** Discovers every `"kind": "custom"` unit from `icons/<category>/*.json`. */
export function loadCustomUnits(): CustomUnit[] {
  const units: CustomUnit[] = [];
  for (const dir of readdirSync(ICONS, { withFileTypes: true })) {
    if (!dir.isDirectory()) {
      continue;
    }
    const category = dir.name;
    for (const file of readdirSync(join(ICONS, category)).sort()) {
      if (!file.endsWith('.json')) {
        continue;
      }
      const meta: unknown = JSON.parse(
        readFileSync(join(ICONS, category, file), 'utf-8'),
      );
      if (!isCustomUnitMeta(meta)) {
        continue;
      }
      units.push({
        category,
        name: meta.name,
        exportNames: Object.keys(meta.variants).map(
          suffix => `${meta.name}${suffix}`,
        ),
        modulePath: join(SRC, category, `${meta.name}.tsx`),
      });
    }
  }
  return units;
}
