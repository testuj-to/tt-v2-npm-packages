import moment from "moment";
import { LikeButton } from "../LikeButton";
import { StarsRating } from "../StarsRating";
import { Tag, TagProps } from "../Tag";
import "./styles.css";

export interface CampaignCardTagProps extends TagProps {}

export type CampaignCardInfo = {
  rating: number;
  noOfReviews: number;
  date: string;
  text: string;
};

export interface CampaignCardProps {
  image: React.ReactNode; // image is passed as react node to allow usage of optimized Image from next.js
  label: string;
  tags: CampaignCardTagProps[];
  onClick?: () => void;
  onDoubleClick?: () => void;
  onLikeClick?: () => void;
  liked?: boolean;
  showLikeButton?: boolean;
  hideTags?: boolean;
  showInfo?: boolean;
  textInfo?: boolean;
  info?: CampaignCardInfo;
  translations?: {
    review: string;
    reviews: string;
  };
  bottom?: React.ReactNode;
}

export const CampaignCard = ({
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
  bottom,
}: CampaignCardProps) => {
  return (
    <div
      className="tt-campaign-card-warpper"
      onClick={() => onClick?.()}
      onDoubleClick={() => onDoubleClick?.()}
    >
      <div className="tt-campaign-card-main">
        <div className="tt-campaign-card-image">{image}</div>
        {hideTags ? null : (
          <div className="tt-campaign-card-tags">
            {tags?.map((tag, index) => (
              <Tag {...tag} key={index} className="tt-campaign-card-tag" />
            ))}
          </div>
        )}
        {showLikeButton ? (
          <LikeButton
            variant="circle"
            className="tt-campaign-card-like-button"
            liked={liked}
            onClick={(e) => {
              e.stopPropagation();
              onLikeClick?.();
            }}
          />
        ) : null}
      </div>
      <div className="tt-campaign-card-label">
        <label>{label}</label>
      </div>
      {bottom ? bottom : null}
      {showInfo ? (
        <div className="tt-campaign-card-info">
          <div className="tt-campaign-card-info-rating">
            <span className="tt-campaign-card-info-rating-value">{info.rating.toFixed(1)}/5</span>
            <StarsRating rating={info.rating} onChange={() => null} readOnly starSize={16} />
            <span className="tt-campaign-card-dot-divider"></span>
            <span className="tt-campaign-card-info-reviews-value">{info.noOfReviews}</span>
            <span className="tt-campaign-card-info-reviews-label">
              {info.noOfReviews === 1 ? translations?.review : translations?.reviews}
            </span>
          </div>
          <div className="tt-campaign-card-info-date">
            <span className="tt-campaign-card-info-date-value">
              {moment(info.date).format("MM/YYYY")}
            </span>
          </div>
        </div>
      ) : null}
      {textInfo ? (
        <div className="tt-campaign-card-info">
          <span className="tt-campaign-card-info-reviews-value">{info.text}</span>
        </div>
      ) : null}
    </div>
  );
};
