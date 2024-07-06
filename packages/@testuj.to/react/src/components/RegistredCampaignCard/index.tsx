import { useMemo, useState } from "react";

import { Campaign } from "@lib/types";
import { CampaignCard } from "../CampaignCard";
import { useGenerateTag } from "./useGenerateTag";

export interface RegistredCampaignCardProps {
    campaign: Campaign;
    image?: React.ReactNode;
    liked?: boolean;
    t(key: string, args?: any): string;
    onClick?(): void;
    onDoubleClick?(): void;
    onLikeClick?(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
}

export const RegistredCampaignCard = ({
    campaign,
    image,
    liked,
    t,
    onClick,
    onDoubleClick,
    onLikeClick,
}: RegistredCampaignCardProps) => {
    const generatedTag = useGenerateTag(campaign, t);

    return (
        <CampaignCard
            image={image}
            label={campaign?.name}
            tags={[generatedTag]}
            onClick={onClick}
            liked={liked}
            showLikeButton={true}
            onLikeClick={onLikeClick}
            onDoubleClick={onDoubleClick}
            communityLogo={campaign?.mainTenant?.logo?.src}
        />
    );
};
