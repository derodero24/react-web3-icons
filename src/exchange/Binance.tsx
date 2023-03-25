import type { IconProps } from '../lib';

function BinanceBase(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 126.611 126.611"
      width="1em"
      height="1em"
      {...props}
    >
      {props.title && <title>{props.title}</title>}
      <polygon points="38.171,53.203 62.759,28.616 87.36,53.216 101.667,38.909 62.759,0 23.864,38.896 " />
      <rect
        x="3.644"
        y="53.188"
        transform="matrix(0.7071 0.7071 -0.7071 0.7071 48.7933 8.8106)"
        width="20.233"
        height="20.234"
      />
      <polygon
        points="38.171,73.408 62.759,97.995 87.359,73.396 101.674,87.695 101.667,87.703 62.759,126.611
	23.863,87.716 23.843,87.696 "
      />
      <rect
        x="101.64"
        y="53.189"
        transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 235.5457 29.0503)"
        width="20.234"
        height="20.233"
      />
      <polygon
        points="77.271,63.298 77.277,63.298 62.759,48.78 52.03,59.509 52.029,59.509 50.797,60.742 48.254,63.285
	48.254,63.285 48.234,63.305 48.254,63.326 62.759,77.831 77.277,63.313 77.284,63.305 "
      />
    </svg>
  );
}

export function Binance(props: IconProps) {
  return <BinanceBase fill="#F3BA2F" {...props} />;
}
export function BinanceMono(props: IconProps) {
  return <BinanceBase fill="currentColor" {...props} />;
}
