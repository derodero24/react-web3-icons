---
'react-web3-icons': minor
---

Add native-token coin exports for chains already in the library — `ALGO`, `SEI`, `SUI`, `BERA`, `STRK`, `CELO`, `KAVA`, `ASTR`, `TAIKO` — plus `HYPE` and the Hyperliquid chain entry (EVM chain id 999, HyperEVM). All of them re-export existing artwork (no duplicated SVG paths), so `<CoinIcon symbol="SUI" />`, `<ChainIcon chainId={999} />`, and the corresponding `TICKER_TO_COIN` / `CHAIN_ID_TO_NAME` / `CHAIN_SLUG_TO_NAME` lookups now resolve.
