---
'react-web3-icons': minor
---

Dynamic components (`react-web3-icons/dynamic`) now lazy-load exactly one per-icon chunk per resolved identifier instead of the entire category bundle — with code splitting, rendering `<CoinIcon symbol="ETH" />` downloads a ~7 KB gzip entry plus a small per-icon chunk rather than the ~50 KB category module. The dist output is also unbundled (one module per icon), which improves file-level tree-shaking for all bundlers: a single static icon import now costs ~0.5 KB brotli.
