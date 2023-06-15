import { useCallback, useId } from "react";
import cx from "classnames";
import { Root, Indicator } from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";

import "./styles.css";

export interface CheckboxProps {
  value: boolean;
  label?: React.ReactNode;
  onChange?(value: boolean);
  variant?: "default" | "outlined" | "framed";
  className?: string;
}

export const Checkbox = ({
  value,
  label,
  onChange,
  variant = "default",
  className,
}: CheckboxProps) => {
  const id = useId();
  const handleChange = useCallback(
    (isChecked: boolean | string) => {
      if (typeof onChange === "function") {
        onChange(!!isChecked);
      }
    },
    [onChange]
  );

  return (
    <div
      className={cx("tt-checkbox-container", variant, className)}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        variant !== "default" && handleChange(!value);
      }}
    >
      <Root
        id={id}
        className={cx("tt-checkbox", variant)}
        checked={value}
        onCheckedChange={handleChange}
      >
        <Indicator className={cx("tt-checkbox-indicator", variant)}>
          <CheckIcon className={cx("tt-checkbox-checkmark", variant)} />
        </Indicator>
      </Root>
      {label && (
        <label htmlFor={id} className={cx("tt-checkbox-label", variant)}>
          {label}
        </label>
      )}
    </div>
  );
};
