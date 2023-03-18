import type { IconProps } from '../lib';

function UsdtBase(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0.45 0.86 110.36 88.3"
      width="1em"
      height="1em"
      {...props}
    >
      {props.title && <title>{props.title}</title>}
      <path
        fillRule="evenodd"
        d="M24.483.862H88.05c1.517 0 2.918.786 3.674 2.061l18.52 31.219a4.02 4.02 0 0 1-.695 4.975L58.573 87.97c-1.651 1.583-4.308 1.583-5.959 0L1.707 39.183C.305 37.84.043 35.737 1.074 34.108L20.87 2.823c.771-1.218 2.139-1.961 3.613-1.961zM79.842 14.8v8.759H61.734v6.073c12.718.649 22.259 3.315 22.33 6.51v6.66c-.071 3.195-9.612 5.861-22.33 6.51v14.904H49.711V49.313c-12.718-.649-22.259-3.315-22.33-6.51v-6.66c.071-3.195 9.612-5.861 22.33-6.51V23.56H31.603V14.8h48.239zM55.722 44.737c13.572 0 24.916-2.254 27.692-5.264-2.354-2.553-10.87-4.561-21.68-5.113v6.359a118.17 118.17 0 0 1-6.012.151c-2.063 0-4.074-.052-6.012-.151V34.36c-10.811.552-19.326 2.561-21.68 5.113 2.776 3.01 14.12 5.264 27.692 5.264z"
      />
    </svg>
  );
}

export function Usdt(props: IconProps) {
  return <UsdtBase fill="#009393" {...props} />;
}

export function UsdtMono(props: IconProps) {
  return <UsdtBase fill="currentColor" {...props} />;
}
