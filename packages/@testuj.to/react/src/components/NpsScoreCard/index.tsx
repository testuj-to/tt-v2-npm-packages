import cx from "classnames";
import { useMemo } from "react";

import "./style.css";

import { Progress } from "./Progress";
import { GaugeChart } from "./GaugeChart";

export interface NpsScoreCardProps {
    promoters: number
    passives: number
    detractors: number
    greenThreshold?: number
    orangeThreshold?: number
    t(key: string, args?: any): string;
}

export const NpsScoreCard = ({ promoters, passives, detractors, orangeThreshold = -50, greenThreshold = 0, t }: NpsScoreCardProps) => {
    const maxVal = useMemo(() => {
        return promoters + passives + detractors;
    }, [promoters, passives, detractors]);

    return (
        <div className={cx("tt-gauge-chart")}>
            <p
                style={{
                    fontSize: 16,
                    fontWeight: 600,
                    lineHeight: 1.2,
                    whiteSpace: "nowrap",
                    margin: 0,
                }}
            >
                {t("npsScoreCard.npsScore")}
            </p>
            <div className={cx("tt-gauge-chart-partition")}>
                <div className={cx("tt-gauge-chart-progress-container")}>
                    <Progress
                        color="#029218"
                        text={t('npsScoreCard.promoters')}
                        value={promoters}
                        maxValue={maxVal}
                    />
                    <Progress
                        color="#FAB553"
                        text={t('npsScoreCard.neutrals')}
                        value={passives}
                        maxValue={maxVal}
                    />
                    <Progress
                        color="#FF001D"
                        text={t('npsScoreCard.critics')}
                        value={detractors}
                        maxValue={maxVal}
                    />
                </div>
                <GaugeChart
                    t={t}
                    haters={detractors}
                    neutrals={passives}
                    promoters={promoters}
                    orangeThreshold={orangeThreshold}
                    greenThreshold={greenThreshold}
                />
            </div>
        </div>
    );
};
