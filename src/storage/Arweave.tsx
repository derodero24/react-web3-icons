import type { IconProps } from '../lib';

function ArweaveBase(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 31.8 31.8"
      width="1em"
      height="1em"
      {...props}
    >
      {props.title && <title>{props.title}</title>}
      <circle cx="15.9" cy="15.9" r="14.7" strokeWidth="2.5" fill="none" />
      <path
        d="M18.7 21.2c-.1-.1-.1-.3-.2-.5 0-.2-.1-.4-.1-.6-.2.2-.4.3-.6.5s-.5.3-.7.4c-.3.1-.5.2-.9.3-.3.1-.7.1-1 .1-.6 0-1.1-.1-1.6-.3s-.9-.4-1.3-.7-.6-.7-.8-1.1-.3-.9-.3-1.4c0-1.2.5-2.2 1.4-2.8.9-.7 2.3-1 4.1-1h1.7v-.7c0-.6-.2-1-.5-1.3-.4-.3-.9-.5-1.6-.5-.6 0-1 .1-1.3.4s-.4.6-.4 1h-3c0-.5.1-1 .3-1.4s.5-.8 1-1.2a5.3 5.3 0 0 1 1.5-.8c.6-.2 1.3-.3 2.1-.3.7 0 1.3.1 1.9.3s1.1.4 1.6.8a3.25 3.25 0 0 1 1 1.3c.2.5.4 1.1.4 1.8v5c0 .6 0 1.1.1 1.5l.3 1v.2h-3.1zm-2.9-2.1c.3 0 .6 0 .8-.1.3-.1.5-.2.7-.3s.4-.2.5-.4l.4-.4v-2h-1.5c-.5 0-.9 0-1.2.1s-.6.2-.8.4-.4.3-.5.6c-.1.2-.1.5-.1.7 0 .4.1.7.4 1s.8.4 1.3.4z"
        stroke="none"
      />
    </svg>
  );
}

export function Arweave(props: IconProps) {
  return <ArweaveBase fill="#222326" stroke="#222326" {...props} />;
}

export function ArweaveMono(props: IconProps) {
  return <ArweaveBase fill="currentColor" stroke="currentColor" {...props} />;
}
