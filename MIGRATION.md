# Migrating from v4 to v5

See [CHANGELOG.md](./CHANGELOG.md) for full release notes.

## 1. Per-instance internal SVG ids

v4 gave every instance of an icon the same internal ids (`w3i-<name>-…`), and `url(#…)` always resolves to the first element with an id. A first instance inside a `display: none` subtree, or one with a different `fill` or `color`, therefore broke or restyled the masks and gradients of every later instance.

Icons with internal ids (masks, gradients, clip paths) now call `useId` and render unique ids per instance, e.g. `w3i-ethereumcirclemono-r1-ethc-a`. `useId` works in React Server Components, so icons still need no `'use client'`; icons without internal ids still call no hooks. Mask content also no longer inherits `fill` from the icon's `<svg>`.

- Default rendering is unchanged.
- Markup snapshots that contain icon ids need to be regenerated.
- If you mount several React roots on one page, give each its own `identifierPrefix` (`createRoot(el, { identifierPrefix: 'a-' })`), as for any `useId` consumer.

## 2. Icons with extra props are generated like every other icon

`AvalancheCircle(Mono)`, `Bybit*` and `RainbowWallet(Symbol)` were hand-written and are now generated from `icons/` like the rest, which fixes their drift from the other icons:

- With `title` and `titleId`, they now set `aria-labelledby` like every other icon.
- They are annotated `/* @__PURE__ */`, so importing one export of `Avalanche`, `Bybit` or `RainbowWallet` no longer bundles its siblings.
- `withBackground`, `fill1` and `fill2` render exactly as before for every combination of values.
- **`BybitProps` now holds only the extra props** (`fill1`, `fill2`); it no longer extends `IconProps`. `AvalancheProps` and `RainbowWalletProps` are now exported the same way.

```diff
- const props: BybitProps = { fill1: '#000', size: 24 };
+ const props: IconProps & BybitProps = { fill1: '#000', size: 24 };
+ // or: ComponentProps<typeof Bybit>
```

- `BybitMono` declares `fill="currentColor"` on its `<svg>` (like every mono icon) instead of on each path. It renders the same, and a CSS `fill` on the icon now reaches the paths.

## 3. Dynamic components render `fallback` when a chunk fails to load

`react-web3-icons/dynamic` components (`ChainIcon`, `CoinIcon`, …) no longer throw to the nearest error boundary when an icon chunk fails to load (network error, deploy skew). They render `fallback` and import the chunk again on a later render. They also forward `ref` to the `<svg>`, show their own names in React DevTools, and render `fallback` instead of throwing for `undefined`/`null` identifiers.

- If you relied on an error boundary to catch failed icon chunks, handle it with `fallback` instead.

## 4. Dynamic components: every variant, stricter `variant`, normalized identifiers

`variant` now accepts every variant suffix the category ships (`<ChainIcon name="ethereum" variant="Circle" />`), typed per category (`ChainVariant`, `CoinVariant`, `WalletVariant`, … from `react-web3-icons/dynamic`). `'colored'` and `'mono'` work as before.

- **An unknown variant renders `fallback`.** In v4, any `variant` other than `'mono'` rendered the colored icon. Now a value the category does not ship, or a variant the resolved icon lacks, renders `fallback` and warns once in development. TypeScript already rejects unknown literals; check values that come from untyped data or casts.

  ```diff
  - <CoinIcon symbol={symbol} variant={theme} />          // 'dark' rendered the colored icon
  + <CoinIcon symbol={symbol} variant={theme === 'dark' ? 'mono' : 'colored'} />
  ```

- **An unknown `chainId` falls back to `name`.** `<ChainIcon chainId={id} name={slug} />` with an ID this package does not know now renders the icon for `name` instead of `fallback`. Pass only `chainId` to keep the old behaviour.
- **Identifiers are normalized in every component**: case-insensitive, ignoring whitespace, `.`, `-` and `_` (`'layer-zero'`, `'Arbitrum Nova'`, `'Crypto.com'`), and manifest aliases and common wallet connector ids (`'phantom'`, `'metaMaskSDK'`, `'okx'`, …) resolve. Inputs that used to render `fallback` may now render an icon.
- **Types:** the `variant` prop of `ChainIconProps`, `CoinIconProps`, … is the category's variant union instead of `'colored' | 'mono'`. Code that copies it into a `'colored' | 'mono'` variable needs the wider type.

## Checklist

- [ ] Regenerate markup snapshots containing icon defs ids
- [ ] Type full `Bybit` props as `IconProps & BybitProps` (or `ComponentProps<typeof Bybit>`)
- [ ] Pass dynamic components only `variant` values of their category (`ChainVariant`, …); others render `fallback`

---

# Migrating from v3 to v4

v4 makes every static icon a pure, hook-free component so icons render in React Server Components without `'use client'`. See [CHANGELOG.md](./CHANGELOG.md) for full release notes.

## 1. `IconContext` removed

Icons no longer read defaults from context (`useContext` prevented server rendering). The `IconContext` export and `IconContextValue` type are gone.

Migration options, depending on what you used it for:

```diff
- <IconContext.Provider value={{ size: 32 }}>
-   <Ethereum />
-   <Bitcoin />
- </IconContext.Provider>
+ {/* Icons default to 1em — font-size scales them together */}
+ <div style={{ fontSize: 32 }}>
+   <Ethereum />
+   <Bitcoin />
+ </div>
```

For `className`/`style`/other defaults, wrap the icons you use once, at module scope:

```tsx
import { type ComponentType, forwardRef, type RefAttributes } from 'react';
import { Bitcoin, Ethereum, type IconProps } from 'react-web3-icons';

type IconComponent = ComponentType<Omit<IconProps, 'ref'> & RefAttributes<SVGSVGElement>>;

// Call at module scope, never inside a component: each call creates a new
// component type, and React remounts the icon whenever the type changes.
function withDefaults(Icon: IconComponent, defaults: Omit<IconProps, 'ref'>) {
  const WithDefaults = forwardRef<SVGSVGElement, Omit<IconProps, 'ref'>>((props, ref) => (
    <Icon {...defaults} {...props} ref={ref} />
  ));
  WithDefaults.displayName = `WithDefaults(${Icon.displayName ?? 'Icon'})`;
  return WithDefaults;
}

export const AppEthereum = withDefaults(Ethereum, { size: 32, className: 'my-icon' });
export const AppBitcoin = withDefaults(Bitcoin, { size: 32, className: 'my-icon' });
```

`forwardRef` keeps `ref` working on React 18 as well as 19. Props passed at the call site override the defaults; unlike `IconContext`, `style` is replaced rather than merged.

## 2. Deterministic internal SVG ids

Internal `id` attributes (masks, gradients) previously used React's `useId` and changed between renders. They are now stable, derived from the component name (e.g. `w3i-ethereumcirclemono-…`).

- Rendering the same icon multiple times on one page duplicates those ids. The duplicate definitions are identical, so icons render correctly — but if your tooling requires globally unique DOM ids, render such icons once and reuse via CSS.
- Markup snapshots that captured the old `useId`-based values need to be regenerated.

## 3. Node.js 20 support dropped (4.0.0 only)

4.0.0 declares `engines.node` `>=22.12.0`. Node 20 reached end-of-life on 2026-04-30. This only affects the declared support matrix — the published files are plain ESM and unchanged — but package managers will warn (or fail, with `engine-strict`) when installing 4.0.0 on Node 20. That check ran even for apps that only use the package in a browser bundle, because it is tied to the Node version running the install.

Releases after 4.0.0 no longer declare `engines`. What consumers need is an **ES2022** baseline: the published JavaScript is compiled to ES2022 and runs in any browser, bundler, or runtime that supports it, whatever the Node version. Node `^22.18.0 || >=24.11.0` is only required to build the library from source.

## 4. Artwork changes to existing icons

No export was renamed, but some existing icons look different in 4.0.0. Review them if you depend on their exact appearance (screenshots, visual-regression baselines, design files):

- **`Optimism`** (and its coin alias `Op`): a missing `fill-rule="evenodd"` hid the red core of the OP Mainnet sun; it is now visible.
- **`DeBridge`** and **`DeBridgeMono`**: replaced with the official standalone logomark from [debridge.com/brand](https://debridge.com/brand). The previous artwork was the avatar tile.
- **Mono variants redrawn to match their colored counterparts**: `BaseMono`, `CakeMono`, `CamelotMono`, `CoinGeckoMono`, `EkuboMono`, `LiquityMono`, `OptimismMono` (and `OpMono`), `OsmosisMono`, `PhantomWalletMono`, `RocketPoolMono`, `StargateMono`, `TallyMono`, `XmrMono`, `ZecMono`.

See the 4.0.0 entries in [CHANGELOG.md](./CHANGELOG.md) for what changed in each.

## 5. Fantom deprecated in favor of Sonic

Fantom Opera was succeeded by Sonic (FTM was upgraded 1:1 to S), so 4.0.0 adds `Sonic` / `SonicMono` (exported from both `react-web3-icons/chain` and `react-web3-icons/coin`) and deprecates the Fantom exports, following the [icon lifecycle policy](./docs/icon-lifecycle.md):

| Deprecated | Replacement |
| --- | --- |
| `Fantom` (chain) | `Sonic` |
| `FantomMono` (chain) | `SonicMono` |
| `Ftm` (coin) | `Sonic` |
| `FtmMono` (coin) | `SonicMono` |

The deprecated exports still work and render the Fantom artwork, but they carry `@deprecated` JSDoc and are listed in `DEPRECATED_ICON_NAMES`. They will be removed in a future major release.

```diff
- import { Fantom, Ftm } from 'react-web3-icons';
+ import { Sonic } from 'react-web3-icons';
```

## Checklist

- [ ] Replace `IconContext.Provider` usages (font-size wrapper or explicit props)
- [ ] Remove `IconContextValue` type imports
- [ ] Regenerate any markup snapshots containing icon defs ids
- [ ] Only if you install 4.0.0 exactly with `engine-strict`: run Node 22.12+ (later 4.x releases drop `engines`)
- [ ] Review screenshots or visual baselines that include the icons listed in section 4
- [ ] Optionally replace `Fantom` / `FantomMono` / `Ftm` / `FtmMono` with `Sonic` / `SonicMono`

---

# Migrating from v2 to v3

This guide covers all breaking changes in v3. See [CHANGELOG.md](./CHANGELOG.md) for the full release notes.

## 1. ESM only — CommonJS dropped

v3 ships ESM exclusively (`.mjs` / `.d.mts`). If you used `require()`:

```diff
- const { Ethereum } = require('react-web3-icons');
+ import { Ethereum } from 'react-web3-icons';
```

All modern bundlers (Vite, Webpack 5, Next.js) and Node.js 20+ support ESM natively. No import paths or API surface changed beyond the renames below.

## 2. Renamed exports — numeric suffixes replaced

Most `Foo2` / `Foo3` / `Foo4` exports are renamed to a descriptive suffix. A few are removed entirely (see [section 4](#4-removed-exports)). Either way, the old numbered names **no longer exist** and will cause import errors.

### Rename table

| v2 name | v3 name |
| --- | --- |
| `Algorand2` | `AlgorandCircle` |
| `Arbitrum2` | `ArbitrumCircle` |
| `ArbitrumMono2` | `ArbitrumCircleMono` |
| `ArbitrumOne2` | `ArbitrumOneFlat` |
| `ArbitrumOneMono2` | `ArbitrumOneFlatMono` |
| `ArbitrumNova2` | `ArbitrumNovaFlat` |
| `ArbitrumNovaMono2` | `ArbitrumNovaFlatMono` |
| `Avalanche2` | `AvalancheCircle` |
| `AvalancheMono2` | `AvalancheCircleMono` |
| `Bitcoin2` | `BitcoinCircle` |
| `BitcoinMono2` | `BitcoinCircleMono` |
| `Cardano2` | `CardanoCircle` |
| `CardanoMono2` | `CardanoCircleMono` |
| `Polygon2` | `PolygonCircle` |
| `PolygonMono2` | `PolygonCircleMono` |
| `Ada2` | `AdaCircle` |
| `AdaMono2` | `AdaCircleMono` |
| `Arb2` | `ArbCircle` |
| `ArbMono2` | `ArbCircleMono` |
| `Avax2` | `AvaxCircle` |
| `AvaxMono2` | `AvaxCircleMono` |
| `Btc2` | `BtcCircle` |
| `BtcMono2` | `BtcCircleMono` |
| `Dai2` | `DaiCircle` |
| `DaiMono2` | `DaiCircleMono` |
| `Looks2` | `LooksAlt` |
| `Pol2` | `PolCircle` |
| `PolMono2` | `PolCircleMono` |
| `Xrp2` | `XrpCircle` |
| `XrpMono2` | `XrpCircleMono` |
| `Aragon2` | `AragonCircle` |
| `AragonMono2` | `AragonCircleMono` |
| `Dydx2` | `DydxSquare` |
| `DydxMono2` | `DydxSquareMono` |
| `Ens2` | `EnsCircle` |
| `EnsMono2` | `EnsCircleMono` |
| `Bitstamp2` | `BitstampCircle` |
| `BitstampMono2` | `BitstampCircleMono` |
| `Bybit2` | `BybitInverted` |
| `Coinbase2` | `CoinbaseCircle` |
| `Coinbase3` | `CoinbaseCircleAlt` |
| `CoinbaseMono2` | `CoinbaseCircleMono` |
| `Etherscan2` | `EtherscanInverted` |
| `Bscscan2` | `BscscanInverted` |
| `Avascan2` | `AvascanWordmark` |
| `AvascanMono2` | `AvascanWordmarkMono` |
| `LooksRare2` | `LooksRareFlat` |
| `MagicEden2` | `MagicEdenWordmark` |
| `MagicEden3` | `MagicEdenFlat` |
| `MagicEden4` | `MagicEdenWordmarkFlat` |
| `MagicEdenMono2` | `MagicEdenWordmarkMono` |
| `OpenSea2` | `OpenSeaAlt` |
| `OpenSeaMono2` | `OpenSeaSymbolMono` |
| `Coinpanda2` | `CoinpandaCircle` |
| `Coinpanda3` | `CoinpandaSquare` |
| `CoinpandaMono2` | `CoinpandaCircleMono` |
| `CoinpandaMono3` | `CoinpandaSquareMono` |
| `MetaMask2` | `MetaMaskAlt` |
| `PhantomWalletMono2` | `PhantomWalletSymbolMono` |
| `RainbowWallet2` | `RainbowWalletSymbol` |
| `TrustWallet2` | `TrustWalletCircle` |
| `TrustWalletMono2` | `TrustWalletCircleMono` |
| `Zerion2` | `ZerionCircle` |
| `ZerionMono2` | `ZerionCircleMono` |

### Quick find-and-replace

For most projects, a regex replace across your source files handles the bulk of renames:

```
# Circle variants (most common)
s/Algorand2/AlgorandCircle/g
s/Arbitrum2/ArbitrumCircle/g
s/Bitcoin2/BitcoinCircle/g
# ... etc. — use the table above
```

## 3. Swapped base names

For some icons, the **base (unsuffixed) name now points to a different variant**. In v2, the base name was often the circle variant. In v3, the base name is typically the standalone symbol (icons whose official brand mark includes an integral background — such as OpenSea, ZkSync, or Scroll — retain that background as the base).

If you relied on `Bitcoin` being the orange circle, you need `BitcoinCircle` now:

```diff
- <Bitcoin />       {/* v2: orange circle — v3: standalone ₿ symbol */}
+ <BitcoinCircle /> {/* v3: orange circle */}
```

All swapped icons:

| v2 base name rendered | v3 equivalent |
| --- | --- |
| `Bitcoin` (circle) | `BitcoinCircle` |
| `Avalanche` (circle) | `AvalancheCircle` |
| `Dai` (circle) | `DaiCircle` |
| `Coinbase` (circle) | `CoinbaseCircle` |
| `MagicEden` (wordmark) | `MagicEdenWordmark` |
| `Avascan` (wordmark) | `AvascanWordmark` |

Coin aliases follow the same pattern: `Btc` (was circle) is now standalone, use `BtcCircle` for the circle.

## 4. Removed exports

These numbered variants are removed. Use the base name instead:

- `GnosisSafe2` — use `Safe` (identical component; `GnosisSafe` also works but is deprecated)
- `GnosisSafeMono2` — use `SafeMono` (identical component; `GnosisSafeMono` also works but is deprecated)

```diff
- import { GnosisSafe2 } from 'react-web3-icons';
+ import { Safe } from 'react-web3-icons';
```

## 5. Deprecated re-exports (still work, will be removed later)

These old names continue to work in v3 as re-exports, but emit TypeScript `@deprecated` warnings. Update at your convenience — they will be removed in a future major release.

| Deprecated name | Replacement |
| --- | --- |
| `EtherscanLight` | `EtherscanInverted` |
| `BasescanLight` | `BasescanInverted` |
| `BscscanLight` | `BscscanInverted` |
| `BybitLight` | `BybitInverted` |
| `Matic` | `Pol` |
| `MaticCircle` | `PolCircle` |
| `MaticMono` | `PolMono` |
| `MaticCircleMono` | `PolCircleMono` |
| `GnosisSafe` | `Safe` |
| `GnosisSafeMono` | `SafeMono` |

```diff
- import { EtherscanLight, Matic } from 'react-web3-icons';
+ import { EtherscanInverted, Pol } from 'react-web3-icons';
```

## Checklist

1. Replace all `require('react-web3-icons')` with `import`
2. Rename numbered variants using the table in section 2
3. Check if you use any swapped base names (section 3) — update if you expected the circle/wordmark variant
4. Replace `GnosisSafe2` / `GnosisSafeMono2` with `Safe` / `SafeMono`
5. Optionally update deprecated names (section 5) to avoid future breakage
