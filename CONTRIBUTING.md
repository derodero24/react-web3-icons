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
  static ids in the SVG — the generator rewrites them to collision-free
  `useId`-based ids automatically.
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
pnpm run build              # dist + static SVGs + manifest.json
pnpm run generate-manifest  # refresh src/manifest after icon changes
```

`test/icons-sync.test.ts` fails CI whenever `icons/` and `src/` drift, and the
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

### Vocabulary notes

- **Suffixes compose**: style suffixes may combine when the artwork calls for
  it (`CoinbaseCircleAlt`, `MagicEdenWordmarkFlat`), with `Mono` always last.
- **Multiword brands as variants**: sibling brands sharing one artwork family
  may live as variants of a single unit — e.g. the `Arbitrum` unit also emits
  `ArbitrumOne*` and `ArbitrumNova*`. `One`/`Nova` there are brand-name parts,
  not style suffixes.
- **Brand-intrinsic digits**: the no-trailing-digit rule bans version-style
  names (`Foo2`), not brands whose name contains digits (`X2Y2`, `Api3`).
  Such brands are allowlisted in `scripts/audit-naming.mjs`.
- **Mono pairing**: every base and every `Circle`/`Square` variant ships a
  mono. `Alt`/`Inverted`/`Flat`/`Wordmark` variants may omit one when a mono
  would be redundant (an `Inverted` variant already is the dark-context
  rendition); such gaps are reported informationally by the audit.

`node scripts/audit-naming.mjs` checks all of the above across `icons/` and
fails on hard violations.

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
1. Download official SVG  →  2. Optimize with SVGO  →  3. Convert to React component  →  4. Manual refinement  →  5. Visual QA
```

### 1. Source the SVG

Download from the project's official brand kit, GitHub repository, or press page. Always use the original vector file — never trace a raster image.

### Source Attribution (Required)

Every icon `.tsx` file must include a `// Source:` comment as the **first line after `import` statements**, documenting where the SVG path data originated. This survives the PR merge and makes future audits possible with `grep -r "// Source:" src/`.

```tsx
import { createIcon } from '../utils';

// Source: <reference>

export const MyToken = createIcon(...)
```

| Case | Example |
| --- | --- |
| Official SVG URL | `// Source: https://github.com/org/repo/blob/main/logo.svg` |
| Brand asset page (no direct URL) | `// Source: https://brand.uniswap.org (official brand kit)` |
| Third-party package (with license) | `// Source: @web3icons/react (MIT) — OSMO token SVG` |
| App/favicon asset | `// Source: https://app.eigenlayer.xyz/logo/markLightA.svg` |
| Hand-crafted / no public source | `// Source: hand-crafted — no public SVG; traced from https://...` |
| Re-export (no own SVG paths) | `// Source: re-export of Bitcoin — see src/chain/Bitcoin.tsx` |

### Icon Authenticity Policy (Required)

To protect icon quality and brand fidelity, all icon additions/updates must follow these rules:

- **Use official sources only**: Brand kit, official website press page, or official organization repository.
- **No unofficial/community redraws**: If no official SVG exists, do not add the icon yet; open an issue and track it.
- **Document source of truth in PR**: Include official source URL(s), access date, and any usage/license notes.
- **Keep brand geometry and color identity**: Converted icon must visually match the official source.

Allowed transformations:

- SVGO optimization using this repository's `svgo.config.js`
- JSX conversion and React component wrapping (`createIcon`)
- Dynamic ID wiring (`_id`) for gradients/masks/clip paths
- Readability refactors (extracting repeated path constants, formatting)
- Optional mono variants using `currentColor`

Prohibited transformations:

- Redrawing, tracing, or manually reshaping brand geometry
- Altering brand colors/gradients/strokes in the default icon variant
- Mixing logo elements from different logo versions/brands
- "Stylizing" official marks to make them look different from the source

### 2. Optimize with SVGO

Run the bundled SVGO configuration against the raw SVG:

```sh
pnpm run optimize:svg path/to/icon.svg
```

This removes metadata, strips fixed dimensions, and cleans up the markup while preserving brand colors, IDs, and multi-colored paths.

You can also optimize a directory of SVGs:

```sh
pnpm run optimize:svg -r path/to/svgs/
```

### 3. Convert to a React Component

Create a `.tsx` file in the appropriate category directory and wrap the optimized SVG content using `createIcon`:

```tsx
import { createIcon } from '../utils';

export const MyToken = createIcon('MyToken', '0 0 24 24', () => (
  <path d="..." fill="#..." />
));

export const MyTokenMono = createIcon(
  'MyTokenMono',
  '0 0 24 24',
  () => <path d="..." />,
  'currentColor',
);
```

### Circle / Square Variants

To add a Circle (or Square) variant, create a 64×64 icon with a branded background and the symbol scaled to ~72% fill:

```tsx
// Extract shared path constant (reused by base, Mono, Circle, CircleMono)
const MY_TOKEN_MARK = 'M10 2 L20 22 ...';

// Scale + center: target ~46px mark inside 64px circle
const MY_TOKEN_CIRCLE_TX = 'translate(9 9) scale(1.917)';

export const MyTokenCircle = createIcon('MyTokenCircle', '0 0 64 64', () => (
  <>
    <circle cx="32" cy="32" r="32" fill="#brandColor" />
    <path transform={MY_TOKEN_CIRCLE_TX} d={MY_TOKEN_MARK} fill="#fff" />
  </>
));

export const MyTokenCircleMono = createIcon(
  'MyTokenCircleMono',
  '0 0 64 64',
  _id => (
    <>
      <circle cx="32" cy="32" r="32" mask={`url(#${_id}-mtc-a)`} />
      <defs>
        <mask id={`${_id}-mtc-a`}>
          <rect width="100%" height="100%" fill="#fff" />
          <path transform={MY_TOKEN_CIRCLE_TX} d={MY_TOKEN_MARK} fill="#000" />
        </mask>
      </defs>
    </>
  ),
  'currentColor',
);
```

Key points:

- Use `viewBox="0 0 64 64"` for all Circle/Square variants
- Colored variant: brand color background + white icon mark
- Mono variant: `currentColor` circle + mask that punches out the icon mark
- For icons with gradients, **pre-compute** gradient coordinates in the 64×64 space — do **not** use `gradientTransform`
- Always extract shared path constants to avoid duplication

### 4. Manual Refinement

After the initial conversion, check for:

- **SVG IDs** (`<mask>`, `<linearGradient>`, `<clipPath>`, `<filter>`): Replace static IDs with dynamic ones using the `_id` parameter from `createIcon`'s render callback (e.g., `id={`${\_id}-mytoken-a`}`)
- **Shared path data**: Extract repeated `d` attribute values into constants at the top of the file
- **Mono variants**: Ensure `fill="none"` is present on stroke-only elements, and remove hardcoded colors that should inherit `currentColor`

### 5. Visual QA

Run the example app and verify:

- Icon renders correctly at multiple sizes (16px, 24px, 48px)
- Colors match the official brand
- Mono variant works with different CSS `color` values
- No visual artifacts in dark mode / light mode

## SVG Guidelines

- **Use `viewBox`** instead of fixed `width`/`height` in the SVG source. The component sets `width="1em"` and `height="1em"` as defaults.
- **Avoid `<style>` tags** inside SVGs. Use inline `style` props or direct fill/stroke attributes instead.
- **Use dynamic IDs** via the `_id` parameter from `createIcon` to prevent collisions when multiple icons render on the same page.
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
