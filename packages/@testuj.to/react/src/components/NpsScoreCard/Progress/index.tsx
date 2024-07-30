import { useMemo } from "react";
import cx from "classnames";

import { LinearProgress } from "./LinearProgress";

interface ProgressProps {
    color: string;
    value: number;
    text: string;
    maxValue: number;
};

export const Progress = ({ value, maxValue, color, text }: ProgressProps) => {
    const progress = useMemo(() => {
        return value / maxValue * 100;
    }, [value, maxValue]);

    return (
        <div className={cx("tt-gauge-chart-progress")}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                }}
            >
                <p
                    style={{
                        fontSize: 14,
                        fontWeight: 600,
                        lineHeight: 1.2,
                        whiteSpace: "nowrap",
                        margin: 0,
                        color,
                    }}
                >
                    {value}
                </p>
                <p
                    style={{
                        fontSize: 12,
                        lineHeight: 1.2,
                        whiteSpace: "nowrap",
                        margin: 0,
                        color: "#888E98",
                    }}
                >
                    {text}
                </p>
            </div>
            <LinearProgress color={color} progress={progress} />
        </div>
    );
};
