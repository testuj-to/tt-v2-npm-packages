import { useMemo, useState } from "react";
import { CampaignCard, CampaignCardTagProps } from "../CampaignCard";
import {
  Campaign,
  CampaignApplicationResolutionStatus,
  CampaignApplicationStatus,
  ReviewState,
} from "@lib/types";

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
  const campaignApplication = campaign?.campaignApplication;

  const generatedTag: CampaignCardTagProps = useMemo(() => {
    if (campaignApplication?.state === CampaignApplicationStatus.resolved) {
      switch (campaignApplication.latestResolution?.status) {
        case CampaignApplicationResolutionStatus.selected:
          // calculate time to end of registration by adding registration duration to start time
          const dateToRegistrationEnd =
            new Date(campaign?.settings?.openAt).getTime() +
            campaign?.settings?.registrationPeriodDays * 24 * 60 * 60 * 1000;

          const dateToReviewsEnd =
            dateToRegistrationEnd + campaign?.settings?.submissionPeriodDays * 24 * 60 * 60 * 1000;

          // set now to today at 00:00:00

          const todayMidnight = new Date();
          todayMidnight.setHours(0, 0, 0, 0);
          const now = todayMidnight.getTime();

          const reviews =
            campaign.reviews?.filter((review) => review.state !== ReviewState.draft) || [];

          // Include rejected reviews
          if (reviews.filter((review) => review.state === ReviewState.rejected).length > 0) {
            return {
              children: t("cardStatus.rejected"),
              variant: "danger",
            };
          }

          // Window for reviews is open
          if (dateToRegistrationEnd < now && dateToReviewsEnd > now && reviews.length === 0) {
            const daysToReviewsEnd = Math.floor((dateToReviewsEnd - now) / (1000 * 60 * 60 * 24));

            if (daysToReviewsEnd >= 2 && daysToReviewsEnd < 5) {
              return {
                children: t("cardStatus.lastDayToReviewLow", {
                  count: daysToReviewsEnd,
                }),
                variant: "danger",
              };
            }

            return {
              children: t("cardStatus.review", {
                count: daysToReviewsEnd,
              }),
              variant: daysToReviewsEnd <= 5 ? "danger" : "white",
            };
          }

          // Reviews are submitted
          if (reviews.length > 0) {
            return {
              children: t("cardStatus.reviewed"),
              variant: "success",
            };
          }

          // Its past the time window for entering reviews
          if (dateToReviewsEnd < now) {
            const daysPastReviewsEnd = Math.floor((now - dateToReviewsEnd) / (1000 * 60 * 60 * 24));

            if (daysPastReviewsEnd >= 2 && daysPastReviewsEnd < 5) {
              return {
                children: t("cardStatus.missingReviewLow", { count: daysPastReviewsEnd }),
                variant: "warning",
                color: "#000000",
              };
            }

            return {
              children: t("cardStatus.missingReview", { count: daysPastReviewsEnd }),
              variant: "danger",
              color: "#000000",
            };
          }

          return {
            children: t("cardStatus.selected"),
            variant: "success",
          };
        case CampaignApplicationResolutionStatus.rejected:
          return {
            children: t("cardStatus.rejected"),
            variant: "danger",
          };
        default:
          return {
            children: t("cardStatus.pending"),
            variant: "info",
          };
      }
    }
    if (campaignApplication?.state === CampaignApplicationStatus.submitted) {
      return {
        children: t("cardStatus.submitted"),
        variant: "success",
      };
    }
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
