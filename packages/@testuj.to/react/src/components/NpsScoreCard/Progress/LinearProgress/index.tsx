import cx from "classnames";

import "./style.css"

interface LinearProgressProps {
    color: string
    progress: number
}

export const LinearProgress = ({progress, color}:LinearProgressProps)=>{
    return(
        <div className={cx("tt-gauge-chart-linear-progress")}>
            <div
                style={{ right: `${100 - progress}%`, backgroundColor: color }}
                className={cx("tt-gauge-chart-linear-progress-root")}
            />
        </div>
    )
}
