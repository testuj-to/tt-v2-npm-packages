import { useCallback, useState } from "react";
import { Root, Indicator } from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";

import "./styles.css";

export interface CheckboxProps {
  value: boolean;
  label?: string;
  onChange?(value: boolean);
}

export const Checkbox = ({ value, label, onChange }: CheckboxProps) => {
  const [id] = useState(Math.random().toString(36).substring(2));

  const handleChange = useCallback(
    (isChecked: boolean | string) => {
      if (typeof onChange === "function") {
        onChange(!!isChecked);
      }
    },
    [onChange]
  );

  return (
    <div className="tt-checkbox-container">
      <Root id={id} className="tt-checkbox" checked={value} onCheckedChange={handleChange}>
        <Indicator className="tt-checkbox-indicator">
          <CheckIcon className="tt-checkbox-checkmark" />
        </Indicator>
      </Root>
      {label && (
        <label htmlFor={id} className="tt-checkbox-label">
          {label}
        </label>
      )}
    </div>
  );
};
