import { useEffect, useRef, useState } from "react";
import cx from "classnames";

import "./styles.css";

import { IconCheck } from "./IconCheck";

export interface Step {
    label: string;
    subLabel?: string;
    popup?: string;
    date?: number;
}

export interface TimelineProps {
    steps: Step[];
    activeItem?: number;
    showPopup?: boolean;
    lockToActiveItem?: boolean;
    dateZero?: number;
}

const lerp = (a: number, b: number, n: number) => {
    return (1 - n) * a + n * b;
};

// calculate proggres in between two dates
const calculateProgressBetweenDates = (start: number, end: number, step: number) => {
    const current = new Date().getTime();

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
    isMobile: boolean,
    dateZero?: number
) => {
    if (!activeItem === undefined) {
        return 0;
    }

    if (activeItem > steps.length) {
        return 100;
    }

    const step = steps[activeItem - 1];
    const stepIndex = steps.indexOf(step);
    const stepProgress = (100 / steps.length) * stepIndex;
    const stepProgressWithSub = stepProgress + 100 / steps.length / 2;

    if (activeItem === 0) {
        return calculateProgressBetweenDates(dateZero || 0, steps[0].date, 100 / steps.length) / 2;
    }

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
            (calculateProgress ?
                calculateProgressBetweenDates(step.date, steps[stepIndex + 1]?.date, 100 / steps.length) : 0)
    );
};

export const Timeline = ({
    steps,
    activeItem,
    showPopup,
    dateZero,
    lockToActiveItem = false,
}: TimelineProps) => {
    const [isMobile, setIsMobile] = useState(false);
    const [progress, setProgress] = useState(
        calculateProgress(steps, activeItem, showPopup, isMobile, dateZero)
    );
    const initialHeight = useRef<number>(0);
    const warpperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setProgress(calculateProgress(steps, activeItem, !lockToActiveItem, isMobile, dateZero));

        if (window?.innerWidth < 900) {
            setIsMobile(true);
            return;
        }

        setIsMobile(false);
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
            {(showPopup && !isMobile) && (
                <div className="tt-timeline__popup-wrapper" style={style}>
                    <div className="tt-timeline__popup-anchor">
                        {!!steps[activeItem - 1]?.popup && (
                            <div className="tt-timeline__popup">{steps[activeItem - 1]?.popup}</div>
                        )}
                    </div>
                </div>
            )}
            <div
                className="tt-timeline"
                style={{ height: isMobile ? initialHeight.current - 80 : undefined }}
            >
                <div className="tt-timeline__progress" style={style} />
            </div>
            <div className="tt-timeline__steps">
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className="tt-timeline__step"
                    >
                        <div
                            className={cx("tt-timeline__step_indicator", {
                                ["active"]: activeItem - 1 >= index,
                            })}
                        >
                            {activeItem - 1 >= index && (
                                <IconCheck className="tt-timeline__step_indicator-check" />
                            )}
                        </div>
                        <div className="tt-timeline__step-label">
                            {step.label}
                        </div>
                        <div className="tt-timeline__step-sublabel">
                            {step.subLabel}
                        </div>
                        {(isMobile && index + 1 === activeItem && activeItem !== steps.length) && (
                            <div className="tt-timeline__popup">
                                {step.popup}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
