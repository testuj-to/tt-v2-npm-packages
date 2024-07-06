import React, { type ReactNode, type ButtonHTMLAttributes } from "react";
import cx from "classnames";

import "./styles.css";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "success" | "danger" | "warning" | "info";
    children?: ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ variant, ...rest }, ref) => {
    return (
        <button
            ref={ref}
            {...rest}
            className={cx('tt-button', variant, rest?.className)}
        />
    );
});
