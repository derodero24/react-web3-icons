---
"react-web3-icons": major
---

Replace opaque numeric suffixes with descriptive variant names across all icon exports.

**Breaking changes:**

All numbered icon variants (`Foo2`, `Foo3`) are renamed to descriptive suffixes that convey the visual shape:

- `Circle` — symbol on circular background (e.g. `BitcoinCircle`)
- `Square` — symbol on square/rounded-rect background (e.g. `DydxSquare`)
- `Wordmark` — symbol with text (e.g. `MagicEdenWordmark`)
- `Alt` — alternative color scheme (e.g. `MetaMaskAlt`)
- `Light` — light-colored variant for dark backgrounds (e.g. `BybitLight`)
- `Flat` — single brand color simplification (e.g. `ArbitrumOneFlat`)
- `Symbol` / `SymbolMono` — standalone symbol without container (e.g. `RainbowWalletSymbol`, `OpenSeaSymbolMono`)

Some icons swap which variant is the base name — the standalone symbol (no background) is now always the unsuffixed default:

- `Bitcoin` is now the standalone ₿ symbol; the orange circle version is `BitcoinCircle`
- `Avalanche` is now the standalone A-mountain; the red circle is `AvalancheCircle`
- `Dai` is now the standalone D; the gold circle is `DaiCircle`
- `Coinbase` is now the standalone C; circle variants are `CoinbaseCircle` / `CoinbaseCircleAlt`
- `MagicEden` is now the icon only; wordmark variants are `MagicEdenWordmark` / `MagicEdenWordmarkFlat`
- `Avascan` is now the icon only; wordmark variants are `AvascanWordmark` / `AvascanWordmarkMono`

Coin aliases follow their chain counterparts (e.g. `Btc` → standalone, `BtcCircle` → circle).

Removed exports: `GnosisSafe2`, `GnosisSafeMono2` (duplicates of `GnosisSafe` / `GnosisSafeMono`).

See CONTRIBUTING.md § "Icon Variant Naming Convention" for the full suffix reference.
