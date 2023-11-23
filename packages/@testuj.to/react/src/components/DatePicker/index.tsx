import { CalendarIcon } from "@radix-ui/react-icons";
import React, { useMemo } from "react";
import DatePickerComponent, { Locale } from "react-datepicker";
import cx from "classnames";
import { Input, InputProps } from "../Input";
import moment from "moment";

import "./styles.css";

export interface DatePickerProps {
  onChange: (date: Date | null) => void;
  date: Date | null;
  translationFunciton: (key: string) => string;
  className?: string;
  dateFormat?: string;
  todayButton?: string;
  customInput?: React.ReactNode;
}

export const DatePicker = ({
  onChange,
  date,
  className,
  translationFunciton,
  dateFormat = "dd.MM.yyyy",
  todayButton,
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
    <DatePickerComponent
      selected={date}
      onChange={onChange}
      dateFormat={dateFormat}
      todayButton={translationFunciton("time.today")}
      locale={locale}
      customInput={
        <CustomInput
          className={className}
          value={moment(date).format(dateFormat)}
          onBlur={(e) => onChange(moment(e.target.value).toDate())}
        />
      }
    />
  );
};

interface CustomInputProps extends InputProps {}

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ value, className, ...props }, ref) => (
    <div className={cx("tt-datePicker-input-wrapper", className)}>
      <Input {...props} className="tt-datePicker-input" ref={ref} />
      <CalendarIcon className="tt-datePicker-icon" />
    </div>
  )
);
