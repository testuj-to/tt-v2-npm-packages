import { LikeButton } from "../LikeButton";
import { Tag, TagProps } from "../Tag";
import "./styles.css";

export interface CampaignCardTagProps extends TagProps {}

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
  textInfo,
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
    </div>
  );
};
