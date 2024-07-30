import { useEffect, useState } from "react";
import cx from "classnames";

import "./styles.css";

import { Tooltip } from "../Tooltip";

export interface ProgressBarProps {
    value: number;
    className?: string;
    delay?: number;
    breakpoints?: number[] | Breakpoint[];
    finalIcon?: React.ReactNode;
    backgroundColor?: string;
    lineColor?: string;
    breakpointColor?: string;
}

export interface Breakpoint {
    value: number;
    color?: string;
    component?: React.ReactNode;
    componentSuccess?: React.ReactNode;
    tooltip?: React.ReactNode;
}

export const ProgressBar = ({
    value,
    delay,
    className,
    breakpoints,
    finalIcon,
    backgroundColor,
    lineColor,
    breakpointColor,
}: ProgressBarProps) => {
    const [progress, setProgress] = useState(delay ? 0 : value);

    useEffect(() => {
        const timer = setTimeout(() => setProgress(value), delay || 0);

        return () =>
            clearTimeout(timer);
    }, [value]);

    return (
        <div className={cx("tt-progress-bar-wrapper", className)}>
            <div
                className={cx("tt-progress-bar")}
                style={{ backgroundColor }}
            >
                {breakpoints?.map((breakpoint: number | Breakpoint, index) => {
                    if (typeof breakpoint === "number") {
                        return (
                            <div
                                key={index}
                                className="tt-progress-bar-breakpoint"
                                style={{
                                    left: `${breakpoint}%`,
                                    backgroundColor: breakpointColor,
                                }}
                            />
                        );
                    }

                    return (
                        <div
                            key={index}
                            className="tt-progress-bar-breakpoint-component"
                            style={{
                                left: `${breakpoint.value}%`,
                                backgroundColor: breakpoint.color,
                            }}
                        >
                            <Tooltip content={breakpoint.tooltip}>
                                {progress >= breakpoint.value ?
                                    (breakpoint.componentSuccess || breakpoint.component) :
                                    breakpoint.component}
                            </Tooltip>
                        </div>
                    );
                })}
                <div
                    className="tt-progress-bar-indicator"
                    style={{
                        width: `${progress > 100 ? 100 : progress}%`,
                        backgroundColor: lineColor,
                    }}
                />
            </div>
            {finalIcon && (
                <div className="tt-progress-bar-icon">
                    {finalIcon}
                </div>
            )}
        </div>
    );
};
