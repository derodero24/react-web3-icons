import type { IconProps } from '../utils';

function KuCoinBase(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="276.7 115.5 246.65 268.9"
      width="1em"
      height="1em"
      {...props}
    >
      {props.title && <title>{props.title}</title>}
      <path d="M354.4 249.9l79.8 79.8 50.3-50.3c8.8-9 23.4-9 32.1 0 9 8.8 9 23.4 0 32.1l-66.3 66.3c-9 8.8-23.4 8.8-32.3 0l-95.7-95.7v56.8c0 12.5-10.1 22.8-22.8 22.8-12.5 0-22.8-10.1-22.8-22.8V160.8c0-12.5 10.1-22.8 22.8-22.8 12.5 0 22.8 10.1 22.8 22.8v57l95.7-95.7c9-8.8 23.4-8.8 32.3 0l66.3 66.3c8.8 9 8.8 23.4 0 32.1-9 8.8-23.4 8.8-32.1 0h0l-50.3-50.3-79.8 79.7zm79.8-22.8h0c-12.7 0-23 10.1-23 22.8s10.1 23 22.8 23 23-10.1 23-22.8v-.2c-.2-12.5-10.3-22.6-22.8-22.8z" />
    </svg>
  );
}

export function KuCoin(props: IconProps) {
  return <KuCoinBase fill="#28cd96" {...props} />;
}
export function KuCoinMono(props: IconProps) {
  return <KuCoinBase fill="currentColor" {...props} />;
}
