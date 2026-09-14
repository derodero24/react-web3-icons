---
"react-web3-icons": patch
---

Fix the Iconify collections dropping the fill declared on the source `<svg>` root. About 100 colored icons (e.g. `web3:chain-ton`, `web3:dex-uniswap`, `web3:exchange-binance`) rendered black because their brand colour lived on the root element; bodies are now wrapped in a `<g fill="…">` carrying that value. Mono icons with an explicit `fill="none"` root (stroke-only artwork) are no longer force-filled with `currentColor`.
