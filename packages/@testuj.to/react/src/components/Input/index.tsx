import React, { InputHTMLAttributes } from "react";
import cx from "classnames";

import "./styles.css";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    variant?: "default" | "dark";
    disabled?: boolean;
    iconClassName?: string;
    icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({
    variant,
    disabled,
    className,
    iconClassName,
    icon,
    ...rest
}, ref) => {
    return (
        <div className="tt-input-wrapper">
            {icon && (
                <div className={cx("tt-input-icon", iconClassName)}>
                    {icon}
                </div>
            )}
            <input
                {...rest}
                ref={ref}
                className={cx("tt-input", className, {
                    "tt-input-dark": variant === "dark",
                    icon: !!icon,
                    disabled,
                })}
            />
        </div>
    );
});
