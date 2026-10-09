# Iconify Collections

Every release ships the icon set as two
[IconifyJSON](https://iconify.design/docs/types/iconify-json.html)
collections, generated from `icons/` by
`scripts/build-icons/emit-iconify.ts` during `pnpm run build`:

| npm subpath | File | Prefix | Contents |
| --- | --- | --- | --- |
| `react-web3-icons/iconify.json` | `dist/iconify.json` | `web3` | Colored variants (`palette: true`) |
| `react-web3-icons/iconify-mono.json` | `dist/iconify-mono.json` | `web3-mono` | `*Mono` variants in `currentColor` (`palette: false`) |

Icon names are `<category>-<kebab-name>` (`chain-ethereum`,
`chain-ethereum-circle-mono`). Ticker and re-export names become Iconify
aliases (`coin-btc` → `chain-bitcoin`); deprecated exports stay as hidden
icons or hidden aliases, so existing references keep resolving without
showing up in search. Internal SVG ids are prefixed per icon
(`chain-ethereum-circle-mono_ethc-a`), and colours declared on a source's
root `<svg>` are kept on a wrapping `<g>`. See the
[README](../README.md#other-frameworks-iconify) for usage.

## Metadata

`info` follows `IconifyInfo` from `@iconify/types`:

| Field | Value |
| --- | --- |
| `name` | `React Web3 Icons` / `React Web3 Icons Mono` |
| `total` | Number of visible icons, counted as Iconify counts them (hidden icons and aliases excluded) |
| `version` | The package version the file ships in |
| `author` | `derodero24`, linking to this repository |
| `license` | `MIT` (SPDX `MIT`), linking to `LICENSE` |
| `samples` | `chain-ethereum`, `chain-bitcoin`, `chain-solana`, `wallet-meta-mask`, `dex-uniswap`, `exchange-binance` (`-mono` in the mono set) |
| `height` | `64`: every icon is drawn on the same 64×64 grid (see [Optical Size](../CONTRIBUTING.md#optical-size)) |
| `displayHeight` | `16`: `height` scaled by powers of two into Iconify's 16–24 preview range, as Iconify derives it |
| `category` | `Logos`, the section Iconify lists brand sets under (Simple Icons, SVG Logos, Web3 Icons, Cryptocurrency Icons) |
| `palette` | `true` for `web3`, `false` for `web3-mono` |

`tags` is not set: Iconify uses it for a fixed set of drawing traits
("Has Padding", "Precise Shapes", "Uses Stroke", …) that do not hold across
brand artwork: containers fill the whole grid while bare marks are padded,
and shapes follow each brand's own geometry rather than a pixel grid.

## Validation

`test/iconify.test.ts` builds both collections in memory and checks them
with Iconify's own libraries, the same ones Iconify uses to import sets:

- `@iconify/utils`: `validateIconSet` (strict, without `fix`) and
  `quicklyValidateIconSet` accept each set unchanged, and
  `convertIconSetInfo` parses `info` without dropping a field.
- `@iconify/tools`, for every icon body: `checkBadTags` finds no unknown or
  unsafe elements, `cleanupSVG` leaves the body unchanged,
  `analyseSVGStructure` finds no broken references, and `validateColors`
  finds only `currentColor` in mono icons, no `currentColor` in colored ones,
  and no unset colours. `detectIconSetPalette` agrees with `info.palette`.
- Every sample is a visible icon, and `info.height` is present exactly when
  all icons share a height.

One known exception: `cleanupSVG` drops `mix-blend-mode` (which Iconify does
not support) from `chain-astar` and `domain-ens`. Those are blend effects of
the official artwork; if Iconify's import cleans the bodies, the two icons
render without them. The test allows that change for these two icons only.

## Trademarks

The IconifyJSON format has no field for a trademark notice, so it lives here
and in the [README](../README.md#trademarks): all product names, logos and
brands in these collections are the property of their respective owners and
are used for identification only. Their inclusion does not imply affiliation
with or endorsement by the trademark holders. The MIT license covers the
collection files, not the trademarks; use of a logo remains subject to its
owner's brand guidelines.

## Submitting to Iconify

Only the repository owner submits the collections. Iconify's
[requirements](https://iconify.design/docs/articles/add-icon-set/) are an
open-source license (MIT), an automatically updatable source (the npm
package), and icons that are broadly useful at small sizes.

1. Check that `npm view react-web3-icons version` prints 5.0.0 or later.
   Iconify imports the sets from the published package, and 4.0.0's JSON
   predates the [validation](#validation) above: 7 colored icons have unset
   colours, so the palette cannot be detected; the sample `coin-bitcoin` is
   not an icon; `total` counts hidden icons; and `height` is 24, from before
   the 64×64 grid.
2. Check that the prefixes are still free:
   `https://api.iconify.design/collections?hidden=true` must have no `web3`
   or `web3-mono` key (both were free on 2026-10-09; the closest existing
   sets are `token` and `token-branded`, "Web3 Icons" by 0xa3k5).
3. Open an issue at
   [iconify/icon-sets](https://github.com/iconify/icon-sets/issues/new)
   with:
   - the source: npm package `react-web3-icons`, files
     `dist/iconify.json` and `dist/iconify-mono.json` (also published as
     plain SVGs under `dist/svg/`);
   - the requested prefixes `web3` (colored) and `web3-mono` (monochrome),
     and that the JSON is generated and validated with `@iconify/utils` and
     `@iconify/tools` on every release;
   - license MIT, repository and homepage links, and the trademark note
     above.
4. Once the sets are listed, update the README's Iconify section (API
   loading, `@iconify/json` / `@iconify-json/web3`) and close
   [#702](https://github.com/derodero24/react-web3-icons/issues/702).

If Iconify asks for different prefixes, rename them in `emit-iconify.ts`, the
README and this file in one change; the npm subpaths stay as they are.

## Keeping the collections fresh

Nothing beyond the normal release is needed. The release workflow builds
`dist/` (including both JSON files) before `pnpm changeset publish`, so every
npm version carries collections generated from the same `icons/` tree as its
components, with `info.version` and `info.total` updated. Iconify only lists
sets whose source it can update automatically, and refreshes listed sets
from that source, so once the npm package is registered as the source, an
icon added in a release reaches the Iconify API without a separate step
here. No release-workflow change is needed.

## unplugin-icons

Until the sets are in `@iconify/json`, register the shipped JSON as custom
collections:

```ts
// vite.config.ts
import { getIconData, iconToHTML, iconToSVG } from '@iconify/utils';
import Icons from 'unplugin-icons/vite';
import web3 from 'react-web3-icons/iconify.json' with { type: 'json' };
import web3Mono from 'react-web3-icons/iconify-mono.json' with { type: 'json' };
import { defineConfig } from 'vite';

const loader = (set: typeof web3) => (name: string) => {
  const icon = getIconData(set, name);
  if (!icon) return undefined;
  const { attributes, body } = iconToSVG(icon);
  return iconToHTML(body, attributes);
};

export default defineConfig({
  plugins: [
    Icons({
      customCollections: { web3: loader(web3), 'web3-mono': loader(web3Mono) },
    }),
  ],
});
```

Then import icons as `~icons/web3/chain-ethereum` or
`~icons/web3-mono/chain-ethereum-mono`.
