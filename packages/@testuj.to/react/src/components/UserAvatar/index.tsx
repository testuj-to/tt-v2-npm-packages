import cx from "classnames";

import "./styles.css";

export interface UserAvatarProps {
    image: string;
    name?: string;
    title?: string;
    badge?: string | React.ReactNode;
    className?: string;
    hideUserText?: boolean;
    size?: "small" | "medium" | "large";
    imageWrapperClassName?: string;
    customSizes?: {
        avatar?: number;
        badge?: number;
    };
    onClick?: () => void;
}

export const UserAvatar = ({
    image,
    name,
    title,
    badge: badgeProp,
    className,
    hideUserText,
    size = "medium",
    imageWrapperClassName,
    customSizes,
    onClick,
}: UserAvatarProps) => {
    let badge = null;
    if (badgeProp && typeof badgeProp === "string") {
        badge = (
            <img
                src={badgeProp}
                alt={name}
                className={cx("tt-user-avatar-badge", size)}
                style={{ width: customSizes?.badge, height: customSizes?.badge }}
            />
        );
    } else if (badgeProp) {
        badge = (
            <div className={cx("tt-user-avatar-badge", size)}>
                {badgeProp}
            </div>
        );
    }

    return (
        <div
            className={cx("tt-user-avatar", className)}
            onClick={onClick}
        >
            <div
                className={cx("tt-user-avatar-image-wrapper", size, imageWrapperClassName)}
                style={{
                    width: customSizes?.avatar,
                    height: customSizes?.avatar,
                }}
            >
                <img
                    src={image}
                    alt={name}
                    className={cx("tt-user-avatar-image", size)}
                    style={{
                        width: customSizes?.avatar,
                        height: customSizes?.avatar,
                    }}
                />
                {badge}
            </div>
            {!hideUserText && (
                <div className="tt-user-avatar-text">
                    <div className="tt-user-avatar-name">{name}</div>
                    <div className="tt-user-avatar-title">{title}</div>
                </div>
            )}
        </div>
    );
};
