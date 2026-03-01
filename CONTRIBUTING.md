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

| Command | Description |
| --- | --- |
| `pnpm run lint` | Run Biome linter |
| `pnpm run lint:fix` | Auto-fix lint and format issues |
| `pnpm test` | Run tests |
| `pnpm run build` | Build the package |

## Project Structure

```text
src/
  chain/        # L1/L2 blockchain icons (Ethereum, Arbitrum, etc.)
  coin/         # Cryptocurrency icons (Bitcoin, Doge, etc.)
  dex/          # DEX icons (Uniswap, SushiSwap, etc.)
  wallet/       # Wallet icons (MetaMask, Phantom, etc.)
  marketplace/  # NFT marketplace icons
  storage/      # Decentralized storage icons
  exchange/     # Exchange icons
  explorer/     # Block explorer icons
  devtool/      # Developer tool icons
  domain/       # Domain service icons
  node/         # Node provider icons
  portfolio/    # Portfolio tracker icons
  tracker/      # Analytics/tracker icons
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

## SVG Optimization Pipeline

When adding a new icon, follow this workflow:

```text
1. Download official SVG  →  2. Optimize with SVGO  →  3. Convert to React component  →  4. Manual refinement  →  5. Visual QA
```

### 1. Source the SVG

Download from the project's official brand kit, GitHub repository, or press page. Always use the original vector file — never trace a raster image.

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

- **SVG IDs** (`<mask>`, `<linearGradient>`, `<clipPath>`, `<filter>`): Replace static IDs with dynamic ones using the `_id` parameter from `createIcon`'s render callback (e.g., `` id={`${_id}-mytoken-a`} ``)
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
