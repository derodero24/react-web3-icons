---
"react-web3-icons": minor
---

Stop shipping the same artwork twice under two exports: `StarknetCircle` / `StarknetCircleMono` (chain; `StrkCircle` / `StrkCircleMono` in coin) are now the `Starknet` / `StarknetMono` components, and `CeloscanSquare` / `CeloscanSquareMono` (explorer) the `Celoscan` / `CeloscanMono` components. The official Starknet symbol is already a disc and the official Celoscan mark is already the square tile, so each pair drew an identical file. They are not deprecated and render the same artwork as before; `<ChainIcon name="starknet" variant="Circle" />` keeps working.

- Their internal ids and React DevTools name now carry the default's name (`w3i-starknet-…` instead of `w3i-starknetcircle-…`).
- In the Iconify sets, `chain-starknet-circle`, `chain-starknet-circle-mono`, `explorer-celoscan-square` and `explorer-celoscan-square-mono` are aliases of the default icons instead of icons of their own.
- In the manifest, the `variants` of `Starknet` and `Celoscan` list the same suffixes in a new order, with the alias suffixes first as for `Usdc`, `Op` and `Doge`: `['Circle', 'CircleMono', '', 'Mono', 'Square', 'SquareMono']` and `['Square', 'SquareMono', '', 'Mono']`.
