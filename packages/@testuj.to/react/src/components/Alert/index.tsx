import cx from "classnames";

import "./styles.css";

import { ErrorIcon } from "./Icons/Error";
import { InfoIcon } from "./Icons/Info";
import { SuccessIcon } from "./Icons/Success";
import { WarningIcon } from "./Icons/Warning";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "info" | "success" | "warning" | "error";
    className?: string;
    hideIcon?: boolean;
    size?: "small" | "medium" | "large";
    children: React.ReactNode;
}

export const Alert = ({ children, variant, className, hideIcon, size = "medium" }: AlertProps) => {
    let icon = null;
    switch (variant) {
    case "info":
        icon = (
            <InfoIcon className={cx("tt-alert-icon", "tt-alert-icon-info")} />
        );
        break;
    case "success":
        icon = (
            <SuccessIcon className={cx("tt-alert-icon", "tt-alert-icon-success")} />
        );
        break;
    case "warning":
        icon = (
            <WarningIcon className={cx("tt-alert-icon", "tt-alert-icon-warning")} />
        );
        break;
    case "error":
        icon = (
            <ErrorIcon className={cx("tt-alert-icon", "tt-alert-icon-error")} />
        );
        break;
    default:
        icon = (
            <InfoIcon className={cx("tt-alert-icon", "tt-alert-icon-info")} />
        );
        break;
    }

    return (
        <div className={cx("tt-alert", `tt-alert-${variant}`, size, className)}>
            {hideIcon ? null : icon}
            {children}
        </div>
    );
};
