import { useMemo, useState } from "react";
import { CampaignCard, CampaignCardTagProps } from "../CampaignCard";
import { Campaign } from "@lib/types";
import { StarsRating } from "../StarsRating";
import moment from "moment";

export type CampaignCardInfo = {
  rating: number;
  noOfReviews: number;
  date: string;
  text: string;
};

export interface TestedCampaignCardProps {
  campaign: Campaign;
  onClick?: () => void;
  onDoubleClick?: () => void;
  info?: CampaignCardInfo;
  translations?: {
    review: string;
    reviews: string;
  };
}

export const TestedCampaignCard = ({
  campaign,
  onClick,
  onDoubleClick,
  info,
  translations,
}: TestedCampaignCardProps) => {
  const [liked, setLiked] = useState(false);
  // TODO: generate tags based on campaign state
  const bottomSection = useMemo(() => {
    return (
      <>
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
        {info.text ? (
          <div className="tt-campaign-card-info">
            <span className="tt-campaign-card-info-reviews-value">{info.text}</span>
          </div>
        ) : null}
      </>
    );
  }, []);

  return (
    <CampaignCard
      image={<img src="https://picsum.photos/384/264" alt="img" />}
      label="Product title"
      tags={[]}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      bottom={bottomSection}
    />
  );
};
