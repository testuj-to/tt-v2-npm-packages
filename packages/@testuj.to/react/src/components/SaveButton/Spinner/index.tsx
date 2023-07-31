import cx from "classnames";

import "./styles.css";

export interface SpinnerProps {
  className?: string;
}

export const Spinner = ({ className }: SpinnerProps) => {
  return (
    <div className={cx("lds-ellipsis", className)}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
