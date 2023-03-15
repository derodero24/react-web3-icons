import type { IconProps } from '../lib';

function XrpBase(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 424"
      width="1em"
      height="1em"
      {...props}
    >
      {props.title && <title>{props.title}</title>}
      <path d="M437 0h74L357 152.48c-55.77 55.19-146.19 55.19-202 0L.94 0H75l117 115.83a91.11 91.11 0 0 0 127.91 0zM74.05 424H0l155-153.42c55.77-55.19 146.19-55.19 202 0L512 424h-74L320 307.23a91.11 91.11 0 0 0-127.91 0z" />
    </svg>
  );
}

export function Xrp(props: IconProps) {
  return <XrpBase fill="#23292f" {...props} />;
}

export function XrpMono(props: IconProps) {
  return <XrpBase fill="currentColor" {...props} />;
}

export function Xrp2(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -0.04 704.04 704.04"
      width="1em"
      height="1em"
      {...props}
    >
      {props.title && <title>{props.title}</title>}
      <defs>
        <clipPath id="xrp-a" transform="translate(-23 -23)">
          <path d="M23 23h704v704H23z" fill="none" />
        </clipPath>
      </defs>
      <g clipPath="url(#xrp-a)">
        <path
          d="M352 704c167.93.002 312.476-118.622 345.239-283.325S641.857 91.061 486.71 26.795 152.625 16.809 59.327 156.437-15.644 482.155 103.1 600.9A352 352 0 0 0 352 704z"
          fill="#23292f"
        />
        <g fill="#fff">
          <path d="M480.79 202.09h52.93L423.66 311.9c-39.828 39.8-104.372 39.8-144.2 0L169.71 202.09h52.87l83.6 83.41c25.229 25.198 66.101 25.198 91.33 0zM222.33 507.51h-52.62L280.15 397c39.828-39.8 104.372-39.8 144.2 0L535 507.51h-52.82L398 423.41c-25.229-25.198-66.101-25.198-91.33 0z" />
        </g>
      </g>
    </svg>
  );
}
