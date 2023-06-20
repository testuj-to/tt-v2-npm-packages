import cx from "classnames";

import "./styles.css";
import { ErrorIcon, InfoIcon } from "./Icons";
import { SuccessIcon } from "./Icons/Success";
import { WarningIcon } from "./Icons/Warning";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "info" | "success" | "warning" | "error";
  className?: string;
  hideIcon?: boolean;
  size?: "small" | "medium" | "large";
}

export const Alert = ({ children, variant, className, hideIcon, size = "medium" }: AlertProps) => {
  const chooseIcon = () => {
    switch (variant) {
      case "info":
        return <InfoIcon className={cx("tt-alert-icon", "tt-alert-icon-info")} />;
      case "success":
        return <SuccessIcon className={cx("tt-alert-icon", "tt-alert-icon-success")} />;
      case "warning":
        return <WarningIcon className={cx("tt-alert-icon", "tt-alert-icon-warning")} />;
      case "error":
        return <ErrorIcon className={cx("tt-alert-icon", "tt-alert-icon-error")} />;
      default:
        return <InfoIcon className={cx("tt-alert-icon", "tt-alert-icon-info")} />;
    }
  };

  return (
    <div className={cx("tt-alert", `tt-alert-${variant}`, size, className)}>
      {hideIcon ? null : chooseIcon()}
      {children}
    </div>
  );
};
