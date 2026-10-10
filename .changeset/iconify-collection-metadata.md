---
"react-web3-icons": patch
---

Complete the Iconify collection metadata and pass Iconify's own validators (`react-web3-icons/iconify.json`, `iconify-mono.json`):

- `info.samples` named `coin-bitcoin`, which is not an icon (`coin-btc` is an alias of `chain-bitcoin`). The samples are now six visible icons: `chain-ethereum`, `chain-bitcoin`, `chain-solana`, `wallet-meta-mask`, `dex-uniswap`, `exchange-binance` (`-mono` in the mono set).
- `info.total` counted hidden (deprecated) icons; it now counts visible icons, as Iconify does.
- New `info.version` (the package version) and `info.category` (`Logos`, where Iconify lists brand sets).
- Colored icons with shapes that set no fill (e.g. `web3:chain-linea`, `web3:chain-stellar`) now state the black they render with, wrapped in `<g fill="#000">`. Iconify's tooling reported these as unset colours and could not detect the set's palette. Rendering is unchanged.
