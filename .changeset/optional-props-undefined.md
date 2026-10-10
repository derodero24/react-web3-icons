---
"react-web3-icons": patch
---

Optional props now accept `undefined` under `exactOptionalPropertyTypes`, like the SVG attributes of `@types/react`: `title`, `titleId` and `size` of every icon, `withBackground`, `fill1` and `fill2` of the icons with extra props, and `variant` of the `react-web3-icons/dynamic` components. `<Ethereum title={label} />` with `label: string | undefined` now type-checks, and so does spreading an `IconProps` object into `<ChainIcon chainId={id} {...props} />`.
