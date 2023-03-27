import type { IconProps } from '../lib';

export function Ipfs(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0.3 0.5 168.1 194.7"
      width="1em"
      height="1em"
      {...props}
    >
      {props.title && <title>{props.title}</title>}
      <path d="M.3 146l84 48.5 84-48.5V49L84.3.5.3 49z" fill="#469ea2" />
      <path
        d="M75.7 12.1l-61 35.2a18.19 18.19 0 0 1 0 3.3l60.9 35.2a14.55 14.55 0 0 1 17.3 0l60.9-35.2a18.19 18.19 0 0 1 0-3.3L93 12.1a14.55 14.55 0 0 1-17.3 0zm84 48.2l-61 35.6a14.73 14.73 0 0 1-8.6 15l.1 70a15.57 15.57 0 0 1 2.8 1.6l60.9-35.2a14.73 14.73 0 0 1 8.6-15V61.9a20 20 0 0 1-2.8-1.6zm-150.8.4a15.57 15.57 0 0 1-2.8 1.6v70.4a14.38 14.38 0 0 1 8.6 15l60.9 35.2a15.57 15.57 0 0 1 2.8-1.6v-70.4a14.38 14.38 0 0 1-8.6-15z"
        fill="#6acad1"
      />
      <g fill="#469ea2">
        <path d="M84.3 11l75.1 43.4v86.7l-75.1 43.4-75.1-43.4V54.3zm0-10.3L.3 49.2v97l84 48.5 84-48.5v-97z" />
        <path d="M84.9 114h-1.2A15.66 15.66 0 0 1 68 98.3v-1.2a15.66 15.66 0 0 1 15.7-15.7h1.2a15.66 15.66 0 0 1 15.7 15.7v1.2A15.66 15.66 0 0 1 84.9 114zm0 64.5h-1.2a15.65 15.65 0 0 0-13.7 8l14.3 8.2 14.3-8.2a15.65 15.65 0 0 0-13.7-8zm83.5-48.5h-.6a15.66 15.66 0 0 0-15.7 15.7v1.2a15.13 15.13 0 0 0 2 7.6l14.3-8.3zm-14.3-89a15.4 15.4 0 0 0-2 7.6v1.2a15.66 15.66 0 0 0 15.7 15.7h.6V49.2zM84.3.7L70 8.9A15.73 15.73 0 0 0 83.7 17h1.2a15.65 15.65 0 0 0 13.7-8zM14.6 40.9L.3 49.2v16.3h.6a15.66 15.66 0 0 0 15.7-15.7v-1.2a16.63 16.63 0 0 0-2-7.7zM.9 130H.3v16.2l14.3 8.3a15.4 15.4 0 0 0 2-7.6v-1.2A15.66 15.66 0 0 0 .9 130z" />
      </g>
      <g fill="#083b54">
        <path d="M84.3 195.2V98.1L.3 49.6v97.1z" fillOpacity=".15" />
        <path d="m168.4 145.8v-97l-84 48.5v97.1z" fillOpacity=".05" />
      </g>
    </svg>
  );
}

export function IpfsMono(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0.3 0.5 168.1 194.7"
      width="1em"
      height="1em"
      fill="currentColor"
      {...props}
    >
      {props.title && <title>{props.title}</title>}
      <g mask="url(#ipfs-a)">
        <path d="M.3 146l84 48.5 84-48.5V49L84.3.5.3 49z" />
        <path d="M84.3 11l75.1 43.4v86.7l-75.1 43.4-75.1-43.4V54.3zm0-10.3L.3 49.2v97l84 48.5 84-48.5v-97z" />
        <path d="M84.9 114h-1.2A15.66 15.66 0 0 1 68 98.3v-1.2a15.66 15.66 0 0 1 15.7-15.7h1.2a15.66 15.66 0 0 1 15.7 15.7v1.2A15.66 15.66 0 0 1 84.9 114zm0 64.5h-1.2a15.65 15.65 0 0 0-13.7 8l14.3 8.2 14.3-8.2a15.65 15.65 0 0 0-13.7-8zm83.5-48.5h-.6a15.66 15.66 0 0 0-15.7 15.7v1.2a15.13 15.13 0 0 0 2 7.6l14.3-8.3zm-14.3-89a15.4 15.4 0 0 0-2 7.6v1.2a15.66 15.66 0 0 0 15.7 15.7h.6V49.2zM84.3.7L70 8.9A15.73 15.73 0 0 0 83.7 17h1.2a15.65 15.65 0 0 0 13.7-8zM14.6 40.9L.3 49.2v16.3h.6a15.66 15.66 0 0 0 15.7-15.7v-1.2a16.63 16.63 0 0 0-2-7.7zM.9 130H.3v16.2l14.3 8.3a15.4 15.4 0 0 0 2-7.6v-1.2A15.66 15.66 0 0 0 .9 130z" />
      </g>
      <defs>
        <mask id="ipfs-a">
          <rect width="120%" height="120%" fill="#fff" />
          <path
            d="M75.7 12.1l-61 35.2a18.19 18.19 0 0 1 0 3.3l60.9 35.2a14.55 14.55 0 0 1 17.3 0l60.9-35.2a18.19 18.19 0 0 1 0-3.3L93 12.1a14.55 14.55 0 0 1-17.3 0zm84 48.2l-61 35.6a14.73 14.73 0 0 1-8.6 15l.1 70a15.57 15.57 0 0 1 2.8 1.6l60.9-35.2a14.73 14.73 0 0 1 8.6-15V61.9a20 20 0 0 1-2.8-1.6zm-150.8.4a15.57 15.57 0 0 1-2.8 1.6v70.4a14.38 14.38 0 0 1 8.6 15l60.9 35.2a15.57 15.57 0 0 1 2.8-1.6v-70.4a14.38 14.38 0 0 1-8.6-15z"
            fill="#333"
          />
        </mask>
      </defs>
    </svg>
  );
}
