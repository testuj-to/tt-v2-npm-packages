import cx from "classnames";
import "./style.css";
import {useMemo} from "react";
import {Progress} from "./Progress";
import {GaugeChart} from "./GaugeChart";

export interface NpsScoreProps {
    promoters: number
    passives: number
    detractors: number
    greenThreshold?: number
    orangeThreshold?: number
}

export const NpsScoreCard = ({promoters, passives, detractors, orangeThreshold = -50, greenThreshold = 0}: NpsScoreProps) => {
    const maxVal = useMemo(()=>{
        return promoters + passives + detractors
    }, [promoters, passives, detractors])
    return (
        <div className={cx("tt-gauge-chart")}>
            <p style={{fontSize: 16, fontWeight: 600, lineHeight: 1.2, whiteSpace: "nowrap", margin: 0}}>NPS skóre</p>
            <div className={cx("tt-gauge-chart-partition")}>
                <div className={cx("tt-gauge-chart-progress-container")}>
                    <Progress color={"#029218"} value={promoters} maxValue={maxVal} text={"Promotéři"} />
                    <Progress color={"#FAB553"} value={passives} maxValue={maxVal} text={"Neutrální"} />
                    <Progress color={"#FF001D"} value={detractors} maxValue={maxVal} text={"Kritici"} />
                </div>
                <GaugeChart haters={detractors} neutrals={passives} promoters={promoters} orangeThreshold={orangeThreshold} greenThreshold={greenThreshold} />
            </div>
        </div>
    )
}
