import cx from "classnames";
import { UserAvatar } from "../UserAvatar";

export interface ReviewProps {
  className?: string;
}

export const Review = ({ className }: ReviewProps) => {
  return (
    <div className={cx("tt-review", className)}>
      <div className="tt-review__header">
        {/* <UserAvatar /> */}
      </div>
    </div>
  );
};
