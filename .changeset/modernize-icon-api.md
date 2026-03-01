---
"react-web3-icons": major
---

Modernize icon component API with `createIcon` factory pattern:

- Add `ref` forwarding via `React.forwardRef` for all icon components
- Add `size` prop (defaults to `"1em"`) for convenient sizing
- Add `title` and `titleId` props for accessible labeling
- Add automatic `aria-hidden` when no accessible name is provided
- Fix SVG ID collisions by generating unique IDs via `React.useId()`
- Update `IconProps` to extend `SVGProps<SVGSVGElement>`
