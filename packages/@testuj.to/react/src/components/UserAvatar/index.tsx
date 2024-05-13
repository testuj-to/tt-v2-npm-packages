import cx from "classnames";

import "./styles.css";

export interface UserAvatarProps {
    image: string;
    name?: string;
    title?: string;
    badge?: string | React.ReactNode;
    className?: string;
    hideUserText?: boolean;
    onClick?: () => void;
    size?: "small" | "medium" | "large";
    imageWrapperClassName?: string;
    customSizes?: {
        avatar?: number;
        badge?: number;
    };
}

export const UserAvatar = ({
    image,
    name,
    title,
    badge,
    className,
    hideUserText,
    onClick,
    size = "medium",
    imageWrapperClassName,
    customSizes,
}: UserAvatarProps) => {
    return (
        <div className={cx("tt-user-avatar", className)} onClick={onClick}>
            <div
                className={cx("tt-user-avatar-image-wrapper", size, imageWrapperClassName)}
                style={{ width: customSizes?.avatar, height: customSizes?.avatar }}
            >
                <img
                    src={image}
                    alt={name}
                    className={cx("tt-user-avatar-image", size)}
                    style={{ width: customSizes?.avatar, height: customSizes?.avatar }}
                />
                {badge && typeof badge === "string" ? (
                    <img
                        src={badge}
                        alt={name}
                        className={cx("tt-user-avatar-badge", size)}
                        style={{ width: customSizes?.badge, height: customSizes?.badge }}
                    />
                ) : badge ? (
                    <div className={cx("tt-user-avatar-badge", size)}>{badge}</div>
                ) : null}
            </div>
            {!hideUserText ? (
                <div className="tt-user-avatar-text">
                    <div className="tt-user-avatar-name">{name}</div>
                    <div className="tt-user-avatar-title">{title}</div>
                </div>
            ) : null}
        </div>
    );
};
