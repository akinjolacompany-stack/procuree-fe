import type { SVGProps } from "react";

export function SearchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="m17.5 17.5-3.6-3.6M9.2 15a5.8 5.8 0 1 0 0-11.7 5.8 5.8 0 0 0 0 11.7Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
