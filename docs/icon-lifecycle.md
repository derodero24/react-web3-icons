# Icon Lifecycle Policy

Use this policy when an icon project rebrands, shuts down, or an export name
must change. It is part of the [contributing guide](../CONTRIBUTING.md).

## Rename strategy

- The current official name becomes the canonical export (for example, `Ready`).
- The previous public name remains as an alias in the same category (for example, `Argent`).
- Re-export the canonical component instead of duplicating SVG markup, so behavior stays identical. A rename is a JSON-only unit with `"kind": "alias"` and an `aliasConst` block (see [Aliases and re-exports](../CONTRIBUTING.md#aliases-and-re-exports)).
- Give every alias export a `deprecated` message (``"Use `Ready` instead."``). The generator emits it as a ``/** @deprecated Use `Ready` instead. */`` JSDoc comment and adds the export to `DEPRECATED_ICON_NAMES` (`src/deprecated.ts`), so consuming apps can filter it automatically.
- To deprecate artwork that has no direct rename (a brand that was succeeded or shut down), list the exports in the unit's `deprecated` map instead.
- Move the old lookup keys (slugs, tickers, chain IDs) and manifest `aliases` to the canonical unit as extra keys; lookup keys may not point at deprecated exports.

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

- `icons/wallet/ready.json` is canonical, and `icons/wallet/argent.json` generates the deprecated `Argent` / `ArgentMono` aliases (`src/wallet/Argent.tsx`) after the Argent → Ready rebrand.
- A rename that only changes letter case (`OKXWallet` → `OkxWallet`, `StarkNet` → `Starknet`) cannot get a module of its own, since `OKXWallet.tsx` and `OkxWallet.tsx` are one file on case-insensitive file systems. List the old names in the canonical unit's `localAliases` with a `deprecated` message instead (`icons/wallet/okx-wallet.json`); the generator gives them no `dist/svg` file or Iconify alias of their own.
- `icons/chain/fantom.json` deprecates the `Fantom` / `FantomMono` artwork through its `deprecated` map after the Fantom → Sonic rebrand, and `icons/coin/ftm.json` deprecates the `Ftm` / `FtmMono` aliases; `Sonic` / `SonicMono` replace them. `icons/defi/maker-dao.json` and `icons/coin/mkr.json` do the same for MakerDAO → Sky, and `icons/wallet/nami-wallet.json` for Nami → Lace (Nami was folded into Lace; its keys `nami` and `namiwallet` are slugs of `icons/wallet/lace.json`).
- `icons/dex/odos.json` deprecates artwork with no replacement: the message names the shutdown and its source.
