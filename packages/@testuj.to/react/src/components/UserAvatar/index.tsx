import cx from "classnames";

import "./styles.css";

export interface UserAvatarProps {
  image: string;
  name?: string;
  title?: string;
  badge?: string;
  className?: string;
  hideUserText?: boolean;
  onClick?: () => void;
  size?: "small" | "medium" | "large";
  imageWrapperClassName?: string;
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
}: UserAvatarProps) => {
  return (
    <div className={cx("tt-user-avatar", className)} onClick={onClick}>
      <div className={cx("tt-user-avatar-image-wrapper", size, imageWrapperClassName)}>
        <img src={image} alt={name} className={cx("tt-user-avatar-image", size)} />
        {badge ? <img src={badge} alt={name} className={cx("tt-user-avatar-badge", size)} /> : null}
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
