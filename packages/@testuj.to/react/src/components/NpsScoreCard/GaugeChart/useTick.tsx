import { useEffect, useState } from "react";

export const useTick = (value: number) => {
    const parsedValue = parseFloat(value.toFixed(0));
    const [currentValue, setCurrentValue] = useState(-100);
    const [localTimeout, setLocalTimeout] = useState<any>();

    const animate = (currentValue: number) => {
        clearTimeout(localTimeout);

        if (Math.floor(parsedValue) !== Math.floor(currentValue)) {
            if (parsedValue > currentValue) {
                setCurrentValue(currentValue + 0.8);
                setLocalTimeout(setTimeout(() => {
                    animate(currentValue + 0.8);
                }, 1));
            }

            if (parsedValue < currentValue) {
                setCurrentValue(currentValue - 0.8);
                setLocalTimeout(setTimeout(() => {
                    animate(currentValue - 0.8);
                }, 1));
            }
        }
    }

    useEffect(() => {
        animate(currentValue);
    }, [parsedValue]);

    return {
        currentValue,
    };
}
