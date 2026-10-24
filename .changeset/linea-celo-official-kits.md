---
"react-web3-icons": patch
---

**Visual change: `Linea` and `Celo` now use the files from their official brand kits** (#835).

- `Linea` is the standalone logomark from Linea's brand kit (linea.build/assets): the `#121212` L and dot, with no background. It replaces the black square with a white L, which the kit no longer has. The new `LineaCircle` and `LineaSquare` are the LINEA token from the same kit, the `#190066` mark on a `#61DFFF` disc or square, with `LineaCircleMono` and `LineaSquareMono`. `<ChainIcon name="linea" variant="Circle" />` (or `"Square"`) selects them. Its manifest `brandColor` changes from `#000000` to the token's `#61dfff`.
- `Celo` is the official Celo symbol in Prosperity Yellow (`#FCFF52`) from celo.org/brand-kit, in place of a third-party redraw in `#FCFE52`; the outline is the same. Coin `Celo` re-exports it.

`Sonic`'s default mark was checked against Sonic's current files and is unchanged.
