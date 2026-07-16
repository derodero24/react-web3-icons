---
'react-web3-icons': major
---

Icons are now pure, hook-free components that render in React Server Components without `'use client'`. Breaking changes:

- **`IconContext` and `IconContextValue` are removed.** Icons no longer read defaults from context (the `useContext` call forced a client boundary). Use font-size scaling (icons default to `1em`) or a small wrapper component to apply shared defaults — see MIGRATION.md.
- **Internal SVG ids are deterministic** (derived from the component name) instead of `useId`-based. Rendering the same icon twice duplicates those ids with identical definitions; rendering output is otherwise unchanged. Markup snapshots that captured the old ids need regeneration.
