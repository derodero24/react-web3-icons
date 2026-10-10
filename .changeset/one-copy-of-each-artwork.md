---
"react-web3-icons": minor
---

Ship each artwork once. These exports drew a second copy of another icon's official artwork, in slightly different markup, and now re-export that icon, so both names are one component. Export names, tickers and slugs are unchanged, and each pair rendered the same in Chromium, up to anti-aliasing at the edges.

- `Tia` / `TiaMono`, `Hbar` / `HbarMono` and `Stx` / `StxMono` (coin) re-export `Celestia`, `Hedera` and `Stacks` (chain), and `Ena` / `EnaMono` (coin) re-export `Ethena` / `EthenaMono` (defi).
- `Arbiscan` (explorer) re-exports `Arbitrum`, as `ArbiscanMono` already re-exported `ArbitrumMono`.
- `Blastscan` / `BlastscanMono` (explorer) re-export `Blast` / `BlastMono` (chain). `BlastscanLight` keeps its own artwork.
- `OkxWallet` / `OkxWalletMono` (wallet) are `Okx` / `OkxMono` (exchange): both units drew the checker of OKX's own header lockup. The deprecated `OKXWallet` / `OKXWalletMono` still work.
- They render under the re-exported icon's name: React DevTools shows `Celestia` for `Tia`, and the internal ids of `Ena` read `w3i-ethena-…`.
- In the Iconify sets, `coin-tia`, `coin-tia-mono`, `coin-hbar`, `coin-hbar-mono`, `coin-stx`, `coin-stx-mono`, `coin-ena`, `coin-ena-mono`, `explorer-arbiscan`, `explorer-blastscan`, `explorer-blastscan-mono`, `wallet-okx-wallet` and `wallet-okx-wallet-mono` are now aliases of the re-exported icons instead of icons of their own.
- In the manifest, `Tia`, `Hbar`, `Stx`, `Ena`, `Arbiscan` and `OkxWallet` no longer carry `variants` or `brandColor`, like the other re-exported icons; read them from the icon they re-export. `Blastscan` lists its variants as `['', 'Mono', 'Light']`. The curated brand colours of `Tia` and `Stx` move to the chain icons: `Celestia`'s `brandColor` changes from `#0e1014` to `#5640d1` (Celestia's Indigo) and `Stacks`' from `#141414` to `#fc6432` (the Stacks orange).
