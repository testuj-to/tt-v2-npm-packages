import { MouseEventHandler } from "react";

export interface IconPlayerPauseFilledProps {
    size?: string;
    color?: string;
    className?: string;
    onClick?: MouseEventHandler<SVGElement>;
}

export const IconPlayerPauseFilled = ({ size, color, className, onClick }: IconPlayerPauseFilledProps) => {
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
            <path d="M9 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z" />
            <path d="M17 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z" />
        </svg>
    );
};
