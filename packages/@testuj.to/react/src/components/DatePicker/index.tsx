import "react-datepicker/dist/react-datepicker.css";

import React, { useMemo, useState } from "react";
import DatePickerComponent from "react-datepicker";
import cx from "classnames";
import moment from "moment";
import { CalendarIcon } from "@radix-ui/react-icons";

import "./styles.css";

import { ReactDatePickerProps } from "./types";

type DateRange = [Date | null, Date | null];

interface CustomInputProps {
    value?: string;
    className?: string;
}

const CustomInput = React.forwardRef<HTMLDivElement, CustomInputProps>(({ value, className, ...props }, ref) => (
    <div
        {...props}
        ref={ref}
        className={cx("tt-datePicker-input", className)}
    >
        {value}
        <CalendarIcon className="tt-datePicker-icon" />
    </div>
));

export interface DatePickerProps extends ReactDatePickerProps {
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
    dateRange,
    selected,
    className,
    dateFormat = "dd.MM.yyyy",
    dropdownPickers,
    dateTime,
    type,
    onChange,
    translationFunciton,
    ...rest
}) => {
    const [startDate, setStartDate] = useState(dateRange?.[0] || null);
    const [endDate, setEndDate] = useState(dateRange?.[1] || null);

    const onChangeSelection = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
        onChange([start, end]);
    };

    const locale = useMemo(() => {
        return {
            localize: {
                month: (month: number) => [
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
                ][month],
                day: (day: number) => [
                    translationFunciton("time.sun"),
                    translationFunciton("time.mon"),
                    translationFunciton("time.tue"),
                    translationFunciton("time.wed"),
                    translationFunciton("time.thu"),
                    translationFunciton("time.fri"),
                    translationFunciton("time.sat"),
                ][day],
                ordinalNumber: (number: number) =>
                    `${number}.`,
                era: (era: number) =>
                    ["BC", "AD"][era],
                quarter: (quarter: number) => [
                    "1st quarter",
                    "2nd quarter",
                    "3rd quarter",
                    "4th quarter",
                ][quarter],
                dayPeriod: (dayPeriod: number) =>
                    ["AM", "PM"][dayPeriod],
            },
            match: {},
            formatLong: {
                date: () =>
                    moment().format("DD.MM.YYYY"),
                time: () =>
                    "HH:mm",
                dateTime: () =>
                    moment().format("DD.MM.YYYY HH:mm"),
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

    return (
        <DatePickerComponent
            {...rest}
            selectsRange={type === "range"}
            selected={selected}
            startDate={startDate}
            endDate={endDate}
            dateFormat={dateFormat}
            todayButton={translationFunciton("time.today")}
            locale={locale}
            customInput={type === "range" ?
                <CustomInput className={className} /> : undefined}
            showIcon={type === "single"}
            showYearDropdown={dropdownPickers}
            showMonthDropdown={dropdownPickers}
            showTimeSelect={dateTime}
            placeholderText={dateFormat}
            onChange={type === "range" ?
                onChangeSelection : onChange}
            onChangeRaw={handlerChangeRaw}
        />
    );
};
