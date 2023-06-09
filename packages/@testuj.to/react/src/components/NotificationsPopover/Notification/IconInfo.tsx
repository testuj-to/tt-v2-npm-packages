export interface IconInfoProps extends React.SVGProps<SVGSVGElement> {}

export const IconInfo = ({ ...props }: IconInfoProps) => {
  return (
    <svg
      id="icoInfo"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <rect
        id="Rectangle_5406"
        data-name="Rectangle 5406"
        width="4"
        height="12"
        rx="2"
        transform="translate(14 21.5) rotate(180)"
        fill="none"
        stroke="#fff"
        stroke-width="1.5"
      />
      <rect
        id="Rectangle_5407"
        data-name="Rectangle 5407"
        width="4"
        height="4"
        rx="2"
        transform="translate(14 6.5) rotate(180)"
        fill="none"
        stroke="#fff"
        stroke-width="1.5"
      />
      <rect id="Rectangle_5414" data-name="Rectangle 5414" width="24" height="24" fill="none" />
    </svg>
  );
};
