---
"react-web3-icons": major
---

**Breaking (types):** `ChainIcon` needs `chainId`, `name`, or both. `<ChainIcon />` and `<ChainIcon variant="mono" />` type-checked but could only render `fallback`; they are now type errors, as a missing identifier already is for the other dynamic components. A `chainId` or `name` that may be `undefined` counts only next to one that is defined. `ChainIconProps` is now a union type alias instead of an interface: `interface MyProps extends ChainIconProps` no longer compiles, so write `type MyProps = ChainIconProps & { … }`, and `Omit<ChainIconProps, …>` no longer requires an identifier. See the [migration guide](https://github.com/derodero24/react-web3-icons/blob/develop/MIGRATION.md#4-dynamic-components-every-variant-stricter-variant-normalized-identifiers).
