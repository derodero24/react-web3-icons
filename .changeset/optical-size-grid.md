---
"react-web3-icons": major
---

Draw every icon on a uniform 64×64 grid so icons of the same size look the same size (#704).

- **Breaking (visual):** every icon's `viewBox` is now `0 0 64 64`. Bare marks are scaled so their painted box's longer side is 56 units, centred; containers (`Circle*` / `Square*` variants, and marks that are themselves a solid disc or square) fill all 64 units. Icons whose artwork was letterboxed in the square `size` box (`Ethereum`, `Aave`, `Avascan`, `LayerZero`, …) or carried uneven padding now render larger (up to ×1.75, e.g. `Tangem`, `BackpackWallet`); marks that already filled a square viewBox edge to edge now render about 12.5% smaller (×0.875), because they gain the 4-unit padding. Brand shapes and colours are unchanged. Regenerate markup snapshots, and re-check custom CSS that compensated for the old per-icon viewBoxes. See MIGRATION.md.
- Marks that overflowed their old viewBox and were clipped at its edge are now shown whole: `Eclipse`, `Frax`, `Lido`, `SushiSwap`, `Binance`, `Helius`, `RedStone` (and their `Mono` variants).
- `react-web3-icons/svg/*` and the Iconify sets follow: every Iconify icon is 64×64, so `info.height` is 64.
