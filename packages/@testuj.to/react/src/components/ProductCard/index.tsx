import moment from "moment";
import { LikeButton } from "../LikeButton";
import { StarsRating } from "../StarsRating";
import { Tag, TagProps } from "../Tag";
import "./styles.css";

export interface ProductCardTagProps extends TagProps {}

export type ProductCardInfo = {
  rating: number;
  noOfReviews: number;
  date: string;
  text: string;
};

export interface ProductCardProps {
  image: React.ReactNode; // image is passed as react node to allow usage of optimized Image from next.js
  label: string;
  tags: ProductCardTagProps[];
  onClick?: () => void;
  onDoubleClick?: () => void;
  onLikeClick?: () => void;
  liked?: boolean;
  showLikeButton?: boolean;
  hideTags?: boolean;
  showInfo?: boolean;
  textInfo?: boolean;
  info?: ProductCardInfo;
  translations?: {
    review: string;
    reviews: string;
  };
}

export const ProductCard = ({
  image,
  label,
  tags,
  onClick,
  onDoubleClick,
  onLikeClick,
  liked,
  showLikeButton,
  hideTags,
  showInfo,
  textInfo,
  info,
  translations,
}: ProductCardProps) => {
  return (
    <div
      className="tt-product-card-warpper"
      onClick={() => onClick?.()}
      onDoubleClick={() => onDoubleClick?.()}
    >
      <div className="tt-product-card-main">
        <div className="tt-product-card-image">{image}</div>
        {hideTags ? null : (
          <div className="tt-product-card-tags">
            {tags?.map((tag, index) => (
              <Tag {...tag} key={index} className="tt-product-card-tag" />
            ))}
          </div>
        )}
        {showLikeButton ? (
          <LikeButton
            variant="circle"
            className="tt-product-card-like-button"
            liked={liked}
            onClick={(e) => {
              e.stopPropagation();
              onLikeClick?.();
            }}
          />
        ) : null}
      </div>
      <div className="tt-product-card-label">
        <label>{label}</label>
      </div>
      {showInfo ? (
        <div className="tt-product-card-info">
          <div className="tt-product-card-info-rating">
            <span className="tt-product-card-info-rating-value">{info.rating.toFixed(1)}/5</span>
            <StarsRating rating={info.rating} onChange={() => null} readOnly starSize={16} />
            <span className="tt-product-card-dot-divider"></span>
            <span className="tt-product-card-info-reviews-value">{info.noOfReviews}</span>
            <span className="tt-product-card-info-reviews-label">
              {info.noOfReviews === 1 ? translations?.review : translations?.reviews}
            </span>
          </div>
          <div className="tt-product-card-info-date">
            <span className="tt-product-card-info-date-value">
              {moment(info.date).format("MM/YYYY")}
            </span>
          </div>
        </div>
      ) : null}
      {textInfo ? (
        <div className="tt-product-card-info">
          <span className="tt-product-card-info-reviews-value">{info.text}</span>
        </div>
      ) : null}
    </div>
  );
};
