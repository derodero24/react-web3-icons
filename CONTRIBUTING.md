# Contributing to React Web3 Icons

Thanks for your interest in contributing! This guide covers how to add icons, fix bugs, and get your changes merged.

## Getting Started

```sh
git clone https://github.com/derodero24/react-web3-icons.git
cd react-web3-icons
nvm install
pnpm install
```

### Prerequisites

- **Node.js** ^20.19.0 or >=22.12.0
- **pnpm** 10.x

Run `nvm install` before installing dependencies (reads `.nvmrc` and installs/activates the required Node version if missing).
`pnpm install` fails fast on unsupported Node versions because `engine-strict=true` is enforced.

### Useful Commands

| Command             | Description                     |
| ------------------- | ------------------------------- |
| `pnpm run lint`     | Run Biome linter                |
| `pnpm run lint:fix` | Auto-fix lint and format issues |
| `pnpm test`         | Run tests                       |
| `pnpm run build`    | Build the package               |

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

### 1. Create the Icon Component

Each icon is created using the `createIcon` factory function. Place your file in the appropriate category directory under `src/`.

```tsx
import { createIcon } from '../utils';

export const MyToken = createIcon('MyToken', '0 0 24 24', () => (
  <path d="..." fill="#..." />
));
```

The factory handles `forwardRef`, `useId`, `size` prop, `title`/`titleId`, and `aria-hidden` automatically.

**Key conventions:**

- Use `createIcon` for all new icons
- Use named exports (no default exports)
- Component names use PascalCase matching the token/project name
- The render callback receives an `_id` parameter for dynamic SVG element IDs

### 2. Add a Monochrome Variant (Optional)

Pass `'currentColor'` as the fourth argument to `createIcon`. This sets `fill="currentColor"` on the root `<svg>`, allowing the icon color to be controlled via CSS `color`.

```tsx
export const MyTokenMono = createIcon(
  'MyTokenMono',
  '0 0 24 24',
  () => <path d="..." />,
  'currentColor',
);
```

### 3. Export from the Category Barrel

Add your icon to the category's `index.ts` (e.g., `src/coin/index.ts`):

```tsx
export * from './MyToken';
```

The top-level `src/index.ts` already re-exports all categories, so you don't need to modify it unless you're creating a new category.

### 4. Add Aliases (If Applicable)

If the token has a common ticker symbol, add an alias re-export file (e.g., `src/coin/Mtkn.tsx`):

```tsx
export { MyToken as Mtkn, MyTokenMono as MtknMono } from './MyToken';
```

Then add the alias file to the same category barrel (`src/coin/index.ts`):

```tsx
export * from './Mtkn';
```

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
| `Light` | Light-colored variant for dark backgrounds | `BybitLight` |
| `Flat` | Single brand color, no internal color variation | `ArbitrumOneFlat` |
| `Symbol` | Standalone symbol without container (when base has one) | `RainbowWalletSymbol` |
| `SymbolMono` | Monochrome standalone symbol without container | `OpenSeaSymbolMono` |

### Rules

1. **Base = standalone**: The unsuffixed name is always the standalone symbol. If the brand's primary mark is a circle (e.g., OpenSea ship on blue circle), the base name keeps the circle shape and `SymbolMono` provides the symbol-only mono variant.
2. **Mono mirrors its base**: `FooMono` matches `Foo`'s shape; `FooCircleMono` matches `FooCircle`'s shape.
3. **No numeric suffixes**: Never use `Foo2`, `Foo3`, etc. Use descriptive suffixes that convey the visual difference.
4. **Flat vs Alt**: Use `Flat` when the difference is strictly single-color simplification. Use `Alt` for a meaningfully different design or color scheme.
5. **Light**: Reserved for variants where the artwork uses white/light colors, designed for dark backgrounds. The shape and layout are identical to the base.

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

## Submitting a Pull Request

1. Fork the repository and create a feature branch from `main`
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
5. Open a pull request against `main`
