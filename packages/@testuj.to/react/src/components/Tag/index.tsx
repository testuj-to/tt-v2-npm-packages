import cx from "classnames";

import "./styles.css";

export interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "white";
    color?: string;
    rounded?: boolean;
}

export const Tag = ({ children, className, variant, color, rounded, ...props }: TagProps) => {
    return (
        <div
            {...props}
            style={{ backgroundColor: color }}
            className={cx("tt-tag", `tt-tag-${variant}`, { "tt-tag-rounded": rounded }, className)}
        >
            {children}
        </div>
    );
};
