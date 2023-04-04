import type { IconProps } from '../utils';

interface Props extends IconProps {
  fill1: string;
  fill2: string;
}

function SolscanBase({ fill1, fill2, ...props }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="98.37 147.89 15.99 16"
      width="1em"
      height="1em"
      {...props}
    >
      {props.title && <title>{props.title}</title>}
      <path
        d="M106.387 152.73a3.14 3.14 0 0 1-.088 6.311 3.14 3.14 0 1 1 .088-6.311z"
        fill={fill1}
      />
      <path
        d="M110.483 162.623c-2.751 2.216-7.667 1.423-10.214-1.559-2.801-3.28-2.474-8.201.739-11.115a7.99 7.99 0 0 1 11.077.359c2.905 2.987 3.034 7.944.315 10.741l-1.937-2.029c1.031-1.441 1.35-3.09.734-4.861-.92-2.644-3.835-4.039-6.494-3.138-2.627.891-4.065 3.719-3.245 6.381.83 2.692 3.643 4.221 6.343 3.391.538-.165.836-.068 1.184.332.459.53.991.997 1.498 1.498z"
        fill={fill2}
      />
    </svg>
  );
}

export function Solscan(props: IconProps) {
  return <SolscanBase fill1="#c74ae3" fill2="#00e8b5" {...props} />;
}
export function SolscanMono(props: IconProps) {
  return (
    <SolscanBase
      fill1={props.fill ?? 'currentColor'}
      fill2={props.fill ?? 'currentColor'}
      {...props}
    />
  );
}
