import { useEffect, useState } from "react";
import cx from "classnames";

import "./styles.css";

export interface ProgressBarProps {
  value: number;
  className?: string;
  delay?: number;
  breakpoints?: number[];
  finalIcon?: React.ReactNode;
  backgroundColor?: string;
  lineColor?: string;
  breakpointColor?: string;
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
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className={cx("tt-progress-bar-wrapper", className)}>
      <div className={cx("tt-progress-bar")} style={{ backgroundColor: backgroundColor }}>
        {breakpoints?.map((breakpoint) => (
          <div
            className="tt-progress-bar-breakpoint"
            style={{ left: `${breakpoint}%`, backgroundColor: breakpointColor }}
            key={breakpoint}
          />
        ))}
        <div
          className="tt-progress-bar-indicator"
          style={{ width: `${progress}%`, backgroundColor: lineColor }}
        />
      </div>
      <div className="tt-progress-bar-icon">{finalIcon}</div>
    </div>
  );
};
