import { useEffect, useState } from "react";
import cx from "classnames";

import "./styles.css";

export interface ProgressBarProps {
  value: number;
  className?: string;
  delay?: number;
}

export const ProgressBar = ({ value, delay, className }: ProgressBarProps) => {
  const [progress, setProgress] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(value), delay || 0);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className={cx("tt-progress-bar", className)}>
      <div className="tt-progress-bar-indicator" style={{ width: `${progress}%` }} />
    </div>
  );
};
