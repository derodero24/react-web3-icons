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

- **Node.js** `^22.22.2 || ^24.15.0 || >=26.0.0`, as declared in `devEngines.runtime` in package.json. `.nvmrc` selects Node 24.
- **pnpm** 10.x (`packageManager` in package.json pins the exact version)

This is a contributor requirement only: the published package has no Node.js
requirement (see the README's install section).

Run `nvm install` before installing dependencies (reads `.nvmrc` and installs/activates the required Node version if missing).
`pnpm install` fails fast on unsupported Node versions: `engine-strict=true` in `.npmrc` enforces the toolchain
dependencies' own `engines`, and the `prepare` script checks the range above. The range is the intersection of those
`engines`: when a dependency raises its floor, raise it in `devEngines`, the `prepare` check, this section and the
`node-floor` job in `.github/workflows/main.yml` together (that job installs on the exact lower bounds).

`@types/node` stays on the lowest supported Node major (22), so `pnpm run typecheck` rejects Node APIs that the oldest
supported runtime lacks. A rule in `renovate.json` keeps it there; raise both together with the `devEngines` floor.

### Useful Commands

| Command | Description |
| --- | --- |
| `pnpm run check` | Lint and format check exactly as CI runs it (`biome ci --error-on-warnings`), then `check:svgo` |
| `pnpm run lint` | Run Biome (lint, format, import order) and report problems |
| `pnpm run lint:fix` | Apply Biome's safe fixes and formatting |
| `pnpm run format` | Format only |
| `pnpm run typecheck` | Type-check `src/`, `test/`, and `scripts/` (three tsconfig projects) |
| `pnpm test` | Run the unit tests (`pnpm test --coverage` enforces 100% coverage of `src/`, as CI does) |
| `pnpm run test:visual` | Visual-regression tests in headless Chromium (see [Visual QA](#5-visual-qa)) |
| `pnpm run test:visual:update` | Re-render the local visual baselines |
| `pnpm run build` | Build `dist/` (JS, types, static SVGs, Iconify JSON, `manifest.json`) |
| `pnpm run start` | Rebuild the library on change (`tsdown --watch`) |
| `pnpm run size` | Check the bundle-size budgets (needs a fresh `pnpm run build`) |
| `pnpm run analyze` | Show what makes up each size-limit entry (writes `esbuild-why-*.html` to the repo root and opens them; needs a fresh build) |
| `pnpm run new-icon` | Scaffold a new icon unit from an SVG |
| `pnpm run generate-icons` | Regenerate `src/` (icons, dynamic import maps, meta, deprecated set, `IconName` union, manifest) and `icons/schema.json` from `icons/` (`--check`: verify only) |
| `pnpm run showcase` | Re-render `image/icons.png`, the README's icon overview, from `icons/` |
| `pnpm run optimize:svg` | Optimize an SVG with SVGO |
| `pnpm run check:svgo` | List icon SVGs SVGO would still change (fails if any) |
| `pnpm changeset` | Add a changeset for a change to the published package |
| `pnpm run version-packages` | Run by the release workflow for the version PR: `changeset version`, then set every exact `react-web3-icons@X.Y.Z` in README.md, and the major in its unpinned-URL example, to the new version (see [docs/releasing.md](docs/releasing.md)) |

## Project Structure

```text
icons/            # Source of truth: SVG artwork + unit JSON per icon, by category
  schema.json     # JSON Schema for unit files (generated)
src/
  bridge/ … wallet/  # One directory per category (16): components generated from icons/
  dynamic/        # Lazy <ChainIcon>, <CoinIcon>, …; imports/ is generated
  meta/           # Lookup maps (CHAIN_ID_TO_NAME, TICKER_TO_COIN, …), generated
  manifest/       # ICON_MANIFEST catalog, generated
  utils/          # createIcon factory and the IconProps type
  deprecated.ts   # DEPRECATED_ICON_NAMES, generated
  icon-names.ts   # IconName union, generated
  index.ts        # Root entry: re-exports every category
scripts/
  build-icons/    # Generator (cli.ts) and the dist emitters (SVG, Iconify, manifest.json)
  new-icon.ts     # Scaffolds a unit (pnpm run new-icon)
  audit-mono.ts   # Mono-vs-colored quality audit
  check-svgo.ts   # Lists SVGs SVGO would still change
  check-sources.ts  # Reports dead or moved `source` URLs (monthly workflow)
  render-showcase.ts  # Renders image/icons.png (pnpm run showcase)
  size-report.ts  # Renders the size-limit PR comment
  changelog.ts    # Changelog generator for `changeset version` (.changeset/config.json)
  sync-readme-version.ts  # Sets README.md's react-web3-icons@X.Y.Z pins to package.json's version (pnpm run version-packages)
test/             # Vitest suites; visual/ (Playwright screenshots), consumer/ (packed-tarball fixtures for CI)
example/          # Next.js demo site (react-web3-icons.vercel.app), builds from src/
examples/
  stackblitz/     # Minimal Vite app behind the README's StackBlitz link; installs the published package
docs/             # Icon policies, Iconify collections, release process
```

`dist/` is the only project directory published (`files` in package.json); npm
also always includes `package.json`, `README.md` and `LICENSE`. `example/` is part of the
pnpm workspace; `examples/stackblitz/` is not: it installs `react-web3-icons`
from npm, so changes to `src/` show up there only after a release.

The scripts under `scripts/` are plain TypeScript executed by Node's built-in
type stripping (`node scripts/<name>.ts`, no build step), so they may only use
erasable syntax (no `enum`, `namespace`, or parameter properties) and import
relative modules with an explicit `.ts` extension. `scripts/tsconfig.json`
type-checks them with the same `strictest` settings as `src`.

## Adding a New Icon

Icons are **SVG-first**: the source of truth is the `icons/` tree, and the React
components under `src/<category>/` are generated from it. Never edit generated
`.tsx` files by hand — a sync test will fail. There are no hand-written icon
modules; icons with extra props (`withBackground`, `fill1`) declare them in
their unit JSON too (see [Extra props](#extra-props)).

### Quick Start (Scaffolding)

```sh
pnpm run new-icon --category <category> --name <PascalName> --svg path/to/icon.svg \
  [--mono path/to/icon.mono.svg] [--source <official URL>] \
  [--slug <slug>]... [--chain-id <id>]... [--ticker <TICKER>]...
```

This optimizes the SVG with SVGO, normalizes the root element (sizing and
metadata attributes are dropped; inherited presentation attributes such as a
root `stroke` move onto a wrapping `<g>`), puts the artwork on the 64×64 grid
(see [Optical size](#optical-size)), writes `icons/<category>/<slug>.svg`
and `<slug>.json`, and regenerates `src/` (the input SVGs are only read,
never modified). An icon of a category with a dynamic component (`bridge`,
`chain`, `coin`, `defi`, `dex`, `exchange`, `oracle`, `wallet`) needs
`--mono` and at least one [lookup key](#lookup-keys-vs-search-aliases):
`--ticker` for coin, `--slug` (or `--chain-id`) for chain, `--slug` for the
rest, each repeatable.
Follow the printed next steps (Mono variant, changeset).

### Anatomy of an icon unit

```
icons/chain/ethereum.svg          # colored artwork (root: xmlns + viewBox="0 0 64 64" [+ fill])
icons/chain/ethereum.mono.svg     # monochrome artwork (fill="currentColor")
icons/chain/ethereum.json         # metadata:
```

```json
{
  "$schema": "../schema.json",
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
  static IDs in the SVG (`id="arb-circle-a"`). The generator rewrites them
  to `${_id}-arb-circle-a` in the TSX, where `_id` is the per-instance prefix
  `w3i-<lowercased name>-<instance>` that `createIcon` passes to the render
  function (the instance part comes from `useId`) — so the DOM ends up with
  e.g. `w3i-arbitrumcirclemono-r1-arb-circle-a`, unique for every rendered
  icon. Only artwork with internal ids makes the component call `useId`; the
  generator emits `{ ids: true }` for it, and every other icon stays
  hook-free.
- Mask (and pattern) content inherits `fill` from the mask's ancestors,
  which in React is the icon's `<svg>` and its `fill` prop. The generator
  therefore gives every `<mask>` whose content would inherit `fill` the value
  it inherits in the source file (`currentColor` and an unset fill become
  `#000`, what the file renders with the default colour), so a `fill` or
  `color` on the icon never changes its masks.
- The root element may only carry `xmlns`, `viewBox`, and `fill`. No fixed
  `width`/`height`, no `<style>` tags, no text content.
- Every `url(#…)` / `href="#…"` must point at an `id` defined in the same
  file, and ids must be unique within it; the generator fails otherwise.
- `icons/<category>/` holds only unit JSON files and the SVGs their variants
  reference. The generator fails on an SVG that no variant references, on
  any other file (except macOS Finder's `.DS_Store`), and on a directory
  under `icons/` that is not a category, so no artwork is silently left out
  of the package.
- `deprecated` (map of export name → message) marks deprecated artwork exports.
  Together with the deprecated `aliasConst` / `localAliases` entries it is the
  source of `DEPRECATED_ICON_NAMES` (`src/deprecated.ts`, generated).
- The manifest's `brandColor` is derived from the colored default artwork:
  the most frequent fill/stroke/stop-color that is not neutral (greys,
  near-black, near-white); a neutral is used only when the artwork has no
  other colour, and artwork whose shapes have no `fill` at all renders, and
  counts, as SVG's default black. A unit whose default export re-exports
  another icon (`Ldo` → `Lido`, coin `Eth` → `Ethereum`) takes that icon's
  colour, and a `variantLookups` target (`ArbitrumNova`) the colour of its
  own artwork, so every icon of the manifest has one. When that still
  misses the brand (e.g. a near-black logomark whose brand accent is a
  colour), set `"brandColor": "#rrggbb"` from the official palette and cite
  it in `notes` (see `icons/oracle/pyth.json`). Genuinely black-and-white
  marks (Aptos, Hedera) keep their neutral colour.
- Unit files are validated strictly (unknown keys are errors, names must be
  PascalCase identifiers, comments single-line). `icons/schema.json` is the
  matching JSON Schema, generated from `scripts/build-icons/unit.ts`. Every
  unit declares `"$schema": "../schema.json"`, so editors complete and
  validate the file; the generator rejects a unit without it. By convention
  it is the first key, and `new-icon` writes it there.

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
  these categories lists its keys explicitly — the generator fails for any
  non-deprecated export no key reaches (see below). A key must be unique
  within its map, also after normalization (the dynamic components compare
  keys lowercased, without whitespace, `.`, `-` and `_`, see
  `src/dynamic/normalize.ts`, so `arbitrum-nova` and `arbitrumnova` would
  collide), may not point at a deprecated export, and the unit must also
  export `<Name>Mono`. Legacy names of a rebrand stay as extra keys on the
  new unit (`"slugs": ["kaia", "klaytn"]`); the first key of each field is
  the primary one the manifest lists. Keys of a non-default variant go in
  `variantLookups` (`"Nova": { "chainIds": [42170] }` → `ArbitrumNova`).
  Wallet connector ids (`phantom`, `metamask-sdk`, …) are slugs too, but
  only on the unit that genuinely is that product.
- **`aliases`** are extra lowercase search terms for the manifest (icon
  pickers, fuzzy search) and need not be unique. The dynamic components
  resolve lookup keys only, so in the categories above every alias must also
  normalize to a lookup key of its own unit (the generator fails otherwise;
  add it to `slugs` / `tickers`). Like the keys, the aliases of a rebrand
  move to the new unit (`ftm` is an alias of `Sonic`, not of the deprecated
  `Fantom`). In the other categories aliases are search terms only.

```json
{
  "$schema": "../schema.json",
  "name": "Kaia",
  "kind": "icon",
  "variants": { "": { "file": "kaia.svg" }, "Mono": { "file": "kaia.mono.svg", "fill": "currentColor" } },
  "slugs": ["kaia", "klaytn"],
  "chainIds": [8217]
}
```

The dynamic components render a lookup target plus a `variant` suffix
(`<ChainIcon name="ethereum" variant="CircleMono" />` → `EthereumCircleMono`).
A target's variants are the unit's exports that start with its name, minus
those of a longer target (`ArbitrumNovaMono` belongs to the `ArbitrumNova`
target). Every suffix some target of a category has becomes a value of that
category's `variant` type (`ChainVariant`, …), so give a group of variants
that is really a different icon its own `variantLookups` keys (like
`ArbitrumOne` / `arbitrum-one`) instead of letting `One` become a variant.
The generated import maps (`src/dynamic/imports/`) list exactly these
reachable exports, without deprecated ones. The manifest's `variants` follow
the same rule, so `ArbitrumOne` has an entry with its own `variants`, and
`Arbitrum`'s do not list `One`.

### Extra props

A unit can give its components extra props in a `props` map (prop name →
spec). The generator declares them in an exported `<Name>Props` interface
and passes them to `createIcon`, which keeps them off the `<svg>`. Two kinds
exist:

- `"type": "toggle"` — a boolean that switches between the artwork of two
  variants, e.g. `withBackground` in `icons/chain/avalanche.json`:
  `{ "type": "toggle", "description": "…", "on": "Circle", "off": "CircleMono" }`.
  Both variants accept the prop and default to their own artwork (`true` for
  `on`); each keeps its own root `fill`, and the `viewBox` switches with the
  artwork. A variant can be switched by one toggle only.
- `"type": "fill"` — a string that sets the `fill` of every element marked
  `data-fill-prop="<name>"` in a variant's SVG, e.g. `fill1` in
  `icons/exchange/bybit.svg`. The element's own `fill` (if any) is the
  default. The marks are removed from `dist/svg` and the Iconify sets.

`dist/svg` and Iconify render each variant with its default props.

### Aliases and re-exports

Ticker aliases and deprecated renames are JSON-only units:

```json
{
  "$schema": "../schema.json",
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
`icons/wallet/argent.json` for a real example).

A variant whose official artwork is another variant's (a token mark that is
already a disc, an app icon that is already the default) is a
`localAliases` entry of its unit, not a second SVG file:
`{ "name": "UsdcCircle", "target": "Usdc" }` (add `"deprecated"` when the
name should go). `test/duplicate-artwork.test.ts` fails when two SVG files
under `icons/` draw the same artwork (ignoring id names, attribute order and
where `<defs>` sit), unless the pair is listed there with its reason.
`test/visual/near-duplicate-artwork.test.ts` (`pnpm run test:visual`) does
the same for two files that render the same from different markup.

### Regenerating

```sh
pnpm run generate-icons  # icons/ → src/<category>/, src/dynamic/imports/, src/meta/,
                         #          src/deprecated.ts, src/icon-names.ts, src/manifest/,
                         #          icons/schema.json
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

## Export Names

A unit's `name` is its export name and the prefix of every variant export.
Users should be able to guess it from the project's name, so it follows four
rules (#815), which `test/naming.test.ts` enforces over `icons/**/*.json`:

1. **The project's current official name in PascalCase.** Words keep their
   order and lose spaces and punctuation (`Crypto.com` → `CryptoCom`,
   `ether.fi` → `EtherFi`). Acronyms are written as words (`Okx`, `Ens`,
   `Htx`, `BnbSmartChain`, `Zksync`), and internal capitals are kept only where the
   brand writes the name as one word with them (`MetaMask`, `KuCoin`,
   `DeBank`).
2. **A category suffix (`Wallet`, `Chain`, `Protocol`, …) only when it is
   part of the official name or avoids a clash** with another export in the
   root namespace: `TrustWallet` and `GnosisChain` are official names,
   `CoinbaseWallet`, `BitgetWallet`, `OkxWallet` and `UniswapWallet` would
   otherwise clash with the exchange or DEX of the same brand, and the
   wallets `Phantom`, `Rainbow`, `Backpack`, `Yoroi` and `Daedalus` need
   neither.
3. **Coins use their ticker** (`Btc`, `Eth`, `Gram`), PascalCased like any
   acronym. A coin is named after its project instead when its ticker is
   shorter than two letters or would clash with another export. The
   exceptions are:

   | Export | Ticker | Reason |
   | --- | --- | --- |
   | `Sonic` | `S` | one-letter ticker |
   | `Monad` | `MON` | re-export of the chain, named after the project |
   | `Ronin` | `RON` | re-export of the chain, named after the project |
   | `Flare` | `FLR` | named after the project; `Flr` is its ticker alias |

4. **Renames keep the old name.** A unit whose name breaks these rules, or
   whose project rebrands, gets the new canonical name, and the old name
   stays as a deprecated alias under the
   [lifecycle policy](#icon-lifecycle-policy) (at least one minor release
   and 90 days, removed only in a major). Deprecated exports keep the name
   they were published with, so the rules apply to current names only.

What the rules cannot derive mechanically is listed in the test with the
reason: brand casing (`MetaMask`), spellings that are not a plain PascalCase
of the official name (`Oneinch` for 1inch, since an identifier cannot start
with a digit and 1inch is one word), the suffixed names of rule 2 and the
coin exceptions above. Add a new name there only together with its reason.
In the categories with lookup keys, the name must also resolve as one of
the unit's own `slugs` (`Phantom` → `phantom`).

## Icon Variants and Mono Design

Every export follows a `{Brand}{Variant}` pattern (`Bitcoin`, `BitcoinMono`,
`BitcoinCircle`, `MagicEdenWordmark`, …), and every `*Mono` variant must keep
the silhouette and identifying detail of its colored counterpart in a single
`currentColor`. The suffix table, the base-icon background rule, and the mono
design rules (with the `node scripts/audit-mono.ts` audit) are in
[docs/icon-variants.md](docs/icon-variants.md).

## Optical Size

Every icon renders into a square box (`width = height = size`, `1em` by
default), so every source uses the same square grid and fills it by the same
rule. Icons of the same size then look the same size, whatever the aspect
ratio or padding of the brand's own file.

- **Grid**: the root of every source in `icons/` is
  `viewBox="0 0 64 64"`. `test/optical-size.test.ts` enforces it.
- **Marks** (the default variant, `Mono`, `Inverted`, `Symbol`, `Wordmark`,
  `Alt`, …): the tight box of the painted pixels is scaled uniformly so its
  longer side is **56** units (87.5%), and centred, which leaves 4 units of
  padding on the longer axis. A wide wordmark gets 56 units of width and is
  centred vertically.
- **Containers**: `Circle*` and `Square*` variants, and any artwork that is
  itself a solid disc or (rounded) square (a coin, an app-icon tile, a base
  icon whose official mark includes its background), fill the grid: the
  longer side of the painted box is **64** units, full-bleed. Artwork counts
  as a container when its painted box is square within 4% and its footprint
  (holes filled) covers at least 97% of the inscribed disc.
- **Mono pairs**: `Foo` / `FooMono` (and `FooCircle` / `FooCircleMono`, …)
  take the kind of the colored variant. When both files use the same viewBox
  they get one transform, fitted to the union of their painted boxes (the
  colored box whenever the mono lies inside it), so the pair stays aligned.
- **Exemptions** are listed in `OPTICAL_EXEMPTIONS`
  (`scripts/build-icons/optical.ts`) with a reason, and still use the
  64×64 grid. There are none today; keep it that way unless the fill rule
  would misrepresent a mark.

`pnpm run new-icon` applies all of this: it measures the artwork in Chromium,
wraps it in `<g transform="translate(…) scale(…)">` (which SVGO then usually
bakes into the path data), and checks that the result renders exactly like
the input, only scaled and centred. Artwork that overflowed its own viewBox
(and was clipped by it) is fitted as a whole. To re-check or re-apply the
rule to existing sources:

```sh
node scripts/normalize-viewbox.ts --check   # report only; exit 1 on drift
node scripts/normalize-viewbox.ts --check icons/<category>/<unit>.json …  # these units only
node scripts/normalize-viewbox.ts [icons/<category>/<unit>.json …]  # rewrite
pnpm run test:visual                         # includes the painted-box guard
```

Both need Chromium (`pnpm exec playwright install chromium`). The painted-box
guard is `test/visual/optical-size.test.ts` (tolerance 0.5 units).
The visual-regression workflow runs the per-unit `--check` on every icon unit
a pull request touches, so commit sources exactly as the script writes them
(the full check renders every unit and is too slow for CI).

## Icon Lifecycle Policy

Renamed or retired brands keep their old exports, as deprecated aliases or
deprecated artwork, for at least one minor release and 90 days, and deprecated
exports are removed only in a major release. How to declare an alias, which release notes and tests a
rename/deprecation PR needs, and examples from this repository are in
[docs/icon-lifecycle.md](docs/icon-lifecycle.md).

## SVG Optimization Pipeline

When adding a new icon, follow this workflow:

```text
1. Source the SVG  →  2. Scaffold (SVGO + icons/ + generated TSX)  →  3. Add variants  →  4. Review the generated output  →  5. Visual QA
```

Everything under `src/<category>/` is generated from `icons/`; the only manual
artifacts are the SVG files and the unit JSON.

### 1. Source the SVG

Download from the project's official brand kit, GitHub repository, or press page. Always use the original vector file — never trace a raster image.

Every unit records where its artwork came from in the `source` array of its
JSON, and only official artwork is accepted: no community redraws, no
reshaped geometry, no altered brand colors in the default variant. The full
[attribution and authenticity rules](docs/icon-sources.md) list the accepted
`source` formats and the allowed transformations.

### 2. Scaffold the unit

```sh
pnpm run new-icon --category <category> --name <PascalName> --svg path/to/icon.svg \
  --source <official URL> [--mono path/to/icon.mono.svg] \
  [--slug <slug>]... [--chain-id <id>]... [--ticker <TICKER>]...
```

For example, a chain: `--category chain --name Taiko --svg taiko.svg --mono
taiko.mono.svg --source <official URL> --slug taiko --chain-id 167000`.

`--source` is technically optional for the script, but omitting it leaves the
unit without the required attribution (and the generated TSX without its
`// Source:` comment), so always pass it or add `source` to the JSON before
regenerating.

This runs SVGO with the bundled configuration (removes metadata, strips fixed
dimensions, moves `fill`, `stroke` and other presentation properties out of
`style` into attributes, keeps brand colors, ids, and multi-colored paths),
normalizes the root element, puts the artwork on the 64×64 grid following the
[optical-size rule](#optical-size) (this step launches Chromium through
Playwright), writes `icons/<category>/<slug>.svg` (+ `.mono.svg`) and
`<slug>.json` with the lookup keys, and regenerates `src/`. A category with
a dynamic component needs `--mono` and at least one lookup key, as above.
Follow the printed next steps (Mono variant, changeset).

To optimize an SVG without scaffolding a unit:

```sh
pnpm run optimize:svg path/to/icon.svg      # one file
pnpm run optimize:svg -r path/to/svgs/      # a directory
```

`pnpm run check:svgo [files…]` lists icon sources that SVGO would still change
(ignoring attribute order and whitespace). Every source under `icons/` is
SVGO-normalized, and `pnpm run check` (run by CI and the pre-push hook) fails
when one is not; run `pnpm run optimize:svg <file>` on a source you edit by
hand. The configuration keeps a root `fill="#000"`, which SVGO would drop as
the initial value: a root `fill` is the component's default `fill`. Path
data is rounded to 2 decimals (0.04 px at 256 px on the 64×64 grid), arcs
fitted to curves keep a 0.0025-unit tolerance, and half-circle arcs whose
rounded radius ends up a hair over half their chord get the radius rounded
down instead (`scripts/build-icons/arcs.ts`), so circles drawn as two arcs
stay round.

### 3. Add variants

Each key in the unit's `variants` map is an export suffix backed by one SVG
file. Mono variants set `"fill": "currentColor"` (or `"none"` for stroke-only
artwork), and the generator rejects any other value. That value becomes the
default `fill` on the rendered `<svg>`, where the shapes inherit it, so the
`fill` prop recolours them.

#### Circle / Square Variants

To add a Circle (or Square) variant, create 64×64 SVG files whose branded
background fills the whole grid (a circle of radius 32, or a 64×64 square)
with the mark scaled to ~72% fill, then register them:

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

- Use `viewBox="0 0 64 64"`, with the background filling it edge to edge (the
  [optical-size](#optical-size) container rule; the guard test checks it)
- Colored variant: brand color background + white icon mark
- Mono variant: `currentColor` circle + mask that punches out the icon mark
- For icons with gradients, **pre-compute** gradient coordinates in the 64×64 space — do **not** use `gradientTransform`
- Short static IDs (`mtc-a`) are fine; the generator namespaces them per icon
- Record the scale/translate math in the unit's `notes` array (see `icons/chain/ethereum.json`) so the next person can reproduce it

#### Dark / light background legibility

`test/legibility.test.ts` flags colored default artwork that mostly vanishes
on a dark background (near-black paint: every channel below 60, or less than
1.5:1 WCAG contrast against black, like a deep navy) or a light one
(near-white: every channel above 195, or less than 1.5:1 against white, like
Blast's pale yellow `#FCFC03`). Gradients count by the colours sampled along
their ramp. A flagged icon needs one of:

- an official colored `Circle*` / `Square*` / `Inverted*` variant that is
  not itself flagged;
- nothing more when the mark is painted in that one tone only (black, white,
  or one pale or deep colour) and its `Mono` variant has the same geometry:
  `Mono` in a contrasting `color` then shows the whole mark, and for a black
  mark it is the brand's reversed mark;
- otherwise an entry in that test's `EXEMPTIONS`, with the reason checked by
  the test (another legible colored variant, or the official sources that
  were searched without finding an alternative).

When an official legible variant exists but is still to be added, record it,
with the file it comes from, in that test's `PENDING`: the report names it
and the entry fails once it lands. A pending entry is a note, not one of the
options above.

Never recolour a brand mark to pass the audit unless the brand's guidelines
show that version; cite them in `source`. The audit's measure (per-paint
counts, container detection) is documented in `test/helpers/legibility.ts`.

### 4. Review the generated output

After `pnpm run generate-icons`, open `src/<category>/<Name>.tsx` and check:

- The `// Source:` comment and the `/* @__PURE__ */` annotation are present (both emitted by the generator; `test/pure-annotations.test.ts` enforces the latter)
- Internal IDs were rewritten to `${_id}-…` references (rendered as `w3i-<name>-<instance>-…`, see "Anatomy of an icon unit"), the call passes `{ ids: true }`, and every `url(#…)` / `href="#…"` still resolves
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

Then run the visual-regression suite, which screenshots every icon in
headless Chromium. Screenshots are not committed: CI renders the baseline
from the PR's base commit and compares your branch against it. To compare
locally, install the browser once with `pnpm exec playwright install chromium`,
record a baseline with `pnpm run test:visual:update` on `develop`, then run
`pnpm run test:visual` on your branch. Intentional rendering changes to
existing icons need the `visual-baseline-update` label on the PR so the
visual-regression job regenerates baselines instead of comparing against
develop.

## SVG Guidelines

- **Use `viewBox="0 0 64 64"`** instead of fixed `width`/`height` in the SVG source, filled by the [optical-size](#optical-size) rule. The component sets `width="1em"` and `height="1em"` as defaults.
- **Avoid `<style>` tags** inside SVGs. Use inline `style` props or direct fill/stroke attributes instead.
- **Static IDs are fine in the SVG source** (`id="mtc-a"`). The generator rewrites them to `${_id}-mtc-a` (`_id` = `w3i-<lowercased component name>-<instance>`), so no two rendered icons on a page share an id, including two instances of the same component.
- **Repeated geometry belongs in the SVG source**, not in the TSX. Variants that share a mark keep one copy per SVG file; document the shared transform in the unit's `notes` so the copies can be kept in sync. Do not hand-edit generated `.tsx` files to extract constants.

## Running the Example App

The `example/` directory contains the Next.js demo site. It resolves
`react-web3-icons` to `../src`, so it needs no library build. From the
repository root:

```sh
pnpm --filter react-web3-icons-example run dev
```

This is useful for visually verifying new icons after adding them.

`examples/stackblitz/` is the playground behind the README's StackBlitz link.
It is a standalone npm project outside the workspace that installs the
published package (`cd examples/stackblitz && npm install && npm run dev`).
Keep it working with the latest release; it does not see unreleased changes.

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
2. Make your changes and ensure all checks pass (the `pre-push` hook runs most of them):
   ```sh
   pnpm run generate-icons --check
   pnpm run check
   pnpm run typecheck
   pnpm test --coverage
   pnpm run build && pnpm run size
   ```
   If you changed icon artwork or rendering, also run `pnpm run test:visual` (see [Visual QA](#5-visual-qa)).
   If you added, replaced or retired an icon, run `pnpm run showcase` and commit the re-rendered `image/icons.png`.
3. If your change affects the published library (new icons, bug fixes, API changes), add a changeset:

   ```sh
   pnpm changeset
   ```

   Follow the prompts to select the semver bump type (patch, minor, or major) and describe the change.

4. Write a clear commit message (e.g., `feat(coin): add MyToken icon`)
5. Open a pull request against `develop`

Maintainers: releases, the version PR and the branch rulesets are described in
[docs/releasing.md](docs/releasing.md). Once the rulesets are enabled, changes
reach `develop` only through pull requests, which need the required checks to
pass (see docs/releasing.md for the version PR), and force pushes to `develop`
and `main` are blocked.
