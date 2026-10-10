---
"react-web3-icons": minor
---

Stop shipping the same artwork twice under two exports: `StarknetCircle` / `StarknetCircleMono` (chain; `StrkCircle` / `StrkCircleMono` in coin) are now the `Starknet` / `StarknetMono` components, and `CeloscanSquare` / `CeloscanSquareMono` (explorer) the `Celoscan` / `CeloscanMono` components. The official Starknet symbol is already a disc and the official Celoscan mark is already the square tile, so each pair drew an identical file. They are not deprecated, and sharing the component does not change what they render; `<ChainIcon name="starknet" variant="Circle" />` keeps working.

- Their internal ids and React DevTools name now carry the default's name (`w3i-starknet-…` instead of `w3i-starknetcircle-…`).
- In the Iconify sets, `chain-starknet-circle`, `chain-starknet-circle-mono`, `explorer-celoscan-square` and `explorer-celoscan-square-mono` are aliases of the default icons instead of icons of their own.
- In the manifest, `'Circle'` and `'CircleMono'` stay among the `variants` of `Starknet`, and `'Square'` and `'SquareMono'` among those of `Celoscan`.

Two more pairs drew identical files once the official BNB Chain and Arbitrum art landed (#873, #872), and now share one component:

- `Bnb`, `BnbMono`, `BnbCircle` and `BnbCircleMono` (coin) re-export `BnbSmartChain`, `BnbSmartChainMono`, `BnbSmartChainCircle` and `BnbSmartChainCircleMono` (chain), like `Arb` → `Arbitrum`. Both units drew the brand kit's `BNB Chain_Symbol_Yellow.svg`. The ticker `BNB` still resolves to `Bnb`. Like the other re-exported coins, the manifest entry for `Bnb` has `BnbSmartChain`'s `brandColor` and no `aliases` of its own (`BnbSmartChain` lists `'bnb'`).
- `ArbiscanMono` (explorer) re-exports `ArbitrumMono`: Arbiscan publishes no one-colour mark, so its mono already was the Arbitrum kit's one-colour logomark. `Arbiscan` keeps its own colored file (Arbiscan's `logo-symbol.svg`).
- In the Iconify sets, `coin-bnb`, `coin-bnb-mono` and `explorer-arbiscan-mono` become aliases instead of icons of their own.
