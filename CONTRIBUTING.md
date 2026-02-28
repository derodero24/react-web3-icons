# Contributing to React Web3 Icons

Thanks for your interest in contributing! This guide covers how to add icons, fix bugs, and get your changes merged.

## Getting Started

```sh
git clone https://github.com/derodero24/react-web3-icons.git
cd react-web3-icons
pnpm install
```

### Prerequisites

- **Node.js** ^20.19.0 or >=22.12.0
- **pnpm** 10.x

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

Each icon is a React component that renders an SVG element. Place your file in the appropriate category directory under `src/`.

```tsx
import type { IconProps } from '../utils';

export function MyToken(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}
    >
      {props.title && <title>{props.title}</title>}
      <path d="..." fill="#..." />
    </svg>
  );
}
```

**Key conventions:**

- Default size is `1em` (scales with font size)
- Spread `{...props}` on the root `<svg>` element to allow consumers to pass standard SVG attributes
- Support the optional `title` prop for accessibility
- Use named exports (no default exports)
- Function names use PascalCase matching the token/project name

### 2. Add a Monochrome Variant (Optional)

Mono icons use `fill="currentColor"` on the `<svg>` element, allowing the icon color to be controlled via CSS `color`.

```tsx
export function MyTokenMono(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="currentColor"
      {...props}
    >
      {props.title && <title>{props.title}</title>}
      <path d="..." />
    </svg>
  );
}
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

## SVG Guidelines

- **Clean up SVGs** before converting. Remove editor metadata, unnecessary groups, and redundant attributes.
- **Use `viewBox`** instead of fixed `width`/`height` in the SVG source. The component sets `width="1em"` and `height="1em"` as defaults.
- **Avoid `<style>` tags** inside SVGs. Use inline `style` props or direct fill/stroke attributes instead.
- **Prefix gradient/filter IDs** to prevent collisions when multiple icons render on the same page (e.g., `mytoken-a`, `mytoken-b`).
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
3. Write a clear commit message (e.g., `feat(coin): add MyToken icon`)
4. Open a pull request against `main`
