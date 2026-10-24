/** The site mark (public/icon.svg), drawn in the current text color. */
export default function SiteLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="40 5.912 400 400" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M100.019 5.912h279.962C413.106 5.912 440 32.806 440 65.931v279.962c0 33.126-26.894 60.019-60.019 60.019H100.019C66.894 405.912 40 379.019 40 345.893V65.931c0-33.125 26.894-60.019 60.019-60.019z"
      />
      <g
        className="stroke-bg"
        strokeMiterlimit={3}
        strokeWidth={70}
        fill="none"
      >
        <path d="M105.811 190.469c18.877-51.863 76.308-78.643 128.171-59.767s78.644 76.308 59.768 128.171-76.309 78.644-128.172 59.768-78.644-76.309-59.767-128.172z" />
        <path d="m378.391 55.561-109.446 300.702" strokeLinecap="square" />
      </g>
    </svg>
  );
}
