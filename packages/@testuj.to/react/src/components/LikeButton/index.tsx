import cx from "classnames";

import "./styles.css";

import { IconHeart } from "./IconHeart";

export interface LikeButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    liked?: boolean;
    variant: "circle" | "square";
}

export const LikeButton = ({ liked, variant, className, children, ...props }: LikeButtonProps) => {
    return (
        <button
            {...props}
            className={cx("tt-like-button", variant, className)}
        >
            {children}
            <IconHeart
                fill={liked ?
                    "currentColor" : "none"}
                style={{
                    color: liked ?
                        "#ff001d" : "var(--color-text)",
                    marginLeft: variant === "square" ?
                        "0.5rem" : undefined,
                }}
            />
        </button>
    );
};
