import { MouseEventHandler } from "react";

export interface IconPlayerPlayFilledProps {
    size?: string;
    color?: string;
    className?: string;
    onClick?: MouseEventHandler<SVGElement>;
}

export const IconPlayerPlayFilled = ({ size, color, className, onClick }: IconPlayerPlayFilledProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size || "24"}
            height={size || "24"}
            viewBox="0 0 24 24"
            fill={color || "currentColor"}
            className={className}
            onClick={onClick}
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z" />
        </svg>
    );
};
