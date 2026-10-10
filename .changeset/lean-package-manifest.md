---
"react-web3-icons": patch
---

Packaging fixes:

- The package no longer declares `engines`, so installing it under Node 18 or 20 no longer warns, or fails with Yarn 1 or `engine-strict`. Nothing in the published files depends on the Node version. What consumers need is an ES2022 baseline: the JavaScript is compiled to ES2022 (now set explicitly instead of being inferred from `engines`) and runs in any browser, bundler, or runtime that supports ES2022. The Node requirement in `devEngines` (see CONTRIBUTING.md) only applies to building the library from source.
- `react-web3-icons/package.json` is now exported, so `require.resolve('react-web3-icons/package.json')` and `import.meta.resolve` work instead of throwing `ERR_PACKAGE_PATH_NOT_EXPORTED`.
- JavaScript and declaration sourcemaps are no longer published. The declaration maps pointed at `src/`, which is not in the package. In 4.0.0 they were 526 of the 1,863 files and about 30% of the unpacked size (1.48 of 4.98 MB). Dropping them changes nothing else in the published JavaScript and type declarations.
