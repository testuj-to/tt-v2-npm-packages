import { useState, useEffect, useMemo, useCallback } from "react";
import cx from "classnames";
// import { useTranslation } from "next-i18next";
// import moment from "moment";

import "./styles.css";

import { Select } from "../Select";

const daysInMonth = {
    2: 29,
    4: 30,
    6: 30,
    9: 30,
    11: 30,
    1: 31,
    3: 31,
    5: 31,
    7: 31,
    8: 31,
    10: 31,
    12: 31,
}

export interface SelectDateProps {
    value?: Date
    onChange?(value: Date)
}

export const SelectDate = ({ value, onChange }: SelectDateProps) => {
    // const { t } = useTranslation([ 'common' ])

    const handleChange = useCallback((valueString: string) => {
        // if (typeof onChange === 'function') {
        //     onChange(moment(valueString, 'YYYY-MM-DD').toDate())
        // }
    }, [ onChange ])

    // const valueString = moment(value).format('YYYY-MM-DD')

    // const {
    //     yearOptions,
    //     monthOptions,
    //     dayOptions,
    // } = useDateSelect(valueString, handleChange)

    // const [ value, setValue ] = useState(_value || null)
    // useEffect(() => {
    //     if (_value) {
    //         setValue(_value)
    //     }
    // }, [ _value ])

    // // const [ day, setDay ] = useState(0)
    // // const [ month, setMonth ] = useState(0)
    // // const [ year, setYear ] = useState(0)

    // const month = useMemo(() => {
    //     if (value) {
    //         return moment(value).month()
    //     }

    //     return null
    // }, [ value ])

    // const [ years, setYears ] = useState([])
    // useEffect(() => {
    //     const years = []
    //     const currentYear = moment().year()

    //     for (let index = 0; index < 120; index += 1) {
    //         years.push(currentYear - index)
    //     }

    //     setYears(years)
    // }, [])

    // const dates = useMemo(() => {
    //     const dates = []

    //     if (!month) {
    //         return []
    //     }

    //     for (let date = 0; date < daysInMonth[month]; date++) {
    //         dates.push(date)
    //     }

    //     return dates
    // }, [ month ])

    // const handleChange = (value: Date) => {
    //     if (typeof onChange === 'function') {
    //         onChange(value)
    //     }
    // }

    // // date   1-31
    // // month  0-11

    // // january    31 days
    // // february   29 days
    // // march      31 days
    // // april      30 days
    // // may        31 days
    // // june       30 days
    // // july       31 days
    // // august     31 days
    // // september  30 days
    // // october    31 days
    // // november   30 days
    // // december   31 days

    const t = v => v;

    return (
        <>
            <Select
                placeholder={t("year")}
                options={Array(130)
                    .map((_, index) => (new Date()).getFullYear() - index)
                    .map(year => ({
                        value: String(year),
                        label: String(year),
                    }))}
            />
            <Select
                placeholder={t("month")}
                options={[{
                    value: String(0),
                    label: t("january"),
                }, {
                    value: String(1),
                    label: t("february"),
                }, {
                    value: String(2),
                    label: t("march"),
                }, {
                    value: String(3),
                    label: t("april"),
                }, {
                    value: String(4),
                    label: t("may"),
                }, {
                    value: String(5),
                    label: t("june"),
                }, {
                    value: String(6),
                    label: t("july"),
                }, {
                    value: String(7),
                    label: t("august"),
                }, {
                    value: String(8),
                    label: t("september"),
                }, {
                    value: String(9),
                    label: t("october"),
                }, {
                    value: String(10),
                    label: t("november"),
                }, {
                    value: String(11),
                    label: t("december"),
                }]}
            />
            <Select
                placeholder={t("day")}
                options={[]}
            />
        </>
    )

    return (
        <div className={cx("tt-selectdate-container")}>
            {/* <Select
                label={t('year')}
                placeholder={t('year')}
                options={yearOptions}
                // options={years.map((year, index) => ({
                //     value: String(year),
                //     label: String(year),
                // }))}
            />
            <Select
                label={t('month')}
                placeholder={t('month')}
                options={monthOptions}
                // options={[
                //     { value: '1', label: t('january') },
                //     { value: '2', label: t('february') },
                //     { value: '3', label: t('march') },
                //     { value: '4', label: t('april') },
                //     { value: '5', label: t('may') },
                //     { value: '6', label: t('june') },
                //     { value: '7', label: t('july') },
                //     { value: '8', label: t('august') },
                //     { value: '9', label: t('september') },
                //     { value: '10', label: t('october') },
                //     { value: '11', label: t('november') },
                //     { value: '12', label: t('december') },
                // ]}
            />
            <Select
                label={t('day')}
                placeholder={t('day')}
                // value={value ? moment().date().toString() : null}
                options={dayOptions}
                // options={dates.map(date => ({
                //     value: String(date),
                //     label: String(date + 1),
                // }))}
            /> */}
        </div>
    );
};
