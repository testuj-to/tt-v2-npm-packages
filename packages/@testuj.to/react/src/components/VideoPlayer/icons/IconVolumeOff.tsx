import React, { MouseEventHandler, forwardRef } from "react";

export interface IconVolumeOffProps {
    size?: string;
    color?: string;
    className?: string;
    onClick?: MouseEventHandler<SVGSVGElement>;
    onMouseOver?: MouseEventHandler<SVGSVGElement>;
    onMouseLeave?: MouseEventHandler<SVGSVGElement>;
}

export const IconVolumeOff = forwardRef<SVGSVGElement, IconVolumeOffProps>(({
    size,
    color,
    className,
    onClick,
    onMouseOver,
    onMouseLeave,
}, ref) => {
    return (
        <svg
            ref={ref}
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
            onMouseOver={onMouseOver}
            onMouseLeave={onMouseLeave}
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M15 8a5 5 0 0 1 1.912 4.934m-1.377 2.602a5 5 0 0 1 -.535 .464" />
            <path d="M17.7 5a9 9 0 0 1 2.362 11.086m-1.676 2.299a9 9 0 0 1 -.686 .615" />
            <path d="M9.069 5.054l.431 -.554a.8 .8 0 0 1 1.5 .5v2m0 4v8a.8 .8 0 0 1 -1.5 .5l-3.5 -4.5h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l1.294 -1.664" />
            <path d="M3 3l18 18" />
        </svg>
    );
});
