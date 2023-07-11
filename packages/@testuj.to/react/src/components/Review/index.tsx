import cx from "classnames";
import { UserAvatar } from "../UserAvatar";
import { User } from "@lib/types";
import { StarsRating } from "../StarsRating";
import { ThumbIcon } from "./ThumbIcon";

import "./styles.css";

export interface UserWithAvatar extends User {
  avatar: string;
  title: string;
}

export interface ReviewProps {
  user: UserWithAvatar;
  rating: number;
  content: string;
  createdAt?: string;
  pros?: string[];
  cons?: string[];
  recommend?: boolean;
  images?: string[];
  className?: string;
  OptimizedImageComponent?: React.ElementType<React.ImgHTMLAttributes<HTMLImageElement>>;
  recommendedText?: string;
}

export const Review = ({
  user,
  rating,
  content,
  createdAt,
  pros,
  cons,
  recommend,
  images,
  className,
  OptimizedImageComponent,
  recommendedText,
}: ReviewProps) => {
  return (
    <div className={cx("tt-review", className)}>
      <div className="tt-review__header">
        {
          <UserAvatar
            image={user.avatar}
            name={`${user.firstName} ${user.lastName}`}
            title={user.title}
            size="large"
          />
        }
      </div>
      <div className="tt-review__rating_bar">
        <div className="tt-review__rating_wrapper">
          <span className="tt-review__rating">{rating}/5</span>
          <StarsRating rating={rating} readOnly />
        </div>
        {recommend ? (
          <div className="tt-review__recommended">
            <ThumbIcon className="tt-review__recommended_icon" />
            <span className="tt-review__recommended_text">{`${user.firstName} ${recommendedText}`}</span>
          </div>
        ) : null}
      </div>
      <p className="tt-review__content">{content}</p>
      <div className="tt-review__pros_cons">
        <div className="tt-review__pros_cons_col">
          {pros?.map((pro, index) => (
            <div key={index} className="tt-review__pros_item">
              <span className="tt-review__pros_icon">+</span>
              <span className="tt-review__pros_text">{pro}</span>
            </div>
          ))}
        </div>

        <div className="tt-review__pros_cons_col">
          {cons?.map((con, index) => (
            <div key={index} className="tt-review__cons_item">
              <span className="tt-review__cons_icon">-</span>
              <span className="tt-review__cons_text">{con}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="tt-review__images">
        {images?.map((image, index) =>
          OptimizedImageComponent ? (
            <OptimizedImageComponent
              key={index}
              src={image}
              height={72}
              width={48}
              className="tt-review__image"
            />
          ) : (
            <img key={index} src={image} loading="lazy" className="tt-review__image" />
          )
        )}
      </div>
    </div>
  );
};
