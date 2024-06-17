import React, { useEffect, useMemo, useState } from "react";
import DatePickerComponent, { Locale } from "react-datepicker";
import cx from "classnames";
import moment from "moment";

import { CalendarIcon } from "@radix-ui/react-icons";

import "react-datepicker/dist/react-datepicker.css";
import "./styles.css";

type DateRange = [Date | null, Date | null];

export interface DatePickerProps {
    onChange: (dateRange: Date | null | DateRange) => void;
    dateRange?: DateRange;
    selected?: Date;
    translationFunciton: (key: string) => string;
    className?: string;
    dateFormat?: string;
    dropdownPickers?: boolean;
    dateTime?: boolean;
    type: "single" | "range";
}

export const DatePicker: React.FC<DatePickerProps> = ({
    onChange,
    dateRange,
    selected,
    className,
    translationFunciton,
    dateFormat = "dd.MM.yyyy",
    dropdownPickers,
    dateTime,
    type,
}) => {
    const [startDate, setStartDate] = useState(dateRange?.[0] || null);
    const [endDate, setEndDate] = useState(dateRange?.[1] || null);
    const [isMobile, setIsMobile] = useState(false);

    const onChangeSelection = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
        onChange([start, end]);
    };

    useEffect(() => {
        const isMobile = window.innerWidth < 768;
        setIsMobile(isMobile);
    }, []);

    const locale: Locale = useMemo(() => {
        return {
            localize: {
                month: (n: number) =>
                    [
                        translationFunciton("time.january"),
                        translationFunciton("time.february"),
                        translationFunciton("time.march"),
                        translationFunciton("time.april"),
                        translationFunciton("time.may"),
                        translationFunciton("time.june"),
                        translationFunciton("time.july"),
                        translationFunciton("time.august"),
                        translationFunciton("time.september"),
                        translationFunciton("time.october"),
                        translationFunciton("time.november"),
                        translationFunciton("time.december"),
                    ][n],
                day: (n: number) =>
                    [
                        translationFunciton("time.sun"),
                        translationFunciton("time.mon"),
                        translationFunciton("time.tue"),
                        translationFunciton("time.wed"),
                        translationFunciton("time.thu"),
                        translationFunciton("time.fri"),
                        translationFunciton("time.sat"),
                    ][n],
                ordinalNumber: (n: number) => `${n}.`,
                era: (n: number) => ["BC", "AD"][n],
                quarter: (n: number) =>
                    ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"][n],
                dayPeriod: (n: number) => ["AM", "PM"][n],
            },
            formatLong: {
                date: () => moment().format("DD.MM.YYYY"),
                time: () => "HH:mm",
                dateTime: () => moment().format("DD.MM.YYYY HH:mm"),
            },
            match: {
                ordinalNumber: () => {
                    throw new Error("Not implemented");
                },
                era: () => {
                    throw new Error("Not implemented");
                },
                quarter: () => {
                    throw new Error("Not implemented");
                },
                dayPeriod: () => {
                    throw new Error("Not implemented");
                },
            },
            options: {
                weekStartsOn: 1,
            },
        };
    }, [translationFunciton]);

    const handlerChangeRaw = (event, options?: { type: string }) => {
        const { value } = event.target;
        const date = new Date(value);
        if (date instanceof Date && !isNaN(date.getTime())) {
            if (type === "single") {
                onChange(date);
                return;
            }

            if (options?.type === "start") {
                setStartDate(date);
                onChange([date, endDate]);
                return;
            }
            if (options?.type === "end") {
                setEndDate(date);
                onChange([startDate, date]);
                return;
            }
        }
    };

    const formatDate = (date: Date) => {
        return dateTime ? date.toISOString().slice(0, 16) : moment(date).format("YYYY-MM-DD");
    };

    if (isMobile) {
        return (
            <div className={cx("tt-datePicker-input", className)}>
                <input
                    type={dateTime ? "datetime-local" : "date"}
                    onChange={(event) => handlerChangeRaw(event, { type: "start" })}
                    value={type === "range" ? formatDate(startDate) : formatDate(selected)}
                />
                {type === "range" && (
                    <>
                        <span className="tt-datePicker-separator">-</span>
                        <input
                            type={dateTime ? "datetime-local" : "date"}
                            onChange={(event) => handlerChangeRaw(event, { type: "end" })}
                            value={formatDate(endDate)}
                        />
                    </>
                )}
                <CalendarIcon className="tt-datePicker-icon" />
            </div>
        );
    }

    const CustomInput = React.forwardRef<HTMLDivElement, { value?: string }>(
        ({ value, ...props }, ref) => (
            <div {...props} className={cx("tt-datePicker-input", className)} ref={ref}>
                {value}
                <CalendarIcon className="tt-datePicker-icon" />
            </div>
        )
    );

    return (
        <DatePickerComponent
            selectsRange={type === "range"}
            selected={selected}
            startDate={startDate}
            endDate={endDate}
            onChange={type === "range" ? onChangeSelection : onChange}
            dateFormat={dateFormat}
            todayButton={translationFunciton("time.today")}
            locale={locale}
            customInput={type === "range" ? <CustomInput /> : undefined}
            showIcon={type === "single"}
            showYearDropdown={dropdownPickers}
            showMonthDropdown={dropdownPickers}
            showTimeSelect={dateTime}
            placeholderText={dateFormat}
            onChangeRaw={handlerChangeRaw}
        />
    );
};
