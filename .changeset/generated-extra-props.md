---
"react-web3-icons": major
---

Generate the icons with extra props (`AvalancheCircle`/`AvalancheCircleMono` `withBackground`, `Bybit*` `fill1`/`fill2`, `RainbowWallet`/`RainbowWalletSymbol` `withBackground`) like every other icon instead of hand-writing them.

- They now set `aria-labelledby` from `title` + `titleId`, like every other icon.
- Their `createIcon` calls are `/* @__PURE__ */`-annotated, so importing e.g. `AvalancheMono` no longer bundles `AvalancheCircle`.
- Rendering is unchanged for every combination of `withBackground`, `fill1`, `fill2` and `fill`.
- **Breaking (types):** `BybitProps` now declares only `fill1` and `fill2` and no longer extends `IconProps`; use `IconProps & BybitProps` or `ComponentProps<typeof Bybit>`. `AvalancheProps` and `RainbowProps` (of `Rainbow`, formerly `RainbowWallet`) are exported the same way.
- `BybitMono` (and `react-web3-icons/svg/exchange/BybitMono.svg`) declares `fill="currentColor"` on the `<svg>` instead of on each path, like every mono icon. It renders the same, and a CSS `fill` on the icon now reaches the paths.
