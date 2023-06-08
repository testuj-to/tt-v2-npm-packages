import { useEffect, useRef, useState } from "react";
import cx from "classnames";

import "./styles.css";
import { IconCheck } from "./IconCheck";

export interface Step {
  label: string;
  subLabel?: string;
  popup?: string;
  date?: string;
}

export interface TimelineProps {
  steps: Step[];
  activeItem?: number;
  showPopup?: boolean;
}

const lerp = (a: number, b: number, n: number) => {
  return (1 - n) * a + n * b;
};

// calculate proggres in between two dates
const calculateProgressBetweenDates = (startDate: string, endDate: string, step: number) => {
  const current = new Date().getTime();
  const pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
  const start = new Date(startDate.replace(pattern, "$3-$2-$1")).getTime();
  const end = new Date(endDate.replace(pattern, "$3-$2-$1")).getTime();
  if (current < start || current > end) {
    return 0;
  }
  const progress = (current - start) / (end - start);
  return lerp(0, step, progress);
};

const calculateProgress = (
  steps: Step[],
  activeItem: number,
  calculateProgress: boolean,
  isMobile: boolean
) => {
  if (!activeItem) {
    return 0;
  }
  const step = steps[activeItem - 1];
  const stepIndex = steps.indexOf(step);
  const stepProgress = (100 / steps.length) * stepIndex;
  const stepProgressWithSub = stepProgress + 100 / steps.length / 2;

  if (isMobile) {
    const stepsLength = steps.length - 1;
    const stepProgress = (100 / stepsLength) * stepIndex;
    const stepProgressWithSub = stepProgress + 100 / stepsLength / 2;

    const addition = 100 / stepsLength / 2;
    if (activeItem === 1) {
      return addition / 2 + addition;
    }

    return stepProgressWithSub - addition / 2 + addition;
  }

  return (
    stepProgressWithSub +
    (calculateProgress
      ? calculateProgressBetweenDates(step.date, steps[stepIndex + 1].date, 100 / steps.length)
      : 0)
  );
};

export const Timeline = ({ steps, activeItem, showPopup }: TimelineProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [progress, setProgress] = useState(
    calculateProgress(steps, activeItem, showPopup, isMobile)
  );
  const initialHeight = useRef<number>(0);
  const warpperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window?.innerWidth < 900) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }

    setProgress(calculateProgress(steps, activeItem, showPopup, isMobile));
  }, [activeItem, showPopup, isMobile]);

  const style = {
    width: isMobile ? undefined : `${progress}%`,
    height: isMobile ? `${progress}%` : undefined,
  };

  if (!initialHeight.current) {
    initialHeight.current = warpperRef.current?.clientHeight || 0;
  }

  return (
    <div className="tt-timeline__wrapper" ref={warpperRef}>
      {showPopup ? (
        <div className="tt-timeline__popup-wrapper" style={style}>
          <div className="tt-timeline__popup-anchor">
            {steps[activeItem - 1]?.popup ? (
              <div className="tt-timeline__popup">{steps[activeItem - 1]?.popup}</div>
            ) : null}
          </div>
        </div>
      ) : null}

      <div
        className="tt-timeline"
        style={{ height: isMobile ? initialHeight.current - 80 : undefined }}
      >
        <div className="tt-timeline__progress" style={style} />
      </div>
      <div className="tt-timeline__steps">
        {steps.map((step, index) => (
          <div className="tt-timeline__step" key={index}>
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
