import cx from "classnames";

import "./styles.css";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  backgroundImage?: string;
  backgroundColor?: string;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Card = ({
  backgroundColor,
  backgroundImage,
  children,
  className,
  style,
  ...props
}: CardProps) => {
  return (
    <div
      className={cx("tt-card", className)}
      style={{ backgroundImage, backgroundColor, ...style }}
      {...props}
    >
      {children}
    </div>
  );
};
