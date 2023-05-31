import cx from "classnames";
import { IconHeart } from "./Icons";

import "./styles.css";

export interface LikeButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  liked?: boolean;
  variant: "circle" | "square";
}

export const LikeButton = ({ liked, variant, className, children, ...props }: LikeButtonProps) => {
  return (
    <button className={cx("tt-like-button", variant, className)} {...props}>
      {children}
      <IconHeart
        fill={liked ? "currentColor" : "none"}
        style={{
          color: liked ? "#ff001d" : "var(--color-text)",
          marginLeft: variant === "square" ? "0.5rem" : undefined,
        }}
      />
    </button>
  );
};
