# Security Policy

## Supported Versions

Security fixes are released for the latest major version only, as a new minor or patch release of that line. Older majors are not patched; upgrade to the latest major to receive fixes (see the [migration guide](MIGRATION.md)).

| Version | Supported |
| ------- | --------- |
| 4.x     | Yes       |
| < 4.0   | No        |

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it responsibly.

**Do not open a public issue.** Instead, please use [GitHub's private vulnerability reporting](https://github.com/derodero24/react-web3-icons/security/advisories/new).

We will acknowledge your report within 48 hours and aim to release a fix as soon as possible.

## Scope

This is a client-side React component library with no server-side code, application or API requests, or data processing. The only network traffic it causes is module loading: the dynamic components (`react-web3-icons/dynamic`) lazy-load icon chunks that your bundler emits and your app serves. The primary security concern is supply-chain risk through compromised dependencies. If you load files from a CDN instead of installing the package, pin an exact version (see [Raw SVG Files](README.md#raw-svg-files) in the README).
