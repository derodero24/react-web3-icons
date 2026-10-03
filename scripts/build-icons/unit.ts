/**
 * Types and runtime validation for the unit definitions in
 * `icons/<category>/<slug>.json`.
 *
 * Unit kinds:
 *  - "icon"     — artwork unit: sibling `.svg` files per variant → createIcon TSX
 *  - "custom"   — artwork whose TSX is hand-written (only the SVGs are consumed)
 *  - "reexport" — renames exports of another module (`export { A as B } from …`)
 *  - "alias"    — deprecated `export const A = B;` aliases with JSDoc
 *
 * Validation checks the shape of every field the pipeline reads, so a typo
 * fails with the file and field instead of a context-free TypeError. Keys the
 * pipeline does not read are ignored.
 */

import { isArray, isRecord } from '../guards.ts';

/** One artwork variant; the variant key is the export-name suffix. */
export interface Variant {
  readonly file: string;
  /** Root `fill` of the SVG, which becomes the component's default fill. */
  readonly fill?: string;
}

/** `export { of as as }` */
export interface ReexportName {
  readonly of: string;
  readonly as: string;
}

export interface ReexportSpec {
  readonly from: string;
  readonly exports: readonly ReexportName[];
}

/** `export const <name> = <target>;`, optionally deprecated. */
export interface ConstAlias {
  readonly name: string;
  readonly target: string;
  readonly deprecated?: string;
}

export interface AliasConstSpec {
  readonly importFrom: string;
  readonly imports: readonly string[];
  readonly exports: readonly ConstAlias[];
}

interface UnitBase {
  /** Canonical PascalCase export name, also the module file name. */
  readonly name: string;
  readonly source?: readonly string[];
  readonly notes?: readonly string[];
}

interface ArtworkFields extends UnitBase {
  readonly variants: Readonly<Record<string, Variant>>;
  /** Export name → deprecation message. */
  readonly deprecated?: Readonly<Record<string, string>>;
  /** Extra lowercase search terms for the manifest. */
  readonly aliases?: readonly string[];
  readonly reexport?: ReexportSpec;
  /** Extra exports of the unit's own module that name one of its variants. */
  readonly localAliases?: readonly ConstAlias[];
}

export interface IconUnitMeta extends ArtworkFields {
  readonly kind: 'icon';
}

export interface CustomUnitMeta extends ArtworkFields {
  readonly kind: 'custom';
}

export interface ReexportUnitMeta extends UnitBase {
  readonly kind: 'reexport';
  readonly reexport: ReexportSpec;
}

export interface AliasUnitMeta extends UnitBase {
  readonly kind: 'alias';
  readonly aliasConst: AliasConstSpec;
}

export type UnitMeta =
  | IconUnitMeta
  | CustomUnitMeta
  | ReexportUnitMeta
  | AliasUnitMeta;

export type ArtworkUnitMeta = IconUnitMeta | CustomUnitMeta;

export function isArtwork(meta: UnitMeta): meta is ArtworkUnitMeta {
  return meta.kind === 'icon' || meta.kind === 'custom';
}

/** Validates `value`; `path` locates it as `<file>: <field path>`. */
type Check = (value: unknown, path: string) => void;

/** Marks a field that may be absent. */
interface Optional {
  readonly optional: Check;
}

type OptionalKeys<T> = {
  [K in keyof T]-?: object extends Pick<T, K> ? K : never;
}[keyof T];

/**
 * One check per field of `T`, optional fields wrapped in `{ optional }`, so a
 * schema cannot miss, invent, or mis-mark a field of the type it validates.
 */
type Schema<T> = {
  readonly [K in Exclude<keyof T, OptionalKeys<T>>]: Check;
} & { readonly [K in OptionalKeys<T>]-?: Optional };

function fail(path: string, expected: string): never {
  throw new Error(`${path} must be ${expected}`);
}

function field(path: string, key: string): string {
  if (!/^[A-Za-z_$][\w$]*$/.test(key)) {
    return `${path}[${JSON.stringify(key)}]`;
  }
  return path.endsWith(':') ? `${path} ${key}` : `${path}.${key}`;
}

const string: Check = (value, path) => {
  if (typeof value !== 'string') {
    fail(path, 'a string');
  }
};

function arrayOf(item: Check): Check {
  return (value, path) => {
    if (!isArray(value)) {
      fail(path, 'an array');
    }
    for (const [i, entry] of value.entries()) {
      item(entry, `${path}[${i}]`);
    }
  };
}

function recordOf(item: Check): Check {
  return (value, path) => {
    if (!isRecord(value)) {
      fail(path, 'an object');
    }
    for (const [key, entry] of Object.entries(value)) {
      item(entry, field(path, key));
    }
  };
}

function object<T>(schema: Schema<T>): Check {
  const fields: Readonly<Record<string, Check | Optional>> = schema;
  return (value, path) => {
    if (!isRecord(value)) {
      fail(path, 'an object');
    }
    for (const [key, spec] of Object.entries(fields)) {
      if (typeof spec === 'function') {
        spec(value[key], field(path, key));
      } else if (value[key] !== undefined) {
        spec.optional(value[key], field(path, key));
      }
    }
  };
}

const optional = (check: Check): Optional => ({ optional: check });

const strings = arrayOf(string);

const reexportSpec = object<ReexportSpec>({
  from: string,
  exports: arrayOf(object<ReexportName>({ of: string, as: string })),
});

const constAliases = arrayOf(
  object<ConstAlias>({
    name: string,
    target: string,
    deprecated: optional(string),
  }),
);

const BASE: Schema<UnitBase> = {
  name: string,
  source: optional(strings),
  notes: optional(strings),
};

const ARTWORK: Schema<ArtworkFields> = {
  ...BASE,
  variants: recordOf(object<Variant>({ file: string, fill: optional(string) })),
  deprecated: optional(recordOf(string)),
  aliases: optional(strings),
  reexport: optional(reexportSpec),
  localAliases: optional(constAliases),
};

const CHECKS: Readonly<Record<UnitMeta['kind'], Check>> = {
  icon: object<IconUnitMeta>({ ...ARTWORK, kind: string }),
  custom: object<CustomUnitMeta>({ ...ARTWORK, kind: string }),
  reexport: object<ReexportUnitMeta>({
    ...BASE,
    kind: string,
    reexport: reexportSpec,
  }),
  alias: object<AliasUnitMeta>({
    ...BASE,
    kind: string,
    aliasConst: object<AliasConstSpec>({
      importFrom: string,
      imports: strings,
      exports: constAliases,
    }),
  }),
};

function isKind(kind: unknown): kind is UnitMeta['kind'] {
  return (
    kind === 'icon' ||
    kind === 'custom' ||
    kind === 'reexport' ||
    kind === 'alias'
  );
}

/**
 * Asserts that parsed JSON is a valid unit definition. The value is narrowed
 * in place (not copied), so its key order and any extra keys are preserved.
 *
 * @param file path used in error messages
 */
export function assertUnitMeta(
  value: unknown,
  file: string,
): asserts value is UnitMeta {
  if (!isRecord(value)) {
    fail(file, 'a JSON object');
  }
  const { kind } = value;
  if (!isKind(kind)) {
    fail(`${file}: kind`, `one of ${Object.keys(CHECKS).join(', ')}`);
  }
  CHECKS[kind](value, `${file}:`);
}
