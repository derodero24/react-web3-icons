---
'react-web3-icons': minor
---

Redesign 21 monochrome variants that had drifted from their colored counterparts (lost containers, filled shapes reduced to outline rings, or details flattened into solid blobs): `BaseMono`, `OptimismMono`, `DogeMono`, `XmrMono`, `ZecMono`, `CakeMono`, `CrvMono`, `PepeMono`, `LiquityMono`, `RocketPoolMono`, `DeBridgeMono`, `StargateMono`, `EkuboMono`, `OsmosisMono`, `CamelotMono`, `TruffleMono`, `DrizzleMono`, `TallyMono`, `CollabLandMono`, `CoinGeckoMono`, and `PhantomWalletMono`. Monos now follow a documented rule (see CONTRIBUTING "Mono design rules"): same silhouette as the colored variant, containers kept and glyphs knocked out in a single `currentColor` shape. A new `scripts/audit-mono.mjs` tool rasterizes every colored/mono pair and flags outliers.
