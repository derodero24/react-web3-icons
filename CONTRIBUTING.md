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

- **Node.js** >=22.12.0 (the build toolchain requires 22.18+; use the latest Node 22 or 24)
- **pnpm** 10.x

Run `nvm install` before installing dependencies (reads `.nvmrc` and installs/activates the required Node version if missing).
`pnpm install` fails fast on unsupported Node versions because `engine-strict=true` is enforced.

### Useful Commands

| Command                | Description                     |
| ---------------------- | ------------------------------- |
| `pnpm run lint`        | Run Biome linter                |
| `pnpm run lint:fix`    | Auto-fix lint and format issues |
| `pnpm test`            | Run tests                       |
| `pnpm run build`       | Build the package               |
| `pnpm run new-icon`    | Scaffold a new icon component   |
| `pnpm run optimize:svg`| Optimize an SVG with SVGO       |

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
example/        # Next.js demo app
test/           # Vitest test suite
```

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

This optimizes the SVG with SVGO, writes `icons/<category>/<slug>.svg` and
`<slug>.json`, and regenerates `src/<category>/`. Follow the printed next steps
(meta maps, manifest, changeset).

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
  static ids in the SVG — the generator rewrites them to deterministic,
  per-icon prefixed ids (`w3i-<name>-…`) automatically.
- The root element may only carry `xmlns`, `viewBox`, and `fill`. No fixed
  `width`/`height`, no `<style>` tags, no text content.
- `deprecated` (map of export name → message) marks deprecated artwork exports.

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
pnpm run generate-icons     # icons/ → src/<category>/ (+ lock file)
pnpm run build              # dist + static SVGs + Iconify JSON + manifest.json
pnpm run generate-manifest  # refresh src/manifest from the built dist
```

`generate-manifest` reads the built `dist/` and rewrites `src/manifest/index.ts`,
so `dist/manifest.json` is one step behind until the next `pnpm run build`.
That is fine for day-to-day work (tests import `src/`), and publishing always
rebuilds (`prepublishOnly`). Run `build` again if you need an up-to-date
`dist/manifest.json` locally.

`test/icons-sync.test.ts` fails CI whenever `icons/` and `src/` drift,
`test/manifest-sync.test.ts` does the same for the manifest, and the
snapshot/visual suites verify rendered output.

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

`node scripts/audit-mono.mjs` rasterizes every colored/mono pair and reports
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
- Add the deprecated alias names to `src/deprecated.ts` (`DEPRECATED_ICON_NAMES`) so consuming apps can filter them automatically.

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
artifacts are the SVG files and the unit JSON.

### 1. Source the SVG

Download from the project's official brand kit, GitHub repository, or press page. Always use the original vector file — never trace a raster image.

### Source Attribution (Required)

Every unit records where its artwork came from in the `source` array of
`icons/<category>/<slug>.json` (pass `--source` to `pnpm run new-icon`, or edit
the JSON). The generator emits it as a `// Source:` comment right after the
imports in the generated `.tsx`, so `grep -r "// Source:" src/` still works for
audits. Never edit that comment by hand — change the JSON and regenerate.

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
  [--mono path/to/icon.mono.svg] [--source <official URL>]
```

This runs SVGO with the bundled configuration (removes metadata, strips fixed
dimensions, keeps brand colors, ids, and multi-colored paths), normalizes the
root element, writes `icons/<category>/<slug>.svg` (+ `.mono.svg`) and
`<slug>.json`, and regenerates `src/<category>/`. Follow the printed next steps
(meta maps, manifest, changeset).

To optimize an SVG without scaffolding a unit:

```sh
pnpm run optimize:svg path/to/icon.svg      # one file
pnpm run optimize:svg -r path/to/svgs/      # a directory
```

### 3. Add variants

Each key in the unit's `variants` map is an export suffix backed by one SVG
file. Mono variants set `"fill": "currentColor"` (or `"none"` for stroke-only
artwork); that value becomes the default `fill` on the rendered `<svg>`.

#### Circle / Square Variants

To add a Circle (or Square) variant, create 64×64 SVG files with a branded
background and the mark scaled to ~72% fill, then register them:

```xml
<!-- icons/chain/my-token.circle.svg -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <circle cx="32" cy="32" r="32" fill="#brandColor"/>
  <path transform="translate(9 9) scale(1.917)" d="M10 2 L20 22 ..." fill="#fff"/>
</svg>
```

```xml
<!-- icons/chain/my-token.circle-mono.svg -->
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
- Short static ids (`mtc-a`) are fine; the generator namespaces them per icon
- Record the scale/translate math in the unit's `notes` array (see `icons/chain/ethereum.json`) so the next person can reproduce it

### 4. Review the generated output

After `pnpm run generate-icons`, open `src/<category>/<Name>.tsx` and check:

- The `// Source:` comment and the `/* @__PURE__ */` annotation are present (both emitted by the generator; `test/pure-annotations.test.ts` enforces the latter)
- Internal ids were rewritten to `${_id}-…` references and every `url(#…)` / `href="#…"` still resolves
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
- **Static ids are fine in the SVG source** (`id="mtc-a"`). The generator rewrites them to `${_id}-mtc-a`, so multiple icons on a page never collide.
- **For large files** with multiple variants sharing the same paths, extract repeated `d` attribute values into constants at the top of the file.

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
