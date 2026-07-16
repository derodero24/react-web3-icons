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

For `className`/`style`/other defaults, wrap once yourself:

```tsx
import type { IconProps } from 'react-web3-icons';

const withDefaults =
  (Icon: React.ComponentType<IconProps>) => (props: IconProps) => (
    <Icon size={32} className="my-icon" {...props} />
  );
```

## 2. Deterministic internal SVG ids

Internal `id` attributes (masks, gradients) previously used React's `useId` and changed between renders. They are now stable, derived from the component name (e.g. `w3i-ethereumcirclemono-…`).

- Rendering the same icon multiple times on one page duplicates those ids. The duplicate definitions are identical, so icons render correctly — but if your tooling requires globally unique DOM ids, render such icons once and reuse via CSS.
- Markup snapshots that captured the old `useId`-based values need to be regenerated.

## 3. Node.js 20 support dropped

`engines.node` is now `>=22.12.0`. Node 20 reached end-of-life on 2026-04-30. This only affects the declared support matrix — the published files are plain ESM and unchanged — but package managers will warn (or fail, with `engine-strict`) when installing on Node 20. Browsers and bundlers are unaffected.

## Checklist

- [ ] Replace `IconContext.Provider` usages (font-size wrapper or explicit props)
- [ ] Remove `IconContextValue` type imports
- [ ] Regenerate any markup snapshots containing icon defs ids
- [ ] Ensure CI/deploy environments run Node 22.12+ (if they install with `engine-strict`)

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
