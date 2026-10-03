# Contributing to React Web3 Icons

Thanks for your interest in contributing! This guide covers how to add icons, fix bugs, and get your changes merged.

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

## Getting Started

```sh
git clone https://github.com/derodero24/react-web3-icons.git
cd react-web3-icons
nvm install
pnpm install
```

### Prerequisites

- **Node.js** `^22.18.0 || >=24.11.0` (the range the build toolchain supports; `devEngines` in package.json enforces it for npm, the toolchain's own `engines` for pnpm)
- **pnpm** 10.x

Run `nvm install` before installing dependencies (reads `.nvmrc` and installs/activates the required Node version if missing).
`pnpm install` fails fast on unsupported Node versions: the `prepare` script checks the range above (the build scripts
run through Node's built-in TypeScript type stripping), and `engine-strict=true` enforces the toolchain dependencies'
own `engines`.

### Useful Commands

| Command                | Description                     |
| ---------------------- | ------------------------------- |
| `pnpm run lint`        | Run Biome linter                |
| `pnpm run lint:fix`    | Auto-fix lint and format issues |
| `pnpm run typecheck`   | Type-check all TS projects      |
| `pnpm test`            | Run tests                       |
| `pnpm run build`       | Build the package               |
| `pnpm run new-icon`    | Scaffold a new icon component   |
| `pnpm run generate-icons` | Regenerate `src/` (icons, meta, deprecated set, manifest) from `icons/` (`--check`: verify only) |
| `pnpm run optimize:svg`| Optimize an SVG with SVGO       |
| `pnpm run check:svgo`  | List icon SVGs SVGO would still change |

## Project Structure

```text
src/
  bridge/       # Cross-chain bridge icons (Across, LayerZero, etc.)
  chain/        # L1/L2 blockchain icons (Ethereum, Arbitrum, etc.)
  coin/         # Cryptocurrency icons (Bitcoin, Doge, etc.)
  defi/         # DeFi protocol icons (Aave, EigenLayer, Lido)
  devtool/      # Developer tool icons
  dex/          # DEX icons (Uniswap, SushiSwap, etc.)
  domain/       # Domain service icons
  exchange/     # Exchange icons
  explorer/     # Block explorer icons
  marketplace/  # NFT marketplace icons
  node/         # Node provider icons
  portfolio/    # Portfolio tracker icons
  storage/      # Decentralized storage icons
  tracker/      # Analytics/tracker icons
  wallet/       # Wallet icons (MetaMask, Phantom, etc.)
  utils/        # Shared types (IconProps)
  index.ts      # Public exports (re-exports all categories)
scripts/        # Icon pipeline and tooling (TypeScript, run directly by Node)
example/        # Next.js demo app
test/           # Vitest test suite
```

The scripts under `scripts/` are plain TypeScript executed by Node's built-in
type stripping (`node scripts/<name>.ts`, no build step), so they may only use
erasable syntax (no `enum`, `namespace`, or parameter properties) and import
relative modules with an explicit `.ts` extension. `scripts/tsconfig.json`
type-checks them with the same `strictest` settings as `src`.

## Adding a New Icon

Icons are **SVG-first**: the source of truth is the `icons/` tree, and the React
components under `src/<category>/` are generated from it. Never edit generated
`.tsx` files by hand — a sync test will fail. The three hand-written exceptions
(`Avalanche`, `Bybit`, `RainbowWallet`, marked `"kind": "custom"`) are the only
icon modules maintained as TSX.

### Quick Start (Scaffolding)

```sh
pnpm run new-icon --category <category> --name <PascalName> --svg path/to/icon.svg \
  [--mono path/to/icon.mono.svg] [--source <official URL>]
```

This optimizes the SVG with SVGO, normalizes the root element (sizing and
metadata attributes are dropped; inherited presentation attributes such as a
root `stroke` move onto a wrapping `<g>`), writes `icons/<category>/<slug>.svg`
and `<slug>.json`, and regenerates `src/` (the input SVGs are only read,
never modified). Follow the printed next steps (lookup keys, changeset).

### Anatomy of an icon unit

```
icons/chain/ethereum.svg          # colored artwork (root: xmlns + viewBox [+ fill])
icons/chain/ethereum.mono.svg     # monochrome artwork (fill="currentColor")
icons/chain/ethereum.json         # metadata:
```

```json
{
  "name": "Ethereum",
  "kind": "icon",
  "source": ["https://ethereum.org"],
  "variants": {
    "": { "file": "ethereum.svg" },
    "Mono": { "file": "ethereum.mono.svg", "fill": "currentColor" }
  }
}
```

- `name` is the canonical PascalCase export name; each variant key is an export
  suffix (`""` → `Ethereum`, `"Mono"` → `EthereumMono`, `"CircleMono"` → `EthereumCircleMono`).
- Internal `id` attributes (masks, gradients, clip paths) can stay as plain
  static IDs in the SVG (`id="ethc-a"`). The generator rewrites them to
  `${_id}-ethc-a` in the TSX, where `_id` is the deterministic per-component
  prefix `w3i-<lowercased name>` that `createIcon` passes to the render
  function — so the DOM ends up with `w3i-ethereumcirclemono-ethc-a`.
- The root element may only carry `xmlns`, `viewBox`, and `fill`. No fixed
  `width`/`height`, no `<style>` tags, no text content.
- Every `url(#…)` / `href="#…"` must point at an `id` defined in the same
  file, and ids must be unique within it; the generator fails otherwise.
- `deprecated` (map of export name → message) marks deprecated artwork exports.
  Together with the deprecated `aliasConst` / `localAliases` entries it is the
  source of `DEPRECATED_ICON_NAMES` (`src/deprecated.ts`, generated).
- The manifest's `brandColor` is derived from the colored default artwork:
  the most frequent fill/stroke/stop-color that is not neutral (greys,
  near-black, near-white); a neutral is used only when the artwork has no
  other colour. When that still misses the brand (e.g. a near-black logomark
  whose brand accent is a colour), set `"brandColor": "#rrggbb"` from the
  official palette and cite it in `notes` (see `icons/oracle/pyth.json`).
  Genuinely black-and-white marks (Aptos, Hedera) keep their neutral colour.
- Unit files are validated strictly (unknown keys are errors, names must be
  PascalCase identifiers, comments single-line). `icons/schema.json` is the
  matching JSON Schema, generated from `scripts/build-icons/unit.ts`; add
  `"$schema": "../schema.json"` to a unit (`new-icon` does) for editor
  completion and validation.

### Lookup keys vs. search aliases

`icons/` is the only source of the identifier data in `src/meta`,
`src/manifest` and the dynamic components; never edit those generated files.
A unit declares two different kinds of names:

- **Lookup keys** are exact identifiers that `react-web3-icons/meta` and the
  dynamic components (`<ChainIcon name>`, `<CoinIcon symbol>`, …) resolve to
  the unit's export. Which ones a unit may declare depends on its category:

  | Category | Field | Map |
  | --- | --- | --- |
  | `chain` | `chainIds` (EVM chain IDs), `slugs` | `CHAIN_ID_TO_NAME`, `CHAIN_SLUG_TO_NAME` |
  | `coin` | `tickers` (uppercase) | `TICKER_TO_COIN` |
  | `wallet`, `exchange`, `defi`, `dex`, `bridge`, `oracle` | `slugs` (lowercase kebab-case) | `<CATEGORY>_SLUG_TO_NAME` |

  Keys are never inferred from the file name or `name` (`coin/mon.json` is
  `Monad` with ticker `MON`; `coin/btc.json` is `Btc`), so every unit of
  these categories lists its keys explicitly — a test fails for any
  non-deprecated icon no key resolves to. A key must be unique within its
  map (the generator fails otherwise), may not point at a deprecated export,
  and the unit must also export `<Name>Mono`. Legacy names of a rebrand stay
  as extra keys on the new unit (`"slugs": ["kaia", "klaytn"]`); the first key
  of each field is the primary one the manifest lists. Keys of a non-default
  variant go in `variantLookups` (`"Nova": { "chainIds": [42170] }` →
  `ArbitrumNova`).
- **`aliases`** are extra lowercase search terms for the manifest (icon
  pickers, fuzzy search). They are never resolved by the dynamic components
  and need not be unique.

```json
{
  "name": "Kaia",
  "kind": "icon",
  "variants": { "": { "file": "kaia.svg" }, "Mono": { "file": "kaia.mono.svg", "fill": "currentColor" } },
  "slugs": ["kaia", "klaytn"],
  "chainIds": [8217]
}
```

### Aliases and re-exports

Ticker aliases and deprecated renames are JSON-only units:

```json
{
  "name": "Mtkn",
  "kind": "reexport",
  "reexport": {
    "from": "./MyToken",
    "exports": [
      { "of": "MyToken", "as": "Mtkn" },
      { "of": "MyTokenMono", "as": "MtknMono" }
    ]
  }
}
```

Deprecated aliases use `"kind": "alias"` with an `aliasConst` block so the
generator emits `/** @deprecated … */ export const Old = New;` (see
`icons/coin/matic.json` for a real example).

### Regenerating

```sh
pnpm run generate-icons  # icons/ → src/<category>/, src/dynamic/imports/, src/meta/,
                         #          src/deprecated.ts, src/manifest/, icons/schema.json
pnpm run build           # dist + static SVGs + Iconify JSON + manifest.json
```

The generator works from `icons/` alone (no build needed), computes every
file in memory before writing, rewrites only files whose content changed,
and deletes generated modules whose unit is gone. With `--check` it writes
nothing and exits 1 if anything would change; CI runs that, so a PR fails
when `icons/` *or* the generator changed without regenerating.
`test/icons-sync.test.ts` runs the same comparison locally,
`test/manifest-sync.test.ts` checks the manifest against the actual exports,
`test/meta.test.ts` checks that every icon is reachable through its lookup
keys, and the snapshot/visual suites verify rendered output.

## Icon Variant Naming Convention

Every icon export follows a `{Brand}{Variant}` pattern using PascalCase. The base name (no suffix) typically represents the **standalone branded symbol** without a background container — unless the brand's official assets always include a specific background, in which case the base includes it (see [Base icon background rule](#base-icon-background-rule) below). When no standalone variant exists in the official brand assets, the base name represents the primary brand mark.

### Variant Suffixes

| Suffix | Meaning | Example |
| --- | --- | --- |
| _(none)_ | Primary brand mark — standalone symbol without background in most cases; includes background when integral to the official brand mark (see [Base icon background rule](#base-icon-background-rule)) | `Bitcoin`, `ZkSync` |
| `Mono` | Monochrome (`currentColor`) matching the base shape | `BitcoinMono` |
| `Circle` | Symbol on a circular background | `BitcoinCircle` |
| `CircleMono` | Monochrome circular | `BitcoinCircleMono` |
| `Square` | Symbol on a square / rounded-rectangle background | `TrustWalletSquare` |
| `SquareMono` | Monochrome square | `TrustWalletSquareMono` |
| `Wordmark` | Symbol with text (logotype) | `MagicEdenWordmark` |
| `WordmarkMono` | Monochrome wordmark | `MagicEdenWordmarkMono` |
| `Alt` | Alternative color scheme or design | `MetaMaskAlt` |
| `Inverted` | Inverted color scheme for contrast on dark backgrounds | `EtherscanInverted` |
| `Light` | _(deprecated)_ Legacy lighter variant; only `BlastscanLight` remains active. Prefer `Inverted` for new icons. | `BlastscanLight` |
| `Flat` | Single brand color, no internal color variation | `ArbitrumOneFlat` |
| `Symbol` | Standalone symbol without container (when base has one) | `RainbowWalletSymbol` |
| `SymbolMono` | Monochrome standalone symbol without container | `OpenSeaSymbolMono` |

### Mono design rules

Every `*Mono` variant is judged against its colored counterpart. The goal is
that swapping colored → mono changes only the coloring, never the impression:

1. **Same silhouette**: the mono covers the same footprint as the colored
   variant at the same scale in the same viewBox. If the colored artwork has a
   container (circle / rounded square / shield), the mono keeps it: render the
   container filled in `currentColor` and knock the glyph out (a single
   `fill-rule="evenodd"` path is the preferred form). Never reduce a filled
   container to an outline ring, and never drop the container entirely — that
   is what the `Symbol` / `SymbolMono` variants are for.
2. **One color only**: monos use `currentColor` exclusively — no fixed fills,
   no grays. Prefer binary ink (fill or hole); translucent `currentColor`
   shading is acceptable only where the mark's structure genuinely needs it
   (e.g. distinguishing cube faces), never to imitate decorative gradients.
3. **Keep identifying detail**: facial features, letterforms, and other
   details that make the mark recognizable must survive; decorative gradients
   and shading may be dropped. If a detail can't be expressed in one color,
   simplify it rather than delete it.
4. **Verify both polarities**: check the mono on white *and* on a dark
   background (`color` set to a light value) before submitting.

`node scripts/audit-mono.ts` rasterizes every colored/mono pair and reports
outliers — run it after adding or reworking mono artwork. Besides silhouette
IoU / ink ratio / edge-detail ratio, it binarizes the colored artwork by
luminance (best-threshold sweep) and reports the pixel disagreement with the
mono (`refMiss`); a high value means the mono departs from a straight
black-and-white reading of the original. When subject and background
luminance are too close the reference is reported as `degenerate` — judge
those icons visually instead. Intentional rendering changes to existing icons
need the `visual-baseline-update` label on the PR so the visual-regression
job regenerates baselines instead of comparing against develop.

### Rules

1. **Base = standalone**: The unsuffixed name is always the standalone symbol. If the brand's primary mark is a circle (e.g., OpenSea ship on blue circle), the base name keeps the circle shape and `SymbolMono` provides the symbol-only mono variant.
2. **Mono mirrors its base**: `FooMono` matches `Foo`'s shape; `FooCircleMono` matches `FooCircle`'s shape.
3. **No numeric suffixes**: Never use `Foo2`, `Foo3`, etc. Use descriptive suffixes that convey the visual difference.
4. **Flat vs Alt**: Use `Flat` when the difference is strictly single-color simplification. Use `Alt` for a meaningfully different design or color scheme.
5. **Inverted**: Reserved for variants where the artwork colors are inverted for contrast on dark backgrounds. The shape and layout are identical to the base.

### Base icon background rule

Whether the base icon (`Foo`) includes a background container depends on the official brand assets:

- **Include the background in the base variant** when the brand's official icon is always presented with a specific background (colored square, circle, or rounded rectangle) in all official assets — the background is integral to the brand mark.

  _Examples_: `ZkSync` (black square), `Scroll` (beige rectangle), `Mantle` (black circle), `Linea` (black rectangle)

  In these cases, do **not** add a separate `FooCircle`/`FooSquare` variant unless the mark also officially exists without a background.

- **Omit the background from the base variant** when the brand provides a standalone icon mark (no background). The base icon (`Foo`) contains only the mark. Add `FooCircle` and/or `FooSquare` variants when a background container is needed.

  _Examples_: `Coinbase` (C mark only) + `CoinbaseCircle`; `Avalanche` (A mark) + `AvalancheCircle`

When in doubt, consult the brand's official press kit or design guidelines. If the official assets show the mark both with and without a background, use the standalone mark as the base and add Circle/Square variants for the backgrounded versions.

## Icon Lifecycle Policy

Use this policy when an icon project rebrands or an export name must change.

### Rename strategy

- The current official name becomes the canonical export (for example, `Safe`).
- The previous public name remains as a re-export alias in the same category (for example, `GnosisSafe`).
- Alias exports must include ``/** @deprecated Use `NewName` instead. */`` JSDoc comments.
- Keep behavior identical by re-exporting the canonical component instead of duplicating SVG markup.
- Mark the alias exports `deprecated` in the unit JSON; the generator adds them to `DEPRECATED_ICON_NAMES` (`src/deprecated.ts`) so consuming apps can filter them automatically.
- Move the old lookup keys (slugs, tickers, chain IDs) to the canonical unit as extra keys; lookup keys may not point at deprecated exports.

### Deprecation and removal timing

- Keep deprecated aliases for at least one minor release and at least 90 days after deprecation starts.
- Remove deprecated aliases only in a major release.
- When removing aliases, include a clear breaking-change entry in the changeset and changelog.

### Release note requirements

For each rename/deprecation PR, include:

- Rename mapping (`OldName` -> `NewName`)
- The version/date when deprecation starts
- The earliest planned major version for alias removal
- Any category path changes (if applicable)

### Test requirements

Rename/deprecation PRs should prove backward compatibility before merge.
For intentional breaking renames in a major release, document the exception in the changeset/changelog:

- Export presence tests for both old and new names (`test/exports.test.ts`)
- Alias equality tests showing identical rendered SVG (`test/aliases.test.tsx`)
- Existing category snapshot/render tests still passing

### Existing examples in this repository

- `src/wallet/Safe.tsx` is canonical, and `src/wallet/GnosisSafe.tsx` provides deprecated aliases.
- `src/coin/Pol.tsx` is canonical, and `src/coin/Matic.tsx` provides deprecated aliases.

## SVG Optimization Pipeline

When adding a new icon, follow this workflow:

```text
1. Source the SVG  →  2. Scaffold (SVGO + icons/ + generated TSX)  →  3. Add variants  →  4. Review the generated output  →  5. Visual QA
```

Everything under `src/<category>/` is generated from `icons/`; the only manual
artifacts are the SVG files and the unit JSON. The exception is the handful of
`"kind": "custom"` units (`Avalanche`, `Bybit`, `RainbowWallet`): their TSX is
hand-maintained and skipped by the TSX generator, but their SVGs in `icons/`
are still real inputs — the build copies them into `dist/svg` and the Iconify
collections. `test/icons-sync.test.ts` only checks that every declared variant
is exported from the TSX, not that the geometry matches, so when you touch a
custom unit update the SVG and the TSX together and verify them visually.

### 1. Source the SVG

Download from the project's official brand kit, GitHub repository, or press page. Always use the original vector file — never trace a raster image.

### Source Attribution (Required)

Every new unit records where its artwork came from in the `source` array of
`icons/<category>/<slug>.json` (pass `--source` to `pnpm run new-icon`, or edit
the JSON). For generated units the generator emits it as a `// Source:` comment
right after the imports in the `.tsx`, so `grep -r "// Source:" src/` still
works for audits — never edit that comment by hand; change the JSON and
regenerate. For `"kind": "custom"` units, keep the `// Source:` comment in the
hand-written TSX yourself. A few older units predate the `source` field; add it
when you touch them.

```json
{
  "name": "MyToken",
  "source": ["https://github.com/org/repo/blob/main/logo.svg"],
  "kind": "icon",
  "variants": { "": { "file": "my-token.svg" } }
}
```

| Case | Example `source` entry |
| --- | --- |
| Official SVG URL | `https://github.com/org/repo/blob/main/logo.svg` |
| Brand asset page (no direct URL) | `https://brand.uniswap.org (official brand kit)` |
| Third-party package (with license) | `@web3icons/react (MIT) — OSMO token SVG` |
| App/favicon asset | `https://app.eigenlayer.xyz/logo/markLightA.svg` |
| Hand-crafted / no public source | `hand-crafted — no public SVG; traced from https://...` |
| Re-export / alias unit (no own artwork) | `re-export of Bitcoin — see src/chain/Bitcoin.tsx` |

### Icon Authenticity Policy (Required)

To protect icon quality and brand fidelity, all icon additions/updates must follow these rules:

- **Use official sources only**: Brand kit, official website press page, or official organization repository.
- **No unofficial/community redraws**: If no official SVG exists, do not add the icon yet; open an issue and track it.
- **Document source of truth in PR**: Include official source URL(s), access date, and any usage/license notes.
- **Keep brand geometry and color identity**: Converted icon must visually match the official source.

Allowed transformations:

- SVGO optimization using this repository's `svgo.config.js` (done by `pnpm run new-icon`, or manually with `pnpm run optimize:svg`)
- Root-element normalization to `xmlns`, `viewBox`, and an optional `fill` (done by `pnpm run new-icon`)
- Internal id namespacing and JSX conversion, both performed by the generator
- Optional mono variants using `currentColor`

Prohibited transformations:

- Redrawing, tracing, or manually reshaping brand geometry
- Altering brand colors/gradients/strokes in the default icon variant
- Mixing logo elements from different logo versions/brands
- "Stylizing" official marks to make them look different from the source

### 2. Scaffold the unit

```sh
pnpm run new-icon --category <category> --name <PascalName> --svg path/to/icon.svg \
  --source <official URL> [--mono path/to/icon.mono.svg]
```

`--source` is technically optional for the script, but omitting it leaves the
unit without the required attribution (and the generated TSX without its
`// Source:` comment), so always pass it or add `source` to the JSON before
regenerating.

This runs SVGO with the bundled configuration (removes metadata, strips fixed
dimensions, keeps brand colors, ids, and multi-colored paths), normalizes the
root element, writes `icons/<category>/<slug>.svg` (+ `.mono.svg`) and
`<slug>.json`, and regenerates `src/`. Follow the printed next steps
(lookup keys, changeset).

To optimize an SVG without scaffolding a unit:

```sh
pnpm run optimize:svg path/to/icon.svg      # one file
pnpm run optimize:svg -r path/to/svgs/      # a directory
```

`pnpm run check:svgo [files…]` lists icon sources that SVGO would still change
(ignoring attribute order and whitespace). Many older sources predate the
current configuration and are not normalized; check the files you add or
touch.

### 3. Add variants

Each key in the unit's `variants` map is an export suffix backed by one SVG
file. For generated (`"kind": "icon"`) units, mono variants set
`"fill": "currentColor"` (or `"none"` for stroke-only artwork) and that value
becomes the default `fill` on the rendered `<svg>`; custom units handle it in
their hand-written TSX.

#### Circle / Square Variants

To add a Circle (or Square) variant, create 64×64 SVG files with a branded
background and the mark scaled to ~72% fill, then register them:

`icons/chain/my-token.circle.svg` (no XML comments — the pipeline's SVG parser
rejects them):

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <circle cx="32" cy="32" r="32" fill="#brandColor"/>
  <path transform="translate(9 9) scale(1.917)" d="M10 2 L20 22 ..." fill="#fff"/>
</svg>
```

`icons/chain/my-token.circle-mono.svg`:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="currentColor">
  <circle cx="32" cy="32" r="32" mask="url(#mtc-a)"/>
  <defs>
    <mask id="mtc-a">
      <rect width="100%" height="100%" fill="#fff"/>
      <path transform="translate(9 9) scale(1.917)" d="M10 2 L20 22 ..." fill="#000"/>
    </mask>
  </defs>
</svg>
```

```json
"variants": {
  "": { "file": "my-token.svg" },
  "Mono": { "file": "my-token.mono.svg", "fill": "currentColor" },
  "Circle": { "file": "my-token.circle.svg" },
  "CircleMono": { "file": "my-token.circle-mono.svg", "fill": "currentColor" }
}
```

Key points:

- Use `viewBox="0 0 64 64"` for all Circle/Square variants
- Colored variant: brand color background + white icon mark
- Mono variant: `currentColor` circle + mask that punches out the icon mark
- For icons with gradients, **pre-compute** gradient coordinates in the 64×64 space — do **not** use `gradientTransform`
- Short static IDs (`mtc-a`) are fine; the generator namespaces them per icon
- Record the scale/translate math in the unit's `notes` array (see `icons/chain/ethereum.json`) so the next person can reproduce it

### 4. Review the generated output

After `pnpm run generate-icons`, open `src/<category>/<Name>.tsx` and check:

- The `// Source:` comment and the `/* @__PURE__ */` annotation are present (both emitted by the generator; `test/pure-annotations.test.ts` enforces the latter)
- Internal IDs were rewritten to `${_id}-…` references (rendered as `w3i-<name>-…`, see "Anatomy of an icon unit") and every `url(#…)` / `href="#…"` still resolves
- Mono variants: stroke-only elements carry `fill="none"` and no hardcoded color remains where `currentColor` should be inherited

Fix problems in the SVG source (or the JSON) and regenerate — never edit the
generated `.tsx`; `test/icons-sync.test.ts` fails when `icons/` and `src/`
drift.

### 5. Visual QA

Run the example app and verify:

- Icon renders correctly at multiple sizes (16px, 24px, 48px)
- Colors match the official brand
- Mono variant works with different CSS `color` values
- No visual artifacts in dark mode / light mode

## SVG Guidelines

- **Use `viewBox`** instead of fixed `width`/`height` in the SVG source. The component sets `width="1em"` and `height="1em"` as defaults.
- **Avoid `<style>` tags** inside SVGs. Use inline `style` props or direct fill/stroke attributes instead.
- **Static IDs are fine in the SVG source** (`id="mtc-a"`). The generator rewrites them to `${_id}-mtc-a` (`_id` = `w3i-<lowercased component name>`), so different icons on the same page never collide. Rendering the same component twice repeats its ids with identical definitions, which is a documented trade-off of the deterministic prefix (see `createIcon`) and does not affect rendering.
- **Repeated geometry belongs in the SVG source**, not in the TSX. Variants that share a mark keep one copy per SVG file; document the shared transform in the unit's `notes` so the copies can be kept in sync. Do not hand-edit generated `.tsx` files to extract constants.

## Running the Example App

The `example/` directory contains a Next.js app for browsing icons. To run it locally:

```sh
cd example
pnpm install
pnpm dev
```

This is useful for visually verifying new icons after adding them.

## Code Style

This project uses [Biome](https://biomejs.dev/) for linting and formatting. Run `pnpm run lint:fix` before committing. Git hooks (via [Lefthook](https://github.com/evilmartians/lefthook)) automatically check staged files on commit and run the full lint/test/build suite on push.

### Commit messages

Commit messages must follow the [Conventional Commits](https://www.conventionalcommits.org/) format:

```text
type(optional-scope): description
```

Common types: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `ci`, `perf`, `build`, `style`, `revert`.

The `commit-msg` hook validates this automatically via [commitlint](https://commitlint.js.org/).

## Bundle Size Limits

The `size-limit` entries in `package.json` are checked by `pnpm run size` and
the Size workflow on every PR. Every limit follows one headroom policy:

> limit = current size + max(10%, 1 kB), rounded up to the next whole kB
> (next 5 kB above 50 kB)

When an entry fails, re-measure with `pnpm run build && pnpm run size` and
recompute **all** entries with the formula in a single `chore` change rather
than nudging one limit inside an icon PR.

## Submitting a Pull Request

1. Fork the repository and create a feature branch from `develop`
2. Make your changes and ensure all checks pass:
   ```sh
   pnpm run lint
   pnpm test
   pnpm run build
   ```
3. If your change affects the published library (new icons, bug fixes, API changes), add a changeset:

   ```sh
   pnpm changeset
   ```

   Follow the prompts to select the semver bump type (patch, minor, or major) and describe the change.

4. Write a clear commit message (e.g., `feat(coin): add MyToken icon`)
5. Open a pull request against `develop`
