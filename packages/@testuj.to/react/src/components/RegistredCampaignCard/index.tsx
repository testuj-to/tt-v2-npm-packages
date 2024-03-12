import { useMemo, useState } from "react";
import { CampaignCard, CampaignCardTagProps } from "../CampaignCard";
import {
  Campaign,
  CampaignApplicationResolutionStatus,
  CampaignApplicationStatus,
  ReviewState,
} from "@lib/types";
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
