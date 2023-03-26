import type { IconProps } from '../lib';

function ArgentBase(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 39.38 36"
      width="1em"
      height="1em"
      {...props}
    >
      {props.title && <title>{props.title}</title>}
      <path d="M24.758 0H14.624c-.339 0-.61.281-.617.631-.205 9.824-5.184 19.149-13.755 25.753-.272.21-.334.604-.135.887l5.929 8.463a.61.61 0 0 0 .871.141c5.359-4.103 9.669-9.052 12.773-14.537 3.104 5.486 7.415 10.435 12.774 14.537a.61.61 0 0 0 .872-.141l5.929-8.463c.199-.284.137-.678-.135-.887C30.56 19.779 25.58 10.455 25.376.631A.63.63 0 0 0 24.758 0z" />
    </svg>
  );
}

export function Argent(props: IconProps) {
  return <ArgentBase fill="#ff875b" {...props} />;
}

export function ArgentMono(props: IconProps) {
  return <ArgentBase fill="currentColor" {...props} />;
}
