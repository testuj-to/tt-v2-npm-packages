import { useMemo, useState } from "react";
import { CampaignCard, CampaignCardTagProps } from "../CampaignCard";
import { Campaign } from "@lib/types";

export interface FutureCampaignCardProps {
  campaign: Campaign;
  onClick?: () => void;
}

export const FutureCampaignCard = ({ campaign, onClick }: FutureCampaignCardProps) => {
  const [liked, setLiked] = useState(false);
  // TODO: generate tags based on campaign state
  const generatedTag: CampaignCardTagProps = useMemo(() => {
    // calculate time to start
    const timeToStart = new Date(campaign.settings?.openAt).getTime() - Date.now();

    if (timeToStart > 0) {
      const days = Math.floor(timeToStart / (1000 * 60 * 60 * 24));
      return {
        children: `Začíná za ${days} dny`,
        variant: "warning",
        color: "#FFC107",
      };
    }

    // calculate time to end of registration by adding registration duration to start time
    const timeToEnd =
      new Date(campaign.settings?.openAt).getTime() +
      campaign.settings?.registrationPeriodDays * 24 * 60 * 60 * 1000 -
      Date.now();

    if (timeToEnd > 0) {
      const days = Math.floor(timeToEnd / (1000 * 60 * 60 * 24));

      if (days <= 1) {
        return {
          children: `Zbývá ${days} den na registraci`,
          variant: "warning",
        };
      }

      if (days <= 3) {
        return {
          children: `Zbývá ${days} dnů na registraci`,
          variant: "info",
        };
      }

      return {
        children: `Zbývá ${days} dnů na registraci`,
        variant: "success",
      };
    }

    return {
      children: "Přihlašování ukončeno",
      variant: "danger",
    };
  }, [campaign]);

  const tags: CampaignCardTagProps[] = useMemo(() => {
    return [
      {
        children: "👌 40% SLEVA",
        variant: "white",
      },
      generatedTag,
    ];
  }, [campaign]);

  return (
    <CampaignCard
      image={<img src="https://picsum.photos/384/264" alt="img" />}
      label="Product title"
      tags={tags}
      onClick={onClick}
      liked={liked}
      showLikeButton={true}
      onLikeClick={() => setLiked((prev) => !prev)}
      onDoubleClick={() => console.log("Product card double clicked")}
    />
  );
};
