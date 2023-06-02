import { useEffect, useState } from "react";
import cx from "classnames";

import "./styles.css";

export interface ProgressBarProps {
  progress: number;
  className?: string;
}

export const ProgressBar = (props: ProgressBarProps) => {
  const [progress, setProgress] = useState(props.progress);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(props.progress), 300);
    return () => clearTimeout(timer);
  }, [props.progress]);

  return (
    <div className={cx("tt-progress-bar", props.className)}>
      <div className="tt-progress-bar-indicator" style={{ width: `${progress}%` }} />
    </div>
  );
};
