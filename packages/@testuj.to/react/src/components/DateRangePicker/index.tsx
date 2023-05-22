import React, { useMemo, useState } from "react";
import DatePicker, { Locale } from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./styles.css";

export interface DateRangePickerProps {
  onChange: (dateRange: [Date | null, Date | null]) => void;
  dateRange: [Date | null, Date | null];
  margin?: string;
  translationFunciton: (key: string) => string;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  onChange,
  dateRange,
  margin,
  translationFunciton,
}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
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

  return (
    <div className="tt-datePicker-wrapper" style={{ margin: margin }}>
      {/* <img src={getIconPath("dashboard_active")} alt="" className={styles.icon} /> */}
      <DatePicker
        selectsRange
        startDate={startDate}
        endDate={endDate}
        onChange={onChangeSelection}
        dateFormat="dd.MM.yyyy"
        todayButton={translationFunciton("time.today")}
        // locale={locale}
      />
    </div>
  );
};
