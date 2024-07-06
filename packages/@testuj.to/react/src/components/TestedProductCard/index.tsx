import { CampaignCard } from "../CampaignCard";
import { TestedProduct } from "@lib/types";
import { StarsRating } from "../StarsRating";
import moment from "moment";

import "./styles.css";

export type TestedProductCardInfo = {
    rating: number;
    noOfReviews: number;
    date: string;
    text: string;
};

export interface TestedProductCardProps {
    product?: TestedProduct;
    info?: TestedProductCardInfo;
    image?: React.ReactNode;
    translations?: {
        review: string;
        reviews: string;
    };
    onClick?: () => void;
    onDoubleClick?: () => void;
}

export const TestedProductCard = ({
    product,
    info,
    image,
    translations,
    onClick,
    onDoubleClick,
}: TestedProductCardProps) => {
    return (
        <CampaignCard
            image={image}
            label={product?.name}
            tags={[]}
            bottom={
                <>
                    <div className="tt-campaign-card-info">
                        <div className="tt-campaign-card-info-rating">
                            <span className="tt-campaign-card-info-rating-value">
                                {info?.rating?.toFixed?.(1)}/5
                            </span>
                            <StarsRating
                                starSize={16}
                                rating={info?.rating}
                                onChange={() => null}
                                readOnly
                            />
                            <span className="tt-campaign-card-dot-divider" />
                            <span className="tt-campaign-card-info-reviews-value">
                                {info?.noOfReviews}
                            </span>
                            <span className="tt-campaign-card-info-reviews-label">
                                {info?.noOfReviews === 1 ? translations?.review : translations?.reviews}
                            </span>
                        </div>
                        <div className="tt-campaign-card-info-date">
                            <span className="tt-campaign-card-info-date-value">
                                {info?.date && moment(info?.date).format("MM/YYYY")}
                            </span>
                        </div>
                    </div>
                    {!!info?.text && (
                        <div className="tt-campaign-card-info">
                            <span className="tt-campaign-card-info-reviews-value">{info.text}</span>
                        </div>
                    )}
                </>
            }
            onClick={onClick}
            onDoubleClick={onDoubleClick}
        />
    );
};
