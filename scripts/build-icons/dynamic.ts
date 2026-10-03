/**
 * What the dynamic components (`react-web3-icons/dynamic`) can render, per
 * category, derived from the lookup keys of the units:
 *
 *   src/dynamic/imports/<cat>.ts    the per-icon lazy import map, plus the
 *                                   category's `variant` values (list and
 *                                   literal union type)
 *
 * A component resolves an identifier to a lookup target (the export a key
 * names, e.g. `Ethereum` or `ArbitrumNova`) and appends the suffix of the
 * requested variant (`colored` → `''`, `mono` → `'Mono'`, `'Circle'` →
 * `'Circle'`, …). A target's variants are the unit's exports that start
 * with its name, minus those of a longer target of the same unit
 * (`ArbitrumNovaMono` belongs to `ArbitrumNova`, not to `Arbitrum`).
 *
 * The import map lists exactly the exports reachable that way, so it holds
 * no dead entries; deprecated exports are left out (no key may target
 * them). The generator fails when a non-deprecated export is unreachable
 * (unless it is the same component as a reachable one, like coin `Flare` /
 * `Flr`), and when a target plus a category variant would name an export of
 * another target.
 */

import {
  CATEGORY_LABEL,
  type Category,
  compareStrings,
  type SourceUnit,
  unitAllExportNames,
  unitLinks,
} from './lib.ts';
import { deprecatedExports, lookupTargets } from './meta.ts';

/** Suffixes of the `'colored'` and `'mono'` variants. */
const DEFAULT_SUFFIXES: readonly string[] = ['', 'Mono'];

/** One export the dynamic components can render. */
interface Reachable {
  /** The lookup target it is a variant of. */
  readonly target: string;
  readonly suffix: string;
  /** Module (unit name) that exports it. */
  readonly module: string;
}

export interface DynamicCategory {
  readonly category: Category;
  /** Reachable export name → how it is reached, sorted by export name. */
  readonly exports: ReadonlyMap<string, Reachable>;
  /**
   * Suffixes `variant` accepts besides `'colored'` (`''`) and `'mono'`
   * (`'Mono'`), sorted.
   */
  readonly variants: readonly string[];
}

/**
 * The target an export of the unit belongs to: the longest target name it
 * starts with at a word boundary, or undefined.
 */
function targetOf(
  exportName: string,
  targets: readonly string[],
): string | undefined {
  return targets
    .filter(
      target =>
        exportName.startsWith(target) &&
        /^(?:[A-Z].*)?$/.test(exportName.slice(target.length)),
    )
    .sort((a, b) => b.length - a.length)[0];
}

/** Non-deprecated exports of the unit, by the target they belong to. */
function unitReachable(unit: SourceUnit): {
  reachable: Map<string, Reachable>;
  unreachable: string[];
} {
  const targets = lookupTargets(unit);
  const deprecated = new Set(deprecatedExports(unit));
  const reachable = new Map<string, Reachable>();
  const unreachable: string[] = [];
  for (const name of unitAllExportNames(unit)) {
    if (deprecated.has(name)) {
      continue;
    }
    const target = targetOf(name, targets);
    if (target === undefined) {
      unreachable.push(name);
    } else {
      reachable.set(name, {
        target,
        suffix: name.slice(target.length),
        module: unit.meta.name,
      });
    }
  }
  return { reachable, unreachable };
}

/**
 * Whether `name` is another name of a reachable export of the category: an
 * alias or re-export of one (`Flr` → `Flare`), or one that it aliases.
 */
function isAliasOfReachable(
  name: string,
  units: readonly SourceUnit[],
  reachable: ReadonlyMap<string, Reachable>,
): boolean {
  return units.some(unit =>
    unitLinks(unit).some(
      link =>
        !link.deprecated &&
        link.targetCategory === unit.category &&
        ((link.name === name && reachable.has(link.targetName)) ||
          (link.targetName === name && reachable.has(link.name))),
    ),
  );
}

/**
 * Fails when a target plus one of the category's variant suffixes names an
 * export of another target: `variant` would then reach the wrong icon.
 */
function assertUnambiguous(
  exports: ReadonlyMap<string, Reachable>,
  suffixes: readonly string[],
): void {
  const targets = new Set([...exports.values()].map(r => r.target));
  for (const target of targets) {
    for (const suffix of suffixes) {
      const hit = exports.get(target + suffix);
      if (hit && hit.target !== target) {
        throw new Error(
          `${hit.module}: ${target} + variant "${suffix}" names ${target + suffix}, a variant of ${hit.target}; rename the export or the target`,
        );
      }
    }
  }
}

/** Everything the dynamic component of `category` can render. */
export function collectDynamic(
  category: Category,
  units: readonly SourceUnit[],
): DynamicCategory {
  const own = units.filter(unit => unit.category === category);
  const exports = new Map<string, Reachable>();
  const unreachable: { name: string; path: string }[] = [];
  for (const unit of own) {
    const result = unitReachable(unit);
    for (const [name, reachable] of result.reachable) {
      exports.set(name, reachable);
    }
    unreachable.push(
      ...result.unreachable.map(name => ({ name, path: unit.path })),
    );
  }
  for (const { name, path } of unreachable) {
    if (!isAliasOfReachable(name, own, exports)) {
      throw new Error(
        `${path}: ${name} is not reachable through the dynamic components; give it lookup keys (variantLookups for a variant group) or deprecate it`,
      );
    }
  }
  const suffixes = [...new Set([...exports.values()].map(r => r.suffix))].sort(
    compareStrings,
  );
  assertUnambiguous(exports, suffixes);
  return {
    category,
    exports: new Map([...exports].sort(([a], [b]) => compareStrings(a, b))),
    variants: suffixes.filter(s => !DEFAULT_SUFFIXES.includes(s)),
  };
}

const pascal = (category: Category): string =>
  category.charAt(0).toUpperCase() + category.slice(1);

/** Source of `src/dynamic/imports/<category>.ts` (before Biome formatting). */
export function emitDynamicImports({
  category,
  exports,
  variants,
}: DynamicCategory): string {
  const component = `${pascal(category)}Icon`;
  const label = CATEGORY_LABEL[category];
  const entries = [...exports].map(
    ([name, { module }]) =>
      `  ${name}: () => import('../../${category}/${module}'),`,
  );
  const variantType = ["'colored'", "'mono'", ...variants.map(v => `'${v}'`)]
    .map(v => `\n  | ${v}`)
    .join('');
  return `// Auto-generated by scripts/build-icons/cli.ts — do not edit manually.
// Regenerate: pnpm run generate-icons
// biome-ignore-all lint/style/useNamingConvention: keys are icon export names (PascalCase)

/**
 * Per-icon lazy import map for the ${label} category: every export
 * \`<${component}>\` can render (a lookup target plus a variant suffix),
 * and nothing else.
 */
export const ${category}Imports: Record<
  string,
  () => Promise<Record<string, unknown>>
> = {
${entries.join('\n')}
};

/**
 * Variant suffixes \`<${component} variant>\` accepts besides \`'colored'\`
 * and \`'mono'\`: every one that some ${label} icon ships.
 */
export const ${category}Variants: readonly string[] = [${variants.map(v => `'${v}'`).join(', ')}];

/**
 * \`variant\` of \`<${component}>\`: \`'colored'\` (the default) and \`'mono'\`,
 * plus every variant suffix some ${label} icon ships. An icon without
 * the requested variant renders \`fallback\`.
 */
export type ${pascal(category)}Variant =${variantType};
`;
}
