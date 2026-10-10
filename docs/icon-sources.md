# Icon Sources and Attribution

Where icon artwork may come from and how its origin is recorded. Every icon
addition or update must follow these rules; see the
[contributing guide](../CONTRIBUTING.md#adding-a-new-icon) for the workflow.

## Source Attribution (Required)

Every new unit records where its artwork came from in the `source` array of
`icons/<category>/<slug>.json` (pass `--source` to `pnpm run new-icon`, or edit
the JSON). The generator emits it as a `// Source:` comment right after the
imports in the `.tsx`, so `grep -r "// Source:" src/` still works for audits —
never edit that comment by hand; change the JSON and regenerate. A few older
units predate the `source` field; add it when you touch them.

```json
{
  "$schema": "../schema.json",
  "name": "MyToken",
  "source": ["https://github.com/org/repo/blob/main/logo.svg"],
  "kind": "icon",
  "variants": { "": { "file": "my-token.svg" } }
}
```

| Case | Example `source` entry |
| --- | --- |
| Official SVG URL | `https://github.com/org/repo/blob/main/logo.svg` |
| Brand asset page (no direct URL) | `https://brand.uniswap.org (official brand kit)` |
| App/favicon asset | `https://app.eigenlayer.xyz/logo/markLightA.svg` |
| Re-export / alias unit (no own artwork) | `re-export of Bitcoin — see src/chain/Bitcoin.tsx` |

Sources rot: domains lapse, kits move, files are deleted. The Source links
workflow (`.github/workflows/source-links.yml`, monthly and on demand) runs
`node scripts/check-sources.ts`, which requests every URL in a `source`
array and lists in the job summary those that are gone (404 / 410), moved to
another site (a redirect chain ending on a different domain; a brand page
redirecting to Notion, Figma or Google Drive does not count), serving a web
page where the URL names a file (an `.svg`, `.zip`, `.png`, `.pdf`, … link
answered with HTML: a catch-all page, a soft 404 or a parked domain) or
failing. It never fails the run, and sites that block bots (401 / 403 / 429)
are only counted. For each finding, cite the file's new official location, or record
in `notes` that the cited source is gone.

Some existing icons predate the authenticity policy below and record a
**legacy** source instead: a third-party package (`@web3icons/react (MIT) —
OSMO token SVG`) or a hand-traced mark (`hand-crafted — no public SVG; traced
from https://...`). These entries only document where existing artwork came
from; they are not accepted for new icons or artwork updates, which must cite
an official source.

## Icon Authenticity Policy (Required)

To protect icon quality and brand fidelity, all icon additions/updates must follow these rules:

- **Use official sources only**: Brand kit, official website press page, or official organization repository.
- **No unofficial/community redraws**: If no official SVG exists, do not add the icon yet; open an issue and track it.
- **Document source of truth in PR**: Include official source URL(s), access date, and any usage/license notes.
- **Keep brand geometry and color identity**: Converted icon must visually match the official source.

Allowed transformations:

- SVGO optimization using this repository's `svgo.config.js` (done by `pnpm run new-icon`, or manually with `pnpm run optimize:svg`)
- Root-element normalization to `xmlns`, `viewBox`, and an optional `fill` (done by `pnpm run new-icon`)
- A uniform scale and translation onto the 64×64 grid (the [optical-size rule](../CONTRIBUTING.md#optical-size), done by `pnpm run new-icon`)
- Internal id namespacing and JSX conversion, both performed by the generator
- Optional mono variants using `currentColor`

Prohibited transformations:

- Redrawing, tracing, or manually reshaping brand geometry
- Altering brand colors/gradients/strokes in the default icon variant
- Mixing logo elements from different logo versions/brands
- "Stylizing" official marks to make them look different from the source
