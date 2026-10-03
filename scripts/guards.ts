/**
 * Type guards for data entering the scripts from JSON files or dynamically
 * imported modules. Unlike `Array.isArray` / `instanceof`, they narrow to
 * `unknown` element types instead of `any`.
 */

export function isRecord(
  value: unknown,
): value is Readonly<Record<string, unknown>> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function isArray(value: unknown): value is readonly unknown[] {
  return Array.isArray(value);
}

export function isSet(value: unknown): value is ReadonlySet<unknown> {
  return value instanceof Set;
}
