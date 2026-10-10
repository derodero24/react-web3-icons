---
"react-web3-icons": minor
---

Add `DataNetwork` for DATA Network (formerly Story, chain ID 1514) from the DATA Foundation brand kit (#706):

- `DataNetwork` / `DataNetworkMono`: the official Symbol in `#1A1A1A`, and the same mark in `currentColor`.
- `DataNetworkSquare` / `DataNetworkSquareMono`: the official $DATA token badge, a `#1A1A1A` square with the mark in `#F8F8F6`, and the square in `currentColor` with the mark knocked out. Use the square on dark backgrounds.
- `<ChainIcon>` and `CHAIN_ID_TO_NAME` / `CHAIN_SLUG_TO_NAME` resolve chain ID `1514` and the slugs `data-network`, `data` and the old name `story`.
- The coin re-export `Data` (`DataMono`, `DataSquare`, `DataSquareMono`) resolves the ticker `DATA` and the legacy ticker `IP` through `<CoinIcon>` and `TICKER_TO_COIN`, since $IP converted 1:1 to $DATA.
