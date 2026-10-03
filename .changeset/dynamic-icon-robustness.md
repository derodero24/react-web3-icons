---
"react-web3-icons": major
---

Make the `react-web3-icons/dynamic` components (`ChainIcon`, `CoinIcon`, …) robust:

- **Breaking:** a failed icon chunk load (network error, deploy skew) renders `fallback` instead of throwing to the nearest error boundary, and is retried on a later render instead of failing until a full reload.
- `ref` reaches the underlying `<svg>` on React 18 and 19.
- Each component has its own `displayName` (`ChainIcon`, `CoinIcon`, …) instead of `DynamicIconInner`.
- `undefined`, `null` or non-string identifiers from untyped data render `fallback` instead of throwing.
- Development builds warn once per unknown identifier and per failed load, also in browser bundlers such as Vite (the old check never ran there); production builds strip the warnings.
