---
"react-web3-icons": major
---

The manifest (`react-web3-icons/manifest`, `dist/manifest.json`) describes every icon the same way, re-exports included.

- Entries that re-export another icon now carry `variants` and `brandColor`: the re-exported coins (`Eth`, `Btc`, `Sol`, `Bnb`, `Flr`, …), chain `CosmosHub`, `Hyperliquid` and `OpBnb`, and defi `SafeProtocol`. `variants` lists the suffixes the entry's own category exports (`Eth`: `['', 'Mono', 'Circle', 'CircleMono']`), and `brandColor` is the colour of the icon it re-exports (`Eth` has `Ethereum`'s `#8c8c8c`).
- `ArbitrumOne` and `ArbitrumNova` carry their own `variants` (`['', 'Mono']`) and `brandColor` (`#1b4add` and `#ff7700`). **Breaking:** `Arbitrum`'s `variants` no longer list `'One'`, `'OneMono'`, `'Nova'` and `'NovaMono'`; as in the dynamic components, they are icons of their own.
- **Breaking:** `variants` no longer list deprecated variants, unless the icon itself is deprecated. Compared with 4.0.0, `MetaMask` and `OpenSea` no longer list `'Alt'`, and `MagicEden` no longer lists `'Flat'` and `'WordmarkFlat'`.
- Every `variants` list starts with `''` and `'Mono'`, then lists each other suffix followed by its mono (`Bitcoin`: `['', 'Mono', 'Circle', 'CircleMono']`, was `['Circle', '', 'CircleMono', 'Mono']`).
