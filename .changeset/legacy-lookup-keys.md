---
"react-web3-icons": minor
---

New lookup keys for icons that already ship: the legacy tickers `MATIC` (→ `Pol`) and `KLAY` (→ `Kaia`), since MATIC and KLAY converted 1:1 to POL and KAIA, and the EVM chain IDs `295` (→ `Hedera`) and `1776` (→ `Injective`). `<CoinIcon symbol="MATIC" />`, `<CoinIcon symbol="KLAY" />`, `<ChainIcon chainId={295} />` and `<ChainIcon chainId={1776} />` rendered `fallback` before. In the manifest, `Hedera` and `Injective` gain a `chainId`.
