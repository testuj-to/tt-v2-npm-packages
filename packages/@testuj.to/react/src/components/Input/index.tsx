import React, { InputHTMLAttributes } from "react";
import cx from "classnames";

import "./styles.css";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "dark";
  icon?: React.ReactNode;
  iconClassName?: string;
}
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ variant, className, icon, iconClassName, ...rest }, innerRef) => {
    return (
      <div className="tt-input-wrapper">
        {icon && <div className={cx("tt-input-icon", iconClassName)}>{icon}</div>}
        <input
          ref={innerRef}
          {...rest}
          className={cx(
            "tt-input",
            { "tt-input-dark": variant === "dark" },
            { icon: icon },
            className
          )}
        />
      </div>
    );
  }
);
