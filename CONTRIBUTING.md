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

- **Node.js** `^22.18.0 || >=24.11.0`, as declared in `devEngines.runtime` in package.json. `.nvmrc` selects Node 24.
- **pnpm** 10.x (`packageManager` in package.json pins the exact version)

This is a contributor requirement only: the published package has no Node.js
requirement (see the README's install section).

Run `nvm install` before installing dependencies (reads `.nvmrc` and installs/activates the required Node version if missing).
`pnpm install` fails fast on unsupported Node versions: the `prepare` script checks the range above (the scripts under
`scripts/` run through Node's built-in TypeScript type stripping), and `engine-strict=true` in `.npmrc` enforces the
toolchain dependencies' own `engines`.

### Useful Commands

| Command | Description |
| --- | --- |
| `pnpm run check` | Lint and format check exactly as CI runs it (`biome ci --error-on-warnings`) |
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
| `pnpm run analyze` | Show what makes up each size-limit entry |
| `pnpm run new-icon` | Scaffold a new icon unit from an SVG |
| `pnpm run generate-icons` | Regenerate `src/` (icons, dynamic import maps, meta, deprecated set, manifest) and `icons/schema.json` from `icons/` (`--check`: verify only) |
| `pnpm run optimize:svg` | Optimize an SVG with SVGO |
| `pnpm run check:svgo` | List icon SVGs SVGO would still change |
| `pnpm changeset` | Add a changeset for a change to the published package |

## Project Structure

```text
icons/            # Source of truth: SVG artwork + unit JSON per icon, by category
  schema.json     # JSON Schema for unit files (generated)
src/
  bridge/ … wallet/  # One directory per category (16): components generated from icons/
  dynamic/        # Lazy <ChainIcon>, <CoinIcon>, …; imports/ is generated
  meta/           # Lookup maps (CHAIN_ID_TO_NAME, TICKER_TO_COIN, …), generated
  manifest/       # ICON_MANIFEST catalog, generated
  utils/          # createIcon factory and the IconProps / IconName types
  deprecated.ts   # DEPRECATED_ICON_NAMES, generated
  index.ts        # Root entry: re-exports every category
scripts/
  build-icons/    # Generator (cli.ts) and the dist emitters (SVG, Iconify, manifest.json)
  new-icon.ts     # Scaffolds a unit (pnpm run new-icon)
  audit-mono.ts   # Mono-vs-colored quality audit
  check-svgo.ts   # Lists SVGs SVGO would still change
  size-report.ts  # Renders the size-limit PR comment
test/             # Vitest suites; visual/ (Playwright screenshots), consumer/ (packed-tarball fixtures for CI)
example/          # Next.js demo site (react-web3-icons.vercel.app), builds from src/
examples/
  stackblitz/     # Minimal Vite app behind the README's StackBlitz link; installs the published package
docs/             # Icon variant, source, and lifecycle policies
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
  `${_id}-ethc-a` in the TSX, where `_id` is the per-instance prefix
  `w3i-<lowercased name>-<instance>` that `createIcon` passes to the render
  function (the instance part comes from `useId`) — so the DOM ends up with
  e.g. `w3i-ethereumcirclemono-r1-ethc-a`, unique for every rendered icon.
  Only artwork with internal ids makes the component call `useId`; the
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

## Icon Variants and Mono Design

Every export follows a `{Brand}{Variant}` pattern (`Bitcoin`, `BitcoinMono`,
`BitcoinCircle`, `MagicEdenWordmark`, …), and every `*Mono` variant must keep
the silhouette and identifying detail of its colored counterpart in a single
`currentColor`. The suffix table, the base-icon background rule, and the mono
design rules (with the `node scripts/audit-mono.ts` audit) are in
[docs/icon-variants.md](docs/icon-variants.md).

## Icon Lifecycle Policy

Renamed or retired brands keep their old exports as deprecated aliases for at
least one minor release and 90 days, and aliases are removed only in a major
release. How to declare an alias, which release notes and tests a
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
file. Mono variants set `"fill": "currentColor"` (or `"none"` for stroke-only
artwork) and that value becomes the default `fill` on the rendered `<svg>`.

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

#### Dark / light background legibility

`test/legibility.test.ts` flags colored default artwork that mostly vanishes
on a dark background (near-black paint, every channel below 60) or a light
one (near-white, every channel above 195). A flagged icon needs one of:

- an official colored `Circle*` / `Square*` / `Inverted*` variant that is
  not itself flagged;
- nothing more when the mark has no colour besides black (or white) and its
  `Mono` variant has the same geometry, since `Mono` in a contrasting `color`
  is then the brand's reversed mark;
- otherwise an entry in that test's `EXEMPTIONS`, with the reason checked by
  the test (another legible colored variant, or the official sources that
  were searched without finding an alternative).

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

- **Use `viewBox`** instead of fixed `width`/`height` in the SVG source. The component sets `width="1em"` and `height="1em"` as defaults.
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
3. If your change affects the published library (new icons, bug fixes, API changes), add a changeset:

   ```sh
   pnpm changeset
   ```

   Follow the prompts to select the semver bump type (patch, minor, or major) and describe the change.

4. Write a clear commit message (e.g., `feat(coin): add MyToken icon`)
5. Open a pull request against `develop`
