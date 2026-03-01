---
"react-web3-icons": minor
---

Add `IconContext` for setting default icon props via React Context. Wrap icons in `<IconContext.Provider value={{ size: 24, className: 'icon' }}>` to apply defaults to all descendant icons. Direct props override context values; `style` is shallow-merged.
