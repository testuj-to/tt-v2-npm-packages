import React, { useMemo, useState } from "react";
import DatePicker, { Locale } from "react-datepicker";
import cx from "classnames";

import "react-datepicker/dist/react-datepicker.css";
import "./styles.css";
import { CalendarIcon } from "@radix-ui/react-icons";

export interface DateRangePickerProps {
  onChange: (dateRange: [Date | null, Date | null]) => void;
  dateRange: [Date | null, Date | null];
  translationFunciton: (key: string) => string;
  className?: string;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  onChange,
  dateRange,
  className,
  translationFunciton,
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
        date: () => "x",
        time: () => `1`,
        dateTime: () => `1`,
      },
      options: {
        weekStartsOn: 1,
      },
    };
  }, [translationFunciton]);

  const CustomInput = React.forwardRef<HTMLDivElement, { value: string }>(
    ({ value, ...props }, ref) => (
      <div {...props} className={cx("tt-dateRangePicker-input", className)} ref={ref}>
        {value}
        <CalendarIcon className="tt-dateRangePicker-icon" />
      </div>
    )
  );

  return (
    <DatePicker
      selectsRange
      startDate={startDate}
      endDate={endDate}
      onChange={onChangeSelection}
      dateFormat="dd.MM.yyyy"
      todayButton={translationFunciton("time.today")}
      locale={locale}
      customInput={<CustomInput value={undefined} />}
    />
  );
};
