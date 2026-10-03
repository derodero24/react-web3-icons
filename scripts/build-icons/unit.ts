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
 * Validation is strict: every field is checked for its shape and, since
 * values are interpolated into generated TypeScript, for a safe spelling
 * (identifiers, module specifiers, single-line comments); unknown keys are
 * errors, so a typo fails with the file and field instead of being ignored.
 *
 * The same rules describe themselves as JSON Schema: `pnpm run
 * generate-icons` writes `icons/schema.json` from `UNIT_JSON_SCHEMA` for
 * editor support, so the schema cannot disagree with this validator.
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

/** Path of the JSON Schema, relative to a unit file. */
export const SCHEMA_REF = '../schema.json';

interface UnitBase {
  /** Optional editor hint; always {@link SCHEMA_REF}. */
  readonly $schema?: typeof SCHEMA_REF;
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

/** A JSON value, as written to the schema file. */
export type Json =
  | string
  | number
  | boolean
  | null
  | readonly Json[]
  | { readonly [key: string]: Json };

type JsonObject = { readonly [key: string]: Json };

/** A validator together with its JSON Schema description. */
interface Rule {
  /** Throws when `value` is invalid; `path` locates it as `<file>: <field>`. */
  readonly check: (value: unknown, path: string) => void;
  readonly schema: JsonObject;
}

/** Marks a field that may be absent. */
interface Optional {
  readonly optional: Rule;
}

type OptionalKeys<T> = {
  [K in keyof T]-?: object extends Pick<T, K> ? K : never;
}[keyof T];

/**
 * One rule per field of `T`, optional fields wrapped in `{ optional }`, so a
 * schema cannot miss, invent, or mis-mark a field of the type it validates.
 */
type Schema<T> = {
  readonly [K in Exclude<keyof T, OptionalKeys<T>>]: Rule;
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

/** A string matching `pattern`, which must be anchored (`^…$`). */
function text(pattern: RegExp, description: string): Rule {
  return {
    check: (value, path) => {
      if (typeof value !== 'string') {
        fail(path, 'a string');
      }
      if (!pattern.test(value)) {
        fail(path, `${description}, got ${JSON.stringify(value)}`);
      }
    },
    schema: { type: 'string', pattern: pattern.source, description },
  };
}

function literal(value: string): Rule {
  return {
    check: (actual, path) => {
      if (actual !== value) {
        fail(path, JSON.stringify(value));
      }
    },
    schema: { const: value },
  };
}

function arrayOf(item: Rule): Rule {
  return {
    check: (value, path) => {
      if (!isArray(value)) {
        fail(path, 'an array');
      }
      for (const [i, entry] of value.entries()) {
        item.check(entry, `${path}[${i}]`);
      }
    },
    schema: { type: 'array', items: item.schema },
  };
}

/** An object used as a map: arbitrary keys matching `key`, `item` values. */
function recordOf(key: Rule, item: Rule): Rule {
  return {
    check: (value, path) => {
      if (!isRecord(value)) {
        fail(path, 'an object');
      }
      for (const [name, entry] of Object.entries(value)) {
        key.check(name, `${path} key ${JSON.stringify(name)}`);
        item.check(entry, field(path, name));
      }
    },
    schema: {
      type: 'object',
      propertyNames: key.schema,
      additionalProperties: item.schema,
    },
  };
}

function object<T>(schema: Schema<T>): Rule {
  const fields: Readonly<Record<string, Rule | Optional>> = schema;
  const entries = Object.entries(fields);
  const properties: Record<string, Json> = {};
  const required: string[] = [];
  for (const [key, spec] of entries) {
    if ('optional' in spec) {
      properties[key] = spec.optional.schema;
    } else {
      properties[key] = spec.schema;
      required.push(key);
    }
  }
  return {
    check: (value, path) => {
      if (!isRecord(value)) {
        fail(path, 'an object');
      }
      for (const key of Object.keys(value)) {
        if (!Object.hasOwn(fields, key)) {
          throw new Error(
            `${field(path, key)} is not a known key (expected one of ${Object.keys(fields).join(', ')})`,
          );
        }
      }
      for (const [key, spec] of entries) {
        if (!('optional' in spec)) {
          spec.check(value[key], field(path, key));
        } else if (value[key] !== undefined) {
          spec.optional.check(value[key], field(path, key));
        }
      }
    },
    schema: {
      type: 'object',
      properties,
      required,
      additionalProperties: false,
    },
  };
}

const optional = (rule: Rule): Optional => ({ optional: rule });

const identifier = text(/^[A-Z][A-Za-z0-9]*$/, 'a PascalCase identifier');
const moduleSpecifier = text(
  /^(?:\.\/|\.\.\/[a-z]+\/)[A-Z][A-Za-z0-9]*$/,
  'a module specifier like ./Name or ../category/Name',
);
/**
 * Emitted inside `// …` comments, so it must stay on one line. U+2028 and
 * U+2029 are JavaScript line terminators too and would end the comment.
 */
const lines = arrayOf(text(/^[^\r\n\u2028\u2029]*$/, 'a single line of text'));
/**
 * Emitted inside a `@deprecated` JSDoc block, so it must not close it. The
 * character class rejects every line terminator, so the `.*` lookahead (which
 * stops at one) always sees the whole message.
 */
const message = text(
  /^(?!.*\*\/)[^\r\n\u2028\u2029]+$/,
  'a non-empty single-line message without "*/"',
);

const reexportSpec = object<ReexportSpec>({
  from: moduleSpecifier,
  exports: arrayOf(object<ReexportName>({ of: identifier, as: identifier })),
});

const constAliases = arrayOf(
  object<ConstAlias>({
    name: identifier,
    target: identifier,
    deprecated: optional(message),
  }),
);

const BASE: Schema<UnitBase> = {
  $schema: optional(literal(SCHEMA_REF)),
  name: identifier,
  source: optional(lines),
  notes: optional(lines),
};

const ARTWORK: Schema<ArtworkFields> = {
  ...BASE,
  variants: recordOf(
    text(/^(?:[A-Z][A-Za-z0-9]*)?$/, 'an empty or PascalCase variant suffix'),
    object<Variant>({
      file: text(/^[a-z0-9][a-z0-9.-]*\.svg$/, 'a sibling .svg file name'),
      fill: optional(
        text(
          /^(?:none|currentColor|#(?:[0-9A-Fa-f]{3,4}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8}))$/,
          'none, currentColor, or a hex color',
        ),
      ),
    }),
  ),
  deprecated: optional(recordOf(identifier, message)),
  aliases: optional(
    arrayOf(text(/^[a-z0-9][a-z0-9 .-]*$/, 'a lowercase search term')),
  ),
  reexport: optional(reexportSpec),
  localAliases: optional(constAliases),
};

const RULES: Readonly<Record<UnitMeta['kind'], Rule>> = {
  icon: object<IconUnitMeta>({ ...ARTWORK, kind: literal('icon') }),
  custom: object<CustomUnitMeta>({ ...ARTWORK, kind: literal('custom') }),
  reexport: object<ReexportUnitMeta>({
    ...BASE,
    kind: literal('reexport'),
    reexport: reexportSpec,
  }),
  alias: object<AliasUnitMeta>({
    ...BASE,
    kind: literal('alias'),
    aliasConst: object<AliasConstSpec>({
      importFrom: moduleSpecifier,
      imports: arrayOf(identifier),
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
 * in place (not copied), so its key order is preserved.
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
    fail(`${file}: kind`, `one of ${Object.keys(RULES).join(', ')}`);
  }
  RULES[kind].check(value, `${file}:`);
}

/** JSON Schema (draft 2020-12) equivalent of {@link assertUnitMeta}. */
export const UNIT_JSON_SCHEMA = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  title: 'react-web3-icons icon unit',
  description:
    'icons/<category>/<slug>.json. Generated from scripts/build-icons/unit.ts by `pnpm run generate-icons`; do not edit.',
  oneOf: Object.values(RULES).map(rule => rule.schema),
} satisfies JsonObject;
