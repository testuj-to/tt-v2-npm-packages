import cx from "classnames";

import "./styles.css";
import { useEffect, useState } from "react";

export interface RatingBarChartItem {
  label: string;
  value: number;
}

export interface DashedBarChartProps {
  className?: string;
  items: RatingBarChartItem[];
  noOfDashes?: number;
  delay?: boolean;
}

export const DashedBarChart = ({ items, className, noOfDashes, delay }: DashedBarChartProps) => {
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--tt-dashed-bar-chart-dashes",
      `${noOfDashes ? noOfDashes + 1 : 6}`
    );
  }, [noOfDashes]);

  return (
    <div className={cx("tt-dashed-bar-chart", className)}>
      {items.map(({ label, value }, index) => {
        return <DashedBarChartItem key={index} {...{ label, value, noOfDashes, delay }} />;
      })}
    </div>
  );
};

export interface DashedBarChartItemProps {
  label: string;
  value: number;
  noOfDashes?: number;
  delay?: boolean;
}

export const DashedBarChartItem = ({
  label,
  value,
  delay,
  noOfDashes,
}: DashedBarChartItemProps) => {
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
      <div className="tt-dashed-bar-chart__item__label">{label}</div>
      <div className="tt-dashed-bar-chart__item__bar">
        {dashes.map((_, index) => (
          <DashedBarChartDash
            width={calculateDashFill(index)}
            delay={delay}
            index={index + 1}
            key={index}
          />
        ))}
        <div className="tt-dashed-bar-chart__item__value">{`${value}%`}</div>
      </div>
    </div>
  );
};

export interface DashedBarChartDashProps {
  width: number;
  delay?: boolean;
  index: number;
}

export const DashedBarChartDash = ({ width, delay, index }) => {
  const [dashWidth, setDashWidth] = useState(delay ? 0 : width);

  useEffect(() => {
    if (!delay) {
      return;
    }
    setTimeout(() => {
      setDashWidth(width);
    }, 335 * index);
  }, [width, delay]);

  return (
    <div className="tt-dashed-bar-chart__item__bar__dash">
      <div
        className="tt-dashed-bar-chart__item__bar__dash_fill"
        style={{ width: `${dashWidth}%` }}
      ></div>
    </div>
  );
};
