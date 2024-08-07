import { useEffect, useState } from "react";
import cx from "classnames";

import "./styles.css";

export interface RatingBarChartItem {
    label: string;
    value: number;
}

export interface DashedBarChartProps {
    className?: string;
    items: RatingBarChartItem[];
    noOfDashes?: number;
}

export const DashedBarChart = ({ items, className, noOfDashes }: DashedBarChartProps) => {
    useEffect(() => {
        document.documentElement.style.setProperty(
            "--tt-dashed-bar-chart-dashes",
            `${noOfDashes ? noOfDashes + 1 : 6}`
        );
    }, [noOfDashes]);

    return (
        <div className={cx("tt-dashed-bar-chart", className)}>
            {items.map(({ label, value }, index) => (
                <DashedBarChartItem
                    key={index}
                    label={label}
                    value={value}
                    noOfDashes={noOfDashes}
                />
            ))}
        </div>
    );
};

export interface DashedBarChartItemProps {
    label: string;
    value: number;
    noOfDashes?: number;
}

export const DashedBarChartItem = ({ label, value, noOfDashes }: DashedBarChartItemProps) => {
    const dashes = Array.from({ length: noOfDashes || 5 }, (_, index) => index);

    const calculateDashFill = (index: number) => {
        const dashWidth = 100 / dashes.length;
        const dashFill = dashWidth * (index + 1);

        if (value >= dashFill) {
            return 100;
        }

        if (value < dashFill - dashWidth) {
            return 0;
        }

        return ((value - (dashFill - dashWidth)) / dashWidth) * 100;
    };

    return (
        <div className="tt-dashed-bar-chart__item">
            <div className="tt-dashed-bar-chart__item__label">
                {label}
            </div>
            <div className="tt-dashed-bar-chart__item__bar">
                {dashes.map((_, index) => (
                    <DashedBarChartDash
                        key={index}
                        width={calculateDashFill(index)}
                    />
                ))}
                <div className="tt-dashed-bar-chart__item__value">
                    {`${value.toFixed(0)}%`}
                </div>
            </div>
        </div>
    );
};

export interface DashedBarChartDashProps {
    width: number;
}

export const DashedBarChartDash = ({ width }) => {
    return (
        <div className="tt-dashed-bar-chart__item__bar__dash">
            <div
                className="tt-dashed-bar-chart__item__bar__dash_fill"
                style={{ width: `${width}%` }}
            />
        </div>
    );
};
