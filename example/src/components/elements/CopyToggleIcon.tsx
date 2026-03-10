/** Icon that toggles between a copy icon and a check mark. */
export default function CopyToggleIcon({
  copied,
  className = 'h-4 w-4',
}: {
  copied: boolean;
  className?: string;
}) {
  if (copied) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        style={{ color: '#4ade80' }}
        aria-hidden="true"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}
