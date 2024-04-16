import classNames from "classnames";
import { useId } from "react";

export interface StarIconProps extends React.SVGProps<SVGSVGElement> {
  filled: number;
  onClick?: () => void;
  setGradient?: boolean;
}

export const StarIcon = ({ filled, onClick, setGradient, ...props }: StarIconProps) => {
  const gradientId = useId();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="icoStar"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...{ onClick, ...props }}
    >
      <rect id="Rectangle_3766" data-name="Rectangle 3766" width="24" height="24" fill="none" />
      <path
        id="Polygon_1"
        data-name="Polygon 1"
        d="M9.654,2.739a1.5,1.5,0,0,1,2.692,0l1.595,3.245a1.5,1.5,0,0,0,1.167.828l3.6.433a1.5,1.5,0,0,1,.822,2.606l-2.557,2.292a1.5,1.5,0,0,0-.47,1.411l.672,3.357a1.5,1.5,0,0,1-2.169,1.622L11.7,16.79a1.5,1.5,0,0,0-1.4,0L6.99,18.533A1.5,1.5,0,0,1,4.82,16.911l.672-3.357a1.5,1.5,0,0,0-.47-1.411L2.466,9.85a1.5,1.5,0,0,1,.822-2.606l3.6-.433a1.5,1.5,0,0,0,1.167-.828Z"
        transform="translate(1 2)"
        strokeWidth="1.5"
        className={classNames("tt-star-icon", {
          "tt-star-icon-empty": filled === 0,
          "tt-star-icon-full": filled === 100,
          "tt-star-icon-half": filled > 0 && filled < 100,
        })}
        fill={filled > 0 && filled < 100 ? `url(#${gradientId})` : "#FF7804"}
      />
      <defs>
        {setGradient && (
          <linearGradient id={gradientId}>
            <stop offset={`${filled}%`} stopColor="#FF7804" />
            <stop offset={`${filled}%`} stopColor="#d8d8d8" />
          </linearGradient>
        )}
      </defs>
    </svg>
  );
};
