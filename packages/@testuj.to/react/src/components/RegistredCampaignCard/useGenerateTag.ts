import { useMemo } from "react";
import { CampaignCardTagProps } from "../CampaignCard";
import { Campaign, CampaignApplicationResolutionStatus, CampaignApplicationStatus, ReviewState } from "@lib/types";
import moment from "moment";

export const useGenerateTag = (campaign: Campaign, t: (t: string, options?: any) => string) => {
    const campaignApplication = campaign?.campaignApplication;

    const generatedTag: CampaignCardTagProps = useMemo(() => {
        if (campaignApplication?.state === CampaignApplicationStatus.resolved) {
            switch (campaignApplication.latestResolution?.status) {
                case CampaignApplicationResolutionStatus.selected:
                    // calculate time to end of registration by adding registration duration to start time
                    const dateToRegistrationEnd = moment(campaign?.settings?.openAt)
                        .add(campaign?.settings?.registrationPeriodDays, "days")
                        .valueOf();

                    const dateToReviewsEnd = moment(campaign?.settings?.closeAt)
                        .add(campaign?.settings?.submissionPeriodDays, "days")
                        .valueOf();

                    const now = moment().valueOf();

                    const reviews = campaign.reviews?.filter((review) => review.state !== ReviewState.draft) || [];

                    // Include rejected reviews
                    if (reviews.filter((review) => review.state === ReviewState.rejected).length > 0) {
                        return {
                            children: t("cardStatus.rejected"),
                            variant: "danger",
                        };
                    }

                    // Window for reviews is open
                    if (dateToRegistrationEnd <= now && dateToReviewsEnd >= now && reviews.length === 0) {
                        const daysToReviewsEnd = moment(dateToReviewsEnd).diff(moment(now), "days");

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
                        const daysPastReviewsEnd = moment().diff(moment(dateToReviewsEnd), "days");

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
    return generatedTag;
};
