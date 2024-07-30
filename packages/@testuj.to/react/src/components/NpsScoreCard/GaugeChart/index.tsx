import { useEffect, useMemo, useState } from "react";
import cx from "classnames";

import { useTick } from "./useTick";

export interface GaugeChartProps {
    promoters: number
    neutrals: number
    haters: number
    greenThreshold: number
    orangeThreshold: number
    t(key: string, args?: any): string;
}

export const GaugeChart = ({ haters: x, neutrals: y, promoters: z, orangeThreshold, greenThreshold, t }: GaugeChartProps) => {
    const [gradient, setGradient] = useState("conic-gradient(from 180deg at 50% 60%, #FF001D, #FF001D 0%, #FAB553 0%, #FAB553 0%, #029218 0%, #029218 100%)");
    const [left, setLeft] = useState("");
    const [bottom, setBottom] = useState("");
    const [totalScore, setTotalScore] = useState(-100);
    const { currentValue } = useTick(totalScore);

    const bgColor = useMemo(()=>{
        if (currentValue > greenThreshold) {
            return "#029218";
        }

        if (currentValue > orangeThreshold) {
            return "#FAB553";
        }

        return "#FF001D";
    }, [currentValue]);

    useEffect(() => {
        const total = x + y + z;
        const onePercent = total / 100;
        const xPercent = (x / onePercent);
        const yPercent = (y / onePercent);
        const zPercent = (z / onePercent);
        const xCalc = 76 * (xPercent / 100) + 12;
        const yCalc = 76 * (yPercent / 100);
        const zCalc = 76 * (zPercent / 100);
        const gradientLocal = `conic-gradient(from 180deg at 50% 50%, red, red ${xCalc}%, orange ${xCalc}%, orange ${xCalc + yCalc}%, green ${xCalc + yCalc}%, green ${xCalc + yCalc + zCalc}%)`;
        setGradient(gradientLocal);
    }, [x, y, z]);

    useEffect(() => {
        const total = x + y + z;
        const onePercent = total / 100;
        const xPercent = (x / onePercent);
        const zPercent = (z / onePercent);
        const score = (zPercent - xPercent);
        setTotalScore(score);
    }, [x, y, z]);

    useEffect(() => {
        const scorePercent = ((100 + currentValue) / 2) / 100;
        let whole = 273.6;
        let deg = Math.round(((whole - (whole * scorePercent)) - 46.8));
        let leftN = Math.cos(deg * (Math.PI / 180));
        let bottomN = Math.sin(deg * (Math.PI / 180));
        setLeft(`calc(50% + ${leftN} * 50%)`);
        setBottom(`calc(50% + ${bottomN} * 50%)`);
    }, [currentValue]);

    return (
        <>
            <svg width="0" height="0" viewBox="0 0 186 154" fill="none" xmlns="http://www.w3.org/2000/svg">
                <clipPath id={"clip-path"}>
                    <path d="M93.0093 0C41.724 0 0 41.95 0 93.5108C0 113.604 6.24092 132.752 18.0624 148.894C22.1455 154.469 29.9397 155.666 35.4924 151.556C41.0357 147.456 42.2262 139.607 38.1431 134.032C29.5026 122.232 24.9358 108.215 24.9358 93.5108C24.9358 55.7725 55.4801 25.0661 93.0093 25.0661C130.539 25.0661 161.083 55.7725 161.083 93.5108C161.083 108.215 156.516 122.223 147.866 134.032C143.783 139.607 144.974 147.446 150.517 151.556C152.74 153.198 155.326 153.996 157.893 153.996C161.725 153.996 165.501 152.224 167.938 148.894C179.759 132.743 186 113.595 186 93.5108C186.019 41.95 144.295 0 93.0093 0ZM13.7747 109.532L13.4119 107.714L22.5362 105.895L22.8989 107.714L13.7747 109.532ZM26.4239 66.3388L17.8299 62.7951L18.5368 61.0788L27.1308 64.6226L26.4239 66.3388ZM52.4107 33.8977L47.2394 26.1886L48.7834 25.1588L53.9547 32.8679L52.4107 33.8977ZM93.9487 21.3275H92.0885V12.0506H93.9487V21.3275ZM133.617 33.8884L132.073 32.8586L137.245 25.1496L138.788 26.1793L133.617 33.8884ZM159.604 66.311L158.888 64.5948L167.482 61.0417L168.198 62.758L159.604 66.311ZM163.148 107.667L163.51 105.849L172.635 107.658L172.272 109.476L163.148 107.667Z" fill="black"/>
                </clipPath>
            </svg>
            <div className={cx("tt-gauge-chart-container")}>
                <div
                    className={cx("tt-gauge-chart-visualizer")}
                    style={{ backgroundImage: gradient }}
                >
                </div>
                <div className={cx("tt-gauge-chart-pointer-container")}>
                    <div
                        className={cx("tt-gauge-chart-pointer")}
                        style={{
                            backgroundColor: bgColor,
                            bottom,
                            left,
                        }}
                    >
                        <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 14.2222C7.86546 14.2223 7.73264 14.1919 7.61156 14.1333C7.30133 13.9822 0 10.3742 0 4.44439C1.19066e-05 3.56542 0.260649 2.70619 0.748956 1.97535C1.23726 1.2445 1.93131 0.674854 2.74335 0.338432C3.55538 0.0020108 4.44894 -0.0860775 5.31103 0.0853055C6.17313 0.256688 6.96505 0.679847 7.58667 1.30128L8 1.71461L8.41333 1.30128C9.03495 0.679847 9.82687 0.256688 10.689 0.0853055C11.5511 -0.0860775 12.4446 0.0020108 13.2567 0.338432C14.0687 0.674854 14.7627 1.2445 15.251 1.97535C15.7394 2.70619 16 3.56542 16 4.44439C16 10.3519 8.70044 13.9804 8.38933 14.1333C8.26798 14.1921 8.13484 14.2224 8 14.2222Z" fill="white"/>
                        </svg>
                    </div>
                </div>
                <span className={cx("tt-gauge-chart-min")}>-100</span>
                <span className={cx("tt-gauge-chart-max")}>100</span>
                <span className={cx("tt-gauge-chart-total-container")}>
                    <p className={cx("tt-gauge-chart-total")}>
                        {totalScore.toFixed(1)}
                    </p>
                    <p className={cx("tt-gauge-chart-total-desc")}>
                        {t("npsScoreCard.totalScore")}
                    </p>
                </span>
            </div>
        </>
    );
};
