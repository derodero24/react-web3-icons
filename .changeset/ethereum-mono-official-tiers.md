---
"react-web3-icons": patch
---

**Visual change: `EthereumMono` (and the `EthMono` coin re-export) now shows the diamond's facets.** It is ethereum.org's own one-colour diamond, `eth-diamond-black.svg` ("ETH diamond (gray)" on ethereum.org/assets), in `currentColor` with the file's opacity tiers: `.45` for the left faces, `.6` for the middle band and `.8` for the right faces. The previous mono used near-opaque tiers (`.85` to `1`), so it read as a solid silhouette. `Ethereum`, `EthereumCircle` and `EthereumSquare` keep their artwork; the unit now cites the exact ethereum.org file.
