import { CalendarIcon } from "@radix-ui/react-icons";
import { useMemo } from "react";
import DatePickerComponent, { Locale } from "react-datepicker";
import cx from "classnames";
import moment from "moment";

import "../DateRangePicker/styles.css";

export interface DatePickerProps {
  onChange: (date: Date | null) => void;
  value: Date | null;
  translationFunciton: (key: string) => string;
  className?: string;
  dateFormat?: string;
  todayButton?: string;
  showYearDropdown?: boolean;
  showMonthDropdown?: boolean;
  dateTime?: boolean;
}

export const DatePicker = ({
  onChange,
  value,
  className,
  translationFunciton,
  dateFormat = "dd.MM.yyyy",
  todayButton,
  showYearDropdown,
  showMonthDropdown,
  dateTime,
}: DatePickerProps) => {
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

  return (
    <DatePickerComponent
      showIcon
      selected={value}
      onChange={onChange}
      dateFormat={dateFormat}
      todayButton={translationFunciton("time.today")}
      locale={locale}
      className={cx("tt-datePicker", className)}
      showYearDropdown={showYearDropdown}
      showMonthDropdown={showMonthDropdown}
      showTimeSelect={dateTime}
    />
  );
};
