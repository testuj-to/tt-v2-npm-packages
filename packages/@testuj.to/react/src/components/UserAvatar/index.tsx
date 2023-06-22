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
}

export const UserAvatar = ({
  image,
  name,
  title,
  badge,
  className,
  hideUserText,
  onClick,
}: UserAvatarProps) => {
  return (
    <div className={cx("tt-user-avatar", className)} onClick={onClick}>
      <div className="tt-user-avatar-image-wrapper">
        <img src={image} alt={name} height={40} width={40} className="tt-user-avatar-image" />
        {badge ? (
          <img src={badge} alt={name} height={18} width={18} className="tt-user-avatar-badge" />
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
