export interface AlertIconProps extends React.HTMLAttributes<SVGElement> {}

export const InfoIcon = ({ ...props }: AlertIconProps) => {
  return (
    <svg
      id="icoInfoBlue"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <rect id="Rectangle_86" data-name="Rectangle 86" width="24" height="24" fill="none" />
      <circle
        id="Ellipse_647"
        data-name="Ellipse 647"
        cx="10"
        cy="10"
        r="10"
        transform="translate(2 2)"
        fill="#30a9d4"
      />
      <g id="Group_12389" data-name="Group 12389" transform="translate(11 7)">
        <g
          id="Rectangle_805"
          data-name="Rectangle 805"
          transform="translate(0 3)"
          fill="none"
          stroke="#fff"
          strokeWidth="1.5"
        >
          <rect width="2" height="7" rx="1" stroke="none" />
          <rect x="0.75" y="0.75" width="0.5" height="5.5" rx="0.25" fill="none" />
        </g>
        <g id="Rectangle_806" data-name="Rectangle 806" fill="none" stroke="#fff" strokeWidth="1.5">
          <rect width="2" height="2" rx="1" stroke="none" />
          <rect x="0.75" y="0.75" width="0.5" height="0.5" rx="0.25" fill="none" />
        </g>
      </g>
    </svg>
  );
};
