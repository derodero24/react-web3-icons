## Summary

<!-- Brief description of the changes -->

## Related issue

<!-- Link to the issue this PR addresses, e.g. Closes #123 -->

## Icon source verification (required for icon add/update PRs)

<!-- If this PR does not add/update icons, write N/A -->

- Official source URL(s):
- Brand guideline / usage reference:
- Manual edits beyond SVGO (if any):

## Breaking changes / Deprecations

<!-- If this PR introduces a breaking change or deprecates an export, document it here. -->
<!-- - Breaking: removed/renamed export `X` -->
<!-- - Deprecated: `OldName` → `NewName` (removal planned for next major) -->
<!-- write N/A if not applicable -->

## Checklist

- [ ] Generated sources are up to date (`pnpm run generate-icons --check`)
- [ ] Lint passes (`pnpm run check`)
- [ ] Types check (`pnpm run typecheck`)
- [ ] Tests pass with full coverage (`pnpm test --coverage`)
- [ ] Build succeeds and stays within the size budgets (`pnpm run build && pnpm run size`)
- [ ] Changeset included (if the published package changed, e.g. `src/` or `icons/`): `pnpm changeset`
- [ ] Official icon source and usage context documented above (or N/A)
- [ ] `// Source:` comment added or verified in each icon `.tsx` file (or N/A)
- [ ] Default icon geometry/colors match official asset (or N/A)
- [ ] Compare page updated if library features changed (`example/src/app/compare/page.tsx`, or N/A)
