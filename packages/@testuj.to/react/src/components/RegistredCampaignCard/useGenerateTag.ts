import { useMemo } from "react";
import moment from "moment";

import {
    Campaign,
    CampaignApplicationResolutionStatus,
    CampaignApplicationStatus,
    ReviewState,
} from "@lib/types";
import { CampaignCardTagProps } from "../CampaignCard";

const getCampaignApplicationSubmittedTag = (t: (key: string) => string): CampaignCardTagProps => {
    return {
        children: t("card-status.submitted"),
        variant: "success",
    };
};

const getCampaignApplicationResolvedTag = (
    t: (key: string, params?: object) => string,
    campaign: Campaign,
): CampaignCardTagProps => {
    const campaignApplication = campaign?.campaignApplication;

    switch (campaignApplication.latestResolution?.status) {
    case CampaignApplicationResolutionStatus.selected:
        // calculate time to end of registration by adding registration duration to start time
        const dateToRegistrationEnd = moment(campaign?.settings?.openAt)
            .add(campaign?.settings?.registrationPeriodDays, "days")
            .valueOf();

        const dateToReviewsEnd = moment(campaignApplication.deadlineAt).valueOf();

        const now = moment().valueOf();

        const reviews = campaign.reviews?.filter((review) => review.state !== ReviewState.draft) || [];

        // Include rejected reviews
        if (reviews.filter((review) => review.state === ReviewState.rejected).length > 0) {
            return {
                children: t("card-status.rejected"),
                variant: "danger",
            };
        }

        // Window for reviews is open
        if (
            dateToRegistrationEnd <= now &&
            dateToReviewsEnd >= now &&
            reviews.length === 0
        ) {
            const daysToReviewsEnd = moment(dateToReviewsEnd).diff(moment(now), "days");

            if (daysToReviewsEnd >= 2 && daysToReviewsEnd < 5) {
                return {
                    variant: "danger",
                    children: t("card-status.last-day-to-review-low", {
                        count: daysToReviewsEnd,
                    }),
                };
            }

            return {
                variant: daysToReviewsEnd <= 5 ? "danger" : "white",
                children: t("card-status.review", {
                    count: daysToReviewsEnd,
                }),
            };
        }

        // Reviews are submitted
        if (reviews.length > 0) {
            return {
                children: t("card-status.reviewed"),
                variant: "success",
            };
        }

        // Its past the time window for entering reviews
        if (dateToReviewsEnd < now) {
            const daysPastReviewsEnd = moment().diff(moment(dateToReviewsEnd), "days");

            if (daysPastReviewsEnd >= 2 && daysPastReviewsEnd < 5) {
                return {
                    variant: "warning",
                    color: "#000000",
                    children: t("card-status.missing-review-low", {
                        count: daysPastReviewsEnd,
                    }),
                };
            }

            return {
                variant: "danger",
                color: "#000000",
                children: t("card-status.missing-review", {
                    count: daysPastReviewsEnd,
                }),
            };
        }

        return {
            children: t("card-status.selected"),
            variant: "success",
        };
    case CampaignApplicationResolutionStatus.rejected:
        return {
            children: t("card-status.rejected"),
            variant: "danger",
        };
    }

    return {
        children: t("card-status.pending"),
        variant: "info",
    };
};

export const useGenerateTag = (campaign: Campaign, t: (t: string, options?: any) => string) => {
    const campaignApplication = campaign?.campaignApplication;

    const generatedTag: CampaignCardTagProps = useMemo(() => {
        if (campaignApplication?.state === CampaignApplicationStatus.resolved) {
            return getCampaignApplicationResolvedTag(t, campaign);
        }

        if (campaignApplication?.state === CampaignApplicationStatus.submitted) {
            return getCampaignApplicationSubmittedTag(t);
        }
    }, [campaign]);

    return generatedTag;
};
