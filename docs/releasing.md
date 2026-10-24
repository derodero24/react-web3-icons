# Releasing

How a release is cut, what the repository owner configures on GitHub and
npm, and how anyone can verify a published version. All a release needs
from contributors is a changeset in their PR (see
[Submitting a Pull Request](../CONTRIBUTING.md#submitting-a-pull-request)).

Sections marked "once configured" describe settings that only the owner
can change ([#718](https://github.com/derodero24/react-web3-icons/issues/718)).
The release flow works without them.

## Release flow

`.github/workflows/release.yml` runs on every push to `develop`:

1. A PR that changes the published package adds a changeset
   (`pnpm changeset`) and is merged into `develop`.
2. The **Verify** job runs lint, typecheck, tests with coverage thresholds,
   build and size limits on the new commit. Nothing below runs unless it
   passes. It has read-only access and no secrets.
3. While unreleased changesets exist, the **Version PR** job opens or
   updates the `chore: version packages` PR from `changeset-release/develop`.
   `pnpm run version-packages` runs `changeset version`, which bumps
   `package.json`, writes `CHANGELOG.md` and deletes the consumed
   changesets. It then runs `scripts/sync-readme-version.ts`, which sets
   every exact `react-web3-icons@X.Y.Z` in `README.md` (today, the CDN
   examples) and the major in its unpinned-URL example to the new version,
   so the README published with the release links to that release's files.
   Every later push to `develop` rebuilds the same PR on top of it. This job
   can write to the repository but holds no OIDC token.
4. A maintainer approves the PR's CI runs (see
   [The version PR](#the-version-pr)), reviews it and merges it.
5. Verify runs again on the merge commit. With no changesets left, it packs
   the build it just verified with `pnpm pack` and uploads the tarball and
   the version's `CHANGELOG.md` section as the `release` artifact.
6. The **Publish** job downloads that artifact and, if the version is not on
   npm yet, runs `npm publish` on the tarball with a provenance attestation
   (`--provenance`, `id-token: write`) and lifecycle scripts disabled. It
   checks out nothing to build and installs nothing, so no dependency code
   runs in the only job that can publish.
7. If the version has no GitHub release yet, the same job creates the
   lightweight tag `react-web3-icons@<version>` on that commit and the
   GitHub release with the version's changelog, through the GitHub API.
8. If the version's tag points at the commit the run was triggered by,
   `main` is fast-forwarded to it. If `main` has diverged, the step fails
   and needs a manual fix.

Later pushes without a changeset find the version on npm, its release in
place and its tag on an older commit, and the Publish job changes nothing.
A run that failed halfway (for example after the upload but before the
release, or at the fast-forward) can be re-run: it only does the steps that
are still missing. The checks treat only HTTP 404 as "missing"; any other
answer from npm or GitHub fails the job.

After a release, check that
`npm view react-web3-icons@<version> dist.attestations` prints a
`provenance` entry, that the tag and GitHub release exist, and that `main`
points at the release commit: after `git fetch origin --tags`,
`git rev-parse origin/main` and
`git rev-parse 'react-web3-icons@<version>^{commit}'` print the same commit.
`develop` may already be ahead of `main` if another PR was merged after the
version PR; that is expected.

## The version PR

`changesets/action` creates and updates the version PR with `GITHUB_TOKEN`.
GitHub creates the `pull_request` runs for such a PR in an approval-required
state ([GitHub docs](https://docs.github.com/en/actions/concepts/security/github_token#when-github_token-triggers-workflow-runs)):
CI, Compatibility, CodeQL, Size and the other `pull_request` workflows wait
until a user with write access selects **Approve workflows to run** in the
PR's merge box. Every update of the PR creates new runs that need approval
again, so approve the latest ones before merging.

Alternatives: give `changesets/action` a GitHub App installation token
(`actions/create-github-app-token`), whose runs start without approval, or,
once required checks are configured, merge through a ruleset bypass. In
every case Verify checks the merge commit before anything is published.

## npm trusted publishing

`react-web3-icons` is published through an npm trusted publisher, without
an npm token. The "Publish to npm" step holds no credential: npm exchanges
the job's OIDC token (`id-token: write`) for a short-lived token that can
publish this package only, and only from `release.yml` in this repository.

The configuration lives on npmjs.com, in the package's settings under
**Trusted Publisher**
([npm docs](https://docs.npmjs.com/trusted-publishers#for-github-actions)):

| Field | Value |
| --- | --- |
| Organization or user | `derodero24` |
| Repository | `react-web3-icons` |
| Workflow filename | `release.yml` |
| Environment name | empty (the release job uses no environment) |
| Allowed actions | `npm publish` ticked |

- **Renames**: renaming `release.yml`, moving the repository or changing
  `repository.url` in `package.json` breaks the match, and the publish step
  fails. Update the configuration in the same change, then re-run the
  Release run (see [Release flow](#release-flow)).
- **Requirements**: `repository.url` in `package.json` matches the
  repository exactly, the release job has `id-token: write`, and it runs on
  a GitHub-hosted runner with Node 24.x (trusted publishing needs npm 11.5.1
  and Node 22.14.0 or later; Node 24.5.0 and later bundle npm 11.5.1 or
  newer).
- **Check**: after a release,
  `npm view react-web3-icons@<version> _npmUser` shows
  `name: 'GitHub Actions'` with a `trustedPublisher` entry.

### Job permissions

An OIDC token from `release.yml` is enough to publish `react-web3-icons`, so
only a job that runs no dependency code may request one
([#887](https://github.com/derodero24/react-web3-icons/issues/887)):

- **Verify** installs, builds and packs with `contents: read` only, without
  secrets and without `id-token: write`.
- **Version PR** installs to run `changeset version`. It gets
  `contents: write` and `pull-requests: write`, but no `id-token: write`.
- **Publish** is the only job with `id-token: write`. It downloads the
  tarball and runs `npm publish <tarball> --provenance --access public
  --ignore-scripts`, without installing the workspace and without
  `cache: pnpm`, then creates the tag and the GitHub release through the API
  and fast-forwards `main`.

## Branch rulesets (once configured)

Intended rulesets for #718:

- `develop`: block force pushes and deletions, require a pull request
  before merging, and require the status checks below.
- `main`: block force pushes and deletions. `main` only moves by the
  fast-forward in `release.yml`, a normal push made with `GITHUB_TOKEN`. A
  rule that requires a pull request or status checks on `main` would reject
  that push unless the step pushed with the token of an actor on the
  ruleset's bypass list, such as a GitHub App.

Required status checks on `develop`, by workflow:

- CI (`main.yml`):
  - `Dependency review`
  - `Build, lint, and test on Node 22.x`
  - `Build, lint, and test on Node 24.x`
  - `Build, lint, and test on Node 26.x`
  - `Install on Node 22.22.2 (lower bound)`
  - `Install on Node 24.15.0 (lower bound)`
  - `Install on Node 26.0.0 (lower bound)`
  - `Build example app`
  - `Build StackBlitz playground`
  - `Package validation (publint, attw)`
- Compatibility (`compat.yml`):
  - `Types (TypeScript 5.0.4, @types/react 18.3.31)`
  - `Types (TypeScript 5.0.4, @types/react 19.3.0)`
  - `Types (TypeScript 5.9.3, @types/react 18.3.31)`
  - `Types (TypeScript 5.9.3, @types/react 19.3.0)`
  - `Vite build tree-shakes unused icons`
  - `Node 18.x import / require(esm)`
  - `Node 20.x import / require(esm)`
  - `Node 22.x import / require(esm)`
  - `Node 24.x import / require(esm)`
  - `Node 26.x import / require(esm)`
  - `Typecheck and unit tests on React 18`
- CodeQL (`codeql.yml`): `Analyze (actions)`, `Analyze (javascript-typescript)`
- Size (`size.yml`): `size`

Not required:

- `Visual regression test` and `zizmor (GitHub Actions security lint)`:
  their workflows are path-filtered. On a PR that does not touch those
  paths they never start, and a required check that never starts stays
  "Pending" and blocks the merge
  ([GitHub docs](https://docs.github.com/en/pull-requests/how-tos/merge-and-close-pull-requests/troubleshooting-required-status-checks#handling-skipped-but-required-checks)).
- `Check for missing changeset`: it only warns and comments, and passes
  whether or not a changeset is present.
- `label`: it only applies labels.
- Checks that apps report next to the workflow jobs: `CodeQL` (the
  code-scanning result from GitHub Advanced Security, not the `Analyze (...)`
  jobs of `codeql.yml`), `GitGuardian Security Checks` and
  `Vercel Preview Comments`. The required list above names `github-actions`
  checks only.

Most of these names are built from matrix values. A change to a matrix or a
job name renames its checks, and a required name that is no longer reported
blocks the merge, so swap the names in the ruleset when merging that
change.

## Release checklist

- Major release, before merging the version PR: make
  `examples/stackblitz/package.json` accept the new major next to the
  current one (for 5.0.0, `^4.0.0 || ^5.0.0`). The playground has no
  lockfile, so the README's StackBlitz link, which opens `main`, installs the
  new major as soon as it is on npm. A range with only the new major would
  fail the `Build StackBlitz playground` check until then, because that job
  installs from npm.
- Approve the version PR's runs and wait for them to pass before merging.
- After publishing: check provenance, the trusted publisher
  ([`_npmUser`](#npm-trusted-publishing)), the tag, the GitHub release and
  `main` as described in [Release flow](#release-flow).
- Major release: once the new major is on npm, update the supported-versions
  table in [SECURITY.md](../SECURITY.md) (new major `Yes`, every older
  version `No`). The policy covers the latest published major only, so the
  table changes after the release, not before. Also narrow the playground's
  range to the new major (for 5.0.0, `^5.0.0`) on `develop`; `main` picks
  that up at the next release.

## Verifying a release

From 5.0.0, every version is published with an npm provenance attestation
that links the tarball to the commit and the `release.yml` run that built
it. Earlier versions carry registry signatures only.

- On the package's npm page, a green check mark next to the version (in the
  Version field to the right of the README) means it was published with
  provenance. Select it, then **View more details**, to see the source
  commit and the workflow run.
- In a project installed with `npm install` or `npm ci` (npm 9.5.0 or
  later), `npm audit signatures` verifies the registry signatures and
  provenance attestations of the installed packages.

See npm's
[Viewing package provenance](https://docs.npmjs.com/viewing-package-provenance).
