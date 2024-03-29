import { useMemo, useState } from "react";
import { CampaignCard, CampaignCardTagProps } from "../CampaignCard";
import { Campaign } from "@lib/types";

export interface FutureCampaignCardProps {
  campaign: Campaign;
  onClick?: () => void;
  onDoubleClick?: () => void;
  image?: React.ReactNode;
  liked?: boolean;
  onLikeClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  t: (key: string, args?: any) => string;
  hideLikeButton?: boolean;
}

export const FutureCampaignCard = ({
  campaign,
  onClick,
  image,
  onDoubleClick,
  liked,
  onLikeClick,
  t,
  hideLikeButton,
}: FutureCampaignCardProps) => {
  // TODO: generate tags based on campaign state
  const generatedTag: CampaignCardTagProps = useMemo(() => {
    // calculate time to start
    const timeToStart = new Date(campaign?.settings?.openAt).getTime() - Date.now();

    if (timeToStart > 0) {
      const days = Math.floor(timeToStart / (1000 * 60 * 60 * 24));
      return {
        children: t("card-status.days-to-start", { count: days }),
        variant: "warning",
        color: "#FFC107",
      };
    }

    // calculate time to end of registration by adding registration duration to start time
    const timeToEnd =
      new Date(campaign?.settings?.openAt).getTime() +
      campaign?.settings?.registrationPeriodDays * 24 * 60 * 60 * 1000 -
      Date.now();

    if (timeToEnd > 0) {
      const days = Math.floor(timeToEnd / (1000 * 60 * 60 * 24));

      if (days <= 1) {
        return {
          children: t("card-status.last-day-to-register"),
          variant: "warning",
        };
      }

      if (days <= 4 && days > 1) {
        return {
          children: t("card-status.days-to-register-low", { count: days }),
          variant: "warning",
        };
      }

      return {
        children: t("card-status.days-to-register", { count: days }),
        variant: "white",
      };
    }

    return {
      children: t("card-status.registration-closed"),
      variant: "danger",
    };
  }, [campaign]);

  const customTags: CampaignCardTagProps[] = useMemo(() => {
    if (!campaign?.tags) {
      return [];
    }
    return campaign.tags.map((tag) => ({
      children: tag.value,
      variant: "white",
    }));
  }, [campaign]);

  const discountTag: CampaignCardTagProps = useMemo(() => {
    const discount = campaign?.pricing.discountPercent;

    if (discount === 100) {
      return {
        children: t("card-status.free"),
        variant: "white",
      };
    }

    if (discount > 0) {
      return {
        children: t("card-status.discount", { discount }),
        variant: "white",
      };
    }

    return null;
  }, [campaign]);

  const tags: CampaignCardTagProps[] = useMemo(() => {
    return [discountTag, generatedTag, ...customTags];
  }, [campaign]);

  return (
    <CampaignCard
      image={image}
      label={campaign?.name}
      tags={tags}
      onClick={onClick}
      liked={liked}
      showLikeButton={!hideLikeButton}
      onLikeClick={onLikeClick}
      onDoubleClick={onDoubleClick}
      communityLogo={campaign?.mainTenant?.logo?.src}
    />
  );
};
