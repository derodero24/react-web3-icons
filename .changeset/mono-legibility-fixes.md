---
"react-web3-icons": patch
---

Make illegible `*Mono` variants read as their coloured marks again (#746). Every redraw is derived from the coloured artwork, in one ink colour with holes:

- `RainbowMono`, `RainbowSymbolMono`, `RainbowCircleMono` and `RainbowSquareMono` keep the three bands apart with thin seams.
- `RoutescanMono` and `DefiLlamaMono` drop their opacity tiers: a seamed hexagon, and the D with the llama knocked out.
- `DogeMono` is the full coin with the coloured D knocked out, `ShibMono` regains the disc behind the head, and `CrvMono` shows the tube and its bands instead of a blob.
