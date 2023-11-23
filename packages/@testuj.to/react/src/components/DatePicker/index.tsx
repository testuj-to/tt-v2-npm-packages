import React, { useMemo, useState } from "react";
import DatePickerComponent, { Locale } from "react-datepicker";
import cx from "classnames";

import "react-datepicker/dist/react-datepicker.css";
import "./styles.css";
import { CalendarIcon } from "@radix-ui/react-icons";

type DateRange = [Date | null, Date | null];

export interface DatePickerProps {
  onChange: (dateRange: Date | null | DateRange) => void;
  dateRange: DateRange;
  translationFunciton: (key: string) => string;
  className?: string;
  dateFormat?: string;
  showYearDropdown?: boolean;
  showMonthDropdown?: boolean;
  dateTime?: boolean;
  type: "single" | "range";
}

export const DatePicker: React.FC<DatePickerProps> = ({
  onChange,
  dateRange,
  className,
  translationFunciton,
  dateFormat = "dd.MM.yyyy",
  showYearDropdown,
  showMonthDropdown,
  dateTime,
  type,
}) => {
  const [startDate, setStartDate] = useState(dateRange[0] || new Date());
  const [endDate, setEndDate] = useState(dateRange[1] || null);
  const onChangeSelection = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    onChange([start, end]);
  };

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
        quarter: (n: number) => ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"][n],
        dayPeriod: (n: number) => ["AM", "PM"][n],
      },
      formatLong: {
        date: () => "dd.MM.yyyy",
        time: () => "HH:mm",
        dateTime: () => "dd.MM.yyyy HH:mm",
      },
      options: {
        weekStartsOn: 1,
      },
    };
  }, [translationFunciton]);

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
      startDate={startDate}
      endDate={endDate}
      onChange={onChangeSelection}
      dateFormat={dateFormat}
      todayButton={translationFunciton("time.today")}
      locale={locale}
      customInput={type === "range" ? <CustomInput /> : undefined}
      showIcon={type === "single"}
      showYearDropdown={showYearDropdown}
      showMonthDropdown={showMonthDropdown}
      showTimeSelect={dateTime}
    />
  );
};
