import cx from "classnames";

import "./styles.css";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    backgroundImage?: string;
    backgroundColor?: string;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
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
            {...props}
            className={cx("tt-card", className)}
            style={{ backgroundImage, backgroundColor, ...style }}
        >
            {children}
        </div>
    );
};
