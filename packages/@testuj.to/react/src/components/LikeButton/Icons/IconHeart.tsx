export interface IconHeartProps extends React.SVGProps<SVGSVGElement> {
  fill?: string;
}

export const IconHeart = ({ fill, ...props }: IconHeartProps) => {
  return (
    <svg
      id="icoHeart"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <rect id="Rectangle_84" data-name="Rectangle 84" width="24" height="24" fill="none" />
      <path
        id="Path_6672"
        data-name="Path 6672"
        d="M9.3,2.645C7.779.007,4.173.344,2.218,2.3A5,5,0,0,0,2.211,9.37l.007.007,5.664,5.665a2,2,0,0,0,2.828,0l5.665-5.665a5,5,0,0,0,.007-7.071L16.375,2.3C14.421.344,11.1.048,9.3,2.645Z"
        transform="translate(2.704 3.811)"
        fill={fill || "none"}
        stroke="currentColor"
        strokeLinejoin="round"
        stroke-width="1.5"
      />
    </svg>
  );
};
