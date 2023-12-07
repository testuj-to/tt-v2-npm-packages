import {useEffect, useState} from "react";

export const useTick = (value: number)=>{
    const parsedValue = parseFloat(value.toFixed(0))
    const [currentValue, setCurrentValue] = useState(-100)
    const [localTimeout, setLocalTimeout] = useState<any>()
    const animate = (curVal)=>{
        clearTimeout(localTimeout)
        if(Math.floor(parsedValue) !== Math.floor(curVal)) {
            if (parsedValue > curVal) {
                setCurrentValue(curVal + 0.8)
                setLocalTimeout(setTimeout(()=>{animate(curVal + 0.8)}, 1))
            }
            if(parsedValue < curVal) {
                setCurrentValue(curVal - 0.8)
                setLocalTimeout(setTimeout(()=>{animate(curVal - 0.8)}, 1))
            }
        }
    }

    useEffect(() => {
        animate(currentValue)
    }, [parsedValue]);

    return {currentValue}
}
