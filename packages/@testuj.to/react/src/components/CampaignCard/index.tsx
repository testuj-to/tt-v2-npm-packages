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
    onLikeClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    liked?: boolean;
    showLikeButton?: boolean;
    hideTags?: boolean;
    showInfo?: boolean;
    textInfo?: boolean;
    bottom?: React.ReactNode;
    communityLogo?: string;
    link?: string;
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
    bottom,
    communityLogo,
    link,
}: CampaignCardProps) => {
    return (
        <div
            className="tt-campaign-card-warpper"
            onClick={() => onClick?.()}
            onDoubleClick={() => onDoubleClick?.()}
        >
            <div className="tt-campaign-card-main">
                <div className="tt-campaign-card-image">{image}</div>
                {communityLogo ? (
                    <div className="tt-campaign-card-community-logo-wrapper">
                        <img src={communityLogo} className="tt-campaign-card-community-logo" />
                    </div>
                ) : null}
                {hideTags ? null : (
                    <div className="tt-campaign-card-tags">
                        {tags?.map((tag, index) => (
                            <Tag {...tag} key={index} className="tt-campaign-card-tag" rounded />
                        ))}
                    </div>
                )}
                {showLikeButton ? (
                    <LikeButton
                        variant="circle"
                        className="tt-campaign-card-like-button"
                        liked={liked}
                        onClick={onLikeClick}
                    />
                ) : null}
            </div>
            <div className="tt-campaign-card-label">
                {link ? <a href={link} className="tt-campaign-card-link" >{label}</a> : label}
            </div>
            {bottom ? bottom : null}
        </div>
    );
};
