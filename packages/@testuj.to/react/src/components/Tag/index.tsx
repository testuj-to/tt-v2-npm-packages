import cx from "classnames";

import "./styles.css";

export interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "success" | "danger" | "warning" | "info";
}

export const Tag = ({ children, className, variant, ...props }: TagProps) => {
  return (
    <div {...props} className={cx("tt-tag", `tt-tag-${variant}`, className)}>
      {children}
    </div>
  );
};
