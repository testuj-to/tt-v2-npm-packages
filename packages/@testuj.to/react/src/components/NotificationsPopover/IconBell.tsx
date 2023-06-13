export interface IconBellProps extends React.SVGProps<SVGSVGElement> {}

export const IconBell = ({ ...props }: IconBellProps) => {
  return (
    <svg
      id="icoBell"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <rect id="Rectangle_5409" data-name="Rectangle 5409" width="24" height="24" fill="none" />
      <g id="Group_1836" data-name="Group 1836" transform="translate(0.001 -0.499)">
        <path
          id="Path_5537"
          data-name="Path 5537"
          d="M17.107,30.936a2.369,2.369,0,0,0,2.5-2.6h-5A2.37,2.37,0,0,0,17.107,30.936Z"
          transform="translate(-5.104 -10.137)"
          fill="none"
          stroke="#0d1a33"
          strokeWidth="1.5"
        />
        <path
          id="Path_6671"
          data-name="Path 6671"
          d="M3.555,3.347A24.564,24.564,0,0,0,.822,10.635c-.413,2.109,1,4.115,2.9,4.115h8.057a3.273,3.273,0,0,0,2.916-4.009,22.209,22.209,0,0,0-2.7-7.415A4.73,4.73,0,0,0,3.555,3.347Z"
          transform="translate(4.249 3.449)"
          fill="none"
          stroke="#0d1a33"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </g>
    </svg>
  );
};
