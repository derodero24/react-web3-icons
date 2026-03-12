import { createIcon } from '../utils';

// Paths sourced from privy-io/examples (MIT) — Privy logomark (circle + shadow ellipse)

const privyContent = () => (
  <>
    <path d="M194.443 283.398C231.716 283.398 261.943 253.172 261.943 215.898C261.943 178.625 231.716 148.398 194.443 148.398C157.169 148.398 126.943 178.625 126.943 215.898C126.943 253.172 157.169 283.398 194.443 283.398Z" />
    <path d="M194.442 322.642C219.916 322.642 240.571 318.295 240.571 312.963C240.571 307.63 219.93 303.283 194.442 303.283C168.954 303.283 148.312 307.63 148.312 312.963C148.312 318.295 168.954 322.642 194.442 322.642Z" />
  </>
);

/** Privy dev tool icon (colored). */
export const Privy = createIcon(
  'Privy',
  '126 148 136 175',
  privyContent,
  '#5B4FFF',
);

/** Privy dev tool icon (monochrome). */
export const PrivyMono = createIcon(
  'PrivyMono',
  '126 148 136 175',
  privyContent,
  'currentColor',
);
