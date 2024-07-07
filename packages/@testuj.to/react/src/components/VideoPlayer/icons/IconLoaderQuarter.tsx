import { MouseEventHandler } from "react";

export interface IconLoaderQuarterProps {
    size?: string;
    color?: string;
    className?: string;
    onClick?: MouseEventHandler<SVGElement>;
}

export const IconLoaderQuarter = ({ size, color, className, onClick }: IconLoaderQuarterProps) => {
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
            <path d="M12 6l0 -3" />
            <path d="M6 12l-3 0" />
            <path d="M7.75 7.75l-2.15 -2.15" />
        </svg>
    );
};
