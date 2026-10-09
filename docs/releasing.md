# Releasing

How a release is cut, what the repository owner configures on GitHub and
npm, and how anyone can verify a published version. All a release needs
from contributors is a changeset in their PR (see
[Submitting a Pull Request](../CONTRIBUTING.md#submitting-a-pull-request)).

Sections marked "once configured" describe settings that only the owner
can change ([#703](https://github.com/derodero24/react-web3-icons/issues/703),
[#718](https://github.com/derodero24/react-web3-icons/issues/718)). The
release flow works without them.

## Release flow

`.github/workflows/release.yml` runs on every push to `develop`:

1. A PR that changes the published package adds a changeset
   (`pnpm changeset`) and is merged into `develop`.
2. The **Verify** job runs lint, typecheck, tests with coverage thresholds,
   build and size limits on the new commit. Nothing below runs unless it
   passes.
3. While unreleased changesets exist, **Version or publish** opens or
   updates the `chore: version packages` PR from `changeset-release/develop`.
   `pnpm changeset version` bumps `package.json`, writes `CHANGELOG.md` and
   deletes the consumed changesets. Every later push to `develop` rebuilds
   the same PR on top of it.
4. A maintainer approves the PR's CI runs (see
   [The version PR](#the-version-pr)), reviews it and merges it.
5. Verify runs again on the merge commit. With no changesets left, the job
   builds the package without credentials, then publishes it with
   `pnpm changeset publish` and a provenance attestation
   (`NPM_CONFIG_PROVENANCE=true`, `id-token: write`). Lifecycle scripts are
   disabled during the upload.
6. `changesets/action` creates the lightweight tag `react-web3-icons@<version>`
   on that commit and a GitHub release with the version's changelog, both
   through the GitHub API.
7. `main` is fast-forwarded to that same commit, the one the run was
   triggered by. If `main` has diverged, the step fails and needs a manual
   fix.

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

## npm trusted publishing (once configured)

The Publish step authenticates with the `NPM_TOKEN` repository secret
(`NODE_AUTH_TOKEN`). Once a trusted publisher is configured, npm
authenticates the workflow through OIDC instead; the npm CLI tries OIDC
before a token and falls back to the token when the OIDC exchange fails.

On npmjs.com, in the package's settings under **Trusted Publisher**, choose
GitHub Actions
([npm docs](https://docs.npmjs.com/trusted-publishers#for-github-actions)):

| Field | Value |
| --- | --- |
| Organization or user | `derodero24` |
| Repository | `react-web3-icons` |
| Workflow filename | `release.yml` |
| Environment name | empty (the release job uses no environment) |
| Allowed actions | `npm publish` ticked |

- **Allowed actions**: configurations created after 2026-09-03 allow only
  `npm stage publish` by default. The workflow publishes directly, so
  `npm publish` must be allowed as well.
- **Timing**: create the configuration just before merging a version PR. A
  new configuration expires if no publish through it succeeds within 2 days,
  and an expired one has to be deleted and created again
  ([npm docs](https://docs.npmjs.com/trusted-publishers#trusted-publisher-configuration-expiry)).
- **Already in place**: `repository.url` in `package.json` matches the
  repository exactly, the release job has `id-token: write`, and it runs on a
  GitHub-hosted runner with Node 24.x (trusted publishing needs npm 11.5.1
  and Node 22.14.0 or later; Node 24.5.0 and later bundle npm 11.5.1 or
  newer).

### Check that the trusted publisher was used

While `NODE_AUTH_TOKEN` is set, a failed OIDC exchange (for example,
`npm publish` not ticked under Allowed actions, or a typo in a field) falls
back to the token without any message at the default log level, and the
version still gets a provenance attestation. The provenance check in
[Release flow](#release-flow) therefore passes either way and does not show
which credential published. After the first release with a trusted
publisher, run

```sh
npm view react-web3-icons@<version> _npmUser
```

- `name: 'GitHub Actions'` with a `trustedPublisher` entry: the publish went
  through the trusted publisher. Continue with the token removal below.
- The owner's npm account (`derodero24`): the publish fell back to the token,
  and the configuration is still unvalidated. Fix it (if it has expired,
  delete it and create it again just before the next version PR is merged),
  check again after the next release, and keep the token until then.

### Remove the token

Only once `_npmUser` shows the trusted publisher:

1. Remove `NODE_AUTH_TOKEN` from the Publish step in `release.yml`, together
   with the comments that mention it.
2. Delete the `NPM_TOKEN` repository secret.
3. On npmjs.com, revoke the access token that `NPM_TOKEN` held (**Access
   Tokens** in the account menu). Deleting the secret alone leaves the token
   valid on npm.
4. Optional: in the package's settings under **Publishing access**, select
   "Require two-factor authentication and disallow tokens". Trusted
   publishing keeps working.

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

- Approve the version PR's runs and wait for them to pass before merging.
- First release with a trusted publisher: create the configuration just
  before merging the version PR. After the publish, confirm with `_npmUser`
  that the trusted publisher was used
  ([Check that the trusted publisher was used](#check-that-the-trusted-publisher-was-used)),
  and only then [remove the token](#remove-the-token).
- After publishing: check provenance, the tag, the GitHub release and
  `main` as described in [Release flow](#release-flow).
- Major release: once the new major is on npm, update the supported-versions
  table in [SECURITY.md](../SECURITY.md) (new major `Yes`, every older
  version `No`). The policy covers the latest published major only, so the
  table changes after the release, not before.

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
