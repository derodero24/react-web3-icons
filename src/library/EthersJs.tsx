import type { IconProps } from '../lib';

function EthersJsBase(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 161.35"
      width="1em"
      height="1em"
      {...props}
    >
      {props.title && <title>{props.title}</title>}
      <path d="M256 138.739c-133.839 17.491-229.367 38.5-230.78-47.732 0 0 2.92-33.413 43.901-35.517 0 0 1.382-29.676 32.69-33.036 16.832-1.821 35.956 15.513 38.029 33.758 0 0 41.42-7.662 43.21 32.722.628 14.068-2.544 37.997-42.488 36.961 0 0-23.113-3.14-26.253-38.877-6.5 69.181 93.518 65.161 94.962 2.324.628-27.163-16.769-55.112-55.96-49.868-21.48-54.044-78.664-50.935-99.955-.816-30.429 0-53.699 23.427-53.353 54.013C1.166 191.119 138.176 161.443 256 138.739z" />
    </svg>
  );
}

export function EthersJs(props: IconProps) {
  return <EthersJsBase fill="#24339b" {...props} />;
}

export function EthersJsMono(props: IconProps) {
  return <EthersJsBase fill="currentColor" {...props} />;
}
