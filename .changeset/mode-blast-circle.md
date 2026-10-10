---
"react-web3-icons": minor
---

Add `ModeCircle` / `ModeCircleMono` and `BlastCircle` / `BlastCircleMono`, so the pale chartreuse and yellow marks have an official variant that reads on light backgrounds:

- `ModeCircle` is Mode's token icon (`Token.svg` in Mode's brand kit, github.com/mode-network/brandkit): the M in black on a `#DFFE00` disc.
- `BlastCircle` is the round icon blast.io serves (`/icons/blast-color.svg`): the `#FCFC03` mark on a black disc.
- The `CircleMono` variants are the disc in `currentColor` with the mark knocked out.

`<ChainIcon name="mode" variant="Circle" />` and `<ChainIcon name="blast" variant="Circle" />` render them. `Mode`, `Blast` and their monos are unchanged; their sources now cite the exact kit and site files.
