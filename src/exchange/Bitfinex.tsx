import type { IconProps } from '../utils';

function BitfinexBase(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="313.79 237.52 20 20"
      width="1em"
      height="1em"
      {...props}
    >
      {props.title && <title>{props.title}</title>}
      <path d="M313.808 250.559c-.175-2.832 1.015-5.979 3.464-8.428 5.326-5.326 16.418-4.58 16.481-4.575-.03.044-8.139 11.801-17.748 12.9a16.34 16.34 0 0 1-2.197.104z" />
      <path d="M314.933 254.179c.275.438.599.847.974 1.222 3.288 3.288 9.23 2.677 13.271-1.365 5.342-5.341 4.575-16.481 4.575-16.481-.029.066-5.842 13.095-15.08 15.937-1.254.386-2.511.611-3.74.687z" />
    </svg>
  );
}

export function Bitfinex(props: IconProps) {
  return <BitfinexBase fill="#03ca9b" {...props} />;
}

export function BitfinexMono(props: IconProps) {
  return <BitfinexBase fill="currentColor" {...props} />;
}
