import { useEffect, useState } from "react";
import cx from "classnames";

import "./styles.css";
import { IconCheck } from "./IconCheck";

export interface Step {
  label: string;
  subLabel?: string;
  popup?: string;
}

export interface TimelineProps {
  steps: Step[];
  activeItem?: number;
}

const calculateProgress = (steps: Step[], activeItem: number) => {
  const step = steps[activeItem - 1];
  const stepIndex = steps.indexOf(step);
  const stepProgress = (100 / steps.length) * stepIndex;
  const stepProgressWithSub = stepProgress + 100 / steps.length / 2;
  return stepProgressWithSub + stepProgress / 2;
};

export const Timeline = ({ steps, activeItem }: TimelineProps) => {
  const [progress, setProgress] = useState(calculateProgress(steps, activeItem));

  useEffect(() => {
    setProgress(calculateProgress(steps, activeItem));
  }, [activeItem]);

  return (
    <div>
      <div className="tt-timeline">
        <div className="tt-timeline__progress" style={{ width: `${progress}%` }} />
      </div>
      <div className="tt-timeline__steps">
        {steps.map((step, index) => (
          <div className="tt-timeline__step" key={index}>
            {/* <div className="tt-timeline__step-popup">{step.popup}</div> */}
            <div
              className={cx("tt-timeline__step_indicator", {
                ["active"]: activeItem - 1 >= index,
              })}
            >
              {activeItem - 1 >= index ? (
                <IconCheck className="tt-timeline__step_indicator-check" />
              ) : null}
            </div>
            <div className="tt-timeline__step-label">{step.label}</div>
            <div className="tt-timeline__step-sublabel">{step.subLabel}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
