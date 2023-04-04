import type { IconProps } from '../utils';

interface Props extends IconProps {
  fill1: string;
  fill2: string;
}

function BscscanBase({ fill1, fill2, ...props }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0.18 121.38 121.15"
      width="1em"
      height="1em"
      {...props}
    >
      {props.title && <title>{props.title}</title>}
      <path
        d="M25.222 57.766c0-1.368.546-2.68 1.515-3.645s2.284-1.504 3.653-1.498l8.568.028a5.15 5.15 0 0 1 5.151 5.151v32.4l3.559-.911a4.29 4.29 0 0 0 3.309-4.177V44.927c0-2.845 2.306-5.151 5.151-5.152h8.594c2.845.001 5.151 2.307 5.151 5.152v37.3l4.243-1.754a4.3 4.3 0 0 0 2.625-3.957V32.049a5.15 5.15 0 0 1 5.15-5.151h8.585a5.15 5.15 0 0 1 5.146 5.151v36.617c7.443-5.394 14.986-11.882 20.972-19.683 1.764-2.3 2.258-5.331 1.316-8.072A60.64 60.64 0 0 0 68.303.67 60.64 60.64 0 0 0 8.055 91.019a7.67 7.67 0 0 0 7.316 3.79c1.624-.143 3.646-.345 6.05-.627a4.29 4.29 0 0 0 3.805-4.258V57.766"
        fill={fill1}
      />
      <path
        d="M25.039 109.727a60.66 60.66 0 0 0 96.339-49.061l-.158-4.152c-22.163 33.055-63.085 48.508-96.181 53.213"
        fill={fill2}
      />
    </svg>
  );
}

export function Bscscan(props: IconProps) {
  return <BscscanBase fill1="#12161c" fill2="#f0b90b" {...props} />;
}
export function Bscscan2(props: IconProps) {
  return <BscscanBase fill1="#fff" fill2="#f0b90b" {...props} />;
}

export function BscscanMono(props: IconProps) {
  return (
    <BscscanBase
      fill1={props.fill ?? 'currentColor'}
      fill2={props.fill ?? 'currentColor'}
      {...props}
    />
  );
}
