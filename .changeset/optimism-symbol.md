---
"react-web3-icons": patch
---

**Visual change: `Optimism` is now a square, not a circle.** It is the official OP Mainnet symbol from Optimism's brand kit (optimism.io/brand), the glyph in `#FAFAF9` on a full-bleed `#FF0421` (Optimism Red) square. It was a `#FF0420` disc with a white glyph. `OptimismMono` follows the new square shape. No export names change.

- `OptimismSquare` is the symbol as the brand page shows it, on a `#FF0421` square with slightly rounded corners (6.27 of 64 units, down from 12.8). The glyph is drawn at the symbol's own size, larger than before.
- `OptimismCircle` uses the official colours and draws the glyph at the symbol's own size on the `#FF0421` disc. Optimism publishes no circular OP Mainnet symbol, so the disc is still a repo convention.
- `OptimismMono`, `OptimismCircleMono` and `OptimismSquareMono` are their variant's container in `currentColor` with the glyph knocked out.
- **`Op` is now the official OP token mark**, the letters OP in `#FAFAF9` on a `#FF0421` disc (`Token.svg` from the brand kit). Optimism's brand page reserves this mark for the token, so `Op` no longer re-exports the `Optimism` chain symbol. `OpMono` is the disc in `currentColor` with the letters knocked out. `OpCircle` and `OpCircleMono` are now the same components as `Op` and `OpMono`. The `OP` ticker lookup is unchanged.
