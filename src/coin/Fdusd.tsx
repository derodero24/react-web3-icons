import { createIcon } from '../utils';

// Source: https://cdn.1stdigital.com/icon/fdusd.svg (the image of First Digital's FDUSD token metadata https://cdn.1stdigital.com/mainnet/metadata.json)
// Provenance: the metadata JSON is the json_uri of the FDUSD Solana mint 9zNQRsGLjNKwCUU5Gq5LR8beUCPzQMVMqKAi3SSZh54u, and the FDUSD coin metadata on Sui (0xf16e6b723f242ec745dfd7634ad072c42d5c1d9ac9d62a39c381303eaa57693a::fdusd::FDUSD) has the same SVG as its iconUrl. cdn.1stdigital.com is First Digital's own domain: 1stdigital.com shares its Cloudflare nameservers and Atlassian domain-verification record with firstdigitallabs.com. firstdigitallabs.com and 1stdigital.com return a Cloudflare 403, and fdusd.io is parked (checked 2026-10-09)
// Colored: the official fdusd.svg unchanged (a black disc, the F in #ECEFF3 and the bar in #02EC81), placed on the 64 grid as a container. First Digital's reachable token metadata (Solana, Sui) publishes FDUSD only as this disc, and no stand-alone F was found (firstdigitallabs.com, 1stdigital.com and guessed sibling files on cdn.1stdigital.com all return 403, checked 2026-10-09), so the disc is the base icon and there is no separate Circle variant
// Mono: the disc in currentColor with the F and the bar knocked out (one evenodd path; the shapes do not overlap)
/** Fdusd coin icon (colored). */
export const Fdusd = /* @__PURE__ */ createIcon(
  'Fdusd',
  '0 0 64 64',
  () => (
    <g transform="scale(.128)">
      <rect width="500" height="500" fill="black" rx="250" />
      <path
        fill="#ECEFF3"
        fillRule="evenodd"
        d="M188 143v134h117.5l18.54-54H240v-26h92.96l18.54-54z"
        clipRule="evenodd"
      />
      <path fill="#02EC81" d="M200.5 357H148v-54h71z" />
    </g>
  ),
  { fill: 'none' },
);

/** Fdusd coin icon (monochrome). */
export const FdusdMono = /* @__PURE__ */ createIcon(
  'FdusdMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M0 32a32 32 0 1 0 64 0 32 32 0 1 0-64 0m24.06-13.7v17.16H39.1l2.38-6.92H30.72v-3.32h11.9l2.37-6.92zm1.6 27.4h-6.72v-6.92h9.1z"
    />
  ),
  { fill: 'currentColor' },
);
