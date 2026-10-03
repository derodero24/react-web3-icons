---
"react-web3-icons": patch
---

Make illegible `*Mono` variants read as their coloured marks again (#746). Every redraw is derived from the coloured artwork, in one ink colour with holes:

- `AvalancheSquareMono` keeps the rounded square: the disc is knocked out of it and the A drawn back in ink.
- `AtomMono` shows its orbits, electrons and nucleus instead of a plain disc.
- `RainbowWalletMono`, `RainbowWalletSymbolMono`, `RainbowWalletCircleMono` and `RainbowWalletSquareMono` keep the three bands apart with thin seams.
- `ArbiscanMono` has its ring and notch back around the inked hexagon.
- `MetaMaskMono` gets eyes, a mouth and ear seams; `MetaMaskCircleMono` and `MetaMaskSquareMono` lose the hairlines between the facets.
- `RoutescanMono` and `DefiLlamaMono` drop their opacity tiers: a seamed hexagon, and the D with the llama knocked out.
- `DogeMono` is the full coin with the coloured D knocked out, `ShibMono` regains the disc behind the head, and `CrvMono` shows the tube and its bands instead of a blob.
