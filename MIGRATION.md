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

Every `Foo2` / `Foo3` / `Foo4` export is renamed to a descriptive suffix. The old numbered names **no longer exist** and will cause import errors.

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
| `Bybit2` | `BybitLight` |
| `Coinbase2` | `CoinbaseCircle` |
| `Coinbase3` | `CoinbaseCircleAlt` |
| `CoinbaseMono2` | `CoinbaseCircleMono` |
| `Etherscan2` | `EtherscanLight` |
| `Bscscan2` | `BscscanLight` |
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

For some icons, the **base (unsuffixed) name now points to a different variant**. In v2, the base name was often the circle variant. In v3, the base name is always the standalone symbol.

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

These exports are deleted with no replacement alias:

- `GnosisSafe2` — use `GnosisSafe` (identical component)
- `GnosisSafeMono2` — use `GnosisSafeMono` (identical component)

```diff
- import { GnosisSafe2 } from 'react-web3-icons';
+ import { GnosisSafe } from 'react-web3-icons';
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
4. Replace `GnosisSafe2` / `GnosisSafeMono2` with `GnosisSafe` / `GnosisSafeMono`
5. Optionally update deprecated names (section 5) to avoid future breakage
