import { useEffect, useState } from "react";
import cx from "classnames";

import { StarIcon } from "./StarIcon";

import "./styles.css";
export interface RatingBarChartItem {
  label: string;
  value: number;
  icon?: React.ReactNode;
}

export interface RatingBarChartProps {
  className?: string;
  items: RatingBarChartItem[];
  delay?: boolean;
}

export const RatingBarChart = ({ items, className, delay }: RatingBarChartProps) => {
  const max = Math.max(...items.map((item) => item.value));

  return (
    <div className={cx("tt-rating-bar-chart", className)}>
      {items.map(({ label, value, icon }, index) => {
        return (
          <RatingBarChartItem
            key={index}
            {...{ label, icon, value, delay }}
            width={(value / max) * 100}
          />
        );
      })}
    </div>
  );
};

export interface RatingBarChartItemProps {
  label: string;
  width: number;
  value?: number;
  icon?: React.ReactNode;
  delay?: boolean;
}

const finalWidth = (width: number) => {
  if (width === 0) {
    return 0;
  }
  if (width < 5) {
    return 5;
  }
  if (width > 100) {
    return 100;
  }
  return width;
};

export const RatingBarChartItem = ({ label, width, value, icon }: RatingBarChartItemProps) => {
  return (
    <div className="tt-rating-bar-chart__item">
      <div className="tt-rating-bar-chart__item__label">{label}</div>
      <div className="tt-rating-bar-chart__item__icon">{icon || <StarIcon />}</div>
      <div className="tt-rating-bar-chart__item__bar">
        <div
          className="tt-rating-bar-chart__item__bar__fill"
          style={{ width: `${finalWidth(width)}%` }}
        ></div>
        <div
          className="tt-rating-bar-chart__item__bar__label"
          style={{ paddingLeft: `${width === 0 ? 8 : 0}px` }}
        >
          {value}
        </div>
      </div>
    </div>
  );
};
