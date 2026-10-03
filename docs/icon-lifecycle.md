# Icon Lifecycle Policy

Use this policy when an icon project rebrands, shuts down, or an export name
must change. It is part of the [contributing guide](../CONTRIBUTING.md).

## Rename strategy

- The current official name becomes the canonical export (for example, `Safe`).
- The previous public name remains as an alias in the same category (for example, `GnosisSafe`).
- Re-export the canonical component instead of duplicating SVG markup, so behavior stays identical. A rename is a JSON-only unit with `"kind": "alias"` and an `aliasConst` block (see [Aliases and re-exports](../CONTRIBUTING.md#aliases-and-re-exports)).
- Give every alias export a `deprecated` message (``"Use `Safe` instead."``). The generator emits it as a ``/** @deprecated Use `Safe` instead. */`` JSDoc comment and adds the export to `DEPRECATED_ICON_NAMES` (`src/deprecated.ts`), so consuming apps can filter it automatically.
- To deprecate artwork that has no direct rename (a brand that was succeeded or shut down), list the exports in the unit's `deprecated` map instead.
- Move the old lookup keys (slugs, tickers, chain IDs) to the canonical unit as extra keys; lookup keys may not point at deprecated exports.

## Deprecation and removal timing

These rules apply to every deprecated export: aliases of a renamed unit and artwork deprecated through a unit's `deprecated` map (such as `Fantom`) alike.

- Keep a deprecated export for at least one minor release and at least 90 days after deprecation starts.
- Remove deprecated exports only in a major release.
- When removing deprecated exports, include a clear breaking-change entry in the changeset and changelog.

## Release note requirements

For each rename/deprecation PR, include:

- Rename mapping (`OldName` -> `NewName`)
- The version/date when deprecation starts
- The earliest planned major version for alias removal
- Any category path changes (if applicable)

## Test requirements

Rename/deprecation PRs should prove backward compatibility before merge.
For intentional breaking renames in a major release, document the exception in the changeset/changelog:

- Export presence tests for both old and new names (`test/exports.test.ts`)
- Alias equality tests showing identical rendered SVG (`test/aliases.test.tsx`)
- Existing category snapshot/render tests still passing

## Existing examples in this repository

- `icons/wallet/safe.json` is canonical, and `icons/wallet/gnosis-safe.json` generates the deprecated `GnosisSafe` / `GnosisSafeMono` aliases (`src/wallet/GnosisSafe.tsx`).
- `icons/coin/pol.json` is canonical, and `icons/coin/matic.json` generates the deprecated `Matic*` aliases.
- `icons/chain/fantom.json` deprecates the `Fantom` / `FantomMono` artwork through its `deprecated` map after the Fantom → Sonic rebrand, and `icons/coin/ftm.json` deprecates the `Ftm` / `FtmMono` aliases; `Sonic` / `SonicMono` replace them.
