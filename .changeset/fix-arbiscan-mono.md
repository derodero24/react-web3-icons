---
"react-web3-icons": patch
---

fix(explorer): ArbiscanMono now renders the complete Arbitrum A mark

The previous implementation was missing the two chevron paths that form the upper/inner triangular portion of the Arbitrum A mark, leaving only two diagonal bars inside a hexagon ring. ArbiscanMono now uses a mask-based silhouette approach — a solid hexagon with all logo paths (chevrons, ring outline, and diagonal bars) cut out — producing the recognizable Arbitrum logo in monochrome.
