---
"react-web3-icons": major
---

Toncoin was renamed Gram (GRAM), so the ticker `TON` resolves to the new `Gram` coin: `TICKER_TO_COIN.TON` is `'Gram'` and `<CoinIcon symbol="TON" />` renders the Gram mark.

**Breaking:** `react-web3-icons/coin` no longer exports `Ton` and `TonMono`, which re-exported the chain icon, the logo of The Open Network. A deprecated coin `Ton` cannot coexist with the chain `Ton` of the same name, so they are removed instead of deprecated. Import `Ton` / `TonMono` from the root or `react-web3-icons/chain` (the same component), or use `Gram` / `GramMono` for the token. `svg/coin/Ton.svg`, `svg/coin/TonMono.svg`, the Iconify aliases `coin-ton` and `coin-ton-mono` and the manifest's coin `Ton` entries are gone too. The chain `Ton` is unchanged.
