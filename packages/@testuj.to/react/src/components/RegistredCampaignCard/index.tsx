import { useMemo, useState } from "react";
import { CampaignCard, CampaignCardTagProps } from "../CampaignCard";
import { Campaign, CampaignApplicationResolutionStatus, CampaignApplicationStatus, ReviewState } from "@lib/types";
import { useGenerateTag } from "./useGenerateTag";

export interface RegistredCampaignCardProps {
    campaign: Campaign;
    onClick?: () => void;
    onDoubleClick?: () => void;
    image?: React.ReactNode;
    liked?: boolean;
    onLikeClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    t: (key: string, args?: any) => string;
}

export const RegistredCampaignCard = ({
    campaign,
    onClick,
    image,
    onDoubleClick,
    liked,
    onLikeClick,
    t,
}: RegistredCampaignCardProps) => {
    const generatedTag = useGenerateTag(campaign, t);

    const customTags: CampaignCardTagProps[] = useMemo(() => {
        if (!campaign?.tags) {
            return [];
        }
        return campaign.tags.map((tag) => ({
            children: tag.value,
            variant: "white",
        }));
    }, [campaign]);

    const tags: CampaignCardTagProps[] = useMemo(() => {
        return [generatedTag, ...customTags];
    }, [campaign]);

    return (
        <CampaignCard
            image={image}
            label={campaign?.name}
            tags={tags}
            onClick={onClick}
            liked={liked}
            showLikeButton={true}
            onLikeClick={onLikeClick}
            onDoubleClick={onDoubleClick}
        />
    );
};
