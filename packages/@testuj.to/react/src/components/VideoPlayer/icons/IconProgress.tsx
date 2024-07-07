import { MouseEventHandler } from "react";

export interface IconProgressProps {
    size?: string;
    color?: string;
    className?: string;
    onClick?: MouseEventHandler<SVGElement>;
}

export const IconProgress = ({ size, color, className, onClick }: IconProgressProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size || "24"}
            height={size || "24"}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color || "currentColor"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            onClick={onClick}
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10 20.777a8.942 8.942 0 0 1 -2.48 -.969" />
            <path d="M14 3.223a9.003 9.003 0 0 1 0 17.554" />
            <path d="M4.579 17.093a8.961 8.961 0 0 1 -1.227 -2.592" />
            <path d="M3.124 10.5c.16 -.95 .468 -1.85 .9 -2.675l.169 -.305" />
            <path d="M6.907 4.579a8.954 8.954 0 0 1 3.093 -1.356" />
        </svg>
    );
};
