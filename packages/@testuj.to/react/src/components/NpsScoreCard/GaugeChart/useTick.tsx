import { useEffect, useRef, useState } from "react";

export const useTick = (value: number) => {
    const parsedValue = parseFloat(value.toFixed(0));
    const [currentValue, setCurrentValue] = useState(-100);
    const timeoutRef = useRef<any>();

    const animate = (currentValue: number) => {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;

        if (Math.floor(parsedValue) !== Math.floor(currentValue)) {
            if (parsedValue > currentValue) {
                setCurrentValue(currentValue + 0.8);
                timeoutRef.current = setTimeout(() => {
                    animate(currentValue + 0.8);
                }, 1);
            }

            if (parsedValue < currentValue) {
                setCurrentValue(currentValue - 0.8);
                timeoutRef.current = setTimeout(() => {
                    animate(currentValue - 0.8);
                }, 1);
            }
        }
    };

    useEffect(() => {
        animate(currentValue);
    }, [parsedValue]);

    return {
        currentValue,
    };
};
